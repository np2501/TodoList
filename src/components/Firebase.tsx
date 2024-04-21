
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyB5A3wAVa3hwTSm4hzV27tPL08MRNNlRgE",
  authDomain: "todo-a9cdf.firebaseapp.com",
  projectId: "todo-a9cdf",
  storageBucket: "todo-a9cdf.appspot.com",
  messagingSenderId: "696919192156",
  appId: "1:696919192156:web:7dfdb382cd1ea49710ec99"
};


const app = initializeApp(firebaseConfig);
 const db=getFirestore(app);
 const auth = getAuth(app);

const provider = new GoogleAuthProvider();
export {auth,db, provider }; 