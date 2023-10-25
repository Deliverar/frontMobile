import React, { useEffect, useState } from 'react';
import Button from '../componentes/Button';
import Footer from '../componentes/Footer';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import NetInfo from '@react-native-community/netinfo';
import { Image } from 'react-native';
import otp from '../assets/otp.png';
import { IA_URL } from '../envs';


// const otp = require('../../assets/otp.png');


const buttonTheme = {
  buttonBackground: 'rgba(255, 153, 0, 0.85)',
  buttonText: '#fff',
  buttonStroke: '#DCDBDB',
  buttonStrokeWidth: 1,
};

const correoExiste = (alias) => {
  // Simulamos que el correo "usuario" ya existe
  return alias === "usuario";
};

export default function OTPVerify() {
  const IAUrl = IA_URL;
  const navigation = useNavigation();
  const [code, setCode] = useState('');
  const route = useRoute();
  const { alias } = route.params;
  const { mail } = route.params;
  const [responseMessage, setResponseMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);

//   const handlePasswordRecover = () => {
//     navigation.navigate('GeneratePassword');
//   };

  const handleChangeCode = (value) => {
    setCode(value);
  };



  const handleValidarOTP = async () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    const data = {
      mail: mail,
    };

    try {
      const response = await fetch(`${IAUrl}/api/ValidarOTP?uid=${mail}&otp=${code}`, requestOptions);
      console.log(response);
      const result = await response.text();
      console.log(result.status);
      console.log("soy result: " + result)
      if (result === "1") {
        console.log("asd");
        navigation.navigate('PasswordRecover', data);
      }else {
        setResponseMessage(
          'Código erróneo, por favor intente nuevamente con el código que hemos enviado a su correo.'
          // 'El email ingresado no se encuentra registrado o el registro se encuentra incompleto.'
        );
        setShowMessage(true);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

// AGREGAR MESNSAJE DE ERROR: Código erróneo, por favor intente nuevamente con el código que hemos enviado a su correo.





  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          {/* <ImageViewer placeholderImageSource={otp} style={styles.image} /> */}
          <Image source={otp} style={styles.image} resizeMode="contain" />
        </View>
        {/* <Text>mail: {mail}</Text> */}
        <View style={styles.square}>
        <Text style={styles.subtitle}>Ingresa el código que te enviamos!</Text>
        <View style={styles.input}>
            <TextInput
              style={styles.input}
              placeholder="******"
              placeholderTextColor="#808080"
              value={code}
              onChangeText={handleChangeCode}
            />
          </View>
          {showMessage && (
            <Text style={[styles.message, { color: showMessage ? 'red' : 'black' }]}>
              {responseMessage}
            </Text>
          )}
          <View style={styles.buttonContainer}>
            {/* <Button label="Verificar otp" onPress={handleValidarOTP} style={styles.button} /> */}
            <Button theme="loginButton" label="Verificar OTP" onPress={handleValidarOTP} />
          </View>
          <StatusBar style="auto" />
        </View>
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
  imageContainer: {
    flex: 1/3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 224, // Ajusta el tamaño de la imagen según tus necesidades
    height: 224,
    aspectRatio: 1, // Mantén el aspect ratio para evitar distorsiones
  },
  square: {
    width: '100%',
    backgroundColor: '#f0f8ffeb',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '50%',
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 8,
    color: '#000',
  },
  subtitle: {
    fontSize: 24,
    textAlign: 'justify',
    marginBottom: 16,
  },
  forgotPasswordButton: {
    marginVertical: 8,
  },
  forgotPasswordText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  inputContainer: {
    width: '10%',
    paddingHorizontal: 24, // Ajusta el padding según tus necesidades
  },
  button: {
    backgroundColor: 'rgba(255, 153, 0, 0.85)',
   // width: '20%', // Ajusta el ancho según tus necesidades
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 18,
    width: '50%',
  },
  buttonContainer:{
    width: '100%',
    // paddingHorizontal: 40,
    alignItems: 'center'
  },
  footer: {
    width: '100%',
  },
});
