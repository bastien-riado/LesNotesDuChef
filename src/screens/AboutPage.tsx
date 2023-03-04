import {
    FlatList,
    Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

const AboutPage = ({navigation}: any) => {
    return (
        <View>
            <Text style={style.text}>
                Ici c'est genre une description du projet, les objectifs qu'il faudrait tenir, le role des utilisateurs 
                dans l'evolution de l'application et les liens et raccourcis pour nous contacter.
                {'\n'}
                A mettre a jour évidement en fonction de l'avancemment.
                {'\n'}
                Et bien sur avec un CSS de fou :o  !!!
            </Text>
        </View>
    );
}

const style = StyleSheet.create({
    text: {
        color: 'black'
    }
})

export default AboutPage;