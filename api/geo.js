export default function handler(req, res) {
  const state = req.headers['x-vercel-ip-country-region'] || '';
  const city = req.headers['x-vercel-ip-city'] || '';
  const country = req.headers['x-vercel-ip-country'] || '';

  return res.status(200).json({ state, city, country });
}
