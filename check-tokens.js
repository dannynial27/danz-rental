const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const serviceAccount = require('./serviceAccountKey.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

async function checkTokens() {
  const snapshot = await db.collection('admin_tokens').get();
  console.log(`Found ${snapshot.size} tokens in admin_tokens.`);
  snapshot.forEach(doc => {
    console.log(doc.id, '=>', doc.data());
  });
}

checkTokens().catch(console.error);
