#!/usr/bin/env node

/**
 * Imports only public legacy DLE articles from a SQL backup.
 *
 * It deliberately reads only `dle_post` and `dle_category`; user accounts,
 * logs, configuration and every other table are ignored. The output contains
 * plain article text so the browser never renders HTML copied from the backup.
 *
 * Usage:
 *   node scripts/import-legacy-materials.mjs <source.sql> <public/materials.json>
 */

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const LEGACY_POST_FIELDS = [
  'id', 'autor', 'date', 'short_story', 'full_story', 'xfields', 'title',
  'descr', 'keywords', 'category', 'alt_name', 'comm_num', 'allow_comm',
  'allow_main', 'approve', 'fixed', 'allow_br', 'symbol', 'tags', 'metatitle',
];

const LEGACY_CATEGORY_FIELDS = [
  'id', 'parentid', 'posi', 'name', 'alt_name', 'icon', 'skin', 'descr',
  'keywords', 'news_sort', 'news_msort', 'news_number', 'short_tpl',
  'full_tpl', 'metatitle',
];

const [sourcePath, targetPath] = process.argv.slice(2);

if (!sourcePath || !targetPath) {
  console.error('Usage: node scripts/import-legacy-materials.mjs <source.sql> <public/materials.json>');
  process.exitCode = 1;
} else {
  const sql = await readFile(sourcePath, 'utf8');
  const categories = categoryMap(readInsertRows(sql, 'dle_category'));
  const seen = new Map();
  let skipped = 0;

  for (const values of readInsertRows(sql, 'dle_post')) {
    if (values.length !== LEGACY_POST_FIELDS.length) {
      skipped += 1;
      continue;
    }

    const post = Object.fromEntries(LEGACY_POST_FIELDS.map((field, index) => [field, values[index]]));
    if (String(post.approve ?? '').trim() !== '1') {
      skipped += 1;
      continue;
    }

    const title = cleanArticleText(post.title);
    const lead = cleanArticleText(post.short_story);
    const body = cleanArticleText(post.full_story);
    const content = mergeArticleText(lead, body);
    if (!title || !content) {
      skipped += 1;
      continue;
    }

    const rawId = String(post.id ?? '').trim();
    const id = rawId ? `legacy-${rawId}` : `legacy-row-${seen.size + 1}`;
    const material = {
      id,
      sortOrder: seen.size + 1,
      publishedAt: toDateOnly(post.date),
      category: categoryLabel(post.category, categories),
      title,
      excerpt: shorten(lead || content, 280),
      content,
      tags: cleanTags(post.tags),
    };

    const previous = seen.get(id);
    if (!previous || shouldReplace(previous, material)) seen.set(id, material);
  }

  const materials = [...seen.values()]
    .sort((first, second) => (
      second.publishedAt.localeCompare(first.publishedAt)
      || first.sortOrder - second.sortOrder
      || first.id.localeCompare(second.id)
    ))
    .map((material, index) => ({ ...material, sortOrder: index + 1 }));

  const payload = {
    version: 1,
    updatedAt: new Date().toISOString(),
    source: 'legacy-public-articles',
    materials,
  };

  await mkdir(path.dirname(targetPath), { recursive: true });
  await writeFile(targetPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
  console.log(JSON.stringify({ imported: materials.length, skipped, categories: categories.size }));
}

function readInsertRows(sql, tableName) {
  const escaped = tableName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const marker = new RegExp(`INSERT\\s+INTO\\s+\\\`?${escaped}\\\`?\\s+VALUES\\s*`, 'gi');
  const rows = [];
  let match;

  while ((match = marker.exec(sql))) {
    const end = findStatementEnd(sql, marker.lastIndex);
    if (end === -1) break;
    rows.push(...parseTuples(sql.slice(marker.lastIndex, end)));
    marker.lastIndex = end + 1;
  }

  return rows;
}

function findStatementEnd(text, start) {
  let quote = '';

  for (let index = start; index < text.length; index += 1) {
    const character = text[index];
    if (quote) {
      if (character === '\\') {
        index += 1;
      } else if (character === quote) {
        if (text[index + 1] === quote) index += 1;
        else quote = '';
      }
    } else if (character === "'" || character === '"') {
      quote = character;
    } else if (character === ';') {
      return index;
    }
  }

  return -1;
}

function parseTuples(valuesSql) {
  const tuples = [];
  let index = 0;

  while (index < valuesSql.length) {
    index = skipWhitespaceAndCommas(valuesSql, index);
    if (valuesSql[index] !== '(') {
      index += 1;
      continue;
    }

    const parsed = parseTuple(valuesSql, index + 1);
    if (!parsed) break;
    tuples.push(parsed.values);
    index = parsed.index;
  }

  return tuples;
}

function parseTuple(text, start) {
  const values = [];
  let index = start;

  while (index < text.length) {
    index = skipWhitespace(text, index);
    let value;

    if (text[index] === "'") {
      const parsed = readQuotedValue(text, index);
      if (!parsed) return null;
      value = parsed.value;
      index = parsed.index;
    } else {
      const tokenStart = index;
      while (index < text.length && text[index] !== ',' && text[index] !== ')') index += 1;
      const token = text.slice(tokenStart, index).trim();
      value = /^null$/i.test(token) ? null : token;
    }

    values.push(value);
    index = skipWhitespace(text, index);
    if (text[index] === ',') {
      index += 1;
      continue;
    }
    if (text[index] === ')') return { values, index: index + 1 };
    return null;
  }

  return null;
}

function readQuotedValue(text, start) {
  let value = '';

  for (let index = start + 1; index < text.length; index += 1) {
    const character = text[index];
    if (character === '\\') {
      const escaped = text[index + 1] ?? '';
      value += decodeMysqlEscape(escaped);
      index += 1;
    } else if (character === "'") {
      if (text[index + 1] === "'") {
        value += "'";
        index += 1;
      } else {
        return { value, index: index + 1 };
      }
    } else {
      value += character;
    }
  }

  return null;
}

function decodeMysqlEscape(value) {
  return ({
    '0': '\0',
    b: '\b',
    n: '\n',
    r: '\r',
    t: '\t',
    Z: '\x1a',
  })[value] ?? value;
}

function skipWhitespace(text, index) {
  while (index < text.length && /\s/.test(text[index])) index += 1;
  return index;
}

function skipWhitespaceAndCommas(text, index) {
  while (index < text.length && (text[index] === ',' || /\s/.test(text[index]))) index += 1;
  return index;
}

function categoryMap(rows) {
  const categories = new Map();
  for (const values of rows) {
    if (values.length !== LEGACY_CATEGORY_FIELDS.length) continue;
    const record = Object.fromEntries(LEGACY_CATEGORY_FIELDS.map((field, index) => [field, values[index]]));
    const id = String(record.id ?? '').trim();
    const name = cleanArticleText(record.name);
    if (id && name) categories.set(id, name);
  }
  return categories;
}

function categoryLabel(value, categories) {
  const labels = String(value ?? '')
    .split(',')
    .map((id) => categories.get(id.trim()))
    .filter(Boolean);
  return labels.length ? labels.join(' · ') : 'Материалы';
}

function cleanArticleText(value) {
  const withoutDangerousBlocks = String(value ?? '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<(script|style|iframe|object|embed)[^>]*>[\s\S]*?<\/\1>/gi, '')
    .replace(/<\s*br\s*\/?>/gi, '\n')
    .replace(/<\/(?:p|div|li|h[1-6]|blockquote|tr|section|article)>/gi, '\n')
    .replace(/<[^>]*>/g, ' ');

  return decodeHtml(withoutDangerousBlocks)
    .replace(/\r\n?/g, '\n')
    .replace(/[^\S\n]+/g, ' ')
    .replace(/\n\s*\n\s*\n+/g, '\n\n')
    .trim();
}

function decodeHtml(value) {
  const names = {
    amp: '&', apos: "'", copy: '©', gt: '>', hellip: '…', laquo: '«', lt: '<', mdash: '—', ndash: '–', nbsp: ' ', quot: '"', raquo: '»', reg: '®', shy: '', trade: '™',
  };

  return value.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (entity, code) => {
    const normalized = code.toLowerCase();
    if (normalized.startsWith('#x')) return String.fromCodePoint(Number.parseInt(normalized.slice(2), 16));
    if (normalized.startsWith('#')) return String.fromCodePoint(Number.parseInt(normalized.slice(1), 10));
    return names[normalized] ?? entity;
  });
}

function mergeArticleText(lead, body) {
  if (!body) return lead;
  if (!lead || body.includes(lead)) return body;
  if (lead.includes(body)) return lead;
  return `${lead}\n\n${body}`;
}

function cleanTags(value) {
  return [...new Set(
    String(value ?? '')
      .split(/[,;|]/)
      .map(cleanArticleText)
      .filter(Boolean),
  )].slice(0, 20);
}

function shorten(value, length) {
  const text = String(value ?? '').replace(/\s+/g, ' ').trim();
  return text.length > length ? `${text.slice(0, length).trimEnd()}…` : text;
}

function toDateOnly(value) {
  const match = String(value ?? '').match(/^(\d{4}-\d{2}-\d{2})/);
  return match ? match[1] : '';
}

function shouldReplace(previous, candidate) {
  return candidate.publishedAt > previous.publishedAt
    || (candidate.publishedAt === previous.publishedAt && candidate.content.length > previous.content.length);
}
