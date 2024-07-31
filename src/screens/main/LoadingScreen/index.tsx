import React from "react";
import { ActivityIndicator, View } from "react-native";
import { colors } from "../../../utils/colors";

const LoadingScreen = () => {
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor:colors.white,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
};

export default LoadingScreen;
