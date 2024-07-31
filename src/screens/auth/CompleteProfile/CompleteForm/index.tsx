import React, { useRef } from "react";
import { View, StyleSheet, Alert } from "react-native";
import FormInput from "../../../../components/FormInput";
import { colors } from "../../../../utils/colors";
import {
  alphabetRegex,
  canadianPhoneNumberRegex,
  emailRegex,
  numericRegex,
} from "../../../../utils/Regex";
import DOBInput from "../../../main/ProfileUpdate/DOBInput";
import { useDispatch, useSelector } from "react-redux";
import { getCountryFlag } from "../../../../redux/reducers/authReducer";
import { ApiServices } from "../../../../api/ApiServices";
import { URLS } from "../../../../api/urls";
import { Spacer } from "../../../../components/Spacer";
import {
  getLastTenDigitsFromNumber,
  isiPad,
  sessionCheck,
} from "../../../../utils/CommonFun";

type Props = {
  navigation?: any;
  values?: any;
  setValues?: any;
  error?: any;
  setError?: any;
  loginSource?: string;
  birth?: any;
  setBirth?: any;
  setFormattedNumber?: any;
  localize?: any;
};
const CompleteForm = ({
  navigation,
  values,
  setValues,
  error,
  setError,
  loginSource,
  birth,
  setBirth,
  setFormattedNumber,
  localize,
}: Props) => {
  const phoneInputRef = useRef<any>(null);
  const dispatch = useDispatch();

  const countryFlag = useSelector(getCountryFlag);
  const handleInputChnage = (
    key: string,
    value: any,
    errorMessage: string,
    isPassed: boolean
  ) => {
    if (key && isPassed) {
      if (key == "email") {
      }
      setValues({ ...values, [key]: value });
      setError({ ...error, [key]: "" });
    } else {
      if (value.length == 0) {
        setError({ ...error, [key]: "" });

        return;
      }
      setError({ ...error, [key]: errorMessage });
    }
  };
  // XXX XXXXXXX
  console.log("values.phoneNumber", values.phoneNumber);

  return (
    <View style={{ gap: isiPad ? 50 : 0 }}>
      {loginSource == "phone" && (
        <FormInput
          label={localize?.complete_your_profile_name_field_label}
          placeholder={localize?.complete_your_profile_name_field_place_holder}
          alignError={
            error.name ==
            localize?.complete_your_profile_name_field_required_validation
              ? "flex-end"
              : "flex-start"
          }
          keyboard="default"
          autoCapitalize={"words"}
          maxLength={30}
          complusory={true}
          onChangeText={(value: string) => {
            if (value.length == 0) {
              setError({
                ...error,
                name: localize?.complete_your_profile_name_field_required_validation,
              });
              setValues({ ...values, name: "" });

              return;
            }

            if (!alphabetRegex.test(value)) {
              setError({
                ...error,
                name: localize?.complete_your_profile_name_field_alphabets_required_validation,
              });
              setValues({ ...values, name: value });
              return;
            }
            if (value.length < 2) {
              setValues({ ...values, name: value });

              setError({
                ...error,
                name: localize?.complete_your_profile_name_field_characters_required_validation,
              });
            } else {
              setValues({ ...values, name: value });
              setError({ ...error, name: "" });
            }
          }}
          error={error?.name ? error.name : ""}
          value={values.name}
        />
      )}
      {loginSource != "phone" && (
        <FormInput
          label={localize?.complete_your_profile_phone_number_field_label}
          PhonePlaceholder={
            localize?.complete_your_profile_phone_number_field_place_holder
          }
          countryFlag={countryFlag}
          editable={loginSource == "phone" ? false : true}
          color={loginSource == "phone" ? colors.darkGrey : colors.black}
          phoneInputValue={
            values.phoneNumber
          }
          keyboard="numeric"
          complusory={true}
          isPhoneField
          onChangeCountryNumber={(value: any) => {
            setFormattedNumber(value);
            if (value.length > 0) {
              if (!numericRegex.test(value)) {
                return
              }
            }
            // let getNumber = getLastTenDigitsFromNumber(value);
            // console.log("getNumber",getNumber)
            setValues({ ...values, phoneNumber: value});
            if (value.length == 0) {
              setError({ ...error, phoneNumber: "" });
              setValues({ ...values, phoneNumber: "" });
              return;
            }
            let isValid = canadianPhoneNumberRegex.test(value);
            if (isValid) {
              const formData = new FormData();
              formData.append("phone", "+1" + value);
              ApiServices.validate(
                formData,
                URLS.VALIDATE_PHONE,
                async ({ isSuccess, response }: any) => {
                  if (isSuccess) {
                    let result = JSON.parse(response);
                    if (result.success) {
                      setError({ ...error, phoneNumber: "" });
                    } else {
                      if (
                        result?.app_update_status == 1 ||
                        result?.session_expire
                      ) {
                        sessionCheck(
                          result?.app_update_status,
                          result?.session_expire,
                          dispatch
                        );
                        return;
                      }

                      setError({
                        ...error,
                        phoneNumber:
                          result.message ==
                          "The phone field must contain a unique value."
                            ? `${localize?.complete_your_profile_phone_number_exist_validation}`
                            : result.message,
                      });
                    }
                  } else {
                    Alert.alert(
                      `${localize?.something_went_wrong_generic_toast_title}`,
                      `${localize?.something_went_wrong_generic_toast_description}`
                    );
                  }
                }
              );
            } else {
              setError({
                ...error,
                phoneNumber: isValid
                  ? ""
                  : localize?.complete_your_profile_phone_number_field_invalid_validation,
              });
            }
          }}
          phoneInputRef={phoneInputRef}
          error={error?.phoneNumber ? error?.phoneNumber : ""}
        />
      )}

      {loginSource == "phone" && (
        <FormInput
          label={localize?.complete_your_profile_email_address_label}
          placeholder={
            localize?.complete_your_profile_email_address_place_holder
          }
          complusory={true}
          color={
            loginSource == "google" || loginSource == "apple"
              ? "#adb5bd"
              : colors.black
          }
          editable={
            loginSource == "google" || loginSource == "apple" ? false : true
          }
          onChangeText={(value: string) => {
            if (value.length == 0) {
              setError({ ...error, email: "" });
              setValues({ ...values, email: "" });

              return;
            }
            setValues({ ...values, email: value });
            let isValid = emailRegex.test(value);
            // handleInputChnage("email", value, "Invalid Email Address", isValid);

            if (isValid) {
              const formData = new FormData();
              formData.append("email", value);
              ApiServices.validate(
                formData,
                URLS.VALIDATE_EMAIL,
                async ({ isSuccess, response }: any) => {
                  if (isSuccess) {
                    let result = JSON.parse(response);
                    if (result.success) {
                      setError({
                        ...error,
                        email: "",
                      });
                    } else {
                      if (
                        result?.app_update_status == 1 ||
                        result?.session_expire
                      ) {
                        sessionCheck(
                          result?.app_update_status,
                          result?.session_expire,
                          dispatch
                        );
                        return;
                      }

                      setError({
                        ...error,
                        email:
                          result.message ==
                          "The email field must contain a unique value."
                            ? `${localize?.complete_your_profile_email_field_exist_validation}`
                            : result.message,
                      });
                    }
                  } else {
                    Alert.alert(
                      `${localize?.something_went_wrong_generic_toast_title}`,
                      `${localize?.something_went_wrong_generic_toast_description}`
                    );
                  }
                }
              );
            } else {
              setError({
                ...error,
                email:
                  localize?.complete_your_profile_email_field_invalid_validation,
              });
            }
          }}
          error={error?.email ? error?.email : ""}
          value={values.email}
        />
      )}

      <DOBInput
        label={localize?.complete_your_profile_date_of_birth_field_label}
        datePlaceholder={
          localize?.complete_your_profile_day_format_place_holder
        }
        // datePlaceholder="DD"
        birth={birth}
        setBirth={setBirth}
        keyboard={"numeric"}
        values={values}
        setValues={setValues}
        monthPlaceholder={
          localize?.complete_your_profile_month_format_place_holder
        }
        yearPlaceholder={
          localize?.complete_your_profile_year_format_place_holder
        }
      />
    </View>
  );
};

export default CompleteForm;

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 5,
    marginVertical: 15,
  },
  checkboxTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxText: {
    marginLeft: 5,
  },
  forgotPasswordContainer: {
    justifyContent: "center",
  },
  forgotPasswordText: {
    textDecorationLine: "underline",
  },
  buttonContainer: {
    marginTop: "10%",
  },
});
