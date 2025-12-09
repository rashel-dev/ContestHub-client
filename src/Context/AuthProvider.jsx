import React, { useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../Firebase/firebase.init";
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {  
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Google Sign In
    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    //register with email-password
    const registerUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    //sign in with email-password
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    //sign out
    const signOutUser = () => {
        setLoading(true);
        return signOut(auth);
    };


    //observe current user
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => {
            unsubscribe();
        };
    }, [])
    



    const authInfo = {
        user,
        loading,
        signInWithGoogle,
        registerUser,
        signInUser,
        signOutUser,
    };

    return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
