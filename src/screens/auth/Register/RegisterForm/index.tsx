import React, { useEffect, useRef, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import FormInput from "../../../../components/FormInput";
import { images } from "../../../../assets";
import CustomButton from "../../../../components/CustomButton";
import { alphabetRegex, passwordRegex } from "../../../../utils/Regex";
type Props = {
  navigation?: any;
};

const RegisterForm = ({ navigation }: Props) => {
  const [showPassword, setShowPassword] = useState({
    isShowPassword: false,
    isShowRenterPassword: false,
  });
  const [values, setValues] = useState({
    name: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({
    name: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const phoneInputRef = useRef(null);

  const handleInputChnage = (
    key: string,
    value: any,
    errorMessage: string,
    isPassed: boolean
  ) => {
    if (key && isPassed) {
      setValues({ ...values, [key]: value });
      setError({ ...error, [key]: "" });
    } else {
      setError({ ...error, [key]: errorMessage });
    }
  };

  useEffect(() => {
    const isValid = phoneInputRef.current?.isValidNumber(values?.phoneNumber);
    handleInputChnage(
      "phoneNumber",
      values?.phoneNumber,
      "Invalid Phone Number",
      isValid
    );
  }, [values?.phoneNumber]);

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <FormInput
          label="Name"
          placeholder="Unknown Person"
          keyboard="default"
          source={images.user}
          onChangeText={(value: string) => {
            handleInputChnage(
              "name",
              value,
              "Only Alphabets are allowed",
              alphabetRegex.test(value)
            );
          }}
          error={values.name && error?.name ? error?.name : ""}
          value={values.name}
        />
        <FormInput
          label="Phone number"
          placeholder="+92 XXX XXXXXXX"
          keyboard="numeric"
          source={images.phone}
          isPhoneField
          setPhoneInputValue={(value: any) => {
            setValues({ ...values, phoneNumber: value });
          }}
          phoneInputValue={values.phoneNumber}
          phoneInputRef={phoneInputRef}
          error={
            values?.phoneNumber && error?.phoneNumber ? error?.phoneNumber : ""
          }
        />
        <FormInput
          label="Password"
          placeholder="Enter Your Password Here"
          isPassword={!showPassword.isShowPassword ? true : false}
          source={!showPassword.isShowPassword ? images.lock : images.unlock}
          onShowPassword={() => {
            setShowPassword({
              ...showPassword,
              isShowPassword: !showPassword.isShowPassword,
            });
          }}
          value={values?.password}
          onChangeText={(value: any) => {
            setValues({ ...values, password: value });
            handleInputChnage(
              "password",
              value,
              "Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.",
              passwordRegex.test(value)
            );
          }}
          error={values?.password && error?.password ? error?.password : ""}
        />
        <FormInput
          label="Re-enter Password"
          placeholder="Enter Your Password Here"
          value={values?.confirmPassword}
          isPassword={!showPassword.isShowRenterPassword ? true : false}
          source={
            !showPassword.isShowRenterPassword ? images.lock : images.unlock
          }
          onShowPassword={() => {
            setShowPassword({
              ...showPassword,
              isShowRenterPassword: !showPassword.isShowRenterPassword,
            });
          }}
          onChangeText={(value: any) => {
            setValues({ ...values, confirmPassword: value });
            handleInputChnage(
              "confirmPassword",
              value,
              "Password didn't match.",
              value.length >= values.password.length &&
                value !== values.password
                ? false
                : true
            );
          }}
          error={
            values?.confirmPassword && error?.confirmPassword
              ? error?.confirmPassword
              : ""
          }
        />
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          text="Sign up"
          height={50}
          borderRadius={32}
          width="100%"
          onPress={() => {
            navigation.navigate("Otp");
          }}
          elevation={10}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    // Add form container styles here
  },
  buttonContainer: {
    marginTop: 30,
    // Add button container styles here
  },
});

export default RegisterForm;
