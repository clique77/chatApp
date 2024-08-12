import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCNCv64Twbzh8PbMbSH2MYpZktXAqpDo24",
  authDomain: "chatapp-419cd.firebaseapp.com",
  projectId: "chatapp-419cd",
  storageBucket: "chatapp-419cd.appspot.com",
  messagingSenderId: "899333835509",
  appId: "1:899333835509:web:f817c1097754d91f6013bc"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
