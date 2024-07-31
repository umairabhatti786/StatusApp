import React from "react";
import { ActivityIndicator, View } from "react-native";
import { colors } from "../../utils/colors";

const SimpleLoader = () => {
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        zIndex: 999999,
        position: "absolute",
        backgroundColor: 'transparent',
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
};

export default SimpleLoader;
