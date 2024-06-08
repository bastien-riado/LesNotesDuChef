import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ImageBackground, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Spinner from 'react-native-loading-spinner-overlay';
import { Button, Divider, Text, TextInput } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { COLORS } from '../../globals/styles';
import { Mode, UserProfilState } from '../../models/UserProfilStateModels';
import { logIn } from '../../services/AuthService';

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const handleAuth = async () => {
    if (!email || !password) {
      Alert.alert(t('Auth.SignIn.EmptyFields'));
      return;
    }
    try {
      setIsLoading(true);
      const user = await logIn(email, password);
      if (!user) {
        Alert.alert(t('Auth.SignIn.UserNotFound'));
        return;
      }
    } catch (error) {
      Alert.alert(t('Auth.SignIn.Error'));
    } finally {
      setIsLoading(false);
    }
  };

  const mode: Mode = useSelector(
    (state: { userProfil: UserProfilState }) => state.userProfil.mode,
  );
  const themedStyle = styles(mode);

  return (
    <ImageBackground
      source={require('../../assets/img/img_assiete.jpg')} // Remplacez par le chemin correct de votre image
      style={themedStyle.imageBackground}
    >
      <LinearGradient
        colors={['rgba(0,0,0,0.5)', 'transparent']}
        style={themedStyle.linearGradient}
      >
        <View style={themedStyle.container}>
          <Text style={themedStyle.title}>{t('Auth.SignIn.Title')}</Text>
          <TextInput
            label={t('Auth.SignIn.Email')}
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={themedStyle.input}
            mode="outlined"
            keyboardType="email-address"
          />
          <TextInput
            label={t('Auth.SignIn.Password')}
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
            style={themedStyle.input}
            mode="outlined"
          />
          <Button
            mode="contained"
            onPress={handleAuth}
            style={themedStyle.button}
            loading={isLoading}
          >
            {t('Auth.SignIn.Title')}
          </Button>
          <Spinner
            visible={isLoading}
            textContent={t('Auth.SignIn.Loading')}
            textStyle={{ color: '#FFF' }}
          />
          <Divider style={themedStyle.lineSeparator} />
          <Text style={themedStyle.toggleText}>{t('Auth.SignIn.NoAccount')}</Text>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('Signup')}
            style={themedStyle.buttonBis}
          >
            {t('Auth.SignUp.Title')}
          </Button>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = (mode: Mode) =>
  StyleSheet.create({
    imageBackground: {
      flex: 1,
      width: '100%',
      height: '100%',
    },
    linearGradient: {
      flex: 1,
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
      color: COLORS.TEXTCOLOR[mode],
    },
    input: {
      width: '100%',
      marginBottom: 12,
      backgroundColor: COLORS.BGCOLOR[mode],
    },
    button: {
      marginTop: 16,
      width: '100%',
    },
    buttonBis: {
      marginTop: 16,
      width: '100%',
      backgroundColor: COLORS.BGCOLOR[mode],
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
  });

export default LoginScreen;
