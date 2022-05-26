import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
} from "firebase/firestore/lite";

import app from "./firebaseConfig";

const db = getFirestore(app);

export async function addBusiness(business) {
  try {
    const { id } = await addDoc(collection(db, "biashara-businesses"), {
      business,
    });
      return id
    // dispatch({type: "ADD_CATEGORY", payload: category})
  } catch (error) {}
}

export async function getBusinesses() {
  const businessesCollection = collection(db, "biashara-businesses");
  const businesses = await getDocs(businessesCollection);
  const businessesList = businesses.docs.map((doc) => {
    const id = doc.id;
      const {business} = doc.data();
    return {...business, id};
  });
  return businessesList;
}
