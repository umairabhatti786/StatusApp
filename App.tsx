import React, { useEffect } from "react";
import {
  Alert,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  LogBox
} from "react-native";
import RouteNavigator from "./src/routes/RouteNavigator";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useInternetConnectivity } from "./src/utils/hooks/useInternetConnectivity";
import NoInternet from "./src/screens/main/NoInternet";
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
export const App = () => {
  const { isVisible, counter } = useInternetConnectivity();
  LogBox.ignoreAllLogs();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <BottomSheetModalProvider>
          {isVisible === false && counter !== null && counter > 0 ? (
            <></>
          ) : (
            <NoInternet isVisible={isVisible} />
          )}

          <RouteNavigator />

          {/* <BottomSheetModalProvider
          snapPoints={["100%"]}
          handleStyle={{
            display: "none"
          }}
        > */}
        </BottomSheetModalProvider>
        {/* </BottomSheetModalProvider> */}
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
