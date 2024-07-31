import React from "react";
import { ActivityIndicator, View } from "react-native";
import { colors } from "../../utils/colors";

const AbsoluteView = () => {
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        backgroundColor: "transparent",
        justifyContent: "center",
        alignItems: "center",
      }}
    />

  );
};

export default AbsoluteView;
