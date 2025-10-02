// src/api/recipesApi.js

import { db } from './firebaseConfig';
import { collection, getDocs, getDoc, doc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';

const recipesCollection = collection(db, "recipes");

// C: CREATE
export const addRecipe = async (recipeData) => {
  return await addDoc(recipesCollection, recipeData);
};

// R: READ (All)
export const getRecipes = async () => {
  const querySnapshot = await getDocs(recipesCollection);
  // Mapea los documentos para incluir el ID
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

// R: READ (Single)
export const getRecipe = async (id) => {
  const docRef = doc(db, "recipes", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  } else {
    return null; // Receta no encontrada
  }
};

// U: UPDATE
export const updateRecipe = async (id, updatedData) => {
  const docRef = doc(db, "recipes", id);
  return await updateDoc(docRef, updatedData);
};

// D: DELETE
export const deleteRecipe = async (id) => {
  const docRef = doc(db, "recipes", id);
  return await deleteDoc(docRef);
};