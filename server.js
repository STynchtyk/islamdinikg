const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const namazvakti = require('./namazvakti.js');

const sourceDir = path.join(__dirname, 'public');
const publicDir = fs.existsSync(sourceDir) ? sourceDir : __dirname;
const types = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.gif': 'image/gif',
  '.mp3': 'audio/mpeg',
  '.pdf': 'application/pdf',
  '.epub': 'application/epub+zip',
  '.mobi': 'application/x-mobipocket-ebook',
};
const timetableCache = new Map();
const timetableCacheMs = 15 * 60 * 1000;
let locationsCache = null;
let locationsCacheSavedAt = 0;
const locationsCacheMs = 24 * 60 * 60 * 1000;
const officialTimeoutMs = 12000;

function sendJson(response, status, payload) {
  response.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  });
  response.end(JSON.stringify(payload));
}

function isValidDate(date) {
  const match = String(date || '').match(/^(\d{2})-(\d{2})-(\d{4})$/);
  if (!match) return false;
  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);
  const parsed = new Date(Date.UTC(year, month - 1, day));
  return parsed.getUTCFullYear() === year
    && parsed.getUTCMonth() === month - 1
    && parsed.getUTCDate() === day;
}

function isValidLocationCode(location) {
  return /^\d{1,3}$/.test(String(location || '')) && Number(location) > 0;
}

function normalizeTime(value) {
  const match = String(value || '').match(/^(\d{1,2}):(\d{2})/);
  if (!match) return null;
  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  if (!Number.isInteger(hours) || !Number.isInteger(minutes) || hours > 23 || minutes > 59) return null;
  return String(hours).padStart(2, '0') + ':' + String(minutes).padStart(2, '0');
}

function normalizeOfficialTimings(rawTimings) {
  const result = {};
  for (const key of ['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha']) {
    const value = normalizeTime(rawTimings?.[key]);
    if (!value) return null;
    result[key] = value;
  }
  return result;
}

function normalizeOfficialLocationGroups(rawGroups) {
  if (!Array.isArray(rawGroups)) return null;
  const groups = rawGroups.map((group) => {
    const title = String(group?.title || '').trim();
    const locations = Array.isArray(group?.locations)
      ? group.locations.map((location) => ({
        id: Number(location?.id),
        title: String(location?.title || '').trim(),
      })).filter((location) => Number.isInteger(location.id) && location.id > 0 && location.title)
      : [];
    return { title, locations };
  }).filter((group) => group.title && group.locations.length);
  return groups.length ? groups : null;
}

async function fetchOfficialLocations() {
  if (locationsCache && Date.now() - locationsCacheSavedAt < locationsCacheMs) return locationsCache;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), officialTimeoutMs);
  try {
    const remoteResponse = await fetch('https://muftiyat.kg/kg/api/v1/calendar/alllocations/', {
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    });
    if (!remoteResponse.ok) throw new Error('Official location list returned ' + remoteResponse.status);
    const groups = normalizeOfficialLocationGroups(await remoteResponse.json());
    if (!groups) throw new Error('Official location list returned incomplete data');
    locationsCache = groups;
    locationsCacheSavedAt = Date.now();
    return groups;
  } finally {
    clearTimeout(timeout);
  }
}

async function fetchOfficialTimetable(location, date) {
  const cacheKey = location + ':' + date;
  const cached = timetableCache.get(cacheKey);
  if (cached && Date.now() - cached.savedAt < timetableCacheMs) return cached.timings;

  const endpoint = new URL('https://muftiyat.kg/ru/api/v1/calendar/' + location + '/');
  endpoint.searchParams.set('start', date);
  endpoint.searchParams.set('end', date);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), officialTimeoutMs);

  try {
    const remoteResponse = await fetch(endpoint, {
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    });
    if (!remoteResponse.ok) throw new Error('Official timetable returned ' + remoteResponse.status);
    const payload = await remoteResponse.json();
    const row = Array.isArray(payload?.prayertimes)
      ? payload.prayertimes.find((item) => item?.date === date)
      : null;
    const timings = normalizeOfficialTimings(row);
    if (!timings) throw new Error('Official timetable returned incomplete data');
    timetableCache.set(cacheKey, { timings, savedAt: Date.now() });
    return timings;
  } finally {
    clearTimeout(timeout);
  }
}

async function handlePrayerRequest(requestUrl, response) {
  const location = requestUrl.searchParams.get('location');
  const date = requestUrl.searchParams.get('date');
  if (!isValidLocationCode(location) || !isValidDate(date)) {
    sendJson(response, 400, { error: 'Invalid prayer timetable request.' });
    return;
  }

  try {
    const timings = await fetchOfficialTimetable(location, date);
    sendJson(response, 200, {
      source: 'muftiyat',
      location: Number(location),
      date,
      timings,
      fetchedAt: new Date().toISOString(),
    });
  } catch {
    sendJson(response, 502, { error: 'Official timetable is temporarily unavailable.' });
  }
}

async function handleLocationsRequest(response) {
  try {
    const groups = await fetchOfficialLocations();
    sendJson(response, 200, {
      source: 'muftiyat',
      groups,
      fetchedAt: new Date().toISOString(),
    });
  } catch {
    sendJson(response, 502, { error: 'Official location list is temporarily unavailable.' });
  }
}

http.createServer(async (request, response) => {
  const requestUrl = new URL(request.url, 'http://localhost');

  if (requestUrl.pathname === '/api/prayer') {
    if (request.method !== 'GET') {
      response.writeHead(405, { Allow: 'GET' }).end('Method not allowed');
      return;
    }
    try { sendJson(response, 200, await namazvakti.timetable(requestUrl.searchParams)); }
    catch { sendJson(response, 502, {error:'NamazVakti timetable is unavailable for this date or location.'}); }
    return;
  }

  if (requestUrl.pathname === '/api/locations') {
    if (request.method !== 'GET') {
      response.writeHead(405, { Allow: 'GET' }).end('Method not allowed');
      return;
    }
    try { sendJson(response, 200, {source:'namazvakti',groups:await namazvakti.locations()}); }
    catch { sendJson(response, 502, {error:'NamazVakti city catalog unavailable.'}); }
    return;
  }

  let requestedFile;
  try { requestedFile = requestUrl.pathname === '/' ? 'index.html' : decodeURIComponent(requestUrl.pathname).replace(/^\/+/, ''); }
  catch { response.writeHead(400).end('Bad path'); return; }
  const filePath = path.resolve(publicDir, requestedFile);
  if (!filePath.startsWith(publicDir + path.sep) && filePath !== path.join(publicDir, 'index.html')) {
    response.writeHead(403).end('Forbidden');
    return;
  }

  fs.stat(filePath, (error, stat) => {
    if (error || !stat.isFile()) {
      response.writeHead(error?.code === 'ENOENT' || !error ? 404 : 500).end('Not found');
      return;
    }
    let start=0,end=stat.size-1,status=200;
    const range=request.headers.range;
    if(range){
      const match=range.match(/^bytes=(\d*)-(\d*)$/);
      if(!match || (!match[1]&&!match[2])){response.writeHead(416,{'Content-Range':`bytes */${stat.size}`}).end();return;}
      if(!match[1])start=Math.max(0,stat.size-Number(match[2]));
      else{start=Number(match[1]);if(match[2])end=Math.min(end,Number(match[2]));}
      if(start>end || start>=stat.size || !Number.isSafeInteger(start)){response.writeHead(416,{'Content-Range':`bytes */${stat.size}`}).end();return;}
      status=206;
    }
    response.writeHead(status, {
      'Content-Type': types[path.extname(filePath).toLowerCase()] || 'application/octet-stream',
      'Cache-Control': 'no-cache',
      'Accept-Ranges':'bytes', 'Content-Length':Math.max(0,end-start+1),
      'X-Content-Type-Options':'nosniff',
      ...(status===206?{'Content-Range':`bytes ${start}-${end}/${stat.size}`}:{})
    });
    if(request.method==='HEAD'||!stat.size){response.end();return;}
    const stream=fs.createReadStream(filePath,{start,end});
    stream.on('error',()=>response.destroy());response.on('close',()=>stream.destroy());stream.pipe(response);
  });
}).listen(Number(process.env.ISLAMDINI_PORT) || 4173, '127.0.0.1', () => console.log('Islamdini local preview: http://127.0.0.1:' + (Number(process.env.ISLAMDINI_PORT) || 4173)));
