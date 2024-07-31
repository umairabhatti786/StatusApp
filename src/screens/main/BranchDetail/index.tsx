import React, { useEffect, useState } from "react";
import {
  View,
  Dimensions,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  FlatList,
} from "react-native";
import ScreenLayout from "../../../components/ScreenLayout";
import { colors } from "../../../utils/colors";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductDetail,
  getProductDetail,
  getProductDetailLoading,
} from "../../../redux/reducers/productDetailReducer";
import { getToken } from "../../../redux/reducers/authReducer";
import ScreenLoader from "../../../components/ScreenLoader";
import BottomCart from "../../../components/BottomCart";
import { getSelectedBranch } from "../../../redux/reducers/branchesReducer";
import FastImage from "react-native-fast-image";
import { scale, verticalScale } from "react-native-size-matters";
import CustomText from "../../../components/CustomText";
import { convertTo12HourFormat, windowWidth } from "../../../utils/CommonFun";
import { font } from "../../../utils/font";
import { appStyles } from "../../../utils/AppStyles";
import CustomLine from "../../../components/CustomLine";
import { images } from "../../../assets";
import { Spacer } from "../../../components/Spacer";
import BranchInfo from "./BranchInfo";
import { getLocalizeFile } from "../../../redux/reducers/localizeReducer";
let selectedAddon = [];

type Props = {
  navigation?: any;
  route?: any;
};

const BranchDetail = ({ navigation, route }: Props) => {
  const productData = useSelector(getProductDetail);
  const token = useSelector(getToken);
  const loading = useSelector(getProductDetailLoading);
  const localize: any = useSelector(getLocalizeFile);

  const branchData = route?.params?.item;

  const getToday = () => {
    var days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    var d = new Date();
    var dayName = days[d.getDay()];
    let arr = [];
    Object.keys(branchData.timing).forEach((i, ind) =>
      arr.push({
        [`${Object.keys(branchData.timing)[ind]}`]: Object.values(
          branchData.timing
        )[ind],
      })
    );
    let todayTiming = Object.keys(branchData.timing).find(
      (i) => i.toLowerCase() == dayName.toLowerCase()
    );
    return branchData.timing[`${todayTiming}`];
  };

  const InfoHeader = ({
    img,
    title,
    lineWidth,
    iconWidth,
    iconHeight,
    textStyle,
  }: any) => {
    return (
      <View style={styles.infoContainer}>
        <View style={{ ...appStyles.row, paddingBottom: verticalScale(5) }}>
          <Image
            source={img}
            style={{
              width: scale(iconWidth || 16),
              height: scale(iconHeight || 16),
              tintColor: colors.primary,
            }}
          />
          <Spacer width={scale(10)} />
          <CustomText
            text={title}
            size={16}
            fontFam={font.montserratMedium}
            fontWeight="500"
            style={textStyle}
            color={colors.primary}
          />
        </View>

        <CustomLine
          width={scale(lineWidth || 80)}
          height={4}
          backgroundColor={colors.primary}
        />
      </View>
    );
  };

  return loading ? (
    <>
      <ScreenLoader />
    </>
  ) : (
    <>
      <ScreenLayout
        navigation={navigation}
        title={localize?.branch_detail_title}
        style={{
          paddingHorizontal: 20,
          marginBottom: verticalScale(20),
        }}
        isProfileVisible
      >
        <View
          style={{
            backgroundColor: colors.white,
            marginTop: "5%",
            paddingBottom: "15%",
            borderRadius: 7,
          }}
        >
          <View
            style={{
              width: "100%",
              height: verticalScale(250),
              paddingHorizontal: 10,
              marginTop: 10,
            }}
          >
            <FastImage
              source={{ uri: branchData?.icon }}
              style={{ width: "100%", height: "100%", borderRadius: 7 }}
              resizeMode="cover"
            />
          </View>
          <View
            style={{
              paddingHorizontal: 22,
              paddingTop: 10,
            }}
          >
            <View>
              <CustomText
                text={branchData?.name}
                size={16}
                style={{ width: windowWidth / 2 }}
                fontFam={font.montserratMedium}
                fontWeight="500"
              />
            </View>

            <View
              style={{ ...appStyles.row, marginVertical: verticalScale(10) }}
            >
              {!branchData?.open && (
                <CustomText
                  text={localize?.branch_detail_close_title}
                  size={13}
                  color="red"
                  fontFam={font.montserratMedium}
                  fontWeight="500"
                />
              )}
              {getToday().open && (
                <CustomText
                  text={` ${localize?.branch_detail_today_timings_title} ${
                    getToday().open
                      ? convertTo12HourFormat(getToday().open)
                      : ""
                  } - ${
                    getToday().close
                      ? convertTo12HourFormat(getToday().close)
                      : ""
                  }`}
                  size={13}
                  color={colors.grey100}
                  style={{ marginLeft: !branchData?.open ? scale(10) : 0 }}
                  fontFam={font.montserratMedium}
                  fontWeight="500"
                />
              )}
            </View>

            <CustomLine height={2} />
            {branchData?.tags.length > 0 && (
              <>
                <InfoHeader
                  img={images.tag}
                  title={localize?.branch_detail_tags_title}
                />

                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    width: "100%",
                    gap: scale(5),
                    marginBottom: verticalScale(10),
                  }}
                >
                  {branchData?.tags.map((item: any, index: any) => {
                    return (
                      <View style={{ ...appStyles.row, flexWrap: "nowrap" }}>
                        <CustomText
                          text={item?.name}
                          size={13}
                          label={
                            branchData?.tags?.length != index + 1 ? "," : ""
                          }
                          fontFam={font.montserratMedium}
                          fontWeight="500"
                        />
                      </View>
                    );
                  })}
                </View>

                <CustomLine height={2} />
              </>
            )}

            <InfoHeader
              img={images.info}
              title={localize?.branch_detail_about_title}
            />

            <BranchInfo img={images.location} name={branchData.address} />
            <BranchInfo img={images.unfilledPhone} name={branchData.phone} />
            <InfoHeader
              img={images.clock}
              title={localize?.branch_detail_timings_title}
            />

            <View
              style={{ flexDirection: "row", marginTop: verticalScale(10) }}
            >
              <FlatList
                keyExtractor={(item, index) => item.toString() + index}
                data={Object.keys(branchData.timing)}
                renderItem={({ item, index }) => {
                  return (
                    <CustomText
                      text={item.toUpperCase()}
                      size={15}
                      fontFam={font.montserratMedium}
                      fontWeight="600"
                      style={{ marginVertical: verticalScale(10) }}
                      color={colors.primary}
                    />
                  );
                }}
              />
              <FlatList
                data={Object.values(branchData.timing)}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => {
                  return (
                    <CustomText
                      text={
                        !item?.open
                          ? `${localize?.branch_detail_off_title}`
                          : `${
                              item?.open
                                ? convertTo12HourFormat(
                                    item?.open.toUpperCase()
                                  )
                                : ""
                            } -  ${
                              item.close
                                ? convertTo12HourFormat(
                                    item?.close.toUpperCase()
                                  )
                                : ""
                            }`
                      }
                      size={15}
                      fontFam={font.montserratMedium}
                      fontWeight="500"
                      style={{
                        marginVertical: verticalScale(10),
                        textAlign: "center",
                      }}
                      color={colors.black}
                    />
                  );
                }}
              />
            </View>

            <InfoHeader
              img={images.coffeecup}
              lineWidth={130}
              title={localize?.branch_detail_break_timings_title}
              iconHeight={18}
              textStyle={{ marginTop: verticalScale(5) }}
              iconWidth={18}
            />

            <View
              style={{ flexDirection: "row", marginTop: verticalScale(10) }}
            >
              <FlatList
                keyExtractor={(item, index) => item.toString() + index}
                data={Object.keys(branchData.timing)}
                renderItem={({ item, index }) => {
                  return (
                    <CustomText
                      text={item.toUpperCase()}
                      size={15}
                      fontFam={font.montserratMedium}
                      fontWeight="600"
                      style={{ marginVertical: verticalScale(10) }}
                      color={colors.primary}
                    />
                  );
                }}
              />
              <FlatList
                data={Object.values(branchData.timing)}
                keyExtractor={(item, index) => index}
                renderItem={({ item }) => {
                  return (
                    <CustomText
                      text={
                        !item?.break_start
                          ? `${localize?.branch_detail_off_title}`
                          : `${
                              item?.break_start
                                ? convertTo12HourFormat(
                                    item?.break_start.toUpperCase()
                                  )
                                : ""
                            } -  ${
                              item?.break_end
                                ? convertTo12HourFormat(
                                    item?.break_end.toUpperCase()
                                  )
                                : ""
                            }`
                      }
                      size={15}
                      fontFam={font.montserratMedium}
                      fontWeight="500"
                      style={{
                        marginVertical: verticalScale(10),
                        textAlign: "center",
                      }}
                      color={colors.black}
                    />
                    // <Text
                    //   style={[
                    //     styles.headingStyle,
                    //     { marginVertical: verticalScale(10) },
                    //   ]}
                    // >
                    //   {item?.open.toUpperCase()} - {item?.close.toUpperCase()}
                    // </Text>
                  );
                }}
              />
            </View>
          </View>
        </View>
      </ScreenLayout>
    </>
  );
};
export default BranchDetail;

const styles = StyleSheet.create({
  infoContainer: {
    alignSelf: "center",
    alignItems: "center",
    marginVertical: verticalScale(10),
  },
  headingStyle: {
    textAlign: "justify",
    marginLeft: scale(5),
    fontFamily: font.montserratBold,
  },
});
