import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useInternetConnectivity } from "../../../utils/hooks/useInternetConnectivity";
import CustomText from "../../../components/CustomText";
import LottieView from "lottie-react-native";
import { colors } from "../../../utils/colors";
import { font } from "../../../utils/font";
import CustomButton from "../../../components/CustomButton";
import { Spacer } from "../../../components/Spacer";
import { useSelector } from "react-redux";
import { getLocalizeFile } from "../../../redux/reducers/localizeReducer";

const NoInternet = ({ navigation }: any) => {
  const { isVisible, counter } = useInternetConnectivity();

const localize:any=useSelector(getLocalizeFile)

  return (
    <Modal visible={isVisible}>
      <View style={{ flex: 1, alignItems: "center", paddingTop: "50%" }}>
        <LottieView
          style={{ width: 200, height:200}}
          source={require("../../../assets/jsons/plug.json")}
          renderMode="HARDWARE"
          autoPlay
          loop
        />

        <View
          style={{ paddingHorizontal: 60, paddingTop: 30, paddingBottom: 20 }}
        >
          <CustomText
            text={localize?.no_internet_title}
            size={20}
            style={{ textAlign: "center" }}
            fontWeight="700"
            lineHeight={25}
            fontFam={font.montserratBold}
            color={colors.primary}
          />
        </View>
        <CustomText
          text={
            localize?.no_internet_description
          }
          size={13}
          style={{ textAlign: "center", paddingHorizontal: 40 }}
          fontWeight="500"
          lineHeight={22}
          fontFam={font.montserratBold}
          color={colors.black}
        />
        <Spacer height={20} />

        <CustomButton
          text={localize?.no_internet_retry_button}
          height={35}
          size={16}
          fontWeight="600"
          borderRadius={10}
          width="23%"
          // onPress={onPress}
        />

      </View>
    </Modal>
  );
};

export default NoInternet;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    lineHeight: 48,
    marginTop: 24,
  },
  bottomText: {
    lineHeight: 24,
    marginTop: 16,
    textAlign: "center",
  },
});
