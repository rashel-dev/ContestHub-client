import React from "react";
import { AuthContext } from "../Context/AuthContext";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../Firebase/firebase.init";
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const signInWithGoogle = () => {
        return signInWithPopup(auth, googleProvider);
    };

    const authInfo = {
        signInWithGoogle,
    };

    return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
