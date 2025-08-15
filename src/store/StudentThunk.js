import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../services/Firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

const studentCollection = collection(db, "student");

export const fetchData = createAsyncThunk("student/fetch", async () => {
  const snapshot = await getDocs(studentCollection);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
});

export const addData = createAsyncThunk("student/add", async (data) => {
  const docRef = await addDoc(studentCollection, data);
  return { id: docRef.id, ...data };
});

export const deleteData = createAsyncThunk("student/delete", async (id) => {
  await deleteDoc(doc(db, "student", id));
  return id;
});

export const updateData = createAsyncThunk(
  "student/update",
  async ({ id, newData }) => {
    await updateDoc(doc(db, "student", id), newData);
    return { id, newData };
  }
);
