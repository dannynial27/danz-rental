importScripts('https://www.gstatic.com/firebasejs/10.8.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.1/firebase-messaging-compat.js');

// We need the config here to initialize the background worker
const firebaseConfig = {
  // Use URL params or inject build time if needed, but since this is static, 
  // we'll use placeholder values that the developer will need to fill or we use generic.
  // Wait, the client SDK uses exact config. We can fetch it or hardcode it since it's public anyway.
  apiKey: "AIzaSyD3nzXU5jzmfLHrtyhv9ZLQJ7vLheMauy0",
  projectId: "danz-rental-db-2026",
  messagingSenderId: "1098477667246",
  appId: "1:1098477667246:web:84528b29362ea91e973e3f"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Note: Firebase SDK automatically displays notifications if the payload contains a 'notification' object.
  // We only use this listener to log or handle data-only payloads.
});
