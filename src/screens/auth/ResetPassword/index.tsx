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
import CheckBox from "../../../components/CheckBox";
import { scale, verticalScale } from "react-native-size-matters";
import CustomToast from "../../../components/CustomToast";
import Loader from "../../../components/Loader";
import { ResetPasswordRequest } from "../../../api/ApiServices";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AUTH, StorageServices } from "../../../utils/hooks/StorageServices";
import { useDispatch } from "react-redux";
import { setUserData } from "../../../redux/reducers/authReducer";
import { windowHeight, windowWidth } from "../../../utils/Dimensions";
interface props {
  route: any;
}
const ResetPassword = ({ route }: props) => {
  const navigation: any = useNavigation();
  const [isRemember, setIsRemember] = useState(true);
  const [showPassword, setShowPAssword] = useState(true);
  const [showError, setShowError] = useState(false);
  const [toastColor, setToastColor] = useState(colors.red);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const params=route?.params?.data
  const dispatch=useDispatch()

  // console.log("data",data)



  const [values, setValues] = useState({
    password: "",
    confirmPassword: "",
  });

  console.log("values", values);

  const onResetPassword = () => {
    if (!values?.password) {
      setError("password is required");
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 4000);
      return;
    }
    if (values?.password.length < 6) {
      setError("password At least 6 characters");
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 4000);
      return;
    }

    if (!values.confirmPassword) {
      setError("Confirm Password is required");
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 4000);

      return;
    }
    if (values?.confirmPassword != values?.password) {
      setError("Confirm Password not match");
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 4000);

      return;
    }
    const data = {
      password: values.password,
      id:params.id,
    };
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);

    ResetPasswordRequest(data, async ({ isSuccess, response }: any) => {
      if (isSuccess) {
        let result = JSON.parse(response);
        if (result.status) {
          setLoading(false);
          setError(result.msg);
          setToastColor(colors.green)
          setShowError(true);
          setTimeout(() => {
            setShowError(false);
            // setToastColor(colors.red)
            StorageServices.removeItem(AUTH);

            dispatch(setUserData(null))


            navigation.navigate("Login", {
            
            });
          }, 2000);
        } else {
          if (result.error) {
            setLoading(false);

            setError(result?.error);
            setToastColor(colors.red)

            setShowError(true);
            setTimeout(() => {
              setShowError(false);
              setToastColor(colors.red)

            }, 4000);
          } else {
            setLoading(false);
            setError(result?.msg);
            setToastColor(colors.red)

            setShowError(true);
            setTimeout(() => {
              setShowError(false);
              setToastColor(colors.red)

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
    position: 'absolute',
    left: 0,
    top: 0,
    width:windowWidth,
    height:windowHeight,
  }}
    />
        <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1,}}
      >
        <SafeAreaView style={{flex:1}}>
          <View style={{ flex: 1, padding: scale(20) }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={images.back} />
            </TouchableOpacity>
            <Spacer height={verticalScale(20)} />

            {/* <Spacer height={10}/> */}
            <CustomText
              text={"Reset your password"}
              color={colors.white}
              size={22}
              style={{ textAlign: "center" }}
              fontFam="Poppins-Medium"
              fontWeight="600"
            />
            <Spacer height={verticalScale(20)} />

            <CustomTextInput
              label="New Password"
              placeholder="Enter new password"
              value={values.password}
              onChangeText={(txt: string) => {
                setValues({ ...values, password: txt });
              }}
              isPassword={showPassword}
              onShowPassword={() => setShowPAssword(!showPassword)}
              source={showPassword ? images.eyeclose : images.eye}
            />
            <Spacer height={7} />
            <CustomTextInput
              label="Confirm Password"
              placeholder="Confirm your new password"
              value={values.confirmPassword}
              onChangeText={(txt: string) => {
                setValues({ ...values, confirmPassword: txt });
              }}
            />
            <Spacer height={25} />

            <View style={appStyles.rowjustify}>
              <View style={appStyles.row}>
                <CheckBox
                  isRemember={isRemember}
                  setIsRemember={setIsRemember}
                />

                <Spacer width={10} />
                <CustomText
                  text={"Sign out of all devices"}
                  color={colors.white}
                  size={13}
                  style={{ textAlign: "center" }}
                  fontFam="Poppins-Regular"
                  fontWeight="500"
                />
              </View>
            </View>
            <Spacer height={25} />

            <CustomButton
              text="Reset Password"
              onPress={onResetPassword}
              width={"100%"}
              fontWeight={"500"}
              // size={18}
              textColor={colors.black}
              bgColor={colors.white}
            />
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

export default ResetPassword;
