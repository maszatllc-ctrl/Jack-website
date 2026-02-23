import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { phone, code } = req.body;
  if (!phone || !code) {
    return res.status(400).json({ success: false, error: 'Phone and code are required' });
  }

  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const serviceSid = process.env.TWILIO_VERIFY_SERVICE_SID;

  try {
    const response = await fetch(
      `https://verify.twilio.com/v2/Services/${serviceSid}/VerificationCheck`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'Basic ' + Buffer.from(`${accountSid}:${authToken}`).toString('base64'),
        },
        body: new URLSearchParams({ To: phone, Code: code }),
      }
    );

    const data = await response.json();

    if (!response.ok || data.status !== 'approved') {
      return res.status(400).json({ success: false, error: 'Invalid verification code' });
    }

    // OTP is verified — update the lead's verified status in Supabase.
    // Wrapped in its own try/catch so a Supabase failure never causes the
    // user to see "invalid code" after their OTP was already approved.
    try {
      const supabaseUrl = process.env.SUPABASE_URL;
      const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

      if (!supabaseUrl || !supabaseServiceKey) {
        console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars — skipping DB update');
      } else {
        const supabase = createClient(supabaseUrl, supabaseServiceKey);
        const { error: dbError } = await supabase
          .from('term_leads')
          .update({ verified: true })
          .eq('phone', phone);

        if (dbError) {
          console.error('Error updating lead verification in DB:', dbError);
        }
      }
    } catch (dbErr) {
      console.error('Supabase update failed (OTP was still verified):', dbErr);
    }

    return res.status(200).json({ success: true, status: data.status });
  } catch (error) {
    console.error('verify-otp error:', error);
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
}
