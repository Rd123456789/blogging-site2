
import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
import {getAuth} from 'firebase/auth'





const firebaseConfig = {
  apiKey: "AIzaSyDzXsARoBxc_j2074kEjfKJESknDZ0b8Ns",
  authDomain: "reactblog-6f1c2.firebaseapp.com",
  projectId: "reactblog-6f1c2",
  storageBucket: "reactblog-6f1c2.appspot.com",
  messagingSenderId: "742435480575",
  appId: "1:742435480575:web:716f6b16aa9565ed4b3dca",
  measurementId: "G-CW2P4N87LL"
  };
  

  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)
  const db = getFirestore(app)
  const storageFire = getStorage(app)

  export {auth,db,storageFire}