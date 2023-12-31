import { Button, Text } from '@react-native-material/core';
import { StyleSheet, View } from 'react-native';

const COLORS = require('../globals/styles/colors.tsx');

const handleSignOutButton = () => {
}

const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <Button
        style={styles.signOutButton}
        title='Se déconnecter' />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    gap: 12,
    flex: 1,
    backgroundColor: COLORS.BGCOLOR.LIGHT,
  },
  text: {
    color: COLORS.TEXTCOLOR.LIGHT,
  },
  signOutButton: {
    backgroundColor: 'red',
  },
});

export default SettingsScreen;
