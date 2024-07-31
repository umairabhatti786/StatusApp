import React, {useCallback, useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  StatusBar,
  Image,
  FlatList,
  Dimensions,
  useWindowDimensions,
  Pressable,
  TouchableOpacity,
  Platform,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';
import {colors} from '../../../utils/colors';
import {images} from '../../../assets';
import CustomText from '../../../components/CustomText';
import {font} from '../../../utils/font';
import ScreenLayout from '../../../components/ScreenLayout';
import CustomLine from '../../../components/CustomLine';
import CheckoutCard from './CheckoutCard';
import AddressModal from './AddressModal';
import OrderConfirmedModal from './OrderConfirmedModal';
import PickupModal from './PickupModal';
import {useDispatch, useSelector} from 'react-redux';
import {
  getSelectedBranch,
  setSelectedBranch,
} from '../../../redux/reducers/branchesReducer';
import DineInModal from './DineInModal';
import {
  DelIVERY_ADDRESS,
  SELECTED_PAYMENT_METHOD,
  StorageServices,
} from '../../../utils/hooks/StorageServices';
import OrderSummeryCard from './OrderSummeryCard';
import {appStyles} from '../../../utils/AppStyles';
import Collapsible from 'react-native-collapsible';
import {
  getCartData,
  getPickupType,
  getTotalCartAmount,
  setCartData,
  setEmptyCard,
  setPickupType,
} from '../../../redux/reducers/cartReducer';
import {dollarSymbol, isiPad, sessionCheck} from '../../../utils/CommonFun';
import CustomButton from '../../../components/CustomButton';
import OneSignal from 'react-native-onesignal';
import {getVersion} from 'react-native-device-info';
import {StackActions} from '@react-navigation/native';

import {
  getAddressModal,
  getLoyaltyPoints,
  getToken,
  getUserData,
  setIsAddressModal,
  setLoyaltyPoints,
} from '../../../redux/reducers/authReducer';
import {useIsFocused} from '@react-navigation/native';
import PaymentCard from '../Payments/PaymentCard';
import {scale, verticalScale} from 'react-native-size-matters';
import {ApiServices} from '../../../api/ApiServices';
import CustomToast from '../../../components/CustomToast';
import AbsoluteView from '../../../components/AbsoluteView';
import ScreenLoader from '../../../components/ScreenLoader';
import {getLocationAccess} from '../../../redux/reducers/locationReducer';
import {getLocalizeFile} from '../../../redux/reducers/localizeReducer';
import Checkbox from '../../../components/Checkbox';
import {ToggleSwitch} from '../../../components/Switch';
import CustomSearch from '../../../components/CustomSearch';
import AbsoluteLoader from '../../../components/AbsoluteLoader';
import {debounce} from 'lodash'; // If using Lodash
import {Spacer} from '../../../components/Spacer';

type Props = {
  navigation?: any;
};

const windowHeight = Dimensions.get('window').height;
const Checkout = ({navigation}: Props) => {
  // const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPickupModal, setPickupModal] = useState(false);
  const [isDineInModal, setIsDineInModal] = useState(false);
  const selectedBranch:any = useSelector<any>(getSelectedBranch);
  const [tableNo, setTableNo] = useState('');
  const [seletctedAddress, setSelectedAddress] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState<any>();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<any>();
  const [showOrderSummary, setShowOrderSummary] = useState(true);
  const totalCartAmount = useSelector(getTotalCartAmount);
  const cartData = useSelector(getCartData);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const [isPayWithPoints, setIsPayWithPoints] = useState(false);
  const loyaltyPoints = useSelector(getLoyaltyPoints);
  const [promoCode, setPromoCode] = useState<any>({
    value: '',
    error: '',
    isPromoCodeValid: false,
    promoCodeData: {},
  });

  let balance = 0;

  const locationAccess = useSelector(getLocationAccess);

  const [message, setMessage] = useState('');
  const [isMessage, setIsMessage] = useState(false);
  const isModalVisible = useSelector(getAddressModal);
  const token = useSelector(getToken);
  const userData = useSelector(getUserData);

  const dispatch = useDispatch();
  const [error, setError] = useState<any>('');
  const [orderDetail, setOrderDetail] = useState<any>();
  const localize: any = useSelector(getLocalizeFile);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [entityType, setEntityType] = useState([]);
  const [subscribedMembership, setSubscribedMembership] = useState<any>(null);
  // const [ setPickup] = useState("1");
  const pickup = useSelector(getPickupType);
  const [points, setPoints] = useState(0);
  const [remainingPoints, setRemainingPoints] = useState(0);
  const [pointsPay, setPointsPay] = useState(0);
// console.log("errorro",localize?.checkout_select_address_validation_title)
  const [pointsData, setPointsData] = useState<any>({});
  const focused = useIsFocused();
  useEffect(() => {
    getUserLoyaltyPoints();

    getEntityTypes();
    getDeliveryAddress();
    getSelectedPaymentMethod();
    getUserPointsData();
    setPoints(loyaltyPoints);
    getSubscribedMembership();
  }, [focused]);

  const getUserLoyaltyPoints = () => {
    ApiServices.getPointsData(token, async ({isSuccess, response}: any) => {
      if (isSuccess) {
        if (response?.success) {
          dispatch(setLoyaltyPoints(response?.data?.points_balance));

          // setPointsData(response?.data);
        } else {
          if (response?.app_update_status == 1 || response?.session_expire) {
            sessionCheck(
              response?.app_update_status,
              response?.session_expire,
              dispatch,
            );
            return;
          }
          console.log('error', response);
        }
      } else {
        // Alert.alert("Alert!", "Network Error.");
      }
    });
  };

  useEffect(() => {
    getDeliveryAddress();
  }, [focused, isModalVisible]);

  const getSubscribedMembership = () => {
    ApiServices.getSubscribedMembership(
      token,
      async ({isSuccess, response}: any) => {
        if (isSuccess) {
          if (response?.success) {
            setSubscribedMembership(response?.data);
            // dispatch(setLoyaltyPoints(response?.data?.points_balance));
          } else {
            console.log('error', response);
          }
        } else {
          // Alert.alert("Alert!", "Network Error.");
        }
      },
    );
  };

  const getUserPointsData = () => {
    ApiServices.getPointsData(token, async ({isSuccess, response}: any) => {
      if (isSuccess) {
        if (response?.success) {
          setPointsData(response?.data);
          // setPoints(parseFloat(response?.data?.points_balance));
        } else {
          if (response?.app_update_status == 1 || response?.session_expire) {
            sessionCheck(
              response?.app_update_status,
              response?.session_expire,
              dispatch,
            );
            return;
          }
          console.log('error', response);
        }
      } else {
        // Alert.alert("Alert!", "Network Error.");
      }
    });
  };

  const getEntityTypes = () => {
    let entityTypes = selectedBranch?.type?.split('');
    setEntityType(entityTypes);

    let findPickup = entityTypes?.find((type:any) => type === pickup);
    if (!findPickup) {
      dispatch(setPickupType(entityTypes[0]));
    }
  };

  const getSelectedPaymentMethod = async () => {
    const payment = await StorageServices.getItem(SELECTED_PAYMENT_METHOD);
    let delPayment = JSON.parse(payment);
    setSelectedPaymentMethod(delPayment);
  };

  const getDeliveryAddress = async () => {
    const address = await StorageServices.getItem(DelIVERY_ADDRESS);
    let delAddress = JSON.parse(address);
    if (Object.keys(delAddress).length > 0) {
      setDeliveryAddress(delAddress);
      setSelectedAddress(delAddress);
    } else {
      setDeliveryAddress(null);
      setSelectedAddress('');
    }
  };
  const onConfirmAddress = async () => {
    await StorageServices.setItem(
      DelIVERY_ADDRESS,
      JSON.stringify(seletctedAddress),
    );
    getDeliveryAddress();
    // dispatch(setDeliveryAddress(false))
  };
  const taxCalculation = () => {
    let tax = Number(selectedBranch?.tax);

    let tex = tax / 100;

    let taxAmount =
      (totalCartAmount + calculatePackagingIncharges()) *
      //   -
      // this.discountcalculation(this.state.totalAmount)
      tex;

    // if(this.discountcalculation(this.state.totalAmount)> this.state.totalAmount)
    if (taxAmount < 0 || !taxAmount) {
      taxAmount = 0;
    }
    return taxAmount;
  };

  const deliveryCharges = (subTotal:any) => {
    const entityItem = selectedBranch;
    const userAddress = deliveryAddress;
    console.log("userAddress",userAddress)

    let deliveryCharges =
      userAddress == null ? 0.0 : parseFloat(userAddress?.delivery_charges);
    if (pickup == '1') {
      if (subTotal > entityItem?.free_delivery_above_subtotal) {
        return 0.0;
      } else if (subscribedMembership) {
        if (subscribedMembership?.free_delivery == 'Yes') {
          return 0.0;
        } else if (subTotal > subscribedMembership?.free_delivery) {
          return 0.0;
        } else {
          return deliveryCharges;
        }
      } else {
        return deliveryCharges;
      }
    } else {
      return 0.0;
    }
  };

  const calculatePromoDiscount = (data: any, totalAmount: any) => {
    let discountValue = 0;
    if (promoCode.isPromoCodeValid) {
      if (totalAmount >= parseFloat(data?.minipay)) {
        if (data?.type == 'percentage') {
          let discVal = parseFloat(data?.amount) / 100;
          discountValue = totalAmount * discVal;
          // console.log("Value")

          if (parseFloat(data.discount_cap) == 0) {
            discountValue = discountValue;
          } else if (
            discountValue >= parseFloat(data?.discount_cap) ||
            parseFloat(data.discount_cap) == 0
          ) {
            discountValue = parseFloat(data?.discount_cap);
          } else {
            return discountValue;
          }
        } else {
          if (parseFloat(data?.amount) > totalAmount) {
            return 0;
          }
          discountValue = parseFloat(data?.amount);
          if (parseFloat(data.discount_cap) == 0) {
            discountValue = discountValue;
          } else if (discountValue >= parseFloat(data?.discount_cap)) {
            discountValue = parseFloat(data?.discount_cap);
          } else {
            return discountValue;
          }
          // return discountValue;
        }
      } else {
        discountValue = 0;
      }
    }

    return discountValue;
  };

  const calculateSubscriptionDiscount = (totalAmount: any) => {
    let discountValue = 0;
    if (subscribedMembership) {
      let discountPercentage =
        parseFloat(subscribedMembership.membership_discount) / 100;
      discountValue = totalAmount * discountPercentage;
    }

    return discountValue;
  };

  const discountGrandCalculation = (subtotal: any) => {
    const discount = selectedBranch?.discount;
    let grandDiscount = 0;
    if (discount?.type == 'percentage') {
      let discVal = discount?.amount / 100;
      grandDiscount = subtotal * discVal;

      if (grandDiscount > discount?.limit) {
        grandDiscount = discount?.limit;
      }
    } else if (discount?.type == 'fixed') {
      // let discVal = discount.amount;
      // grandDiscount = subtotal - discVal;
      grandDiscount = discount?.amount;
      if (grandDiscount <= 0) {
        grandDiscount = 0;
      }
    }
    let totalDiscount =
      parseFloat(grandDiscount) +
      calculatePromoDiscount(promoCode.promoCodeData, subtotal) +
      calculateSubscriptionDiscount(subtotal);

    //

    return totalDiscount;
  };

  const discountCalculation = (subtotal: any) => {
    const discount = selectedBranch?.discount;
    let grandDiscount = 0;
    if (discount?.type == 'percentage') {
      let discVal = discount?.amount / 100;
      grandDiscount = subtotal * discVal;

      if (grandDiscount > discount?.limit) {
        grandDiscount = discount?.limit;
      }
    } else if (discount?.type == 'fixed') {
      // let discVal = discount.amount;
      // grandDiscount = subtotal - discVal;
      grandDiscount = discount?.amount;
      if (grandDiscount <= 0) {
        grandDiscount = 0;
      }
    }
    let totalDiscount =
      parseFloat(grandDiscount) +
      calculatePromoDiscount(promoCode.promoCodeData, subtotal)

    //

    return totalDiscount;
  };

  const calculatePackagingIncharges = () => {
    let charges = 0;

    let packageCharge = Number(selectedBranch?.packaging_charges?.amount);
    if (selectedBranch?.packaging_charges?.type == 'fixed') {
      return packageCharge;
    } else if (selectedBranch?.packaging_charges?.type == 'per_item') {
      charges = calculateCartItems(cartData) * packageCharge;

      return charges;
    } else {
      return charges;
    }
  };

  const calculateCartItems = (arr: any) => {
    let quantity = arr.reduce((sum: any, li: any) => sum + li.quantity, 0);
    return quantity;
  };
  const grandTotalCalculation = () => {
    let grandTotal = 0;
    grandTotal =
      totalCartAmount +
      taxCalculation() +
      deliveryCharges(totalCartAmount) +
      calculatePackagingIncharges() -
      discountGrandCalculation(totalCartAmount);

    grandTotal;
    if (grandTotal < 0 || !grandTotal) {
      grandTotal = 0;
    }
    return grandTotal.toFixed(2);
  };

  

  const placeOrder = async () => {
    if (!userData?.token) {
      navigation.navigate('WelcomeScreen');

      return;
    }
    if (!selectedBranch?.open) {
      setMessage(
        'We regret to inform you that the branch is currently closed, and we are unable to proceed with your order. Please consider placing your order again when the branch reopens.',
      );
      setIsMessage(true);
      setTimeout(() => {
        setIsMessage(false);
        setMessage('');
      }, 4000);

      return;
    }
    if (pickup == '1') {
      if (
        !seletctedAddress ||
        Object.keys(seletctedAddress)?.length == 0 ||
        seletctedAddress == undefined
      ) {
        setMessage(localize?.checkout_change_delivery_address_validation
        );
        setIsMessage(true);
      

        return;
      }
    }
    setIsLoading(true);
    let deviceState:any = await OneSignal.getDeviceState();
    const installedVersion = getVersion();

    let dataObj = {
      payment_method_id: selectedPaymentMethod?.id,
      user_address_id: seletctedAddress ? seletctedAddress.id : null,
      entity_branch_id: selectedBranch.id,
      products: cartData,
      payment_type: !selectedPaymentMethod?.type
        ? 'cash'
        : selectedPaymentMethod?.type,
      type: pickup,
      source: 'mobileapp',
      points_pay: pointsPay,
      plan_id: subscribedMembership?.id ? subscribedMembership?.id : null,
      plan_name: subscribedMembership?.name ? subscribedMembership?.name : null,
      plan_discount: calculateSubscriptionDiscount(totalCartAmount),
      total:
        (grandTotalCalculation() - pointsPay).toFixed(2) <= 0
          ? balance.toFixed(2)
          : (grandTotalCalculation() - pointsPay).toFixed(2),
      is_preorder: '0',

      device_id: deviceState.userId,
      promo_code: promoCode.isPromoCodeValid ? promoCode.value : '',
      delivery: {
        distance: seletctedAddress ? seletctedAddress.distance?.value : null,
        charges: seletctedAddress ? deliveryCharges(totalCartAmount) : 0.0,
      },
      delivery_type: selectedBranch?.data?.delivery_type,
      table_no: pickup ? tableNo : '',
      device_type: Platform.OS === 'android' ? 'android' : 'ios',
      installed_app: installedVersion,
    };
    let params = {
      data: dataObj,
      token: token,
    };
    ApiServices.placeOrder(params, async ({isSuccess, response}: any) => {
      if (isSuccess) {
        let result = JSON.parse(response);

        if (result.success) {
          setIsLoading(false);
          setMessage(result?.message);
          const data = result.data;
          setOrderDetail(data);
          setIsMessage(true);
          setTimeout(() => {
            setIsConfirmed(true);
          }, 1000);
        } else {
          setIsLoading(false);
          if (result?.app_update_status == 1 || result?.session_expire) {
            sessionCheck(
              result?.app_update_status,
              result?.session_expire,
              dispatch,
            );
            return;
          }

          setMessage(result?.message);
          setIsMessage(true);
          setTimeout(() => {
            setIsMessage(false);
            setMessage('');
          }, 2000);
        }
      } else {
        setIsLoading(false);

        Alert.alert(`${localize?.something_went_wrong_generic_toast_title}`, `${localize?.something_went_wrong_generic_toast_description}`);
      }

      // resolve(result);
    });
  };
  const CartDetail = ({item, value}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 5,
        }}>
        <CustomText text={item} size={isiPad ? 18 : 14} />
        <View style={{minWidth: 70, alignItems: 'flex-start'}}>
          <CustomText text={value} size={isiPad ? 18 : 14} />
        </View>
      </View>
    );
  };
  const onPaywithPoints = () => {
    if (!isPayWithPoints) {
      let dollarPerPoint = 1 / parseFloat(pointsData?.dollar_per_point); // 1 dollar per 200 points
      let pointsBalance = points;
      let orderAmount:any = grandTotalCalculation();
      // Calculate the points needed to pay for the order
      let pointsNeeded = orderAmount / dollarPerPoint; // or orderAmount * 200;
      // Calculate the dollar amount against the points spent

      let dollarSpent = pointsBalance * dollarPerPoint;
      // Ensure pointsBalance is sufficient
      if (pointsNeeded <= pointsBalance) {
        // Subtract the used points from the balance
        pointsBalance -= pointsNeeded;

        // Calculate the dollar amount against the points spent
        let dollarsSpent = pointsNeeded * dollarPerPoint;

        setPointsPay(dollarsSpent);
        setRemainingPoints(pointsNeeded);
        // Calculate the remaining points balance in dollars
      } else {
        setRemainingPoints(pointsBalance);
        setPointsPay(dollarSpent);
      }
    } else {
      setPointsPay(0);
      setRemainingPoints(0);
    }

    setIsPayWithPoints(!isPayWithPoints);
  };

  const validatePromoCode = (txt:any, pickupType:any) => {
    if (txt === '') {
      setPromoCode(prevPromoCode => ({
        ...prevPromoCode,
        error: '',
        isPromoCodeValid: false,
      }));
      return;
    }

    let formData = new FormData();
    formData.append('promo_code', txt);
    formData.append('entity_branch_id', Number(selectedBranch.id));
    formData.append('order_type', pickupType);
    console.log('formData', formData);
    ApiServices.validatePromoCode(
      formData,
      token,
      async ({isSuccess, response}:any) => {
        if (isSuccess) {

          if (response?.valid) {
            if (
              totalCartAmount < response.minipay ||
              totalCartAmount < response?.amount
            ) {
              setPromoCode(prevPromoCode => ({
                ...prevPromoCode,
                error: `${localize?.checkout_promo_field_validation} ${
                  dollarSymbol + response.amount
                }`,
                isPromoCodeValid: false,
              }));
              return;
            }
            setPromoCode(prevPromoCode => ({
              ...prevPromoCode,
              error: '',
              isPromoCodeValid: true,
              promoCodeData: response,
            }));
          } else {
            setPromoCode(prevPromoCode => ({
              ...prevPromoCode,
              error: response?.error,
              isPromoCodeValid: false,
            }));
          }
        }
      },
    );
  };
  const debouncedValidatePromoCode = useCallback(
    debounce(validatePromoCode, 500),
    [],
  );

  const onValidatePromoCode = (txt:any, pickupType:any) => {
    setPromoCode(prevPromoCode => ({...prevPromoCode, value: txt}));
    debouncedValidatePromoCode(txt, pickupType);
  };

  return (
    <>
      <ScreenLayout
        navigation={navigation}
        title={localize?.checkout_title}
        // style={{ba}}
        height={'100%'}
        bgColor={colors.white}
        isLineVisible={true}
        linePosition={'center'}>
        <View style={{flex: 1}}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => setShowOrderSummary(!showOrderSummary)}
            style={{
              backgroundColor: colors.white,
              paddingHorizontal: 20,
              elevation: 5,
              paddingVertical: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {showOrderSummary ? (
                  <Image
                    source={showOrderSummary ? images.arrowDown : images.up}
                    style={{width: 22, height: 15, marginTop: 2}}
                  />
                ) : (
                  <Image
                    source={images.up}
                    style={{width: 22, height: 15, marginTop: 2}}
                    resizeMode="contain"
                  />
                )}

                <CustomText
                  text={localize?.checkout_show_order_summary_title}
                  size={isiPad ? 20 : 15}
                  fontWeight="500"
                  fontFam={font.montserratMedium}
                  style={{marginLeft: 10}}
                />
              </View>

              <CustomText
                text={dollarSymbol + `${Number(totalCartAmount).toFixed(2)}`}
                size={isiPad ? 20 : 16}
                fontWeight="500"
                fontFam={font.montserratMedium}
                style={{marginLeft: 10}}
              />
            </View>
          </TouchableOpacity>
          <Collapsible collapsed={showOrderSummary}>
            <OrderSummeryCard Qty={localize?.checkout_show_order_summary_qty} />
          </Collapsible>

          <View style={{height: 4, backgroundColor: colors.grey}} />
          <View
            style={{
              backgroundColor: colors.white,
              marginTop: '8%',
              paddingHorizontal: 20,
              marginHorizontal: 20,
              borderRadius: 7,
            }}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => setPickupModal(true)}
              style={{paddingVertical: 10}}>
              {/* backgroundColor:"red",
                  width:"80%" */}
              <CheckoutCard
                changeTextTitle={localize?.checkout_change_delivery_type}
                OnChange={() => {
                  setPickupModal(true);
                }}
                description={
                  pickup == '1'
                    ? 'Delivery'
                    : pickup == '2'
                    ? 'Self-Pickup / Drive thru'
                    : 'Dine-In'
                }
              />
            </TouchableOpacity>
            {pickup == '1' && userData?.token && (
              <>
                <CustomLine />
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => dispatch(setIsAddressModal(true))}
                  style={{paddingVertical: 10}}>
                  <CheckoutCard
                    changeTextTitle={localize?.checkout_change_address}
                    OnChange={() => {
                      if (!userData?.token) {
                        navigation.navigate('WelcomeScreen');

                        return;
                      }
                      dispatch(setIsAddressModal(true));
                    }}
                    title={
                      !deliveryAddress
                        ? localize?.checkout_select_address_title
                        : deliveryAddress?.name
                    }
                    description={
                      !deliveryAddress
                        ? localize?.checkout_select_address_description
                        : deliveryAddress?.address
                    }
                  />
                </TouchableOpacity>
              </>
            )}
          </View>
          <View
            style={{
              paddingHorizontal: 24,
              marginTop: '5%',
            }}>
            <CustomText
              text={localize?.checkout_payment_method_title}
              size={isiPad ? 20 : 16}
              color={colors.primary}
              fontWeight="700"
              fontFam={font.montserratBold}
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.6}
            disabled={!userData?.token}
            onPress={() => {
              if (userData?.token) {
                navigation.navigate('Payments', {
                  name: 'HomeStack',
                  isCheckout: true,
                });
              }
            }}
            style={styles.whiteBox}>
            {selectedPaymentMethod?.card ? (
              <View style={appStyles.row}>
                <View style={styles.brandImage}>
                  <Image
                    source={
                      selectedPaymentMethod.card?.brand == 'visa'
                        ? images.visa
                        : images.master
                    }
                    style={{
                      width: isiPad ? 50 : 30,
                      height: isiPad ? 50 : 30,
                      resizeMode: 'contain',
                    }}
                  />
                </View>

                <View style={{width: scale(200)}}>
                  <CustomText
                    //  text={`${
                    //   selectedPaymentMethod.card.brand.charAt(0).toUpperCase()+ selectedPaymentMethod.card.brand.slice(1)

                    // } ending in ${item.card.last4}`}
                    text={`${
                      selectedPaymentMethod.card.brand.charAt(0).toUpperCase() +
                      selectedPaymentMethod.card.brand.slice(1)
                    } ${localize?.Payment_settings_visa_card_ending_title} ${selectedPaymentMethod.card.last4}`}
                    fontFam={font.montserratMedium}
                    size={isiPad ? 19 : 14}
                    numberOfLines={2}
                    fontWeight="500"
                    color={colors.primary}
                    style={{
                      // alignSelf: "center",
                      marginRight: 30,
                      marginLeft: scale(10),
                    }}
                  />
                  <Spacer height={isiPad ? 10 : 4} />
                  <CustomText
                    text={`${localize?.Payment_settings_visa_card_expiry_title} ${selectedPaymentMethod.card.exp_month}/${selectedPaymentMethod.card.exp_year}`}
                    fontFam={font.montserratMedium}
                    size={isiPad ? 16 : 13}
                    color={colors.black}
                    style={{
                      marginRight: 30,
                      marginLeft: scale(10),
                    }}
                  />
                </View>
              </View>
            ) : (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 15,
                  width: '80%',
                }}>
                <Image
                  source={images.cod}
                  style={{width: 35, height: 25, resizeMode: 'contain'}}
                />
                <CustomText
                  text={localize?.Payment_settings_cash_on_delivery_title}
                  color={colors.primary}
                  fontWeight="500"
                  fontFam={font.montserratMedium}
                  size={isiPad ? 16 : 13}
                />
              </View>
            )}
            {userData?.token && (
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => {
                  navigation.navigate('Payments', {
                    name: 'HomeStack',
                    isCheckout: true,
                  });
                }}
                // onPress={() => setIsModalVisible(true)}
                style={{
                  justifyContent: 'center',
                  flex: 1,
                  alignItems: 'flex-end',
                }}>
                <CustomText
                  text={localize?.checkout_change_payment_method}
                  style={{
                    textDecorationLine: 'underline',
                  }}
                  fontWeight="500"
                  size={isiPad ? 15 : 12}
                  fontFam={font.montserratMedium}
                  color={colors.primary}
                />
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        </View>
        <View
          style={{
            paddingHorizontal: 24,
            marginTop: '5%',
          }}>
          <CustomText
            text={localize?.checkout_pay_with_points_title}
            size={isiPad ? 20 : 16}
            color={colors.primary}
            fontWeight="700"
            fontFam={font.montserratBold}
          />
        </View>

        <View style={styles.whiteBox}>
          <TouchableOpacity
            activeOpacity={0.6}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
              marginLeft: -10,
              width: '80%',
            }}>
            <Image
              source={images.loyaltypoints}
              resizeMode="contain"
              style={{width: isiPad ? 70 : 50, height: isiPad ? 40 : 30}}
            />

            <View>
              <CustomText
                // text={"Available Points"}
                text={
                  localize?.checkout_available_points +
                  ' ' +
                  `${Number(points - remainingPoints).toFixed(2)}`
                }
                color={colors.primary}
                fontWeight="500"
                fontFam={font.montserratMedium}
                size={isiPad ? 16 : 13}
              />
            </View>
          </TouchableOpacity>

          <ToggleSwitch
            isOn={isPayWithPoints}
            // disabled={true}
            onColor={colors.primary}
            offColor="#bdc3c7"
            thumbOnStyle={{width: 24, height: 24, borderRadius: 9999}}
            thumbOffStyle={{width: 24, height: 24, borderRadius: 9999}}
            trackOffStyle={{width: 53, height: 30}}
            trackOnStyle={{width: 53, height: 30}}
            size="medium"
            onValueChange={onPaywithPoints}
          />
        </View>

        <View
          style={{
            paddingHorizontal: 24,
            marginTop: '5%',
          }}>
          <CustomText
            text={localize?.checkout_promo_title}
            size={isiPad ? 20 : 16}
            color={colors.primary}
            fontWeight="700"
            fontFam={font.montserratBold}
          />
        </View>

        <KeyboardAvoidingView
          // behavior={"height"}
          // keyboardVerticalOffset={100}
          style={{flex: 1, paddingBottom: 60}}>
          <View
            style={{
              ...styles.whiteBox,
              backgroundColor: 'transparent',
              paddingHorizontal: 0,
              paddingVertical: 0,
            }}>
            <TextInput
              style={{
                fontSize: isiPad ? 19 : 14,
                fontWeight: '500',
                fontFamily: font.montserratRegular,
                flex: 1,
                color: colors.primary,
                height: isiPad ? verticalScale(30) : 47,
                backgroundColor: colors.grey,
                borderRadius: 5,
                paddingHorizontal: 10,
              }}
              value={promoCode.value}
              editable={!userData?.token ? false : true}
              placeholder={localize?.checkout_promo_field_place_holder}
              placeholderTextColor={colors.primary}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={txt => onValidatePromoCode(txt, pickup)}
            />
          </View>

          {promoCode?.error && (
            <View
              style={{
                alignItems: 'flex-end',
                marginTop: 3,
                marginRight: 24,
              }}>
              <CustomText
                size={isiPad ? 14 : 11}
                text={promoCode?.error}
                color={'red'}
              />
            </View>
          )}

          

          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 20,
              height: 50,
              alignItems: 'center',
            }}>
            <CustomText
              size={isiPad ? 15 : 12}
              text={localize?.checkout_terms_of_service_description}
            />
            <TouchableOpacity
              style={{
                height: 40,
                justifyContent: 'center',
              }}
              activeOpacity={0.4}
              onPress={() => {
                navigation.navigate('TermAndCondition');
              }}>
              <CustomText
                size={isiPad ? 15 : 12}
                text={` ${localize?.checkout_terms_of_service_title}`}
                color={colors.primary}
                fontWeight="600"
                fontFam={font.montserratBold}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              gap: 5,
              backgroundColor: colors.white,
              padding: 20,

              ...appStyles.elevation,
              elevation: 20,
              shadowRadius: 10,
              marginBottom: 20,
            }}>
            <CartDetail
              item={localize?.checkout_subtotal_title}
              value={dollarSymbol + `${totalCartAmount.toFixed(2)}`}
            />
            {Number(discountCalculation(totalCartAmount).toFixed(2)) > 0 && (
              <CartDetail
                item={localize?.checkout_discount_title}
                value={
                  dollarSymbol +
                  `${discountCalculation(totalCartAmount).toFixed(2)}`
                }
              />
            )}
             {Number(calculateSubscriptionDiscount(totalCartAmount).toFixed(2)) > 0 && (
              <CartDetail
                // item={"Packaging Charges"}
                item={localize?.checkout_plan_discount}
                value={
                  dollarSymbol + `${calculateSubscriptionDiscount(totalCartAmount).toFixed(2)}`
                }
              />
            )}

            {Number(taxCalculation().toFixed(2)) > 0 && (
              <CartDetail
                item={localize?.checkout_tax_title}
                value={dollarSymbol + `${taxCalculation().toFixed(2)}`}
              />
            )}

            {Number(calculatePackagingIncharges().toFixed(2)) > 0 && (
              <CartDetail
                // item={"Packaging Charges"}
                item={localize?.checkout_packaging_charge_title}
                value={
                  dollarSymbol + `${calculatePackagingIncharges().toFixed(2)}`
                }
              />
            )}
             



            {pickup == '1' && (
              <>
                {Number(deliveryCharges(totalCartAmount).toFixed(2)) > 0 && (
                  <CartDetail
                    item={localize?.checkout_delivery_title}
                    value={
                      dollarSymbol +
                      `${deliveryCharges(totalCartAmount).toFixed(2)}`
                    }
                  />
                )}
              </>
            )}
            {isPayWithPoints && (
              <>
                {pointsPay > 0 && (
                  <CartDetail
                    item={localize?.checkout_points_balance}
                    value={dollarSymbol + `${pointsPay.toFixed(2)}`}
                  />
                )}
              </>
            )}

            <View
              style={{
                height: 2,
                backgroundColor: colors.primaryLight,
                marginVertical: 10,
              }}
            />
            <View
              style={{
                gap: 5,

                // paddingHorizontal: 5,
              }}>
              <View style={{...appStyles.row, justifyContent: 'space-between'}}>
                <CustomText
                  text={localize?.checkout_total_title}
                  size={15}
                  fontWeight="500"
                  fontFam={font.montserratMedium}
                />
                <CustomText
                  text={
                    dollarSymbol +
                    `${
                      (grandTotalCalculation() - pointsPay).toFixed(2) <= 0
                        ? balance.toFixed(2)
                        : (grandTotalCalculation() - pointsPay).toFixed(2)
                    }`
                  }
                  size={18}
                  color={colors.primary}
                  fontWeight="500"
                  fontFam={font.montserratMedium}
                  style={{paddingHorizontal: 5}}
                />
              </View>
              <View
                style={{
                  marginTop: 10,
                }}>
                <CustomButton
                  text={localize?.checkout_button_title}
                  size={isiPad ? 20 : 16}
                  height={isiPad ? verticalScale(27) : 45}
                  bgColor={
                    promoCode?.error 
                      ? '#A1A1A1'
                      : colors.primary
                  }
                  borderWidth={-1}
                  disable={promoCode?.error ? true : false}
                  onPress={() => {
                    if (locationAccess) {
                      placeOrder();
                    }
                  }}
                  borderRadius={32}
                />
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>

        <AddressModal
          isModalVisible={isModalVisible}
          pickup={pickup}
          applyTitle={localize?.checkout_add_new_addresses_apply_button}
          cancelTitle={localize?.checkout_add_new_addresses_cancel_button}
          selectAddressTitle={localize?.checkout_add_new_addresses_title}
          addNewAddressTitle={localize?.checkout_add_new_addresses}
          // setIsModalVisible={setIsModalVisible}
          seletctedAddress={seletctedAddress}
          setDelAddress={setDeliveryAddress}
          error={error}
          setError={setError}
          setSelectedAddress={setSelectedAddress}
          entityId={selectedBranch.id}
          onConfirm={() => {
            if (
              !seletctedAddress ||
              Object.keys(seletctedAddress)?.length == 0 ||
              seletctedAddress == undefined
            ) {
              setError(localize?.checkout_add_new_address_validation_title);
            } else {
              onConfirmAddress();
              dispatch(setIsAddressModal(false));
              setError('');
            }
          }}
          onCancel={() => {
            onConfirmAddress();
            setSelectedAddress({});

            setError('');

            dispatch(setIsAddressModal(false));
          }}
        />

        <PickupModal
          isModalVisible={isPickupModal}
          setIsDineInModal={setIsDineInModal}
          setIsModalVisible={setPickupModal}
          entityType={entityType}
          applyTitle={localize?.checkout_delivery_type_apply_button}
          cancelTitle={localize?.checkout_delivery_type_cancel_button}
          // setPickup={setPickup}

          pickup={pickup}
          onSeletePickup={() => {}}
          getLabel={item => {
            if (item == '1') {
              return 'Delivery';
            } else if (item == '2') {
              return 'Self-Pickup / Drive thru';
            } else if (item == '3') {
              return 'Dine-In';
            }
          }}
        />
        <DineInModal
          Placeholder={
            localize?.checkout_delivery_type_dine_in_field_place_holder
          }
          applyButtonTitle={
            localize?.checkout_delivery_type_dine_in_confirm_button
          }
          isModalVisible={isDineInModal}
          setIsModalVisible={setIsDineInModal}
          setTableNo={setTableNo}
          tableNo={tableNo}
        />
      </ScreenLayout>
      <CustomToast
        isVisable={isMessage}
        duration={4000}
        setIsVisable={setIsMessage}
        message={message}
        color={colors.white}
      />
      <AbsoluteLoader
        isModalVisible={isLoading}
        setModalVisible={setIsLoading}
      />
      {/* {isDisable && <AbsoluteView />} */}

      <OrderConfirmedModal
        isModalVisible={isConfirmed}
        orderConfirmTitle={localize?.order_confirm_title}
        pointsGiven={orderDetail?.pointsGiven}
        orderConfirmationStartDescription={
          localize?.order_confirm_start_description
        }
        orderConfirmationEndDescription={
          localize?.order_confirm_end_description
        }
        orderConfirmButton={localize?.order_confirm_button}
        onbackDropPress={() => {
          // console.log("Obkacjdrop");
        }}
        // setIsModalVisible={() => {
        // }}
        onPress={() => {
          setIsLoading(true);
          // setTimeout(() => {
          //   setIsLoading(false);
          // }, 500);

          // setTimeout(() => {


          navigation.navigate('ActiveOrders', {
            name: 'HomeStack',
            id: orderDetail?.orderDetails?.id,
          });

          // navigation.reset({
          //   index: 0,
          //   routes: [
          //     {
          //       name: "OrderConfirmedScreen",
          //       params: {
          //         orderDetail: orderDetail,
          //       },
          //     },
          //   ],
          // });
          dispatch(setEmptyCard([]));
          setIsConfirmed(false);

          //   }, 1000);
        }}
      />

    </>
  );
};
export default Checkout;
const styles = StyleSheet.create({
  brandImage: {
    width: isiPad ? scale(25) : scale(35),
    height: isiPad ? scale(20) : scale(27),
    borderRadius: scale(5),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  whiteBox: {
    backgroundColor: colors.white,
    marginTop: '4%',
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    paddingHorizontal: 20,
    marginHorizontal: 20,
    borderRadius: 7,
  },
});
