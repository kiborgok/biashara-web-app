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
  // try {
  //   const { user } = await createUserWithEmailAndPassword(
  //     auth,
  //     email,
  //     password
  //   );
  //   return user;
  // } catch (error) {
  //   const errorCode = error.code;
  //   console.log(errorCode);
  //   const errorMessage = error.message;
  //   console.log(errorMessage);
  // }
}

export async function signIn(email, password) {
    return await signInWithEmailAndPassword(auth, email, password);
  // try {
  //   const { user } = await signInWithEmailAndPassword(auth, email, password);
  //   console.log(user);
  // } catch (error) {
  //   const errorCode = error.code;
  //   console.log(errorCode);
  //   const errorMessage = error.message;
  //   console.log(errorMessage);
  // }
}
