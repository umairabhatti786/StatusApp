import {
  Animated,
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import FastImage from "react-native-fast-image";
import { scale, verticalScale } from "react-native-size-matters";
import { images } from "../../../assets";
import { colors } from "../../../utils/colors";
import CustomText from "../../../components/CustomText";
import { font } from "../../../utils/font";
import { appStyles } from "../../../utils/AppStyles";
import { dollarSymbol, isiPad } from "../../../utils/CommonFun";
import * as Animatable from "react-native-animatable";
import React, { useEffect, useState } from "react";
import { OrdersAddon } from "../OrderDetailCard/OrdersAddon";
import CustomInput from "../../../components/CustomInput";
import Collapsible from "react-native-collapsible";

import {
  getSelectedOrderHistory,
  setProductQuantity,
  setSelectedOrderHistory,
  updateProductAddons,
  updateSpecialInstructions,
} from "../../../redux/reducers/orderHistoryReducer";

let selectedAddon = [];

type Props = {
  data?: any;
  navigation?: any;
  lastIndex?: boolean;
  cartData?: any;
  index?: any;
  onOrderPress?: () => void;
  setShowQuantity?: any;
  showQuantity?: any;
  products?: any;
  selectedOrder?: any;
  setSelectedOrder?: any;
  bottomSheetModalRef?: any;
  specialInstructionsTitle?: string;
  specialInstructionsPlaceHolder?: string;
  setIsProductDetail?: any;
  isProductDetail?: boolean;
  onAddonsItemLayout?: (event: any, index?: any) => void;
  // onIncrementQuantity?:()=>void

  setIsModalVisible?: React.Dispatch<React.SetStateAction<boolean>>;
};

const OrderHistoryDetailCard = ({
  data,
  lastIndex,
  setIsModalVisible,
  navigation,
  cartData,
  index,
  setShowQuantity,
  showQuantity,
  products,
  selectedOrder,
  setSelectedOrder,
  bottomSheetModalRef,
  specialInstructionsTitle,
  specialInstructionsPlaceHolder,
  setIsProductDetail,
  isProductDetail,
  onAddonsItemLayout,
}: // onIncrementQuantity
Props) => {
  const dispatch = useDispatch();
  // const cardData=useSelector(getCartData)
  const cartExist = cartData?.map((it) => it?.id).includes(data?.id);
  const selectedOrderHistory = useSelector(getSelectedOrderHistory);
  const [resendingTime, setResendingTime] = useState(4); // Initial time in seconds
  // const setQuantity=useSelector(setProductQuantity)

  const [animationType, setAnimationType] = useState("fadeIn");
  const [showAddons, setShowAddons] = useState(true);
  const [quantity, setQuantity] = useState();
  const [addonSum, setAddonSum] = React.useState(0);
  const [price, setPrice] = React.useState(0);
  const [notes, setNotes] = useState("");
  const [addonsItems, setAddonsItems] = React.useState([]);
  const [specialInstruction, setSpecialInstructions] = useState();
  // const [showQuantity, setShowQuantity] = useState(-1);

  useEffect(() => {
    setShowQuantity(-1);
  }, [bottomSheetModalRef]);

  useEffect(() => {
    setAddonsItems(data?.addons);
    setSpecialInstructions(data?.data?.notes);
    setPrice(parseFloat(data.price));
  }, [data?.addons]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setResendingTime((prev) => prev - 1);
    }, 1000);

    if (resendingTime === 0) {
      setAnimationType("fadeOut");

      clearInterval(intervalId);
      setResendingTime(0);
      setTimeout(() => {
        setShowQuantity(-1);
      }, 1000);
    }

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [resendingTime]);

  const onCLick = () => {
    console.log("CLIKED");
    setIsModalVisible && setIsModalVisible(true);
  };
  let isDisable =
    data?.data?.product_sold_out !== "available" ||
    (data?.data &&
      data?.data?.stock_control === 1 &&
      data?.data?.stock_quantity === 0);

  const onPressAddons = (addonindex: any, ind: any, val: any, addons: any) => {
    var addonMenu = [...addonsItems];
    let addonsArray = [];
    if (addons?.type == "1" && addons.required == "1") {
      addonsArray = addons?.items.map((addon) => {
        if (addon?.name === addonMenu[addonindex]?.items[ind]?.name) {
          return {
            ...addon,
            selected: true,
          };
        } else {
          return {
            ...addon,
            selected: false, // Ensure other items have selected property set to false
          };
        }
      });
    }
    if (addons?.type === "2") {
      addonsArray = addons?.items.map((addon) => {
        if (addon.name === addonMenu[addonindex]?.items[ind]?.name) {
          let sum = 0;
          sum += parseFloat(addon?.price);

          return {
            ...addon,
            selected: !addon.selected,
            addonSum: sum,
          };
        }
        return addon; // Return the original addon if it doesn't match the condition
      });
    }
    addonMenu[addonindex] = {
      ...addonMenu[addonindex],
      items: addonsArray,
    };

    let sum = 0;
    addonMenu?.forEach(function (v) {
      v?.items?.forEach(function (value) {
        sum += value?.selected && parseFloat(value.price);
      });
    });

    const payload = {
      index: index,
      addonSum: sum,
      addonindex: addonindex,
      addons: addonsArray,
    };

    dispatch(updateProductAddons(payload));

    setAddonsItems(addonMenu);
  };

  const onIncrementQuantity = () => {
    setResendingTime(4);

    const payload = {
      index: index,
      item: data,
      increment: "increment",
    };
    // setProductQuantity

    dispatch(setProductQuantity(payload));
  };
  const onDecrement = (id: any) => {
    setResendingTime(4);
    let products = [...selectedOrderHistory];
    if (data.quantity == 1) {
      let filterProducts = products.filter((it, ind) => ind !== index);
      if (filterProducts?.length == 0) {
        bottomSheetModalRef.current.close();
        setShowQuantity(-1);
      }
      dispatch(setSelectedOrderHistory(filterProducts));

      return;
    }
    setResendingTime(4);

    const payload = {
      index: index,
      item: data,
      decrement: "decrement",
    };
    // setProductQuantity

    dispatch(setProductQuantity(payload));

    setQuantity((prev) => prev - 1);
  };

  const onChangeInstruction = (txt) => {
    const payload = {
      index: index,
      notes: txt,
    };
    dispatch(updateSpecialInstructions(payload));
    // setSpecialInstructions(txt)
    // console.log("ckdnckdnkc",txt)
  };
  return (
    <View>
      <TouchableOpacity
        disabled={isDisable}
        activeOpacity={0.3}
        onPress={() => {
          setIsProductDetail(!isProductDetail);
          setShowAddons(!showAddons);
        }}
        style={{ paddingVertical: 5 }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: colors.white,
            height: verticalScale(80),
          }}
        >
          <View style={{ alignSelf: "center", justifyContent: "center" }}>
            {showQuantity == index && (
              <>
                <Animatable.View animation={animationType}>
                  <TouchableOpacity
                    disabled={isDisable}
                    style={{
                      ...styles.quantitybtn,
                      marginBottom: verticalScale(3),
                    }}
                    onPress={() => onDecrement(data.id)}
                  >
                    <Image
                      source={images.minus}
                      resizeMode="contain"
                      style={{
                        width: isiPad ? 18 : 12,
                        height: isiPad ? 18 : 12,
                        tintColor: colors.white,
                      }}
                    />
                  </TouchableOpacity>
                </Animatable.View>
              </>
            )}
            <TouchableOpacity
              disabled={isDisable}
              onPress={() => {
                setShowQuantity(index);
                setAnimationType("fadeIn");
                setResendingTime(4);
              }}
              activeOpacity={0.4}
              style={{
                width: scale(showQuantity == index ? 40 : 40),
                height: verticalScale(showQuantity == index ? 35 : 25),
                borderWidth: showQuantity == index ? -1 : 1.5,
                borderColor: colors.primary35,
                backgroundColor: colors.white,
                marginRight: scale(10),
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                borderRadius: scale(2),
                elevation: showQuantity == index ? 5 : 0,

                shadowColor: colors.black,
                shadowOffset: { width: 3, height: 3 },
                shadowOpacity: showQuantity == index ? 0.3 : 0,
                shadowRadius: showQuantity == index ? 5 : 0,
                marginLeft: scale(2),
              }}
            >
              <CustomText
                text={`${data.quantity}`}
                color={colors.primary}
                fontWeight={"600"}
                style={{ marginRight: scale(3) }}
                fontFam={font.montserratMedium}
                size={verticalScale(10)}
              />
            </TouchableOpacity>

            {showQuantity == index && (
              <Animatable.View animation={animationType}>
                <TouchableOpacity
                  disabled={isDisable}
                  style={{ ...styles.quantitybtn, marginTop: verticalScale(5) }}
                  onPress={onIncrementQuantity}
                >
                  <Image
                    source={images.plus}
                    resizeMode="contain"
                    style={{
                      width: isiPad ? 18 : 12,
                      height: isiPad ? 18 : 12,
                      tintColor: colors.white,
                    }}
                  />
                </TouchableOpacity>
              </Animatable.View>
            )}
          </View>

          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: colors.white,
            }}
          >
            <FastImage
              source={{ uri: data?.image }}
              style={{
                width: scale(50),
                height: verticalScale(isiPad ? 50 : 40),
                opacity: isDisable ? 0.5 : 1,
                borderRadius: scale(7),
              }}
            />
          </View>
          <View style={{ width: "45%", marginLeft: scale(10) }}>
            <View
              style={{
                height: verticalScale(isiPad ? 45 : 40),
                justifyContent: "center",
              }}
            >
              <CustomText
                text={data?.name}
                fontWeight={"500"}
                numberOfLines={1}
                style={{ marginTop: 2, opacity: isDisable ? 0.5 : 1 }}
                fontFam={font.montserratMedium}
                size={verticalScale(isiPad ? 12 : 9.5)}
              />

              <CustomText
                text={data?.description}
                numberOfLines={2}
                style={{
                  marginTop: isiPad ? verticalScale(8) : 5,
                  opacity: isDisable ? 0.5 : 1,
                }}
                size={verticalScale(isiPad ? 10 : 8.5)}
                color={colors.lightBlack}
              />
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.3}
            disabled={isDisable}
            onPress={() => setShowAddons(!showAddons)}
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <View style={appStyles.row}>
              <View>
                {isDisable ? (
                  <CustomText
                    style={{ marginLeft: 5, textAlign: "center" }}
                    color={"red"}
                    size={verticalScale(8)}
                    text={"OUT OF STOCK"}
                  />
                ) : (
                  <>
                    {data?.discounted_price > 0 && (
                      <CustomText
                        style={{ textDecorationLine: "line-through" }}
                        color={colors.grey100}
                        size={verticalScale(8.5)}
                        text={
                          dollarSymbol +
                          `${Number(data.discounted_price).toFixed(2)}`
                        }
                      />
                    )}

                    <CustomText
                      style={{
                        opacity: isDisable ? 0.5 : 1,
                      }}
                      size={verticalScale(8.5)}
                      text={
                        dollarSymbol +
                        `${Number(
                          (parseFloat(data?.price) +
                            parseFloat(data?.addonSum)) *
                            data?.quantity
                        ).toFixed(2)}`
                      }
                    />
                  </>
                )}
              </View>

              <TouchableOpacity
                style={{
                  ...appStyles.row,
                  // backgroundColor:"red",
                  height: verticalScale(50),
                }}
                onPress={() => setShowAddons(!showAddons)}
              >
                <Image
                  source={images.dropdowndark}
                  style={{
                    width: scale(9),
                    height: verticalScale(9),
                    marginLeft: scale(5),
                    tintColor: colors.primary,
                  }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      <Collapsible collapsed={showAddons}>
        {data?.addons?.length > 0 && data?.addons !== undefined && (
          <View
            style={{
              paddingVertical: 10,
            }}
          >
            <>
              {addonsItems?.map((addon, index) => {
                return (
                  <Animated.View
                    // onLayout={(event) => onAddonsItemLayout(event, index)}

                    style={{
                      borderWidth: 1.5,
                      marginVertical: 12,
                      padding: scale(10),
                      borderRadius: 10,
                      borderColor: "#adb5bd",
                      backgroundColor:
                        addon?.type == "2" || addon?.minimum > "0"
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
                        marginVertical: 10,
                        // backgroundColor:'red'
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                        }}
                      >
                        <CustomText
                          text={addon.name}
                          fontFam={font.montserratBold}
                          fontWeight="bold"
                          color={colors.lightBlack}
                          size={isiPad ? 18 : 14}
                        />
                        <CustomText
                          text={
                            addon?.type != 2 || addon?.minimum > "0" ? "*" : ""
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
                                ? `Between ${addon?.minimum} - ${addon?.maximum}`
                                : "Select at least one"
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
                                ? `Between ${addon?.minimum} - ${addon?.maximum}`
                                : "Completed"
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
                        (fil) => fil?.addon_sold_out != "sold_out_permanently"
                      )
                      .map((item, ind) => {
                        return (
                          <OrdersAddon
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

        <View style={{}}>
          <CustomText
            text={specialInstructionsTitle}
            size={isiPad ? 16 : 13}
            fontFam={font.montserratMedium}
            fontWeight="500"
          />
          <View
            style={{
              backgroundColor: colors.offWhite,
              height: 150,
              marginTop: 20,
              borderRadius: 12,
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
                placeholder={specialInstructionsPlaceHolder}
                textColor={colors.black}
                value={data?.data?.notes}
                onChangeText={onChangeInstruction}
                style={{ fontStyle: "italic" }}
              />
            </View>
          </View>
        </View>
      </Collapsible>
    </View>
  );
};
export default OrderHistoryDetailCard;

const styles = StyleSheet.create({
  quantityConatiner: {
    width: scale(40),
    height: verticalScale(25),
    borderWidth: 1.5,
    borderColor: colors.primary35,
    marginRight: scale(10),
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: scale(2),
  },
  quantitybtn: {
    height: isiPad ? 34 : 25,
    width: isiPad ? 34 : 25,
    backgroundColor: colors.primary,
    borderRadius: 9999,
    justifyContent: "center",
    alignItems: "center",
    left: isiPad ? "30%" : "25%",

    // alignSelf:"center"
  },
});
