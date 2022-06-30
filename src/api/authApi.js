import {
  getAuth,
  // createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import app from "./firebaseConfig";

const auth = getAuth(app);

const BASE_URL = "http://127.0.0.1:9292";

export async function signUp(user) {
  try {
    const response = await fetch(BASE_URL + "/api/v1/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

// export async function signUp(email, password) {
//   return await createUserWithEmailAndPassword(auth, email, password);
// }

export async function signIn(email, password) {
  return await signInWithEmailAndPassword(auth, email, password);
}
