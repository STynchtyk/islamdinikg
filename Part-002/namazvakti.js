const origin = 'https://www.namazvakti.com';
const cache = new Map();
async function read(url) {
  const r = await fetch(url, {signal:AbortSignal.timeout(10000)});
  if (!r.ok) throw new Error('NamazVakti HTTP '+r.status);
  return r.text();
}
function parse(html,date,expected={}) {
  const metadata = html.match(/<div\b[^>]*id=['"]cityData['"][^>]*>/i)?.[0] || '';
  const attr = name => metadata.match(new RegExp(`data-${name}=['"]([^'"]*)['"]`))?.[1];
  const actual = `${String(attr('dayofmonth')).padStart(2,'0')}-${String(attr('month')).padStart(2,'0')}-${attr('year')}`;
  if (actual !== date) throw new Error('Date mismatch');
  if (expected.cityID && attr('cityid') !== String(expected.cityID)) throw new Error('City mismatch');
  if (expected.latitude != null && (!attr('arz') || !attr('tul') || Math.abs(Number(attr('arz'))-expected.latitude)>.01 || Math.abs(Number(attr('tul'))-expected.longitude)>.01)) throw new Error('Coordinates mismatch');
  const rows = new Map([...html.matchAll(/<summary>([^<]+)<\/summary>[\s\S]*?<td[^>]*>(\d{2}:\d{2})<\/td>/g)].map(m=>[m[1].trim(),m[2]]));
  // Six primary times exactly as labelled on the NamazVakti English page.
  const timings = Object.fromEntries(Object.entries({fajr:'Fajr',sunrise:'Tulu',dhuhr:'Zuhr',asr:'Asr',maghrib:'Maghrib',isha:'Isha'}).map(([key,label])=>[key,rows.get(label)]));
  if (Object.values(timings).some(v=>!/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(v || ''))) throw new Error('Incomplete timetable');
  return timings;
}
async function timetable(params) {
  const date=params.get('date');
  if (!/^\d{2}-\d{2}-\d{4}$/.test(date || '')) throw new Error('Invalid date');
  const url=new URL('/Main.php',origin), expected={};
  url.searchParams.set('WSLanguage','EN');
  if (/^\d{1,7}$/.test(params.get('cityID') || '')) {
    expected.cityID=params.get('cityID'); url.searchParams.set('cityID',expected.cityID);
  } else {
    const lat=Number(params.get('latitude')),lon=Number(params.get('longitude')),offset=Number(params.get('offset'));
    if (!params.has('latitude') || !params.has('longitude') || !Number.isFinite(lat) || !Number.isFinite(lon) || Math.abs(lat)>90 || Math.abs(lon)>180 || !Number.isFinite(offset) || Math.abs(offset)>50400) throw new Error('Invalid location');
    expected.latitude=lat; expected.longitude=lon;
    url.searchParams.set('arz',lat); url.searchParams.set('tul',lon); url.searchParams.set('tz_offset',offset);
  }
  const key=date+url.href, saved=cache.get(key);
  if (saved && Date.now()-saved.at<900000) return saved.value;
  const timings=parse(await read(url),date,expected);
  const value={source:'namazvakti',date,timings,sourceUrl:url.href};
  if(cache.size>500) cache.clear();
  cache.set(key,{at:Date.now(),value}); return value;
}
let savedGroups;
async function locations() {
  if(savedGroups && Date.now()-savedGroups.at<86400000) return savedGroups.groups;
  const states=await read(origin+'/StateList.php?countryID=104&WSLanguage=EN');
  const urls=[...new Set([...states.matchAll(/href="(\/CityList\.php\?countryID=104&state=[^"]+)"/g)].map(m=>m[1]))];
  if(!urls.length) throw new Error('City catalog unavailable');
  const groups=await Promise.all(urls.map(async relative=>{
    const url=new URL(relative.replace(/&amp;/g,'&'),origin); url.searchParams.set('WSLanguage','EN');
    const html=await read(url);
    const locations=[...html.matchAll(/href="\/Main\.php\?cityID=(\d+)"[^>]*>\s*<span[^>]*>[^<]*<\/span>([^<]+)<\/a>/g)].map(m=>({id:Number(m[1]),title:m[2].trim()}));
    return {title:url.searchParams.get('state'),locations};
  }));
  if(!groups.some(g=>g.locations.length)) throw new Error('Empty city catalog');
  savedGroups={at:Date.now(),groups}; return groups;
}
module.exports={timetable,locations,parse};
