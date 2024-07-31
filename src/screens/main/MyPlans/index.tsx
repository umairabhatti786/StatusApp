import {
  Alert,
  Pressable,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useIsFocused } from "@react-navigation/native";
import {
  isiPad,
  sessionCheck,
  windowHeight,
  windowWidth,
} from "../../../utils/CommonFun";
import { useDispatch, useSelector } from "react-redux";
import { getToken, getUserData } from "../../../redux/reducers/authReducer";
import { getLocalizeFile } from "../../../redux/reducers/localizeReducer";
import PlanCard from "../../../components/PlanCard";
import CustomText from "../../../components/CustomText";
import Header from "../../../components/Header";
import { colors } from "../../../utils/colors";
import { appStyles } from "../../../utils/AppStyles";
import { font } from "../../../utils/font";
import { useCallback, useEffect, useState } from "react";
import { membershipLoading } from "../../../redux/reducers/membershipReducer";
import { MemberShipLayout } from "../../../utils/Layouts/MemberShipLayout";
import { ApiServices } from "../../../api/ApiServices";
import CustomToast from "../../../components/CustomToast";
import {
  SELECTED_PAYMENT_METHOD,
  StorageServices,
} from "../../../utils/hooks/StorageServices";
import { URLS } from "../../../api/urls";
import SimpleLoader from "../../../components/SimpleLoader";
import * as Animatable from "react-native-animatable";
import {
  getSelectedPlain,
  setSelectedPlain,
} from "../../../redux/reducers/homePageReducer";
import { useFocusEffect } from "@react-navigation/native";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
type Props = {
  navigation?: any;
  route?: any;
};
const MyPlans = ({ navigation, route }: Props) => {
  const userData = useSelector(getUserData);

  // const isPurchase = route?.params?.isPurchase;

  const [isPurchase, setIsPurchase] = useState(route?.params?.isPurchase);
  const localize: any = useSelector(getLocalizeFile);
  const expanded = useSharedValue(0);
  const [containerPadding, setContainerPadding] = useState(100);
  const token = useSelector(getToken);
  const [membership, setMembership] = useState([]);
  const loading = useSelector(membershipLoading);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isReload, setIsReload] = useState(false);

  const [isRefresh, setIsRefresh] = useState(false);
  const [message, setMessage] = useState("");
  const [isMessage, setIsMessage] = useState<boolean>(false);
  const [subscribedMembereShip, setSubscribedMembereShip] = useState<any>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<any>();
  const selectedPlain = useSelector(getSelectedPlain);
  const focused = useIsFocused();
  console.log("selectedPaymentMethod", subscribedMembereShip?.price_per_year);

  useEffect(() => {
    // if (isPurchase) {
    //   // setSelectedPaymentMethod(delPayment);
    // }
    getSelectedPaymentMethod();
  }, [focused]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // Logic to run when the screen is focused
      if (route.params?.isPurchase) {
        navigation.setParams({ isPurchase: null });

        onBuySubscription(selectedPlain);

        // Perform actions based on isPurchase
      }
    });

    // Cleanup the listener on unmount
    return unsubscribe;
  }, [navigation, route.params?.isPurchase]);

  useEffect(() => {
    getMemberShipsData();
    getSelectedPaymentMethod();
  }, []);

  useEffect(() => {}, [isReload, isRefresh, focused]);

  const getSelectedPaymentMethod = async () => {
    const payment = await StorageServices.getItem(SELECTED_PAYMENT_METHOD);
    let delPayment = JSON.parse(payment);
    setSelectedPaymentMethod(delPayment);
    console.log("selectedPaymccentMethod", selectedPaymentMethod);
  };

  const getMemberShipsData = () => {
    setIsLoading(true);
    ApiServices.getMemberShips(token, async ({ isSuccess, response }: any) => {
      if (isSuccess) {
        if (response?.success) {
          setMembership(
            response?.data?.memberships.map((membership: any) => ({
              ...membership,
              isYearly: true,
            }))
          );
          setSubscribedMembereShip(response?.data?.subscribed_membership);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          if (response?.app_update_status == 1 || response?.session_expire) {
            sessionCheck(
              response?.app_update_status,
              response?.session_expire,
              dispatch
            );
            return;
          }
          setMessage(response?.message);
          setIsMessage(true);
        }
      } else {
        setIsLoading(false);
        Alert.alert("Alert!", "Something went wrong");
      }
    });
  };
  const handleCardPress = () => {
    if (expanded.value == 0) {
      setContainerPadding(750);
      expanded.value = 1;
    } else if (expanded.value == 1) {
      setContainerPadding(500);

      expanded.value = 0;

      // navigation.navigate("CardDetail", { card });
    }
  };

  const getAnimatedStyle = (index: number) => {
    return useAnimatedStyle(() => {
      const initialSpace = (index + 1) * 70;
      const expandedSpace = (index * windowHeight) / 3.8;
      const extraSpace = initialSpace / (index + 1) + index * 10;

      const translateY =
        expanded.value === 1 ? expandedSpace + extraSpace : initialSpace;

      return {
        transform: [
          {
            translateY: withSpring(translateY, {
              mass: expanded.value ? 0.5 : 1,
            }),
          },
        ],
      };
    });
  };
  const closeButtonAStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(expanded.value),
    };
  });
  const titleAstyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(expanded.value === 0 ? windowWidth / 2.9 : 0),
        },
      ],
    };
  });
  const closePressed = () => {
    expanded.value = 0;
  };
  const createButtonAStyle = useAnimatedStyle(() => {
    return {
      position: "absolute",
      bottom: 50,
      left: windowWidth / 2 - 30,
      borderRadius: 30,
      alignItems: "center",
      backgroundColor: "#2196F3",
      justifyContent: "center",
      width: 60,
      height: 60,
      opacity: withTiming(expanded.value === 1 ? 0 : 1),
    };
  });

  // useFocusEffect(
  //   useCallback(() => {
  //     return () => {
  //       setIsPurchase("")
  //       // dispatch(setSearchBarnches({}));
  //       // setSearch("")
  //     };
  //   }, [])
  // );

  const refreshMemberShip = (setIsRefresh: any) => {
    ApiServices.getMemberShips(token, async ({ isSuccess, response }: any) => {
      if (isSuccess) {
        if (response?.success) {
          console.log("MembersShipRefresh", response?.data?.memberships);
          setMembership(
            response?.data?.memberships.map((membership: any) => ({
              ...membership,
              isYearly: true,
            }))
          );
          setSubscribedMembereShip(response?.data?.subscribed_membership);
          setIsRefresh(false);
        } else {
          setIsRefresh(false);
          if (response?.app_update_status == 1 || response?.session_expire) {
            sessionCheck(
              response?.app_update_status,
              response?.session_expire,
              dispatch
            );
            return;
          }
          setMessage(response?.message);
          setIsMessage(true);
        }
      } else {
        setIsRefresh(false);

        Alert.alert("Alert!", "Something went wrong");
      }
    });
  };

  const onBuySubscription = async (item: any) => {
    const payment = await StorageServices.getItem(SELECTED_PAYMENT_METHOD);
    let paymentCard = JSON.parse(payment);

    console.log("paymentCard", paymentCard);

    if (item?.action != "cancel") {
      if (paymentCard?.id == null) {
        dispatch(setSelectedPlain(item));
        navigation.navigate("Payments", {
          isPlan: true,
        });

        return;
      }
    }

    const formData = new FormData();
    formData.append("membership_id", item?.id);
    formData.append("is_auto_renew", true);
    formData.append("period", item?.isYearly ? "year" : "month");
    formData.append("pm_id", paymentCard?.id);

    setIsRefresh(true);
    ApiServices.buySubscription(
      formData,
      token,
      item.action == "buy"
        ? URLS.BUY_SUBSCRIPTION
        : item.action == "upgrade"
        ? URLS?.UPGRADE_SUBSCRIPTION
        : item.action == "cancel" && URLS?.CANCEL_SUBSCRIPTION,
      async ({ isSuccess, response }: any) => {
        if (isSuccess) {
          if (response?.success) {
            refreshMemberShip(setIsRefresh);
            setMessage(response?.message);
            setIsMessage(true);
          } else {
            setIsRefresh(false);

            if (response?.app_update_status == 1 || response?.session_expire) {
              sessionCheck(
                response?.app_update_status,
                response?.session_expire,
                dispatch
              );
              return;
            }

            setMessage(response?.message);
            setIsMessage(true);
          }
        } else {
          setIsRefresh(false);

          Alert.alert("Alert!", "Network Error.");
        }
      }
    );
  };

  const onRefresh = () => {
    refreshMemberShip(setIsReload);
  };
  return (
    <>
      <SafeAreaView
        style={{ minHeight: windowHeight, backgroundColor: colors.white }}
      >
        <StatusBar barStyle={"dark-content"} backgroundColor={"#fff"} />
        <View style={{ marginHorizontal: 25, paddingBottom: 10 }}>
          <Header
            primaryTitle={localize?.plans_title}
            navigation={navigation}
            image={userData?.profile_picture}
          />
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            backgroundColor: colors.white,
            flexGrow: 1,
            paddingBottom: containerPadding,
          }}
          style={{
            ...appStyles.mainContainer,
            backgroundColor: colors.white,
            flex: 1,
          }}
          refreshControl={
            <RefreshControl refreshing={isReload} onRefresh={onRefresh} />
          }
        >
          {isLoading ? (
            <>
              <View style={{ marginHorizontal: 5, flex: 1 }}>
                <MemberShipLayout />
              </View>
            </>
          ) : (
            <View style={{ marginHorizontal: 5, flex: 1 }}>
              {subscribedMembereShip && (
                <View>
                  <CustomText
                    text={localize?.current_plan_title}
                    size={isiPad ? 25 : 20}
                    fontWeight="600"
                    fontFam={font.montserratMedium}
                    style={{ marginVertical: 20 }}
                  />
                  <PlanCard
                    disableToggle={false}
                    onBuySubscription={() => {
                      if (!userData.token) {
                        navigation.navigate("WelcomeScreen");
                        return;
                      }
                      onBuySubscription(subscribedMembereShip);
                    }}
                    data={subscribedMembereShip}
                    periodData={
                      subscribedMembereShip?.period_per_month
                        ? subscribedMembereShip?.period_per_month
                        : subscribedMembereShip.period_per_year
                    }
                    priceData={
                      subscribedMembereShip?.price_per_month
                        ? subscribedMembereShip?.price_per_month
                        : subscribedMembereShip?.price_per_year
                    }
                  />
                </View>
              )}

              <View style={{ minHeight: "100%" }}>
                {subscribedMembereShip && (
                  <CustomText
                    text={localize?.upgrade_plan_title}
                    size={isiPad ? 25 : 20}
                    fontFam={font.montserratMedium}
                    fontWeight="600"
                    style={{ marginVertical: 20 }}
                  />
                )}

                {membership?.map((data: any, index) => {
                  // const aStyle = getAnimatedStyle(index);
                  return (
                    <Animatable.View
                      duration={1000}
                      animation={"fadeIn"}
                      delay={index * 300}
                    >
                      <AnimatedPressable
                        // onPress={() => handleCardPress()}
                        key={index}
                        style={[styles.card]}
                      >
                        <PlanCard
                          disableToggle={true}
                          onChangeToggle={() => {
                            const updates: any = [...membership];

                            // Toggle the 'active' property of the item at the specified index
                            updates[index] = {
                              ...updates[index],
                              isYearly: !updates[index].isYearly,
                            };

                            setMembership(updates);
                          }}
                          data={data}
                          periodData={
                            data?.isYearly
                              ? data.period_per_year
                              : data?.period_per_month
                          }
                          priceData={
                            data?.isYearly
                              ? data.price_per_year
                              : data?.price_per_month
                          }
                          onBuySubscription={() => {
                            if (!userData?.token) {
                              navigation.navigate("WelcomeScreen");
                              return;
                            }
                            onBuySubscription(data);
                          }}
                        />
                      </AnimatedPressable>
                    </Animatable.View>
                  );
                })}
              </View>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
      <CustomToast
        duration={4000}
        isVisable={isMessage}
        setIsVisable={setIsMessage}
        message={message}
        color={colors.white}
      />
      {isRefresh && <SimpleLoader />}
    </>
  );
};

export default MyPlans;

const styles = StyleSheet.create({
  card: {
    width: "100%",
    alignSelf: "center",
    // position: "absolute",
    marginTop: 20,
  },
  button: {
    borderRadius: 18,
    alignItems: "center",
    backgroundColor: "#2196F3",
    justifyContent: "center",
    width: 36,
    height: 36,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 15,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
