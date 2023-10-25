import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import Footer from '../componentes/Footer'; // Asegúrate de que la ruta sea correcta
import Button from '../componentes/Button';
import NavBar from '../componentes/NavBar';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import * as Font from 'expo-font';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';


// import style from '../../styles/style.css';

const QR = require('../assets/QR.png');
const ChangePassword = require('../assets/ChangePassword.png');


const buttonTheme = {
    buttonBackground: 'rgba(255, 153, 0, 0.85)',
    buttonText: '#fff',
    buttonStroke: '#DCDBDB',
    buttonStrokeWidth: 1,
};
//   const apiUrl = API_URL;

export default function Feed() {
    const [alias, setAlias] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    const [showSaveCredentialsMessage, setShowSaveCredentialsMessage] = useState(false);
    const [saveCredentials, setSaveCredentials] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    useEffect(() => {
        const getAlias = async () => {
            const storedAlias = await AsyncStorage.getItem('@alias');
            if (storedAlias) {
                console.log("Alias almacenado:", storedAlias);
                setAlias(storedAlias);
            }
        };

        getAlias();
    }, []);


    const handleQRScreen = () => {
        navigation.navigate('GenerateQR', { alias: alias });
        // Implementa tu lógica para recuperar la contraseña
    };


    const handleChangePassword = () => {
        navigation.navigate('ChangePassword', { alias: alias });
        // Implementa tu lógica para recuperar la contraseña
    };



    return (
        <View style={styles.content}>
            <NavBar alias={alias} />

            <StatusBar style="auto" />
            <View style={styles.frame}>
                <View style={styles.contenidoDePagina}>
                    <TouchableOpacity onPress={handleQRScreen}>
                        <View style={styles.rectangleQR}>
                            <Text style={styles.textWrapper}>Generar QR de acceso</Text>
                            <Image source={QR} style={styles.imageQR} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleChangePassword}>
                        <View style={styles.rectangleUnlock}>
                            <Text style={styles.textWrapper}>Cambiar contraseña</Text>
                            <Image source={ChangePassword} style={styles.imageUnlockA} />
                        </View>
                    </TouchableOpacity>
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
        backgroundColor: '#ffffff',
        alignItems: 'center',
    },
    frame: {
        display: 'flex',
        alignItems: 'center',
        padding: '35px 28px',
        position: 'absolute',
        width: 322,
    },
    contenidoDePagina: {
        display: 'flex',
        alignItems: 'center',
    },
    rectangleQR: {
        backgroundColor: 'rgba(240, 248, 255, 0.92)', // Color y opacidad
        borderRadius: 10,
        boxShadow: '0px 4px 4px #007bff40',
        height: 150,
        width: 150,
        top: 0,
        left: 0,
    },
    rectangleUnlock: {
        backgroundColor: 'rgba(240, 248, 255, 0.92)', // Color y opacidad
        borderRadius: 10,
        boxShadow: '0px 4px 4px #007bff40',
        height: 150,
        width: 150,
        marginTop: 50,
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
    textWrapper: {
        color: '#000000',
        fontFamily: 'Roboto-Regular',
        fontSize: 18,
        fontWeight: '700',
        textAlign: 'center',
        width: 'fit-content',
    },
    footer: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    imageQR: {
        height: 80,
        // left: 47,
        width: 80,
        resizeMode: 'contain',
        objectFit: 'cover',
        alignSelf: 'center',
        marginTop: 20,
    },
    imageUnlockA: {
        height: 80,
        // left: 47,
        width: 80,
        resizeMode: 'contain',
        objectFit: 'cover',
        alignSelf: 'center',
        marginTop: 20,
    },
});

