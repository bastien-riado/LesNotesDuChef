import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import { createUser } from '../../services/AuthService';
import { Mode } from '../../models/themeStateModels';
import { COLORS } from '../../globals/styles';
import { useSelector } from 'react-redux';

const SignupScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // TODO utiliser le AuthProvider pour gérer l'authentification et s'assurer que le loader s'affiche correctement
  const handleAuth = async () => {
    try {
      setIsLoading(true);
      await createUser(email, password);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const mode: Mode = useSelector((state: any) => state.theme.mode);
  const themedStyle = styles(mode);

  return (
    <View style={themedStyle.container}>
      <Text style={themedStyle.title}>Créer un compte</Text>
      <TextInput
        placeholder="Email"
        placeholderTextColor={'gray'}
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={themedStyle.input}
      />
      <TextInput
        placeholder="Mot de passe"
        placeholderTextColor={'gray'}
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        style={themedStyle.input}
      />
      <TextInput
        placeholder="Confirmer le mot de passe"
        placeholderTextColor={'gray'}
        value={repeatedPassword}
        onChangeText={(text) => setRepeatedPassword(text)}
        secureTextEntry
        style={themedStyle.input}
      />
      <Button
        title="Créer un compte"
        onPress={handleAuth}
      />
      <Spinner
        visible={isLoading}
        textContent={'Création du compte...'}
        textStyle={{ color: '#FFF' }}
      />
      <View style={themedStyle.lineSeparator} />
      <Text style={themedStyle.toggleText}>Vous avez déjà un compte ?</Text>
      <Button
        title="Se connecter"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
};

const styles = (mode: Mode) => (StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: COLORS.BGCOLOR[mode],
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: COLORS.TEXTCOLOR[mode],
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
    color: COLORS.TEXTCOLOR[mode],
  },
  lineSeparator: {
    height: 1,
    width: '100%',
    backgroundColor: 'gray',
    marginVertical: 16,
  },
  toggleText: {
    marginBottom: 8,
    color: COLORS.TEXTCOLOR[mode],
  },
}));

export default SignupScreen;
