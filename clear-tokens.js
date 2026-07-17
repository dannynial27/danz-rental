const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

async function clearTokens() {
  const snapshot = await db.collection('admin_tokens').get();
  let count = 0;
  for (const doc of snapshot.docs) {
    await db.collection('admin_tokens').doc(doc.id).delete();
    count++;
  }
  console.log(`Deleted ${count} tokens.`);
}

clearTokens();
