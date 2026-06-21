import type { VercelRequest, VercelResponse } from '@vercel/node';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

function getAdminApp() {
  if (getApps().length > 0) return getApps()[0];
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT!);
  return initializeApp({ credential: cert(serviceAccount) });
}

function emailToId(email: string) {
  return email.toLowerCase().replace(/[@.]/g, '_');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { name, email, password } = req.body ?? {};
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Dados incompletos.' });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: 'A senha deve ter no mínimo 6 caracteres.' });
  }

  const app = getAdminApp();
  const auth = getAuth(app);
  const db = getFirestore(app);

  // 1. Criar usuário no Firebase Auth
  let uid: string;
  try {
    const user = await auth.createUser({ email, password, displayName: name });
    uid = user.uid;
  } catch (err: any) {
    if (err.code === 'auth/email-already-exists') {
      return res.status(409).json({ error: 'Este e-mail já está cadastrado.' });
    }
    console.error('Auth error:', err);
    return res.status(500).json({ error: 'Erro ao criar conta.' });
  }

  // 2. Calcular expiração (30 dias)
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 30);

  // 3. Criar registro no Firestore
  const id = emailToId(email);
  const studentData = {
    id,
    name,
    email: email.toLowerCase().trim(),
    enrolledCourses: ['intro-ia-claude'],
    courseExpiry: { 'intro-ia-claude': expiresAt.toISOString() },
    active: true,
    createdAt: new Date().toISOString(),
    uid,
  };
  await db.collection('students').doc(id).set(studentData);

  // 4. Enviar e-mail de boas-vindas via Brevo
  const brevoApiKey = process.env.BREVO_API_KEY!;
  await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'api-key': brevoApiKey },
    body: JSON.stringify({
      sender: { name: 'Treinatech', email: 'noreply@treinatech.com.br' },
      to: [{ email, name }],
      subject: 'Bem-vindo(a) à Treinatech — seus dados de acesso',
      htmlContent: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
          <div style="background:#1B5E20;padding:24px;text-align:center">
            <h1 style="color:#ffffff;margin:0">Treinatech</h1>
          </div>
          <div style="padding:32px;background:#ffffff">
            <h2 style="color:#1B5E20">Olá, ${name}!</h2>
            <p>Seu acesso ao curso <strong>Introdução à IA com Foco no Claude</strong> foi criado com sucesso.</p>
            <p><strong>Seus dados de acesso:</strong></p>
            <ul>
              <li><strong>Login (e-mail):</strong> ${email}</li>
              <li><strong>Senha:</strong> ${password}</li>
            </ul>
            <p>⚠️ Seu acesso é válido por <strong>30 dias</strong> a partir de hoje.</p>
            <a href="https://www.treinatech.com.br/#alunos"
               style="display:inline-block;background:#006A2B;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:bold;margin-top:16px">
              Acessar a Área do Aluno
            </a>
          </div>
          <div style="padding:16px;background:#F7F7F7;text-align:center;font-size:12px;color:#333">
            Treinatech · treinatech.com.br
          </div>
        </div>
      `,
    }),
  });

  return res.status(200).json({ success: true });
}
