import {StyleSheet, Text, View} from 'react-native';

const COLORS = require('../globals/styles/colors.tsx');

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>About Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BGCOLOR.LIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: COLORS.TEXTCOLOR.LIGHT,
  },
});

export default AboutScreen;
