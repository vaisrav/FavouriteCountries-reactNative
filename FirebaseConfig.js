// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBT2iowOdqabK8gzoTSgdsBU67eatV0I48",
  authDomain: "croplafinexa.firebaseapp.com",
  projectId: "croplafinexa",
  storageBucket: "croplafinexa.appspot.com",
  messagingSenderId: "420343004691",
  appId: "1:420343004691:web:8c8ac015bb49d150a349e6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };