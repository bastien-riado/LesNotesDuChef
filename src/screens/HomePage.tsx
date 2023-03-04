import React, {useState, type PropsWithChildren} from 'react';
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

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Recipe from '../data/RecipeList';


const Item = ({title}: {title: string}) => (
    <TouchableOpacity >
    <View style={styles.item}>
      <Text>{title}</Text>
    </View>
  </TouchableOpacity>
);



const HomePage = ({navigation}: any) => {

    const [modalVisible, setModalVisible] = useState(true);
    const renderItem = ({item}: {item: {title: string}}) => (
        <Item title={item.title} />
    );

    return (
        <View  style={styles.container}>
            <Modal
                animationType='slide'
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible)
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>
                            <Text style={styles.boldText}>Bienvenue sur Les Notes Du Chef.</Text> {'\n'} Si vous souhaitez en savoir plus sur notre fonctionnment et notre 
                            avenir, veuillez consulter la page "<Text style={styles.boldText}>À propos</Text>" dans le menu !
                        </Text>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>
                                Fermer la fenêtre
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>    
            </Modal>
            
            <SafeAreaView style={styles.flatList}>
                <FlatList
                    data={Recipe}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </SafeAreaView>
        </View>
    );
}



const styles = StyleSheet.create({
    item: {

        backgroundColor: "silver",
        padding: 20,

    },
    title: {
        fontSize: 32,
    },
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    flatList: {
        flex: 1,
        
        flexWrap: 'wrap',
        alignContent: 'flex-start'
    },
    textHomePage: {
        color: "black",
        backgroundColor: "white"
    },
    centeredView: {
        
        justifyContent: "center",
        alignItems: "center",
        marginTop: '50%'
    
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 5
    },
    buttonClose: {
         backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        color: "black"
    },
    boldText: {
        fontWeight: "bold"
    }
  });

export default HomePage;