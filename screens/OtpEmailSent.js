import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Button from '../componentes/Button';
import Footer from '../componentes/Footer'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Image } from 'react-native';
import { IA_URL } from '../envs';


const MailEnviado = require('../assets/enviando.png');

export default function OtpEmailSent() {
    const navigation = useNavigation();
    const IAUrl = IA_URL;
    const route = useRoute();
    const { mail } = route.params;
    const [alias, setAlias] = useState(null);


    useEffect(() => {
        validarIdUsuario(); // Obtener el ID del usuario al cargar la pantalla
    }, []);

    const validarIdUsuario = async () => {
        try {
            const requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };

            const userIdValidationResponse = await fetch(`${IAUrl}/api/BuscarUsuariosPorUid?uid=${mail}`, requestOptions);
            const userIdValidationResult = await userIdValidationResponse.json();
            //   console.log(userIdValidationResult);
            const givenName = userIdValidationResult[0].attributes[9].values[0];
            setAlias(givenName); // Almacenar el alias del usuario en el estado

        } catch (error) {
            console.log('Error al validar el usuario:', error);
        }
    };


    const handleOTP = () => {
        const data = {
            mail: mail,
            alias: alias
        };
        // alert(mail)
        navigation.navigate('OTPVerify', data);
    };

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <View style={styles.content}>
                {/* <Text>mail: {mail}</Text> */}
                <Image source={MailEnviado} style={styles.image} />
                <View style={styles.textContainer}>
                    <Text style={styles.text}>
                        Enviaremos un correo a tu casilla, favor de ingresar al link para continuar con el proceso para generar tu clave.
                    </Text>
                </View>
                <Button theme="loginButton" label="Siguiente" onPress={handleOTP} />
            </View>
            <Footer style={styles.footer} />
        </View>
    );
}

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
        textAlign: 'justify'
    },
    buttonContainer: {
        alignItems: 'center',
        marginBottom: 16,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
    },
});


