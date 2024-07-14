import { Divider } from '@react-native-material/core';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, TouchableWithoutFeedback } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { TYPO } from '../globals/styles';
import { signOut } from '../services/AuthService';
import { removeRecipes } from '../store/recipes/actions';
import { useAppDispatch } from '../store/store';
import { languageChange, logout, switchMode } from '../store/userProfil/actions';
import UserProfilComponent from './UserProfilComponent';

const SettingsComponent: React.FC = () => {
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation();

  const theme = useSelector((state: { userProfil: any }) => state.userProfil.mode);
  const langue = useSelector((state: { userProfil: any }) => state.userProfil.language);

  const [mode, setMode] = useState(theme);
  const [language, setLanguage] = useState(langue);
  const [isLanguageModalVisible, setIsLanguageModalVisible] = useState(false);

  useEffect(() => {
    setMode(theme);
    setLanguage(langue);
  }, [theme, langue]);

  const handleSignOutButton = async () => {
    await signOut();
    dispatch(removeRecipes());
    dispatch(logout());
  };

  const handleThemeChange = () => {
    dispatch(switchMode(mode === 'light' ? 'dark' : 'light'));
  };

  const handleLanguageChange = (lng: any) => {
    i18n.changeLanguage(lng);
    dispatch(languageChange(lng));
    setIsLanguageModalVisible(false);
  };

  const languageList = [
    { label: t('UserProfil.Settings.Language.French'), value: 'fr' },
    { label: t('UserProfil.Settings.Language.English'), value: 'en' },
  ];

  const renderLanguageModal = () => (
    <Modal
      visible={isLanguageModalVisible}
      onRequestClose={() => setIsLanguageModalVisible(false)}
      transparent
    >
      <TouchableWithoutFeedback onPress={() => setIsLanguageModalVisible(false)}>
        <ModalContainer>
          <TouchableWithoutFeedback>
            <ModalContent>
              {languageList.map((item) => (
                <LanguageItem
                  key={item.value}
                  onPress={() => handleLanguageChange(item.value)}
                  selected={language === item.value}
                >
                  <LanguageText>{item.label}</LanguageText>
                </LanguageItem>
              ))}
            </ModalContent>
          </TouchableWithoutFeedback>
        </ModalContainer>
      </TouchableWithoutFeedback>
    </Modal>
  );

  return (
    <Container>
      <UserProfilComponent />
      <CustomDivider />
      <OptionContainer onPress={handleThemeChange}>
        <Icon
          name={mode === 'light' ? 'weather-night' : 'white-balance-sunny'}
          size={TYPO.ICONSIZE.MEDIUM}
        />
        <OptionText>{t('UserProfil.Settings.ChangeMode')}</OptionText>
      </OptionContainer>
      <OptionContainer onPress={() => setIsLanguageModalVisible(true)}>
        <Icon
          name="web"
          size={TYPO.ICONSIZE.MEDIUM}
        />
        <OptionText>{t('UserProfil.Settings.Language.Title')}</OptionText>
      </OptionContainer>
      {renderLanguageModal()}
      <CustomDivider />
      <DisconectButton onPress={handleSignOutButton}>
        {t('UserProfil.Settings.SignOut')}
      </DisconectButton>
    </Container>
  );
};

const Container = styled.View`
  padding: 12px;
  background-color: ${(props) => props.theme.backgroundPrimary};
`;

const CustomDivider = styled(Divider).attrs((props) => ({
  color: props.theme.divider,
}))``;

const DisconectButton = styled(PaperButton).attrs((props) => ({
  icon: 'logout',
  mode: 'contained',
  buttonColor: props.theme.backgroundDanger,
  textColor: props.theme.textDanger,
  uppercase: true,
}))`
  margin-top: 12px;
  margin-bottom: 12px;
`;

const Icon = styled(MaterialCommunityIcons)`
  color: ${(props) => props.theme.icon};
`;

const OptionContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 12px;
`;

const OptionText = styled.Text`
  color: ${(props) => props.theme.text};
  margin-left: 34px;
  font-weight: bold;
  font-size: ${TYPO.FONTSIZE.MEDIUM}px;
`;

const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.View`
  width: 80%;
  background-color: ${(props) => props.theme.backgroundSecondary};
  padding: 20px;
  border-radius: 10px;
`;

const LanguageItem = styled.TouchableOpacity<{ selected: boolean }>`
  padding-vertical: 10px;
  padding-horizontal: 20px;
  border-radius: 5px;
  background-color: ${(props) =>
    props.selected ? props.theme.activeLink : 'transparent'};
`;

const LanguageText = styled.Text`
  font-size: ${TYPO.FONTSIZE.MEDIUM}px;
  color: ${(props) => props.theme.text};
`;

export default SettingsComponent;
