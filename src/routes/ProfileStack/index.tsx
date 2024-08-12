import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SearchScreen from "../../screens/main/SearchScreen";
import OthersProfile from "../../screens/main/SearchScreen/OthersProfile";
import ProfileScreen from "../../screens/main/ProfileScreen";
import ChannelScreen from "../../screens/main/ChannelScreen";

const ProfileStack = () => {
  const Stack = createStackNavigator();
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
    >
      <Stack.Screen name={"ProfileScreen"} component={ProfileScreen} />
      <Stack.Screen name={"AuthChannel"} component={ChannelScreen} />


    </Stack.Navigator>
  );
};

export default ProfileStack;

const styles = StyleSheet.create({});
