const { timetable } = require('../namazvakti.js');
module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'GET') return res.status(405).json({error:'Method not allowed'});
  const params = new URL(req.url, 'https://localhost').searchParams;
  if (!/^\d{2}-\d{2}-\d{4}$/.test(params.get('date') || '')) return res.status(400).json({error:'Invalid date'});
  try { return res.status(200).json(await timetable(params)); }
  catch { return res.status(502).json({error:'NamazVakti timetable unavailable for this date or location. Please retry.'}); }
};
