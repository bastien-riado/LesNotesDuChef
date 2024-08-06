import { BottomSheetModal } from '@gorhom/bottom-sheet';

import Clipboard from '@react-native-clipboard/clipboard';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Linking, useWindowDimensions } from 'react-native';
import Toast from 'react-native-toast-message';
import { useSelector } from 'react-redux';
import appConfigData from '../../../app.json';
import patchNotesData from '../../../patchNotes.json';
import { TYPO } from '../../globals/styles';
import { Authorization } from '../../services/providers/AuthProvider';
import { getRecipes, removeRecipes } from '../../store/recipes/actions';
import { useAppDispatch } from '../../store/store';
import { languageChange, logout, switchMode } from '../../store/userProfil/actions';
import UserProfilComponent from '../UserProfilComponent/UserProfilComponent';
import {
  AppInfos,
  Container,
  CustomBottomSheetModal,
  CustomDivider,
  DisconectButton,
  DisplayName,
  GroupOptionsContainer,
  GroupTitle,
  Icon,
  LanguageScrollView,
  MenuItem,
  MenuItemText,
  OptionContainer,
  OptionContainerSpaced,
  OptionText,
  PatchNoteScrollView,
  PatchNoteText,
  PatchNoteTitleView,
  SubMenuContainer,
} from './styles';

type PatchNotes = {
  [version: string]: {
    date: string;
    notes: string[];
  };
};

const SettingsComponent: React.FC = () => {
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation();
  const { SignOut } = useContext(Authorization)!;
  const { width } = useWindowDimensions();

  const theme = useSelector((state: { userProfil: any }) => state.userProfil.mode);
  const langue = useSelector((state: { userProfil: any }) => state.userProfil.language);

  const [mode, setMode] = useState(theme);
  const [language, setLanguage] = useState(langue);
  const appConfig = appConfigData;
  const patchNotes: PatchNotes = patchNotesData;

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const patchNoteModalRef = useRef<BottomSheetModal>(null);

  const copyToClipboard = () => {
    Clipboard.setString(appConfig.version);
  };

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: t('UserProfil.Settings.Toast.Text1'),
      text2: t('UserProfil.Settings.Toast.Text2'),
    });
  };

  useEffect(() => {
    setMode(theme);
    setLanguage(langue);
  }, [theme, langue]);

  const handleSignOutButton = async () => {
    SignOut();
    dispatch(removeRecipes());
    dispatch(logout());
    dispatch(getRecipes(false));
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

  const handlePatchNotePress = useCallback(() => {
    patchNoteModalRef.current?.present();
  }, []);

  const handleAppConfigPress = () => {
    copyToClipboard();
    showToast();
  };

  const handleContactUsPress = () => {
    const to = [appConfig.contactEmail];
    const subject = '[Default] Contact';
    Linking.openURL(`mailto:${to}?subject=${subject}`);
  };

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

  const getPatchNotes = () => {
    return patchNotes[appConfig.version]?.notes.join('\n* ') || 'no patch notes';
  };

  const renderLanguageModal = () => {
    return (
      <CustomBottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        enableDynamicSizing
      >
        <LanguageScrollView>
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
        </LanguageScrollView>
      </CustomBottomSheetModal>
    );
  };

  const renderPatchNoteModal = () => {
    return (
      <CustomBottomSheetModal
        ref={patchNoteModalRef}
        index={0}
        enableDynamicSizing
      >
        <PatchNoteScrollView>
          <PatchNoteTitleView>
            <DisplayName>{appConfig.displayName}</DisplayName>
            <AppInfos>
              V{appConfig.version}
              {'     '}
              {patchNotes[appConfig.version].date.replace(/-/g, ' / ')}
            </AppInfos>
          </PatchNoteTitleView>
          <PatchNoteText>{getPatchNotes()}</PatchNoteText>
        </PatchNoteScrollView>
      </CustomBottomSheetModal>
    );
  };

  return (
    <Container>
      <UserProfilComponent />
      <CustomDivider />
      <GroupOptionsContainer>
        <GroupTitle>{t('UserProfil.Settings.Preferences.Title')}</GroupTitle>
        <OptionContainer onPress={handleThemeChange}>
          <Icon
            name={mode === 'light' ? 'weather-night' : 'white-balance-sunny'}
            size={TYPO.ICONSIZE.MEDIUM}
          />
          <OptionText>{t('UserProfil.Settings.Preferences.Theme')}</OptionText>
        </OptionContainer>
        <OptionContainer onPress={handlePresentModalPress}>
          <Icon
            name="web"
            size={TYPO.ICONSIZE.MEDIUM}
          />
          <OptionText>{t('UserProfil.Settings.Preferences.Language')}</OptionText>
        </OptionContainer>
      </GroupOptionsContainer>
      <CustomDivider />
      <GroupOptionsContainer>
        <GroupTitle>{t('UserProfil.Settings.About.Title')}</GroupTitle>
        <OptionContainer onPress={handleContactUsPress}>
          <Icon
            name="email-outline"
            size={TYPO.ICONSIZE.MEDIUM}
          />
          <OptionText>{t('UserProfil.Settings.About.Contact')}</OptionText>
        </OptionContainer>
        <OptionContainer onPress={handlePatchNotePress}>
          <Icon
            name="script-text-outline"
            size={TYPO.ICONSIZE.MEDIUM}
          />
          <OptionText>{t('UserProfil.Settings.About.PatchNote')}</OptionText>
        </OptionContainer>
        <OptionContainerSpaced onPress={handleAppConfigPress}>
          <OptionText>{appConfig.version}</OptionText>
          <Icon
            name="content-copy"
            size={TYPO.ICONSIZE.SMALL}
          />
        </OptionContainerSpaced>
      </GroupOptionsContainer>
      <CustomDivider />
      <DisconectButton
        onPress={handleSignOutButton}
        icon={'logout'}
        mode="elevated"
        uppercase={true}
      >
        {t('UserProfil.Settings.SignOut')}
      </DisconectButton>
      {renderLanguageModal()}
      {renderPatchNoteModal()}
    </Container>
  );
};

export default SettingsComponent;
