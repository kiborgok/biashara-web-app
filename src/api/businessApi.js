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

export async function addRating(rating) {
  try {
    const { id } = await addDoc(collection(db, "biashara-rating"), {
      rating,
    });
    return id;
  } catch (error) {}
}

export async function getRatings() {
  const ratingsCollection = collection(db, "biashara-rating");
  const ratings = await getDocs(ratingsCollection);
  const ratingsList = ratings.docs.map((doc) => {
    const id = doc.id;
    const { rating } = doc.data();
    return { ...rating, id };
  });
  return ratingsList;
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
