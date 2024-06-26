import { Divider, Text } from '@react-native-material/core';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Button as PaperButton } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import { COLORS, TYPO } from '../globals/styles';
import { Language, Mode, UserProfilState } from '../models/UserProfilStateModels';
import { signOut } from '../services/AuthService';
import { removeRecipes } from '../store/recipes/actions';
import { useAppDispatch } from '../store/store';
import { languageChange, logout, switchMode } from '../store/userProfil/actions';

const SettingsComponent: React.FC = () => {
  const handleSignOutButton = async () => {
    await signOut();
    dispatch(removeRecipes());
    dispatch(logout());
  };

  const theme = useSelector(
    (state: { userProfil: UserProfilState }) => state.userProfil.mode,
  );
  const langue = useSelector(
    (state: { userProfil: UserProfilState }) => state.userProfil.language,
  );
  const dispatch = useAppDispatch();
  const [mode, setMode] = useState(theme);
  const [language, setLanguage] = useState(langue);
  const [isLanguageModalVisible, setIsLanguageModalVisible] = useState(false);

  const handleThemeChange = () => {
    dispatch(switchMode(theme === 'light' ? 'dark' : 'light'));
  };

  const { t, i18n } = useTranslation();
  const handleLanguageChange = (lng: Language) => {
    i18n.changeLanguage(lng);
    dispatch(languageChange(lng));
    setIsLanguageModalVisible(false);
  };

  useEffect(() => {
    setMode(theme);
    setLanguage(langue);
  }, [theme, langue]);

  const themedStyle = styles(mode);

  const languageList = [
    {
      label: t('UserProfil.Settings.Language.French'),
      value: 'fr',
    },
    {
      label: t('UserProfil.Settings.Language.English'),
      value: 'en',
    },
  ];

  return (
    <View style={themedStyle.container}>
      <TouchableOpacity onPress={handleThemeChange}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 16,
            paddingVertical: 10,
          }}
        >
          <MaterialCommunityIcons
            name={mode === 'light' ? 'weather-night' : 'white-balance-sunny'}
            size={TYPO.ICONSIZE.MEDIUM}
            style={themedStyle.icon}
          />
          <Text
            style={{
              color: themedStyle.text.color,
              marginLeft: 34,
              fontWeight: 'bold',
            }}
          >
            {t('UserProfil.Settings.ChangeMode')}
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsLanguageModalVisible(true)}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 16,
            paddingVertical: 10,
          }}
        >
          <MaterialCommunityIcons
            name="web"
            size={TYPO.ICONSIZE.MEDIUM}
            style={themedStyle.icon}
          />
          <Text
            style={{
              color: themedStyle.text.color,
              marginLeft: 34,
              fontWeight: 'bold',
            }}
          >
            {t('UserProfil.Settings.Language.Title')}
          </Text>
        </View>
      </TouchableOpacity>
      <Modal
        visible={isLanguageModalVisible}
        onRequestClose={() => setIsLanguageModalVisible(false)}
        transparent
      >
        <TouchableWithoutFeedback onPress={() => setIsLanguageModalVisible(false)}>
          <View style={themedStyle.modalContainer}>
            <TouchableWithoutFeedback>
              <View style={themedStyle.modalContent}>
                {languageList.map((item) => (
                  <TouchableOpacity
                    key={item.value}
                    onPress={() => handleLanguageChange(item.value as Language)}
                    style={[
                      themedStyle.languageItem,
                      language === item.value && themedStyle.selectedLanguageItem,
                    ]}
                  >
                    <Text style={themedStyle.languageText}>{item.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Divider />
      <PaperButton
        icon="logout"
        onPress={handleSignOutButton}
        mode="elevated"
        buttonColor={COLORS.BGDELETE}
        textColor={COLORS.TEXTCOLOR.dark}
        uppercase={true}
      >
        {t('UserProfil.Settings.SignOut')}
      </PaperButton>
    </View>
  );
};

const styles = (mode: Mode) =>
  StyleSheet.create({
    container: {
      padding: 12,
      gap: 12,
      flex: 1,
      backgroundColor: COLORS.BG_PRIMARYCOLOR[mode],
    },
    text: {
      color: COLORS.TEXTCOLOR[mode],
    },
    icon: {
      color: COLORS.ICONCOLOR[mode],
    },
    signOutButton: {
      backgroundColor: 'red',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      width: '80%',
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
    },
    languageItem: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    selectedLanguageItem: {
      backgroundColor: 'lightgray',
    },
    languageText: {
      fontSize: 16,
    },
    closeButton: {
      textAlign: 'center',
      marginTop: 20,
      color: 'blue',
    },
  });

export default SettingsComponent;
