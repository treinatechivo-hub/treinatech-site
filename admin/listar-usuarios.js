/**
 * Script de diagnóstico — lista todos os documentos da coleção `users`
 * Requer: chave de conta de serviço do Firebase (serviceAccountKey.json)
 *
 * Como obter a chave:
 *   Firebase Console → Configurações do projeto → Contas de serviço
 *   → "Gerar nova chave privada" → salvar como admin/serviceAccountKey.json
 *
 * Executar: node admin/listar-usuarios.js
 */

const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: 'treinatech-3ef28',
});

const db = admin.firestore();

async function listarUsuarios() {
  console.log('Conectando ao Firestore — projeto: treinatech-3ef28\n');

  const snapshot = await db.collection('users').get();

  if (snapshot.empty) {
    console.log('ATENÇÃO: A coleção "users" está vazia ou não existe.');
    return;
  }

  console.log(`Total de documentos encontrados: ${snapshot.size}\n`);
  console.log('─'.repeat(60));

  snapshot.forEach((doc) => {
    const data = doc.data();
    console.log(`ID: ${doc.id}`);
    console.log(`  email : ${data.email ?? '(sem campo email)'}`);
    console.log(`  ativo : ${data.ativo ?? '(campo ativo ausente!)'}`);
    console.log(`  nome  : ${data.nome ?? data.displayName ?? '(sem nome)'}`);
    console.log('─'.repeat(60));
  });

  // Resumo rápido para diagnóstico
  const semCampoAtivo = snapshot.docs.filter(d => d.data().ativo === undefined);
  const inativos      = snapshot.docs.filter(d => d.data().ativo === false);
  const ativos        = snapshot.docs.filter(d => d.data().ativo === true);

  console.log('\nResumo:');
  console.log(`  ✓ ativo = true  : ${ativos.length}`);
  console.log(`  ✗ ativo = false : ${inativos.length}`);
  console.log(`  ? campo ausente : ${semCampoAtivo.length}`);

  if (semCampoAtivo.length > 0) {
    console.log('\n⚠️  Usuários SEM campo "ativo" (bloqueados pelas regras atuais):');
    semCampoAtivo.forEach(d => console.log(`   - ${d.id} (${d.data().email ?? 'sem email'})`));
  }

  process.exit(0);
}

listarUsuarios().catch((err) => {
  console.error('Erro ao acessar o Firestore:', err.message);
  process.exit(1);
});
