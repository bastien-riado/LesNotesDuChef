import { ReactNode } from "react";

export interface AuthorizationContextProps {
    SignUp: (email: string, password: string, repeatedPassword: string) => void;
    Login: (email: string, password: string) => void;
    SignOut: () => void;
    error: string;
    alert: boolean;
    isLoading: boolean;
    user: string;
}

export interface AuthorizationProviderProps {
    children: ReactNode;
}