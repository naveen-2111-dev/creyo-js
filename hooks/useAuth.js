import { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth"; // Firebase Authentication module

// Initialize Firebase (if not already initialized in another file)
const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser({
          id: authUser.uid,
          email: authUser.email,
          displayName: authUser.displayName,
          photoURL: authUser.photoURL,
        });
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  const signIn = async (email, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.error("Error signing in:", error.message);
    }
  };

  const signOut = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  return {
    user,
    isLoading,
    signIn,
    signOut,
  };
};

export default useAuth;
