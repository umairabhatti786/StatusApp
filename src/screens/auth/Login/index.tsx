import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import LogoContainer from "../../../components/LogoContainer";
import CustomText from "../../../components/CustomText";
import { colors } from "../../../utils/colors";
import { font } from "../../../utils/font";
import LoginForm from "./LoginForm";
import SsoAuth from "../../../components/SsoAuth";
import { isiPad, sessionCheck, windowHeight } from "../../../utils/CommonFun";
import { Spacer } from "../../../components/Spacer";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { NotificationServices } from "../../../utils/hooks/NotificationServices";
import { URLS } from "../../../api/urls";
import { ApiServices } from "../../../api/ApiServices";
import ScreenLoader from "../../../components/ScreenLoader";
import { Snackbar } from "react-native-paper";
import { StorageServices } from "../../../utils/hooks/StorageServices";
import { useDispatch, useSelector } from "react-redux";
import {
  getReferralLinkId,
  setEmptyReferralLinkId,
  setIsRemember,
  setOpt,
  setPhoneNumber,
  setReferralLinkId,
  setUserData,
} from "../../../redux/reducers/authReducer";
import CustomToast from "../../../components/CustomToast";
import AbsoluteView from "../../../components/AbsoluteView";
import { getLocalizeFile } from "../../../redux/reducers/localizeReducer";
import { checkDynamicLink } from "../../../utils/hooks/FirebaseServices";
import dynamicLinks from "@react-native-firebase/dynamic-links";
import { images } from "../../../assets";
import { CommonActions } from "@react-navigation/native";

const Login = ({ navigation, route }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isMessage, setIsMessage] = useState(false);
  const [remember, setRemember] = useState<any>(true);
  const [disable, setDisable] = useState(false);
  const isLogut = route?.params?.isLogut;
  console.log("isLogut", isLogut);
  const [formattedNumber, setFormattedNumber] = useState("");
  const referralId = useSelector(getReferralLinkId);
  // const [referralId, setReferralId] = useState<string>("");
  const dispatch = useDispatch();
  let localize: any = useSelector(getLocalizeFile);

  const [values, setValues] = useState({
    phone: "",
    password: "",
    countryFlag: "",
  });
  const [error, setError] = useState({
    phoneError: "",
    password: "",
  });

  useEffect(() => {
    dynamicLinks().onLink(handleDynamicLink);
  }, [dynamicLinks]);

  useEffect(() => {
    checkReferralLink();
  }, []);

  const handleDynamicLink = (link: any) => {
    if (link?.url) {
      const id: any = link.url?.split("=").pop();
      dispatch(setReferralLinkId(id));
    }
  };

  const checkReferralLink = async () => {
    let link: any = await checkDynamicLink();
    dispatch(setReferralLinkId(link));
  };

  const handleAppSooAuth = async (data: any, authWith: string) => {
    setDisable(true);
    const deviceState = await NotificationServices.getDeviceStatus();
    const formData = new FormData();
    setIsLoading(true);
    if (authWith == "apple") {
      const { email, fullName, user } = data;
      console.log("dataApple", data);
      let name =
        fullName?.givenName !== null
          ? fullName?.givenName
          : "" + " " + fullName?.familyName !== null
          ? fullName?.familyName
          : "";
      formData.append("entity_uuid", URLS.ENTITY_UID);
      formData.append("login_type", authWith);
      formData.append("device_id", deviceState?.userId);
      formData.append("email", data?.email ? data?.email : "");
      formData.append("sso_token", user);
      formData.append("name", name ? name : "");
      formData.append("referral", referralId);
    } else if (authWith == "google") {
      formData.append("entity_uuid", URLS.ENTITY_UID);
      formData.append("login_type", authWith);
      formData.append("device_id", deviceState?.userId);
      formData.append("email", data?.user.email);
      formData.append("sso_token", data?.user?.id);
      formData.append("name", data.user?.name);
      formData.append("img_url", data?.user?.photo);
      formData.append("referral", referralId);
    } else {
      formData.append("entity_uuid", URLS.ENTITY_UID);
      formData.append("login_type", authWith);
      formData.append("device_id", deviceState?.userId);
      formData.append("phone", "+1"+values.phone);
      formData.append("email", "");
      formData.append("sso_token", data.user?.id);
      formData.append("name", "");
      formData.append("img_url", "");
      formData.append("referral", referralId);
    }
    console.log("appleFormData",formData)
    ApiServices.authenticate(formData, async ({ isSuccess, response }: any) => {
      setIsLoading(false);
      if (isSuccess) {
        let result = JSON.parse(response);
        if (result?.success) {
          setIsLoading(false);
          if (
            !result?.data?.phone ||
            !result?.data?.email ||
            !result.data.phone
          ) {
            if (authWith == "phone") {
              setIsLoading(false);
              setMessage(result?.message);
              setIsMessage(true);
              dispatch(setEmptyReferralLinkId(null));
              dispatch(setIsRemember(remember));
              dispatch(setPhoneNumber("+1" + values.phone));
              dispatch(setOpt(result?.data?.otp_code));
              setTimeout(() => {
                setIsMessage(false);
                setDisable(false);
                navigation.navigate("Otp", {
                  data: result?.data,
                  phone: values.phone,
                });
              }, 500);
            } else {
              dispatch(setIsRemember(remember));
              setIsLoading(false);
              setMessage(result?.message);
              if (result?.message) {
                setIsMessage(true);
              }
              setTimeout(() => {
                setIsMessage(false);
                setDisable(false);
                dispatch(setEmptyReferralLinkId(null));

                navigation.navigate("CompleteProfile", {
                  data: result?.data,
                  authWith: authWith,
                });
              }, 500);
            }
          } else {
            if (remember) {
              StorageServices.setItem("userData", result?.data);
            }
            setIsLoading(false);
            setDisable(false);
            setMessage(result?.message);
            setIsMessage(true);
            setTimeout(() => {
              setIsMessage(false);
              setDisable(false);
              dispatch(setUserData(result?.data));

              dispatch(setEmptyReferralLinkId(null));
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{name: 'Home'}],
                }),
              );
              // navigation.navigate("Home");
            }, 500);
          }
        } else {
          setIsLoading(false);
          setDisable(false);
          if (result?.app_update_status == 1 || result?.session_expire) {
            sessionCheck(
              result?.app_update_status,
              result?.session_expire,
              dispatch
            );
            return;
          }

          setMessage(result?.message);
          setIsMessage(true);
          setTimeout(() => {
            setIsMessage(false);
            setMessage("");
          }, 2000);
        }
      } else {
        setIsLoading(false);
        setDisable(false);

        Alert.alert(`${localize?.something_went_wrong_generic_toast_title}`, `${localize?.something_went_wrong_generic_toast_description}`);
      }
    });
  };
  return (
    <>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: colors.white }}
        extraScrollHeight={-100}
      >
        <SafeAreaView style={styles.inSideContainer}>
          <TouchableOpacity
            onPress={() => {
              if (isLogut) {
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [
                      {
                        name: "Home",
                        params: { isLogut: true },
                      },
                    ],
                  })
                );

                return;
              }

              navigation.goBack();
            }}
            style={styles.backButtonContainer}
          >
            <Image
              source={images.backArrow}
              resizeMode="contain"
              style={isiPad ? styles.isPadBackArrowIcon : styles.backArrowIcon}
            />
          </TouchableOpacity>
          <View style={styles.container}>
            <LogoContainer />
          </View>
          <View>
            <View style={styles.heading}>
              <CustomText
                color={colors.primary}
                text={localize?.signup_title}
                numberOfLines={2}
                size={isiPad ? 40 : 30}
              />
              <Spacer height={5} />
              <CustomText
                size={isiPad ? 15 : 12}
                text={localize?.signup_desription}
                style={styles.header}
              />
            </View>
            <View style={styles.form}>
              <LoginForm
                values={values}
                localize={localize}
                setIsRemember={setRemember}
                isRemember={remember}
                setFormattedNumber={setFormattedNumber}
                setValues={setValues}
                isLoading={isLoading}
                error={error}
                onPress={() => {
                  if (values.phone.length == 0) {
                    setMessage(localize?.login_phone_number_field_required_validation);

                    setIsMessage(true);

                    setTimeout(() => {
                      setIsMessage(false);
                    }, 2000);

                    return;
                  }
                  handleAppSooAuth("", "phone");
                }}
                setError={setError}
                navigation={navigation}
              />
            </View>
          </View>
          <Spacer height={"2%"} />
          <SsoAuth
            // disable={isLoading}
            or={localize?.or}
            loginWithGoogle={localize?.sign_in_with_google}
            loginWidthApple={localize?.sign_in_with_apple}
            handleSsoAuth={(data, authWith) => {
              handleAppSooAuth(data, authWith);
            }}
          />
          <Spacer height={10} />
        </SafeAreaView>
        <Spacer height={40} />

      </KeyboardAwareScrollView>

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

const styles = StyleSheet.create({
  container: {
    paddingVertical: isiPad ? "3.5%" : "0%",
    // marginTop: Platform.OS == "ios" ? 20 : 30,
    alignItems: "center",
  },
  inSideContainer: {
    flex: 1,
    backgroundColor: colors.white,
    marginHorizontal: 30,
    minHeight: windowHeight - 20,
    justifyContent: "space-between",
  },
  heading: {
    marginTop: 40,
    alignItems: "flex-start",
  },
  header: {
    marginLeft: 5,
  },
  form: {
    marginVertical: 30,
  },

  backButtonContainer: {
    width: 50,
    height: 80,
    justifyContent: "center",
  },
  backArrowIcon: {
    width: 32,
    height: 32,
  },

  isPadBackArrowIcon: {
    width: 50,
    height: 50,
  },
});

export default Login;
