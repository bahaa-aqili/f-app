import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "./firebase";
import { User } from "../types/types";

export async function addUser(userData: Omit<User, "createdAt">) {
  try {
    const user: User = {
      ...userData,
      createdAt: Timestamp.now(),
    };

    const docRef = await addDoc(collection(db, "users"), user);
    console.log("User added with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
}
