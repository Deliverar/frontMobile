import { IA_URL } from '../envs';
import React, { useState, useEffect } from 'react';
import Button from '../componentes/Button';
import Footer from '../componentes/Footer';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

const buttonTheme = {
  buttonBackground: 'rgba(255, 153, 0, 0.85)',
  buttonText: '#fff',
  buttonStroke: '#DCDBDB',
  buttonStrokeWidth: 1,
};


export default function GeneratePassword() {
  const [mail, setMail] = useState('');
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [responseMessage, setResponseMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [validarCorreo, setValidarCorreo] = useState(true);
  const navigation = useNavigation();
  const IAUrl = IA_URL;

  const handleMailChange = (text) => {
    setMail(text);
  };


  const handleValidar = async () => {
    // Realizar la solicitud de validación del correo en el backend
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    try {
      const emailValidationResponse = await fetch(`${IAUrl}/api/validarEmail?name=${mail}`, requestOptions);
      const emailValidationResult = (await emailValidationResponse.text()).trim();
      console.log("Resultado de validación de email:", emailValidationResult);

        console.log(emailValidationResult === "1");
      if (emailValidationResult === "1") {
        // Correo existe
        setValidarCorreo(false);
        setResponseMessage(
          // 'Estimado, tenga en cuenta que se le enviará un correo de activación al mail proporcionado, desde el cual usted deberá completar los datos necesarios y crear su nueva contraseña personal.'
          'Enviaremos un código a tu correo, si te llegó, pasa a la siguiente pantalla para utilizarlo'
        );
        const requestOptions2 = {
            method: 'GET',
            redirect: 'follow'
          };
          
          try {
            const response = await fetch(`${IAUrl}/api/BuscarUsuariosPorUid?uid=${mail}`, requestOptions2);
            const result = await response.json();
            const givenName = result[0].attributes[0].values[0];
            setNombreUsuario(givenName);
          } catch (error) {
            console.log('error', error);
            // Manejo de errores adicionales si es necesario
          }   
      } else {
        // Correo no existe
        setValidarCorreo(true);
        setResponseMessage(
          // 'El email ingresado no corresponde a un alumno. Si usted no es alumno, favor de registrarse como visitante.'
          'El email ingresado no se encuentra registrado.'
        );
      }


      setShowMessage(true); // Mostrar el mensaje
      // Realizar la segunda llamada de API para enviar el correo de recuperación de contraseña
 

    } catch (error) {
      console.log('error', error);
      // Manejo de errores adicionales si es necesario
    }
  };

  useEffect(() => {
    console.log("givenName: ", nombreUsuario);
  }, [nombreUsuario]);
  

  const handleOtpEmailSent = () => {
    const data = {
      mail: mail
    };
    var requestOptions3 = {
        method: 'PUT',
        redirect: 'follow'
      };
      fetch(`${IAUrl}/api/GenerarOTP?uid=${mail}&name=${nombreUsuario}`, requestOptions3)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
        navigation.navigate('OtpEmailSent', data);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.square}>
          <Text style={styles.title}>Ingrese su mail</Text>
          <TextInput
            style={styles.input}
            placeholder="Mail"
            placeholderTextColor="#888"
            value={mail}
            onChangeText={handleMailChange}
          />
          {showMessage && (
            <Text style={[styles.message, { color: validarCorreo ? 'red' : 'black' }]}>
              {responseMessage}
            </Text>
          )}
          {validarCorreo ? (
            <Button theme="loginButton" label="Validar Correo" onPress={handleValidar} />
          ) : (
            <Button theme="loginButton" label="Enviar" onPress={handleOtpEmailSent} />
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
    backgroundColor: 'rgba(240, 248, 255, 0.92)', // Color y opacidad
    width: 422,
    height: 200,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    alignContent: 'center',
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
  input: {
    width: '90%',
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
