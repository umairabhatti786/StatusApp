import {
  Alert,
  Image,
  Linking,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { appStyles } from "../../../utils/AppStyles";
import { images } from "../../../assets/images";
import CustomText from "../../../components/CustomText";
import { colors } from "../../../utils/colors";
import { useNavigation } from "@react-navigation/native";
import DropDownPicker from "react-native-dropdown-picker";
import { windowWidth } from "../../../utils/Dimensions";
import ToggleSwitch from "toggle-switch-react-native";
import { Spacer } from "../../../components/Spacer";
import CustomLine from "../../../components/CustomLine";
import CustomTextInput from "../../../components/CustomTextInput";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import AbsoluteHeader from "../../../components/AbsoluteHeader";
import { scale, verticalScale } from "react-native-size-matters";
import sizeHelper from "../../../utils/helpers/sizeHelper";
import * as Animatable from "react-native-animatable";
import { useDispatch, useSelector } from "react-redux";
import { getIsSuccess, getSuccessResponse, setIsSuccess, setRemember, setUserData } from "../../../redux/reducers/authReducer";
import DropDown from "../../../components/DropDown";
import { data } from "../../../utils/Data";
import { AUTH, REMEMBER, StorageServices } from "../../../utils/hooks/StorageServices";
import NewText from "../../../components/NewText";

const Settings = ({ navigation }) => {
  // const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("Everyone");
  const [inApp, setInApp] = useState(true);
  const [email, setEmail] = useState(false);
  const isSuccess = useSelector(getIsSuccess);
  const successData = useSelector(getSuccessResponse);
  const dispatch = useDispatch();

  console.log("isVerify", isSuccess);
  const [items, setItems] = useState([
    { label: "Everyone", value: "Everyone" },
    { label: "Friends", value: "Friends" },
    { label: "No Body", value: "No Body" },
  ]);
  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        dispatch(setIsSuccess(false));
      }, 3000);
    }
  }, [isSuccess]);
  const _handleSignOut = async () => {
    StorageServices.removeItem(AUTH);
    StorageServices.removeItem(REMEMBER);


    dispatch(setRemember(false))


    dispatch(setUserData(null))

  };

  const onLogout = () => {
    Alert.alert("Logout", "Are you sure you want to proceed?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        // style: "cancel",
      },
      { text: "Logout", onPress: _handleSignOut, style: "destructive" },
    ]);

  }

  const Detail = ({ txt, onPress }: any) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.6}
        style={{
          ...appStyles.rowjustify,
          paddingVertical: verticalScale(10),
          paddingLeft: scale(15),
          paddingRight: scale(10),
        }}
      >
        <NewText
          // style={{ marginVertical: 12 }}
          size={17}
          fontFam="Inter-SemiBold"
          color={colors.white}
          fontWeight={"600"}
          text={txt}
        />
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={{ width: 15, height: 15 }}
            resizeMode="contain"
            source={images.next}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };
  return (
    <>
      <View style={appStyles.main}>
        <AbsoluteHeader>
          <TouchableOpacity
            style={{ width: "11%",height:40,justifyContent:"center", }}
            onPress={() => navigation.goBack()}>
            <Image
              style={{ width: scale(15), height: scale(15) }}
              resizeMode="contain"
              source={images.back}
            />
          </TouchableOpacity>
          <CustomText
            fontWeight="600"
            fontFam="Poppins-Medium"
            color={colors.white}
            size={18}
            text={"Account Settings"}
          />
          <CustomText color={"transparent"} size={18} text={"sss"} />
        </AbsoluteHeader>

        <ScrollView showsVerticalScrollIndicator={false}>




          <CustomLine backgroundColor={colors.primary} height={1.5} />
          <Detail
            txt={"Blocked accounts"}
            onPress={() => navigation.navigate("BlockedAccount")}
          />
          <CustomLine backgroundColor={colors.primary} height={1} />
          <Detail
            txt={"Change your password"}
            onPress={() => navigation.navigate("ChangePassword")}
          />
          <CustomLine backgroundColor={colors.primary} height={1.5} />
          <Detail
            txt={"Change your email"}
            onPress={() => navigation.navigate("ChangeEmail")}
          />
          <CustomLine backgroundColor={colors.primary} height={1.5} />
          <Detail
            txt={"Delete your account"}
            onPress={() => navigation.navigate("AccountDeletion")}
          />
          <CustomLine backgroundColor={colors.primary} height={1.5} />
          <TouchableOpacity
            style={{
              paddingVertical: verticalScale(15),
              paddingLeft: scale(15),
            }}
            onPress={onLogout}
          >
            <NewText
              // style={{ marginVertical: 12 }}
              size={17}
              fontFam="Inter-SemiBold"
              color={colors.white}
              fontWeight={"600"}
              text={"Log out"}
            />
          </TouchableOpacity>
          <View style={styles.rowConttainer}>
            <NewText
              fontWeight="600"
              fontFam="Poppins-Medium"
              color={colors.white}
              size={18}
              text={"Notifications"}
            />
          </View>


          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: scale(20),
              paddingVertical: verticalScale(15),
            }}
          >
            <NewText
              color={colors.white}
              text={"Enable Notifications?"}
              size={17}
              fontWeight="600"
              fontFam="Poppins-Medium"
            />
            <ToggleSwitch
              isOn={inApp}
              onColor={colors.sky}
              offColor={colors.grey300}
              size="small"
              onToggle={setInApp}
              thumbOnStyle={{ width: 17, height: 17, borderRadius: 9999 }}
              thumbOffStyle={{ width: 17, height: 17, borderRadius: 9999 }}
              trackOffStyle={{ width: 46, height: 25, }}
              trackOnStyle={{ width: 46, height: 25 }}
            />
          </View>

          <View style={styles.rowConttainer}>
            <NewText
              fontWeight="600"
              fontFam="Poppins-Medium"
              color={colors.white}
              size={17}
              text={"Join Our Community"}
            />
          </View>
          <View
            style={{
              paddingHorizontal: scale(20),
              paddingVertical: verticalScale(20),
            }}
          >
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                Linking.openURL("https://www.gofundme.com/f/statusapp")
              }}
            >
              <NewText
                fontWeight="500"
                color={colors.white}
                size={15}
                style={{ textAlign: "center", textDecorationLine: "underline" }}
                text={
                  "Share Your Feedback, Ideas, and Suggestions. Help Elevate Real Innovation and Design."
                }
              />

            </TouchableOpacity>

          </View>

          <View style={styles.rowConttainer}>
            <NewText
              fontWeight="600"
              fontFam="Poppins-Medium"
              color={colors.white}
              size={17}
              text={"Follow the founder"}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignSelf: "center",
              marginVertical: verticalScale(30),
            }}
          >
            <TouchableOpacity
              onPress={() => {
                Linking.openURL("https://www.instagram.com/mickeyodea/")
              }}
              activeOpacity={0.6}>
              <Image
                source={images.insta}
                style={styles.socialImg}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL("https://www.youtube.com/@mickeyodea")
              }}
              activeOpacity={0.6} style={{ marginLeft: "5%" }}>
              <Image
                style={styles.socialImg}
                source={images.youtube}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL("https://x.com/mike_odea_")
              }}
              activeOpacity={0.6} style={{ marginLeft: "5%" }}>
              <Image
                style={styles.socialImg}
                source={images.twitter}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      {isSuccess && (
        <Animatable.View
          animation={"slideInUp"}
          style={{
            width: "100%",
            height: verticalScale(65),
            backgroundColor: "#03B74E",
            flexDirection: "row",
            paddingHorizontal: scale(20),
            position: "absolute",
            paddingTop: verticalScale(7),
            bottom: verticalScale(0),
          }}
        >
          <Image
            style={{ width: scale(35), height: scale(35) }}
            source={images.verify}
            resizeMode="contain"
          />
          <View style={{ marginTop: -4 }}>
            <CustomText
              text={successData.label}
              color={colors.white}
              fontWeight={"600"}
              size={15}
              style={{ marginLeft: scale(10), marginBottom: -5 }}
              fontFam={"Poppins-SemiBold"}
            />
            <CustomText
              text={successData.text}
              color={colors.white}
              fontWeight={"600"}
              size={12}
              style={{ marginLeft: scale(10) }}
              fontFam={"Poppins-Medium"}
            />
          </View>
        </Animatable.View>
      )}
    </>
  );
};

export default Settings;

const styles = StyleSheet.create({
  rowConttainer: {
    height: verticalScale(50),
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
  },
  socialImg: { width: 32, height: 32 }
});
