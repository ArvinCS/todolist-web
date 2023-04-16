import { browserLocalPersistence, createUserWithEmailAndPassword, getAuth, sendEmailVerification, setPersistence, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from "./firebase";

const auth = getAuth(app);

export async function logIn(email : string, password : string) {
    let result = null,
        error = null;
    try {
        await setPersistence(getAuth(), browserLocalPersistence);
        result = await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
        error = e;
    }

    return { result, error };
}

export async function signUp(email : string, password : string) {
    let result = null,
        error = null;
    try {
        result = await createUserWithEmailAndPassword(auth, email, password);
        await sendEmailVerification(result.user);
    } catch (e) {
        error = e;
    }

    return { result, error };
}

export async function logOut() {
    let result = null,
        error = null;
    try {
        result = await signOut(auth);
    } catch (e) {
        error = e;
    }

    return { result, error };
}

export function getCurrentUser() {
    return auth.currentUser;
}