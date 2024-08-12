import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Alert,
  LogBox,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  FlatList,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Image,
  RefreshControl,
} from "react-native";
import { images } from "../../../assets/images";
import CustomButton from "../../../components/CustomButton";
import CustomSearch from "../../../components/CustomSearch";
import { Spacer } from "../../../components/Spacer";
import TopBar from "../../../components/TopBar";
import BottomSheet from "@gorhom/bottom-sheet";

import TopHeader from "../../../components/TopHeader";
import { appStyles } from "../../../utils/AppStyles";
import { colors } from "../../../utils/colors";
import UserList from "./UserList";
import { scale, verticalScale } from "react-native-size-matters";
import Button from "../../../components/Button";
import Loader from "../../../components/Loader";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  getToken,
  getUserData,
  setNotificationAlert,
} from "../../../redux/reducers/authReducer";
import { GetAllUsers } from "../../../api/ApiServices";
import CustomToast from "../../../components/CustomToast";
import axios from "axios";
import { getApiUrl } from "../../../api/Config";
import { URLS } from "../../../api/baseUrl";
import FilterCategory from "./FilterCategory";
import NewText from "../../../components/NewText";
import CustomBottomSheet from "../../../components/CustomBottomSheet";
import { usePermissions } from "../../../utils/Permissions";

const SearchScreen = ({ navigation }: any) => {
  const [activeBar, setActiveBar] = useState("all");
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [filterIndex, setFilterIndex] = useState<number>(0);
  const [activeCategory, setActiveCategory] = useState("All");
  const [filterTwo, setFilterTwo] = useState("online");
  const [filterThree, setFilterThree] = useState("");
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const focused = useIsFocused();
  const token = useSelector(getToken);
  const [allUsers, setAllUsers]: any = useState([]);
  const [response, setResponse]: any = useState({});
  const [netpageUrl, setNextPageUrl] = useState();
  const [selectedType, setSelectedType] = useState("All");
  const bottomSheetModalRef = useRef<BottomSheet>(null);
  const [model, setModel] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const snapPoints = useMemo(() => ["45%"], []);
  const { getLocation } = usePermissions();
  const userData = useSelector(getUserData);

  const commentNotificationAlert = useSelector(
    (state) => state.auth
  )?.commentNotificationAlert;
  console.log("response", response);
  const dispatch = useDispatch();
  // console.log("notificationAlert", notificationAlert);
  const topBarData = ["all", "following"];
  // const filterData = [
  //   { value: "Online", filter: "online" ,isActive:true},
  //   { value: "Nearby", filter: "nearby",isActive:false },
  //   { value: "New", filter: "new",isActive:false },
  //   { value: "Popular", filter: "popular",isActive:false },
  // ];
  const [filterData, setFilterData] = useState([
    { value: "Online", filter: "online", isActive: true },
    { value: "Nearby", filter: "nearby", isActive: false },
    { value: "New", filter: "new", isActive: false },
    { value: "Popular", filter: "popular", isActive: false },
  ]);
  console.log("activeBar", filterTwo);

  useEffect(() => {
    if (!userData?.lat) {
      console.log("GetLocation");
      getLocation();
    }
    getUserDetail();
  }, [activeBar, filterTwo, selectedType, focused]);

  const getUserDetail = () => {
    setLoading(true);
 
    const options = {
      method: "POST",
      url: getApiUrl(URLS.GET_ALL_USER),
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json",
      },
      data: {
        filter1: activeBar,
        filter2: filterTwo,
        filter3: selectedType == "All" ? "noFilter" : selectedType,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        let result = response?.data?.result;
        let data: any = response?.data?.result?.data;
        //check
        if (response?.data?.results) {
          if (filterTwo == "nearby") {
            const sortedLocations = data.sort(
              (a, b) => a.distance - b.distance
            );
            console.log("sortedLocations", sortedLocations);
            setAllUsers(sortedLocations);
            setResponse(result);
            setLoading(false);
            return;
          }
          if (filterTwo == "online") {
            console.log("OnlineReed", result);
            setAllUsers(response?.data?.onAndOffUsers);
            setResponse(result);
            setLoading(false);

            return;
          }
          setAllUsers(data);
          setResponse(result);
        } else {
          setAllUsers([]);
          setResponse("");
        }
        setLoading(false);
      })
      .catch(function (error) {
        console.log("error", error);
        // Alert.alert("Alert!", error);
      });
  };

  const refreshData = () => {
    if (response?.next_page_url) {
      setRefreshing(true);
      const options = {
        method: "POST",
        url: response?.next_page_url,
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
        },
        data: {
          filter1: activeBar,
          filter2: filterTwo,
          filter3: selectedType == "All" ? "noFilter" : selectedType,
        },
      };

      axios
        .request(options)
        .then(function (response) {
          if (filterTwo == "online") {
            setAllUsers([...allUsers, ...response?.data?.onAndOffUsers]);
            setResponse(response?.data?.result);
            setRefreshing(false);
            return;
          }
          setAllUsers([...allUsers, ...response?.data?.result?.data]);
          setResponse(response?.data?.result);
          setRefreshing(false);
        })
        .catch(function (error) {
          setRefreshing(false);
          Alert.alert("Alert!", "Network Error.");
        });
    }
  };

  const profileType = [
    "All",
    "Actor",
    "Athlete",
    "Bodybuilder",
    "Comedian",
    "Fighter",
    "Filmmaker",
    "Founder",
    "Influencer",
    "Model",
    "Musician",
    "Podcaster",
    "Rapper",
    "Reality Star",
    "Streamer",
    "YouTuber",
    "Other",
  ];

  const renderUsers = ({ item, index }: any) => {
    return (
      <UserList
        name={item?.name}
        image={item?.imageUrl}
        id={item?.id}
        onPress={() =>
          navigation.navigate("OthersProfile", {
            id: item?.id,
          })
        }
        isOnline={item?.isOnline}
        distance={item?.distance}
        followersCount={item?.followers_count}
        profileType={item?.profileType}
        createdAt={item?.created_at}
        lastSeen={item.last_seen}
        filterTwo={filterTwo}
      />
    );
  };

  return (
    <>
      {loading && <Loader />}

      <SafeAreaView style={appStyles.main}>
        <StatusBar barStyle={"light-content"} backgroundColor={colors.black} />

        <Spacer height={7} />

        <View>
          <View style={{ paddingHorizontal: scale(15) }}>
            <TopHeader
              isSearch={true}
              notificationAlert={commentNotificationAlert}
              onPressNotification={() => {
                dispatch(setNotificationAlert(false));
                navigation.navigate("Notifications");
              }}
              onPressSetting={() => navigation.navigate("SearchMember")}
            />
          </View>

          <Spacer height={verticalScale(15)} />

          <TopBar
            topBarData={topBarData}
            activeBar={activeBar}
            setActiveBar={setActiveBar}
          />
        </View>

        <Spacer height={verticalScale(12)} />

        <View
          style={{
            ...appStyles.row,
            marginBottom: verticalScale(12),
            // marginLeft: scale(10),
          }}
        >
          <ScrollView
            horizontal
            style={{ paddingLeft: scale(10) }}
            showsHorizontalScrollIndicator={false}
          >
            {filterData.map((item, index) => {
              return (
                <View style={{ marginHorizontal: scale(3) }}>
                  <Button
                    onPress={() => {
                      const updatedFilterData = filterData.map((data, idx) => {
                        return idx === index
                          ? { ...data, isActive: !data.isActive }
                          : { ...data, isActive: false };
                      });

                      console.log(
                        "updatesIndex",
                        updatedFilterData[index]?.isActive
                      );

                      if (!updatedFilterData[index]?.isActive) {
                        setFilterTwo("");
                        setFilterIndex(-1);
                      } else {
                        setFilterTwo(item.filter);
                        setFilterIndex(index);
                      }

                      setFilterData(updatedFilterData);
                    }}
                    height={32}
                    fontFam={"Inter-Regular"}
                    fontWeight={"400"}
                    paddingHorizontal={8}
                    size={15}
                    textColor={item.isActive ? colors.black100 : colors.white}
                    bgColor={item.isActive ? colors.white : colors.primary}
                    text={item.value}
                  />
                </View>
              );
            })}

            {/* <TouchableOpacity
              style={styles.categoryBtn}
              activeOpacity={0.6}
              onPress={() => bottomSheetModalRef?.current?.present()}
            >
              <NewText color={colors.white} size={14} text={selectedType} />
              <Spacer width={5} />
              <Image
                style={{ width: 17, height: 17 }}
                source={images.arrowdown}
              />
            </TouchableOpacity> */}

            {/* <Button
              onPress={() => {
                setModel(!model);

                if (model == false) {
                  if (filterIndex == undefined) {
                    setFilterTwo("model");
                    setFilterThree("");
                  } else if (filterIndex == 0) {
                    setFilterThree("new");
                    setFilterTwo("");
                  } else if (filterIndex == 1) {
                    setFilterThree("new");
                    setFilterTwo("");
                  } else if (filterIndex == 2) {
                    setFilterThree("new");
                    setFilterTwo("");
                  } else if (filterIndex == 3) {
                    setFilterThree("popular");
                    setFilterTwo("");
                  }
                } else {
                  if (filterIndex == undefined) {
                    setFilterTwo("");
                    setFilterThree("");
                  } else if (filterIndex == 0) {
                    setFilterTwo("new");
                    setFilterThree("");
                  } else if (filterIndex == 1) {
                    setFilterTwo("new");
                    setFilterThree("");
                  } else if (filterIndex == 2) {
                    setFilterTwo("new");
                    setFilterThree("");
                  } else if (filterIndex == 3) {
                    setFilterTwo("popular");
                    setFilterThree("");
                  }
                }
              }}
              height={32}
              fontFam={"Inter-Regular"}
              fontWeight={"400"}
              paddingHorizontal={8}
              size={15}
              style={{ marginHorizontal: scale(3) }}
              textColor={colors.white}
              bgColor={model ? "#48B1FF" : colors.primary}
              text={"Models"}
            /> */}
          </ScrollView>
        </View>

        {/* <Spacer height={10} /> */}
        <View>
          {!loading && (
            <FlatList
              data={allUsers}
              numColumns={3}
              style={{ marginBottom: verticalScale(155) }}
              renderItem={renderUsers}
              onEndReached={refreshData}
              refreshControl={
                <RefreshControl
                  colors={["#9Bd35A", "#689F38"]}
                  refreshing={refreshing}
                  onRefresh={() => {}}
                />
              }
            />
          )}
        </View>
      </SafeAreaView>

      <CustomBottomSheet bottomSheetModalRef={bottomSheetModalRef}>
        <View
          style={{
            paddingHorizontal: scale(20),
            backgroundColor: colors.primary,
          }}
        >
          <FlatList
            data={profileType}
            nestedScrollEnabled={true}
            renderItem={({ item, index }) => {
              return (
                <>
                  <FilterCategory
                    item={item}
                    onSelectCatrgory={() => {
                      setSelectedType(item);
                      // setFilterTwo(item)
                      bottomSheetModalRef?.current?.close();
                    }}
                    selectedType={selectedType}
                  />
                  <Spacer height={verticalScale(15)} />
                </>
              );
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </CustomBottomSheet>

      {showError && (
        <CustomToast
          showError={showError}
          setShowError={setShowError}
          bgColor={colors.red}
          text={error}
        />
      )}
    </>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  categoryBtn: {
    height: 32,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    // minWidth:scale(50),
    paddingHorizontal: scale(8),
    borderRadius: scale(8),
    marginLeft: scale(3),
    marginRight: scale(20),
    flexDirection: "row",

    // paddingTop:5
  },
});
