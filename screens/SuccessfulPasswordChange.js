import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import Footer from '../componentes/Footer'; // Asegúrate de que la ruta sea correcta
import { useNavigation } from '@react-navigation/native';
import Button from '../componentes/Button';
import { StatusBar } from 'expo-status-bar';
import * as Font from 'expo-font';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';


const tildeVerde = require('../assets/tildeVerde.png');



const buttonTheme = {
    buttonBackground: 'rgba(255, 153, 0, 0.85)',
    buttonText: '#fff',
    buttonStroke: '#DCDBDB',
    buttonStrokeWidth: 1,
};
//   const apiUrl = API_URL;

export default function SuccessfulPasswordChange() {
    const [alias, setAlias] = useState('');
    const navigation = useNavigation();
    
    useEffect(() => {
        const getAlias = async () => {
          const storedAlias = await AsyncStorage.getItem('@alias');
          setAlias(storedAlias);
          if (storedAlias) {
            console.log("Alias almacenado:", storedAlias);
          }
        };
    
        getAlias();
      }, []);


      const handleComenzarPress = () => {
        navigation.navigate('Feed', { alias: alias });
    };




    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Image source={tildeVerde} style={styles.image} />
                <Text style={styles.text}>¡Clave modificada con éxito!</Text>
                <Button label="Volver al Menu" theme="loginButton" onPress={handleComenzarPress} />
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
