import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Dimensions,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
  Platform,
  Linking,
  RefreshControl,
  AppState,
} from "react-native";
import ScreenLayout from "../../../components/ScreenLayout";
import CustomText from "../../../components/CustomText";
import { colors } from "../../../utils/colors";
import { images } from "../../../assets";
import CustomButton from "../../../components/CustomButton";
import LocationCard from "../../../components/LocationCard";
import CustomLine from "../../../components/CustomLine";
import MapView, { PROVIDER_GOOGLE, Marker, Animated } from "react-native-maps";
import { storeList } from "../../../utils/Data";
import StoreMarker from "../../../components/StoreMarker";
import BottomSheet from "../../../components/BottomSheet";
import { font } from "../../../utils/font";
import { useDispatch, useSelector } from "react-redux";
import {
  getLocationAccess,
  getUserLocation,
} from "../../../redux/reducers/locationReducer";
import {
  fetchBranches,
  filterBranches,
  getBranchLoading,
  getBranchRefreshing,
  getBranchesData,
  getFavouriteBranches,
  getIsFilter,
  getMoreBranches,
  getSelectedBranch,
  refreshBranches,
  setLaoding,
  setSelectedBranch,
} from "../../../redux/reducers/branchesReducer";
import { getToken, getUserData } from "../../../redux/reducers/authReducer";
import { Spacer } from "../../../components/Spacer";

import {
  getCartData,
  setCartData,
  setEmptyCard,
  updateCart,
} from "../../../redux/reducers/cartReducer";
import { usePermissions } from "../../../utils/Permissions/usePermissions";
import { getLocalizeFile } from "../../../redux/reducers/localizeReducer";
import { isCloseToBottom, isiPad, windowWidth } from "../../../utils/CommonFun";
import { LocationSearchLayout } from "../../../utils/Layouts/LocationSearchLayout";
import { Brancheslayout } from "../../../utils/Layouts/Brancheslayout";
import * as Animatable from "react-native-animatable";
import { verticalScale } from "react-native-size-matters";
import { setSelectedTab } from "../../../redux/reducers/manuePageReducer";

type Props = {
  navigation?: any;
  route?: any;
};
const windowHeight = Dimensions.get("window").height;
const OrderLocation = ({ navigation, route }: Props) => {
  const locationAccess = useSelector(getLocationAccess);
  const userLocation = useSelector(getUserLocation);
  const token = useSelector(getToken);
  const branchesData = useSelector(getBranchesData);
  const isRefreshing = useSelector(getBranchRefreshing);
  const isFilter = useSelector(getIsFilter);
  const userData = useSelector(getUserData);
  // const [appState, setAppState] = useState(AppState.currentState);

  const [isPrevious, setIsPrevious] = useState<any>("");
  const [isFavourite, setIsFavourite] = useState<any>("");
  const entityID = useSelector(getSelectedBranch).id;
  const localize: any = useSelector(getLocalizeFile);
  const [selectedTab, setIsSelectedTab] = useState<any>(
    localize?.order_branch_location_nearby_title
  );
  const [mapLoading, setMapLoading] = useState(true);
  const [counter, setCounter] = useState(1);
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  const [page, setPage] = useState(1);
console.log("Localoudh",branchesData)
  const cartData = useSelector(getCartData);
  const { getLocation, isLocationPermission } = usePermissions();

  const isCategory = route?.params?.isCategory;

  const isLoading = useSelector(getBranchLoading);

  const mapREf = useRef(null);
  const markerRef = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    getLocation();
  }, []);

  // console.log("locationAccess",  branchesData)
  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      )
        // dispatch(setLaoding(true));
        // setMapLoading(true)
        getLocation();
      // getBranches();

      {
        console.log("App has come to the foreground!");
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log("AppState", appState.current);
    });
    return () => {
      subscription.remove();
    };
  }, [isLocationPermission]);

  const handleMapReady = () => {
    // Map is ready, hide the loading component
    setMapLoading(false);
  };

  // const handleEndReached = () => {
  //   setTimeout(() => {
  //     setPage(page + 1);
  //   }, 100);
  // };

  const handleAnimateToCoordinate = () => {
    const targetCoordinate = {
      latitude: userLocation?.latitude,
      longitude: userLocation?.longitude,
      latitudeDelta: 0.039330183268125069,
      longitudeDelta: 0.045962757229776571,
    };

    // Animate the map to the target coordinate
    mapREf.current?.animateToRegion(targetCoordinate, 1000);
  };

  useEffect(() => {
    getBranches();
    addSelectedBranch();
  }, [locationAccess]);

  const getBranches = () => {
    if (locationAccess == true) {
      const data = {
        token: token,
        latitude: userLocation?.latitude ? userLocation?.latitude : 30.3753,
        longitude: userLocation?.longitude ? userLocation?.longitude : 69.3451,
        search: "",
        isFavourite: "",
        isPrevious: "",
        page: 1,
      };
      dispatch(fetchBranches(data));
      setPage(2);
      setIsSelectedTab(localize?.order_branch_location_nearby_title);
    }
  };

  const refreshBranchesData = () => {
    if (locationAccess == true) {
      const data = {
        token: token,
        latitude: userLocation?.latitude,
        longitude: userLocation?.longitude,
        search: "",
        isFavourite: "",
        isPrevious: "",
        page: 1,
      };
      dispatch(refreshBranches(data));
      setPage(2);
      setIsSelectedTab(localize?.order_branch_location_nearby_title);
    }
  };

  const addSelectedBranch = () => {
    if (entityID && cartData.length > 0) {
      let cart = cartData?.map((item) => {
        if (!item.entityID) {
          return { ...item, entityID: entityID };
        }
        return item;
      });
      dispatch(updateCart(cart));
    }
  };
  console.log("datafetchBrancheDayds", userLocation);

  // useEffect(() => {}, [mapREf, markerRef]);

  // useEffect(() => {
  //   getFilterBranches();
  // }, [isFavourite, isPrevious]);
  const getFilterBranches = (isFavourite: any, isPrevious: any) => {
    if (locationAccess == true) {
      const data = {
        token: token,
        latitude: userLocation?.latitude,
        longitude: userLocation?.longitude,
        search: "",
        isFavourite: isFavourite,
        isPrevious: isPrevious,
        page: 1,
      };

      dispatch(filterBranches(data));
      setPage(2);
    }
  };

  const handleScroll = () => {
    if (locationAccess == true) {
      const data = {
        token: token,
        latitude: userLocation?.latitude,
        longitude: userLocation?.longitude,
        search: "",
        isFavourite: isFavourite,
        isPrevious: isPrevious,
        page: page,
      };

      dispatch(getMoreBranches(data));
      setPage(page + 1);
    }
  };

  const onPressBranch = (item: any) => {
    let arrr = [...cartData];

    let findEntity = arrr.some((i) => i.entityID == item.id);

    if (!isCategory && cartData.length > 0) {
      dispatch(setSelectedBranch(item));

      navigation.navigate("Cart");

      return;
    }

    if (!findEntity && cartData.length > 0) {
      Alert.alert(
        "",
       `${localize?.order_branch_location_branch_already_selected_alert_message}`,
        [
          {
            text: `${localize?.order_branch_location_branch_already_selected_alert_closed_title}`,
            onPress: () => console.log("Cancel Pressed"),
          },
          {
            text: `${localize?.order_branch_location_branch_already_selected_alert_Continue_title}`,
            onPress: () => {
              dispatch(setEmptyCard([]));
              dispatch(setSelectedBranch(item));
              dispatch(setSelectedTab(localize?.featured_title));
              navigation.navigate("OrderFeatured");
            },
          },
        ]
      );
    } else {
      dispatch(setSelectedBranch(item));

      navigation.navigate("OrderFeatured");
    }
  };

  return (
    <ScreenLayout
      navigation={navigation}
      onScroll={({ nativeEvent }) => {
        if (isCloseToBottom(nativeEvent)) {
          handleScroll();
          console.log("CounterData", counter);
          // enableSomeButton();
        }
      }}
      scrollEventThrottle={1000}
      title={localize?.order_branch_location_title}
      style={{
        paddingHorizontal: 20,
      }}
      height={"110%"}
      isProfileVisible
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={refreshBranchesData}
        />
      }
    >
      {locationAccess == false || !isLocationPermission ? (
        <>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                if (!isLocationPermission) {
                  Linking.openSettings();
                  return;
                }
                navigation.navigate("Privacy");
              }}
            >
              <CustomText
                text={
                  !isLocationPermission
                    ? `${localize?.order_branch_location_mobile_permission_title}`
                    : `${localize?.order_branch_location_inapp_permission_title}`
                }
                style={{ textDecorationLine: "underline", textAlign: "center" }}
                size={isiPad ? 18 : 14}
                fontWeight="500"
                fontFam={font.montserratMedium}
                color={colors.primary}
              />
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          {isLoading ? (
            <>
              <View style={{ marginTop: "5%" }}></View>
              <LocationSearchLayout />
            </>
          ) : (
            <View
              style={{
                backgroundColor: colors.white,
                marginTop: "5%",
                height: "100%",
                borderRadius: 7,
              }}
            >
              <View
                style={{
                  height: 4,
                  width: 64,
                  backgroundColor: colors.primary,
                  borderRadius: 32,
                  opacity: 0.25,
                  marginTop: 10,
                  alignSelf: "center",
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 20,
                  marginHorizontal: 20,
                }}
              >
                <View style={{ width: windowWidth / 1.4 }}>
                  <CustomText
                    text={localize?.order_branch_location_choose_a_store_title}
                    size={17}
                    fontWeight="500"
                    fontFam={font.montserratMedium}
                    color={colors.primary}
                  />
                </View>

                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => {
                    navigation &&
                      navigation.navigate("OrderSearch", {
                        isCategory: isCategory,
                      });
                  }}
                  style={{
                    justifyContent: "center",
                    alignItems: "flex-end",
                    width: 30,
                    height: 30,
                  }}
                >
                  <Image
                    source={images.search}
                    style={{
                      width: isiPad ? 30 : 20,
                      height: isiPad ? 30 : 20,
                      tintColor: colors.primary,
                      marginTop: 4,
                    }}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: "100%",
                  height: isiPad ? verticalScale(200) : 242,
                  marginTop: 20,
                }}
              >
                <MapView.Animated
                  ref={mapREf}
                  zoomControlEnabled={false}
                  showsBuildings={true}
                  showsCompass={false}
                  toolbarEnabled={false}
                  onMapReady={handleMapReady}
                  initialRegion={{
                    latitude: userLocation.latitude
                      ? userLocation.latitude
                      : 30.3753,
                    longitude: userLocation.longitude
                      ? userLocation.longitude
                      : 69.3451,
                    latitudeDelta: 0.039330183268125069,
                    longitudeDelta: 0.045962757229776571,
                  }}
                  // provider={PROVIDER_GOOGLE}
                  style={{
                    height: "100%",
                    width: "100%",
                  }}
                >
                  {branchesData?.map((item, index) => {
                    return (
                      <Marker
                        key={index.toString()}
                        coordinate={{
                          latitude: Number(item?.location?.lat),
                          longitude: Number(item?.location?.lon),
                        }}
                        identifier={index.toString()}
                      >
                        <StoreMarker />
                      </Marker>
                    );
                  })}
                </MapView.Animated>

                <TouchableOpacity
                  onPress={handleAnimateToCoordinate}
                  style={styles.recenterContainer}
                >
                  <Image
                    source={images.pinIcon}
                    style={{ width: 20, height: 20 }}
                  />
                </TouchableOpacity>
                {mapLoading && (
                  <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={colors.primary} />
                  </View>
                )}
              </View>
              <View
                style={{
                  flexDirection: "row",
                  height: 60,
                }}
              >
                {[
                  localize?.order_branch_location_nearby_title,
                  localize?.order_branch_location_previous_title,
                  localize?.order_branch_location_favourites_title,
                ]?.map((item, _index) => (
                  <TouchableOpacity
                    // activeOpacity={0.6}
                    key={_index.toString()}
                    style={{
                      flex: 1,
                    }}
                    onPress={() => {
                      setIsSelectedTab(item);
                      if (
                        item == localize?.order_branch_location_nearby_title
                      ) {
                        setIsFavourite("");
                        setIsPrevious("");
                        getFilterBranches("", "");
                        return;
                      }
                      if (
                        item == localize?.order_branch_location_previous_title
                      ) {
                        setIsFavourite("");
                        setIsPrevious(1);
                        getFilterBranches("", 1);

                        return;
                      }
                      if (
                        item == localize?.order_branch_location_favourites_title
                      ) {
                        setIsFavourite(1);
                        setIsPrevious("");
                        getFilterBranches(1, "");
                        return;
                      }
                    }}
                  >
                    <View
                      style={{
                        borderBottomWidth: 4,
                        padding: 15,
                        justifyContent: "center",
                        alignItems: "center",
                        borderColor:
                          selectedTab === item
                            ? colors.primary
                            : colors.primary20,
                        flex: 1,
                      }}
                    >
                      <CustomText
                        size={isiPad ? 18 : 14}
                        fontWeight="500"
                        fontFam={font.montserratMedium}
                        color={colors.primary}
                        text={item}
                      />
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
              {locationAccess == true && (
                <>
                  {isRefreshing || isFilter ? (
                    <>
                      <View
                        style={{
                          width: "100%",
                          paddingHorizontal: 30,
                          paddingVertical: 20,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Brancheslayout />
                      </View>
                    </>
                  ) : (
                    <>
                      <FlatList
                        // onScroll={onScroll}
                        data={branchesData}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={
                          <View
                            style={{
                              height: 300,
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <CustomText
                              text={localize?.order_branch_search_no_branches_title}
                              size={isiPad ? 18 : 14}
                              fontWeight="500"
                              fontFam={font.montserratMedium}
                              color={colors.primary}
                            />
                          </View>
                        }
                        renderItem={({ item, index }) => {
                          let distanceString = item.distance.toString();
                          console.log("IemTags",item?.tags)

                          return (
                            <>
                              <Animatable.View
                                duration={1000}
                                animation={"fadeIn"}
                                delay={index * 300}
                              >
                                <View
                                  style={{
                                    paddingHorizontal: 20,
                                    paddingVertical: 10,
                                  }}
                                >
                                  <LocationCard
                                    title={item?.name}
                                    token={userData?.token}
                                    description={item?.address}
                                    id={item?.id}
                                    onInfo={() => {
                                      navigation.navigate("BranchDetail", {
                                        item: item,
                                      });
                                    }}
                                    isOpenBranch={true}
                                    onBranchPress={async () => {
                                      if (!item?.open) {
                                        Alert.alert(
                                          "",
                                          `${localize?.order_branch_location_branch_closed_alert_message}`,
                                          [
                                            {
                                              text:`${localize?.order_branch_location_branch_closed_alert_see_menu_title}`,
                                              onPress: () =>
                                                onPressBranch(item),
                                            },
                                            {
                                              text: `${localize?.order_branch_location_branch_closed_alert_goback_title}`,
                                              onPress: () => {
                                                // navigation.goBack();
                                              },
                                            },
                                          ]
                                        );

                                        return;
                                      }
                                      onPressBranch(item);
                                    }}
                                    item={item}
                                    distance={
                                      distanceString.startsWith("0")
                                        ? `${item?.distance} ${localize?.order_branch_location_distance_m_title}`
                                        : `${item?.distance} ${localize?.order_branch_location_distance_km_title}`
                                    }
                                    isShowHeart
                                    isFavourite={item?.is_favourite}
                                    isShowInfo
                                    navigation={navigation}
                                  />
                                  <CustomLine />
                                </View>
                              </Animatable.View>
                            </>
                          );
                        }}
                        // onEndReached={handleEndReached}
                      />
                    </>
                  )}
                </>
              )}
            </View>
          )}
        </>
      )}
    </ScreenLayout>
  );
};
export default OrderLocation;

const styles = StyleSheet.create({
  recenterContainer: {
    padding: 12,
    // width: 40,
    // height: 40,
    backgroundColor: colors.white,
    borderRadius: 9999,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 70,
    right: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 7 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.7)", // Semi-transparent white background
  },
});
