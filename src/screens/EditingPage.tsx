import {
    StyleSheet,
  Text,
  View,
} from 'react-native';

const EditingPage = ({navigation}: any) => {
    return (
        <View>
            <Text style={style.text}>
                Ici c'est la page d'édition, ou l'on arrive apres avoir appuyé sur le bouton "créer". {'\n'}
                Si la note existe déja, alors on affiche le contenu de cette dernière.{'\n'}
                Sinon, feuille blanche ={'>'} création d'une nouvelle note.
            </Text>
        </View>
    );
}

const style = StyleSheet.create({
    text: {
        color: 'black'
    }
})

export default EditingPage;