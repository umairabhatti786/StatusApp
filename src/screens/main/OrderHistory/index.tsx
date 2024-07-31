import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from "react";
import {
  FlatList,
  View,
  StyleSheet,
  Pressable,
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
  Alert,
} from "react-native";
import ScreenLayout from "../../../components/ScreenLayout";
import { OrderCards } from "../../../utils/Data";
import { colors } from "../../../utils/colors";
import AddtoCartModal from "./AddtoCartModal";
import CustomText from "../../../components/CustomText";
import {
  isCloseToBottom,
  isiPad,
  windowHeight,
} from "../../../utils/CommonFun";
import { font } from "../../../utils/font";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../../../redux/reducers/authReducer";
import {
  fetchMoreOrderHistory,
  fetchOrderHistory,
  getActiveOrders,
  getOrderHistory,
  getOrderLoading,
  getOrderRefreshing,
  getSelectedOrderHistory,
  refreshOrderHistory,
  setProductQuantity,
  setSelectedOrderHistory,
} from "../../../redux/reducers/orderHistoryReducer";
import { getCartData, setCartData } from "../../../redux/reducers/cartReducer";
import OrderHistoryCard from "./OrderHistoryCard";
import { scale, verticalScale } from "react-native-size-matters";
import OrderHistoryDetailCard from "./OrderHistoryDetailCard";
import CustomButton from "../../../components/CustomButton";
import { getLocalizeFile } from "../../../redux/reducers/localizeReducer";
import CustomBottomSheet from "../../../components/CustomBottomSheet";
import { ProductLayout } from "../../../utils/Layouts/ProductLayout";
import * as Animatable from "react-native-animatable";
import CustomToast from "../../../components/CustomToast";

type Props = {
  navigation?: any;
};

const OrderHistory = ({ navigation }: Props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const token = useSelector(getToken);
  const orderHistory = useSelector(getOrderHistory);
  const loading = useSelector(getOrderLoading);
  const refreshing = useSelector(getOrderRefreshing);
  const cartData = useSelector(getCartData);
  const [selectedOrder, setSelectedOrder] = useState<any>({});
  const snapToPoints = ["80%", "85%", "95%"];
  const [showQuantity, setShowQuantity] = useState(-1);
  const selectedOrderHistory = useSelector(getSelectedOrderHistory);
  const [showAddons, setShowAddons] = useState(true);
  const [resendingTime, setResendingTime] = useState(4); // Initial time in seconds
  const [addonsItems, setAddonsItems] = React.useState([]);
  const localize: any = useSelector(getLocalizeFile);
  const activeOrders = useSelector(getActiveOrders);
  const bottomSheetModalRef = useRef(null);
  const [isProductDetail, setIsProductDetail] = useState(false);
  const [addonsItemHeights, setAddonsItemHeights] = useState([]);
  const [message, setMessage] = useState("");
  const [isMessage, setIsMessage] = useState(false);

  let disableProduct = selectedOrderHistory.filter(
    (data: any, index) =>
      data?.data?.product_sold_out !== "available" ||
      (data?.data &&
        data?.data?.stock_control === 1 &&
        data?.data?.stock_quantity === 0)
  );

  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  useEffect(() => {
    getOrder();
  }, []);

  const getOrder = () => {
    const data = {
      token: token,
      page: 1,
    };

    dispatch(fetchOrderHistory(data));
    setPage(2);
  };

  const getRefreshOrder = () => {
    const data = {
      token: token,
      page: 1,
    };

    dispatch(refreshOrderHistory(data));
    setPage(2);
  };

  const onAddCartProduct = () => {
    // let cart: any[] = [];
    let cart: any[] = selectedOrderHistory.filter(
      (data: any, index) =>
        data?.data?.product_sold_out == "available" ||
        (data?.data &&
          data?.data?.stock_control !== 1 &&
          data?.data?.stock_quantity !== 0)
    );
    cart = cart.map((data: any, index: number) => {
      const filteredItems: any[] = [];
      data.addons.forEach((addon: any) => {
        const filteredAddonItems = addon.items.filter(
          (item: any) => item.selected
        );
        if (filteredAddonItems.length > 0) {
          filteredItems.push({
            ...addon,
            items: filteredAddonItems,
          });
        }
      });
      return {
        ...data,
        addons: filteredItems,
        data: {
          ...data.data,
          payment_service: "disabled",
          payment_service_price: 0,
          payment_service_details: {},
        },
        priceByQty:
          (parseFloat(data?.price) + parseFloat(data?.addonSum)) *
          data?.quantity,
        quantity: data?.quantity,
        notes: data?.data?.notes,
        entityID: data?.entity_id,
      };
    });
    // checkDisable();
    cart.forEach((item) => {
      dispatch(setCartData(item));
    });
    bottomSheetModalRef.current.dismiss();
  };
  const onAddCart = () => {
    if (disableProduct.length > 0) {
      if (disableProduct.length == 1 && selectedOrderHistory.length == 1) {
        Alert.alert(
          "",
          `${localize?.past_order_sheet_disable_single_product_alert_start_text} ${disableProduct[0]?.name} ${localize?.past_order_sheet_disable_single_product_alert_end_text}`,
          [
            {
              text: `${localize?.past_order_sheet_disable_single_product_alert_ok_button}`,
              onPress: () => bottomSheetModalRef.current.dismiss(),
              style: "cancel",
            },
          ]
        );
      } else {
        const disabledProductNames = disableProduct
          ?.map((product) => product?.name)
          .join(", ");

        Alert.alert(
          "",
          `${localize?.past_order_sheet_disable_multiple_product_alert_start_text} ${disabledProductNames} ${localize?.past_order_sheet_disable_multiple_product_alert_end_text} `,
          [
            {
              text: `${localize?.past_order_sheet_disable_multiple_product_alert_yes_button}`,
              onPress: () => onAddCartProduct(),
              // style: "cancel",
            },
            {
              text: `${localize?.past_order_sheet_disable_multiple_product_alert_no_button}`,
              onPress: () => bottomSheetModalRef.current.dismiss(),
              style: "destructive",
            },
          ]
        );
      }

      return;
    }

    onAddCartProduct();
  };

  const checkDisable = () => {
    let disabledAddons = [];

    selectedOrderHistory.forEach((data) => {
      const filteredAddonItems = data?.addons.filter(
        (item) => item?.type == "2" && item?.minimum >= "0"
      );
      disabledAddons.push(...filteredAddonItems);
    });

    const results = disabledAddons.map((addon) => {
      // Assuming disable property exists in addon object
      const isDisabled = !addon.disable;
      return isDisabled;
    });

    // Check if all addons are disabled
    const allDisabled = results.every((result) => result);

    return allDisabled;
  };

  const handleScroll = () => {
    const data = {
      token: token,
      page: page,
    };
    dispatch(fetchMoreOrderHistory(data));
    setPage((prevPage) => prevPage + 1);
  };

  const onAddonsItemLayout = (event: any, index?: any) => {
    const { height } = event.nativeEvent.layout;
    setAddonsItemHeights((prevHeights) => {
      const newHeights: any = [...prevHeights];
      newHeights[index] = height;
      return newHeights;
    });
  };

  return (
    <>
      <ScreenLayout
        navigation={navigation}
        title={localize?.profile_setting_order_history_title}
        style={styles.container}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getRefreshOrder} />
        }
        onScroll={({
          nativeEvent,
        }: NativeSyntheticEvent<NativeScrollEvent>) => {
          if (isCloseToBottom(nativeEvent)) {
            handleScroll();
          }
        }}
      >
        <View
          style={{
            marginBottom: 40,
          }}
        >
          {loading ? (
            <>
              <View style={{ marginTop: 20 }}>
                <ProductLayout />
              </View>
            </>
          ) : (
            <View
              style={{
                backgroundColor:
                  orderHistory?.length == 0 && activeOrders?.length == 0
                    ? "transparent"
                    : colors.white,
                marginTop: "5%",
                paddingBottom: 5,
              }}
            >
              {activeOrders.length > 0 && (
                <>
                  <CustomText
                    size={isiPad ? 22 : 17}
                    fontWeight="700"
                    fontFam={font.montserratMedium}
                    color={colors.primary}
                    style={{ marginLeft: 20, marginTop: 20, marginBottom: 10 }}
                    text={localize?.order_history_active_orders}
                  />
                  <FlatList
                    data={activeOrders}
                    nestedScrollEnabled={true}
                    renderItem={({ item, index }) => {
                      return (
                        <Animatable.View
                          duration={1000}
                          animation={"fadeIn"}
                          delay={400}
                        >
                          <OrderHistoryCard
                            cartData={cartData}
                            data={item}
                            key={index}
                            onOrderPress={() => {
                              navigation.navigate("ActiveOrders", {
                                id: item?.id,
                              });
                            }}
                            lastIndex={OrderCards.length === index + 1}
                            navigation={navigation}
                          />
                        </Animatable.View>
                      );
                    }}
                    keyExtractor={(item, index) => index.toString()}
                  />
                </>
              )}

              {orderHistory.length > 0 && (
                <>
                  <CustomText
                    size={isiPad ? 22 : 17}
                    fontWeight="700"
                    fontFam={font.montserratMedium}
                    color={colors.primary}
                    style={{ marginLeft: 20, marginTop: 20, marginBottom: 10 }}
                    text={localize?.order_history_past_orders}
                  />

                  <FlatList
                    data={orderHistory}
                    nestedScrollEnabled={true}
                    renderItem={({ item, index }) => {
                      return (
                        <OrderHistoryCard
                          cartData={cartData}
                          data={item}
                          key={index}
                          onOrderPress={() => {
                            setSelectedOrder(item);
                            let orderProduct = [...item?.products];
                            let order = orderProduct?.map((pro, index) => {
                              let modifiedAddons = Array.isArray(pro?.addons)
                                ? pro.addons.map((obj) => {
                                    if (obj?.required === "1") {
                                      obj = { ...obj, disable: false };
                                    }
                                    if (obj?.type == "2") {
                                      let addonItems = [];

                                      addonItems = obj.items.filter(
                                        (i) => i.selected == true
                                      );

                                      if (
                                        addonItems?.length >
                                          parseInt(obj?.maximum) ||
                                        addonItems?.length <
                                          parseInt(obj?.minimum)
                                      ) {
                                        obj = { ...obj, disable: true };
                                      } else {
                                        obj = { ...obj, disable: false };
                                      }
                                    }
                                    let modifiedItems = obj.items.map(
                                      (item) => ({
                                        ...item,
                                        selected:
                                          item?.selected === true
                                            ? true
                                            : false,
                                      })
                                    );
                                    // Calculate addons price sum for selected items
                                    let addonSum = modifiedItems
                                      .filter((item) => item?.selected)
                                      .reduce(
                                        (sum, item) =>
                                          sum + parseFloat(item?.price),
                                        0
                                      );
                                    return {
                                      ...obj,
                                      items: modifiedItems,
                                      addonSum: addonSum,
                                    };
                                  })
                                : []; // Handle the case where addons is not an array

                              // Sum up the addonSum values from all addons
                              let totalAddonSum = modifiedAddons?.reduce(
                                (sum, addon) => sum + addon?.addonSum,
                                0
                              );

                              // Add addonSum property to pro object
                              return {
                                ...pro,
                                addons: modifiedAddons,
                                addonSum: totalAddonSum,
                              };
                            });

                            // console.log(
                            //   "updatedOrderProduct",
                            //   order,
                            //   order.length
                            // );

                            dispatch(setSelectedOrderHistory(order));
                            bottomSheetModalRef.current.present();
                          }}
                          lastIndex={OrderCards.length === index + 1}
                          navigation={navigation}
                        />
                      );
                    }}
                    keyExtractor={(item, index) => index.toString()}
                  />
                </>
              )}

              {orderHistory?.length == 0 && activeOrders?.length == 0 && (
                <View
                  style={{
                    width: "100%",
                    height: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CustomText
                    size={17}
                    fontWeight="500"
                    // fontFam={font.montserratMedium}
                    color={colors.primary}
                    // style={{ marginLeft: 20, marginTop: 20, marginBottom: 10 }}
                    text={localize?.order_history_no_orders_found}
                  />
                </View>
              )}
            </View>
          )}
        </View>

        <AddtoCartModal
          setIsModalVisible={setIsModalVisible}
          isModalVisible={isModalVisible}
        />
      </ScreenLayout>
      <CustomBottomSheet
        snap={snapToPoints}
        bottomSheetModalRef={bottomSheetModalRef}
      >
        <View style={{ paddingHorizontal: scale(20) }}>
          <CustomText
            text={localize?.past_order_sheet_title}
            size={isiPad ? 28 : 16}
            fontWeight="700"
            fontFam={font.montserratMedium}
            color={colors.primary}
          />
          <FlatList
            data={selectedOrderHistory}
            nestedScrollEnabled={true}
            style={{ paddingTop: 10 }}
            showsVerticalScrollIndicator={false}
            // contentContainerStyle={{ gap: 10 }}
            renderItem={({ item, index }) => {
              return (
                <OrderHistoryDetailCard
                  specialInstructionsTitle={
                    localize?.past_order_sheet_special_instructions_field_label
                  }
                  specialInstructionsPlaceHolder={
                    localize?.past_order_sheet_special_instructions_place_holder
                  }
                  cartData={cartData}
                  data={item}
                  onAddonsItemLayout={(event, index) =>
                    onAddonsItemLayout(event, index)
                  }
                  setIsProductDetail={setIsProductDetail}
                  isProductDetail={isProductDetail}
                  setAddonsItems={setAddonsItems}
                  addonsItems={addonsItems}
                  setShowQuantity={setShowQuantity}
                  bottomSheetModalRef={bottomSheetModalRef}
                  showQuantity={showQuantity}
                  resendingTime={resendingTime}
                  onIncrementQuantity={() => {
                    // setResendingTime(5)

                    const payload = {
                      index: index,
                      item: item,
                    };
                    // setProductQuantity

                    dispatch(setProductQuantity(payload));
                  }}
                  setShowAddons={setShowAddons}
                  selectedOrder={selectedOrder}
                  setSelectedOrder={setSelectedOrder}
                  index={index}
                  key={index}
                  onOrderPress={() => {
                    setSelectedOrder(item);
                    bottomSheetModalRef.current.present();
                  }}
                  lastIndex={OrderCards.length === index + 1}
                  navigation={navigation}
                />
              );
            }}
            keyExtractor={(item, index) => index.toString()}
          />

          <CustomButton
            text={localize?.past_order_sheet_add_cart_button}
            disable={checkDisable() == false ? true : false}
            height={isiPad ? verticalScale(33) : 50}
            shadowOpacity={0.3}
            size={isiPad ? 22 : 16}
            borderColor={checkDisable() ? colors.primary : "#A1A1A1"}
            bgColor={checkDisable() ? colors.primary : "#A1A1A1"}
            onPress={() => {
              onAddCart();
            }}
            style={{ marginTop: verticalScale(20) }}
          />

          <CustomButton
            text={localize?.past_order_sheet_cancel_button}
            bgColor={colors.white}
            height={isiPad ? verticalScale(33) : 50}
            shadowOpacity={0.3}
            size={isiPad ? 22 : 16}
            borderColor={colors.primary}
            borderWidth={1}
            onPress={() => bottomSheetModalRef.current.dismiss()}
            textColor={colors.primary}
            style={{ marginTop: verticalScale(10) }}
          />
        </View>
      </CustomBottomSheet>
      <CustomToast
        isVisable={isMessage}
        setIsVisable={setIsMessage}
        message={message}
        color={colors.white}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    height: "100%",
  },
  cardContainer: {
    backgroundColor: "transparent",
    marginTop: "5%",
    paddingBottom: 5,
  },
});

export default OrderHistory;
