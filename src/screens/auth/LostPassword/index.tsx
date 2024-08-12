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
import { scale, verticalScale } from "react-native-size-matters";
import { windowHeight, windowWidth } from "../../../utils/Dimensions";
import { emailRegex } from "../../../utils/Regex";
import CustomToast from "../../../components/CustomToast";
import Loader from "../../../components/Loader";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ForgotPasswordRequest } from "../../../api/ApiServices";

const LostPassword = () => {
  const navigation: any = useNavigation();
  const [showError, setShowError] = useState(false);
  const [toastColor, setToastColor] = useState(colors.red);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const onResend = () => {
    if (!values?.email) {
      setError("Email is required");
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 4000);

      return;
    }
    let isValidEmail = emailRegex?.test(values.email);
    if (!isValidEmail) {
      setError("Invalid email address");
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 4000);

      return;
    }
    setLoading(true);

    const data = {
      email: values.email,
    };
    ForgotPasswordRequest(data, async ({ isSuccess, response }: any) => {
      if (isSuccess) {
        let result = JSON.parse(response);
        console.log("ckdnckdnc", result);

        if (result.status) {
          setLoading(false);
          setError(result.msg);
          setToastColor(colors.green);
          setShowError(true);
          setTimeout(() => {
            setShowError(false);
            setToastColor(colors.red);

            navigation.navigate("ResetPasswordConfirmation", {
              data: { email: values.email },
            });
          }, 2000);
        } else {
          if (result.error) {
            setLoading(false);

            setError(result?.error);
            setToastColor(colors.red);

            setShowError(true);
            setTimeout(() => {
              setShowError(false);
              setToastColor(colors.red);
            }, 4000);
          } else {
            setLoading(false);
            setError(result?.msg);
            setToastColor(colors.red);

            setShowError(true);
            setTimeout(() => {
              setShowError(false);
              setToastColor(colors.red);
            }, 4000);
          }
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
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, backgroundColor: "transparent" }}
        // extraScrollHeight={-100}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flex: 1, padding: scale(20) }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={images.back} />
            </TouchableOpacity>
            <Spacer height={verticalScale(10)} />
            <Image
              style={{
                width: windowWidth / 3.5,
                height: windowHeight / 5.7,
                alignSelf: "center",
              }}
              source={images.logo}
              resizeMode="contain"
            />
            <Spacer height={verticalScale(20)} />
            <CustomText
              text={"Lost your password?"}
              color={colors.white}
              size={21}
              style={{ textAlign: "center" }}
              fontFam="Poppins-Medium"
              fontWeight="500"
            />
            <Spacer height={verticalScale(15)} />
            <View style={{ marginHorizontal: 30 }}>
              <CustomText
                text={
                  "Enter your registered email below to receive password reset instructions"
                }
                color={colors.white}
                lineHeight={25}
                size={14}
                style={{ textAlign: "center" }}
                fontFam="Poppins-Regular"
                fontWeight="500"
              />
            </View>
            <Spacer height={20} />

            <CustomTextInput
              label="Email Address"
              placeholder="Enter your login email address"
              value={values.email}
              onChangeText={(txt: string) => {
                setValues({ ...values, email: txt });
              }}
            />

            <Spacer height={verticalScale(25)} />

            <CustomButton
              text="Send"
              width={"100%"}
              fontWeight={"500"}
              onPress={onResend}
              // size={18}
              textColor={colors.black}
              bgColor={colors.white}
            />
            <Spacer height={verticalScale(20)} />

            <View style={{ ...appStyles.row, justifyContent: "center" }}>
              <CustomText
                text={"Remember Password? "}
                color={colors.white}
                size={14}
                style={{ textAlign: "center", marginRight: 2 }}
                fontFam="Roboto-Medium"
                fontWeight="500"
              />

              <TouchableOpacity
                onPress={() => navigation.navigate("Login")}
                activeOpacity={0.6}
              >
                <CustomText
                  text={"Login"}
                  color={colors.white}
                  size={14}
                  textDecorationLine={"underline"}
                  style={{ textAlign: "center" }}
                  fontFam="Roboto-Medium"
                  fontWeight="500"
                />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </KeyboardAwareScrollView>

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

export default LostPassword;
