import React from "react";
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import LogoContainer from "../LogoContainer";
import CustomText from "../CustomText";
import { font } from "../../utils/font";
import { colors } from "../../utils/colors";
import SocialButton from "../SocialButton";
import { images } from "../../assets";
import GoogleButton from "../GoogleButton";
import FacebookButton from "../FacebookButton";
import AppleAuthButton from "../AppleAuthButton";
import { Spacer } from "../Spacer";
import { isiPad } from "../../utils/CommonFun";

type Props = {
  onPress?: any;
  primaryText?: string;
  secondaryText?: string;
  disable?:boolean,
  or?:string,
  loginWithGoogle?:string,
  loginWidthApple?:string

  handleSsoAuth: (data: any, withAuth: any) => void;
};

const SsoAuth = ({
  onPress,
  primaryText,
  secondaryText,
  handleSsoAuth,
  disable,
  or,
  loginWithGoogle,
  loginWidthApple,
}: Props) => {

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginVertical: 20,
          
        }}
      >
        <View style={style.line} />
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginRight: 4,
          }}
        >
          <CustomText
            text={or}
            fontWeight={"500"}
            size={isiPad?15:12}
            style={style.header}
          />
        </View>
        <View style={style.line} />
      </View>
      <View
        style={{
          alignItems: "center",
          paddingVertical: 30,
        }}
      >
        <GoogleButton
        disable={disable}
        loginWithGoogle={loginWithGoogle}
          bgColor={colors.white}
          respanseData={(data: any) => {
            if (data) {
              handleSsoAuth(data, "google");
            }
          }}
        />
        {Platform.OS == "ios" && (
          <>
            <Spacer height={30} />
            <AppleAuthButton
            loginWithApple={loginWidthApple}
            disable={disable}
              bgColor={colors.white}
              respanseData={(data: any) => {
                if (data) {
                  handleSsoAuth(data, "apple");
                }
              }}
            />
          </>
        )}

        {/* <SocialButton
                    source={images.apple}
                    bgColor={colors.white}
                    onPress={() => {
                        console.log("APPLE")
                    }}
                /> */}
      </View>
      {/* <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          flex: 1,
          alignItems: "center",
        }}
      >
        <CustomText text={primaryText} />
        <TouchableOpacity 
        activeOpacity={0.6}
        onPress={onPress}>
          <CustomText
            text={secondaryText}
            fontFam={font.montserratExtraBold}
            color={colors.primary}
            size={14}
            style={{ textDecorationLine: "underline" }}
          />
        </TouchableOpacity>
      </View> */}
    </View>
  );
};
export default SsoAuth;
const style = StyleSheet.create({
  header: {
    marginLeft: 5,
  },
  line: {
    height: 2,
    backgroundColor: colors.primary,
    opacity: 0.19,
    borderRadius: 20,
    flex: 1,
  },
});
