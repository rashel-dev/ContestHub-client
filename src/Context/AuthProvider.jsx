import React from "react";
import { AuthContext } from "../Context/AuthContext";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from "../Firebase/firebase.init";
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    // Google Sign In
    const signInWithGoogle = () => {
        return signInWithPopup(auth, googleProvider);
    };

    //register with email-password
    const registerUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    //sign in with email-password
    const signInUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };



    const authInfo = {
        signInWithGoogle,
        registerUser,
        signInUser,

    };

    return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
