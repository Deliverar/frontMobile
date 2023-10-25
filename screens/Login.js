import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import Footer from '../componentes/Footer'; // Asegúrate de que la ruta sea correcta
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../componentes/Button';
import { StatusBar } from 'expo-status-bar';
import * as Font from 'expo-font';
import { IA_URL } from '../envs';



export default function Login() {
    const IAUrl = IA_URL;
    const [alias, setAlias] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    const [showSaveCredentialsMessage, setShowSaveCredentialsMessage] = useState(false);
    const [saveCredentials, setSaveCredentials] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    useEffect(() => {
        const getCredentials = async () => {
            const storedAlias = await AsyncStorage.getItem('alias');
            if (storedAlias) {
                setAlias(storedAlias);
            }
        };
        getCredentials();
    }, []);

    const handleAliasChange = (text) => {
        setAlias(text);
        setShowErrorMessage(false);
    };

    const handlePasswordChange = (text) => {
        setPassword(text);
        setShowErrorMessage(false);
    };

    const handleForgotPassword = () => {
        navigation.navigate('GeneratePassword');
    };

    const handleUnlockAccount = () => {
        navigation.navigate('ValidateAccount');
    };
    

    useEffect(() => {
        const getStoredCredentials = async () => {
            if (Platform.OS === 'ios') {
                const storedCredentials = await Keychain.getGenericPassword();
                if (storedCredentials) {
                    setAlias(storedCredentials.username);
                    setPassword(storedCredentials.password);
                }
            } else if (Platform.OS === 'android') {
                const storedAlias = await AsyncStorage.getItem('alias');
                const storedPassword = await AsyncStorage.getItem('password');
                if (storedAlias && storedPassword) {
                    setAlias(storedAlias);
                    setPassword(storedPassword);
                }
            }
        };

        getStoredCredentials();
    }, []);


    const handleLogin = async () => {
        // Lógica para realizar la solicitud de API
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        try {
            // const response = await fetch(`http://192.168.0.140:8080/usuario/login?alias=${alias}&contrasenia=${password}`, requestOptions);
            const response = await fetch(`${IAUrl}/api/LoginUid?uid=${alias}&pass=${password}`, requestOptions);
            const result = await response.text();
            console.log("soy Result: " + result);
            console.log("soy response.status: " + response.status);
            // await AsyncStorage.setItem('@idUsuario', JSON.stringify(JSON.parse(result).idUsuario))

            if (response.status === 200) {

                // El inicio de sesión fue exitoso
                if (saveCredentials) {
                    // Guarda las credenciales si el usuario acepta
                    if (Platform.OS === 'ios') {
                        // Para iOS, guarda las credenciales en el Keychain
                        await Keychain.setGenericPassword(alias, password);
                    } else if (Platform.OS === 'android') {
                        // Para Android, guarda las credenciales en el AsyncStorage
                        await AsyncStorage.setItem('alias', alias);
                        await AsyncStorage.setItem('password', password);
                    }
                }
                AsyncStorage.setItem('credentialsMessageShown', 'true');
                // AsyncStorage.removeItem('credentialsMessageShown');

                if (!saveCredentials && showSaveCredentialsMessage) {
                    setShowSaveCredentialsMessage(true);
                } else {
                    // console.log("asddd" + alias);
                    await AsyncStorage.setItem('@alias', alias);
                    navigation.navigate('Feed', { alias: alias });
                }
            } else {
                // El inicio de sesión falló, muestra un mensaje de error
                setShowErrorMessage(true);
            }
        } catch (error) {
            console.log('error', error);
            // Manejo de errores adicionales si es necesario
        }
    };

    return (
        <View style={styles.content}>
            <StatusBar style="auto" />
            <View style={styles.frame}>
                <View style={styles.contenidoDePagina}>
                    <View style={styles.rectangle}>
                        <Text style={styles.login}>Iniciar sesión</Text>
                        <View style={styles.overlapGroup}>
                            <TextInput
                                style={styles.email}
                                placeholder="Alias"
                                required
                                placeholderTextColor="#888"
                                value={alias}
                                onChangeText={handleAliasChange}
                            />
                        </View>
                        <View style={styles.overlapGroup2}>
                            <TextInput
                                style={styles.password}
                                placeholder="Contraseña"
                                required
                                placeholderTextColor="#888"
                                value={password}
                                onChangeText={handlePasswordChange}
                                secureTextEntry={true}
                            />
                        </View>
                        <TouchableOpacity onPress={handleForgotPassword} >
                            <Text style={styles.textWrapper2}>Olvide mi contraseña</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleUnlockAccount} >
                            <Text style={styles.textWrapper2}>Desbloquear mi cuenta</Text>
                        </TouchableOpacity>

                        <Button
                            theme="loginButton"
                            label="Iniciar sesión"
                            onPress={handleLogin}
                        />
                    </View>
                </View>
            </View>
            <Footer style={styles.footer} />
        </View >
    );
}


const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        fontFamily: 'Roboto-Regular',
        alignItems: 'center',
    },
    frame: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#f0f8ffeb',
        padding: '35px 28px',
        position: 'absolute',
        width: 322,
    },
    contenidoDePagina: {
        display: 'flex',
        alignItems: 'center',
    },
    rectangle: {
        backgroundColor: 'rgba(240, 248, 255, 0.92)', // Color y opacidad
        width: 322,
        height: 322,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    overlapGroup: {
        backgroundColor: '#ffffff',
        backgroundSize: '100% 100%',
        color: 'white',
        height: 42,
        left: -4,
        marginBottom: 15,
        position: 'relative',
        width: 277,
        justifyContent: 'center',
        borderRadius: 10,
        border: '1px solid #DCDBDB',
        boxShadow: '0px 10px 12px #00000040',
    },
    overlapGroup2: {
        backgroundColor: '#ffffff',
        backgroundSize: '100% 100%',
        height: 42,
        left: -4,
        position: 'relative',
        width: 277,
        justifyContent: 'center',
        borderRadius: 10,
        border: '1px solid #DCDBDB',
        boxShadow: '0px 10px 12px #00000040',
    },
    email: {
        color: '#000',
        backgroundColor: '#fff',
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        fontWeight: '400',
        letterSpacing: 0,
        left: 9,
        position: 'absolute',
    },
    password: {
        color: '#000000',
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        fontWeight: '400',
        letterSpacing: 0,
        left: 9,
        position: 'absolute',
        // width: '100%',
    },
    textWrapper: {
        color: '#fff',
        fontFamily: 'Roboto-Regular',
        fontSize: 18,
        fontWeight: '400',
        letterSpacing: 0,
        lineHeight: 'normal',
        position: 'relative',
        whiteSpace: 'nowrap',
        width: 'fit-content',
    },
    overlap: {
        backgroundColor: '#000aff',
        backgroundSize: '100% 100%',
        height: 42,
        left: -4,
        position: 'relative',
        width: 277,
    },
    login: {
        color: '#000000',
        fontFamily: 'Roboto-Regular',
        fontSize: 24,
        fontWeight: 'bold',
        position: 'absolute',
        alignItems: 'center',
        top: 20,
        textShadow: '0px 10px 12px #00000040',
    },
    textWrapper2: {
        color: '#000aff',
        textDecorationLine: 'underline',
        fontFamily: 'Roboto-Regular',
        position: 'initial',
        marginTop: 10,
        marginBottom: 10,
    },
    footer: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
});

