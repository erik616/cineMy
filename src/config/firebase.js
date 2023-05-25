// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0cvZCzga1xmV2XGFISVHU9vQG9q3cOrI",
  authDomain: "cinemy-918c0.firebaseapp.com",
  projectId: "cinemy-918c0",
  storageBucket: "cinemy-918c0.appspot.com",
  messagingSenderId: "903338432521",
  appId: "1:903338432521:web:f7c69100a817394c8b40d8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app