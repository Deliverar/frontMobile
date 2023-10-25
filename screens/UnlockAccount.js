import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import Footer from '../componentes/Footer'; // Asegúrate de que la ruta sea correcta
import { useNavigation, useRoute } from '@react-navigation/native';
import Button from '../componentes/Button';
import { StatusBar } from 'expo-status-bar';
import * as Font from 'expo-font';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IA_URL } from '../envs';


const tildeVerde = require('../assets/tildeVerde.png');



const buttonTheme = {
    buttonBackground: 'rgba(255, 153, 0, 0.85)',
    buttonText: '#fff',
    buttonStroke: '#DCDBDB',
    buttonStrokeWidth: 1,
};
//   const apiUrl = API_URL;

export default function UnlockAccount() {
    const navigation = useNavigation();
    const IAUrl = IA_URL;
    const route = useRoute();
    // const { alias } = route.params;
    const [userId, setUserId] = useState(null);
    const { mail } = route.params;


    useEffect(() => {
        console.log(mail);
        validarIdUsuario(); // Obtener el ID del usuario al cargar la pantalla
    }, []);
    
    const validarIdUsuario = async () => {
        try {
            const requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };
            const response = await fetch(`${IAUrl}/api/BuscarUsuariosPorUid?uid=${mail}`, requestOptions);
            const result = await response.json();
            let uid;
            for (let i = 0; i < result[0].attributes.length; i++) {
                if (result[0].attributes[i].type === 'uid') {
                    uid = result[0].attributes[i].values[0];
                    break; // Si encuentras el 'uid', sales del bucle
                }
            }
            setUserId(uid);

        } catch (error) {
            console.log('Error al validar el usuario:', error);
        }

    };


      const handleUnlockAccount = () => {
        console.log('userID: ' + userId)
        const data = {
            userId: userId,
        };

        var requestOptions = {
            method: 'PUT',
            redirect: 'follow'
        };

        fetch(`${IAUrl}/api/DesbloquearUsuario?uid=${userId}`, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));


        navigation.navigate('SuccessfulAccountUnlocked');
    };





    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.text}>¡Desbloquea tu cuenta!</Text>
                <Button label="Desbloquear" theme="loginButton" onPress={handleUnlockAccount} />
            </View>
            <StatusBar style="auto" />
            <Footer style={styles.footer} />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0, // Agregar margen superior para evitar superposición con la barra de estado
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: '5%',
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
        marginBottom: 16,
    },
    textContainer: {
        alignItems: 'center',
        marginBottom: 16,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    buttonContainer: {
        color: 'black',
        fontWeight: 'bold',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
    },
});
