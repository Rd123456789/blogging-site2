
import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
import {getAuth} from 'firebase/auth'





const firebaseConfig = {
  apiKey: "AIzaSyARkgngEKf5Y5Hvr0wSDinQ2RvV3wCsf8I",
  authDomain: "bloganother-a5a18.firebaseapp.com",
  databaseURL: "https://bloganother-a5a18-default-rtdb.firebaseio.com",
  projectId: "bloganother-a5a18",
  storageBucket: "bloganother-a5a18.appspot.com",
  messagingSenderId: "575983305429",
  appId: "1:575983305429:web:a39ba6c6a284bbbfd9d85c",
  measurementId: "G-J0CHNGPJVX"
  };
  

  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)
  const db = getFirestore(app)
  const storageFire = getStorage(app)

  export {auth,db,storageFire}