import React, { useEffect, useState } from "react";
import {
  Alert,
  LogBox,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  ImageBackground,
} from "react-native";
import { appStyles } from "../../../utils/AppStyles";

import { useNavigation } from "@react-navigation/native";
import { images } from "../../../assets/images";
import { Spacer } from "../../../components/Spacer";
import CustomButton from "../../../components/CustomButton";
import { colors } from "../../../utils/colors";
import CustomText from "../../../components/CustomText";
import CustomTextInput from "../../../components/CustomTextInput";
import CheckBox from "../../../components/CheckBox";
import { scale, verticalScale } from "react-native-size-matters";
import { windowHeight, windowWidth } from "../../../utils/Dimensions";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CustomToast from "../../../components/CustomToast";
import {
  ForgotPasswordRequest,
  ResendOtp,
  VerifyOtp,
  VerifyResetOtp,
} from "../../../api/ApiServices";
import Loader from "../../../components/Loader";
import { numericRegex } from "../../../utils/Regex";
import Button from "../../../components/Button";
import NewText from "../../../components/NewText";

interface props {
  route: any;
}
const ResetPasswordConfirmation = ({ route }: props) => {
  const navigation: any = useNavigation();
  const [isRemember, setIsRemember] = useState(true);
  const [showPassword, setShowPAssword] = useState(true);
  const [code, setCode] = useState("");
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const data = route?.params?.data;
  const [toastColor, setToastColor] = useState(colors.red);


  const OnConfirmCode = () => {
    // console.log("params",data)
    if (!code) {
      setError("confirmation code is required");
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 4000);

      return;
    }
    if (code.length < 6) {
      setError("confirmation code At least 6-digits");
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 4000);
      return;
    }
    const data = {
      passwordResetToken: code,
    };
    setLoading(true);

    VerifyResetOtp(data, async ({ isSuccess, response }: any) => {
      if (isSuccess) {
        let result = JSON.parse(response);
        console.log("resultOtp", result);
        if (result.status) {
          setLoading(false);
          if (result?.errors) {
            setToastColor(colors.red);

            setError(result?.message);
            setShowError(true);
            setTimeout(() => {
              setShowError(false);
            }, 4000);
          } else {
            setToastColor(colors.green);
            setError(result?.msg);
            setShowError(true);
            setTimeout(() => {
              setShowError(false);
              navigation.navigate("ResetPassword", { data: result });
            }, 2000);
          }
        } else {
          setToastColor(colors.red);

          setLoading(false);
          setError(result?.msg);
          setShowError(true);
          setTimeout(() => {
            setShowError(false);
          }, 4000);
        }
      } else {
        setLoading(false);

        Alert.alert("Alert!", "Network Error.");
      }
    });
  };

  const onResendOtp = () => {
    const paramater = {
      email: data?.email,
    };
    setLoading(true);
    ForgotPasswordRequest(paramater, async ({ isSuccess, response }: any) => {
      if (isSuccess) {
        let result = JSON.parse(response);
        console.log("resultOtp", result);
        if (result.status) {
          setLoading(false);
          setToastColor(colors.green);
          setError(result.msg);
          setShowError(true);
          setTimeout(() => {
            setShowError(false);
            // navigation.navigate("ProfileSetup",)
          }, 2000);
        } else {
          setLoading(false);
          setToastColor(colors.red);

          setError(result?.msg);
          setShowError(true);
          setTimeout(() => {
            setShowError(false);
          }, 4000);
        }
      } else {
        setLoading(false);

        Alert.alert("Alert!", "Network Error.");
      }
    });
  };

  return (
    <>
      {loading && <Loader />}
      <Image
        source={images.lightBackground}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: windowWidth,
          height: windowHeight,
        }}
      />
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
        >
          <View style={{ flex: 1, padding: scale(20) }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={images.back} />
            </TouchableOpacity>
            <Spacer height={verticalScale(20)} />

            <NewText
              text={"Check Your Email"}
              color={colors.white}
              size={24}
              fontFam="Poppins-Medium"
              fontWeight="600"
            />
            <Spacer height={verticalScale(10)} />
            <View>
              <NewText
                text={
                  "To confirm your account, enter the 6-digit code we sent to your email."
                }
                color={colors.white}
                size={16}
                fontFam="Poppins-Medium"
                fontWeight="500"
              />
            </View>

            <Spacer height={verticalScale(20)} />

            <View
              style={{
                width: "100%",
                height: verticalScale(52),
                backgroundColor: colors.primary,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",

                paddingHorizontal: scale(15),
                paddingVertical: verticalScale(5),
                borderRadius: scale(8),
                borderWidth: 1,
                borderColor: colors.white,
              }}
            >
              <View>
                <TextInput
                  maxLength={6}
                  keyboardType="number-pad"
                  placeholder="ENTER CODE HERE"
                  value={code}
                  placeholderTextColor={colors.grey400}
                  onChangeText={(txt) => {
                    let isValidNumber = numericRegex?.test(txt);
                    if (isValidNumber) {
                      setCode(txt);
                    } else {
                      setCode("");
                    }
                  }}
                  style={{
                    fontSize: 16,
                    width: windowWidth / 1.4,
                    alignItems: "center",
                    fontFamily: "Poppins-Regular",
                    color: colors.grey400,
                    textAlignVertical: "center",
                    paddingTop: 0,
                    paddingBottom: 0,
                    marginTop: verticalScale(5),
                    // backgroundColor:"red"
                  }}
                />
              </View>

              <TouchableOpacity
                activeOpacity={0.6}
                style={{
                  height: "100%",
                  alignItems: "flex-end",
                  justifyContent: "center",
                  width: scale(30),
                  paddingRight: scale(5),
                }}
                onPress={() => setCode("")}
              >
                <Image
                  source={images.cross3x}
                  style={{
                    tintColor: colors.white,
                    width: scale(15),
                    height: scale(15),
                  }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            <Spacer height={verticalScale(17)} />

            <Button
              text="Next"
              onPress={OnConfirmCode}
              // onPress={() => navigation.navigate("ProfileSetup")}
              width={"100%"}
              fontWeight={"500"}
              // size={18}
              textColor={colors.black}
              bgColor={colors.white}
            />
            <Spacer height={verticalScale(17)} />

            <Button
              text="I didn’t get the code"
              width={"100%"}
              onPress={onResendOtp}
              // fontWeight={"500"}
              fontFam={"Poppins-Regular"}
              size={16}
              borderColor={colors.white}
              borderWidth={1}
              // borderRadius={7}
              textColor={colors.white}
              bgColor={"transparent"}
            />
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>

      {showError && (
        <CustomToast
          showError={showError}
          setShowError={setShowError}
          bgColor={toastColor}
          text={error}
        />
      )}
    </>
  );
};

export default ResetPasswordConfirmation;
