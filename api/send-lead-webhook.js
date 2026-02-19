export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const webhookUrl = process.env.WEBHOOK_URL;
  if (!webhookUrl) {
    console.error('WEBHOOK_URL environment variable not configured');
    return res.status(500).json({ success: false, error: 'Webhook URL not configured' });
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Webhook responded with ${response.status}: ${text}`);
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('send-lead-webhook error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
