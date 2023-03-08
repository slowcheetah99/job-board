import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  onSnapshot,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { config } from "./firebaseConfig";

export function initFirebase() {
  const app = initializeApp(config);
  const firestore = getFirestore(app);
  const auth = getAuth(app);

  async function getUserDocument(uid) {
    if (!uid) return;
    try {
      const ref = doc(firestore, `/Users/${uid}`);
      const userSnap = await getDoc(ref);
      return { uid, ...userSnap.data() };
    } catch (err) {
      console.error(err.message);
    }
  }

  //creating a user profile
  async function createUserProfile(user, userInfo) {
    if (!user) return;
    const userDoc = doc(firestore, `Users/${user.uid}`);
    const { username, type, image, bio } = userInfo;
    const { displayName, email, photoURL } = user;
    const createdAt = new Date();
    try {
      setDoc(userDoc, {
        userId: user.uid,
        displayName: username,
        email,
        photoURL,
        type,
        bio,
        createdAt,
      });
    } catch (err) {
      console.error(err.message);
    }

    return getUserDocument(user.uid);
  }

  return { app, firestore, auth, createUserProfile, getUserDocument };
}
