import React from "react";
import { colors } from "../../utils/colors";
import { View, TouchableOpacity, Image } from "react-native";
import { images } from "../../assets/images";
import { appStyles } from "../../utils/AppStyles";
import { scale } from "react-native-size-matters";
import NewText from "../NewText";

type Props = {};

const LookingFor = ({ label, onPress, lookingFor }: any) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ ...appStyles.row, gap: scale(10), marginRight: scale(15) }}
    >
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={onPress}
        style={{
          width: 20,
          height: 20,
          borderWidth: 1.2,
          borderColor: colors.sky,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            width: 14,
            height: 14,
            backgroundColor: lookingFor.includes(label)
              ? colors.sky
              : "transparent",
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={onPress}>
        <NewText
          size={16}
          style={{ marginTop: 3 }}
          text={label}
          color={colors.white}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default LookingFor;
