import auth from '@react-native-firebase/auth';
import React, {useState} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import {User} from '../../models/UserModels';
import {dbRef} from '../../services/Auth/config/FirebaseConfig';

const SignupScreen = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const createUserInDB = async (user: User) => {
    try {
      await dbRef.ref('users').child(user.uid).set(user);
    } catch (error) {
      console.error('Error creating user in DB:', error);
    }
  };

  // TODO utiliser le AuthProvider pour gérer l'authentification et s'assurer que le loader s'affiche correctement
  const handleAuth = async () => {
    try {
      setIsLoading(true);
      await auth().createUserWithEmailAndPassword(email, password);
      createUserInDB({uid: auth().currentUser!.uid, email});
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Créer un compte</Text>
      <TextInput
        placeholder="Email"
        placeholderTextColor={'gray'}
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Mot de passe"
        placeholderTextColor={'gray'}
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        placeholder="Confirmer le mot de passe"
        placeholderTextColor={'gray'}
        value={repeatedPassword}
        onChangeText={(text) => setRepeatedPassword(text)}
        secureTextEntry
        style={styles.input}
      />
      <Button
        title="Créer un compte"
        onPress={handleAuth}
      />
      <Spinner
        visible={isLoading}
        textContent={'Création du compte...'}
        textStyle={{color: '#FFF'}}
      />
      <View style={styles.lineSeparator} />
      <Text style={styles.toggleText}>Vous avez déjà un compte ?</Text>
      <Button
        title="Se connecter"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'black',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
    color: 'black',
  },
  lineSeparator: {
    height: 1,
    width: '100%',
    backgroundColor: 'gray',
    marginVertical: 16,
  },
  toggleText: {
    marginBottom: 8,
    color: 'black',
  },
});

export default SignupScreen;
