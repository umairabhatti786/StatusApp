import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Redeem from '../../screens/main/Redeem';
import Earn from '../../screens/main/Earn';
import Rewards from '../../screens/main/Rewards';

const RewardStack = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator
        screenOptions={{
            headerShown: false,
          
          }}
            // screenOptions={{ headerShown: false }}
        >
                        <Stack.Screen name="Rewards" component={Rewards} />

            <Stack.Screen name="Redeem" component={Redeem} />
            <Stack.Screen name="Earn" component={Earn} />

         

        </Stack.Navigator>
    )
}

export default RewardStack