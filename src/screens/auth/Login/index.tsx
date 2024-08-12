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
import { windowHeight, windowWidth } from "../../../utils/Dimensions";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import NewText from "../../../components/NewText";
import { emailRegex } from "../../../utils/Regex";
import CustomToast from "../../../components/CustomToast";
import { UserLogin } from "../../../api/ApiServices";
import Loader from "../../../components/Loader";
import { useDispatch } from "react-redux";
import { AUTH, REMEMBER, StorageServices, TOKEN } from "../../../utils/hooks/StorageServices";
import { setRemember, setToken, setUserData } from "../../../redux/reducers/authReducer";
import OneSignal from "react-native-onesignal";

const Login = () => {
  const navigation: any = useNavigation();
  const [isRemember, setIsRemember] = useState(true);
  const [showPassword, setShowPAssword] = useState(true);
  const [showError, setShowError] = useState(false);
  const [toastColor,setToastColor]=useState(colors.red)
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch=useDispatch()
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const onLogin = async () => {
    let deviceState = await OneSignal.getDeviceState();

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
    setLoading(true);
    const data = {
      email: values.email,
      password: values.password,
      deviceId: deviceState?.userId,

    };

    UserLogin(data, async ({ isSuccess, response }: any) => {
      if (isSuccess) {
        let result = JSON.parse(response);
        console.log("ckdnckdnc", result);

        if (result.status) {
          setLoading(false);
          setError(result.msg);
          setToastColor(colors.green)
          setShowError(true);
          setTimeout(() => {
            setShowError(false);
            setToastColor(colors.red)
            StorageServices.setItem(AUTH,result?.user)
            StorageServices.setItem(TOKEN,result?.token)
            StorageServices.setItem(REMEMBER,isRemember)

            dispatch(setToken(result?.token))
            dispatch(setRemember(isRemember))

            console.log("ResulatTokencbcb",result?.user,result?.token)

            dispatch(setUserData(result?.user))
            navigation.navigate("Tabs", {
      
            });


            // navigation.navigate("ConfirmationCode", {
            //   data: { email: values.email },
            // });
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
        style={{ flex: 1, backgroundColor: "transparent"}}
        // extraScrollHeight={-100}
      >
        <SafeAreaView style={{flex:1}}>
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
            {/* <Spacer height={10}/> */}
            <CustomText
              text={"Welcome back!"}
              color={colors.white}
              size={21}
              style={{ textAlign: "center" }}
              fontFam="Poppins-Medium"
              fontWeight="500"
            />
            <Spacer height={10} />
            <Input
              label="Email Address"
              value={values.email}
              onChangeText={(txt: string) => {
                setValues({ ...values, email: txt });
              }}
              placeholder="Enter your email address"
            />

            {/* <CustomTextInput
          label="Email Address"
          placeholder="Enter your login email address"
        /> */}
            <Spacer height={7} />
            <Input
              label="Password"
              placeholder="Enter your password"
              isPassword={showPassword}
              value={values.password}
              onChangeText={(txt: string) => {
                setValues({ ...values, password: txt });
              }}
              onShowPassword={() => setShowPAssword(!showPassword)}
              source={showPassword ? images.eyeclose : images.eye}
            />
            <Spacer height={verticalScale(10)} />

            <View style={{...appStyles.rowjustify,paddingVertical:verticalScale(5)}}>
              <TouchableOpacity
              activeOpacity={0.6}
              onPress={()=>setIsRemember(!isRemember)}
               style={appStyles.row}>
                <CheckBox
                  isRemember={isRemember}
                  setIsRemember={setIsRemember}
                />

                <Spacer width={scale(7)} />
                <CustomText
                  text={"Remember Me"}
                  color={colors.white}
                  size={13}
                  style={{ textAlign: "center" }}
                  fontFam="Poppins-Medium"
                  fontWeight="500"
                />
              </TouchableOpacity>
            </View>
            <Spacer height={verticalScale(10)} />

            <Button
              text="SIGN IN"
              width={"100%"}
              onPress={onLogin}
              fontWeight={"500"}
              size={18}
              textColor={colors.black}
              bgColor={colors.white}
            />
            <Spacer height={verticalScale(25)} />

            <View style={{ height: 1, backgroundColor: colors.white }} />
            <Spacer height={20} />
            <View style={{ ...appStyles.row, justifyContent: "center" }}>
              <NewText
                text={"Don’t have an account ? "}
                color={colors.white}
                size={13}
                style={{ textAlign: "center" }}
                fontFam="Poppins-Medium"
                fontWeight="500"
              />
              <TouchableOpacity
                onPress={() => navigation.navigate("FirstSignup")}
                activeOpacity={0.6}
              >
                <NewText
                  text={"Sign up"}
                  color={colors.white}
                  size={13}
                  textDecorationLine={"underline"}
                  style={{ textAlign: "center" }}
                  fontFam="Poppins-Medium"
                  fontWeight="500"
                />
              </TouchableOpacity>
            </View>

            <Spacer height={verticalScale(8)} />
            <TouchableOpacity
            activeOpacity={0.6}
            onPress={()=>navigation.navigate("LostPassword")}
            >
              <NewText
                text={"Forgot password?"}
                color={colors.white}
                size={13}
                style={{ textAlign: "center" }}
                textDecorationLine={"underline"}
                fontFam="Poppins-Medium"
                fontWeight="500"
              />
            </TouchableOpacity>
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

export default Login;

const styles = StyleSheet.create({
  checkBox: {
    width: 21,
    height: 21,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
});
