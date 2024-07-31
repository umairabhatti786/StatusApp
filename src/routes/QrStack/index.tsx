import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
export const navigationContainerRef = React.createRef();
import QrScreen from '../../screens/main/QrScreen';
import ScanQr from '../../screens/main/ScanQr';
const QrStack = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName='QrScreen'
        >
            <Stack.Screen name="QrScreen" component={QrScreen} />
            <Stack.Screen name="ScanQr" component={ScanQr} />
        </Stack.Navigator>
    )
}

export default QrStack