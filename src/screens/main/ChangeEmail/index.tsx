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
import EmailFormInput from "./EmailFormInput";
import CustomButton from "../../../components/CustomButton";
import { windowWidth } from "../../../utils/Dimensions";
import ErrorToast from "../../../components/ErrorToast";
import { Spacer } from "../../../components/Spacer";
import { useDispatch, useSelector } from "react-redux";
import { ChangeEmailForm } from "./ChangeEmailForm";
import { ChangeUserEmail, UserSignup } from "../../../api/ApiServices";
import Loader from "../../../components/Loader";
import CustomToast from "../../../components/CustomToast";
import { getToken, getUserData, setIsSuccess, setSuccessResponse } from "../../../redux/reducers/authReducer";
interface FormValues {
  email: string;
  newEmail: string;
  confirmEmail: string;
  password: string;
}
  
  const ChangeEmail = () => {
    const navigation = useNavigation();
    const [showError, setShowError] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [toastColor,setToastColor]=useState(colors.red)
    const token=useSelector(getToken)
    const userData=useSelector(getUserData)


    const dispatch=useDispatch()
    const [values,setValues]=useState<FormValues>({
      email:userData.email,
      newEmail:"",
      confirmEmail:"",
      password:""

    })

    console.log("emailajbcd",userData.email)

 
 const onChangeEmail=()=>{
  const viladResponse = ChangeEmailForm(values, setShowError, setError);

  if (viladResponse) {
    setLoading(true);
    const data = {
      password: values.password,
      newEmail: values.newEmail,
    };
    const form = new FormData()
    form.append("password", values.password,);
    form.append("newEmail",values.newEmail);
    console.log("form",form)
    ChangeUserEmail(form, token,async ({ isSuccess, response }: any) => {
      if (isSuccess) {
        let result = JSON.parse(response);

        if (result.status) {
          setLoading(false);

          dispatch(setIsSuccess(true))
          let res:any={
            label:"Success!",
            text:"Your email has been changed"


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

    // setLoading(false)

    // console.log("ckbdckdbc",response)

    // setTimeout(() => {
    //   setLoading(false)

    // }, 4000);
  }


 }
  
   
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
            text={"Change Email"}
          />
         
          <CustomText color={"transparent"} size={18} text={"sss"} />
        </AbsoluteHeader>
        <View
        style={{padding:scale(15)}}
        >

            <EmailFormInput
            values={values}
            setValues={setValues}
            />

            <Spacer height={verticalScale(15)}/>

      


<CustomButton
          text="Update Email"
          
          paddingHorizontal={scale(20)}
          height={33}
          borderRadius={scale(20)}
          size={14}
          
          style={{alignSelf:"center"}}
          onPress={onChangeEmail}
          // onPress={()=>{
          //   dispatch(setIsVerify(true))
          //   dispatch(setVerifyData({
          //       label:"Verify your email",
          //       text:"Verification sent to your new email"

          //   }))
          //   navigation.goBack()
          // }}
          fontWeight={"600"}
          fontFam={"Poppins-SemiBold"}
          bgColor={colors.white}
          textColor={colors.black}
          />

         

             



        </View>
        {/* <View style={{paddingHorizontal:scale(10),marginTop:verticalScale(20)}}>
        <ErrorToast
          text="Invalid email address"
          />
          <Spacer  height={verticalScale(15)}/>
             <ErrorToast
          text="Invalid password"
          />
           <Spacer  height={verticalScale(15)}/>
             <ErrorToast
          text="Mismatched emails"
          />
                     <Spacer  height={verticalScale(15)}/>



        </View> */}
        
        
  
      
      </View>
        </KeyboardAwareScrollView>

        {showError && (
        <CustomToast
          showError={showError}
          setShowError={setShowError}
          text={error}
          bgColor={toastColor}
        />
      )}

      </>
       
     
    );
  };
  
  export default ChangeEmail;
  
  const styles = StyleSheet.create({
    rowConttainer:{
      height: verticalScale(50),
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.primary,
    }
  
  });
  