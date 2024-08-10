import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import Toast from 'react-native-toast-message';
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

  const showToast = (type: 'success' | 'error', text: string) => {
    const defaultText = type === 'success' ? 'Success' : 'Error';
    Toast.show({
      type,
      text1: text || defaultText,
    });
  };

  const handleAuth = async () => {
    if (!email || !password) {
      showToast('error', t('Auth.SignIn.EmptyFields'));
      return;
    }
    try {
      setIsLoading(true);
      const user = await logIn(email, password);
      if (!user) {
        showToast('error', t('Auth.SignIn.Error'));
        return;
      }
    } catch (error) {
      showToast('error', t('Auth.SignIn.Error'));
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
