const { locations } = require('../namazvakti.js');
module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'GET') return res.status(405).json({error:'Method not allowed'});
  try { return res.status(200).json({source:'namazvakti',groups:await locations()}); }
  catch { return res.status(502).json({error:'NamazVakti city catalog unavailable. Please retry.'}); }
};
