import React from "react";
import { View, StyleSheet, Image, Text } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
import { LinearGradient } from 'expo-linear-gradient';
// import Logo from '../assets/Logo.svg'

// const Logo = require('../assets/Logo.svg');
const Logo = require('../assets/Logo.png');

const Footer = () => {

  const linearGradientColors = [
    'rgb(149.06, 178.75, 196.56)',
    'rgb(203, 206, 188)',
    'rgb(198.82, 206.13, 162.32)',
  ];
  return (
    <View style={styles.footer}>
     <LinearGradient
        colors={linearGradientColors}
        style={styles.linearGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Image source={Logo} style={styles.image} />
        {/* <Image src='../assets/Logo.svg' style={styles.image}/> */}
        <Text style={styles.logoText}>Deliver.AR</Text>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    display: 'flex',
    // position: 'fixed',
    justifyContent: 'center',
    width: '100%',
    height: 80,
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },  
  linearGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  image: {
    width: 55,
    height: 39,
    borderRadius: 5,
  },
});

export default Footer;
