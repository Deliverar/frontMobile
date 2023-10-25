import React, { useState, useEffect } from 'react';
import { Image, ScrollView, View, Text, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Entypo } from '@expo/vector-icons';
import { TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import { useNavigation } from '@react-navigation/native';
import { IA_URL } from '../envs';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function NavBar(props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigation = useNavigation();
  const [usuarios, setUsuarios] = useState([]);
  const IAUrl = IA_URL;
  const [userId, setUserId] = useState('');

  useEffect(() => {
    getIdUsuario();
  }, []);
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
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const windowHeight = Dimensions.get('window').height;
  const menuHeight = windowHeight;
  const menuWidth = Dimensions.get('window').width * 0.85;


  const goToMenuScreen = () => {
    console.log("Soy el navbar: " + props.alias);
    navigation.navigate('Menu', { alias: props.alias });
  };


  const linearGradientColors = [
    'rgb(149.06, 178.75, 196.56)',
    'rgb(203, 206, 188)',
    'rgb(198.82, 206.13, 162.32)',
  ];

  return (
    <View style={styles.NavBar}>
     <LinearGradient
        colors={linearGradientColors}
        style={styles.linearGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -100}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.navbarContainer}>
            <View style={styles.menuContainer}>
              <Entypo name="menu" size={24} color="#000000" onPress={goToMenuScreen} />
            </View>
            <StatusBar style="auto" backgroundColor="#D9D9D9" />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  NavBar: {
    display: 'flex',
    width: '100%',
    height: 80, // Ajusta la altura según tus necesidades
    position: 'absolute', // Cambia la posición a absoluta
    top: 0, // Alinea el navbar en la parte superior de la pantalla
    left: 0,
    right: 0,
    // zIndex: 9999, // Asegura que el navbar esté por encima del resto del contenido
  },
  navbarContainer: {
    // backgroundColor: '#D9D9D9',
    height: 100,
    paddingHorizontal: '4%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    left: 0,
    paddingBottom: 8,
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  linearGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  gradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuContainer: {
    // position: 'relative',
    marginRight: '5%',
    alignItems: 'flex-start',
  },
  menuContent: {
    alignItems: 'flex-start',
    // position: 'absolute',
    top: 0,
    //left: 0,
    left: -Dimensions.get('window').width * 0.03, // Resta el 15% del ancho d
    width: Dimensions.get('window').width * 0.85,
    height: Dimensions.get('window').height,
    backgroundColor: '#000000',
    borderRadius: 2,
    // padding: 8,
    zIndex: 9999,
    // marginTop: 8,
  },
  menuOption: {
    fontSize: 16,
    marginBottom: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: '#000',
  },
  filterContainer: {
    marginLeft: 16,
  },
});
