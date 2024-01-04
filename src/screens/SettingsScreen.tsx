import { Button, Text } from '@react-native-material/core';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { switchMode } from '../store/actions';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TYPO } from '../globals/styles';
import { useAppDispatch } from '../store/store';
import { Mode } from '../models/themeStateModels';
import { signOut } from '../services/AuthService';

const COLORS = require('../globals/styles/colors.tsx');


const SettingsScreen = () => {
  const handleSignOutButton = async () => {
    await signOut();
  }

  const theme = useSelector((state: any) => state.theme);
  const dispatch = useAppDispatch();
  const [mode, setMode] = useState(theme.mode);
  const handleThemeChange = () => {
    dispatch(switchMode(theme.mode === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    setMode(theme.mode);
  }, [theme]);

  const themedStyle = styles(mode);

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
            Changer de mode
          </Text>
        </View>
      </TouchableOpacity>
      <Button
        onPress={handleSignOutButton}
        style={themedStyle.signOutButton}
        title='Se déconnecter' />
    </View>
  );
};

const styles = (mode: Mode) => StyleSheet.create({
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
