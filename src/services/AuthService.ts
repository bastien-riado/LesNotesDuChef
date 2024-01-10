import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { Alert } from 'react-native';

function showModalError(title: string, message?: string): void {
    Alert.alert(title, message ?? 'Pas de détails disponibles')
}

const AuthService = {
    signOut: async (): Promise<void> => {
        auth().signOut().catch(error => {
            showModalError('Error While signing out', error);
            throw error;
        });
    },

    logIn: async (email: string, password: string): Promise<FirebaseAuthTypes.UserCredential> => {
        return auth().signInWithEmailAndPassword(email, password).catch(error => {
            showModalError('Error while logging in', error);
            throw error;
        });
    },

    createUser: async (email: string, password: string): Promise<FirebaseAuthTypes.UserCredential> => {
        return auth().createUserWithEmailAndPassword(email, password).catch(error => {
            showModalError('Error while creating user', error);
            throw error;
        });
    },

    getUserId: (): string => {
        const userId = auth().currentUser?.uid;
        if (!userId) {
            throw new Error('User id is null');
        }
        return userId;
    }
};

export default AuthService;