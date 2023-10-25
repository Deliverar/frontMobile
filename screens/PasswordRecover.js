import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import Button from '../componentes/Button';
import Footer from '../componentes/Footer';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Alert } from 'react-native-web';
import { IA_URL } from '../envs';
import { Feather } from '@expo/vector-icons';

const buttonTheme = {
    buttonBackground: 'rgba(255, 153, 0, 0.85)',
    buttonText: '#fff',
    buttonStroke: '#DCDBDB',
    buttonStrokeWidth: 1,
};


export default function PasswordRecover() {
    const IAUrl = IA_URL;
    const [fullName, setFullName] = useState('');
    const [userId, setUserId] = useState(null);
    const navigation = useNavigation();
    const [validar, setValidar] = useState(true);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [validarCorreo, setValidarCorreo] = useState(true);
    const [emailValidationResult, setEmailValidationResult] = useState('');
    const route = useRoute();
    const { alias } = route.params;
    const { mail } = route.params;


    const handleOptionPress = (option) => {
        try {
            console.log("Valor de alias: " + alias);
            navigation.navigate(option, { alias });
        } catch (error) {
            console.log('Error al obtener el alias:', error);
        }
    };

    ///////

    useEffect(() => {
        console.log(mail);
        validarIdUsuario(); // Obtener el ID del usuario al cargar la pantalla
    }, []);

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


    const validarIdUsuario = async () => {
        try {
            const requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };
            const response = await fetch(`${IAUrl}/api/BuscarUsuariosPorUid?uid=${mail}`, requestOptions);
            const result = await response.json();
            console.log(result);
            let uid;
            for (let i = 0; i < result[0].attributes.length; i++) {
                if (result[0].attributes[i].type === 'uid') {
                    uid = result[0].attributes[i].values[0];
                    break; // Si encuentras el 'uid', sales del bucle
                }
            }

            console.log(uid);
            setUserId(uid);

        } catch (error) {
            console.log('Error al validar el usuario:', error);
        }

    };

    useEffect(() => {
        console.log("uid: ", userId);
    }, [userId]);



    const handleEnviar = () => {
        console.log('userID: ' + userId)
        const data = {
            userId: userId,
            password: password,
        };

        var requestOptions = {
            method: 'PUT',
            redirect: 'follow'
        };

        fetch(`${IAUrl}/api/ChangePassword?uid=${userId}&pass=${password}`, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));


        var requestOptions2 = {
            method: 'PUT',
            redirect: 'follow'
        };

        fetch(`${IAUrl}/api/DesbloquearUsuario?uid=${userId}`, requestOptions2)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));


        navigation.navigate('SuccessfulPasswordRecover', { alias: alias });
    };



    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.goBackButton} onPress={() => handleOptionPress('FirstScreen')}>
                <Feather name="arrow-left" size={24} color="black" />
                <Text style={styles.goBackText}>Volver</Text>
            </TouchableOpacity>
            <View style={styles.content}>
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
                        <Button theme="loginButton" label="Validar" onPress={handleValidarContrasenas} />
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
    square: {
        width: '100%',
        backgroundColor: 'rgba(240, 248, 255, 0.92)', // Color y opacidad
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    forgotPasswordButton: {
        marginVertical: 8,
    },
    forgotPasswordText: {
        color: 'blue',
        textDecorationLine: 'underline',
    },
    goBackButton: {
        marginLeft: 16,
        marginTop: '15%',
        flexDirection: 'row',
    },
    goBackText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
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
    button: {
        fontWeight: 'bold',
    },
    footer: {
        width: '100%',
    },
});

