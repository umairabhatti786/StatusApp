import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import { colors } from "../../../utils/colors";
import CustomText from "../../../components/CustomText";
import { font } from "../../../utils/font";
import CartItem from "../../../components/CartItem";
import PopularOrder from "../../../components/PopularOrder";
import EmptyCart from "../../../components/EmptyCart";
import CustomLine from "../../../components/CustomLine";
import ScreenLayout from "../../../components/ScreenLayout";
import { useDispatch, useSelector } from "react-redux";
import {
  getCartData,
  getTotalCartAmount,
  setCartData,
  setDecrementCartItem,
  setIncrementCartItem,
  setTotalCartAmount,
} from "../../../redux/reducers/cartReducer";
import { Spacer } from "../../../components/Spacer";
import { ApiServices } from "../../../api/ApiServices";
import {
  getToken,
  setLoyaltyPoints,
} from "../../../redux/reducers/authReducer";
import { useIsFocused } from "@react-navigation/native";
import { appStyles } from "../../../utils/AppStyles";
import { dollarSymbol, isiPad, sessionCheck } from "../../../utils/CommonFun";
import { getSelectedBranch } from "../../../redux/reducers/branchesReducer";
import CustomButton from "../../../components/CustomButton";
import { setProductsDetails } from "../../../redux/reducers/productDetailReducer";
import { getLocalizeFile } from "../../../redux/reducers/localizeReducer";
import { verticalScale } from "react-native-size-matters";

type Props = {
  navigation?: any;
};

const windowHeight = Dimensions.get("window").height;
const Cart = ({ navigation }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const cartData = useSelector(getCartData);
  const token = useSelector(getToken);
  const [popularProducts, setPopularProduct] = useState([]);
  const dispatch = useDispatch();
  const totalCartAmount = useSelector(getTotalCartAmount);
  const selectedBranch = useSelector(getSelectedBranch);
  const localize: any = useSelector(getLocalizeFile);

  const focused = useIsFocused();
  const [amount, setAmuont] = useState({
    total: 114.23,
    subTotal: 20.5,
    tax: 5.05,
    delivery: 2.02,
    promoCode: 12,
  });

  useEffect(() => {
    getCartDetail();
    getPopularProduct();
    getUserLoyaltyPoints();
  }, [focused]);

  useEffect(() => {
    getCartDetail();
  }, [cartData]);

  const getUserLoyaltyPoints = () => {
    ApiServices.getPointsData(token, async ({ isSuccess, response }: any) => {
      if (isSuccess) {
        if (response?.success) {
          dispatch(setLoyaltyPoints(response?.data?.points_balance));

          // setPointsData(response?.data);
        } else {
          if (response?.app_update_status == 1 || response?.session_expire) {
            sessionCheck(
              response?.app_update_status,
              response?.session_expire,
              dispatch
            );
            return;
          }
          console.log("error", response);
        }
      } else {
        // Alert.alert("Alert!", "Network Error.");
      }
    });
  };

  const getCartDetail = () => {
    if (cartData.length > 0) {
      let currentTotal = cartData?.reduce(
        (accumulator, current) => accumulator + parseFloat(current?.priceByQty),
        0.0
      );
      dispatch(setTotalCartAmount(currentTotal));
    }
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

  const calculatePackagingIncharges = () => {
    let charges = 0;
    let packageCharge = Number(selectedBranch?.packaging_charges?.amount);
    if (selectedBranch?.packaging_charges?.type == "fixed") {
      return packageCharge;
    } else if (selectedBranch?.packaging_charges?.type == "per_item") {
      charges = calculateCartItems(cartData) * packageCharge;

      return charges;
    } else {
      return charges;
    }
  };

  const calculateCartItems = (arr) => {
    let quantity = arr.reduce((sum, li) => sum + li.quantity, 0);
    return quantity;
  };

  const CartDetail = ({ item, value }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 5,
        }}
      >
        <CustomText text={item} size={isiPad ? 18 : 14} />
        <View style={{ minWidth: 70, alignItems: "flex-start" }}>
          <CustomText text={value} size={isiPad ? 19 : 14} />
        </View>
      </View>
    );
  };

  const discountCalculation = (subtotal: any) => {
    // this.state.gift ? parseFloat(this.state.gifts?.invitation_gift_amount) : 0
    const discount = selectedBranch?.discount;
    let grandDiscount = 0;
    if (discount?.type == "percentage") {
      let discVal = discount?.amount / 100;
      grandDiscount = subtotal * discVal;

      if (grandDiscount > discount?.limit) {
        grandDiscount = discount?.limit;
      }
    } else if (discount?.type == "fixed") {
      // let discVal = discount.amount;
      // grandDiscount = subtotal - discVal;
      grandDiscount = discount?.amount;
      if (grandDiscount <= 0) {
        grandDiscount = 0;
      }
    }

    return grandDiscount;
  };

  const getPopularProduct = () => {
    ApiServices.getPopularProducts(
      token,
      async ({ isSuccess, response }: any) => {
        if (isSuccess) {
          const result = response;

          if (result.success) {
            setPopularProduct(result?.data);
          }
        } else {
          Alert.alert("Alert!", "Something went wrong");
        }
      }
    );
  };

  const onScroll = (x: any) => {
    const xPos =
      x.nativeEvent?.contentOffset?.x < 0 ? 0 : x.nativeEvent?.contentOffset?.x;
    const current = Math.floor(xPos / 100);
    if (current > 3) {
      setSelectedIndex(3);
      return;
    }
    setSelectedIndex(current);
  };

  // const [cardData, setCardData] = useState(abc);

  const onPopularOrder = (item: any) => {
    dispatch(setProductsDetails(item));
    navigation.navigate("OrderDetailCard");

    return;
  };

  const grandTotalCalculation = () => {
    let grandTotal = 0;
    grandTotal =
      totalCartAmount +
      taxCalculation() +
      calculatePackagingIncharges() -
      discountCalculation(totalCartAmount);

    grandTotal;
    if (grandTotal < 0 || !grandTotal) {
      grandTotal = 0;
    }
    return grandTotal.toFixed(2);
  };

  const mergeDuplicateProducts = (cartData: any) => {
    const productMap = {};

    cartData.forEach((item) => {
      const productId = item.id;

      if (productMap[productId]) {
        productMap[productId].quantity += item.quantity;
        // Optionally merge other properties if needed, like `addons`, etc.
      } else {
        productMap[productId] = { ...item };
      }
    });

    // Convert the map back to an array
    const uniqueCartData = Object.values(productMap);
    return uniqueCartData;
  };

  return (
    <ScreenLayout
      navigation={navigation}
      title={localize?.cart_title}
      bgColor={colors.white}
      height={"100%"}
      isLineVisible={true}
      linePosition={"flex-start"}
      isProfileVisible
    >
      {cartData?.length > 0 ? (
        <View style={{ flex: 1, backgroundColor: colors.white }}>
          <View style={{ paddingHorizontal: 20 }}>
            <FlatList
              contentContainerStyle={{
                gap: 10,
              }}
              style={{ marginTop: 10 }}
              scrollEnabled={false}
              data={cartData}
              renderItem={({ item, index }: any) => {
                return (
                  <>
                    <CartItem
                      item={item}
                      key={index}
                      onIncrementCart={() => {
                        if (item?.data?.stock_control == 1) {
                          if (
                            item?.quantity + 1 >
                            Number(item?.data.stock_quantity)
                          ) {
                            Alert.alert(
                              `${localize?.cart_product_stock_alert_title}`,
                              `${localize?.cart_product_stock_alert_start_description} ${item?.data.stock_quantity} ${localize?.cart_product_stock_alert_end_description}`,

                              [
                                {
                                  text: `${localize?.cart_product_stock_alert_ok_button}`,
                                },
                              ]
                            );

                            return;
                          }
                        }

                        const data = {
                          index: index,
                          item: item,
                        };
                        dispatch(setIncrementCartItem(data));
                      }}
                      onDecrementCart={() => {
                        const data = {
                          index: index,
                          item: item,
                        };
                        dispatch(setDecrementCartItem(data));
                      }}
                      onDelete={() => {
                        // let data = cardData.filter((da) => da.id != item.id);
                        // setCardData(data);
                      }}
                    />
                    <CustomLine />
                  </>
                );
              }}
            />
            <TouchableOpacity
              style={{ paddingVertical: 10 }}
              onPress={() => {
                navigation.navigate("OrderFeatured");
              }}
            >
              <CustomText
                text={localize?.cart_add_more_items_title}
                color={colors.primary}
                fontWeight="500"
                size={isiPad ? 15 : 12}
                fontFam={font.montserratMedium}
                style={{ textDecorationLine: "underline" }}
              />
            </TouchableOpacity>
          </View>
          {popularProducts.length > 0 && (
            <View
              style={{
                // flex: 1,
                paddingLeft: 15,
              }}
            >
              <CustomText
                text={localize?.cart_popular_with_your_order_title}
                size={isiPad ? 20 : 16}
                fontWeight="500"
                fontFam={font.montserratMedium}
                style={{ marginTop: 30, marginBottom: 5 }}
              />
              <View
                style={
                  {
                    // flex: 1
                  }
                }
              >
                <FlatList
                  data={popularProducts}
                  onScroll={onScroll}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{
                    alignItems: "center",
                  }}
                  renderItem={({ item }) => {
                    return (
                      <PopularOrder
                        onPress={() => onPopularOrder(item)}
                        data={item}
                      />
                    );
                  }}
                />
              </View>
            </View>
          )}

          <Spacer height={20} />
          <View
            style={{
              gap: 5,
              backgroundColor: colors.white,
              padding: 20,

              ...appStyles.elevation,
              elevation: 20,
              shadowRadius: 10,
            }}
          >
            <CartDetail
              item={localize?.cart_subtotal_title}
              value={dollarSymbol + `${totalCartAmount.toFixed(2)}`}
            />
            {Number(discountCalculation(totalCartAmount)).toFixed(2) > 0 && (
              <CartDetail
                item={localize?.cart_discount_title}
                value={
                  dollarSymbol +
                  `${Number(discountCalculation(totalCartAmount)).toFixed(2)}`
                }
              />
            )}
            {taxCalculation().toFixed(2) > 0 && (
              <CartDetail
                item={localize?.cart_tax_title}
                value={dollarSymbol + `${taxCalculation().toFixed(2)}`}
              />
            )}

            {calculatePackagingIncharges().toFixed(2) > 0 && (
              <CartDetail
                item={localize?.cart_packaging_charge_title}
                value={
                  dollarSymbol + `${calculatePackagingIncharges().toFixed(2)}`
                }
              />
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
                backgroundColor: colors.white,
                paddingHorizontal: 5,
              }}
            >
              <View
                style={{ ...appStyles.row, justifyContent: "space-between" }}
              >
                <CustomText
                  text={localize?.cart_total_title}
                  size={isiPad ? 20 : 15}
                  fontWeight="500"
                  fontFam={font.montserratMedium}
                />
                <CustomText
                  text={
                    dollarSymbol +
                    `${Number(grandTotalCalculation()).toFixed(2)}`
                  }
                  size={isiPad ? 25 : 18}
                  color={colors.primary}
                  fontWeight="500"
                  fontFam={font.montserratMedium}
                  style={{ paddingHorizontal: 5 }}
                />
              </View>
              <View
                style={{
                  marginTop: 10,
                }}
              >
                <CustomButton
                  text={localize?.cart_confirm_button}
                  size={isiPad ? 22 : 18}
                  height={isiPad ? verticalScale(30) : 45}
                  disable={false}
                  onPress={() => {
                    let hasStockIssue = false;

                    const dataCard = mergeDuplicateProducts(cartData);
                    dataCard.forEach((it, index) => {
                      if (it?.data?.stock_control == 1) {
                        if (it?.quantity > Number(it?.data.stock_quantity)) {
                          hasStockIssue = true;

                          Alert.alert(
                            ` ${it?.name} ${localize?.cart_product_stock_alert_title}`,
                            `${localize?.cart_product_stock_alert_start_description} ${it?.data.stock_quantity} ${localize?.cart_product_stock_alert_end_description}`,

                            [
                              {
                                text: `${localize?.cart_product_stock_alert_ok_button}`,
                              },
                            ]
                          );
                        }
                      }
                    });
                    if (!hasStockIssue) {
                      navigation.navigate("Checkout");
                    }

                    console.log("ckdnkdnc", dataCard.length);
                  }}
                  borderRadius={32}
                />
              </View>
            </View>
          </View>
        </View>
      ) : (
        <EmptyCart
          EmptyCartTitle={localize?.empty_cart_title}
          EmptyCartDescription={localize?.empty_cart_description}
          EmptyCartOrderButton={localize?.empty_cart_order_button}
          onPress={() => {
            navigation.navigate("OrderLocation");
            // setCardData(abc);
          }}
        />
      )}
    </ScreenLayout>
  );
};
export default Cart;
