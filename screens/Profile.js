import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import Footer from '../componentes/Footer';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { API_URL } from '../envs';
import { ActivityIndicator } from 'react-native';



const buttonTheme = {
    buttonBackground: 'rgba(255, 153, 0, 0.85)',
    buttonText: '#fff',
    buttonStroke: '#DCDBDB',
    buttonStrokeWidth: 1,
};


export default function Profile() {
    const navigation = useNavigation();
    const route = useRoute();
    const { alias } = route.params;
    const [fullName, setFullName] = useState('');
    const [inputFullName, setInputFullName] = useState('');
    const [usrImg, setUsrImg] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [isLoading, setIsLoading] = useState('');
    const [isEditingImage, setIsEditingImage] = useState(false);
    const apiUrl = API_URL;
    const [userId, setUserId] = useState(null);
    const [mail, setMail] = useState(null);




    useEffect(() => {
        setIsLoading(false);
        const obtenerFullNameAvatar = async () => {
            try {
                const requestOptions = {
                    method: 'GET',
                    redirect: 'follow'
                };
                const response = await fetch(`${apiUrl}/usuario/buscarxalias?alias=${alias}`, requestOptions);
                const result = await response.json();
                console.log("Soy result en perfil: " + result);
                if (result && result.nombre) {
                    setFullName(result.nombre);
                    setUsrImg(result.avatar);
                    setUserId(result.idUsuario);
                    setMail(result.mail);
                }
            } catch (error) {
                console.log('Error:', error);
            }
        };

        obtenerFullNameAvatar();
    }, []);


    const handleGoBack = () => {
        navigation.goBack();
    };

    const handleChangePassword = () => {
        console.log(alias);
        navigation.navigate('PasswordChange', { alias: alias });
    };


    useEffect(() => {
        console.log('Valor del alias:', alias);
    }, []);


    function delayedFunction() {
        console.log("La función se ejecutará después de un retraso de 2000 ms");

        setTimeout(function () {
            console.log("La función se ejecutó después de un retraso de 10000 ms");
            // Aquí puedes colocar el código que deseas ejecutar después del retraso
            setIsLoading(false);
        }, 10000);
        setIsLoading(false);
    }


    const handleFullNameChange = (text) => {
        setInputFullName(text);
    };

    const updateFullName = async () => {
        setIsLoading(true);

        const requestOptions = {
            method: 'PUT',
            redirect: 'follow'
        };

        const url = `${apiUrl}/usuario/modificarApeNom?alias=${alias}&apenom=${inputFullName}`;

        try {
            const response = await fetch(url, requestOptions);
            const result = await response.text();
            console.log(result);
            setFullName(inputFullName); // Actualizar el nombre mostrado después de la actualización
        } catch (error) {
            console.log('error', error);
        }

        setIsLoading(false);
    };



    const subirArchivoS3 = async (urlVerificada, archivo) => {
        setIsLoading(true);
        try {
            let response = await fetch(urlVerificada, {
                method: 'PUT',
                body: archivo,
                headers: {
                    //TODO ver si eliminando este header sigue funcionando. por ahora solo acepta jpg
                    'Content-Type': 'image/jpeg'
                },
            });

            // si la respuesta no es OK
            if (!response.ok) {
                throw new Error('Upload to S3 failed: ' + response.statusText);

            }
            console.log('Upload to S3 was successful');
            return true;
        } catch (error) {
            console.log('Error uploading to S3: ' + error);
        }
    };

    //TODO agregar el segundo paramtrto id usuario
    const getUrlVerificada = async (nombreArchivo, userId) => {
        var myHeaders = new Headers();
        myHeaders.append("user_id", userId);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders
        };
        const result = await fetch(`${apiUrl}/multimedia/get_url?file_name=${nombreArchivo}`, requestOptions);
        //const result = await fetch(`http://172.29.208.1:8080/multimedia/${nombreArchivo}/${1}`);
        if (result.ok) {
            return await result.text();
        }
    }
    const fetchImageFromUri = async (uri) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        return blob;
    };


    const handleTakePhoto = async () => {
        setIsEditingImage(true);
        setIsLoading(true);
        setSelectedImage(null);

        const { status } = await ImagePicker.requestCameraPermissionsAsync();

        if (status !== 'granted') {
            alert('Se requieren permisos para acceder a la cámara.');
            setIsEditingImage(false);
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.cancelled) {
            delayedFunction();
            setSelectedImage(result.uri);
            setUsrImg(result.uri); // Actualizar la imagen de perfil mostrada
            const blob = await fetchImageFromUri(result.uri);
            //const urlVerificada = await getUrlVerificada('archivo.jpg', userId);
            const urlVerificada = await getUrlVerificada('avatar.jpg', userId);
            const response = await subirArchivoS3(urlVerificada, blob);
            if (response) {
                //TODO caragr url en la tabla usuario columna avatar, este es el
                // formato : https://s3.amazonaws.com/adicook.multimedia/${usuarioid}/${nombreArchivo}.jpg
                //TODO cambiar el 1 por el id del usuario
                const url = `https://s3.amazonaws.com/adicook.multimedia/${userId}/avatar.jpg`
                var requestOptions = {
                    method: 'PUT'
                };
                // const result = await fetch(`http://192.168.0.140:8080/usuario/updateAvatar?user_id=1&url=${url}`, requestOptions);
                console.log("ESTO ES selectedImage: " + selectedImage); // Muestra el nombre del archivo seleccionado
                setSelectedImage(url);
            }
        }

        setIsEditingImage(false);
    };

    // const handleGoToFeed = () => {
    //     console.log(alias);
    //     navigation.navigate('Feed', { alias: alias });
    //     // Implementa tu lógica para recuperar la contraseña
    // };

    const handleSelectPhoto = async () => {
        setIsEditingImage(true);
        setSelectedImage(null);
        setIsLoading(true);


        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
            alert('Se requieren permisos para acceder a la galería.');
            setIsEditingImage(false);
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });
        if (!result.cancelled) {
            delayedFunction();
            setSelectedImage(result.uri);
            setUsrImg(result.uri); // Actualizar la imagen de perfil mostrada
            const blob = await fetchImageFromUri(result.uri);
            const urlVerificada = await getUrlVerificada('avatar.jpg', userId);
            const response = await subirArchivoS3(urlVerificada, blob);
            if (response) {
                const url = `https://s3.amazonaws.com/adicook.multimedia/${userId}/avatar.jpg`
                var requestOptions = {
                    method: 'PUT'
                };
                setSelectedImage(url);
                console.log("ESTO ES url: " + url); // Muestra el nombre del archivo seleccionado
            }
        }
        setIsEditingImage(false);
    };

    const updateProfilePhoto = async (photoUri) => {
        setIsLoading(true);

        const requestOptions = {
            method: 'PUT',
            redirect: 'follow'
        };
        console.log("antes de cargar en la base selectedImage: " + selectedImage);

        const url = `${apiUrl}/usuario/modificarAvatar?alias=${alias}&avatar=${selectedImage}`;

        try {
            await fetch(url, requestOptions);
            console.log("Soy selected image: " + selectedImage);
            setUsrImg(selectedImage); // Actualizar la imagen de perfil mostrada
        } catch (error) {
            console.log('error', error);
        }

        // setIsLoading(false);
    };

    const handleSaveChanges = async () => {
        setIsLoading(false);

        if (inputFullName !== "" && selectedImage) {
            await updateProfilePhoto(selectedImage);
            await updateFullName();
        } else if (inputFullName !== "") {
            await updateFullName();
        } else if (selectedImage) {
            await updateProfilePhoto(selectedImage);
        }
        console.log(alias);
        navigation.navigate('Feed', { alias: alias });
        // navigation.goBack();
    };



    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.goBackButton} onPress={handleGoBack}>
                    <Feather name="arrow-left" size={24} color="black" />
                    <Text style={styles.goBackText}>Volver</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.userName}>
                <Text style={styles.fullName}>{fullName}</Text>
            </View>
            <View style={styles.content}>
                <View style={styles.square}>
                    <Text style={styles.title}>Editar perfil</Text>
                    <View style={styles.titleContainer}>
                        <Text style={styles.subtitle}>Nombre y Apellido</Text>
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder="Nombre y Apellido"
                        required
                        placeholderTextColor="#888"
                        value={inputFullName || fullName}
                        onChangeText={setInputFullName}
                    />
                    <View style={styles.titleContainer}>
                        <Text style={styles.subtitle}>Alias</Text>
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder="Alias"
                        required
                        color="#888888"
                        value={alias}
                        editable={false}
                    />
                    {isLoading ? (
                        <View>
                            <Text>Cargando imagen</Text>
                            <ActivityIndicator size="large" color="#0000ff" />
                            <View style={styles.buttonDisabled}>
                                <Button
                                    label="Confirmar"
                                    disabled
                                />
                            </View>
                        </View>
                    ) : (
                        <Button
                            theme="loginButton"
                            label="Confirmar"
                            onPress={handleSaveChanges}
                        />
                    )}
                </View>
                <TouchableOpacity style={[styles.changePasswordButton, { backgroundColor: 'rgba(255, 153, 0, 0.85)' }]} onPress={handleChangePassword}>
                    <Text style={styles.changePasswordText}>Cambiar contraseña</Text>
                </TouchableOpacity>
            </View>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 6,
        // paddingBottom: 16,
    },
    content: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingBottom: '25%',
    },
    feather: {
        backgroundColor: "#FF9900",
        borderRadius: 8,
        width: 150,
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
    },
    userName: {
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: '5%',
        marginLeft: '2%',
    },
    userImage: {
        width: 75,
        height: 75,
        borderRadius: 40,
        marginRight: 8,
    },
    square: {
        width: '100%',
        backgroundColor: 'rgba(255, 153, 0, 0.25)',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 16,
    },
    goBackButton: {
        marginLeft: 16,
        marginTop: '15%',
    },
    goBackText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    titleContainer: {
        width: '100%',
        alignItems: 'flex-start',
        marginTop: 8,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 6,
        textAlign: 'left',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 6,
        textAlign: 'left',
    },
    errorMessage: {
        color: 'red',
        fontWeight: 'bold',
        marginBottom: 25,
    },
    errorMessagePassword: {
        color: 'red',
        fontWeight: 'bold',
        marginBottom: 16,
        textDecorationLine: 'underline',
    },
    forgotPasswordButton: {
        marginVertical: 8,
    },
    input: {
        width: '100%',
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 8,
        marginBottom: 8,
    },
    fullName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    footer: {
        width: '100%',
    },
    header: {
        width: '100%',
        alignItems: 'flex-start',
        marginTop: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
        paddingLeft: 16,
    },
    changePasswordButton: {
        marginTop: 16,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        width: '50%',
    },
    changePasswordText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonContainer: {
        marginTop: 8,
    },
    button: {
        backgroundColor: '#FF9900',
        padding: 12,
        borderRadius: 4,
        marginBottom: 8,
        fontWeight: 'bold',
        flexDirection: 'row',
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    buttonDisabled: {
        backgroundColor: '#D9D9D9',
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
