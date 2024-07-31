import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Dimensions,
  Image,
  Pressable,
  Text,
  FlatList,
  Alert,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import ScreenLayout from "../../../components/ScreenLayout";
import CustomText from "../../../components/CustomText";
import { colors } from "../../../utils/colors";
import LocationCard from "../../../components/LocationCard";
import CustomLine from "../../../components/CustomLine";
import SearchBar from "../../../components/SearchBar";
import { font } from "../../../utils/font";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import {
  getLocationAccess,
  getUserLocation,
} from "../../../redux/reducers/locationReducer";
import { getToken, getUserData } from "../../../redux/reducers/authReducer";
import {
  fetchBranches,
  fetchSearchBranches,
  fetchSearchMoreBranches,
  getBranchLoading,
  getBranchesData,
  getSearchBranchLoading,
  getSearchBranchesData,
  setEmptyBarnches,
  setSearchBarnches,
  setSelectedBranch,
} from "../../../redux/reducers/branchesReducer";
import { getCartData, setEmptyCard } from "../../../redux/reducers/cartReducer";
import { getLocalizeFile } from "../../../redux/reducers/localizeReducer";
import { isCloseToBottom, isiPad } from "../../../utils/CommonFun";
import { Brancheslayout } from "../../../utils/Layouts/Brancheslayout";

type Props = {
  navigation: any;
  route: {
    params: {
      isCategory: boolean;
    };
  };
};

type Branch = {
  id: string;
  name: string;
  address: string;
  distance: number;
  is_favourite: boolean;
};

const windowHeight = Dimensions.get("window").height;

const OrderSearch: React.FC<Props> = ({ navigation, route }) => {
  const locationAccess = useSelector(getLocationAccess);
  const userLocation = useSelector(getUserLocation);
  const token = useSelector(getToken);
  const branchesData = useSelector(getSearchBranchesData);
  const isLoading = useSelector(getSearchBranchLoading);
  const [search, setSearch] = useState<string>("");
  const cartData = useSelector(getCartData);
  const localize: any = useSelector(getLocalizeFile);
  const userData = useSelector(getUserData);
  const isCategory = route?.params?.isCategory;
  const [page, setPage] = useState<number>(1);
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      return () => {
        // dispatch(setSearchBarnches({}));
        // setSearch("")
      };
    }, [dispatch])
  );

  const onBranchSearch = (txt: string) => {
    setSearch(txt);
    if (txt.length >= 1) {
      const data = {
        token: token,
        latitude: userLocation?.latitude,
        longitude: userLocation?.longitude,
        search: txt,
        page: 1,
      };
      dispatch(fetchSearchBranches(data));
      setPage(2);
    } else {
      if (txt.length === 0) {
        dispatch(setEmptyBarnches([]));
        setPage(1);
      }
    }
  };

  const handleScroll = () => {
    if (locationAccess === true) {
      const data = {
        token: token,
        latitude: userLocation?.latitude,
        longitude: userLocation?.longitude,
        search: search,
        page: page,
      };

      console.log("datafetchBranches", data);
      dispatch(fetchSearchMoreBranches(data));
      setPage((prevPage) => prevPage + 1);
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
        "You have already selected products from a different branch. If you continue, your cart and selection will be removed.",
        [
          {
            text: "Close",
            onPress: () => console.log("Cancel Pressed"),
          },
          {
            text: "Continue",
            onPress: () => {
              dispatch(setEmptyCard([]));
              dispatch(setSelectedBranch(item));
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
      title={localize?.order_branch_search_heading}
      style={{
        paddingHorizontal: 20,
      }}
      isProfileVisible
      onScroll={({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
        if (isCloseToBottom(nativeEvent)) {
          handleScroll();
        }
      }}
    >
      <View
        style={{
          backgroundColor: colors.white,
          marginTop: "5%",
          paddingHorizontal: 20,
          height: "100%",
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
            marginTop: 20,
          }}
        >
          <CustomText
            text={localize?.order_branch_search_title}
            size={17}
            fontFam={font.montserratMedium}
            fontWeight="500"
            color={colors.primary}
          />
        </View>
        <View style={{ marginBottom: 10 }}>
          <SearchBar
            placeholder={localize?.order_branch_search_place_holder}
            value={search}
            textColor={colors.primary}
            onChangeText={(txt: string) => {
              onBranchSearch(txt);
            }}
            filterNotREquired
          />
        </View>

        {isLoading ? (
          <View
            style={{
              width: "100%",
              padding: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Brancheslayout />
          </View>
        ) : (
          <FlatList
            data={branchesData}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View
                style={{
                  height: windowHeight / 2,
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
            renderItem={({ item }: { item: any }) => {
              const distanceString = item.distance.toString();

              return (
                <View
                  style={{
                    paddingHorizontal: 10,
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
                          "We regret to inform you that the selected branch is currently closed. We apologize for any inconvenience this may cause. Please find an alternative options for assistance.",
                          [
                            {
                              text: "See Menu",
                              onPress: () => onPressBranch(item),
                            },
                            {
                              text: "Go Back",
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
                        ? `${item?.distance} m`
                        : `${item?.distance} km`
                    }
                    isShowHeart
                    isFavourite={item?.is_favourite}
                    isShowInfo
                    navigation={navigation}
                  />
                  <CustomLine />
                </View>
              );
            }}
          />
        )}
      </View>
    </ScreenLayout>
  );
};

export default OrderSearch;
