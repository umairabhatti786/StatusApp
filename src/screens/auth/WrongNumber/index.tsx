import React, { useEffect, useRef, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import CustomText from "../../../components/CustomText";
import { colors } from "../../../utils/colors";
import ScreenLayout from "../../../components/ScreenLayout";
import FormInput from "../../../components/FormInput";
import { images } from "../../../assets";
import CustomButton from "../../../components/CustomButton";
import { Spacer } from "../../../components/Spacer";
import { ApiServices } from "../../../api/ApiServices";
import ScreenLoader from "../../../components/ScreenLoader";
import { useDispatch, useSelector } from "react-redux";
import {
  getCountryFlag,
  setCountryFlag,
  setOpt,
  setPhoneNumber,
} from "../../../redux/reducers/authReducer";
import CustomToast from "../../../components/CustomToast";
import { getLocalizeFile } from "../../../redux/reducers/localizeReducer";
import { canadianPhoneNumberRegex, numericRegex } from "../../../utils/Regex";
import { isiPad, sessionCheck } from "../../../utils/CommonFun";
import { verticalScale } from "react-native-size-matters";

const WrongNumber = ({ navigation, route }: any) => {
  const [values, setValues] = useState({
    phoneNumber: "",
    countryFlag: "CA",
    confirmPhoneNumber: "",
    confirmCountryFlag: "CA",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isMessage, setIsMessage] = useState(false);

  const localize: any = useSelector(getLocalizeFile);

  const dispatch = useDispatch();

  const countryFlag = useSelector(getCountryFlag);

  const [error, setError] = useState({
    phoneNumber: "",
    confirmPhoneNumber: "",
  });

  const userId = route?.params?.userId;

  const phoneInputRef = useRef(null);
  const confirmPhoneInputRef = useRef(null);

  const handlePhoneChange = (value: any) => {
    if (value.length == 0) {
      setError({ ...error, phoneNumber: "" });
      setValues({ ...values, phoneNumber: "" });
    }
    if (value.length > 0) {
      if (!numericRegex.test(value)) {
        return;
      }

      setValues({ ...values, phoneNumber: value });
      let isValid = canadianPhoneNumberRegex.test(value);
      if (isValid) {
        setError({ ...error, phoneNumber: "" });
        setValues({ ...values, phoneNumber: value });
      } else {
        setError({ ...error, phoneNumber:localize?.wrong_number_phone_number_invalid_validation });
      }
    }
  };
  const handleConfirmPhoneChange = (value: any) => {
    if (value?.length > 0) {
      if (!numericRegex.test(value)) {
        return;
      }
    }
    if (values?.phoneNumber != value) {
      setError({
        ...error,
        confirmPhoneNumber: localize?.wrong_number_phone_number_not_matched_validation,
      });
    } else {
      setError({
        ...error,
        confirmPhoneNumber: "",
      });
    }

    setValues({ ...values, confirmPhoneNumber: value });
  };

  const onChangeCountry = (coun: any) => {
    setValues({ ...values, countryFlag: coun?.cca2 });
  };

  const handlePhoneNumber = async () => {
    if (values.phoneNumber == values.confirmPhoneNumber) {
      const formData = new FormData();
      formData.append("user_id", userId);
      formData.append("phone", "+1" + values.phoneNumber);
      setIsLoading(true);
      ApiServices.updateNumber(
        formData,
        async ({ isSuccess, response }: any) => {
          let result = JSON.parse(response);
          if (isSuccess) {
            if (result?.success) {
              setIsLoading(false);
              dispatch(setPhoneNumber("+1" + values.phoneNumber));
              dispatch(setOpt(result?.data?.otp_code));
              setMessage(result.message);
              setIsMessage(true);
              setTimeout(() => {
                setIsMessage(false);
                navigation.goBack();
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
              // Phone number already associated with another account
              console.log("Error", result?.message);
              if (
                result?.message ==
                "The phone field must contain a unique value."
              ) {
                setIsMessage(true);
                setMessage(
                  localize?.wrong_number_phone_number_exist_validation
                );

                return;
              }
              setIsMessage(true);
              setMessage(result?.message);
            }
          } else {
            setIsLoading(false);

            Alert.alert(`${localize?.something_went_wrong_generic_toast_title}`, `${localize?.something_went_wrong_generic_toast_description}`);
          }
        }
      );
    } else {
      setError({
        ...error,
        confirmPhoneNumber: localize?.wrong_number_phone_number_not_matched_validation,
      });
    }
  };

  return (
    <>
      <ScreenLayout
        style={styles.layout}
        height={"auto"}
        bgColor={colors.white}
        navigation={navigation}
      >
        <View
          style={{
            marginLeft: isiPad ? "2%" : "5%",
            marginTop: "8%",
          }}
        >
          <CustomText
            text={localize?.wrong_number_title}
            size={isiPad ? 40 : 32}
            // fontWeight="400"
            // fontFam={font.montserratMedium}
            color={colors.primary}
          />
          <CustomText
            size={isiPad ? 15 : 12}
            text={localize?.wrong_number_description}
          />
        </View>
        <View
          style={{
            flex: 1,
            marginTop: "10%",
          }}
        >
          <View
            style={{
              justifyContent: "center",
              paddingHorizontal: 20,
              paddingVertical: 30,
              backgroundColor: colors.white,
              // ...appStyles.elevation,
            }}
          >
            <FormInput
              label={localize?.wrong_number_phone_number_field_label}
              PhonePlaceholder={
                localize?.wrong_number_phone_number_field_place_holder
              }
              keyboard="numeric"
              source={images.phone}
              isPhoneField
              onChangeCountryNumber={handlePhoneChange}
              phoneInputValue={values.phoneNumber}
              phoneInputRef={phoneInputRef}
              error={
                values?.phoneNumber && error?.phoneNumber
                  ? error?.phoneNumber
                  : ""
              }
            />
            <Spacer height={isiPad ? verticalScale(30) : 20} />
            <FormInput
              label={localize?.wrong_number_confirm_phone_number_field_label}
              PhonePlaceholder={
                localize?.wrong_number_confirm_phone_number_place_holder
              }
              keyboard="numeric"
              isPhoneField
              source={images.phone}
            
              onChangeCountryNumber={handleConfirmPhoneChange}
              phoneInputValue={values.confirmPhoneNumber}
              phoneInputRef={confirmPhoneInputRef}
              error={
                values?.confirmPhoneNumber && error?.confirmPhoneNumber
                  ? error?.confirmPhoneNumber
                  : ""
              }
            />
            <CustomButton
              text={localize?.wrong_number_success_continue_button}
              borderRadius={32}
              height={isiPad ? verticalScale(33) : 50}
              size={isiPad ? 22 : 18}
              disable={
                !values.phoneNumber ||
                !values.confirmPhoneNumber ||
                error.confirmPhoneNumber ||
                error.phoneNumber
                  ? true
                  : false
              }
              notRequiredShadow={
                !values.phoneNumber ||
                !values.confirmPhoneNumber ||
                error.confirmPhoneNumber ||
                error.phoneNumber
                  ? true
                  : false
              }
              elevation={
                !values.phoneNumber ||
                !values.confirmPhoneNumber ||
                error.confirmPhoneNumber ||
                error.phoneNumber
                  ? 0
                  : 10
              }
              style={{
                marginTop: isiPad ? verticalScale(30) : 60,
              }}
              onPress={() => {
                handlePhoneNumber();
              }}
            />
          </View>
        </View>
      </ScreenLayout>

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
export default WrongNumber;
const styles = StyleSheet.create({
  layout: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
});
