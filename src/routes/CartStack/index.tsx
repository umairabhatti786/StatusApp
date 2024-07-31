import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
export const navigationContainerRef = React.createRef();
import Cart from '../../screens/main/Cart';
import Checkout from '../../screens/main/Checkout';
import OrderConfirmed from '../../screens/main/OrderConfirmed';
import OrderLocation from '../../screens/main/OrderLocation';
import OrderFeatured from '../../screens/main/OrderFeatured';
import Payments from '../../screens/main/Payments';
import TermAndCondition from '../../screens/main/TermAndCondition';
const CartStack = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator
        screenOptions={{
            headerShown: false,
            cardStyleInterpolator: ({ current: { progress } }) => {
              return {
                cardStyle: {
                  opacity: progress,
                },
              };
            },
          }}
            initialRouteName='Cart'
        >
            <Stack.Screen name="Cart" component={Cart} />
            <Stack.Screen name="Checkout" component={Checkout} />
            <Stack.Screen name="TermAndCondition" component={TermAndCondition} />

            <Stack.Screen name="OrderConfirmedScreen" 
                                      options={{ headerShown: false, gestureEnabled: false, }}

            component={OrderConfirmed} />
                        <Stack.Screen name="Payments" component={Payments} />

            <Stack.Screen name="OrderLocation" component={OrderLocation} />
            <Stack.Screen name="OrderFeatured" component={OrderFeatured} />
        </Stack.Navigator>
    )
}

export default CartStack