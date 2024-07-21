import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { Divider } from '@react-native-material/core';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button as PaperButton } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { TYPO } from '../globals/styles';
import { FONTSIZE } from '../globals/styles/typography';
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
    },
    {
      text: 'English',
      onPress: () => handleLanguageChange('en'),
    },
    {
      text: 'Español',
      onPress: () => handleLanguageChange('es'),
    },
    {
      text: 'Deutsch',
      onPress: () => handleLanguageChange('de'),
    },
    {
      text: 'Italiano',
      onPress: () => handleLanguageChange('it'),
    },
  ];

  const nbOptions = languageOptions.length;
  const snapPoint = nbOptions * 10 + '%';
  const snapPoints = useMemo(() => [snapPoint], [snapPoint]);

  const renderLanguageModal = () => (
    <CustomBottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={snapPoints}
      enableDynamicSizing
    >
      <CustomBottomSheetView>
        <SubMenuContainer>
          {languageOptions.map((option, index) => (
            <MenuItem
              key={index}
              onPress={option.onPress}
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
      <DisconectButton onPress={handleSignOutButton}>
        {t('UserProfil.Settings.SignOut')}
      </DisconectButton>
    </Container>
  );
};

const CustomBottomSheetModal = styled(BottomSheetModal).attrs((props) => ({
  containerStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  backgroundStyle: {
    backgroundColor: props.theme.backgroundPrimary,
  },
  handleIndicatorStyle: {
    backgroundColor: props.theme.text,
  },
}))``;

const MenuItem = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})`
  padding: 20px;
  width: 100%;
  align-items: center;
  background-color: ${(props) => props.theme.backgroundSecondary};
`;

const MenuItemText = styled.Text`
  font-size: ${FONTSIZE.MEDIUM}px;
  color: ${(props) => props.theme.text};
  font-weight: bold;
`;

const CustomBottomSheetView = styled(BottomSheetView)`
  flex: 1;
  align-items: center;
  padding: 20px;
`;

const SubMenuContainer = styled.View`
  width: 100%;
  flex-direction: column;
  justify-content: center;
`;
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

export default SettingsComponent;
