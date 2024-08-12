import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
// import Tabs from "../BottomTabs/Tabs";
import SplashScreen from "react-native-splash-screen";

import HomeScreen from "../../screens/main/HomeScreen";
import MessageScreen from "../../screens/main/MessageScreen";
import ProfileScreen from "../../screens/main/ProfileScreen";
import SearchScreen from "../../screens/main/SearchScreen";
import BottomTab from "../BottomTabs";
import Chat from "../../screens/main/MessageScreen/Chat";
import Settings from "../../screens/main/SettingsScreen";
import JoinScreen from "../../screens/auth/JoinScreen";
import Login from "../../screens/auth/Login";
import Signup from "../../screens/auth/Signup";
import ProfileSetup from "../../screens/auth/ProfileSetup";
import LostPassword from "../../screens/auth/LostPassword";
import ResetPassword from "../../screens/auth/ResetPassword";
import Notifications from "../../screens/main/NotificationScreen";
import SentRequest from "../../screens/main/NotificationScreen/SentRequest";
import Post from "../../screens/main/PostScreen";
import OthersProfile from "../../screens/main/SearchScreen/OthersProfile";
import EditProfile from "../../screens/main/ProfileScreen/EditProfile";
import AddStatus from "../../screens/main/AddStatus";
import EditGifs from "../../screens/main/EditGifs";
import ConfirmationCode from "../../screens/auth/ConfirmationCode";
import BlockedAccount from "../../screens/main/BlockedAccount";
import ChangeEmail from "../../screens/main/ChangeEmail";
import ChangePassword from "../../screens/main/ChangePassword";
import AccountDeletion from "../../screens/main/AccountDeletion";
import SearchMember from "../../screens/main/SearchMember";
import NewMessage from "../../screens/main/NewMessage";
import ResetPasswordConfirmation from "../../screens/auth/ResetPasswordConfirmation";
import { useDispatch, useSelector } from "react-redux";
import {
  getRemember,
  getUserData,
  setCommentsNotificationAlert,
  setNotificationAlert,
  setRemember,
  setToken,
  setUserData,
} from "../../redux/reducers/authReducer";
import {
  AUTH,
  REMEMBER,
  StorageServices,
  TOKEN,
} from "../../utils/hooks/StorageServices";
import OneSignal from "react-native-onesignal";
import ChannelScreen from "../../screens/main/ChannelScreen";
import OtherUserChannel from "../../screens/main/OtherUserChannel";
import { Pusher, PusherEvent } from "@pusher/pusher-websocket-react-native";
import { Alert } from "react-native";
import FirstSignup from "../../screens/auth/FirstSignup";

const AppStack = () => {
  const Stack = createStackNavigator();
  const [splashState, setSplashState] = useState(true);
  const user = useSelector(getUserData);

  // const remember=useSelector(getRemember)

  const dispatch = useDispatch();

  useEffect(() => {
    getUserInfo();
  }, []);

  // console.log("userremeber",   remember);

  const getUserInfo = async () => {
    const userInfo = await StorageServices.getItem(AUTH);
    const token = await StorageServices.getItem(TOKEN);
    // const remeber = await StorageServices.getItem(REMEMBER);

    dispatch(setUserData(userInfo));
    dispatch(setToken(token));
  };

  useEffect(() => {
    OneSignal.setAppId("32945f51-424b-4932-a5cc-f5dc0b54937c");
    OneSignal.promptForPushNotificationsWithUserResponse();
    OneSignal.setNotificationWillShowInForegroundHandler(
      (notificationReceivedEvent: any) => {
        let notification = notificationReceivedEvent.getNotification();
        notificationReceivedEvent.complete(notification);
        console.log("Notighvb",notificationReceivedEvent?.notification?.title)
        if(notificationReceivedEvent?.notification?.title.includes("Wrote on your wall"))

        {
          dispatch(setCommentsNotificationAlert(true));

        }
        else {
          dispatch(setNotificationAlert(true));

        }

        // message.includes("Wrote on your wall")
      }
    );
    OneSignal.setNotificationOpenedHandler((notification) => {
      console.log("OneSignal: notification opened:", notification);
      // showMessage({
      //   message: "Notification",
      //   description: notification?.body,
      //   type: "info",
      //   backgroundColor: "#000",
      //   duration: 5000,
      //   floating: true,
      //   icon: (props) => <FastImage source={images.appIcon} {...props} />,
      // });
    });
  }, []);



  return (
    <Stack.Navigator
      //  screenOptions={{ headerShown: false }
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
    >
      {!user?.email ? (
        <>
          <Stack.Screen name={"Join"} component={JoinScreen} />
          <Stack.Screen name={"FirstSignup"} component={FirstSignup} />
          <Stack.Screen name={"Signup"} component={Signup} />
          <Stack.Screen name={"Login"} component={Login} />

          <Stack.Screen name={"ProfileSetup"} component={ProfileSetup} />
          <Stack.Screen name={"LostPassword"} component={LostPassword} />
          <Stack.Screen name={"ResetPassword"} component={ResetPassword} />


          <Stack.Screen
            name={"ConfirmationCode"}
            component={ConfirmationCode}
          />
          <Stack.Screen
            name={"ResetPasswordConfirmation"}
            component={ResetPasswordConfirmation}
          />
        </>
      ) : (
        <>
          <Stack.Screen name={"Tabs"} component={BottomTab} />
          <Stack.Screen name={"HomeScreen"} component={HomeScreen} />
          {/* <Stack.Screen name={"NewMessage"} component={NewMessage} /> */}

          {/* <Stack.Screen name={"MessageScreen"} component={MessageScreen} /> */}
          <Stack.Screen name={"ProfileScreen"} component={ProfileScreen} />
          <Stack.Screen name={"SearchScreen"} component={SearchScreen} />
          <Stack.Screen name={"OthersProfile"} component={OthersProfile} />
          <Stack.Screen name={"ChannelScreen"} component={ChannelScreen} />
          <Stack.Screen name={"OtherUserChannel"} component={OtherUserChannel} />


          <Stack.Screen name={"AddStatus"} component={AddStatus} />
          <Stack.Screen name={"ChatScreen"} component={Chat} />
          <Stack.Screen name={"Settings"} component={Settings} />
          <Stack.Screen name={"Notifications"} component={Notifications} />
          <Stack.Screen name={"EditGifs"} component={EditGifs} />
          <Stack.Screen name={"Sent Request"} component={SentRequest} />
          <Stack.Screen name={"Post"} component={Post} />
          <Stack.Screen name={"EditProfile"} component={EditProfile} />
          <Stack.Screen name={"BlockedAccount"} component={BlockedAccount} />
          <Stack.Screen name={"ChangeEmail"} component={ChangeEmail} />
          <Stack.Screen name={"ChangePassword"} component={ChangePassword} />
          <Stack.Screen name={"AccountDeletion"} component={AccountDeletion} />
          <Stack.Screen name={"SearchMember"} component={SearchMember} />
          <Stack.Screen name={"NewMessage"} component={NewMessage} />
          <Stack.Screen name={"LostPassword"} component={LostPassword} />
          <Stack.Screen name={"ResetPassword"} component={ResetPassword} />
          <Stack.Screen
            name={"ResetPasswordConfirmation"}
            component={ResetPasswordConfirmation}
          />
        </>
      )}
    </Stack.Navigator>
  );
};
export default AppStack;
