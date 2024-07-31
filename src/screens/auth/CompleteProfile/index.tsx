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
import { isiPad, sessionCheck, windowHeight } from "../../../utils/CommonFun";
import { Spacer } from "../../../components/Spacer";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import CompleteForm from "./CompleteForm";
import CustomButton from "../../../components/CustomButton";
import { ApiServices } from "../../../api/ApiServices";
import ScreenLoader from "../../../components/ScreenLoader";
import { StorageServices } from "../../../utils/hooks/StorageServices";
import { useDispatch, useSelector } from "react-redux";
import {
  getSignupValue,
  setUserData,
} from "../../../redux/reducers/authReducer";
import CustomToast from "../../../components/CustomToast";
import { getLocalizeFile } from "../../../redux/reducers/localizeReducer";
import { verticalScale } from "react-native-size-matters";
import { images } from "../../../assets";
import { CommonActions } from "@react-navigation/native";

const CompleteProfile = ({ navigation, route }: any) => {
  let authenticateData = route?.params?.data;
  let loginSource = route?.params?.authWith;
  const [message, setMessage] = useState("");
  const [isMessage, setIsMessage] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const isRemember = useSelector(getSignupValue)?.isRemember;
  const [formattedNumber, setFormattedNumber] = useState("");
  const localize: any = useSelector(getLocalizeFile);

  const dispatch = useDispatch();

  const [values, setValues] = useState({
    name: authenticateData?.name ? authenticateData?.name : "",
    phoneNumber: authenticateData?.phone ? authenticateData?.phone : "",
    email: authenticateData?.email ? authenticateData?.email : "",
    DOB: "",
  });
  const [birth, setBirth] = useState({
    day: "",
    month: "",
    year: "",
  });
  const [error, setError] = useState({
    name: "",
    phoneNumber: "",
    email: "",
  });

  const onUpdate = () => {
    if (!values.name) {
      setError({
        ...error,
        name: localize?.complete_your_profile_name_field_required_validation,
      });
      return;
    }
    if (values.name.length < 2) {
      setError({
        ...error,
        name: localize?.complete_your_profile_name_field_characters_required_validation,
      });
      return;
    }
    if (!values.email) {
      setError({
        ...error,
        email: localize?.complete_your_profile_email_field_required_validation,
      });
      return;
    }

    if (!values.phoneNumber) {
      setError({
        ...error,
        phoneNumber:
          localize?.complete_your_profile_phone_number_field_required_validation,
      });
      return;
    }
    const formData = new FormData();
    setIsLoading(true);
    const data = {
      DOB: `${birth.day}-${birth.month}-${birth.year}`,
      isFirstLogin: true,
    };
    formData.append(
      "phone",
      authenticateData?.phone
        ? authenticateData?.phone
        : "+1" + values.phoneNumber
    );
    formData.append("user_id", authenticateData?.id);
    formData.append("email", values?.email);
    formData.append("name", values?.name);
    formData.append("data", JSON.stringify(data));
    ApiServices.updateProfile(
      formData,
      async ({ isSuccess, response }: any) => {
        if (isSuccess) {
          let result = JSON.parse(response);
          if (result?.success) {
            setIsLoading(false);
            if (isRemember) {
              StorageServices.setItem("userData", result?.data);
            }
            setIsMessage(true);
            setMessage(result?.message);
            setTimeout(() => {
              setIsMessage(false);
              setMessage("");
              dispatch(setUserData(result?.data));

              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: "Home" }],
                })
              );

              // navigation.navigate("Home");
            }, 500);
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
            console.log("Error", result?.message);
            setMessage(result?.message);
            setIsMessage(true);
          }
        } else {
          setIsLoading(false);

          Alert.alert(
            `${localize?.something_went_wrong_generic_toast_title}`,
            `${localize?.something_went_wrong_generic_toast_description}`
          );
        }
      }
    );
  };

  return (
    <>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: colors.white, flex: 1 }}
        // extraScrollHeight={-100}
      >
        <View style={styles.inSideContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
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
                text={localize?.complete_your_profile_title}
                size={isiPad ? 40 : 30}
              />
              <Spacer height={5} />
              <CustomText
                size={isiPad ? 15 : 12}
                text={localize?.complete_your_profile_description}
                style={styles.header}
              />
            </View>
            <View style={styles.form}>
              <CompleteForm
                values={values}
                localize={localize}
                setValues={setValues}
                birth={birth}
                setFormattedNumber={setFormattedNumber}
                setBirth={setBirth}
                error={error}
                loginSource={loginSource}
                setError={setError}
              />
            </View>
            <CustomButton
              text={localize?.complete_your_profile_confirm}
              height={isiPad ? verticalScale(33) : 50}
              shadowOpacity={0.3}
              size={isiPad ? 22 : 18}
              disable={error.phoneNumber || error.email ? true : false}
              elevation={error.phoneNumber || error.email ? 0 : 10}
              onPress={onUpdate}
              notRequiredShadow={
                !values.email ||
                !values.name ||
                !values.phoneNumber ||
                error.phoneNumber ||
                error.email
                  ? true
                  : false
              }
            />
            <Spacer height={20} />
          </View>
        </View>
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
    // marginTop: Platform.OS == "ios" ? 60 : 30,
    alignItems: "center",
  },
  inSideContainer: {
    flex: 1,
    backgroundColor: colors.white,
    marginHorizontal: 30,
    minHeight: windowHeight - 20,
    paddingVertical: Platform.OS == "ios" ? verticalScale(20) : 0,
  },
  heading: {
    marginTop: 40,
    alignItems: "flex-start",
  },
  header: {
    marginLeft: 5,
  },
  form: {
    marginTop: 30,
    height: windowHeight / 1.9,
  },
  backButtonContainer: {
    width: 50,
    height: 80,
    justifyContent: "center",
    marginTop: Platform.OS == "ios" ? 20 : 30,
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

export default CompleteProfile;
