import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import app from "./firebaseConfig";

const auth = getAuth(app);


export async function signUp(email, password) {
    return await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

}

export async function signIn(email, password) {
    return await signInWithEmailAndPassword(auth, email, password);

}
