import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import CustomText from "../CustomText";
import { colors } from "../../utils/colors";
import { Spacer } from "../Spacer";
import { windowWidth } from "../../utils/Dimensions";

type Props = {
  name?: string;
  image?: any;
};

const ReceiveRequestCard = ({ name, image }: Props) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Image style={{ width: 64, height: 64 }} source={image} />
      <View style={{ marginLeft: 20 }}>
        <CustomText
          size={14}
          fontWeight="800"
          color={colors.white}
          text={name}
        />
        <Spacer height={10} />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity style={styles.button}>
            <CustomText
             size={15} text={"Accept"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              { marginLeft: 15, backgroundColor: colors.black200 },
            ]}
          >
            <CustomText color={colors.white} size={15} text={"Decline"} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ReceiveRequestCard;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.white,
    alignItems: "center",
    paddingVertical: 8,
    borderRadius: 8,
    width: windowWidth / 3,
  },
});
