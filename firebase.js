import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyBgHvZr6ItIZtb5Eu6Ocxnl8Gw4aWEys8Y",
  authDomain: "dropoutdefender.firebaseapp.com",
  databaseURL: "https://dropoutdefender-default-rtdb.firebaseio.com",
  projectId: "dropoutdefender",
  storageBucket: "dropoutdefender.firebasestorage.app",
  messagingSenderId: "981706129935",
  appId: "1:981706129935:web:03fcc0dd69b11e493d997a"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
