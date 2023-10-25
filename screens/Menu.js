import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {StatusBar} from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IA_URL } from '../envs';
import { Feather } from '@expo/vector-icons';

export default function Menu() {
    const IAUrl = IA_URL;
    const navigation = useNavigation();
    const route = useRoute();
    const {alias} = route.params;
    const [nombre, setNombre] = useState('');
    const [usrImg, setUsrImg] = useState('');
    // const [alias, setAlias] = useState('');
    const [userId, setUserId] = useState('');
    const [recetasFavoritas, setRecetasFavoritas] = useState([]);
    const [isFavorito, setIsFavorito] = useState(true);

    useEffect(() => {
        getIdUsuario();
    }, []);
    console.log(alias);
    const getIdUsuario = async () => {
        try {
            const value = await AsyncStorage.getItem('@alias');
            if (value !== null) {
                setUserId(value);
                console.log(value);
            }
        } catch (e) {

        }
    }
    const handleOptionPress = (option) => {
        try {
            console.log("Valor de alias: " + alias);
            navigation.navigate(option, { alias });
        } catch (error) {
            console.log('Error al obtener el alias:', error);
        }
    };


  const handleGoBack = () => {
    navigation.goBack();
  };


  useEffect(() => {
    // console.log("Valor de alias actualizado:", alias);
  }, [alias]);

  console.log("Soy el componente Menu:", alias);

  useEffect(() => {
    const obtenerNombre = async () => {
      try {
        const requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };
        const response = await fetch(`${IAUrl}/api/BuscarUsuariosPorUid?uid=${alias}`, requestOptions);
        const result = await response.json();
        const givenName = result[0].attributes[0].values[0];
        setNombre(givenName);
        console.log(result);
        // if (result && result.nombre) {
        //   setNombre(result.nombre);
        //   setUsrImg(result.avatar);
        // }
      } catch (error) {
        console.log('Error:', error);
      }
    };

    obtenerNombre();
  }, []);


  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.goBackButton} onPress={handleGoBack}>
                <Feather name="arrow-left" size={24} color="black" />
                <Text style={styles.goBackText}>Volver</Text>
            </TouchableOpacity>
      <View style={styles.userName}>
        {/* <Image
          source={{ uri: usrImg }}
          resizeMode="cover"
          style={styles.userImage}
        /> */}
        <Text style={styles.welcome}>Bienvendo {nombre}</Text>
        <br></br>
      </View>
      <View style={styles.menuOptions}>
        {/* <TouchableOpacity style={styles.option} onPress={() => handleOptionPress('Perfil')}>
          <Text style={styles.optionText}>Perfil</Text>
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.option} onPress={() => handleOptionPress('Feed')}>
          <Text style={styles.optionText}>Inicio</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => handleOptionPress('Login')}>
          <Text style={styles.optionText}>Cerrar sesión</Text>
        </TouchableOpacity>
        <StatusBar style="auto" backgroundColor="#D9D9D9" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '10%',
    backgroundColor: 'rgba(240, 248, 255, 0.92)', // Color y opacidad
    paddingHorizontal: 20,
  },
  option: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  welcome: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  goBackButton: {
    // marginLeft: 10,
    // marginTop: '2%',
    marginBottom: '5%',
    flexDirection: 'row',
},
goBackText: {
    fontSize: 16,
    fontWeight: 'bold',
    justifyContent: 'center',
    color: '#333',
},
  backButtonText: {
    fontSize: 16,
    color: 'blue',
    textDecorationLine: 'underline',
  },
  menuOptions: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  userName: {
    flexDirection: "row",
    alignItems: "center",
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
