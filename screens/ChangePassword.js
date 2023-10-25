import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import Footer from '../componentes/Footer'; // Asegúrate de que la ruta sea correcta
import { useNavigation, useRoute } from '@react-navigation/native';
import Button from '../componentes/Button';
import { StatusBar } from 'expo-status-bar';
import * as Font from 'expo-font';
import * as SecureStore from 'expo-secure-store';
import { IA_URL } from '../envs';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';


const buttonTheme = {
    buttonBackground: 'rgba(255, 153, 0, 0.85)',
    buttonText: '#fff',
    buttonStroke: '#DCDBDB',
    buttonStrokeWidth: 1,
};

export default function ChangePassword() {
    const IAUrl = IA_URL;
    const [fullName, setFullName] = useState('');
    const [alias, setAlias] = useState('');
    const [userId, setUserId] = useState(null);
    const navigation = useNavigation();
    const [validar, setValidar] = useState(true);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [validarCorreo, setValidarCorreo] = useState(true);
    const [emailValidationResult, setEmailValidationResult] = useState('');
    const route = useRoute();



    useEffect(() => {
        const getAlias = async () => {
          const storedAlias = await AsyncStorage.getItem('@alias');
          setUserId(storedAlias);
          setAlias(storedAlias);
          if (storedAlias) {
            console.log("Alias almacenado:", storedAlias);
          }
        };
    
        getAlias();
      }, []);


    const handleOptionPress = (option) => {
        try {
            console.log("Valor de alias: " + alias);
            navigation.navigate(option, { alias });
        } catch (error) {
            console.log('Error al obtener el alias:', error);
        }
    };


    const handlePasswordChange = (text) => {
        setPassword(text);
    };

    const handleConfirmPasswordChange = (text) => {
        setConfirmPassword(text);
    };

    const handleValidarContrasenas = () => {
        // Validar que las contraseñas coincidan
        if (password !== confirmPassword) {
            setValidar(true)
            alert("Las contraseñas no coinciden")
            // Mostrar mensaje de error o realizar alguna acción
            return;
        }
        else if (password === confirmPassword) {
            setValidar(false);
        }
    };



    const handleEnviar = () => {
        console.log('userID: ' + userId)
        const data = {
            userId: userId,
            password: password,
            // confirmPassword: confirmPassword,
        };

        var requestOptions = {
            method: 'PUT',
            redirect: 'follow'
        };

        fetch(`${IAUrl}/api/ChangePassword?uid=${userId}&pass=${password}`, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));


        navigation.navigate('SuccessfulPasswordChange', { alias: alias });
    };




      return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.goBackButton} onPress={() => handleOptionPress('Feed')}>
                <Feather name="arrow-left" size={24} color="black" />
                <Text style={styles.goBackText}>Volver</Text>
            </TouchableOpacity>
            <View>
                <View style={styles.square}>
                    <Text style={styles.title}>Cambiar contraseña</Text>
                    {/* <Text> Mail: {mail}</Text> */}
                    <TextInput
                        style={styles.input}
                        placeholder="Contraseña"
                        placeholderTextColor="#888"
                        secureTextEntry={true}
                        value={password}
                        onChangeText={handlePasswordChange}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Confirmar contraseña"
                        placeholderTextColor="#888"
                        secureTextEntry={true}
                        value={confirmPassword}
                        onChangeText={handleConfirmPasswordChange}
                    />
                    {validar ? (
                        <Button label="Validar" onPress={handleValidarContrasenas} />
                    ) : (
                        <Button
                            theme="loginButton"
                            label="Enviar"
                            onPress={handleEnviar}
                        />
                    )}
                </View>
                <StatusBar style="auto" />
            </View>
            <Footer style={styles.footer} />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    frame: {
        display: 'flex',
        alignItems: 'center',
        padding: '35px 28px',
        position: 'absolute',
        width: 322,
    },
    square: {
        width: '90%',
        backgroundColor: 'rgba(240, 248, 255, 0.92)',
        borderRadius: 8,
        margin: 20,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    goBackButton: {
        marginLeft: 16,
        marginTop: '2%',
        flexDirection: 'row',
    },
    goBackText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    input: {
        width: '100%',
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 8,
        marginBottom: 8,
        color: '#000',
    },
    footer: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        fontWeight: 'bold',
    },
});

