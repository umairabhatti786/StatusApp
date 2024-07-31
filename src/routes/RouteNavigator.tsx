import React, { useEffect, useState } from "react";
import { AppState, } from 'react-native';

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/main/Home";
import Splash from "../screens/main/Splash";
import Login from "../screens/auth/Login";
import Register from "../screens/auth/Register";
import Otp from "../screens/auth/Otp";
import BottomNavigator from "./BottomTabBarNavigator";
import MyPlans from "../screens/main/MyPlans";
import QrScreen from "../screens/main/QrScreen";
import ScanQr from "../screens/main/ScanQr";
import VerifiedScreen from "../screens/auth/VerifiedScreen";
import Dummy from "../screens/main/Dummy";
import Notifications from "../screens/main/Notifications";
import OnboardingScreens from "../screens/auth/OnboardingScreens";
import WrongNumber from "../screens/auth/WrongNumber";
import Profile from "../screens/main/Profile";
import Payments from "../screens/main/Payments";
import AddPayment from "../screens/main/AddPayment";
import OrderHistory from "../screens/main/OrderHistory";
import Privacy from "../screens/main/Privacy";
import NotificationSettings from "../screens/main/NotificationSettings";
import Checkout from "../screens/main/Checkout";
import Rewards from "../screens/main/Rewards";
import OrderLocation from "../screens/main/OrderLocation";
import OrderSearch from "../screens/main/OrderSearch";
import OrderFeatured from "../screens/main/OrderFeatured";
import OrderDetailCard from "../screens/main/OrderDetailCard";
import OrderFilter from "../screens/main/OrderFilter";
import { NotificationServices } from "../utils/hooks/NotificationServices";
import SplashScreen from "react-native-splash-screen";
import CompleteProfile from "../screens/auth/CompleteProfile";
import {
  LOCATIO_ACCESS,
  ON_BOARDING,
  StorageServices,
} from "../utils/hooks/StorageServices";
import { useDispatch, useSelector } from "react-redux";
import {
  getSignupValue,
  getToken,
  getUserData,
  setNotificationAlert,
  setOnboaring,
  setUserData,
} from "../redux/reducers/authReducer";
import { setLocationAccess } from "../redux/reducers/locationReducer";
import MyAddress from "../screens/main/MyAddress";
import BranchDetail from "../screens/main/BranchDetail";
import OneSignal from "react-native-onesignal";
import { ApiServices } from "../api/ApiServices";
import localizationData from "../locale/locale.json";
import { updateFile } from "../utils/NodeFunction";
import RNFS from "react-native-fs";
import { setLocalizeFile } from "../redux/reducers/localizeReducer";
import { checkDynamicLink } from "../utils/hooks/FirebaseServices";
import LoadingScreen from "../screens/main/LoadingScreen";
import WelcomeScreen from "../screens/main/WelcomeScreen";

export const navigationContainerRef = React.createRef();

const RouteNavigator = () => {
  const userData = useSelector(getUserData);
  const onboarding = useSelector(getSignupValue).onboadring;
  const [localData, setLocaData] = useState<any>();
  const token = useSelector(getToken);
  const [loading, setLoading] = useState(true);
  const [appState, setAppState] = useState(AppState.currentState);


  let fileName = "/localData.json'";
  const filePath = RNFS.DocumentDirectoryPath + fileName;

  const dispatch = useDispatch();
  useEffect(() => {
    checkLocalizeExist();
    getUserInfo();
    getAppLocalize();

    // setTimeout(() => {
    //   setLoading(false);
    // }, 1200);
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      SplashScreen.hide(); // Hide splash screen after two seconds
    }, 2000);

    return () => clearTimeout(timer); // Clear the timer if the component unmounts
  }, []);

  // useEffect(() => {
  //   const handleAppStateChange = (nextAppState) => {
  //     if (appState.match(/inactive|background/) && nextAppState === 'active') {
  //       // The app is coming to the foreground
  //       console.log('App has come to the foreground!');
  //     }
  //     setAppState(nextAppState);
  //   };
  //   AppState.addEventListener('change', handleAppStateChange);

  //   // Hide the splash screen after the app has been fully launched
  //   SplashScreen.hide();

    
  // }, [appState]);
  const checkFileExists = async (filePath: any) => {
    try {
      const exists = await RNFS.exists(filePath);
      return exists;
    } catch (error) {
      console.error("Error checking file existence:", error);
      return false;
    }
  };

  const checkLocalizeExist = () => {
    checkFileExists(filePath)
      .then((exists) => {
        if (exists) {
        } else {
          writeFileData(localizationData);
        }
      })
      .catch((error) => {
        console.error("Error checking file existence:", error);
      });
  };
  const getAppLocalize = () => {
    const params = {
      token: token,
    };

    ApiServices.getEntityLocalize(
      params,
      async ({ isSuccess, response }: any) => {
        if (response.success) {
          console.log("LocalizeRes",response)
          writeFileData(response.data);
          setLoading(false)
        } else {
          readFile();
        }
      }
    );
  };
  const writeFileData = (data: any) => {
    const jsonString = JSON.stringify(data);
    var path = RNFS.DocumentDirectoryPath + fileName;
    RNFS.writeFile(path, jsonString, "utf8")
      .then(() => readFile())
      .catch((err) => console.log(err.message));
  };
  const readFile = async () => {
    try {
      const filePath = RNFS.DocumentDirectoryPath + fileName; // Example file path
      const content = await RNFS.readFile(filePath, "utf8");
      let convertParse = JSON.parse(content);
      dispatch(setLocalizeFile(convertParse));
      setLoading(false)
    } catch (error) {
      console.error("Error reading file:", error);
    }
  };

  const getUserInfo = async () => {
    const userInfo = await StorageServices.getItem("userData");
    const isOnboarding = await StorageServices.getItem(ON_BOARDING);
    const locationAccess = await StorageServices.getItem(LOCATIO_ACCESS);
    let parseLocation=locationAccess != null ? JSON.parse(locationAccess) : true;

    dispatch(setLocationAccess(parseLocation));

    dispatch(setOnboaring(!!isOnboarding));
    dispatch(setUserData(userInfo));
  };
  const Stack = createNativeStackNavigator();
  useEffect(() => {
    OneSignal.setAppId("68f695a1-6b12-4fca-8526-a2b7e5bb68b6");
    OneSignal.promptForPushNotificationsWithUserResponse();
    OneSignal.setNotificationWillShowInForegroundHandler(
      (notificationReceivedEvent: any) => {
        let notification = notificationReceivedEvent.getNotification();
        notificationReceivedEvent.complete(notification);

        dispatch(setNotificationAlert(true));
      }
    );
    OneSignal.setNotificationOpenedHandler((notification) => {
      console.log("OneSignal: notification opened:", notification);
    });
  }, []);
  return (
    <NavigationContainer>
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
        // initialRouteName="Splash"
      >

        {loading && (
          <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
        )}

{!onboarding && (
              <Stack.Screen
                name="OnboardingScreens"
                component={OnboardingScreens}
              />
            )}

            <Stack.Screen name="Home" component={BottomNavigator} />
            <Stack.Screen name="MyPlans" component={MyPlans} />

            <Stack.Screen name="CompleteProfile" component={CompleteProfile} />
            <Stack.Screen name="WrongNumber" component={WrongNumber} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Otp" component={Otp} />

            <Stack.Screen name="ScanQr" component={ScanQr} />
            <Stack.Screen name="QrScreen" component={QrScreen} />
            <Stack.Screen name="VerifiedScreen" component={VerifiedScreen} />
            <Stack.Screen name="Notifications" component={Notifications} />
            <Stack.Screen name="Dummy" component={Dummy} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Payments" component={Payments} />
            <Stack.Screen name="BranchDetail" component={BranchDetail} />

            <Stack.Screen name="AddPayment" component={AddPayment} />
            <Stack.Screen name="OrderHistory" component={OrderHistory} />
            <Stack.Screen name="Privacy" component={Privacy} />
            <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
            <Stack.Screen name="Login" component={Login} />


            <Stack.Screen
              name="NotificationSettings"
              component={NotificationSettings}
            />
            <Stack.Screen name="Checkout" component={Checkout} />
            <Stack.Screen name="Rewards" component={Rewards} />
            <Stack.Screen name="OrderLocation" component={OrderLocation} />
            <Stack.Screen name="OrderSearch" component={OrderSearch} />
            <Stack.Screen name="OrderFeatured" component={OrderFeatured} />
            <Stack.Screen name="OrderDetailCard" component={OrderDetailCard} />
            <Stack.Screen name="MyAddress" component={MyAddress} />

            <Stack.Screen name="OrderFilter" component={OrderFilter} />



        {/* {!userData?.email ? (
          <>
            {!onboarding && (
              <Stack.Screen
                name="OnboardingScreens"
                component={OnboardingScreens}
              />
            )}
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="CompleteProfile" component={CompleteProfile} />
            <Stack.Screen name="WrongNumber" component={WrongNumber} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Otp" component={Otp} />
          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={BottomNavigator} />
            <Stack.Screen name="MyPlans" component={MyPlans} />

            <Stack.Screen name="ScanQr" component={ScanQr} />
            <Stack.Screen name="QrScreen" component={QrScreen} />
            <Stack.Screen name="VerifiedScreen" component={VerifiedScreen} />
            <Stack.Screen name="Notifications" component={Notifications} />
            <Stack.Screen name="Dummy" component={Dummy} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Payments" component={Payments} />
            <Stack.Screen name="BranchDetail" component={BranchDetail} />

            <Stack.Screen name="AddPayment" component={AddPayment} />
            <Stack.Screen name="OrderHistory" component={OrderHistory} />
            <Stack.Screen name="Privacy" component={Privacy} />

            <Stack.Screen
              name="NotificationSettings"
              component={NotificationSettings}
            />
            <Stack.Screen name="Checkout" component={Checkout} />
            <Stack.Screen name="Rewards" component={Rewards} />
            <Stack.Screen name="OrderLocation" component={OrderLocation} />
            <Stack.Screen name="OrderSearch" component={OrderSearch} />
            <Stack.Screen name="OrderFeatured" component={OrderFeatured} />
            <Stack.Screen name="OrderDetailCard" component={OrderDetailCard} />
            <Stack.Screen name="MyAddress" component={MyAddress} />

            <Stack.Screen name="OrderFilter" component={OrderFilter} />
          </>
        )} */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RouteNavigator;
