import type { IncomingMessage, ServerResponse } from 'http';

export default async function handler(
    req: IncomingMessage & { body: any },
    res: ServerResponse & { status: (code: number) => any; json: (data: any) => void }
  ): Promise<void> {
    if (req.method !== 'POST') {
          res.writeHead(405, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
    }

  const { messages, system } = req.body;

  if (!messages || !Array.isArray(messages)) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid request body' }));
        return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'API key not configured' }));
          return;
    }

  try {
        const geminiContents = messages.map((msg: any) => ({
                role: msg.role === 'assistant' ? 'model' : 'user',
                parts: [{ text: msg.content }]
        }));

      const requestBody: any = {
              contents: geminiContents,
              generationConfig: { maxOutputTokens: 1000 }
      };

      if (system) {
              requestBody.systemInstruction = { parts: [{ text: system }] };
      }

      const response = await fetch(
              `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(requestBody)
        }
            );

      const data = await response.json();

      if (!response.ok) {
              res.writeHead(response.status, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify(data));
              return;
      }

      const geminiText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
        const result = { content: [{ type: 'text', text: geminiText }] };

      res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result));
  } catch (err) {
        console.error('API error:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal server error' }));
  }
}
