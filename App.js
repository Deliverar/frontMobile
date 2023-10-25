import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import RobotoRegular from './assets/Roboto/Roboto-Regular.ttf';
import Login from './screens/Login';
import Feed from './screens/Feed';
import GenerateQR from './screens/GenerateQR';
import ChangePassword from './screens/ChangePassword';
import SuccessfulPasswordChange from './screens/SuccessfulPasswordChange';
import GeneratePassword from './screens/GeneratePassword';
import OtpEmailSent from './screens/OtpEmailSent';
import OTPVerify from './screens/OTPVerify';
import PasswordRecover from './screens/PasswordRecover';
import SuccessfulPasswordRecover from './screens/SuccessfulPasswordRecover';
import Menu from './screens/Menu';
import ValidateAccount from './screens/ValidateAccount';
import OtpUnlockAccountEmailSent from './screens/OtpUnlockAccountEmailSent';
import OTPUnlockAccountVerify from './screens/OTPUnlockAccountVerify';
import UnlockAccount from './screens/UnlockAccount';
import SuccessfulAccountUnlocked from './screens/SuccessfulAccountUnlocked';


const Stack = createStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    'Roboto-Regular': RobotoRegular,
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Feed" component={Feed} options={{ headerShown: false }} />
        <Stack.Screen name="GenerateQR" component={GenerateQR} options={{ headerShown: false }} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ headerShown: false }} />
        <Stack.Screen name="SuccessfulPasswordChange" component={SuccessfulPasswordChange} options={{ headerShown: false }} />
        <Stack.Screen name="GeneratePassword" component={GeneratePassword} options={{ headerShown: false }} />
        <Stack.Screen name="OtpEmailSent" component={OtpEmailSent} options={{ headerShown: false }} />
        <Stack.Screen name="OTPVerify" component={OTPVerify} options={{ headerShown: false }} />
        <Stack.Screen name="PasswordRecover" component={PasswordRecover} options={{ headerShown: false }} />
        <Stack.Screen name="SuccessfulPasswordRecover" component={SuccessfulPasswordRecover} options={{ headerShown: false }} />
        <Stack.Screen name="Menu" component={Menu} options={{ headerShown: false }} />
        <Stack.Screen name="ValidateAccount" component={ValidateAccount} options={{ headerShown: false }} />
        <Stack.Screen name="OtpUnlockAccountEmailSent" component={OtpUnlockAccountEmailSent} options={{ headerShown: false }} />
        <Stack.Screen name="OTPUnlockAccountVerify" component={OTPUnlockAccountVerify} options={{ headerShown: false }} />
        <Stack.Screen name="UnlockAccount" component={UnlockAccount} options={{ headerShown: false }} />
        <Stack.Screen name="SuccessfulAccountUnlocked" component={SuccessfulAccountUnlocked} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


