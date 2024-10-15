import { auth } from './firebaseConfig.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

// Function to register a user with email and password
export const registerUser = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential.user; // Return the registered user
    } catch (error) {
        console.error("Error registering user:", error);
        throw error; // Re-throw the error for handling in the calling function
    }
};

// Function to log in a user with email and password
export const loginUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user; // Return the logged-in user
    } catch (error) {
        console.error("Error logging in:", error);
        throw error; // Re-throw the error for handling in the calling function
    }
};
