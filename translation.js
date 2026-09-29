/* Topic names are bundled; article translations are fetched on demand and cached locally. */
(() => {
  'use strict';
  const rows = [
    ['Китепкана', 'Библиотека', 'Library'],
    ['Аудио', 'Аудио', 'Audio'],
    ['Аллаху таалага ишенүү', 'Вера в Аллаха', 'Belief in Allah'],
    ['Периштелерге ишенүү', 'Вера в ангелов', 'Belief in angels'],
    ['Китептерге ишенүү', 'Вера в священные книги', 'Belief in the revealed books'],
    ['Пайгамбарларга ишенүү', 'Вера в пророков', 'Belief in the prophets'],
    ['Акырет күнүнө ишенүү', 'Вера в Судный день', 'Belief in the Day of Judgment'],
    ['Тагдырга ишенүү', 'Вера в предопределение', 'Belief in divine decree'],
    ['Аалымдардын маектери', 'Беседы учёных', 'Talks by Islamic scholars'],
    ['Аврат жерлерди жабуу', 'Прикрытие аурата', 'Covering the awrah'],
    ['Адал жана арамдар', 'Дозволенное и запретное', 'Halal and haram'],
    ['Адеп-ахлак', 'Нравственность и этикет', 'Morals and etiquette'],
    ['Ажылык', 'Хадж — паломничество', 'Hajj — pilgrimage'],
    ['Башкаруучулук', 'Руководство и управление', 'Leadership and governance'],
    ['Ваххабилик', 'Ваххабизм', 'Wahhabism'],
    ['Гусул', 'Гусль — полное омовение', 'Ghusl — full ritual washing'],
    ['Даарат, таяммум', 'Омовение и таяммум', 'Wudu and tayammum'],
    ['Динибиз', 'Наша религия', 'Our religion'],
    ['Динибиз жана ката ишенимдер', 'Религия и ошибочные убеждения', 'Religion and mistaken beliefs'],
    ['Дубалар жана маанилери', 'Дуа и их значения', 'Duas and their meanings'],
    ['Жалгыз Куран дегендер', 'Сторонники только Корана', 'Quran-only beliefs'],
    ['Зекет, ушур жана садака', 'Закят, ушр и садака', 'Zakat, ushr and charity'],
    ['Ибадаттарыбыз', 'Наше поклонение', 'Our acts of worship'],
    ['Ибреттүү аңгемелер', 'Поучительные рассказы', 'Instructive stories'],
    ['Илимден бир тамчы', 'Капля знаний', 'A drop of knowledge'],
    ['Илимден бир тамчы v1', 'Капля знаний — часть 1', 'A drop of knowledge — part 1'],
    ['Ислам Ахлагы', 'Исламская нравственность', 'Islamic ethics'],
    ['Итикад имамдары', 'Имамы вероубеждения', 'Imams of Islamic creed'],
    ['Кимдер менен үйлөнүүгө болот', 'С кем разрешено вступать в брак', 'Who may one marry?'],
    ['Кошумча темалар', 'Дополнительные темы', 'Additional topics'],
    ['Куран котормосу жана тафсир', 'Перевод и толкование Корана', 'Quran translation and tafsir'],
    ['Курани карим', 'Священный Коран', 'The Holy Quran'],
    ['Курмандык жана адак', 'Жертвоприношение и обет', 'Sacrifice and vows'],
    ['Кыбыланы кароо', 'Направление киблы', 'The direction of the qibla'],
    ['Кээ бир мазхабсыздар', 'Некоторые сторонники отказа от мазхабов', 'Some opponents of the madhhabs'],
    ['Кээ бир сүрөлөрдүн пайдалары', 'Польза некоторых сур', 'Benefits of certain surahs'],
    ['Мазхаб имамдары', 'Имамы мазхабов', 'Imams of the madhhabs'],
    ['Мазхаб тууралуу', 'О мазхабах', 'About the madhhabs'],
    ['Музыка жана обон', 'Музыка и мелодии', 'Music and melodies'],
    ['Нажасаттан тахарат (тазалануу)', 'Очищение от нечистот', 'Purification from impurities'],
    ['Намаз', 'Намаз', 'Prayer'],
    ['Намаз убакыттары', 'Время намаза', 'Prayer times'],
    ['Нике жана үй-бүлө', 'Брак и семья', 'Marriage and family'],
    ['Ойдон чыгарылган хадис болобу?', 'Бывают ли вымышленные хадисы?', 'Can hadiths be fabricated?'],
    ['Олуяны таануу', 'Как распознать праведника', 'Recognizing a righteous person'],
    ['Орозо жана Рамазан', 'Пост и Рамадан', 'Fasting and Ramadan'],
    ['Пайгамбарлар, аалымдар', 'Пророки и учёные', 'Prophets and scholars'],
    ['Пайгамбарлардын өмүр баяндары', 'Жизнеописания пророков', 'Lives of the prophets'],
    ['Пайгамбарыбыз', 'Наш Пророк', 'Our Prophet'],
    ['Сахабалар', 'Сподвижники', 'The Companions'],
    ['Соода, алышуу-беришүү', 'Торговля и сделки', 'Trade and transactions'],
    ['Сүннөт-бидат', 'Сунна и нововведения', 'Sunnah and innovations'],
    ['Сүрөлөр жана дубалар', 'Суры и дуа', 'Surahs and duas'],
    ['Сүрөлөрдүн тизмеси', 'Список сур', 'List of surahs'],
    ['Сүрөттөрү менен намаз', 'Намаз в иллюстрациях', 'Illustrated prayer guide'],
    ['Терминдер', 'Термины', 'Glossary'],
    ['Төрт улуу халифа', 'Четыре праведных халифа', 'The four rightly guided caliphs'],
    ['Хайз', 'Менструация и религиозные предписания', 'Menstruation and religious rulings'],
    ['Христиандык', 'Христианство', 'Christianity'],
    ['Шиилик', 'Шиизм', 'Shia Islam'],
    ['Ширк жана кооптуу сөздөр', 'Ширк и опасные высказывания', 'Shirk and dangerous expressions'],
    ['Ыйман жана Ислам', 'Вера и Ислам', 'Faith and Islam'],
    ['Ыйман маалыматтары', 'Знания о вере', 'Knowledge of faith'],
    ['Ыйык күн жана түндөр', 'Священные дни и ночи', 'Sacred days and nights'],
    ['Эмнелерди жеп-ичүүгө болот', 'Что разрешено есть и пить', 'Permitted food and drink'],
    ['Эмнелерди колдонууга болот', 'Что разрешено использовать', 'What is permissible to use'],
    ['Этика', 'Этика', 'Ethics'],
    ['Яхудилик', 'Иудаизм', 'Judaism'],
    ['Kуру ишенимдер', 'Суеверия', 'Superstitions'],
    ['Жүктөп алуу', 'Скачать', 'Downloads'], ['Mail группасы', 'Почтовая группа', 'Mailing group'],
    ['Материалы', 'Материалы', 'Materials'], ['Шилтеме', 'Ссылки', 'Links'],
  ];
  const key = (value) => String(value || '').normalize('NFKC').trim().toLocaleLowerCase('ky-KG').replace(/\s+/g, ' ');
  const topics = new Map(rows.map(([ky, ru, en]) => [key(ky), { ky, ru, en }]));
  function topic(name, language) {
    return String(name || '').split(/\s*·\s*/u).map((part) => {
      const match = topics.get(key(part));
      if (match) return match[language] || match.ky;
      const range = part.match(/^(\d+)[-–](\d+) беттер$/);
      if (range) return `${Number(range[1])}–${Number(range[2])} ${language === 'en' ? 'pages' : language === 'ru' ? 'страницы' : 'беттер'}`;
      return part;
    }).join(' · ');
  }
  const topicSearch = (name) => [name, topic(name, 'ru'), topic(name, 'en')].join(' ');
  const shortcuts = {
    'куран': ['Коран', 'Quran'], 'намаз': ['намаз', 'prayer'], 'орозо': ['пост', 'fasting'],
    'дуба': ['дуа', 'dua'], 'пайгамбар': ['пророк', 'prophet'], 'ибадат': ['поклонение', 'worship'],
    'адеп': ['этикет', 'etiquette'], 'китеп': ['книги', 'books'],
  };
  const shortQuery = (name, language) => shortcuts[name]?.[language === 'ru' ? 0 : language === 'en' ? 1 : -1] || name;
  const placeNames = {
    'Кыргызстан': ['Кыргызстан', 'Кыргызстан', 'Kyrgyzstan'],
    'Россия': ['Россия', 'Россия', 'Russia'], 'Казахстан': ['Казакстан', 'Казахстан', 'Kazakhstan'],
    'Саудовская Аравия': ['Сауд Арабиясы', 'Саудовская Аравия', 'Saudi Arabia'],
    'Узбекистан': ['Өзбекстан', 'Узбекистан', 'Uzbekistan'],
    'Таджикистан': ['Тажикстан', 'Таджикистан', 'Tajikistan'],
    'Туркменистан': ['Түркмөнстан', 'Туркменистан', 'Turkmenistan'],
    'Азербайджан': ['Азербайжан', 'Азербайджан', 'Azerbaijan'],
    'ОАЭ': ['БАЭ', 'ОАЭ', 'UAE'], 'Южная Корея': ['Түштүк Корея', 'Южная Корея', 'South Korea'],
    'Республика Корея': ['Корея Республикасы', 'Республика Корея', 'Republic of Korea'],
    'Казахстан · Атырауская область': ['Казакстан · Атырау облусу', 'Казахстан · Атырауская область', 'Kazakhstan · Atyrau Region'],
    'Баткен облусу': ['Баткен облусу', 'Баткенская область', 'Batken Region'],
    'Жалал-Абад облусу': ['Жалал-Абад облусу', 'Джалал-Абадская область', 'Jalal-Abad Region'],
    'Ысык-Көл облусу': ['Ысык-Көл облусу', 'Иссык-Кульская область', 'Issyk-Kul Region'],
    'Нарын облусу': ['Нарын облусу', 'Нарынская область', 'Naryn Region'],
    'Ош облусу': ['Ош облусу', 'Ошская область', 'Osh Region'],
    'Талас облусу': ['Талас облусу', 'Таласская область', 'Talas Region'],
    'Чүй облусу': ['Чүй облусу', 'Чуйская область', 'Chuy Region'],
    'Москва': ['Москва', 'Москва', 'Moscow'], 'Мекка': ['Мекке', 'Мекка', 'Mecca'],
    'Мадина': ['Мадина', 'Медина', 'Medina'], 'Санкт-Петербург': ['Санкт-Петербург', 'Санкт-Петербург', 'Saint Petersburg'],
    'Сеул': ['Сеул', 'Сеул', 'Seoul'], 'Дубай': ['Дубай', 'Дубай', 'Dubai'],
    'Ири шаарлар': ['Ири шаарлар', 'Крупные города', 'Major cities'],
    'Чоң шаарлар': ['Чоң шаарлар', 'Крупные города', 'Major cities'],
  };
  const latin = { а:'a', б:'b', в:'v', г:'g', д:'d', е:'e', ё:'yo', ж:'zh', з:'z', и:'i', й:'y', к:'k', л:'l', м:'m', н:'n', ң:'ng', о:'o', ө:'o', п:'p', р:'r', с:'s', т:'t', у:'u', ү:'u', ф:'f', х:'kh', ц:'ts', ч:'ch', ш:'sh', щ:'shch', ъ:'', ы:'y', ь:'', э:'e', ю:'yu', я:'ya' };
  function place(value, language) {
    if (placeNames[value]) return placeNames[value][{ky:0, ru:1, en:2}[language]];
    if (language === 'ky') return value;
    if (language === 'ru') return value.replace(/облусу/gi, 'область').replace(/шаары/gi, 'город');
    return value.replace(/облусу/gi, 'Region').replace(/шаары/gi, 'City').replace(/область/gi, 'Region').replace(/[а-яёңөү]/gi, (char) => {
      const result = latin[char.toLowerCase()];
      return char === char.toUpperCase() ? result.charAt(0).toUpperCase() + result.slice(1) : result;
    });
  }
  const memory = new Map();
  const pending = new Map();
  const queue = [];
  let running = 0;
  let dbPromise;

  function database() {
    if (!dbPromise) dbPromise = new Promise((resolve) => {
      try {
        const request = indexedDB.open('islamdini-translations-v1', 1);
        request.onupgradeneeded = () => request.result.createObjectStore('texts');
        request.onsuccess = () => resolve(request.result);
        request.onerror = request.onblocked = () => resolve(null);
      } catch { resolve(null); }
    });
    return dbPromise;
  }
  async function readCache(cacheKey) {
    if (memory.has(cacheKey)) return memory.get(cacheKey);
    const db = await database();
    if (!db) return null;
    return new Promise((resolve) => {
      try {
        const request = db.transaction('texts').objectStore('texts').get(cacheKey);
        request.onsuccess = () => { if (request.result) memory.set(cacheKey, request.result); resolve(request.result || null); };
        request.onerror = () => resolve(null);
      } catch { resolve(null); }
    });
  }
  async function saveCache(cacheKey, value) {
    memory.set(cacheKey, value);
    const db = await database();
    if (!db) return;
    try { const transaction = db.transaction('texts', 'readwrite'); transaction.onerror = () => {}; transaction.objectStore('texts').put(value, cacheKey); } catch { /* Memory cache still works when storage is full. */ }
  }

  function drain() {
    while (running < 3 && queue.length) {
      const job = queue.shift();
      if (job.current && !job.current()) { job.reject(new Error('obsolete')); continue; }
      running++;
      job.run().then(job.resolve, job.reject).finally(() => { running--; drain(); });
    }
  }
  function schedule(run, current) {
    return new Promise((resolve, reject) => { queue.push({ run, current, resolve, reject }); drain(); });
  }
  function chunks(value, max = 1200) {
    const result = [];
    let remaining = value;
    while (remaining.length > max) {
      let end = remaining.lastIndexOf('\n', max);
      if (end < max / 2) end = remaining.lastIndexOf(' ', max);
      if (end < 1) end = max;
      result.push(remaining.slice(0, end));
      remaining = remaining.slice(end).trimStart();
    }
    if (remaining) result.push(remaining);
    return result;
  }
  async function request(text, language) {
    const endpoint = new URL('https://translate.googleapis.com/translate_a/single');
    endpoint.search = new URLSearchParams({ client: 'gtx', sl: 'ky', tl: language, dt: 't', q: text });
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 18000);
    try {
      const response = await fetch(endpoint, { signal: controller.signal });
      if (!response.ok) throw new Error(`Translation unavailable (${response.status})`);
      const payload = await response.json();
      const result = Array.isArray(payload?.[0]) ? payload[0].map((segment) => segment?.[0] || '').join('') : '';
      if (!result.trim()) throw new Error('Empty translation');
      return result;
    } finally { clearTimeout(timer); }
  }
  async function translate(value, language, current) {
    const source = String(value || '').trim();
    if (!source || language === 'ky') return source;
    if (!['ru', 'en'].includes(language)) throw new Error('Unsupported language');
    // Include the full source in the cache key so changed articles never reuse stale text.
    const cacheKey = `${language}:${source}`;
    const cached = await readCache(cacheKey);
    if (cached) return cached;
    if (current && !current()) throw new Error('obsolete');
    if (pending.has(cacheKey)) {
      try { return await pending.get(cacheKey); }
      catch (error) {
        // Another view may have queued this text and then been closed.
        if (error.message !== 'obsolete' || (current && !current())) throw error;
        return translate(source, language, current);
      }
    }
    const task = (async () => {
      const parts = [];
      for (const chunk of chunks(source)) {
        if (current && !current()) throw new Error('obsolete');
        parts.push(await schedule(() => request(chunk, language), current));
      }
      const translated = parts.join('\n');
      await saveCache(cacheKey, translated);
      return translated;
    })();
    pending.set(cacheKey, task);
    try { return await task; } finally { pending.delete(cacheKey); }
  }
  const api = { topic, topicSearch, shortQuery, place, translate, chunks, rows };
  globalThis.IslamdiniTranslation = api;
  if (typeof module !== 'undefined') module.exports = api;
})();
