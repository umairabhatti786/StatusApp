import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import CustomText from "../CustomText";
import { colors } from "../../utils/colors";
import { windowWidth } from "../../utils/Dimensions";
import { Spacer } from "../Spacer";

type Props = {
  name?: string;
  image?: any;
  time?: string;
};

const SentRequestCard = ({ image, name, time }: any) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Image style={{ width: 64, height: 64 }} source={image} />
      <View style={{ marginLeft: 20 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <CustomText
            color={colors.white}
            fontWeight="800"
            size={14}
            text={name}
          />
          <CustomText color={colors.white} size={14} text={time} />
        </View>
        <Spacer height={15} />
        <TouchableOpacity
          activeOpacity={0.5}
          style={{
            backgroundColor: "#CCCCCC",
            alignItems: "center",
            paddingVertical: 10,
            borderRadius: 8,
            width: windowWidth / 1.5,
          }}
        >
          <CustomText 
          size={14}
          text={"Cancel Request"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SentRequestCard;

const styles = StyleSheet.create({});
