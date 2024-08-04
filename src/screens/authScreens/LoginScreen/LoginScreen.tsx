import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Alert } from 'react-native';

import { logIn } from '../../../services/AuthService';
import {
  Container,
  StyledButton,
  StyledButtonBis,
  StyledDivider,
  StyledImageBackground,
  StyledLinearGradient,
  StyledSpinner,
  StyledTextInput,
  Title,
  ToggleText,
} from './styles';

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

  return (
    <StyledImageBackground source={require('../../../assets/img/img_assiete.jpg')}>
      <StyledLinearGradient colors={['rgba(0,0,0,0.5)', 'transparent']}>
        <Container>
          <Title>{t('Auth.SignIn.Title')}</Title>
          <StyledTextInput
            label={t('Auth.SignIn.Email')}
            value={email}
            onChangeText={(text) => setEmail(text)}
            mode="outlined"
            keyboardType="email-address"
          />
          <StyledTextInput
            label={t('Auth.SignIn.Password')}
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
            mode="outlined"
          />
          <StyledButton
            mode="elevated"
            onPress={handleAuth}
          >
            {t('Auth.SignIn.Title')}
          </StyledButton>
          <StyledSpinner
            visible={isLoading}
            textContent={t('Auth.SignIn.Loading')}
          />
          <StyledDivider />
          <ToggleText>{t('Auth.SignIn.NoAccount')}</ToggleText>
          <StyledButtonBis
            mode="elevated"
            onPress={() => navigation.navigate('Signup')}
          >
            {t('Auth.SignUp.Title')}
          </StyledButtonBis>
        </Container>
      </StyledLinearGradient>
    </StyledImageBackground>
  );
};

export default LoginScreen;
