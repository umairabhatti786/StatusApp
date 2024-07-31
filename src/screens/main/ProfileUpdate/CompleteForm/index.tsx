import React, { useRef } from "react";
import { View, StyleSheet } from "react-native";
import FormInput from "../../../../components/FormInput";
import { colors } from "../../../../utils/colors";
import { alphabetRegex, emailRegex } from "../../../../utils/Regex";
import DOBInput from "../DOBInput";
import { useSelector } from "react-redux";
import { getCountryFlag } from "../../../../redux/reducers/authReducer";
import { ApiServices } from "../../../../api/ApiServices";
import { URLS } from "../../../../api/urls";
import { Spacer } from "../../../../components/Spacer";
import { getLastTenDigitsFromNumber } from "../../../../utils/CommonFun";

type Props = {
  navigation?: any;
  values?: any;
  setValues?: any;
  error?: any;
  setError?: any;
  loginSource?: string;
  birth?: any;
  setBirth?: any;
  localize?:any
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
  localize
}: Props) => {
  const phoneInputRef = useRef<any>(null);

  const countryFlag = useSelector(getCountryFlag);

  console.log("values.name", values.name);

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
      setError({ ...error, [key]: errorMessage });
    }
  };

  return (
    <View>
      <FormInput
        label={localize?.edit_profile_name_field_label}
        placeholder={localize?.edit_profile_name_field_place_holder}
        alignError={error.name=="Name is required"?"flex-end" : "flex-start"}
        maxLength={30}
        editable={false}
        keyboard="default"
        color={colors.darkGrey}
        complusory={true}
        autoCapitalize={"words"}
        onChangeText={(value: string) => {
          if (value.length == 0) {
            setError({ ...error, name: "Name is required" });
            setValues({ ...values, name: "" });

            return;
          }

          if (!alphabetRegex.test(value)) {
            setError({ ...error, name: "Only Alphabets are allowed" });
            setValues({ ...values, name: value });
          }
          if(value.length<2){
            setValues({ ...values, name: value });

            setError({ ...error, name: "Please ensure the name field contains between 2 to 30 characters" });


          }
           else {
            setValues({ ...values, name: value });
            setError({ ...error, name: "" });

          }
          // handleInputChnage(
          //   "name",
          //   value,
          //   "Only Alphabets are allowed",
          //   alphabetRegex.test(value)
          // );
        }}
        error={error?.name ? error.name : ""}
        value={values.name}
      />
      <FormInput
       label={localize?.edit_profile_phone_number_field_label}
       PhonePlaceholder={localize?.edit_profile_phone_number_field_place_holder}
        countryFlag={countryFlag}
        editable={false}
        color={colors.darkGrey}
        phoneInputValue={getLastTenDigitsFromNumber(values.phoneNumber)}
        keyboard="numeric"
        complusory={true}
        isPhoneField
        
        onChangeCountryNumber={(value: any) => {
          setValues({ ...values, phoneNumber: value });
          const isValid = phoneInputRef.current?.isValidNumber?.(value);
          if (value.length == 0) {
            setError({ ...error, phoneNumber: "" });
            setValues({ ...values, phoneNumber: "" });

            return;
          }
          if (isValid) {
            const formData = new FormData();
            formData.append("phone", value);
            ApiServices.validate(
              formData,
              URLS.VALIDATE_PHONE,
              async (res: any) => {
                let result = JSON.parse(res.response);
                if (result.success) {
                } else {
                  setError({
                    ...error,
                    phoneNumber: "Phone number already exist",
                  });
                }
              }
            );
          } else {
            setError({
              ...error,
              phoneNumber: isValid ? "" : "Invalid Phone Number",
            });
          }
        }}
        phoneInputRef={phoneInputRef}
        error={error?.phoneNumber ? error?.phoneNumber : ""}
      />
      <FormInput
          label={localize?.edit_profile_email_address_label}
          placeholder={localize?.edit_profile_email_qddress_place_holder}
        complusory={true}
        color={colors.darkGrey}
        editable={false}
        onChangeText={(value: string) => {
          setValues({ ...values, email: value });
          let isValid = emailRegex.test(value);
          handleInputChnage("email", value, "Invalid Email Address", isValid);
          if (isValid) {
            const formData = new FormData();
            formData.append("email", value);
            ApiServices.validate(
              formData,
              URLS.VALIDATE_EMAIL,
              async (res: any) => {
                let result = JSON.parse(res.response);
                if (result.success) {
                } else {
                  setError({
                    ...error,
                    email: "Email already exist",
                  });
                }
              }
            );
          }
        }}
        error={error?.email ? error?.email : ""}
        value={values.email}
      />
      
      <DOBInput
         label={localize?.edit_profile_date_of_birth_field_label}
         datePlaceholder={localize?.edit_profile_day_format_place_holder}
         birth={birth}
         setBirth={setBirth}
         keyboard={"number-pad"}
         values={values}
         setValues={setValues}
         monthPlaceholder={localize?.edit_profile_month_format_place_holder}
         yearPlaceholder={localize?.edit_profile_year_format_place_holder}
        
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
