import React from "react";
import { ActivityIndicator, View } from "react-native";
import { colors } from "../../utils/colors";

const ScreenLoader = () => {
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        zIndex: 999999,
        position: "absolute",
        backgroundColor: 'rgba(0,0,0,.5)',
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
};

export default ScreenLoader;
