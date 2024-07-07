import firebase from 'firebase/compat/app'; // For Firebase v9 and above
import 'firebase/compat/auth'; // For Firebase Authentication
import 'firebase/compat/firestore'; // For Firestore
const firebaseConfig = {
    apiKey: "AIzaSyC0BDaJM51coG2wCjBTNVVwKkmcu-DgvzM",
    authDomain: "community-chat-a285e.firebaseapp.com",
    projectId: "community-chat-a285e",
    storageBucket: "community-chat-a285e.appspot.com",
    messagingSenderId: "508117633953",
    appId: "1:508117633953:web:8f33d988dfe0c9edf3d9e0",
    measurementId: "G-356KDSXM2T"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  
  export { auth, provider, db };
  export default db;