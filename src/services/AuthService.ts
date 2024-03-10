import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { Alert } from 'react-native';
import log from '../Log';
import { User } from '../models/UserModels';
import { dbRef } from './Auth/config/FirebaseConfig';

export async function signOut(): Promise<void> {
  try {
    await auth().signOut();
  } catch (error) {
    Alert.alert('La déconnexion a échoué. Veuillez réessayer!');
    log.error('Error signing out:', error);
  }
}

export async function logIn(
  email: string,
  password: string,
): Promise<FirebaseAuthTypes.UserCredential> {
  try {
    return await auth().signInWithEmailAndPassword(email, password);
  } catch (error) {
    Alert.alert('La connexion a échoué. Veuillez réessayer!');
    log.error('Error logging in:', error);
    throw error;
  }
}

export async function createUser(email: string, password: string) {
  try {
    await auth().createUserWithEmailAndPassword(email, password);
    const user: User = { uid: auth().currentUser!.uid, email };
    await dbRef.ref('users').child(user.uid).set(user);
  } catch (error) {
    Alert.alert('La création de l’utilisateur a échoué. Veuillez réessayer!');
    log.error('Error creating user in DB:', error);
    throw error;
  }
}
