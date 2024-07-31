import React, { useEffect, useRef, useState } from "react";
import { View, Animated, StyleSheet, Alert } from "react-native";
import ScreenLayout from "../../../components/ScreenLayout";
import CustomText from "../../../components/CustomText";
import { colors } from "../../../utils/colors";
import CustomLine from "../../../components/CustomLine";
import { font } from "../../../utils/font";
import { OrdersAddon } from "./OrdersAddon";
import CustomInput from "../../../components/CustomInput";
import { appStyles } from "../../../utils/AppStyles";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetail } from "../../../redux/reducers/productDetailReducer";
import { getToken } from "../../../redux/reducers/authReducer";
import { dollarSymbol, isiPad } from "../../../utils/CommonFun";
import BottomCart from "../../../components/BottomCart";
import { setCartData } from "../../../redux/reducers/cartReducer";
import { getSelectedBranch } from "../../../redux/reducers/branchesReducer";
import FastImage from "react-native-fast-image";
import { scale, verticalScale } from "react-native-size-matters";
import { getLocalizeFile } from "../../../redux/reducers/localizeReducer";
import { ProductDetailLayout } from "../../../utils/Layouts/ProductDetailLayout";
import CustomToast from "../../../components/CustomToast";
let selectedAddon: any = [];

type Props = {
  navigation?: any;
  route?: any;
};

const OrderDetailCard = ({ navigation, route }: Props) => {
  const productData: any = useSelector<any>(getProductDetail);
  const [addonsItems, setAddonsItems] = React.useState([]);
  const [qualtity, setQuantity] = useState(1);
  const [addonSum, setAddonSum] = React.useState(0);
  const [price, setPrice] = React.useState(0);
  const [notes, setNotes] = useState("");
  const entityID: any = useSelector(getSelectedBranch).id;
  const localize: any = useSelector(getLocalizeFile);
  const [loading, setLoading] = useState(true);
  const scrollViewRef = useRef<any>(null);
  const [itemHeights, setItemHeights] = useState([]);
  const [blinkingIndex, setBlinkingIndex] = useState(null);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [headerHeight, setHeaderHeight] = useState(0);
  const [message, setMessage] = useState("");
  const [isMessage, setIsMessage] = useState(false);

  const blinkingAnimation = useRef<any>(null);

  useEffect(() => {
    selectedAddon = [];
    setTimeout(() => {
      setLoading(false);
    }, 700);

    setCheck();
    setPrice(parseFloat(productData.price));
  }, []);

  const setCheck = () => {
    if (productData?.addons?.length > 0 && productData !== undefined) {
      let arr = productData?.addons?.map((obj: any) => {
        if (obj.required == "1") {
          obj = { ...obj, disable: true };
        }
        if (obj.type == "2") {
          obj = { ...obj, disable: parseInt(obj.minimum) <= 0 ? false : true };
        }
        let m = obj.items.map((item: any) => ({ ...item, selected: false }));
        return { ...obj, items: m };
      });
      // Sort the array such that items with disable: true come before those with disable: false
      arr.sort((a: any, b: any) => {
        if (a.disable === b.disable) {
          return 0; // No change in order if both are the same
        }
        return a.disable ? -1 : 1; // `true` comes before `false`
      });
      setAddonsItems(arr);
    }
  };
  const dispatch = useDispatch();
  const onPressAddons = (index: any, ind: any, val: any, addon: any) => {
    let obj = null;
    let addonItems = [];
    var addonMenu: any = [...addonsItems];

    if (addon.type == "1" && addon.required == "1") {
      addonItems = addonMenu[index].items
        .map((i: any) => {
          if (i.name == addonMenu[index].items[ind].name) {
            i.selected = true;
          } else {
            i.selected = false;
          }
          return { ...i };
        })
        .filter((item: any) => item.selected == true);
      addonMenu[index] = { ...addonMenu[index], disable: false };
    }
    //--------single optional------
    if (addon.type == "1") {
      let find = addonItems.findIndex(
        (i) => i.name == addonMenu[index].items[ind].name
      );

      if (find == -1) {
        addonItems = addonMenu[index].items
          .map((i: any) => {
            if (i.name == addonMenu[index].items[ind].name) {
              if (addonMenu[index].items[ind].selected) {
                i.selected = false;
              } else {
                i.selected = true;
              }
            } else {
              i.selected = false;
            }
            return { ...i };
          })
          .filter((item: any) => item.selected == true);
      } else {
        addonItems.splice(1, 1);
      }
    }
    // ---------multi select---------
    else if (addon.type == "2") {
      addonMenu[index].items[ind] = {
        ...addonMenu[index].items[ind],
        selected: !addonMenu[index].items[ind].selected,
      };

      addonItems = addonMenu[index].items.filter(
        (i: any) => i.selected == true
      );
      if (
        addonItems.length > parseInt(addon.maximum) ||
        addonItems.length < parseInt(addon.minimum)
      ) {
        addonMenu[index] = { ...addonMenu[index], disable: true };
      } else {
        addonMenu[index] = { ...addonMenu[index], disable: false };
      }
    }
    //-----------finalObject formate-----
    obj = {
      id: addonMenu[index].id,
      name: addonMenu[index].name,
      type: addonMenu[index].type,
      items: addonItems,
    };

    updateAddon(obj);

    setAddonsItems(addonMenu);
    if (!addonMenu[index]?.disable) {
      let index = addonMenu.findIndex((item: any) => item.disable === true);

      if (index != -1) {
        scrollToFirstDisabledItem(index);
      }
    }
  };
  const updateAddon = (addon: any) => {
    let index = selectedAddon?.findIndex((i: any) => i.id == addon.id);
    if (index == -1) {
      selectedAddon.push(addon);
    } else {
      selectedAddon.splice(index, 1);
      selectedAddon.push(addon);
    }
    calculatePrice(selectedAddon);
  };
  const calculatePrice = (items: any) => {
    let sum = 0;
    items?.forEach(function (v: any) {
      v?.items?.forEach(function (value: any) {
        sum += parseFloat(value.price);
      });
    });

    // sumAddon = sum;
    setAddonSum(sum);
    return sum;
  };

  const checkDisable = () => {
    let disable = addonsItems?.some((i: any) => i.disable);
    return disable;
  };
  const checkQuantityDisable = () => {
    // console.log()
    if (productData?.data?.stock_control == 1) {
      if (qualtity>  Number(productData?.data?.stock_quantity)
      
      ) {

        return true;
      }
    }
    return false;
  };

  console.log("checQuantityDisable", checkQuantityDisable());
  const onAddProductToCart = () => {
    let productItem = {
      ...productData,
      addons: selectedAddon,
      data: {
        ...productData.data,
        payment_service: "disabled",
        payment_service_price: 0,
        payment_service_details: {},
      },
    };

    let obj = {
      ...productItem,
      priceByQty: (addonSum + price) * qualtity,
      price: addonSum + price,
      quantity: qualtity,
      notes: notes ? notes : "",
      entityID: entityID ? entityID : "",
    };

    dispatch(setCartData(obj));
    navigation.goBack();
  };
  const onItemLayout = (event: any, index?: any) => {
    const { height } = event.nativeEvent.layout;

    setItemHeights((prevHeights) => {
      const newHeights: any = [...prevHeights];
      newHeights[index] = height;
      return newHeights;
    });
  };

  const onHeaderLayout = (event: any) => {
    const { height } = event.nativeEvent.layout;

    setHeaderHeight(height);
  };

  const findFirstDisabledIndex = () => {
    if (addonsItems && addonsItems.length > 0) {
      return addonsItems.findIndex((item: any) => item.disable === true);
    }
    return -1; // Return -1 if there are no items or addonsItems is undefined
  };

  const scrollToFirstDisabledItem = (index: any) => {
    console.log("ScjdINdex", index);
    if (index !== -1 && itemHeights.length === addonsItems.length) {
      const scrollPosition = itemHeights
        .slice(0, index)
        .reduce((acc, height) => acc + height, 0);
      scrollViewRef.current.scrollTo({
        y: headerHeight + scrollPosition,
        animated: true,
      });
      setBlinkingIndex(index);
      startBlinkingAnimation();
      // Stop the blinking animation after 5 seconds
      setTimeout(() => {
        stopBlinkingAnimation();
        setBlinkingIndex(null);
      }, 3000);
    }
  };

  const startBlinkingAnimation = () => {
    animatedValue.setValue(0);
    blinkingAnimation.current = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 500,
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 500,
          useNativeDriver: false,
        }),
      ])
    );
    blinkingAnimation.current.start();
  };

  const stopBlinkingAnimation = () => {
    if (blinkingAnimation.current) {
      blinkingAnimation.current.stop();
    }
  };

  return (
    <>
      <ScreenLayout
        ScrollRef={scrollViewRef}
        navigation={navigation}
        title={localize?.order_details_title}
        style={{
          paddingHorizontal: 20,
          marginBottom: verticalScale(20),
        }}
        isProfileVisible
      >
        {loading ? (
          <>
            <View
              style={{
                marginTop: 20,
                height: "100%",
              }}
            >
              <ProductDetailLayout />
            </View>
          </>
        ) : (
          // onLayout={(event) => onItemLayout(event, index)}

          <View
            style={{
              backgroundColor: colors.white,
              marginTop: "5%",
              paddingBottom: "15%",
              borderRadius: 10,
            }}
          >
            <View
              onLayout={(event) => onHeaderLayout(event)}
              //  style={{backgroundColor:"red"}}
            >
              <View
                style={{
                  width: "100%",
                  height: isiPad ? verticalScale(200) : 230,
                  paddingHorizontal: 10,
                  marginTop: 10,
                }}
              >
                <FastImage
                  source={{ uri: productData?.image }}
                  resizeMode="cover"
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 10,
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: 15,
                  paddingTop: 10,
                }}
              >
                <View style={{ width: "55%" }}>
                  <CustomText
                    text={productData?.name}
                    size={isiPad ? 20 : 15}
                    fontFam={font.montserratMedium}
                    fontWeight="600"
                  />
                </View>
                <View style={appStyles.row}>
                  {productData?.discounted_price > 0 && (
                    <CustomText
                      fontWeight="500"
                      style={{
                        textDecorationLine: "line-through",
                        marginRight: scale(5),
                      }}
                      // fontFam={font.montserratSemiBold}
                      color={colors.grey100}
                      size={isiPad ? 18 : 13.5}
                      text={
                        dollarSymbol +
                        `${Number(productData.discounted_price).toFixed(2)}`
                      }
                    />
                  )}

                  <CustomText
                    text={
                      dollarSymbol + `${Number(productData.price).toFixed(2)}`
                    }
                    size={isiPad ? 18 : 13.5}
                    fontFam={font.montserratMedium}
                    fontWeight="500"
                  />
                </View>
              </View>

              <View
                style={{
                  paddingHorizontal: 15,
                  marginTop: 5,
                  marginBottom: 15,
                }}
              >
                <CustomText
                  text={productData?.description}
                  numberOfLines={3}
                  fontWeight="500"
                  size={isiPad ? 15 : 12}
                  color={colors.lightBlack}
                />
              </View>
            </View>

            <CustomLine />
            {addonsItems?.length > 0 && addonsItems !== undefined && (
              <View
                style={{
                  marginHorizontal: 15,
                  marginVertical: 12,
                }}
              >
                <>
                  {addonsItems?.map((addon: any, index) => {
                    const borderColor = animatedValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: ["transparent", colors.primary],
                    });
                    return (
                      <Animated.View
                        onLayout={(event) => onItemLayout(event, index)}
                        style={{
                          borderWidth: 1.5,
                          marginVertical: 12,
                          padding: scale(10),
                          borderRadius: 10,
                          borderColor:
                            blinkingIndex === index ? borderColor : "#adb5bd",
                          backgroundColor:
                            addon?.type != 2 || addon?.minimum > 0
                              ? !addon?.disable
                                ? "#f8f9fa"
                                : "#092F7420"
                              : colors.white,
                        }}
                        key={index}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              marginBottom: 10,
                            }}
                          >
                            <CustomText
                              text={addon?.name}
                              fontFam={font.montserratBold}
                              fontWeight="bold"
                              color={colors.lightBlack}
                              size={isiPad ? 18 : 14}
                            />
                            <CustomText
                              text={
                                addon?.type != 2 || addon?.minimum > 0
                                  ? "*"
                                  : ""
                              }
                              fontFam={font.montserratBold}
                              fontWeight="bold"
                              color={colors.warning}
                              size={isiPad ? 18 : 14}
                            />
                          </View>
                          <View>
                            {addon?.disable ? (
                              <CustomText
                                text={
                                  addon?.type == 2
                                    ? `${localize?.order_details_addon_between_title} ${addon?.minimum} - ${addon?.maximum}`
                                    : `${localize?.order_details_addon_select_title}`
                                }
                                fontFam={font.montserratBold}
                                fontWeight="bold"
                                color={colors.lightBlack}
                                size={isiPad ? 18 : 14}
                                style={{ marginLeft: 10 }}
                              />
                            ) : (
                              <CustomText
                                text={
                                  addon?.type == 2 && addon?.minimum <= 0
                                    ? `${localize?.order_details_addon_between_title} ${addon?.minimum} - ${addon?.maximum}`
                                    : `${localize?.order_details_addon_completed_title}`
                                }
                                fontFam={font.montserratBold}
                                fontWeight="bold"
                                color={colors.lightBlack}
                                size={isiPad ? 18 : 14}
                                style={{ marginLeft: 10 }}
                              />
                            )}
                          </View>
                        </View>
                        {addon?.items
                          ?.filter(
                            (fil: any) =>
                              fil.addon_sold_out != "sold_out_permanently"
                          )
                          .map((item: any, ind: number) => {
                            return (
                              <OrdersAddon
                                boxColor={
                                  addon?.type != 2 || addon?.minimum > 0
                                    ? !addon?.disable
                                      ? "#e9ecef"
                                      : "#092F7420"
                                    : colors.white
                                }
                                item={item}
                                onPressAddons={() => {
                                  onPressAddons(index, ind, item, addon);
                                }}
                                addons={addon}
                              />
                            );
                          })}
                      </Animated.View>
                    );
                  })}
                </>
              </View>
            )}

            <View
              style={{
                paddingHorizontal: 15,
                paddingVertical: 10,
              }}
            >
              <CustomText
                text={localize?.order_details_special_instructions_field_label}
                size={isiPad ? 18 : 13}
                // fontFam={font.montserratMedium}
                fontWeight="500"
              />
              <View
                style={{
                  backgroundColor: colors.offWhite,
                  height: 150,
                  marginTop: 20,
                  borderRadius: 10,
                }}
              >
                <View
                  style={{
                    paddingTop: 2,
                    paddingHorizontal: 10,
                    height: 50,
                  }}
                >
                  <CustomInput
                    placeholder={
                      localize?.order_details_special_instructions_place_holder
                    }
                    textColor={colors.black}
                    value={notes}
                    onChangeText={(text) => setNotes(text)}
                    style={{ fontStyle: "italic" }}
                  />
                </View>
              </View>
            </View>
          </View>
        )}
      </ScreenLayout>

      <View
        style={{
          height: 80,
          width: "100%",
        }}
      >
        <BottomCart
          amount={Number((price + addonSum) * qualtity).toFixed(2)}
          onAddCart={() => {
            if (checkDisable()) {
              //  console.log(" findFirstDisabledIndex()", findFirstDisabledIndex())
              const index: any = findFirstDisabledIndex();

              scrollToFirstDisabledItem(index);
              setMessage(localize?.order_details_addon_select_validation);
              setIsMessage(true);
              return;
            }

            // if (checkQuantityDisable()) {
            //   Alert.alert(
            //     `${localize?.order_details_product_stock_alert_title}`,
            //     `${localize?.order_details_product_stock_alert_start_description} ${productData?.data?.stock_quantity} ${localize?.order_details_product_stock_alert_end_description}`,

            //     [
            //       {
            //         text: `${localize?.order_details_product_stock_alert_ok_button}`,
            //       },
            //     ]
            //   );

            //   return;
            // }
            setMessage("");
            setIsMessage(false);

            onAddProductToCart();
          }}
          addCartTitle={localize?.order_details_add_to_card}
          disableCart={checkDisable() }
          mainBackgroundColor={
            checkDisable()  ? "#A1A1A1" : colors.primary
          }
          // disableCart={checkDisable() || checkQuantityDisable()}
          // mainBackgroundColor={
          //   checkDisable() || checkQuantityDisable() ? "#A1A1A1" : colors.primary
          // }
          backgroundColor={qualtity == 1 ? colors.darkGrey : colors.white}
          // disabled={qualtity == 1 ? true : false}
          onIncrement={() => {
            console.log("productData", productData?.data);

            if (productData?.data?.stock_control == 1) {
              if (qualtity + 1 > Number(productData?.data?.stock_quantity)) {
                Alert.alert(
                  `${localize?.order_details_product_stock_alert_title}`,
                  `${localize?.order_details_product_stock_alert_start_description} ${productData?.data?.stock_quantity} ${localize?.order_details_product_stock_alert_end_description}`,

                  [
                    {
                      text: `${localize?.order_details_product_stock_alert_ok_button}`,
                    },
                  ]
                );

                return;
              }
            }

            setQuantity((pre) => pre + 1);
          }}
          onDecrement={() => {
            if (qualtity == 1) {
              navigation.goBack();

              return;
            }
            setQuantity((pre) => pre - 1);
          }}
          quantity={qualtity}
        />
      </View>

      <CustomToast
        isVisable={isMessage}
        setIsVisable={setIsMessage}
        message={message}
        marginBottom={60}
        duration={4000}
        color={colors.white}
      />
    </>
  );
};
export default OrderDetailCard;

const styles = StyleSheet.create({
  addonContainer: {
    marginVertical: 12,
    padding: 10,
    borderRadius: 10,
  },
});
