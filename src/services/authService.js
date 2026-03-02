import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "./firebase";

export async function registerUser({ name, email, password }) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);

  if (name) {
    await updateProfile(cred.user, { displayName: name });
  }

  return cred.user;
}

export async function loginUser({ email, password }) {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user;
}

export async function logoutUser() {
  await signOut(auth);
}