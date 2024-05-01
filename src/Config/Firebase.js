// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import{getFirestore} from"firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2nJ4htTbP26vKgPo_itIYxlV4wUi0BZ8",
  authDomain: "vite-contact-1c19f.firebaseapp.com",
  projectId: "vite-contact-1c19f",
  storageBucket: "vite-contact-1c19f.appspot.com",
  messagingSenderId: "678755947656",
  appId: "1:678755947656:web:b1a86bf03526960f597b3d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)