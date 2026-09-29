const { timetable } = require('../../namazvakti.js');
exports.handler = async (event) => {
  const respond = (statusCode, data) => ({statusCode,headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'},body:JSON.stringify(data)});
  if(event.httpMethod !== 'GET') return respond(405,{error:'Method not allowed'});
  const params=new URLSearchParams(event.queryStringParameters || {});
  if(!/^\d{2}-\d{2}-\d{4}$/.test(params.get('date') || '')) return respond(400,{error:'Invalid date'});
  try {return respond(200,await timetable(params));}
  catch {return respond(502,{error:'NamazVakti timetable unavailable. Please retry.'});}
};
