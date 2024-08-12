import React, { useState, useEffect } from "react";
import { StatusBar, AppState } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  NavigationContainer,
  DefaultTheme,
  useNavigation,
} from "@react-navigation/native";

import AppStack from "./AppStack/AppStack";
import { AUTH, StorageServices, TOKEN } from "../utils/hooks/StorageServices";
import { useDispatch, useSelector } from "react-redux";
import { getUserData, setUserData } from "../redux/reducers/authReducer";
import SplashScreen from "react-native-splash-screen";
import { UserProfileSetup } from "../api/ApiServices";

const RootNavigator = () => {
  const Stack = createStackNavigator();

  useEffect(() => {
    console.log("SpalsjRunning");
    const timer = setTimeout(() => {
      SplashScreen.hide(); // Hide splash screen after two seconds
    }, 2000);

    return () => clearTimeout(timer); // Clear the timer if the component unmounts
  }, []);

  useEffect(() => {
    const handleAppStateChange = async (nextAppState) => {
      if (nextAppState === "active") {
        // The app has come to the foreground (started or resumed)
        console.log("App has come to the foreground");
        performOnForeground();

        // Perform any action you want on app start or resume
      } else if (nextAppState === "background") {
        // The app is going to the background
        console.log("App has gone to the background");
        // Perform any action you want on app background
        performOnBackground();
      }
    };

    AppState.addEventListener("change", handleAppStateChange);

    // Perform any action you want on app start (initial load)

    return () => {
      // AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);

  const performOnBackground = async () => {
    console.log("performOnBackground");
    let token = await StorageServices.getItem(TOKEN);
    let form = new FormData();
    form.append("isOnline", 0);
    form.append("last_seen", 1);
    UserProfileSetup(form, token, async ({ isSuccess, response }: any) => {});
  };

  const performOnForeground = async () => {
    console.log("performOnForeground");
    let token = await StorageServices.getItem(TOKEN);
    let form = new FormData();
    form.append("isOnline", 1);
    // form.append("last_seen", 1);
    UserProfileSetup(form, token, async ({ isSuccess, response }: any) => {});
  };

  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor="#yourStatusBarColor"
        barStyle="light-content"
      />

      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="AppStack" component={AppStack} />
        {/* Add your Login screen here */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
