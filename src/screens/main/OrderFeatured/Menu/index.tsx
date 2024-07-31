import { View, StyleSheet, TouchableOpacity, Platform } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { colors } from "../../../../utils/colors";
import { font } from "../../../../utils/font";
import CustomText from "../../../../components/CustomText";
import OrderCard from "../../../../components/OrderCard";
import {
  fetchMenu,
  fetchMoreMenu,
  fetchProductCategories,
  getCategoriesLoading,
  getFilterMenu,
  getFilterMenuLoading,
  getMenuData,
  getMenuDateLength,
  getMenuLoading,
  getProductCategories,
  getRefreshMenu,
  refreshMenu,
  setMenu,
  setSelectedTab,
} from "../../../../redux/reducers/manuePageReducer";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../../../../redux/reducers/authReducer";
import { dollarSymbol, isiPad } from "../../../../utils/CommonFun";
import CustomSearch from "../../../../components/CustomSearch";
import { getCartData } from "../../../../redux/reducers/cartReducer";
import { getLocalizeFile } from "../../../../redux/reducers/localizeReducer";
import { MenuLayout } from "../../../../utils/Layouts/MenuLayout";
import { ProductLayout } from "../../../../utils/Layouts/ProductLayout";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  useDerivedValue,
  runOnJS,
} from "react-native-reanimated";
import * as Animatable from "react-native-animatable";
import { verticalScale } from "react-native-size-matters";
import BottomSheet from "@gorhom/bottom-sheet";
import FilterBottomSheet from "./FilterBottomSheet";
import {CommonActions} from '@react-navigation/native';

type Props = {
  progress?: any;
  progressColor?: any;
  height?: number;
  useAngle?: boolean;
  primaryBackgrondColor?: any;
  secondaryBackgrondColor?: any;
  angle?: number;
  navigation?: any;

  selectedTab?: string;
};
function Menu({ navigation, selectedTab }: Props) {
  const [selectedId, setSelectedtId] = useState("");
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const token = useSelector(getToken);
  const categories = useSelector(getProductCategories);
  const menu = useSelector(getMenuData);
  const filterMenuData = useSelector(getFilterMenu);
  const cartData = useSelector(getCartData);
  const localize: any = useSelector(getLocalizeFile);
  const sectionListRef = useRef(null);
  const [productItemHeight, setProductItemHeight] = useState([]);
  const isCategoryPressed = useRef(false); // Track if a category press initiated the scroll
  const [loading, setlaoding] = useState(true);
  const categoryPositions = useRef<any>([]); // Store the positions of the category items
  const categoryRef = useRef<any>(null);
  const menuLoadig = useSelector(getMenuLoading);
  const filterMenuLoadig = useSelector(getFilterMenuLoading);
  const isScrolling = useSharedValue(false);
  const [isScrollingState, setIsScrolling] = useState(false);
  const filterSheetRef = useRef<any>(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isSearchCross,setIsSearchCross]=useState(false)

  const handleClosePress = () => filterSheetRef?.current?.dismiss();
  const handleOpenress = () => filterSheetRef?.current?.present();

  const [page, setPage] = useState(1);

  useEffect(() => {
    setSelectedtId(0);

    getMenu();
  }, []);
  const getMenu = () => {
    const params = {
      token: token,
      page: 1,
      search: search,
      category_id: JSON.stringify(selectedCategories),
    };
    dispatch(fetchMenu(params));
    setPage(2);
  };

  const resetFilter = () => {
    const params = {
      token: token,
      page: 1,
      search: search,
      category_id: JSON.stringify([]),
    };
    dispatch(fetchMenu(params));
    setPage(2);
  };

  const onSelectCategory = (item: any) => {
    const params = {
      token: token,
      id: Number(item?.id),
      page: 1,
      search: search,
    };
    dispatch(fetchMenu(params));
    setPage(2);
  };

  const getCartDetail = () => {
    if (cartData.length > 0) {
      let currentTotal = cartData?.reduce(
        (accumulator, current) => accumulator + parseFloat(current?.priceByQty),
        0.0
      );

      return currentTotal;
    }
  };

  const onSearch = (txt) => {
    setSearch(txt);
    if (txt.length == 0) {
      setIsSearchCross(false)
      const params = {
        token: token,
        id: Number(selectedId),
        page: 1,
        search: "",
        category_id: JSON.stringify([]),

      };
      dispatch(fetchMenu(params));
      return;
    } else {
      setIsSearchCross(true)
      let filterSearch = filterMenuData
        ?.map((category) => {
          const filteredData = category.data.filter((item) => {
            return `${item?.name || ""} ${item?.price || ""} ${
              item?.description || ""
            }`
              .toLowerCase()
              .trim()
              .includes(txt.toLowerCase().trim());
          });

          // Return the category with the filtered data
          return {
            ...category,
            data: filteredData,
          };
        })
        .filter((category) => category.data.length > 0);
      console.log("filterSearch", filterSearch);
      dispatch(setMenu(filterSearch));
    }
    setPage(2);
  };

  const imageHeight = 60;

  // const CONTAINER_HEIssGHT = 150;
  const scrollY = useSharedValue(0);
  // const offsetAnim = useRef(new Animated.Value(0)).current;
  // const clampedScroll = Animated.diffClamp(
  //   Animated.add(
  //     scrollY.interpolate({
  //       inputRange: [0, 1],
  //       outputRange: [0, 1],
  //       extrapolateLeft: "clamp",
  //     }),
  //     offsetAnim
  //   ),
  //   0,
  //   CONTAINER_HEIGHT
  // );

  // let _clampedScrollValue = 0;
  // let _offsetValue = 0;
  // let _scrollValue = 0;

  // useEffect(() => {
  //   scrollY.addListener(({ value }) => {
  //     const diff = value - _scrollValue;
  //     _scrollValue = value;
  //     _clampedScrollValue = Math.min(
  //       Math.max(_clampedScrollValue * diff, 0),
  //       CONTAINER_HEIGHT
  //     );
  //   });
  //   offsetAnim.addListener(({ value }) => {
  //     _offsetValue = value;
  //   });
  // });

  // const bottomTranslateY = clampedScroll.interpolate({
  //   inputRange: [0, CONTAINER_HEIGHT],
  //   outputRange: [0, menulength > 4 ? CONTAINER_HEIGHT * 2 : 0 * 2],
  //   extrapolate: "clamp",
  // });

  // let scrollEndTimer = null;
  const onMomentumScrollBegin = () => {
    clearTimeout(scrollEndTimer);
  };
  // const onMomentumScrollEnd = () => {
  //   // dispatch(setViewCart(!isViewCart));

  //   const toValue =
  //     _scrollValue > CONTAINER_HEIGHT &&
  //     _clampedScrollValue > CONTAINER_HEIGHT / 2
  //       ? _offsetValue + CONTAINER_HEIGHT
  //       : _offsetValue - CONTAINER_HEIGHT;

  //   Animated.timing(offsetAnim, {
  //     toValue,
  //     duration: 1000,
  //     useNativeDriver: true,
  //   }).start();
  // };

  const onScrollEndDrag = () => {
    scrollEndTimer = setTimeout(onMomentumScrollEnd, 250);
  };

  const onRefreshMenu = () => {
    const params = {
      token: token,
      id: Number(selectedId),
      page: 1,
      search: search,
    };

    dispatch(refreshMenu(params));
    setPage(2);
  };

  // const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
  //   if (isCloseToBottom(event.nativeEvent)) {
  //     const params = {
  //       token: token,
  //       id: Number(selectedId),
  //       page: page,
  //       search: search,
  //     };

  //     dispatch(fetchMoreMenu(params));
  //     setPage((prevPage) => prevPage + 1);
  //   }
  // };
  const onItemLayout = (event: any, index?: any) => {
    const { height } = event.nativeEvent.layout;
    const layout = event.nativeEvent.layout;
    categoryPositions.current[index] = layout.y;
    setProductItemHeight((prevHeights) => {
      const newHeights: any = [...prevHeights];
      newHeights[index] = height;
      return newHeights;
    });
  };
  const handleCategoryPress = (index) => {
    isCategoryPressed.current = true; // Set flag to indicate category press initiated scroll
    setSelectedtId(index);

    console.log("ScrollAnimatedSttylee", ScrollAnimatedSttylee);

    const scrollPosition = productItemHeight
      .slice(0, index)
      .reduce((acc, height) => acc + height, 0);
    sectionListRef.current.scrollTo({
      // y: isScrolling.current ? 60 + scrollPosition : 0 + scrollPosition,
      y: isScrollingState ? 70 + scrollPosition : 0 + scrollPosition,

      animated: true,
    });
    // console.log("isScrolling", isScrolling.current);
    if (categoryRef.current) {
      console.log("vknfkvnf", isCategoryPressed.current);
      let indexPlus = index == 0 ? index : index - 1;
      index >= 0 &&
        categoryRef.current.scrollToIndex({ index: indexPlus, animated: true });
    }

    setTimeout(() => {
      isCategoryPressed.current = false;
    }, 500);

    // sectionListRef.current.scrollToLocation({
    //   sectionIndex: index,
    //   itemIndex: 0
    // });
  };

  const handleScroll = (event) => {
    if (isCategoryPressed.current) return; // Ignore scroll event if initiated by category press

    scrollY.value = event.nativeEvent.contentOffset.y;
    const offsetY = event.nativeEvent.contentOffset.y;

    let cumulativeHeight = 0;
    for (let i = 0; i < productItemHeight.length; i++) {
      cumulativeHeight += 30 + productItemHeight[i];
      if (offsetY < cumulativeHeight) {
        setSelectedtId(i);

        if (categoryRef.current) {
          let indexPlus = i == 0 ? i : i - 1;
          i >= 0 &&
            categoryRef.current.scrollToIndex({
              index: indexPlus,
              animated: false,
            });

          // categoryRef.current.scrollToIndex({ index: i, animated: true });
        }

        break;
      }
    }

    // if (isCloseToBottom(event?.nativeEvent)) {
    //   onLoadMore();
    // }
  };

  const ScrollAnimatedSttylee = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [0, 30],
      [0, -imageHeight],
      Extrapolation.CLAMP
    );

    // Check if translateY value has changed
    const isScrollingValue = translateY !== 0;

    // Update the isScrolling shared value
    isScrolling.value = isScrollingValue;

    return { transform: [{ translateY }] };
  });

  // You can now use the isScrolling ref to determine if scrolling is happening

  const searchAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, 1],
      [1, -1],
      Extrapolation.CLAMP
    );

    return { opacity };
  });

  const onLoadMore = () => {
    const params = {
      token: token,
      page: page,
      search: search,
    };
    // console.log("ManeuData", params);
    dispatch(fetchMoreMenu(params));

    setPage(page + 1);
  };

  useDerivedValue(() => {
    runOnJS(setIsScrolling)(isScrolling.value);
  }, [isScrolling.value]);

  return (
    <>
      {menuLoadig ? (
        <View
          style={{
            height: "80%",
            margin: 20,
          }}
        >
          <MenuLayout />
        </View>
      ) : (
        <>
          <Animated.View
            style={[
              {
                height: isiPad ? verticalScale(40) : 60,
                paddingHorizontal: 20,
                paddingBottom: 5,
                alignItems: "flex-end",
                justifyContent: "flex-end",
                backgroundColor: colors.offWhite,
              },
              searchAnimatedStyle,
            ]}
          >
            <CustomSearch
              placeholder={localize?.menu_search_field_place_holder}
              isCross={isSearchCross}
              isFilter={!isSearchCross}
              value={search}
              onPressFilter={() => {
                handleOpenress();
                // Open halfway
                filterSheetRef.current.snapToIndex(0);

                // After a delay, open fully
                setTimeout(() => {
                  filterSheetRef.current.snapToIndex(1);
                }, 500); // Adjust the delay as needed
              }}
              height={isiPad ? verticalScale(30) : 45}
              textColor={colors.primary}
              onPressClose={() => {
                setSearch("");
                const params = {
                  token: token,
                  id: Number(selectedId),
                  page: 1,
                  search: "",
                  category_id: JSON.stringify([]),

                };
                setIsSearchCross(false)
                dispatch(fetchMenu(params));
                setPage(2);
              }}
              onChangeText={(txt) => onSearch(txt)}
              // navigation={navigation}
            />
          </Animated.View>
          <Animated.View
            style={[
              {
                backgroundColor: colors.offWhite,

                position: "absolute",
                zIndex: 1,
                width: "100%",
                top: isiPad ? 240 : Platform.OS == "ios" ? 220 : 180,
              },
              ScrollAnimatedSttylee,
            ]}
          >
            <Animated.FlatList
              data={categories}
              ref={categoryRef}
              horizontal
              style={{ paddingLeft: 20 }}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                gap: 10,
                paddingRight: 30,
              }}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      handleCategoryPress(index);

                      setSelectedtId(index);
                    }}
                    style={{
                      height: 60,
                      alignItems: "center",
                      justifyContent: "center",
                      // backgroundColor:"red",
                      // marginRight:5
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        handleCategoryPress(index);
                        setSelectedtId(index);
                      }}
                      style={{
                        backgroundColor:
                          selectedId === index ? colors.primary : "transparent",
                        borderRadius: 32,
                        paddingHorizontal: 12,
                        paddingVertical: 8,
                      }}
                    >
                      <CustomText
                        text={item?.category_name}
                        fontWeight="500"
                        size={isiPad ? 19 : 14}
                        fontFam={font.montserratMedium}
                        color={
                          selectedId === index ? colors.white : colors.primary
                        }
                      />
                    </TouchableOpacity>
                  </TouchableOpacity>
                );
              }}
              keyExtractor={(item, index) => index.toString()}
            />
          </Animated.View>

          <Animated.ScrollView
            showsVerticalScrollIndicator={false}
            ref={sectionListRef}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            // onScroll={handleScroll}

            //   onScroll={
            //     Animated.event(
            //     [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            //     {
            //       useNativeDriver: true,
            //       listener: (event: NativeSyntheticEvent<NativeScrollEvent>) => {
            //         handleScroll(event);
            //       },
            //     }
            //   )
            // }
            // onMomentumScrollBegin={onMomentumScrollBegin}
            // onMomentumScrollEnd={onMomentumScrollEnd}
            // onScrollEndDrag={onScrollEndDrag}
            // refreshControl={
            //   <RefreshControl
            //     refreshing={isRefreshMenu}
            //     onRefresh={onRefreshMenu}
            //   />
            // }
            // scrollEventThrottle={2}
            contentContainerStyle={{ flexGrow: 1 }}
            style={{
              backgroundColor:
                selectedTab == "Menu" || selectedTab == "Previous"
                  ? colors.offWhite
                  : colors.white,
              marginBottom: cartData.length > 0 ? 60 : 0,
            }}
            scrollEnabled
            nestedScrollEnabled={true}
          >
            <View>
              {filterMenuLoadig ? (
                <>
                  <View
                    style={{
                      height: "80%",
                    }}
                  >
                    <ProductLayout />
                  </View>
                </>
              ) : (
                <View>
                  {filterMenuLoadig ? (
                    <View
                      style={{
                        height: "80%",
                        paddingTop: 40,
                        paddingHorizontal: 20,
                      }}
                    >
                      <ProductLayout />
                    </View>
                  ) : (
                    <View
                      style={{
                        backgroundColor:
                          menu?.length == 0 ? "transparent" : colors.white,
                        marginTop: 60,
                        marginBottom: 30,
                        paddingBottom: 5,
                        marginHorizontal: 20,
                        borderRadius: 10,
                      }}
                    >
                      {menu?.map((item: any, index: any) => {
                        return (
                          <View
                            onLayout={(event) => onItemLayout(event, index)}
                          >
                            <Animatable.View
                              duration={1000}
                              animation={"fadeIn"}
                              delay={index * 300}
                              style={{ marginLeft: 20, marginVertical: 15 }}
                            >
                              <CustomText
                                // style={{ : }}
                                color={colors.primary}
                                fontWeight="700"
                                fontFam={font.montserratMedium}
                                size={isiPad ? 22 : 18}
                                text={item?.title}
                              />
                            </Animatable.View>
                            {item.data.map((prod: any, ind: any) => {
                              return (
                                <View>
                                  <OrderCard
                                    index={ind}
                                    sections={menu}
                                    cartData={cartData}
                                    data={prod}
                                    key={index}
                                    lastIndex={item.data.length === ind + 1}
                                    navigation={navigation}
                                  />
                                </View>
                              );
                            })}
                          </View>
                        );
                      })}
                    </View>
                  )}
                </View>
              )}
            </View>
          </Animated.ScrollView>
        </>
      )}

      {cartData.length > 0 && (
        <Animated.View
          style={[
            styles.tabBar,
            // { transform: [{ translateY: bottomTranslateY }] },
          ]}
        >
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              // navigation.navigate("CartStack");
               navigation.navigate('CartStack', {
                screen: 'Cart',
              });

              dispatch(setSelectedTab(localize?.featured_title));
              // navigation.dispatch(
              //   CommonActions.reset({
              //     index: 0,
              //     routes: [{name: 'CartStack'}],
              //   }),)

              // navigation.navigate('Home', {
              //   screen: 'CartStack',
              // });

              // dispatch(setSelectedTab(localize?.featured_title));
            }}
            style={{
              width: "100%",
              height: isiPad ? verticalScale(30) : 50,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: colors.primary,
              marginTop: isiPad ? verticalScale(10) : 15,
              paddingHorizontal: isiPad ? 15 : 10,
              borderRadius: 10,
            }}
          >
            <View
              style={{
                width: isiPad ? 35 : 25,
                height: isiPad ? 35 : 25,
                borderWidth: 1,
                // backgroundColor: colors.white,

                borderRadius: 9999,
                justifyContent: "center",
                alignItems: "center",
                borderColor: colors.white,
              }}
            >
              <CustomText
                text={cartData.length}
                size={isiPad ? 19 : 14}
                color={colors.white}
                fontWeight={"600"}
                fontFam={font.montserratMedium}
              />
            </View>

            <CustomText
              text={localize?.menu_view_cart}
              size={isiPad ? 22 : 16}
              color={colors.white}
              fontWeight={"600"}
              fontFam={font.montserratMedium}
            />

            <CustomText
              text={dollarSymbol + `${getCartDetail()?.toFixed(2)}`}
              size={isiPad ? 19 : 14}
              color={colors.white}
              fontWeight={"600"}
              fontFam={font.montserratMedium}
            />
          </TouchableOpacity>

          {/* Your custom tab bar content */}
        </Animated.View>
      )}

      <FilterBottomSheet
      resetFilter={resetFilter}
        onApply={() => {
          console.log("Selectedchdv", selectedCategories);

          handleClosePress();

          getMenu();
        }}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        bottomSheetModalRef={filterSheetRef}
      />
    </>
  );
}

export { Menu };

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: Platform.OS == "ios" ? "10%" : "7%",
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    paddingHorizontal: 15,
    alignItems: "center",
  },
  categoriesContainer: {
    width: "100%",
    zIndex: 1,
  },
});
