import { createContext, useContext, useEffect, useState } from 'react';
import { auth, googleProvider } from '../config/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { syncUserToBackend } from "../utils/syncUserToBackend";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signup = async (email, password, name, role) => {
  const res = await createUserWithEmailAndPassword(auth, email, password);
  await syncUserToBackend(res.user, { name, role });
  return res;
};

const signupWithGoogle = async (role) => {
  const res = await signInWithPopup(auth, googleProvider);
  await syncUserToBackend(res.user, { name: res.user.displayName, role });
  return res;
};


const login = async (email, password) => {
  const res = await signInWithEmailAndPassword(auth, email, password);
  await syncUserToBackend(res.user); 
  return res;
};

const loginWithGoogle = async () => {
  const res = await signInWithPopup(auth, googleProvider);
  await syncUserToBackend(res.user); 
  return res;
};


  const logout = () => {
    return signOut(auth);
  };

  const value = {
    currentUser,
    signup,
    signupWithGoogle,  
    login,
    loginWithGoogle,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
