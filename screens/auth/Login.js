import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import Footer from '../../componentes/Footer'; // Asegúrate de que la ruta sea correcta
import { useNavigation } from '@react-navigation/native';
import Button from '../../componentes/Button';
import { StatusBar } from 'expo-status-bar';
// import style from '../../styles/style.css';


const buttonTheme = {
    buttonBackground: 'rgba(255, 153, 0, 0.85)',
    buttonText: '#fff',
    buttonStroke: '#DCDBDB',
    buttonStrokeWidth: 1,
};
//   const apiUrl = API_URL;

export default function Login() {
    const [alias, setAlias] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    const [showSaveCredentialsMessage, setShowSaveCredentialsMessage] = useState(false);
    const [saveCredentials, setSaveCredentials] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    useEffect(() => {
        // Verificar si el mensaje ya se mostró anteriormente
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
        setShowErrorMessage(false); // Resetear el mensaje de error al cambiar el alias
    };

    const handlePasswordChange = (text) => {
        setPassword(text);
        setShowErrorMessage(false); // Resetear el mensaje de error al cambiar la contraseña
    };

    const handleForgotPassword = () => {
        navigation.navigate('GeneratePassword');
        // Implementa tu lógica para recuperar la contraseña
    };

    useEffect(() => {
        // Obtener las credenciales guardadas
        const getStoredCredentials = async () => {
            if (Platform.OS === 'ios') {
                // Para iOS, utiliza el Keychain
                const storedCredentials = await Keychain.getGenericPassword();
                if (storedCredentials) {
                    setAlias(storedCredentials.username);
                    setPassword(storedCredentials.password);
                }
            } else if (Platform.OS === 'android') {
                // Para Android, utiliza el AsyncStorage
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
            const response = await fetch(`${apiUrl}/usuario/login?alias=${alias}&contrasenia=${password}`, requestOptions);
            const result = await response.text();
            console.log("soy Result: " + result);
            await AsyncStorage.setItem('@idUsuario', JSON.stringify(JSON.parse(result).idUsuario))
            // console.log("asd")
            // Resto de tu lógica basada en la respuesta de la API
            if (response.status === 200) {

                // El inicio de sesión fue exitoso
                if (saveCredentials) {
                    // Guarda las credenciales si el usuario acepta
                    if (Platform.OS === 'ios') {
                        // Para iOS, guarda las credenciales en el Keychain
                        await Keychain.setGenericPassword(alias, password);
                    } else if (Platform.OS === 'android') {
                        // Para Android, guarda las credenciales en el AsyncStorage
                        //await AsyncStorage.setItem('idUsuario', JSON.parse(result).idUsuario);
                        await AsyncStorage.setItem('alias', alias);
                        await AsyncStorage.setItem('password', password);
                    }
                }
                AsyncStorage.setItem('credentialsMessageShown', 'true');
                // AsyncStorage.removeItem('credentialsMessageShown');

                if (!saveCredentials && showSaveCredentialsMessage) {
                    setShowSaveCredentialsMessage(true);
                } else {
                    console.log(alias);
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
                        <Text style={styles.login}>Iniciar sesion</Text>
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
                                value={alias}
                                onChangeText={handleAliasChange}
                            />
                        </View>
                        <Text style={styles.textWrapper2}>Olvide mi contraseña</Text>
                    </View>
                </View>
                <Footer style={styles.footer} />
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    frame: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#f0f8ffeb',
        padding: '35px 28px',
        position: 'relative',
        width: 322,
    },
    contenidoDePagina: {
        display: 'flex',
        alignItems: 'center',
    },
    rectangle: {
        backgroundColor: 'rgba(240, 248, 255, 0.92)', // Color y opacidad
        width: 322,
        height: 262,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    usuario: {
        height: 34,
        left: 0,
        position: 'absolute',
        top: 47,
        width: 271,
    },
    overlapGroup: {
        backgroundColor: '#fff',
        backgroundSize: '100% 100%',
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
        backgroundColor: '#fff',
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
        color: '#00000033',
        fontFamily: 'Rubik-Regular',
        fontSize: 16,
        fontWeight: '400',
        left: 9,
        letterSpacing: 0,
        lineHeight: 'normal',
        borderRadius: '15px',
        top: 8,
        whiteSpace: 'nowrap',
        alignItems: 'center',
    },
    signInButton: {
        alignItems: 'flex-start',
        backgroundColor: '#007bffd9',
        border: '1px solid',
        borderColor: '#dbdbdb',
        borderRadius: 7,
        boxShadow: '0px 4px 4px #007bff40',
        display: 'inline-flex',
        gap: 10,
        left: 68,
        overflow: 'hidden',
        padding: '3px 23px',
        position: 'absolute',
        top: 165,
    },
    textWrapper: {
        color: '#ffffff',
        fontFamily: 'Roboto-Regular',
        fontSize: 18,
        fontWeight: '400',
        letterSpacing: 0,
        lineHeight: 'normal',
        // marginTop: -1,
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
    password: {
        color: '#00000033',
        fontFamily: 'Rubik-Regular',
        fontSize: 16,
        fontWeight: '400',
        letterSpacing: 0,
        lineHeight: 'normal',
        position: 'absolute',
        width: 192,
    },
    login: {
        color: '#000000',
        fontFamily: 'Roboto',
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
        fontFamily: 'Rubik-Regular',
        position: 'initial',
        marginTop: 10,
    },
});

