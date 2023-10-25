import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import Footer from '../componentes/Footer';
import { useNavigation } from '@react-navigation/native';
import Button from '../componentes/Button';
import { StatusBar } from 'expo-status-bar';
import * as Font from 'expo-font';
import * as SecureStore from 'expo-secure-store';
// import QRCodeGenerator from '../componentes/QRCodeGenerator';
import QRCode from 'react-native-qrcode-svg';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';



// import style from '../../styles/style.css';

const QR = require('../assets/QR.png');
const IconoDesbloqueo = require('../assets/IconoDesbloqueo.png');


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
    const [qrData, setQrData] = useState('info para el qr');


    useEffect(() => {
        const getAlias = async () => {
          const storedAlias = await AsyncStorage.getItem('@alias');
          if (storedAlias) {
            console.log("Alias almacenado:", storedAlias);
            setQrData(storedAlias); // Asigna el valor del alias a qrData
          }
        };
    
        getAlias();
      }, []);

      const qrDataWithExpiration = {
        data: qrData,
        expiration: moment().add(1, 'minutes').format(), // Esto agrega una fecha de vencimiento de 30 minutos
      };


      

    const handleOptionPress = (option) => {
        try {
            console.log("Valor de alias: " + alias);
            navigation.navigate(option, { alias });
        } catch (error) {
            console.log('Error al obtener el alias:', error);
        }
    };


    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <TouchableOpacity style={styles.goBackButton} onPress={() => handleOptionPress('Feed')}>
                <Feather name="arrow-left" size={24} color="black" />
                <Text style={styles.goBackText}>Volver</Text>
            </TouchableOpacity>
            <View style={styles.content}>
                <View style={styles.contenidoDePagina}>
                    <View style={styles.rectangleQR}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            {/* <QRCode
                                value={qrData}
                                size={300}
                            /> */}
                            <QRCode value={JSON.stringify(qrDataWithExpiration)} size={300} />
                        </View>
                    </View>
                </View>
            </View>
            <Footer style={styles.footer} />
        </View >
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
        fontFamily: 'Roboto-Bold',
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

