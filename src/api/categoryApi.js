import {
  getFirestore,
  collection,
  addDoc,
  // doc,
  // getDoc,
  getDocs
} from "firebase/firestore/lite";

import app from "./firebaseConfig";

const db = getFirestore(app);

export async function addCategory(name) {
  try {
    const { id } = await addDoc(collection(db, "biashara-categories"), {
      name,
    });
    // const category = { id, name: categoryName };
    // const categories = await getCategories()
    return id
    // dispatch({type: "ADD_CATEGORY", payload: category})
  } catch (error) {}
}

export async function getCategories() {
    const categoriesCollection = collection(db, "biashara-categories");
    const categories = await getDocs(categoriesCollection);
    const categoriesList = categories.docs.map((doc) => {
      const id = doc.id;
      const data = { ...doc.data(), id };
      return data;
    });
    return categoriesList;
  }
