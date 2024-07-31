import {
  View,
  StyleSheet,
  Animated,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../../../../utils/colors";
import OrderFeatureCard from "../../../../components/OrderFeatureCard";
import { images } from "../../../../assets";
import { font } from "../../../../utils/font";
import CustomText from "../../../../components/CustomText";
import Card from "../../../../components/Card";
import {
  fetchManuePageContent,
  getManuePageCarousel,
  getManuePageLoadingg,
  getManuePageSlider,
  getRefreshing,
  refreshManuePageContent,
} from "../../../../redux/reducers/manuePageReducer";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../../../../redux/reducers/authReducer";
import { Spacer } from "../../../../components/Spacer";
import CustomSlider from "../../../../components/CustomSlider";
import { setProductsDetails } from "../../../../redux/reducers/productDetailReducer";
import { isiPad, windowHeight } from "../../../../utils/CommonFun";
import { FearuredLayout } from "../../../../utils/Layouts/FearuredLayout";
import * as Animatable from "react-native-animatable";

type Props = {
  progress?: any;
  progressColor?: any;
  height?: number;
  useAngle?: boolean;
  primaryBackgrondColor?: any;
  secondaryBackgrondColor?: any;
  angle?: number;
  navigation?: any;
  setSelectedTab?: any;
  seeAll?: string;
  menu?: any;
  noProductFoundTitle?:any
};
function Featured({ navigation, setSelectedTab, seeAll, menu,noProductFoundTitle }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedIndex1, setSelectedIndex1] = useState(0);
  const dispatch = useDispatch();

  const token = useSelector(getToken);
  const slider = useSelector(getManuePageSlider);
  const carousel = useSelector(getManuePageCarousel);
  const manuePageloading = useSelector(getManuePageLoadingg);
  const refreshing = useSelector(getRefreshing);
  const [loading, setLaoding] = useState(true);

  useEffect(() => {
    getManuepageContent();
  }, []);
  const getManuepageContent = async () => {
    dispatch(fetchManuePageContent(token));
  };

  const onCardPress = (item) => {
    dispatch(setProductsDetails(item));
    navigation.navigate("OrderDetailCard");
    // console.log("onCardPress",item)
  };
  const onScroll = (x: any) => {
    const xPos =
      x.nativeEvent?.contentOffset?.x < 0 ? 0 : x.nativeEvent?.contentOffset?.x;
    const current = Math.floor(xPos / 260);
    if (current > 3) {
      setSelectedIndex(3);
      return;
    }
    setSelectedIndex(current);
  };
  const onScroll1 = (x: any) => {
    const xPos =
      x.nativeEvent?.contentOffset?.x < 0 ? 0 : x.nativeEvent?.contentOffset?.x;
    const current = Math.floor(xPos / 90);
    if (current > 3) {
      setSelectedIndex1(3);
      return;
    }
    setSelectedIndex1(current);
  };

  const onRefresh = () => {
    dispatch(refreshManuePageContent(token));
    // getLocation();
  };
  return manuePageloading ? (
    <>
      <View style={{ margin: 20 }}>
        <FearuredLayout />
      </View>
    </>
  ) : (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={{ paddingBottom: 50, backgroundColor: colors.white }}>
          {carousel?.length == 0 && slider?.length == 0 ? (
            <>
              <View
                style={{
                  height: windowHeight,
                  alignItems: "center",
                  paddingTop: "70%",
                }}
              >
                <CustomText
                  text={noProductFoundTitle}
                  size={14}
                  fontWeight="500"
                  fontFam={font.montserratMedium}
                  color={colors.primary}
                />
              </View>
            </>
          ) : (
            <View
              style={{
                flex: 1,
              }}
            >
              {carousel?.length > 0 && (
                <View
                  style={{
                    flex: 1,
                    marginTop: 15,
                  }}
                >
                  <FlatList
                    onScroll={onScroll}
                    data={carousel}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }: any) => {
                      return (
                        <>
                          <View
                            style={{
                              marginTop: 10,

                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "space-between",
                              marginBottom: 10,
                              paddingHorizontal: isiPad ? 30 : 20,
                            }}
                          >
                            <CustomText
                              text={item?.title}
                              size={isiPad ? 20 : 16}
                              numberOfLines={1}
                              fontWeight="500"
                              color={colors.primary}
                            />
                            <TouchableOpacity
                              activeOpacity={0.6}
                              onPress={() => dispatch(setSelectedTab(menu))}
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                                // backgroundColor:"red",
                                height: 40,
                                width: 50,
                              }}
                            >
                              <CustomText
                                text={seeAll}
                                size={isiPad ? 15 : 12}
                                fontFam={font.montserratMedium}
                                fontWeight="500"
                                color={colors.primary}
                              />
                              <Image
                                source={images.arrow}
                                style={{
                                  width: 20,
                                  height: 20,
                                }}
                              />
                            </TouchableOpacity>
                          </View>
                          {item.carousel_type == "discounted" ? (
                            <Animatable.View
                              duration={1000}
                              animation={"fadeIn"}
                              delay={index * 300}
                            >
                              <Card
                                onPress={(it: any) => onCardPress(it)}
                                data={item?.data}
                                key={index}
                              />
                            </Animatable.View>
                          ) : (
                            <Animatable.View
                              duration={1000}
                              animation={"fadeIn"}
                              delay={index * 300}
                            >
                              <OrderFeatureCard
                                data={item?.data}
                                onPress={(it: any) => onCardPress(it)}
                              />
                            </Animatable.View>
                          )}
                        </>
                      );
                    }}
                  />
                </View>
              )}

              {slider?.length > 0 && (
                <>
                  <Spacer height={20} />

                  <FlatList
                    data={slider}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }: any) => {
                      return (
                        <>
                          <CustomSlider sliderData={item.data} />
                          <Spacer height={20} />
                        </>
                      );
                    }}
                  />
                </>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </>
  );
}

export { Featured };
