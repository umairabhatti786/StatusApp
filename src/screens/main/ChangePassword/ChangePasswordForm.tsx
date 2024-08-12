import {
    FlatList,
    Image,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from "react-native";
  import React, { useState } from "react";
  import { colors } from "../../../utils/colors";
  import { useNavigation } from "@react-navigation/native";
  
  import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
  } from "react-native-responsive-screen";
  import { scale, verticalScale } from "react-native-size-matters";
  import sizeHelper from "../../../utils/helpers/sizeHelper";
  import CustomTextInput from "../../../components/CustomTextInput";
  import { Spacer } from "../../../components/Spacer";
  import { images } from "../../../assets/images";
import NewText from "../../../components/NewText";
import CustomLine from "../../../components/CustomLine";
  
  const ChangePasswordForm = ({values,setValues,}:any) => {
    const navigation = useNavigation();
    const [showPassword, setShowPAssword] = useState(true);
    const [showConfirmPassword, setShowConfirmPAssword] = useState(true);

  
    return (
      <View style={{ flex: 1 }}>
        <View style={{padding:scale(15)}}>
        <CustomTextInput
          label="Current Password"
          placeholder="Enter current password"
          value={values?.currentPassword}
          onChangeText={(txt: string) => {
            setValues({ ...values, currentPassword: txt });
          }}
        />
                <Spacer height={7} />
                <TouchableOpacity
                            onPress={()=>navigation.navigate("LostPassword")}

                
                activeOpacity={0.6}
                >
                <NewText
            text={"Forgot password?"}
            color={colors.white}
            size={13}
            // style={{marginTop:verticalScale(15)}}
            textDecorationLine={"underline"}

            fontFam="Poppins-Medium"
            fontWeight="500"
          />

                </TouchableOpacity>

        </View>
        
      

          
        <Spacer height={7} />
        <CustomLine height={1}
        backgroundColor={"#2F3541"}
        
        />
        <View style={{paddingHorizontal:scale(15)}}>
        <CustomTextInput
          label="New Password"
          isPassword={showPassword}
          value={values?.newPassword}
          onChangeText={(txt: string) => {
            setValues({ ...values, newPassword: txt });
          }}
          onShowPassword={() => setShowPAssword(!showPassword)}
          placeholder="At least 6 characters"
          source={showPassword ? images.eyeclose : images.eye}
        />
        <Spacer height={7} />
        <CustomTextInput
          label="Confirm New Password"
          isPassword={showConfirmPassword}
          value={values?.confirmNewPassword}
          onChangeText={(txt: string) => {
            setValues({ ...values, confirmNewPassword: txt });
          }}
          onShowPassword={() => setShowConfirmPAssword(!showConfirmPassword)}
          placeholder="At least 6 characters"
          source={showConfirmPassword ? images.eyeclose : images.eye}
        />

        </View>
       
      </View>
    );
  };
  
  export default ChangePasswordForm;
  
  const styles = StyleSheet.create({
    rowConttainer: {
      height: verticalScale(50),
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.primary,
    },
  });
  