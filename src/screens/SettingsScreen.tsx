import { Button, Divider, Text } from '@react-native-material/core';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DropDown from 'react-native-paper-dropdown';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import { TYPO } from '../globals/styles';
import { Language, Mode, UserProfilState } from '../models/UserProfilStateModels';
import { signOut } from '../services/AuthService';
import { languageChange, switchMode } from '../store/userProfil/actions';
import { useAppDispatch } from '../store/userProfil/store';

const COLORS = require('../globals/styles/colors.tsx');

const SettingsScreen = () => {
  const handleSignOutButton = async () => {
    await signOut();
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

  const handleThemeChange = () => {
    dispatch(switchMode(theme === 'light' ? 'dark' : 'light'));
  };

  const { t, i18n } = useTranslation();
  const handleLanguageChange = (lng: Language) => {
    i18n.changeLanguage(lng);
    dispatch(languageChange(lng));
  };

  useEffect(() => {
    setMode(theme);
    setLanguage(langue);
  }, [theme, langue]);

  const themedStyle = styles(mode);

  const [showDropDown, setShowDropDown] = useState(false);
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
      <DropDown
        label={t('UserProfil.Settings.Language.Title')}
        mode={'outlined'}
        visible={showDropDown}
        showDropDown={() => setShowDropDown(true)}
        onDismiss={() => setShowDropDown(false)}
        value={language}
        setValue={handleLanguageChange}
        list={languageList}
        theme={{
          colors: {
            background: themedStyle.container.backgroundColor,
          },
        }}
        dropDownItemStyle={{
          backgroundColor: themedStyle.container.backgroundColor,
        }}
        dropDownItemSelectedStyle={{
          backgroundColor: themedStyle.container.backgroundColor,
        }}
        dropDownItemTextStyle={{ color: themedStyle.text.color }}
        dropDownItemSelectedTextStyle={{ color: themedStyle.text.color }}
      />
      <Divider />
      <Button
        onPress={handleSignOutButton}
        style={themedStyle.signOutButton}
        title={t('UserProfil.Settings.SignOut')}
      />
    </View>
  );
};

const styles = (mode: Mode) =>
  StyleSheet.create({
    container: {
      padding: 12,
      gap: 12,
      flex: 1,
      backgroundColor: COLORS.BGCOLOR[mode],
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
  });

export default SettingsScreen;
