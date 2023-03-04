import React, {useState} from 'react';
import {StyleSheet, ScrollView, View, Modal, TextInput, KeyboardAvoidingView, Button, SafeAreaView, Platform, TouchableOpacity, Image} from 'react-native';


export default function ModalKeyBoard() {
    
    const [modalVisible, setModalVisible] = useState(false);
    const [text, onChangeText] = React.useState('');

    return (
        <View style={styles.container}>
            <View>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Image style={styles.magnifier} source={require('../../assets/magnifier.png')}/>
                </TouchableOpacity>       
            </View>
            {modalVisible && 
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}>
                    <SafeAreaView style={styles.safeAreaView}>
                        <View style={styles.modalContentContainer}>
                            <View style={styles.backButton}>
                                <Button title={"X"} onPress={() => setModalVisible(false)}/>
                            </View>
                            <View style={styles.textInputContainer}>
                            <TextInput
                                style={styles.input}
                                onChangeText={onChangeText}
                                value={text}
                                placeholder="Titre de la note"
                                placeholderTextColor={'black'}
                            />
                            </View>
                            <View style={styles.researchButton}>
                                <Button title="Rechercher" onPress={() => null} />
                            </View>
                        </View>
                    </SafeAreaView>
                </Modal>
            </KeyboardAvoidingView>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: 10
    },
    backButton: {
        flex: 1,
        flexDirection: 'column' 
    },
    input: {
        height: 40,
        margin: 12,
        padding: 10,
    },
    researchButton: {
        flex: 1,
        flexDirection: 'column'
    },
    magnifier: {
        height: 40,
        width: 40,
        right: 20,
        backgroundColor: 'transparent'
    },
    safeAreaView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalContentContainer: {
        margin: 100,
        backgroundColor: "#fff",
        width: "90%",
        height: "17%",
        borderRadius: 100,
    },
    textInputContainer: {
        flex: 1,
        flexDirection: 'column',
        margin: 0,
        alignItems: "center",
    }
});