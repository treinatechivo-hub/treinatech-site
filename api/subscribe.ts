import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body ?? {};
  if (!email || typeof email !== 'string') {
    return res.status(400).json({ error: 'Email inválido' });
  }

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Configuração ausente no servidor' });
  }

  try {
    const brevoRes = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        email: email.toLowerCase().trim(),
        listIds: [5],
        updateEnabled: true,
      }),
    });

    const data = await brevoRes.json();

    if (brevoRes.ok || brevoRes.status === 204) {
      return res.status(200).json({ success: true });
    }

    // Contato já existe — considera sucesso
    if (data.code === 'duplicate_parameter') {
      return res.status(200).json({ success: true });
    }

    console.error('Brevo error:', data);
    return res.status(400).json({ error: data.message ?? 'Erro ao cadastrar' });
  } catch (err) {
    console.error('Subscribe handler error:', err);
    return res.status(500).json({ error: 'Erro interno' });
  }
}
