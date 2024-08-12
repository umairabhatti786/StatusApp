import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { appStyles } from "../../../utils/AppStyles";
import { images } from "../../../assets/images";
import { useNavigation } from "@react-navigation/native";
import CustomText from "../../../components/CustomText";
import { colors } from "../../../utils/colors";
import SentRequestCard from "../../../components/SentRequestCard";
import { Spacer } from "../../../components/Spacer";

const SentRequest = () => {
  const navigation = useNavigation();
  return (
    <View style={appStyles.main}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={images.back} />
        </TouchableOpacity>
        <CustomText
          fontWeight="700"
          color={colors.white}
          size={18}
          text={"Sent Requests"}
        />
        <CustomText color={"transparent"} size={18} text={"sss"} />
      </View>
      <View style={{ padding: 12 }}>
        <Spacer height={10} />
        <SentRequestCard
          name={"Joe Rogan"}
          image={images.man2}
          time={"20 min ago"}
        />
      </View>
    </View>
  );
};

export default SentRequest;

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.black300,
    alignItems: "center",
    paddingTop: Platform.OS=="ios"?"18%":"5%",
    paddingBottom: "5%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
});
