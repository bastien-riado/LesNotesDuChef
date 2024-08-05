import { BottomSheetModal } from '@gorhom/bottom-sheet';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions } from 'react-native';
import { vs } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import { TYPO } from '../../globals/styles';
import { signOut } from '../../services/AuthService';
import { removeRecipes } from '../../store/recipes/actions';
import { useAppDispatch } from '../../store/store';
import { languageChange, logout, switchMode } from '../../store/userProfil/actions';
import UserProfilComponent from '../UserProfilComponent/UserProfilComponent';
import {
  Container,
  CustomBottomSheetModal,
  CustomBottomSheetView,
  CustomDivider,
  DisconectButton,
  Icon,
  MenuItem,
  MenuItemText,
  OptionContainer,
  OptionText,
  SubMenuContainer,
} from './styles';

const SettingsComponent: React.FC = () => {
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation();

  const theme = useSelector((state: { userProfil: any }) => state.userProfil.mode);
  const langue = useSelector((state: { userProfil: any }) => state.userProfil.language);

  const [mode, setMode] = useState(theme);
  const [language, setLanguage] = useState(langue);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

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
    bottomSheetModalRef.current?.close();
  };

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const languageOptions = [
    {
      text: 'Français',
      onPress: () => handleLanguageChange('fr'),
      value: 'fr',
    },
    {
      text: 'English',
      onPress: () => handleLanguageChange('en'),
      value: 'en',
    },
    {
      text: 'Español',
      onPress: () => handleLanguageChange('es'),
      value: 'es',
    },
    {
      text: 'Deutsch',
      onPress: () => handleLanguageChange('de'),
      value: 'de',
    },
    {
      text: 'Italiano',
      onPress: () => handleLanguageChange('it'),
      value: 'it',
    },
  ];

  const windowHeight = Dimensions.get('window').height;
  const modalHeight = vs(languageOptions.length * 50);
  const maxModalHeight = vs(windowHeight * 0.5);

  const snapPoints = useMemo(() => {
    const height = Math.min(modalHeight, maxModalHeight);
    return [height + 70];
  }, [modalHeight, maxModalHeight]);

  const renderLanguageModal = () => (
    <CustomBottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={snapPoints}
    >
      <CustomBottomSheetView>
        <SubMenuContainer>
          {languageOptions.map((option, index) => (
            <MenuItem
              key={index}
              onPress={option.onPress}
              selected={language === option.value}
            >
              <MenuItemText>{option.text}</MenuItemText>
            </MenuItem>
          ))}
        </SubMenuContainer>
      </CustomBottomSheetView>
    </CustomBottomSheetModal>
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
      <OptionContainer onPress={handlePresentModalPress}>
        <Icon
          name="web"
          size={TYPO.ICONSIZE.MEDIUM}
        />
        <OptionText>{t('UserProfil.Settings.Language.Title')}</OptionText>
      </OptionContainer>
      {renderLanguageModal()}
      <CustomDivider />
      <DisconectButton
        onPress={handleSignOutButton}
        icon={'logout'}
        mode="elevated"
        uppercase={true}
      >
        {t('UserProfil.Settings.SignOut')}
      </DisconectButton>
    </Container>
  );
};

export default SettingsComponent;
