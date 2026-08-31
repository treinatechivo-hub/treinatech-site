import type { IncomingMessage, ServerResponse } from 'http';

const MODEL_CANDIDATES = [
  'llama-3.3-70b-versatile',
  'llama-3.1-8b-instant',
  'openai/gpt-oss-120b',
  'openai/gpt-oss-20b',
];

async function callGroq(apiKey: string, model: string, groqMessages: { role: string; content: string }[]) {
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: groqMessages,
      max_tokens: 1000,
    }),
  });
  const data = await response.json();
  return { response, data };
}

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

  const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'API key not configured' }));
          return;
    }

  try {
      const groqMessages: { role: string; content: string }[] = [];

      if (system) {
          groqMessages.push({ role: 'system', content: system });
      }

      for (const msg of messages) {
          groqMessages.push({ role: msg.role, content: msg.content });
      }

      let response: Response | undefined;
      let data: any;

      // Tenta os modelos em ordem; se um foi descontinuado/indisponível
      // (model_not_found), tenta o próximo automaticamente em vez de falhar.
      for (const model of MODEL_CANDIDATES) {
        const result = await callGroq(apiKey, model, groqMessages);
        response = result.response;
        data = result.data;

        if (result.response.ok) {
          break;
        }

        const code = data?.error?.code;
        const isModelIssue = code === 'model_not_found' || code === 'model_decommissioned';
        if (!isModelIssue) {
          break;
        }
        console.warn(`Modelo Groq indisponível (${model}), tentando próximo...`);
      }

      if (!response || !response.ok) {
              res.writeHead(response?.status || 502, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify(data));
              return;
      }

      const text = data.choices?.[0]?.message?.content || '';
        const result = { content: [{ type: 'text', text }] };

      res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result));
  } catch (err) {
        console.error('API error:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal server error' }));
  }
}
