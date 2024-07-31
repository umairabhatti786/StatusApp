import React, { useState,useEffect } from "react";
import {
  View,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import ScreenLayout from "../../../components/ScreenLayout";
import InfoHeader from "../../../components/InfoHeader";
import CustomText from "../../../components/CustomText";
import { font } from "../../../utils/font";
import { colors } from "../../../utils/colors";
import { images } from "../../../assets";
import SettingCards from "../../../components/SettingCards";
import { appStyles } from "../../../utils/AppStyles";
import { DelIVERY_ADDRESS, SELECTED_PAYMENT_METHOD, StorageServices } from "../../../utils/hooks/StorageServices";
import { useDispatch, useSelector } from "react-redux";
import { getToken, setEmptyUserData, setUserData } from "../../../redux/reducers/authReducer";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import CustomToast from "../../../components/CustomToast";
import { getLocalizeFile } from "../../../redux/reducers/localizeReducer";
import { setCartData, setEmptyCard } from "../../../redux/reducers/cartReducer";
import { getRewardBadge, isiPad } from "../../../utils/CommonFun";
import { CommonActions, useIsFocused } from '@react-navigation/native';
import { ApiServices } from "../../../api/ApiServices";
import { verticalScale } from "react-native-size-matters";

type Props = {
  navigation?: any;
};
const Profile = ({ navigation }: Props) => {
  const dispatch = useDispatch();
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<any>("");
  const localize:any=useSelector(getLocalizeFile)
  const token=useSelector(getToken)
  const focused=useIsFocused()
  const [pointsData, setPointsData] = useState<any>({
    tier_bronze_points: '',
    tier_silver_points: '',
    tier_gold_points: '',
    tier_platinum_points: '',
    points_balance: '',
    tier_level: '',
  });

  useEffect(()=>{
    getUserPointsData()


  },[focused])
console.log("pointsData",pointsData)
  const getUserPointsData = () => {
    ApiServices.getPointsData(
      token,
      async ({isSuccess, response}: any) => {
        if (isSuccess) {
          if (response?.success) {
            setPointsData(response?.data);
          } else {
            console.log('error', response);
          }
        } else {
          // Alert.alert("Alert!", "Something went wrong");
        }
      },
    );
  };
console.log("LogourLocan",localize?.profile_setting_lagout_alert_description)
  const _handleSignOut = async () => {
    GoogleSignin.configure();
    // (await GoogleSignin.signIn()) && (await GoogleSignin.signOut());
    await GoogleSignin.signOut()
    StorageServices.removeItems("userData");

    dispatch(setUserData(null));
    dispatch(setEmptyCard([]));
    StorageServices.removeItems("userData");
    StorageServices.removeItems(SELECTED_PAYMENT_METHOD);
    StorageServices.removeItems(DelIVERY_ADDRESS)
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      })
    )
    // navigation.dispatch(
    //   CommonActions.reset({
    //     index: 0,
    //     routes: [{name: 'Home'}],
    //   }),
    // );
    // navigation.dispatch(
    //   CommonActions.reset({
    //     index: 0,
    //     routes: [
    //       {
    //         name: 'Login',
    //         params: { isLogut:true },
    //       },
    //     ],
    //   })
    // )
    navigation.navigate("Home",)

  };
  const onLogout = () => {
    Alert.alert(`${localize?.profile_setting_logout_alert_title}`, `${localize?.profile_setting_logout_alert_description}`, [
      {
        text:`${localize?.profile_setting_logout_alert_cancel_button}`,
        onPress: () => console.log("Cancel Pressed"),
        // style: "cancel",
      },
      { text: `${localize?.profile_setting_logout_alert_Logout_button}`, onPress: _handleSignOut, style: "destructive" },
    ]);
  };

  const settingCards = [
    {
        title: localize?.profile_setting_payment_title,
        screen: "Payments"
    },
    {
      title: localize?.profile_setting_order_history_title,
      screen: "OrderHistory"
    },
    {
      title: localize?.profile_setting_privacy_Security_title,
      screen: "Privacy"
    },
    {
      title: localize?.profile_setting_privacy_notifications_title,
      screen: "NotificationSettings"
    },
    {
      title: localize?.profile_setting_loyalty_points_history_title,
      screen: "PointsHistory"
    },
    {
      title: localize?.profile_setting_about_us_title,
      screen: "AboutUs"
    },
]

  return (
    <>
      <ScreenLayout
        navigation={navigation}
        title={localize?.profile_setting_title}
        style={{
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            height: "100%",
          }}
        >
          <InfoHeader
            isEdit={() => {
              navigation.navigate("ProfileUpdate");
            }}
            isShowBadge={ Number(pointsData?.points_balance)>0&& Number(pointsData?.points_balance) >= Number(pointsData.tier_bronze_points)?true:false}
            badgeImage={getRewardBadge(Number(pointsData?.points_balance),pointsData)}
            editTitle={localize?.profile_setting_edit_profile}
            isEditable={true}
            setShowError={setShowError}
            setErrorMessage={setErrorMessage}
          />
          <View
            style={{
              backgroundColor: colors.white,
              paddingHorizontal: 20,
              paddingBottom: "50%",
              borderRadius:10,
              marginTop:verticalScale(10)

              
            }}
          >
            {settingCards.map((x, index) => {
              return (
                <SettingCards
                  key={index}
                  index={index}
                  size={isiPad?20:14}

                  navigation={navigation}
                  title={x.title}
                  screen={x.screen}
                />
              );
            })}
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                onLogout();
              }}
              style={{
                paddingVertical: 19,
                paddingHorizontal: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <CustomText
                text={localize?.profile_setting_logout_title}
                size={isiPad?20 :15}
                
                fontWeight={"500"}
                // fontFam={font.montserratBold}
                color={colors.primary}
              />
            </TouchableOpacity>

          </View>
        </View>
      </ScreenLayout>

      <CustomToast
        isVisable={showError}
        setIsVisable={setShowError}
        message={errorMessage}
        color={colors.white}
      />
    </>

  );
};
export default Profile;
