import { GestureHandlerRootView } from "react-native-gesture-handler";
import 'react-native-reanimated'
// import { LogLevel, OneSignal } from 'react-native-onesignal';

// enableLatestRenderer();
import { View, Text, LogBox, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Provider } from "react-redux";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

import store from "./src/redux/store";
import RootNavigator from "./src/routes";

LogBox.ignoreLogs(["VirtualizedLists", "Warning:..."]);
LogBox.ignoreAllLogs();
const App = () => {
  // Remove this method to stop OneSignal Debugging
  // OneSignal.Debug.setLogLevel(LogLevel.Verbose);

  // // OneSignal Initialization
  // OneSignal.initialize("32945f51-424b-4932-a5cc-f5dc0b54937c");

  // // requestPermission will show the native iOS or Android notification permission prompt.
  // // We recommend removing the following code and instead using an In-App Message to prompt for notification permission
  // OneSignal.Notifications.requestPermission(true);

  // // Method for listening for notification clicks
  // OneSignal.Notifications.addEventListener('click', (event) => {
  //   console.log('OneSignal: notification clicked:', event);
  // });

  // await pusher.trigger({channelName: "my-channel", eventName: "client-my-event", data: {"myName": "Bob"}});
 
  
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <BottomSheetModalProvider>
          <RootNavigator />
        </BottomSheetModalProvider>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
