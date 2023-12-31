import auth from '@react-native-firebase/auth';
import React, { createContext, useEffect, useState } from 'react';

import {
  AuthorizationContextProps,
  AuthorizationProviderProps,
} from '../../models/AuthorizationProps';

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

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser.uid);
      } else {
        setUser('');
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const Login = (email: string, password: string) => {
    setIsLoading(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  };

  const SignUp = (email: string, password: string, repeatedPassword: string) => {
    setIsLoading(true);
    if (repeatedPassword !== password) {
      setIsLoading(false);
      setError('Looks like the passwords do not match');
    } else {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          setIsLoading(false);
          setAlert(true);
        })
        .catch((error) => {
          if (error.code === 'auth/email-already-exists') {
            setError('Looks like that email already exists');
          } else if (error.code === 'auth/invalid-email') {
            setError('Invalid email address');
          } else {
            setError('An unexpected error occurred');
          }
          setIsLoading(false);
        });
    }
  };

  const SignOut = () => {
    setIsLoading(true);
    auth()
      .signOut()
      .then(() => {
        setUser('');
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

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
