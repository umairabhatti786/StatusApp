import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Image,
  Pressable,
  Text,
  FlatList,
  ScrollView,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Platform,
} from "react-native";
import CustomText from "../../../components/CustomText";
import { colors } from "../../../utils/colors";
import { Featured } from "./Featured";
import { Menu } from "./Menu";
import { Previous } from "./Previous";
import { font } from "../../../utils/font";
import { images } from "../../../assets";
import Collapsible from "react-native-collapsible";
import { useDispatch, useSelector } from "react-redux";
import {
  getCartData,
  getTotalCartAmount,
  getViewCart,
  setTotalCartAmount,
  setViewCart,
} from "../../../redux/reducers/cartReducer";
import { dollarSymbol, isiPad, startBlinking } from "../../../utils/CommonFun";
import {
  getMenuData,
  getMenuDateLength,
  getSelectedTab,
  setSelectedTab,
} from "../../../redux/reducers/manuePageReducer";
import { getLocalizeFile } from "../../../redux/reducers/localizeReducer";

type Props = {
  navigation?: any;
};

const OrderFeatured = ({ navigation }: Props) => {
  // const [selectedTab, setSelectedTab] = useState("Featured");
  const selectedTab = useSelector(getSelectedTab);
  const isViewCart = useSelector(getViewCart);
  const dispatch = useDispatch();
  const [showCollapsible, setShowCollapsible] = useState(true);
  const cartData = useSelector(getCartData);
  const getCatAmount = useSelector(getTotalCartAmount);
  const menulength = useSelector(getMenuDateLength);
  const localize: any = useSelector(getLocalizeFile);
  const blinkAnim = useRef(new Animated.Value(0)).current;
  const backgroundColor = blinkAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["white", "lightblue"],
  });



  return (
    <>
      <View style={styles.container}>
        <StatusBar barStyle={"dark-content"} backgroundColor={"#fff"} />
        <View>
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  startBlinking(blinkAnim);
                  setTimeout(() => {
                    dispatch(setSelectedTab(localize?.featured_title));
                    navigation.goBack();
                    // navigation.goBack();
                  }, 200);
                }}
                style={styles.backButtonContainer}
              >
                <Animated.View
                  style={[styles.backArrowContainer, { backgroundColor }]}
                >
                  <Image
                    source={images.backArrow}
                    style={styles.backArrowIcon}
                  />
                </Animated.View>
              </TouchableOpacity>
              <View>
                <CustomText text={"Order"} color={colors.primary} size={ isiPad?30: 26} />
              </View>
            </View>
            <Image
              source={images.heart2}
              style={styles.heartIcon}
              resizeMode="contain"
            />
          </View>
        </View>
        <View style={styles.tabsContainer}>
          {[
            localize?.featured_title,
            localize?.menu_title,
            localize?.order_Previous_title,
          ]?.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.tabButton}
              onPress={() => {
                setShowCollapsible(!showCollapsible);
                dispatch(setSelectedTab(item));
              }}
            >
              <View
                style={[
                  styles.tab,
                  {
                    borderColor:
                      selectedTab === item ? colors.primary : colors.primary20,
                  },
                ]}
              >
                <CustomText
                  size={isiPad?18: 14}
                  color={colors.black}
                  text={item}
                  fontFam={font.montserratMedium}
                  fontWeight="600"
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>
        {/* <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          onMomentumScrollBegin={onMomentumScrollBegin}
          // onMomentumScrollEnd={onMomentumScrollEnd}
          onScrollEndDrag={onScrollEndDrag}
          scrollEventThrottle={2}
          contentContainerStyle={styles.scrollViewContent}
          style={{
            backgroundColor:
              selectedTab == "Menu" || selectedTab == "Previous"
                ? colors.offWhite
                : colors.white,
          }}
          scrollEnabled
          nestedScrollEnabled={true}
        > */}
        {selectedTab === localize?.featured_title ? (
          <Featured
            seeAll={localize?.featured_see_all}
            setSelectedTab={setSelectedTab}
            menu={localize?.menu_title}
            noProductFoundTitle={localize?.featured_no_product_found_title}
            navigation={navigation}
          />
        ) : selectedTab === localize?.menu_title ? (
          <Menu selectedTab={selectedTab} navigation={navigation} />
        ) : (
          <>
            <Previous selectedTab={selectedTab}
                        noProductFoundTitle={localize?.order_Previous_no_product_found_title}

             navigation={navigation} />
          </>
        )}
        {/* </Animated.ScrollView> */}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: Platform.OS == "ios" ? 40 : 0,
  },
  header: {
    flexDirection: "row",
    paddingHorizontal: 10,
    alignItems: "center",
    height: 80,
    // paddingVertical: 20,
    justifyContent: "space-between",
    backgroundColor: colors.white,
  },
  tabBar: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "8%",
    left: 0,
    right: 0,
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    width: 45,
    height: 30,
    justifyContent: "center",
  },

  heartIcon: {
    width: 20,
    height: 20,
    marginRight: 30,
  },
  tabsContainer: {
    flexDirection: "row",
    backgroundColor: colors.white,
    height: 40,
    alignItems: "center",
  },
  tabButton: {
    flex: 1,
    
    // backgroundColor: "red",
  },
  tab: {
    borderBottomWidth: 4,
    height:40,
    justifyContent:"center",
    alignItems: "center",
    // flex: 1,
  },
  scrollView: {
    backgroundColor: colors.offWhite,
  },
  scrollViewContent: {
    flexGrow: 1,
  },

  backButtonContainer: {
    width: isiPad?60:50,
    height:isiPad?90: 80,
    justifyContent: "center",
  },
  backArrowIcon: {
    width:isiPad?50:  32,
    height: isiPad?50:  32,
    // marginTop: 5,
  },

  backArrowContainer: {
    width: 40,
    height: 40,
    borderRadius: 999,
    justifyContent: "center",
    // marginTop: 5,
  },
});

export default OrderFeatured;
