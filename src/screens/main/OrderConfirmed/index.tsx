import React, { useEffect, useState } from "react";
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
  Linking,
  TouchableOpacity,
} from "react-native";
import { colors } from "../../../utils/colors";
import { images } from "../../../assets";
import CustomText from "../../../components/CustomText";
import { font } from "../../../utils/font";
import ScreenLayout from "../../../components/ScreenLayout";
import CustomLine from "../../../components/CustomLine";
import CartTotal from "../../../components/CartTotal";
import OrderTrack from "../../../components/OrderTrack";
import StoreMarker from "../../../components/StoreMarker";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { URLS } from "../../../api/urls";
import { useSelector } from "react-redux";
import { getUserLocation } from "../../../redux/reducers/locationReducer";
import { getSelectedBranch } from "../../../redux/reducers/branchesReducer";
import { StackActions } from "@react-navigation/native";

import {
  DelIVERY_ADDRESS,
  StorageServices,
} from "../../../utils/hooks/StorageServices";
import { Spacer } from "../../../components/Spacer";
import { getLocalizeFile } from "../../../redux/reducers/localizeReducer";
import { appStyles } from "../../../utils/AppStyles";
import { dollarSymbol, windowWidth } from "../../../utils/CommonFun";
import { verticalScale } from "react-native-size-matters";
import Collapsible from "react-native-collapsible";
import OrderDetailCard from "./OrderDetailCard";

type Props = {
  navigation?: any;
  route?: any;
};

const windowHeight = Dimensions.get("window").height;
const OrderConfirmed = ({ navigation, route }: Props) => {
  const userLocation = useSelector(getUserLocation);
  const selectedBranch = useSelector(getSelectedBranch);
  const [deliveryAddress, setDeliveryAddress] = useState();
  const localize: any = useSelector(getLocalizeFile);
  const [showOrderDetail, setShowOrderDetail] = useState(true);

  let orderDetail = route?.params?.orderDetail?.orderDetails;
  let branchDetail = route?.params?.orderDetail?.orderDetails?.branch;
  let orderID = route?.params?.orderDetail?.orderID;
  // <CartDetail
  //               item={"Points balance"}
  //               value={dollarSymbol + `${pointsPay.toFixed(2)}`}
  //             />

  useEffect(() => {
    getDeliveryAddress();
  }, []);

  console.log('OrderDetail',orderDetail)

  const getDeliveryAddress = async () => {
    const address = await StorageServices.getItem(DelIVERY_ADDRESS);
    let delAddress = JSON.parse(address);
    setDeliveryAddress(delAddress);
  };

  const orderDesitnationList = [
    {
      latitude: Number(selectedBranch?.location?.lat),
      longitude: Number(selectedBranch?.location?.lon),
    },

    {
      latitude: Number(deliveryAddress?.location?.lat),
      longitude: Number(deliveryAddress?.location?.lon),
      destination: true,
    },
  ];

  const Container = ({ txt, txt1, txt1Color, fontWeight }: any) => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingVertical: 10,
        }}
      >
        {/* <Text style={{textAlign:"right"}}></Text> */}
        <CustomText
          size={14}
          fontWeight="500"
          fontFam={font.montserratMedium}
          color={colors.lightBlack}
          text={txt}
        />
        <View style={{ width: windowWidth / 2 }}>
          <CustomText
            size={13}
            fontWeight={fontWeight || "600"}
            style={{ textAlign: "right" }}
            numberOfLines={3}
            fontFam={font.montserratMedium}
            color={txt1Color || colors.lightBlack}
            text={txt1}
          />
        </View>
      </View>
    );
  };

  const TotalDetail = ({ item, value, fontWeight, size, color }: any) => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 20,
          paddingHorizontal: 15,
        }}
      >
        <CustomText
          text={item}
          size={size || 14}
          color={color}
          fontWeight={fontWeight || "700"}
          fontFam={font.montserratMedium}
        />
        <View style={{ minWidth: 70, alignItems: "flex-end" }}>
          <CustomText
            text={value}
            size={size || 14}
            color={colors.primary}
            fontWeight={fontWeight || "500"}
          />
        </View>
      </View>
    );
  };

  return (
    <ScreenLayout
      navigation={navigation}
      title={localize?.active_order_title}
      style={{}}
      bgColor={colors.white}
      helpButton={localize?.active_order_help_button}
      onPressHelp={() => {
        let phoneNumberToDial = `tel:${orderDetail?.branch?.phone}`;

        Linking.openURL(phoneNumberToDial).catch((err) => {
          console.log(err);
        });
      }}
      height={"100%"}
      isLineVisible={true}
      onBackPress={() => {
        navigation.dispatch(
          StackActions.replace("Home", { test: "HomeStack" })
        );
        // navigation.navigate("HomeStack")s
      }}
      linePosition={"flex-end"}
    >
      <View style={{ flex: 1, backgroundColor: colors.white }}>
        {orderDetail.type == 1 && (
          <View style={{ height: 370 }}>
            <View style={{ height: 4, backgroundColor: colors.grey }} />

            {Object.keys(userLocation).length > 0 && (
              <MapView
                zoomControlEnabled={false}
                showsBuildings={true}
                initialRegion={{
                  latitude: userLocation?.latitude,
                  longitude: userLocation?.longitude,
                  latitudeDelta: 0.039330183268125069,
                  longitudeDelta: 0.045962757229776571,
                }}
                // provider={PROVIDER_GOOGLE}
                style={{
                  height: "100%",
                  width: "100%",
                  marginTop: 5,
                }}
              >
                <MapViewDirections
                  strokeWidth={3}
                  strokeColor={colors.primary}
                  origin={orderDesitnationList[0]}
                  destination={orderDesitnationList[1]}
                  apikey={URLS.GOOGLE_MAP_KEY}
                />

                <Marker
                  // key={index}
                  coordinate={{
                    latitude: orderDesitnationList[0]?.latitude
                      ? Number(orderDesitnationList[0]?.latitude)
                      : userLocation?.latitude,
                    longitude: orderDesitnationList[0]?.longitude
                      ? Number(orderDesitnationList[0]?.longitude)
                      : userLocation?.longitude,
                  }}
                  // identifier={index.toString()}
                >
                  <StoreMarker />
                </Marker>

                <Marker
                  // key={index}
                  coordinate={{
                    latitude: orderDesitnationList[1]?.latitude
                      ? Number(orderDesitnationList[1]?.latitude)
                      : userLocation?.latitude,
                    longitude: orderDesitnationList[1]?.longitude
                      ? Number(orderDesitnationList[1]?.longitude)
                      : userLocation?.longitude,
                  }}
                  // identifier={index.toString()}
                >
                  <View style={{ width: 30, height: 30 }}>
                    <Image
                      resizeMode="contain"
                      style={{ width: "100%", height: "100%" }}
                      source={images.destination}
                    />
                  </View>
                </Marker>
              </MapView>
            )}
          </View>
        )}

        <View
          style={{ padding: 15, marginTop: 10, backgroundColor: colors.white }}
        >
          <CustomText
            size={16}
            fontWeight="600"
            fontFam={font.montserratMedium}
            color={colors.primary}
            text={localize?.active_order_Detail_title}
          />
          <Spacer height={10} />

          <View style={{ ...appStyles.rowJustify, paddingVertical: 10 }}>
            <CustomText
              size={14}
              fontWeight="500"
              fontFam={font.montserratMedium}
              color={colors.lightBlack}
              text={localize?.active_order_number_title}
            />

            <View
              style={{
                paddingHorizontal: 15,
                backgroundColor: colors.darkGrey,
                borderRadius: 30,
                paddingVertical: 3,
              }}
            >
              <CustomText
                size={13}
                fontWeight="700"
                fontFam={font.montserratMedium}
                color={colors.lightBlack}
                text={`${orderID}`}
              />
            </View>
          </View>

          <Container
            txt={localize?.active_order_from_title}
            txt1={branchDetail?.name}
            txt1Color={colors.primary}
          />
          {orderDetail.type == 1 && (
            <Container
              txt={localize?.active_order_delivery_address_title}
              txt1={`${orderDetail?.data?.delivery?.user_address?.address}`}
              txt1Color={colors.primary}
            />
          )}

          <Container
            txt={localize?.active_order_total_title}
            fontWeight={"700"}
            txt1={dollarSymbol + `${orderDetail?.total}`}
            txt1Color={colors.primary}
          />
        </View>
        <View style={{ marginBottom: verticalScale(20) }}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => setShowOrderDetail(!showOrderDetail)}
            style={{
              backgroundColor: colors.white,
              paddingHorizontal: 15,
              borderTopWidth: 0.5,
              borderBottomWidth: showOrderDetail ? 0.5 : 0,
              borderColor: colors.darkGrey,
              height: 50,
              justifyContent: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <View style={appStyles.row}>
                <CustomText
                  text={localize?.active_order_view_detail_title}
                  size={15}
                  fontWeight="700"
                  color={colors.primary}
                  fontFam={font.montserratSemiBold}
                  // style={{ marginLeft: 10 }}
                />
                <CustomText
                  text={`(${orderDetail?.products.length} items)`}
                  size={14}
                  fontWeight="700"
                  color={colors.lightBlack}
                  fontFam={font.montserratSemiBold}
                  style={{ marginLeft: 5 }}
                />
              </View>

              {showOrderDetail ? (
                <Image
                  source={images.arrowDown}
                  style={{ width: 22, height: 15, marginTop: 2 }}
                />
              ) : (
                <Image
                  source={images.up}
                  style={{ width: 22, height: 15, marginTop: 2 }}
                  resizeMode="contain"
                />
              )}
            </View>
          </TouchableOpacity>

          <Collapsible collapsed={showOrderDetail}>
            <OrderDetailCard
              products={orderDetail?.products}
              orderValues={orderDetail?.values}
              addonsTitle={localize?.active_order_addons_title}

              total={orderDetail?.total}
            />

            <View style={{ paddingTop: 15, backgroundColor: "#F7F5F8" }}>
              <TotalDetail
                fontWeight={"700"}
                item={localize?.active_order_subtotal_title}
                color={colors.primary}
                value={dollarSymbol + `${Number(orderDetail?.values.subtotal).toFixed(2)}`}
              />

{
                Number(orderDetail?.values?.discount).toFixed(2)>0&&(

                  <TotalDetail
                  fontWeight={"500"}
                  item={localize?.active_order_discount_title}
                  value={
                    dollarSymbol +
                    `${Number(orderDetail?.values?.discount).toFixed(2)}`
                  }
                />
                  
                )
              }
              {
                Number(orderDetail?.values?.tax).toFixed(2)>0&&(
                  <TotalDetail
                  fontWeight={"500"}
                  item={localize?.active_order_tax_title}
                  value={
                    dollarSymbol +
                    `${Number(orderDetail?.values?.tax).toFixed(2)}`
                  }
                />

                )
              }
              {
                Number(orderDetail?.values?.packaging_charges).toFixed(2)>0&&(
                  <TotalDetail
                  fontWeight={"500"}
                  item={localize?.active_order_packaging_charges_title}
                  value={
                    dollarSymbol +
                    `${Number(orderDetail?.values?.packaging_charges).toFixed(2)}`
                  }
                />

                )
              }
             
            {
              Number(orderDetail?.values?.delivery_charges).toFixed(2)>0&&(
                <TotalDetail
                fontWeight={"500"}
                item={localize?.active_order_delivery_charges_title}
                value={
                  dollarSymbol +
                  `${Number(orderDetail?.values?.delivery_charges).toFixed(2)}`
                }
              />

              )
            }
            
              {/* <TotalDetail
                fontWeight={"500"}
                item={localize?.active_order_discount_title}
                value={dollarSymbol + `${orderDetail?.values.discount}`}
              />
              <TotalDetail
                fontWeight={"500"}
                item={localize?.active_order_tax_title}
                value={dollarSymbol + `${orderDetail?.values.tax}`}
              />
              <TotalDetail
                fontWeight={"500"}
                item={localize?.active_order_packaging_charges_title}
                value={
                  dollarSymbol + `${orderDetail?.values.packaging_charges}`
                }
              />
              
              <TotalDetail
                fontWeight={"500"}
                item={localize?.active_order_delivery_charges_title}
                value={dollarSymbol + `${orderDetail?.values.delivery_charges}`}
              /> */}
              {
                orderDetail.points_pay&&(
                  <TotalDetail
                  fontWeight={"500"}
                  item={localize?.active_order_points_balance_title}
                  value={dollarSymbol + `${orderDetail.points_pay}`}
                />

                )

              }
            



              <View style={{ paddingBottom: 15 }}>
                <CustomLine height={1.5} backgroundColor={colors.darkGrey} />
              </View>

              <TotalDetail
                fontWeight={"700"}
                item={localize?.active_order_total_title}
                color={colors.primary}
                size={17}
                value={dollarSymbol + `${orderDetail?.total}`}
              />
            </View>
          </Collapsible>
        </View>
      </View>
    </ScreenLayout>
  );
};
export default OrderConfirmed;
