import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { useSelector } from 'react-redux';
import { COLORS } from '../../globals/styles';
import { Mode, UserProfilState } from '../../models/UserProfilStateModels';
import { logIn } from '../../services/AuthService';

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  // TODO utiliser le AuthProvider pour gérer l'authentification et s'assurer que le loader s'affiche correctement
  const handleAuth = async () => {
    try {
      setIsLoading(true);
      await logIn(email, password);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const mode = useSelector(
    (state: { userProfil: UserProfilState }) => state.userProfil.mode,
  );
  const themedStyle = styles(mode);

  return (
    <View style={themedStyle.container}>
      <Text style={themedStyle.title}>{t('Auth.SignIn.Title')}</Text>
      <TextInput
        placeholder={t('Auth.SignIn.Email')}
        placeholderTextColor={'gray'}
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={themedStyle.input}
      />
      <TextInput
        placeholder={t('Auth.SignIn.Password')}
        placeholderTextColor={'gray'}
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        style={themedStyle.input}
      />
      <Button
        title={t('Auth.SignIn.Title')}
        onPress={handleAuth}
      />
      <Spinner
        visible={isLoading}
        textContent={t('Auth.SignIn.Loading')}
        textStyle={themedStyle.spinnerText}
      />
      <View style={themedStyle.lineSeparator} />
      <Text style={themedStyle.toggleText}>{t('Auth.SignIn.NoAccount')}</Text>
      <Button
        title={t('Auth.SignUp.Title')}
        onPress={() => navigation.navigate('Signup')}
      />
    </View>
  );
};

const styles = (mode: Mode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: COLORS.BG_PRIMARYCOLOR[mode],
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
    spinnerText: {
      color: COLORS.TEXTCOLOR[mode],
    },
  });

export default LoginScreen;
