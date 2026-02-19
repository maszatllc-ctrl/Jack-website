import crypto from 'crypto';

function sha256Hash(value) {
  if (!value) return undefined;
  return crypto.createHash('sha256').update(value.trim().toLowerCase()).digest('hex');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const pixelId = process.env.FB_PIXEL_ID;
  const accessToken = process.env.CAPI_ACCESS_TOKEN;

  if (!pixelId || !accessToken) {
    console.error('Facebook CAPI not configured (missing FB_PIXEL_ID or CAPI_ACCESS_TOKEN)');
    return res.status(500).json({ success: false, error: 'Facebook CAPI not configured' });
  }

  const { leadData, event_id, fbc, fbp } = req.body;

  try {
    const nameParts = (leadData.name || '').split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';
    const phoneDigits = (leadData.phone || '').replace(/\D/g, '');

    const userData = {
      ph: [sha256Hash(phoneDigits)],
      fn: [sha256Hash(firstName)],
      ln: [sha256Hash(lastName)],
      zp: [sha256Hash(leadData.zip_code)],
      st: [sha256Hash(leadData.state)],
      country: [sha256Hash('us')],
    };

    if (fbc) userData.fbc = fbc;
    if (fbp) userData.fbp = fbp;

    const response = await fetch(
      `https://graph.facebook.com/v18.0/${pixelId}/events?access_token=${accessToken}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: [
            {
              event_name: 'Lead',
              event_time: Math.floor(Date.now() / 1000),
              event_id: event_id,
              action_source: 'website',
              event_source_url: req.headers.referer || undefined,
              user_data: userData,
            },
          ],
        }),
      }
    );

    const data = await response.json();
    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('send-facebook-lead error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
