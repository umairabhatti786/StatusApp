import React, { useEffect, useState } from "react";
import {
  View,
  Dimensions,
  Image,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Animated,
  Alert,
  StyleSheet,
} from "react-native";
import ScreenLayout from "../../../components/ScreenLayout";
import CustomText from "../../../components/CustomText";
import { font } from "../../../utils/font";
import { colors } from "../../../utils/colors";
import { images } from "../../../assets";
import PaymentCard from "./PaymentCard";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../../../redux/reducers/authReducer";
import { SwipeListView } from "react-native-swipe-list-view";

import {
  fetchPaymentMethods,
  getPaymentLoading,
  getPaymentMethods,
} from "../../../redux/reducers/paymentReducer";
import { scale, verticalScale } from "react-native-size-matters";
import { isiPad, sessionCheck, splitName } from "../../../utils/CommonFun";
import HiddenCard from "./PaymentCard/HiddenCard";
import { ApiServices } from "../../../api/ApiServices";
import CustomToast from "../../../components/CustomToast";
import { useIsFocused } from "@react-navigation/native";
import {
  SELECTED_PAYMENT_METHOD,
  StorageServices,
} from "../../../utils/hooks/StorageServices";
import { getLocalizeFile } from "../../../redux/reducers/localizeReducer";

type Props = {
  navigation?: any;
  route?: any;
};
const Payments = ({ navigation, route }: Props) => {
  const token = useSelector(getToken);
  const dispatch = useDispatch();
  const paymentCards = useSelector(getPaymentMethods);
  const paymentLodaing = useSelector(getPaymentLoading);
  const rowSwipeAnimatedValues = new Animated.Value(0);
  const [message, setMessage] = useState("");
  const [isMessage, setIsMessage] = useState(false);
  let isCheckout = route?.params?.isCheckout;
  let isPlan = route?.params?.isPlan;

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<any>();
  const localize:any=useSelector(getLocalizeFile)


  const focused = useIsFocused();

  useEffect(() => {
    getSelectedPaymentMethod();
    GetPaymentCards();
   
  }, [focused]);

  const getSelectedPaymentMethod = async () => {
    const payment = await StorageServices.getItem(SELECTED_PAYMENT_METHOD);
    let delPayment = JSON.parse(payment);
    setSelectedPaymentMethod(delPayment);
    console.log("Payemnbfselejcbc",selectedPaymentMethod)
  };

  const GetPaymentCards = () => {
    dispatch(fetchPaymentMethods(token));
  };
  let cashOnDelivery = {
    title: localize?.Payment_settings_cash_on_delivery_title,
    image: images.cod,
  };

  console.log("cashOnDelivery",cashOnDelivery)
  const onSwipeValueChange = (swipeData) => {
    const { key, value } = swipeData;
    rowSwipeAnimatedValues.setValue(Math.abs(value));
  };
  const onDeleteCard = async (item: Object) => {
    let data = {
      token: token,
      id: item?.payment_method_id,
    };
    ApiServices.deleteStripePaymentMethod(
      data,
      async ({ isSuccess, response }: any) => {
        if (isSuccess) {
          const result = response;

          if (result?.success) {
            if (selectedPaymentMethod.stripeId == item?.payment_method_id) {
              StorageServices.removeItems(SELECTED_PAYMENT_METHOD);
            }
           
            GetPaymentCards();

            // setDeliveryAddress(result.data);
          } else {
            if (result?.app_update_status==1 ||result?.session_expire) {
              sessionCheck(result?.app_update_status,result?.session_expire,dispatch);
              return;
            }
            setMessage(result?.message);
            setIsMessage(true);
          }
        } else {

          Alert.alert("Alert!", "Something went wrong");
        }

        // resolve(result);
      }
    );
  };

  const onCashOnDelivery = async () => {
    if (isCheckout ) {
      let data = {
        type: "cash",
      };

      await StorageServices.setItem(
        SELECTED_PAYMENT_METHOD,
        JSON.stringify(data)
      );
      
      navigation.navigate( "Checkout");
    }


  };

  const onSelectPayment = async (da: any) => {
    if (isCheckout || isPlan) {
      let data = {
        id: da.id,
        stripeId: da.payment_method_id,
        type: "stripe",
        name: da.card_holder_name,
        card: {
          brand: da?.payment_method_response?.card?.brand,
          exp_month: da?.payment_method_response?.card?.exp_month,
          exp_year: da?.payment_method_response?.card?.exp_year,
          last4: da?.payment_method_response?.card?.last4,
        },
      };
      await StorageServices.setItem(
        SELECTED_PAYMENT_METHOD,
        JSON.stringify(data)
      );
      if(isPlan){
        navigation.navigate("MyPlans",{isPurchase:isPlan});


      }
      else {
        navigation.navigate( "Checkout");

      }
    }
  };

  return (
    <>
      <ScreenLayout
        navigation={navigation}
        title={localize?.profile_setting_payment_title}
        style={{
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            height: "100%",
          }}
        >
          {paymentLodaing ? (
            <>
              <View
                style={{
                  height: verticalScale(500),
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ActivityIndicator size={"large"} color={colors.primary} />
              </View>
            </>
          ) : (
            <View
              style={{
                // height: "95%",
                backgroundColor: colors.white,
                paddingHorizontal: 20,
                paddingBottom: "10%",
                marginTop: "10%",
              }}
            >
              <SwipeListView
                // style={{marginBottom: 20}}
                data={paymentCards}
                keyExtractor={(item) => item.id}
                leftOpenValue={0}
                rightOpenValue={-75}
                showsVerticalScrollIndicator={false}
                onSwipeValueChange={onSwipeValueChange}
                renderItem={({ item, index }) => {
                  let cardData = {
                    title: item?.payment_method_response?.card?.last4,
                  };
                  let name = splitName(item?.card_holder_name);

                  return (
                    <>
                      <PaymentCard
                        isCard={true}
                        item={item?.payment_method_response}
                        name={name[0]}
                        onPress={() => onSelectPayment(item)}
                        index={index}
                        navigation={navigation}
                        data={cardData}
                      >
                        <TouchableOpacity
                          activeOpacity={0.6}
                          style={{...styles.brandImage,}}
                        >
                          <Image
                            source={
                              item?.payment_method_response.card
                                ?.display_brand == "visa"
                                ? images.visa
                                : images.master
                            }
                            style={{
                              width: scale( isiPad?20: 28),
                              height: scale(isiPad?20: 28),
                              resizeMode: "contain",
                            }}
                          />
                        </TouchableOpacity>
                      </PaymentCard>
                    </>
                  );
                }}
                renderHiddenItem={({ item }) => {
                  return (
                    <HiddenCard
                      onDelete={() => {
                        Alert.alert(
                          `${localize?.Payment_settings_delete_card_alert_title}`,
                          `${localize?.Payment_settings_delete_card_alert_description}`,
                          [
                            {
                              text: `${localize?.Payment_settings_delete_card_alert_cancel_button}`,
                              onPress: () => console.log("Cancel Pressed"),
                              style: "cancel",
                            },
                            {
                              text: `${localize?.Payment_settings_delete_card_alert_OK_button}`,
                              onPress: () => onDeleteCard(item),
                            },
                          ]
                        );
                      }}
                    />
                  );
                }}
              />
              {
                isCheckout&&(
                  <PaymentCard
                  onPress={onCashOnDelivery}
                  navigation={navigation}
                  data={cashOnDelivery}
                >
                  <Image
                    source={cashOnDelivery.image}
                    style={{
                      width: isiPad?50:  scale(30),
                      height: isiPad?50:  scale(30),
                      resizeMode: "contain",
                      // marginRight: 30
                    }}
                  />
                </PaymentCard>

                )
              }

              
       

              <Pressable
                onPress={() => {
                  navigation.navigate("AddPayment");
                }}
              >
                <View
                  style={{
                    height:isiPad?verticalScale(35): 56,
                    marginTop: "6%",
                    backgroundColor: colors.white,
                    alignItems: "center",
                    paddingHorizontal: 15,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    borderWidth: 1.5,
                    borderColor: colors.primary35,
                    
                  }}
                >
                  <CustomText
                    text={localize?.Payment_settings_add_payment_title}
                    size={isiPad?18: 14}
                    fontWeight="500"
                    fontFam={font.montserratBold}
                    color={colors.primary}
                  />
                  <View
                    style={{
                      width: isiPad?40: 30,
                      height: isiPad?40: 30,
                      backgroundColor: colors.primary,
                      borderRadius: 9999,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      resizeMode="contain"
                      style={{ width:isiPad?18:  12, height: isiPad?18: 12 }}
                      source={images.plus}
                    />
                  </View>
                </View>
              </Pressable>
            </View>
          )}
        </View>
      </ScreenLayout>

      <CustomToast
        isVisable={isMessage}
        setIsVisable={setIsMessage}
        message={message}
        color={colors.white}
      />
    </>
  );
};
export default Payments;

const styles = StyleSheet.create({
  brandImage: {
    width: scale( isiPad?30: 35),
    height: scale(isiPad?20: 27),
    borderRadius: scale(5),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
});
