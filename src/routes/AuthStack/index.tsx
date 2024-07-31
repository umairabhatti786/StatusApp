import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from '../../screens/auth/Login';
import CompleteProfile from '../../screens/auth/CompleteProfile';
import WrongNumber from '../../screens/auth/WrongNumber';
import Register from '../../screens/auth/Register';
import Otp from '../../screens/auth/Otp';
export const navigationContainerRef = React.createRef();

const AuthStack = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
        >
        <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="CompleteProfile" component={CompleteProfile} />
            <Stack.Screen name="WrongNumber" component={WrongNumber} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Otp" component={Otp} />
        </Stack.Navigator>
    )
}

export default AuthStack