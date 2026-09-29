const { locations } = require('../../namazvakti.js');
exports.handler = async (event) => {
  const respond = (statusCode, data) => ({statusCode,headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'},body:JSON.stringify(data)});
  if(event.httpMethod !== 'GET') return respond(405,{error:'Method not allowed'});
  try {return respond(200,{source:'namazvakti',groups:await locations()});}
  catch {return respond(502,{error:'NamazVakti city catalog unavailable. Please retry.'});}
};
