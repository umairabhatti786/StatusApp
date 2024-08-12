import {
  ActivityIndicator,
  Alert,
  BackHandler,
  FlatList,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Linking,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, version, useEffect, useRef } from "react";
import { appStyles } from "../../../utils/AppStyles";
import CustomText from "../../../components/CustomText";
import { colors } from "../../../utils/colors";
import { images } from "../../../assets/images";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { windowHeight, windowWidth } from "../../../utils/Dimensions";
import CustomButton from "../../../components/CustomButton";
import MessagesComponent from "../../../components/MessageComponent";
import { data, profileComments } from "../../../utils/Data";
import { s, scale, verticalScale } from "react-native-size-matters";
import { Spacer } from "../../../components/Spacer";
import SizeBar from "../../../components/SizeBar";
import CustomModal from "../../../components/CustomModal";
import Channel from "../Channel";
import { useDispatch, useSelector } from "react-redux";
import {
  getToken,
  getUserData,
  setDisableBottomTab,
  setUserData,
} from "../../../redux/reducers/authReducer";
import {
  CreateComment,
  DeleteComment,
  GetAuthUser,
  GetStatus,
  GetUserComment,
  getUserDetail,
  getUserDistance,
} from "../../../api/ApiServices";
import NewText from "../../../components/NewText";
import FastImage from "react-native-fast-image";
import Loader from "../../../components/Loader";
import {
  AUTH,
  StorageServices,
  TOKEN,
} from "../../../utils/hooks/StorageServices";
import MessageSender from "../../../components/MessageSender";
import {
  GiphyContentType,
  GiphyDialog,
  GiphyDialogEvent,
  GiphyDialogMediaSelectEventHandler,
  GiphyMedia,
  GiphySDK,
  GiphyTheme,
  GiphyThemePreset,
} from "@giphy/react-native-sdk";
import Button from "../../../components/Button";
import { calculateAgeString } from "../../../utils/CommonFun";

GiphySDK.configure({ apiKey: "C9JfKgGLTfcnLfvQ8O189iehEyTOq0tm" });
GiphyDialog.configure({
  mediaTypeConfig: [
    GiphyContentType.Emoji,
    GiphyContentType.Gif,
    GiphyContentType.Sticker,
    GiphyContentType.Text,
  ],
  showConfirmationScreen: true,
});
const theme: GiphyTheme = {
  preset: GiphyThemePreset.Light,
  backgroundColor: colors.black300,
  cellCornerRadius: 12,
  defaultTextColor: colors.white,
};
GiphyDialog.configure({ theme });

const ProfileScreen = () => {
  const navigation: any = useNavigation();
  const [isSideBar, setIsBar] = useState(false);
  const [isFollow, setIsFollow] = useState(false);
  const focused = useIsFocused();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [userDetails, setUserDetails] = useState<any>();
  const userData = useSelector(getUserData);
  const token = useSelector(getToken);
  const [authPosts, setAuthPosts] = useState([]);
  const [giphy, setGiphy] = useState("");
  const activeBar = useSelector((state) => state.auth)?.profileActiveBar;
  const [isActiveProfile, setIsActiveProfile] = useState("Profile");
  const [counter, setCounter] = useState(0);
  const [isEditView, setIsEditView] = useState(false);
  const [imageForEdit, setImageForEdit] = useState("");
  const [postId, setPostId] = useState("");
  const flatListRefPosts: any = useRef(null);
  const [userDistance,setUserDistance]=useState()
  const [userDistanceString,setUserDistanceString]=useState()

  const dispatch = useDispatch();

  const [channelId, setIsChannelId] = useState("");
  const getChannelId = async () => {
    const userInfo = await StorageServices.getItem(AUTH);
    setIsChannelId(userInfo?.channel?.id);
  };

  const userDetail = `${
    userDetails?.showAge == 1
      ? userDetails?.birthday
        ? calculateAgeString(userDetails?.birthday) + " / "
        : ""
      : " "
  }${
    userDetails?.gender ? userDetails?.gender + " / " : "Undisclosed" + " / "
  }${
    userDetails?.orientation
      ? userDetails?.orientation + " / "
      : "Undisclosed" + " / "
  }${
    userDetails?.relationshipStatus
      ? userDetails?.relationshipStatus
      : "Undisclosed"
  }`.trim();

  console.log("UserDatatypeuserDetails", userDetails?.orientation);
  useEffect(() => {
    setImageForEdit(imageForEdit);
  }, [isEditView]);

  useEffect(() => {
    getChannelId();
  }, []);

  useEffect(() => {
    getAuth();
    getUserDistance({id:userData?.id},token,async ({ isSuccess, response }: any) => {
      let result = JSON.parse(response);


      if(result?.status){
        setUserDistance(result?.distance)
        setUserDistanceString(result?.distance.toString())


      }
    })
    
    // setIsActiveProfile(activeBar);
  }, [focused]);

  

  useEffect(() => {
    if (focused) getUserComment();
  }, [focused]);

  useEffect(() => {
    GetPosts();
  }, [counter]);

  useEffect(() => {
    const backAction = () => {
      dispatch(setDisableBottomTab(false));
      navigation.goBack();
      console.log("goBAckData");

      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    const handler: GiphyDialogMediaSelectEventHandler = (e) => {
      setGiphy(e.media.url);

      GiphyDialog.hide();
    };
    const listener = GiphyDialog.addListener(
      GiphyDialogEvent.MediaSelected,
      handler
    );
    return () => {
      listener.remove();
    };
  }, []);
  // console.log("UserData", userData?.gif);

  // useEffect(() => {
  //   if(authPosts.length){

  //     flatListRefPosts?.current?.scrollToEnd({ animated: true });
  //   }
  // }, [authPosts])

  const GetPosts = async () => {
    let userInfo = await StorageServices.getItem(AUTH);
    let token = await StorageServices.getItem(TOKEN);
    GetStatus(userInfo?.id, token, async ({ isSuccess, response }: any) => {
      console.log("data p", isSuccess);

      let result = JSON.parse(response);
      if (result.status) {
        // console.log('result?.posts',result?.posts?.data)
        let data = result?.posts?.data.reverse();
        // setPosts(data);
        setAuthPosts(data);
      } else {
        console.log(result);
        // Alert.alert("Alert!", "Something went wrong",);
        console.log("Something went wrong");
      }
    });
  };

  const delComment = async (com: any) => {
    let userInfo = await StorageServices.getItem(AUTH);
    let data = {
      commentId: com?.id,
      userId: userInfo?.id,
    };
    console.log(data);
    DeleteComment(data, token, async ({ isSuccess, response }: any) => {
      console.log("data", isSuccess);

      let result = JSON.parse(response);
      if (result.status) {
        console.log(result);
        let newComs = comments.filter(
          (c: any) => c.id != result?.comment?.commentId
        );
        setComments(newComs);
        // console.log('newComs',newComs);
        // setLoading(false);
      } else {
        // Alert.alert(result);
        // Alert.alert("Alert!", "Something went wrong");
        console.log("Something went wrong");
        // console.log(userData?.id,token);
        console.log(result);
      }
    });
  };
  const getUserComment = async () => {
    let userInfo = await StorageServices.getItem(AUTH);
    let data = {
      userId: userInfo?.id,
    };
    // console.log(userData?.id, token);
    GetUserComment(data, token, async ({ isSuccess, response }: any) => {
      console.log("data", isSuccess);

      let result = JSON.parse(response);
      if (result.status) {
        console.log(result);
        setComments(result?.comments?.data.reverse());
        // setLoading(false);
      } else {
        // Alert.alert(result);
        // Alert.alert("Alert!", "Something went wrong");
        console.log("Something went wrong");
        // console.log(userData?.id,token);
        // console.log(result)
      }
    });
  };

  const submitComment = async () => {
    let data = {
      description: comment,
      userId: userDetails?.id,
    };
    // console.log(data)
    setLoading2(true);
    CreateComment(data, token, async ({ isSuccess, response }: any) => {
      console.log("data", isSuccess);

      let result = JSON.parse(response);
      if (result.status) {
        setComment("");

        setComments([result.comment, ...comments]);
        setLoading2(false);
      } else {
        // Alert.alert("Alert!", "Something went wrong");
        console.log("Something went wrong");
      }
    });
  };

  // console.log("userData", userData);

  const getAuth = () => {
    setLoading(true);

    let params = {
      id: userData?.id,
    };
    // getUserDetail(params, token, async ({ isSuccess, response }: any) => {
    //   console.log("knckdnc", isSuccess);

    getUserDetail(params, token, async ({ isSuccess, response }: any) => {
      if (isSuccess) {
        let result = JSON.parse(response);
        // console.log("ckdnckdnc", result?.user);

        if (result.status) {
          setLoading(false);
          setUserDetails(result?.user);
          dispatch(setUserData(result?.user));
          // setNextPageUrl(!result?.users?.next_page_url?true:false)
        } else {
          setLoading(false);

          // Alert.alert("Alert!", "Something wrong");
        }
      } else {
        setLoading(false);

        Alert.alert("Alert!", "Network Error.");
      }
    });
  };

  const renderChatList = ({ item }: any) => {
    return (
      <MessagesComponent
        comments={true}
        profile={true}
        // id={item?.id}
        onDelete={() => delComment(item)}
        name={item?.commentator?.name}
        image={item.commentator?.imageUrl}
        message={item?.description}
        time={item?.created_at}
        chatDate={item?.chatDate}
      />
    );
  };
  const shortenedText =
    userDetails?.name?.length > 20
      ? userDetails?.name?.substring(0, 19) + "..."
      : userDetails?.name;

  return (
    <>
      {loading ? (
        <View style={appStyles.main}>
          <Loader />
        </View>
      ) : (
        <SafeAreaView style={appStyles.main}>
          <StatusBar backgroundColor="#000" barStyle="light-content" />

          <View style={appStyles.rowjustify}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: scale(20),
                paddingVertical: verticalScale(5),
              }}
            >
              <FastImage
                style={{
                  width: scale(37),
                  height: scale(37),
                  borderRadius: 999,
                }}
                source={{
                  uri: userDetails?.imageUrl,
                  headers: { Authorization: "someAuthToken" },
                  priority: FastImage.priority.high,
                }}
              />
              <View
                style={{
                  marginHorizontal: scale(7),
                  paddingBottom: verticalScale(5),
                  width: windowWidth / 2.5,
                }}
              >
                <NewText
                  color={colors.white}
                  size={18}
                  numberOfLines={1}
                  style={{ marginTop: verticalScale(5) }}
                  text={shortenedText}
                />
                <NewText
                  // fontWeight="700"
                  color={colors.white}
                  size={14}
                  style={{ marginTop: verticalScale(-3) }}
                  text={`${userDetails?.followers_count} Followers`}
                />
              </View>
            </View>
            <View style={{ ...appStyles.row, paddingRight: scale(20) }}>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() =>
                  navigation.navigate("EditProfile", { data: userDetails })
                }
              >
                <NewText
                  color={colors.white}
                  size={16}
                  fontFam="Poppins-SemiBold"
                  fontWeight="700"
                  textDecorationLine={"underline"}
                  // style={{marginTop:verticalScale(5)}}
                  text={"Edit Profile"}
                />
              </TouchableOpacity>
            </View>

            {/* <CustomText color={"transparent"} size={18} text={"sss"} /> */}
          </View>

          <View
            style={{
              ...appStyles.rowjustify,
              paddingHorizontal: scale(10),
              marginBottom: verticalScale(5),
            }}
          >
            {["Profile", "Channel"].map((item, index) => {
              return (
                <CustomButton
                  width={"48.5%"}
                  onPress={() => {
                    if (item == "Channel") {
                      dispatch(setDisableBottomTab(true));

                      navigation.navigate("AuthChannel");

                      return;
                    }
                    dispatch(setDisableBottomTab(false));

                    setIsActiveProfile(item);
                  }}
                  text={item}
                  textColor={
                    isActiveProfile == item ? colors.black : colors.white
                  }
                  height={35}
                  bgColor={
                    isActiveProfile == item ? colors.grey400 : colors.primary
                  }
                  borderRadius={8}
                />
              );
            })}

            {/* <CustomButton
        width={"48.5%"}
        borderRadius={8}
        text="Channel"
        height={35}
      /> */}
          </View>
          {isActiveProfile == "Profile" ? (
            <ScrollView showsVerticalScrollIndicator={false}>
              <View>
                {/* <View
                  style={{
                    ...appStyles.row,
                    paddingBottom: verticalScale(5),
                    paddingHorizontal: scale(10),
                  }}
                >
                  <View style={{ ...appStyles.row, width: "46%" }}>
                    <Image
                      style={{
                        width: scale(16),
                        height: scale(16),
                      }}
                      source={images.locationicon}
                    />
                    <CustomText
                      color={colors.grey300}
                      size={15}
                      numberOfLines={1}
                      fontFam="Inter-Medium"
                      style={{ marginLeft: scale(8) }}
                      text={userData?.location}
                    />
                  </View>
                  <Spacer width={scale(22)} />

                  <View style={{ ...appStyles.row, width: "46%", }}>
                    <Image
                      style={{
                        width: scale(20),
                        height: scale(20),
                      }}
                      source={images.bagicon}
                    />
                    <CustomText
                      color={colors.grey300}
                      size={15}
                      numberOfLines={1}
                      fontFam="Inter-Medium"
                      style={{ marginLeft: scale(8), marginRight: scale(10) }}
                      text={userData?.occupation}
                    />
                  </View>
                </View> */}
                <View>
                  <FastImage
                    style={{
                      width: "100%",
                      height: verticalScale(350),
                      alignSelf: "center",
                    }}
                    resizeMode="cover"
                    source={{
                      uri: userDetails?.imageUrl,
                      headers: { Authorization: "someAuthToken" },
                      priority: FastImage.priority.high,
                    }}
                  />

                  {userDetails?.isOnline == 1 ? (
                    <View
                      style={{
                        position: "absolute",
                        bottom: verticalScale(20),
                        left: scale(20),
                        flexDirection: "row",
                        gap: scale(10),
                        alignItems: "center",
                      }}
                    >
                      <View
                        style={{
                          width: scale(11),
                          height: scale(11),
                          borderRadius: 999,
                          backgroundColor: colors.green,
                        }}
                      ></View>

                      <CustomText
                        color={colors.white}
                        size={15}
                        numberOfLines={1}
                        fontFam="Inter-Medium"
                        // style={{ marginLeft: scale(8), marginRight: scale(10) }}
                        text={"Online now"}
                      />
                    </View>
                  ) : (
                    <></>
                  )}
                </View>

                <View style={appStyles.rowjustify}>
                  <TouchableOpacity
                    activeOpacity={0.6}
                    disabled={true}
                    // onPress={onFavorite}
                    style={styles.box}
                  >
                    <Image
                      style={{
                        width: 30,
                        height: 30,
                        tintColor: "#8A8A8A",
                      }}
                      source={images.star}
                      resizeMode="contain"
                    />
                    <CustomText
                      color={"#8A8A8A"}
                      size={13}
                      numberOfLines={1}
                      fontFam="Inter-Medium"
                      style={{ marginTop: scale(5) }}
                      text={"Favorite"}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.6}
                    // onPress={() => setIsWatchList(!isWatchList)}
                    style={styles.box}
                  >
                    <Image
                      style={{
                        width: 25,
                        height: 25,
                        tintColor: colors.white,
                      }}
                      source={images.appicon}
                      resizeMode="contain"
                    />
                    <CustomText
                      color={colors.white}
                      size={13}
                      numberOfLines={1}
                      fontFam="Inter-Medium"
                      style={{ marginTop: scale(7) }}
                      text={"STATUS"}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.6}
                    disabled={true}
                    // onPress={() => setIsWatchList(!isWatchList)}
                    style={styles.box}
                  >
                    <Image
                      style={{
                        width: 30,
                        height: 30,
                        tintColor: "#8A8A8A",
                      }}
                      source={images.profilemessage}
                      resizeMode="contain"
                    />
                    <CustomText
                      color={"#8A8A8A"}
                      size={13}
                      numberOfLines={1}
                      fontFam="Inter-Medium"
                      style={{ marginTop: scale(5) }}
                      text={"Message"}
                    />
                  </TouchableOpacity>
                </View>
                <View style={{ paddingHorizontal: scale(10) }}>
                  <View
                    style={{
                      paddingVertical: verticalScale(15),
                      // paddingHorizontal: scale(5),
                      gap: verticalScale(10),
                    }}
                  >
                    <NewText
                      color={colors.white}
                      lineHeight={20}
                      fontWeight="600"
                      fontFam="Inter-SemiBold"
                      size={17}
                      text={"Personal Information"}
                    />
                    {/* {userDetails?.location && ( */}
                    <View style={{ ...appStyles.row, gap: scale(10),marginRight:scale(10) }}>
                      <Image
                        style={{ width: scale(17), height: scale(17) }}
                        source={images.homefill}
                      />
                      <NewText
                        color={colors.white}
                        fontWeight="300"
                        style={{ marginTop: 3 }}
                        fontFam="Inter-Medium"
                        size={14.5}
                        text={
                          userDetails?.location
                            ? userDetails?.location
                            : "Undisclosed"
                        }
                      />
                    </View>
                    {/* )} */}
                    {/* distance */}

                    {userDistance >= 0 && (
                        <View style={{ ...appStyles.row, gap: scale(10) }}>
                          <Image
                            style={{ width: scale(18), height: scale(18) }}
                            source={images.locationicon}
                          />
                          <NewText
                            color={colors.white}
                            style={{ marginTop: 3 }}
                            size={16}
                            text={
                              userDistanceString?.startsWith("0")
                                ? `${parseInt(userDistance).toLocaleString()} feet`
                                : `${parseInt(userDistance).toLocaleString()} miles away`
                            }
                            
                            // text={`${parseInt(userDistance)} miles away`}
                          />
                        </View>
                      )}

                    {userDetail && (
                      <View style={{ ...appStyles.row, gap: scale(10) }}>
                        <Image
                          style={{ width: scale(18), height: scale(18) }}
                          source={images.user}
                        />
                        <NewText
                          color={colors.white}
                          style={{ marginTop: 3 }}
                          size={14.5}
                          fontWeight="300"
                          fontFam="Inter-Regular"
                          text={userDetail}
                        />
                      </View>
                    )}
                  </View>
                  <NewText
                    color={colors.white}
                    style={{
                      // marginTop: verticalScale(-5),
                      marginBottom: verticalScale(15),
                    }}
                    size={16}
                    fontFam="Roboto-Bold"
                    text={"Here for"}
                  />
                  {userDetails?.interestTags && (
                    <View
                      style={{
                        ...appStyles.row,
                        marginBottom: verticalScale(12),
                      }}
                    >
                      <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={{ marginRight: scale(5) }}
                      >
                        {JSON.parse(userDetails?.interestTags).map(
                          (item, index) => {
                            return (
                              <View style={{ marginRight: scale(5) }}>
                                <Button
                                  height={28}
                                  fontFam={"Inter-Medium"}
                                  borderRadius={15}
                                  paddingHorizontal={15}
                                  size={14.5}
                                  textColor={colors.white}
                                  bgColor={"#48B1FF"}
                                  text={item}
                                />
                              </View>
                            );
                          }
                        )}

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
                      </ScrollView>
                    </View>
                  )}

                  {userData?.bio && (
                    <>
                      <NewText
                        color={colors.white}
                        style={{
                          marginBottom: verticalScale(20),
                          marginTop: verticalScale(5),
                        }}
                        size={16}
                        fontFam="Roboto-Bold"
                        text={"About me"}
                      />

                      <View style={styles.bioContainer}>
                        {userData?.bio && (
                          <NewText
                            color={colors.white}
                            lineHeight={22}
                            size={15}
                            fontWeight="Poppins-Medium"
                            text={userData?.bio}
                          />
                        )}

                      
                      </View>
                    </>
                  )
                  }
                  <View>
                    {userDetails?.gif1 ? (
                      <>
                        <View
                          style={{
                            ...appStyles.rowjustify,
                            marginBottom: verticalScale(15),
                            marginTop: verticalScale(5),
                          }}
                        >
                          <NewText
                            color={colors.white}
                            size={16}
                            fontFam="Roboto-Bold"
                            text={"My Gifs"}
                          />
                          <View>
                            <Image
                              style={{
                                width: 120,
                                height: 35,
                                alignSelf: "flex-end",
                              }}
                              source={images.giphy}
                              resizeMode="contain"
                            />
                          </View>
                        </View>
                      </>
                    ) : (
                      <>
                        {userDetails?.gif2 && (
                          <>
                            <View
                              style={{
                                ...appStyles.rowjustify,
                                marginBottom: verticalScale(10),
                              }}
                            >
                              <NewText
                                color={colors.white}
                                size={16}
                                fontFam="Roboto-Bold"
                                text={"My Gifs"}
                              />
                              <View>
                                <Image
                                  style={{
                                    width: 120,
                                    height: 35,
                                    alignSelf: "flex-end",
                                  }}
                                  source={images.giphy}
                                  resizeMode="contain"
                                />
                              </View>
                            </View>
                          </>
                        )}
                      </>
                    )}

                    <View style={appStyles.rowjustify}>
                      {userDetails?.gif1 && (
                        <View style={styles.gifhyContainer}>
                          <Image
                            style={{ width: "100%", height: "100%" }}
                            source={{ uri: userDetails?.gif1 }}
                          />
                          {/* <View
                          style={{
                            width: "100%",
                            height: "100%",
                            position: "absolute",

                            backgroundColor: `rgba(0, 0, 0, 0.1)`, // Apply opacity to the background color
                          }}
                        /> */}
                        </View>
                      )}
                      {userDetails?.gif2 && (
                        <View style={styles.gifhyContainer}>
                          <Image
                            style={{ width: "100%", height: "100%" }}
                            source={{ uri: userDetails?.gif2 }}
                          />
                          {/* <View
                            style={{
                              width: "100%",
                              height: "100%",
                              position: "absolute",

                              backgroundColor: `rgba(0, 0, 0, 0.1)`, // Apply opacity to the background color
                            }}
                          /> */}
                        
                        </View>
                      )}
                    </View>
                  </View>


                  {userData?.link && (
                    <>
                      <NewText
                        color={colors.white}
                        style={{
                          marginBottom: verticalScale(20),
                          marginTop: verticalScale(15),
                        }}
                        size={16}
                        fontFam="Roboto-Bold"
                        text={"My link"}
                      />

                      <TouchableOpacity
                       activeOpacity={0.6}
                       onPress={() => {
                         Linking.openURL(userData?.link);
                       }}
                       style={{
                        backgroundColor: "#1D2029",
                        borderWidth: 1,
                        borderColor: "#8A8A8A",
                       borderRadius:scale(30),
                        marginBottom: verticalScale(10),
                        paddingLeft:scale(20),
                        padding: scale(10),

                       }}>
                    
                          <TouchableOpacity
                            activeOpacity={0.6}
                            onPress={() => {
                              Linking.openURL(userData?.link);
                            }}
                            style={{
                              flexDirection: "row",
                              alignItems:"center"
                              // marginTop: verticalScale(3),
                            }}
                          >
                            <Image
                              style={{
                                width: scale(18),
                                height: scale(18),
                              }}
                              resizeMode="contain"
                              source={images.link}
                            />
                            <NewText
                              color={colors.white}
                              size={14}
                              fontFam="Inter-Medium"
                              style={{
                                marginRight: scale(20),
                                marginLeft: scale(8),
                              }}
                              text={userData?.link}
                            />
                          </TouchableOpacity>
                  

                      
                      </TouchableOpacity>
                    </>
                  )
                  }

<NewText
                        color={colors.white}
                        style={{
                          marginBottom: verticalScale(10),
                          marginTop: verticalScale(10),

                        }}
                        size={16}
                        fontFam="Roboto-Bold"
                        text={"My wall"}
                      />

                 

                  {userDetails?.wallComments && (
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingHorizontal: 20,
                        borderWidth: 1,
                        borderColor: colors.gray200,
                        // paddingVertical:verticalScale(5),
                        borderRadius: 10,
                        marginVertical: verticalScale(10),
                      }}
                    >
                      <TextInput
                        style={{
                          color: colors.white,
                          width: "90%",
                          fontSize: verticalScale(15),
                        }}
                        placeholderTextColor={colors.white}
                        placeholder="Write on my wall"
                        onChangeText={(text) => setComment(text)}
                        value={comment}
                      />

                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={submitComment}
                      >
                        {loading2 ? (
                          <ActivityIndicator
                            size={"small"}
                            color={colors.white}
                          />
                        ) : (
                          <Image
                            style={{ tintColor: colors.white }}
                            source={images.send}
                          />
                        )}
                      </TouchableOpacity>
                    </View>
                  )}

                  <FlatList
                    data={comments}
                    nestedScrollEnabled={true}
                    contentContainerStyle={{
                      gap: 7,
                    }}
                    keyExtractor={(item) => item}
                    renderItem={renderChatList}
                  />
                </View>
              </View>
            </ScrollView>
          ) : (
            <>
              <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : null}
                keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100} // Adjust this value as needed
              >
                <View
                  style={{
                    flex: 1,
                    paddingTop: verticalScale(10),
                  }}
                >
                  <Channel
                    userData={userDetails}
                    channelId={channelId}
                    token={token}
                    authPosts={authPosts}
                    setAuthPosts={setAuthPosts}
                    counter={counter}
                    setCounter={setCounter}
                    isActiveProfile={isActiveProfile}
                    isEditView={isEditView}
                    setIsEditView={setIsEditView}
                    imageForEdit={imageForEdit}
                    setImageForEdit={setImageForEdit}
                    setPostId={setPostId}
                    flatListRefPosts={flatListRefPosts}
                  />

                  <View>
                    <MessageSender
                      onGiphyPress={() => GiphyDialog.show()}
                      // bottom={verticalScale(15)}
                      sendImage={images.simplesend}
                      channelId={channelId}
                      giphy={giphy}
                      setGiphy={setGiphy}
                      token={token}
                      setAuthPosts={setAuthPosts}
                      authPosts={authPosts}
                      isEditView={isEditView}
                      setIsEditView={setIsEditView}
                      imageForEdit={imageForEdit}
                      setImageForEdit={setImageForEdit}
                      postId={postId}
                      setCounter={setCounter}
                      counter={counter}
                    />
                  </View>
                </View>
              </KeyboardAvoidingView>
            </>
          )}
        </SafeAreaView>
      )}
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.black100,
    alignItems: "center",
    paddingBottom: "3%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    width: windowWidth / 2,
  },
  icon: {
    height: 20,
    width: 20,
    marginRight: 10,
    resizeMode: "contain",
  },
  flex: { flexDirection: "row", alignItems: "center", marginVertical: 6 },

  gifhyContainer: {
    width: "48%",
    height: windowHeight / 4.3,
    overflow: "hidden",
    borderRadius: scale(5),
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    alignItems: "center",
    width: "33%",
    height: 75,
    backgroundColor: colors.black300,
    justifyContent: "center",
  },
  bioContainer: {
    backgroundColor: "#1D2029",
    borderWidth: 1,
    borderColor: "#8A8A8A",
    borderTopLeftRadius: scale(15),
    borderTopRightRadius: scale(15),
    borderBottomRightRadius: scale(15),
    marginBottom: verticalScale(10),
    padding: scale(15),
  },
});
