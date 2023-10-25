import React from 'react';
import { View, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const QRCodeGenerator = ({ qrValue }) => {
  return (
    <View style={styles.container}>
      <QRCode
        value={qrValue} // El valor para el que quieres generar el código QR
        size={200} // Tamaño del código QR
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default QRCodeGenerator;
