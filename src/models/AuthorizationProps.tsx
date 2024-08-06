import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { ReactNode } from 'react';

export interface AuthorizationContextProps {
  SignUp: (email: string, password: string, repeatedPassword: string) => void;
  Login: (email: string, password: string) => Promise<FirebaseAuthTypes.UserCredential>;
  SignOut: () => Promise<void>;
  error: string;
  alert: boolean;
  isLoading: boolean;
  user: string;
}

export interface AuthorizationProviderProps {
  children: ReactNode;
}
