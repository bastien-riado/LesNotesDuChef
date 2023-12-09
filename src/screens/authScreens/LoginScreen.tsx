import auth from '@react-native-firebase/auth';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

const LoginScreen = ({ navigation }: any) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // TODO utiliser le AuthProvider pour gérer l'authentification et s'assurer que le loader s'affiche correctement
    const handleAuth = async () => {
        try {
            setIsLoading(true);
            await auth().signInWithEmailAndPassword(email, password);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Connexion</Text>
            <TextInput
                placeholder="Email"
                placeholderTextColor={'gray'}
                value={email}
                onChangeText={(text) => setEmail(text)}
                style={styles.input}
            />
            <TextInput
                placeholder="Mot de passe"
                placeholderTextColor={'gray'}
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
                style={styles.input}
            />
            <Button title="Se connecter" onPress={handleAuth} />
            <Spinner
                visible={isLoading}
                textContent={'Connexion au compte...'}
                textStyle={{ color: '#FFF' }}
            />
            <View style={styles.lineSeparator} />
            <Text style={styles.toggleText}>Vous n'avez pas de compte ?</Text>
            <Button title="Créer un compte" onPress={() => navigation.navigate('Signup')} />
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: 'black',
    },
    input: {
        height: 40,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        padding: 8,
        color: 'black',
    },
    lineSeparator: {
        height: 1,
        width: '100%',
        backgroundColor: 'gray',
        marginVertical: 16,
    },
    toggleText: {
        marginBottom: 8,
        color: 'black',
    },
});

export default LoginScreen;