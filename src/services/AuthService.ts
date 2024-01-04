import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { User } from '../models/UserModels';
import { dbRef } from './Auth/config/FirebaseConfig';

export async function signOut(): Promise<void> {
    auth().signOut().catch(console.error);
}

export async function logIn(email: string, password: string): Promise<FirebaseAuthTypes.UserCredential> {
    return auth().signInWithEmailAndPassword(email, password);
}

export async function createUser(email: string, password: string) {
    await auth().createUserWithEmailAndPassword(email, password);
    const user: User = { uid: auth().currentUser!.uid, email }
    try {
        await dbRef.ref('users').child(user.uid).set(user);
    } catch (error) {
        console.error('Error creating user in DB:', error);
    }
};