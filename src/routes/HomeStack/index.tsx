import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
export const navigationContainerRef = React.createRef();
import QrScreen from '../../screens/main/QrScreen';
import ScanQr from '../../screens/main/ScanQr';
import Home from '../../screens/main/Home';
import Notifications from '../../screens/main/Notifications';
import Profile from '../../screens/main/Profile';
import ProfileUpdate from '../../screens/main/ProfileUpdate';
import Payments from '../../screens/main/Payments';
import AddPayment from '../../screens/main/AddPayment';
import OrderHistory from '../../screens/main/OrderHistory';
import Privacy from '../../screens/main/Privacy';
import NotificationSettings from '../../screens/main/NotificationSettings';
import OrderFeatured from '../../screens/main/OrderFeatured';
import OrderFilter from '../../screens/main/OrderFilter';
import OrderLocation from '../../screens/main/OrderLocation';
import OrderSearch from '../../screens/main/OrderSearch';
import OrderDetailCard from '../../screens/main/OrderDetailCard';
import ActiveOrders from '../../screens/main/ActiveOrders';
import PointsHistory from '../../screens/main/PointsHistory';
import BlogDetail from '../../screens/main/BlogDetail';
import AboutUs from '../../screens/main/AboutUs';
import PrivacyNotes from '../../screens/main/PrivacyNotes';
import HelpAndPolicies from '../../screens/main/HelpAndPolicies';
const HomeStack = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator
        screenOptions={{
            headerShown: false,
          
          }}
            // screenOptions={{ headerShown: false }}
            initialRouteName='Home'
        >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Notifications" component={Notifications} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="BlogDetail" component={BlogDetail} />

            <Stack.Screen name="ProfileUpdate" component={ProfileUpdate} />
            <Stack.Screen name="Payments" component={Payments} />
            <Stack.Screen name="AboutUs" component={AboutUs} />

            <Stack.Screen name="AddPayment" component={AddPayment} />
            <Stack.Screen name="OrderHistory" component={OrderHistory} />
            <Stack.Screen name="Privacy" component={Privacy} />
            <Stack.Screen name="PrivacyNotes" component={PrivacyNotes} />
            <Stack.Screen name="HelpAndPolicies" component={HelpAndPolicies} />
            <Stack.Screen name="NotificationSettings" component={NotificationSettings} />
            <Stack.Screen name="OrderFeatured" component={OrderFeatured} />
            <Stack.Screen name="OrderFilter" component={OrderFilter} />
            <Stack.Screen name="OrderLocation" component={OrderLocation} />
            <Stack.Screen name="OrderSearch" component={OrderSearch} />
            <Stack.Screen name="ActiveOrders" component={ActiveOrders} />
            <Stack.Screen name="PointsHistory" component={PointsHistory} />


        </Stack.Navigator>
    )
}

export default HomeStack