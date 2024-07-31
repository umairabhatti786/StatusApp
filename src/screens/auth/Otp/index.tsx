import React, { useEffect, useRef, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Keyboard,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import BackgroundTimer from "react-native-background-timer";
import CustomText from "../../../components/CustomText";
import { colors } from "../../../utils/colors";
import { font } from "../../../utils/font";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { images } from "../../../assets";
import { ApiServices } from "../../../api/ApiServices";
import { NotificationServices } from "../../../utils/hooks/NotificationServices";
import ScreenLoader from "../../../components/ScreenLoader";
import { StorageServices } from "../../../utils/hooks/StorageServices";
import { useDispatch, useSelector } from "react-redux";
import {
  getSignupValue,
  setOpt,
  setUserData,
} from "../../../redux/reducers/authReducer";
import CustomToast from "../../../components/CustomToast";
import { getLocalizeFile } from "../../../redux/reducers/localizeReducer";
import { isiPad, sessionCheck } from "../../../utils/CommonFun";
import { CommonActions } from "@react-navigation/native";

const Otp = ({ navigation, route }: any) => {
  const [value, setValue] = useState("");
  const [resendingTime, setResendingTime] = useState(60);
  const [isWrongOtp, setIsWrongOtp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isMessage, setIsMessage] = useState(false);
  const dispatch = useDispatch();
  const signupData = useSelector(getSignupValue);
  const localize: any = useSelector(getLocalizeFile);

  const scrollViewRef = useRef<any>(null);
  const ref = useBlurOnFulfill({ value, cellCount: 4 });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const paramData = route?.params?.data;

  // const isRemember=route?.params?.remember
  useEffect(() => {
    const intervalId = BackgroundTimer.setInterval(() => {
      setResendingTime((prev) => prev - 1);
    }, 1000);

    // Clear the timeout and set resendingTime to 0 when it reaches zero
    if (resendingTime === 0) {
      BackgroundTimer.clearInterval(intervalId);
      setResendingTime(0);
    }

    // Clear the timeout when the component unmounts
    return () => BackgroundTimer.clearInterval(intervalId);
  }, [resendingTime]);

  useEffect(() => {
    if (Keyboard.isVisible()) {
      scrollViewRef &&
        scrollViewRef?.current.scrollTo({ x: 0, y: 100, animated: true });
    }
  }, [Keyboard.isVisible(), scrollViewRef]);
  const onHandleOTP = async (value: any) => {
    const deviceState = await NotificationServices.getDeviceStatus();

    const formData = new FormData();
    setIsLoading(true);
    formData.append("opt_code", value);
    formData.append("user_id", paramData?.id);
    formData.append("device_id", deviceState?.userId);
    ApiServices.authenticateOtp(
      formData,
      async ({ isSuccess, response }: any) => {
        if (isSuccess) {
          let result = JSON.parse(response);
          if (result?.success) {
            setIsLoading(false);

            if (
              !result?.data?.phone ||
              !result?.data?.email ||
              !result.data.phone
            ) {
              navigation.replace("CompleteProfile", {
                data: result?.data,
                authWith: "phone",
              });
            } else if (result?.data?.token) {
              if (signupData?.isRemember) {
                StorageServices.setItem("userData", result?.data);
              }
              setIsLoading(false);
              setMessage(result?.message);
              setIsMessage(true);
              setTimeout(() => {
                setIsMessage(false);
                dispatch(setUserData(result?.data));
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{name: 'Home'}],
                  }),
                );
                // navigation.navigate("Home");
              }, 500);
            } else {
              navigation.replace("Login");
            }
          } else {
            setIsLoading(false);
            

            if (result?.app_update_status == 1 || result?.session_expire) {
              sessionCheck(
                result?.app_update_status,
                result?.session_expire,
                dispatch
              );
              return;
            }

            if (result.message == "Please input a valid OTP code.") {
              setIsWrongOtp(true);
              setValue("");

              return;
            }

            setMessage(result?.message);
            setValue("");

            setIsMessage(true);
            setTimeout(() => {
              if (result?.data?.status == "1") {
                navigation.replace("Login");
                setIsWrongOtp(false);
                setValue("");
              }
            }, 500);
          }
        } else {
          setIsLoading(false);

          Alert.alert("Alert!", "Something went wrong");
        }
      }
    );
  };

  const resendOtp = async () => {
    console.log("paramData",paramData)
    const formData = new FormData();
    formData.append('user_id', paramData?.id);

    ApiServices.resendOtp(formData, async ({ isSuccess, response }: any) => {
      if (isSuccess) {
        let result = JSON.parse(response);
        if (result?.success) {
          dispatch(setOpt(result?.data?.otp_code));
          setMessage(result.message);
          setIsMessage(true);
          setResendingTime(60);
        } else {
          if (result?.app_update_status == 1 || result?.session_expire) {
            sessionCheck(
              result?.app_update_status,
              result?.session_expire,
              dispatch
            );
            return;
          }

          if (result?.status == 1) {
            setIsMessage(result?.message);
            setIsMessage(true);
            setTimeout(() => {
              setMessage("");
              setIsMessage(false);
              navigation.goBack();
            }, 500);
          }
        }
      } else {
        setIsLoading(false);

        Alert.alert(`${localize?.something_went_wrong_generic_toast_title}`, `${localize?.something_went_wrong_generic_toast_description}`);
      }
    });
  };

  return (
    <>
      <ScrollView ref={scrollViewRef} style={{ backgroundColor: colors.white }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backContainer}
        >
          <Image
            source={images.backArrow}
            resizeMode="contain"
            style={{ width: 35, height: 35 }}
          />
        </TouchableOpacity>

        <View style={styles.container}>
          <CustomText
            text={localize?.otp_verification_title}
            size={isiPad ? 40 : 32}
            // fontFam={font.montserratBold}
            color={colors.primary}
            style={{ marginLeft: -5 }}
          />
          <View
            style={{
              ...styles.messageContainer,
              marginBottom: isWrongOtp ? "22%" : "30%",
            }}
          >
            {isWrongOtp ? (
              <View>
                <CustomText
                  text={localize?.otp_incorrect_entered_title}
                  fontFam={font.montserratMedium}
                  fontWeight="500"
                  size={isiPad ? 18 : 14}
                  color={colors.warning}
                  style={styles.errorText}
                />
                <CustomText
                  text={localize?.otp_incorrect_entered_description}
                />
                <View style={styles.phoneNumberContainer}>
                  <CustomText text={localize?.otp_code_send_to_title} />
                  <CustomText
                    text={" " + `${signupData.phoneNumber}`}
                    size={isiPad ? 18 : 14}
                    fontWeight={"500"}
                  />
                </View>
                <CustomText
                  text={` OTP : ${signupData.otpCode}`}
                  size={isiPad ? 18 : 14}
                  color={colors.black}
                  style={{ marginBottom: -15, marginLeft: -5 }}
                />
              </View>
            ) : (
              <View>
                <CustomText
                  size={isiPad ? 15 : 12}
                  text={localize?.otp_verification_description}
                />
                <CustomText
                  text={signupData.phoneNumber}
                  fontWeight={"600"}
                  fontFam="Montserrat-Medium"
                  style={{ marginVertical: 5 }}
                  size={isiPad ? 18 : 14}
                />

                <CustomText
                  text={` OTP : ${signupData.otpCode}`}
                  fontWeight={"500"}
                  size={isiPad ? 18 : 14}
                  color={colors.black}
                  style={{ marginBottom: -15, marginLeft: -5 }}
                />
              </View>
            )}

            {Number(paramData.status) == 2 && (
              <TouchableOpacity
                activeOpacity={0.6}
                style={{ marginTop: 10 }}
                onPress={() => {
                  setIsWrongOtp(false);
                  // setResendingTime(60);
                  setValue("");
                  navigation.navigate("WrongNumber", {
                    userId: paramData?.id,
                  });
                }}
              >
                <CustomText
                  text={localize?.otp_wrong_number_title}
                  fontFam={font.montserratMedium}
                  fontWeight="400"
                  size={isiPad ? 15 : 12}
                  style={styles.linkText}
                  color={colors.linkColor}
                />
              </TouchableOpacity>
            )}
          </View>
          <View style={{ height: 40 }} />

          <CodeField
            ref={ref}
            {...props}
            caretHidden={true}
            value={value}
            onChangeText={(value) => {
              setValue(value);
              if (value.length == 4) {
                onHandleOTP(value);
              }
            }}
            cellCount={4}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
              <View
                onLayout={getCellOnLayoutHandler(index)}
                key={index}
                style={{
                  ...styles.codeFieldCell,
                  borderColor: isWrongOtp ? "#C1141437" : "#092F7435",
                }}
              >
                <CustomText
                  size={isiPad ? 30 : 25}
                  fontFam="Montserrat-Medium"
                  fontWeight={"500"}
                  color={colors.primary}
                  text={symbol || (isFocused ? <Cursor /> : "_")}
                />
              </View>
            )}
          />
        </View>

        <View style={styles.resendContainer}>
          {resendingTime < 1 ? (
            <TouchableOpacity onPress={() => resendOtp()}>
              <CustomText
                text={localize?.otp_resend_code_title}
                style={styles.resendText}
                color={colors.primary}
                size={isiPad ? 18 : 12}
                fontFam="Montserrat-Medium"
                fontWeight={"500"}
              />
            </TouchableOpacity>
          ) : (
            <View style={styles.resendTextContainer}>
              <CustomText
                text={localize?.otp_resending_title}
                color={colors.primary}
                size={isiPad ? 15 : 12}
              />
              <CustomText
                text={` ${resendingTime} ${localize?.otp_resending_seconds} ` }
                color={colors.primary}
                size={isiPad ? 15 : 12}
                fontFam={font.montserratExtraBold}
              />
            </View>
          )}
        </View>
      </ScrollView>

      <CustomToast
        isVisable={isMessage}
        setIsVisable={setIsMessage}
        message={message}
        color={colors.white}
      />

      {isLoading && <ScreenLoader />}
    </>
  );
};

export default Otp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 40,
    rowGap: 10,
    marginTop: Platform.OS == "ios" ? 40 : 20,
    backgroundColor: colors.white,
  },
  messageContainer: {
    marginTop: 5,
  },
  errorText: {
    marginBottom: 15,
  },
  phoneNumberContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  linkText: {
    marginTop: 15,
    textDecorationLine: "underline",
  },
  codeFieldRoot: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 80,
    gap: isiPad ? 100 : 30,
  },
  codeFieldCell: {
    justifyContent: "center",
    alignItems: "center",
    width: isiPad ? 80 : 50,
    height: isiPad ? 120 : 80,
    borderWidth: 1.5,
    // borderRadius: 12,
    borderColor: "#092F7435",
  },
  cell: {
    fontSize: 24,
    color: colors.primary,
  },
  focusCell: {
    borderColor: "#092F7435",
  },
  resendContainer: {
    alignItems: "center",
    marginVertical: isiPad ? "10%" : 40,
  },
  resendTextContainer: {
    flexDirection: "row",
  },
  resendText: {
    textDecorationLine: "underline",
  },
  backContainer: {
    width: 60,
    height: 60,
    marginTop: Platform.OS == "ios" ? 60 : 30,
    marginLeft: 25,
  },
});
