import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA_d_Ppp_YjrEfCIUCA1CpoxOjQs2f_1h0",
  authDomain: "aureum-elegance.firebaseapp.com",
  projectId: "aureum-elegance",
  storageBucket: "aureum-elegance.firebasestorage.app",
  messagingSenderId: "702048912805",
  appId: "1:702048912805:web:3927d70c16ec2c6585544c",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// if (import.meta.env.MODE === 'development') {
//   try {
//     // @ts-ignore - safe in dev
//     auth.settings.appVerificationDisabledForTesting = true;
//   } catch (err) {
//     console.warn('Unable to disable app verification (dev mode):', err);
//   }
// }
export { auth };
