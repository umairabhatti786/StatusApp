import {
  Alert,
    FlatList,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from "react-native";
  import React, { useState } from "react";
  import { appStyles } from "../../../utils/AppStyles";
  import { images } from "../../../assets/images";
  import CustomText from "../../../components/CustomText";
  import { colors } from "../../../utils/colors";
  import { useNavigation } from "@react-navigation/native";

  import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
  } from "react-native-responsive-screen";
  import AbsoluteHeader from "../../../components/AbsoluteHeader";
  import { scale, verticalScale } from "react-native-size-matters";
  import sizeHelper from "../../../utils/helpers/sizeHelper";
  import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CustomButton from "../../../components/CustomButton";
import { windowWidth } from "../../../utils/Dimensions";
import ChangePasswordForm from "./ChangePasswordForm";
import ErrorToast from "../../../components/ErrorToast";
import { Spacer } from "../../../components/Spacer";
import { useDispatch, useSelector } from "react-redux";
import { ChangeUserPassword } from "../../../api/ApiServices";
import { getToken, getUserData, setIsSuccess, setSuccessResponse } from "../../../redux/reducers/authReducer";
import CustomToast from "../../../components/CustomToast";
import Loader from "../../../components/Loader";
import Button from "../../../components/Button";
import NewText from "../../../components/NewText";

  
  const ChangePassword = () => {
    const navigation = useNavigation();
    const [showError, setShowError] = useState(false);
    const [toastColor,setToastColor]=useState(colors.red)
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const userData=useSelector(getUserData)
    const token=useSelector(getToken)

    const dispatch=useDispatch()

    console.log("userData",userData,token)

  
    const [values, setValues] = useState({
      currentPassword:"",
      newPassword: "",
      confirmNewPassword:""
    });

    const onChangePassword = () => {
      if (!values?.currentPassword) {
        setError("Current Password is required");
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
        }, 4000);
  
        return;
      }
  
  
      if (!values?.newPassword) {
        setError("New  Password is required");
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
        }, 4000);
        return;
      }
      if (values?.newPassword.length < 6) {
        setError("password At least 6 characters");
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
        }, 4000);
        return;
      }
      if (values?.confirmNewPassword!=values.newPassword) {
        setError("Password not match");
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
        }, 4000);
        return;
      }
      setLoading(true);

      const form = new FormData()
      form.append("currentPassword", values.currentPassword);
      form.append("newPassword", values.newPassword);  
      ChangeUserPassword(form, token,async ({ isSuccess, response }: any) => {
        console.log("changePasswordStatus", response);

        if (isSuccess) {
          let result = JSON.parse(response);
  
          if (result.status) {
            setLoading(false);
  
              dispatch(setIsSuccess(true))
              let res:any={
                label:"Success!",
                text:"Your password has been changed"


              }
              dispatch(setSuccessResponse(res))
              navigation.goBack()
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

       <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={appStyles.main}
        // extraScrollHeight={-100}
      >
         <View style={appStyles.main}>
        <AbsoluteHeader>
          <TouchableOpacity 
            style={{ width: "11%",height:40,justifyContent:"center", }}

          onPress={() => navigation.goBack()}>
            <Image
              style={{ width: wp(4.6), height: hp(2.6) }}
              resizeMode="contain"
              source={images.crossicon}
            />
          </TouchableOpacity>
          <CustomText
            fontWeight="600"
            color={colors.white}
            fontFam="Poppins-Medium"
            size={18}
            text={"Change Password"}
          />
          <CustomText color={"transparent"} size={18} text={"sss"} />
        </AbsoluteHeader>
        <View
        // style={{padding:scale(15)}}
        >
            <ChangePasswordForm
            values={values}
            setValues={setValues}
            />


          

<Button
          text="Update Password"
          // width={windowWidth/2.5}
          // size={17}
          paddingHorizontal={scale(20)}
          height={33}
          borderRadius={scale(20)}
          size={14}
          onPress={onChangePassword}
          
          style={{alignSelf:"center",marginTop:verticalScale(30)}}
          // onPress={()=>{
          //   dispatch(setIsVerify(true))
          //   dispatch(setVerifyData({
          //       label:"Success!",
          //       text:"Your password has been changed"

          //   }))
          //   navigation.goBack()
          // }}
          fontWeight={"600"}
          fontFam={"Poppins-SemiBold"}
          bgColor={colors.white}
          textColor={colors.black}
          />
            <TouchableOpacity>
    

        </TouchableOpacity>
             



        </View>

        {/* <View style={{paddingHorizontal:scale(10),marginTop:"20%"}}>
        <ErrorToast
          text="Invalid password"
          />
          <Spacer  height={verticalScale(15)}/>
             <ErrorToast
          text="mismatched passwords"
          />
           <Spacer  height={verticalScale(15)}/>
          


        </View> */}
        
  
      
      </View>
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
  
  export default ChangePassword;
  
  const styles = StyleSheet.create({
    rowConttainer:{
      height: verticalScale(50),
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.primary,
    }
  
  });
  