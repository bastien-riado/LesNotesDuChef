import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { Button, Text, TextInput } from 'react-native-paper';
import { createUser } from '../../../services/AuthService';
import {
  Container,
  StyledButton,
  StyledButtonBis,
  StyledDivider,
  StyledImageBackground,
  StyledLinearGradient,
  StyledTextInput,
  Title,
  ToggleText,
} from './styles';

const SignupScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const handleAuth = async () => {
    try {
      if (email === '' || password === '' || repeatedPassword === '') {
        Alert.alert(t('Auth.SignUp.EmptyFields'));
        return;
      }
      if (password !== repeatedPassword) {
        Alert.alert(t('Auth.SignUp.PasswordNotMatch'));
        return;
      }
      setIsLoading(true);
      await createUser(email, password);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <StyledImageBackground source={require('../../../assets/img/img_assiete.jpg')}>
      <StyledLinearGradient colors={['rgba(0,0,0,0.5)', 'transparent']}>
        <Container>
          <Title>{t('Auth.SignUp.Title')}</Title>
          <StyledTextInput
            label={t('Auth.SignUp.Email')}
            value={email}
            onChangeText={(text) => setEmail(text)}
            mode="outlined"
            keyboardType="email-address"
          />
          <StyledTextInput
            label={t('Auth.SignUp.Password')}
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
            mode="outlined"
          />
          <StyledTextInput
            label={t('Auth.SignUp.RepeatPassword')}
            value={repeatedPassword}
            onChangeText={(text) => setRepeatedPassword(text)}
            secureTextEntry
            mode="outlined"
          />
          <StyledButton
            mode="elevated"
            onPress={handleAuth}
            loading={isLoading}
          >
            {t('Auth.SignUp.Title')}
          </StyledButton>
          <Spinner
            visible={isLoading}
            textContent={t('Auth.SignUp.Loading')}
            textStyle={{ color: '#FFF' }}
          />
          <StyledDivider />
          <ToggleText>{t('Auth.SignUp.AlreadyHaveAccount')}</ToggleText>
          <StyledButtonBis
            mode="elevated"
            onPress={() => navigation.navigate('Login')}
          >
            {t('Auth.SignIn.Title')}
          </StyledButtonBis>
        </Container>
      </StyledLinearGradient>
    </StyledImageBackground>
  );
};

export default SignupScreen;
