import { Button, Text } from '@react-native-material/core';
import { StyleSheet, View } from 'react-native';
import auth from '@react-native-firebase/auth';

const COLORS = require('../globals/styles/colors.tsx');


const SettingsScreen = () => {
  const handleSignOutButton = async () => {
    await auth().signOut().catch(console.error);
  }

  return (
    <View style={styles.container}>
      <Button
        onPress={handleSignOutButton}
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
