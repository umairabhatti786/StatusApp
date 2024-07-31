import React, { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { appStyles } from "../../../utils/AppStyles";
import { colors } from "../../../utils/colors";
import Header from "../../../components/Header";
import HomeRewards from "../../../components/HomeRewards";
import CustomText from "../../../components/CustomText";
import { font } from "../../../utils/font";
import { images } from "../../../assets";
import { getToken, getUserData } from "../../../redux/reducers/authReducer";
import { useDispatch, useSelector } from "react-redux";
import { Spacer } from "../../../components/Spacer";
import { getLocalizeFile } from "../../../redux/reducers/localizeReducer";
import { ApiServices } from "../../../api/ApiServices";
import CustomToast from "../../../components/CustomToast";
import { useIsFocused } from "@react-navigation/native";
import ScreenLoader from "../../../components/ScreenLoader";
import SimpleLoader from "../../../components/SimpleLoader";
import { createDynamicLink } from "../../../utils/hooks/FirebaseServices";
import Clipboard from "@react-native-clipboard/clipboard";
import { RewardLayout } from "../../../utils/Layouts/RewardLayout";
import { isiPad, sessionCheck, windowWidth } from "../../../utils/CommonFun";
import { scale, verticalScale } from "react-native-size-matters";

type Props = {
  navigation?: any;
};
const windowHeight = Dimensions.get("window").height;
type LoyaltyPoints = {
  tier_bronze_points: string;
  tier_silver_points: string;
  tier_gold_points: string;
  tier_platinum_points: string;
  points_balance: string;
  tier_level: string;
};
const Rewards = ({ navigation }: Props) => {
  const userData = useSelector(getUserData);
  const localize: any = useSelector(getLocalizeFile);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [isMessage, setIsMessage] = useState<boolean>(false);
  // const [loyaltyContent, setLoyaltyContent] = useState<loyaltyContent>();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pointsData, setPointsData] = useState<LoyaltyPoints>();
  const token = useSelector(getToken);
  const focused = useIsFocused();
  const [referralLink, setReferralLink] = useState<string>("");
  const dispatch=useDispatch()
  useEffect(() => {
    getContent();
    createReferLink();
  }, []);

  useEffect(() => {
    getUserPoints();
    createReferLink()
  }, [focused]);
  useEffect(() => {
    createReferLink();
  }, []);

  const getUserPoints=()=>{
    ApiServices.getPointsData(token, async ({ isSuccess, response }: any) => {
      setIsLoading(false);
      if (isSuccess) {
        if (response?.success) {
          setPointsData(response?.data);
          setIsRefreshing(false);
        } else {
          setIsRefreshing(false);
          if (response?.app_update_status==1 ||response?.session_expire) {
            sessionCheck(response?.app_update_status,response?.session_expire,dispatch);
            return;
          }
          setMessage(response?.message);
        }
      } else {
        setIsRefreshing(false);
        Alert.alert("Alert!", "Something went wrong");
      }
    });


  }




  const createReferLink = async () => {
    const url = await createDynamicLink(userData?.qr_code);
    setReferralLink(url);
  };

  const getContent = () => {
    setIsLoading(true);
    ApiServices.getPointsData(token, async ({ isSuccess, response }: any) => {
      setIsLoading(false);

      if (isSuccess) {
        if (response?.success) {
          setPointsData(response?.data);
          setIsLoading(false);
        } else {
          setIsLoading(false);

          if (response?.app_update_status==1 ||response?.session_expire) {
            sessionCheck(response?.app_update_status,response?.session_expire,dispatch);
            return;
          }

          setMessage(response?.message);
          setIsMessage(true);
        }
      } else {
        setIsLoading(false);
      }
    });
  };

  const onCopy = () => {
    Clipboard.setString(referralLink);
    setMessage("Referral link copied");
    setIsMessage(true);
  };

  const onRefresh = () => {
    setIsRefreshing(true);

    ApiServices.getPointsData(token, async ({ isSuccess, response }: any) => {
      setIsLoading(false);
console.log("response",response)
      if (isSuccess) {
        if (response?.success) {
          setPointsData(response?.data);
          setIsRefreshing(false);
        } else {
          setIsRefreshing(false);
          if (response?.app_update_status==1 ||response?.session_expire) {
            sessionCheck(response?.app_update_status,response?.session_expire,dispatch);
            return;
          }
          setMessage(response?.message);
        }
      } else {
        setIsRefreshing(false);
        Alert.alert("Alert!", "Something went wrong");
      }
    });
  };
  return (
    <>
      <SafeAreaView style={appStyles.rootContainer}>
        <View style={{ marginHorizontal: 20, paddingBottom: 10 }}>
          <Header
            primaryTitle="Rewards"
            navigation={navigation}
            image={userData?.profile_picture}
          />
        </View>

        <ScrollView
          contentContainerStyle={{
            height: "100%",
            backgroundColor: colors.offWhite,
          }}
          style={{
            backgroundColor: colors.offWhite,
          }}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }
        >
          <View
            style={{
              flex: 1,
              zIndex: 9999,
              backgroundColor: colors.offWhite,
            }}
          >
            {isLoading ? (
              <RewardLayout />
            ) : (
              <View style={{ marginHorizontal: 20, flex: 1 }}>
                <HomeRewards
                  rewardsTitle={localize?.reward_title}
                  pointsTitle={localize?.rewards_points}
                  totalPoints={300}
                  hideRedeemButton={true}
                  tierSilverPoints={Number(pointsData?.tier_silver_points)}
                  tierBronzePpoints={Number(pointsData?.tier_bronze_points)}
                  tierGoldPoints={Number(pointsData?.tier_gold_points)}
                  tierPlatinumPoints={Number(pointsData?.tier_platinum_points)}
                  points={
                    pointsData?.points_balance == undefined
                      ? 0
                      : Number(pointsData?.points_balance)
                  }
                />
                <View style={{ flex: 1 }}>
                  <View
                    style={{
                      ...appStyles.row,
                      marginTop: 30,
                      marginBottom: 20,
                      justifyContent: "space-between",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => navigation.navigate("Earn", {})}
                      style={styles.redeemContainer}
                    >
                      <Image
                        source={images.arrow}
                        resizeMode="contain"
                        style={{ width: scale(18), height: scale(18), alignSelf: "flex-end" }}
                      />

                      <View
                        style={{
                          // backgroundColor: "red",
                          flexWrap: "nowrap",
                          marginTop: -5,
                        }}
                      >
                        <Image
                          source={images.earn}
                          style={{ width: scale(30), height: scale(30) }}
                        />
                        <Spacer height={10} />
                      </View>

                      <CustomText
                        text={localize?.reward_earn_title}
                        size={ isiPad?18: 14}
                        fontFam={font.montserratMedium}
                        fontWeight="500"
                        color={colors.primary}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      activeOpacity={0.6}
                      onPress={() => navigation.navigate("Redeem", {})}
                      style={styles.redeemContainer}
                    >
                      <Image
                        source={images.arrow}
                        style={{ width: scale(18), height: scale(18), alignSelf: "flex-end" }}
                      />

                      <View
                        style={{
                          flexWrap: "nowrap",
                          marginTop: -5,
                        }}
                      >
                        <Image
                          source={images.redeem}
                          style={{ width: scale(30), height: scale(30) }}
                        />
                        <Spacer height={10} />
                      </View>

                      <CustomText
                        text={localize?.reward_redeem_title}
                        size={ isiPad?18: 14}

                        fontFam={font.montserratMedium}
                        fontWeight="500"
                        color={colors.primary}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* <Spacer height={"60%"} /> */}
                {
                  userData?.token&&(
                    <>

<CustomText
                  text={localize?.Refer_title}
                  size={ isiPad?22: 18}
                  fontFam={font.montserratMedium}
                  fontWeight="500"
                  color={colors.black}
                />
                <Spacer height={10} />

                <View style={styles.referContainer}>
                  <View
                    style={{
                      ...appStyles.row,
                      justifyContent: "space-between",
                    }}
                  >
                    <CustomText
                      text={localize?.Refer_description}
                      size={isiPad?19: 14}
                      fontFam={font.montserratMedium}
                      fontWeight="500"
                      color={colors.primary}
                    />
                    <Image
                      source={images.arrow}

                      style={{width:  scale(15), height: scale(15), alignSelf: "flex-end" }}
                    />
                  </View>
                  <Spacer height={20} />
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 10,
                      marginTop: 20,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flex: 1,
                        backgroundColor: colors.grey1,
                        height: isiPad?verticalScale(30): 45,
                        paddingLeft: 10,
                      }}
                    >
                      <View style={{ flex: 1, marginRight: 10 }}>
                        <CustomText
                          text={referralLink}
                          size={14}
                          fontWeight="500"
                          numberOfLines={1}
                          fontFam={font.montserratMedium}
                          color={colors.primary}
                        />
                      </View>
                      <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={onCopy}
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: colors.primary,
                          height: "100%",
                          width: "15%",
                        }}
                      >
                        <Image
                          source={images.copy}
                          style={{ width:  scale(13), height: scale(13) }}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                    </>
                  )
                }
               
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
      <CustomToast
        isVisable={isMessage}
        setIsVisable={setIsMessage}
        message={message}
        color={colors.white}
      />
    </>
  );
};
export default Rewards;

const styles = StyleSheet.create({
  redeemContainer: {
    width: "47%",
    height: windowHeight/6,
    borderWidth: 1.5,
    paddingLeft: scale(20),
    paddingTop: verticalScale(10),
    paddingRight: scale(10),
    borderColor: colors.primary35,
    backgroundColor: colors.white,
  },
  referContainer: {
    width: "100%",
    paddingHorizontal: 15,
    paddingVertical: 20,
    backgroundColor: colors.white,
  },
});
