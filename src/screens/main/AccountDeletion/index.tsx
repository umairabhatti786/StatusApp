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
import CustomToast from "../../../components/CustomToast";
import Loader from "../../../components/Loader";
import { DeleteAccount } from "../../../api/ApiServices";
import { useDispatch, useSelector } from "react-redux";
import { getToken, getUserData, setToken, setUserData } from "../../../redux/reducers/authReducer";
import { AUTH, StorageServices } from "../../../utils/hooks/StorageServices";

const AccountDeletion = () => {
  const navigation = useNavigation();
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const token=useSelector(getToken)

  const dispatch=useDispatch()


  const _deleteAccount = async(item: any) => {

    setLoading(true)
    const userInfo:any = await StorageServices.getItem(AUTH);
    DeleteAccount({id:userInfo.id},token, async ({ isSuccess, response }: any) => {
      // console.log(response)
      if (isSuccess) {
        let result = JSON.parse(response);
        console.log("ckdnckdnc", result);

        if (result.status) {
          setLoading(false);

          StorageServices.removeItems()
          dispatch(setToken(null))

          dispatch(setUserData(null))
         
        } else {
          if (result.error) {
            setLoading(false);

            setError(result?.error);
            setShowError(true);
            setTimeout(() => {
              setShowError(false);

            }, 4000);
          } else {
            setLoading(false);
            setError(result?.msg);

            setShowError(true);
            setTimeout(() => {
              setShowError(false);

            }, 4000);
          }
        }
      } else {
        setLoading(false);

        Alert.alert("Alert!", "Network Error.");
      }
    });
   
  };
  const onDeleteAccount = () => {
    Alert.alert("Delete Account", "Are you sure you want to delete?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        // style: "cancel",
      },
      { text: "Delete", onPress: _deleteAccount, style: "destructive" },
    ]);
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
            text={"Account Deletion"}
          />
          <CustomText color={"transparent"} size={18} text={"sss"} />
        </AbsoluteHeader>
        <View style={{ padding: scale(20) }}>
          <View
            style={{
              width: windowWidth / 1.4,
              height: sizeHelper.calHp(600),
              alignSelf: "center",
            }}
          >
            <Image
              style={{ width: "100%", height: "100%" }}
              source={images.sad}
            />
          </View>
          <View style={{ marginHorizontal: scale(20) }}>
            <CustomText
              text={"Are you sure you want to delete?"}
              color={colors.white}
              size={16}
              style={{
                marginTop: verticalScale(5),
                marginBottom: verticalScale(5),
                textAlign: "center",
              }}
              // textDecorationLine={"underline"}

              fontFam="Poppins-Medium"
              fontWeight="500"
            />
            <CustomText
              text={
                "Please check back soon as we continue to grow into the next social media giant."
              }
              color={"#B9B9B9"}
              size={13}
              style={{
                marginTop: verticalScale(5),
                marginBottom: verticalScale(15),
                textAlign: "center",
              }}
              // textDecorationLine={"underline"}

              fontFam="Poppins-Medium"
              fontWeight="500"
            />
          </View>

          <CustomButton
            text="DELETE ACCOUNT"
            borderRadius={scale(20)}
            style={{ alignSelf: "center" }}
            paddingHorizontal={scale(15)}
            onPress={onDeleteAccount}

            // width={windowWidth/2.5}
            // size={17}
            height={verticalScale(36)}
            size={14}


            //   onPress={()=>setIsFollow(!isFollow)}
            fontWeight={"600"}
            fontFam={"Poppins-SemiBold"}
            bgColor={colors.red}
            textColor={colors.white}
          />
          <TouchableOpacity>
            <CustomText
              text={"CANCEL"}
              color={colors.white}
              size={13}
              style={{
                marginTop: verticalScale(15),
                marginBottom: verticalScale(15),
                textAlign: "center",
              }}
              textDecorationLine={"underline"}
              fontFam="Poppins-Medium"
              fontWeight="500"
            />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>

{showError && (
  <CustomToast
    showError={showError}
    setShowError={setShowError}
    bgColor={colors.red}
    text={error}
  />
)}
    </>

  );
};

export default AccountDeletion;

const styles = StyleSheet.create({
  rowConttainer: {
    height: verticalScale(50),
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
  },
});
