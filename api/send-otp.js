export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { phone } = req.body;
  if (!phone) {
    return res.status(400).json({ success: false, error: 'Phone number is required' });
  }

  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const serviceSid = process.env.TWILIO_VERIFY_SERVICE_SID;

  try {
    const response = await fetch(
      `https://verify.twilio.com/v2/Services/${serviceSid}/Verifications`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'Basic ' + Buffer.from(`${accountSid}:${authToken}`).toString('base64'),
        },
        body: new URLSearchParams({ To: phone, Channel: 'sms' }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error('Twilio send-otp error:', data);
      return res.status(400).json({ success: false, error: data.message || 'Failed to send OTP' });
    }

    return res.status(200).json({ success: true, status: data.status });
  } catch (error) {
    console.error('send-otp error:', error);
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
}
