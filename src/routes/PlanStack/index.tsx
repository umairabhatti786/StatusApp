import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
export const navigationContainerRef = React.createRef();
import QrScreen from '../../screens/main/QrScreen';
import ScanQr from '../../screens/main/ScanQr';
import MyPlans from '../../screens/main/MyPlans';
import Payments from '../../screens/main/Payments';
const PlanStack = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName='MyPlans'
        >
            <Stack.Screen name="MyPlans" component={MyPlans} />
            <Stack.Screen name="Payments" component={Payments} />

        </Stack.Navigator>
    )
}

export default PlanStack