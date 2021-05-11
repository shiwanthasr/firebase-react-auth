import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import firebase from "firebase";

const AuthContext = React.createContext();
const firestore = firebase.firestore();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(false);

  function signup(
    email,
    password,
    role,
    name,
    nic,
    police_branch = null,
    insurance_company = null
  ) {
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        return firestore.collection("users").doc(user.user.uid).set({
          email: email,
          name: name,
          role: role,
          nic: nic,
          police_branch: police_branch,
          insurance_company: insurance_company,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut().then(
      localStorage.clear()
    );
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
