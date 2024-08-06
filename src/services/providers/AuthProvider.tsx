import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import React, { createContext, useEffect, useState } from 'react';

import {
  AuthorizationContextProps,
  AuthorizationProviderProps,
} from '../../models/AuthorizationProps';

import { useDispatch } from 'react-redux';
import {
  setUserEmail,
  setUserProfilImage,
  setUserUid,
} from '../../store/userProfil/actions';
import { dbRef } from '../Auth/config/FirebaseConfig';
import { createUser, logIn, signOut } from '../AuthService';

export const Authorization = createContext<AuthorizationContextProps | undefined>(
  undefined,
);

export const AuthorizationProvider: React.FC<AuthorizationProviderProps> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [alert, setAlert] = useState(false);
  const [user, setUser] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async (authUser) => {
      if (authUser) {
        setUser(authUser.uid);
        dispatch(setUserEmail(authUser.email!));
        dispatch(setUserUid(authUser.uid));

        const userRef = dbRef.ref(`users/${authUser.uid}`);
        const snapshot = await userRef.once('value');
        const userData = snapshot.val();
        if (userData && userData.profilImage) {
          dispatch(setUserProfilImage(userData.profilImage));
        } else {
          dispatch(setUserProfilImage(''));
        }
      } else {
        setUser('');
        dispatch(setUserEmail(''));
        dispatch(setUserUid(''));
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  async function Login(
    email: string,
    password: string,
  ): Promise<FirebaseAuthTypes.UserCredential> {
    setIsLoading(true);
    try {
      const userCredential = await logIn(email, password);
      setIsLoading(false);
      return userCredential;
    } catch (error) {
      setError('Login failed');
      setIsLoading(false);
      throw error;
    }
  }

  async function SignUp(email: string, password: string, repeatedPassword: string) {
    setIsLoading(true);
    if (repeatedPassword !== password) {
      setIsLoading(false);
      setError('Looks like the passwords do not match');
    } else {
      try {
        await createUser(email, password);
        setIsLoading(false);
        setAlert(true);
      } catch (error) {
        if (error === 'auth/email-already-exists') {
          setError('Looks like that email already exists');
        } else if (error === 'auth/invalid-email') {
          setError('Invalid email address');
        } else {
          setError('An unexpected error occurred');
        }
        setIsLoading(false);
      }
    }
  }

  async function SignOut(): Promise<void> {
    setIsLoading(true);
    try {
      await signOut();
      setIsLoading(false);
    } catch (error) {
      setError('Sign out failed');
      setIsLoading(false);
    }
  }

  return (
    <Authorization.Provider
      value={{
        SignUp,
        Login,
        SignOut,
        error,
        alert,
        isLoading,
        user,
      }}
    >
      {children}
    </Authorization.Provider>
  );
};
