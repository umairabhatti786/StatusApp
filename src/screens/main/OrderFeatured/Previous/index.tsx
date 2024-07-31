import {
  View,
  StyleSheet,
  Animated,
  FlatList,
  Image,
  Text,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import LinearGradient from "react-native-linear-gradient";
import { colors } from "../../../../utils/colors";
import OrderFeatureCard from "../../../../components/OrderFeatureCard";
import { OrderCards, featureCardData } from "../../../../utils/Data";
import { images } from "../../../../assets";
import { font } from "../../../../utils/font";
import CustomText from "../../../../components/CustomText";
import Card from "../../../../components/Card";
import OrderCard from "../../../../components/OrderCard";
import { appStyles } from "../../../../utils/AppStyles";
import { isCloseToBottom, windowHeight } from "../../../../utils/CommonFun";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMenu,
  
  fetchMorePreviousMenu,
  
  fetchPreviousMenu,
  getMenuData,
  getMenuDateLength,
  getMenuLoading,
  getPreviousMenuData,
  getPreviousMenuLength,
  getRefreshMenu,
  previousMenuLoading,
} from "../../../../redux/reducers/manuePageReducer";
import ScreenLoader from "../../../../components/ScreenLoader";
import { getToken, getUserData } from "../../../../redux/reducers/authReducer";
import { getCartData } from "../../../../redux/reducers/cartReducer";
import { PreviousScreenLayout } from "../../../../utils/Layouts/PreviousScreenLayout";
type Props = {
  progress?: any;
  progressColor?: any;
  navigation?: any;
  height?: number;
  useAngle?: boolean;
  primaryBackgrondColor?: any;
  secondaryBackgrondColor?: any;
  angle?: number;
  selectedTab?: string;
  noProductFoundTitle?:string
};
function Previous({ navigation, selectedTab ,noProductFoundTitle}: Props) {
  const [selectedId, setSelectedtId] = useState("");
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const token = useSelector(getToken);
  const menu = useSelector(getPreviousMenuData);
  const cartData = useSelector(getCartData);
  const [page, setPage] = useState(1);
  const menulength = useSelector(getPreviousMenuLength);
  // const isRefreshMenu = useSelector(getRefreshMenu);
  const menuLoadig = useSelector(previousMenuLoading);
  const userData = useSelector(getUserData);
  console.log("userDatamenu", menu);

  // useEffect(()=>{
  //   getMenu();

  // },[])
  // const getMenu = () => {

  //   const params = {s
  //     token: token,
  //     id: Number(1),
  //     page: 1,
  //     search: "",
  //   };
  //   console.log("ManeuData",params)
  //   dispatch(fetchMenu(params));

  // };

  useEffect(() => {
    getMenu();
  }, []);
  const getMenu = () => {
    const params = {
      token: token,
      id: "",
      page: page,
      search: "",
      isPrevious: 1,
    };
    console.log("ManeuData", params);
    dispatch(fetchPreviousMenu(params));
    setPage(2);
  };

  const handleScroll = () => {
    const params = {
      token: token,
      id: "",
      page: page,
      search: "",
      isPrevious: 1,
    };
    console.log("ManeuData", params);
    dispatch(fetchMorePreviousMenu(params));
    setPage((prevPage) => prevPage + 1);
  };
  return (
    <Animated.ScrollView
      showsVerticalScrollIndicator={false}
      onScroll={({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
        if (isCloseToBottom(nativeEvent)) {
          handleScroll();
        }
      }}
      // onScroll={Animated.event(
      //   [{ nativeEvent: { contentOffset: { y: scrollY } } }],
      //   { useNativeDriver: true }
      // )}
      // onMomentumScrollBegin={onMomentumScrollBegin}
      // onMomentumScrollEnd={onMomentumScrollEnd}
      // onScrollEndDrag={onScrollEndDrag}
      // refreshControl={
      //   <RefreshControl refreshing={isRefreshMenu} onRefresh={onRefreshMenu} />
      // }
      scrollEventThrottle={2}
      contentContainerStyle={{ flexGrow: 1 }}
      style={{
        backgroundColor: colors.offWhite,
      }}
      scrollEnabled
      nestedScrollEnabled={true}
    >
      <View
        style={{
          marginBottom: 40,
        }}
      >
        {menuLoadig ? (
          <>
            <View style={{ padding: 20, flex: 1 }}>
              <PreviousScreenLayout />
            </View>
          </>
        ) : (
          <View
            style={{
              backgroundColor: menu.length == 0 ? "transparent" : colors.white,
              marginTop: "5%",
              paddingBottom: 5,
              marginHorizontal: 20,
              borderRadius:10
            }}
          >
            <FlatList
              data={menu}
              nestedScrollEnabled={true}
              onScroll={() => {
                console.log("onScroll");
              }}
              
              ListEmptyComponent={
                <View
                  style={{
                    height: 400,
                    alignItems: "center",
                    justifyContent: "center",
                    alignSelf: "center",
                    // marginLeft:windowWidth/3.5
                  }}
                >
                  {menuLoadig ? (
                    <></>
                  ) : (
                    <CustomText
                      text={noProductFoundTitle}
                      size={14}
                      fontWeight="500"
                      style={{ textAlign: "center" }}
                      fontFam={font.montserratMedium}
                      color={colors.primary}
                    />
                  )}
                </View>
              }
              renderItem={({ item, index }) => {
                return (
                  <OrderCard
                    cartData={cartData}
                    data={item}
                    key={index}
                    lastIndex={OrderCards.length === index + 1}
                    navigation={navigation}
                  />
                );
              }}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        )}
        {/* {menuLoadig ? (
          <>
            <View
              style={{
                height: "80%",
              }}
            >
              <ScreenLoader />
            </View>
          </>
        ) : ( */}
        {/* <View
            style={{
              backgroundColor: "transparent",
              marginTop: "5%",
              paddingBottom: 5,
              marginHorizontal: 20,
            }}
          >
            <FlatList
              data={[]}
              // onEndReachedThreshold={0.01}

              // onScroll={slideChanged}

              // onScroll={(e) => {

              //   // const scrollPosition = Math.round(e.nativeEvent.contentOffset.y);
              //   // const index = scrollPosition / windowHeight;
              //   console.log("windowHeight",e)
              //   // setActiveIndex(index)

              // }}

              // onEndReached={() => {
              //   console.log("OnReachendData",page)

              //   setpage(page+1)

              // }}
              ListEmptyComponent={
                <View
                  style={{
                    height: windowHeight / 1.5,
                    alignItems: "center",
                    justifyContent: "center",
                    alignSelf: "center",
                    // marginLeft:windowWidth/3.5
                  }}
                >
                  <CustomText
                    text={"No order found!"}
                    size={16}
                    fontWeight="500"
                    style={{ textAlign: "center" }}
                    fontFam={font.montserratMedium}
                    color={colors.primary}
                  />
                </View>
              }
              renderItem={({ item, index }) => {
                return (
                  <OrderCard
                    cartData={cartData}
                    data={item}
                    key={index}
                    lastIndex={OrderCards.length === index + 1}
                    navigation={navigation}
                  />
                );
              }}
              keyExtractor={(item, index) => index.toString()}
            />
          </View> */}
        {/* )} */}
      </View>
    </Animated.ScrollView>
  );
}

export { Previous };
