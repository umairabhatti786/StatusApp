import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  ImageBackground,
  Linking,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState, version } from "react";
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
import { profileComments } from "../../../utils/Data";
import { scale, verticalScale } from "react-native-size-matters";
import { Spacer } from "../../../components/Spacer";
import SizeBar from "../../../components/SizeBar";
import CustomModal from "../../../components/CustomModal";
//   import BlockModal from "./BlockModal";
import Channel from "../Channel";
import FastImage from "react-native-fast-image";
import NewText from "../../../components/NewText";
import {
  AddRemoveViews,
  Blocked,
  CreateComment,
  Favorite,
  Follow,
  GetConversationIfExist,
  GetStatus,
  GetUserComment,
  LoadMoreStatus,
  ReadPost,
  getUserDetail,
  isFollowing,
} from "../../../api/ApiServices";
import { useSelector } from "react-redux";
import { getToken } from "../../../redux/reducers/authReducer";
import Loader from "../../../components/Loader";
import CustomToast from "../../../components/CustomToast";
import {
  Pusher,
  PusherMember,
  PusherChannel,
  PusherEvent,
} from "@pusher/pusher-websocket-react-native";
import { AUTH, StorageServices } from "../../../utils/hooks/StorageServices";
import BlockModal from "../SearchScreen/BlockModal";
import constants from "../../../redux/constants";

const OtherUserChannel = () => {
  const pusher = Pusher.getInstance();
  const route: any = useRoute();
  const id = route?.params?.id;
  let isChannel = route?.params?.isChannel;
  const channelId = route?.params?.channelId;
  const navigation: any = useNavigation();
  const [isWatchList, setIsWatchList] = useState(false);
  const [isSideBar, setIsBar] = useState(false);
  const [isFollow, setIsFollow] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<any>([]);
  const [newComment, setNewComment] = useState<any>({});
  const [posts, setPosts] = useState<any>([]);
  const [nextUrl, setNextUrl] = useState("");
  const [newPost, setNewPost] = useState<any>({});
  const [isBlockModal, setIsBlockModal] = useState(false);
  const [isReportModal, setIsReportModal] = useState(false);
  const [isActiveProfile, setIsActiveProfile] = useState("Profile");
  const token = useSelector(getToken);
  const [data, setData] = useState({});
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [toastColor, setToastColor] = useState(colors.red);
  const isFocused = useIsFocused();
  const [loading2, setLoading2] = useState(false);
  const [loading, setLoading] = useState(true);
  const [counter, setCounter] = useState(0);
  const [counter1, setCounter1] = useState(0);
  const flatListRefOtherPosts: any = useRef(null);

  const [isUnfollowModal, setIsUnfollowModal] = useState(false);

  // const [channelId, setIsChannelId] = useState("");
  // const getChannelId = async () => {
  //   const userInfo = await StorageServices.getItem(AUTH);
  //   setIsChannelId(userInfo?.channel?.id);
  // };
  // useEffect(() => {
  //   getChannelId();
  // }, []);
  // function onConnectionStateChange(currentState:string, previousState:string) {

  //   console.log(`Connection: ${currentState}`,'commentsChannel_'+id);
  // }

  // useEffect(() => {
  //   // if (newComment)
  //   setComments([...comments, newComment]);
  // }, [newComment]);

  // useEffect(() => {
  //   if(newPost)
  //   setNewPost([...posts,newPost])
  // }, [newPost])

  const con = async () => {
    console.log("am focused");
    try {
      await pusher.init({
        apiKey: constants.PUSHER_APP_KEY,
      cluster: constants.PUSHER_APP_CLUSTER,
        // onConnectionStateChange,
      });
      // console.log('init')
      await pusher.subscribe({
        channelName: "commentsChannel_" + id,
        onEvent: (event: PusherEvent) => {
          // console.log("channelUpdates_"+JSON.stringify(route?.params))
          console.log("commentsChannel_", JSON.parse(event.data));
          let com = JSON.parse(event.data).comment;
          if (com?.deleted) {
            let filter = comments.filter((c: any) => c.id != com.commentId);
            setComments(filter);
          } else {
            setNewComment(com);
            // setComments([...comments,com])
          }
          // let newCommentList= comments;
          // newCommentList.push(JSON.parse(event.data).comment)
          // console.log(newCommentList)
          // setNewComment(JSON.parse(event.data).comment);
          // comments.push(JSON.parse(event.data).comment)
        },
      });
      await pusher.subscribe({
        channelName: "channelUpdates_" + channelId,
        onEvent: (event: PusherEvent) => {
          console.log("channelUpdates_", JSON.parse(event.data).post);
          // let newPostList= [posts,JSON.parse(event.data).post];
          let post = JSON.parse(event.data).post;
          let data = [post, ...posts];
          setPosts(data);
          // if(post.id){
          //   setNewPost(post)
          // }
          // setNewPost(JSON.parse(event.data).post);
        },
      });
      // await pusher.subscribe({ channelName:'commentsChannel_'+id });
      await pusher.connect();
    } catch (e) {
      console.log(`ERROR: ${e}`);
    }
  };
  const unCon = async () => {
    await pusher.unsubscribe({ channelName: "commentsChannel_" + id });
    await pusher.unsubscribe({ channelName: "channelUpdates_" + channelId });
    await pusher.disconnect();
  };

  // useEffect(() => {
  //   if (isFocused) {
  //     con();
  //   } else {
  //     unCon();
  //   }
  // }, [isFocused]);

  

  useEffect(() => {
    if (isFocused) GetPosts();
  }, [isFocused, counter1]);

  useEffect(() => {
    //   if (isChannel) {
    //     setIsActiveProfile("Channel");
    //   } else {
    //     setIsActiveProfile("Profile");
    //   }
    getDetail();
  }, []);
  // console.log("UserID", data?.gif);

  const onBlocked = () => {
    // setIsFollow(!isFollow)
    let params = {
      blocked: data.id.toString(),
    };
    console.log("BlokcedResult", params);

    Blocked(params, token, async ({ isSuccess, response }: any) => {
      if (isSuccess) {
        let result = JSON.parse(response);

        if (result.status) {
          setIsBlockModal(false);
          navigation.goBack();
          // setLoading(false);
          // setAllUsers(result?.users?.data)
          // setNextPageUrl(!result?.users?.next_page_url?true:false)
        } else {
          Alert.alert("Alert!", "Something went wrong");
        }
      } else {
        // setLoading(false);

        Alert.alert("Alert!", "Network Error.");
      }
    });
  };

  const GetPosts = async () => {
    GetStatus(id, token, async ({ isSuccess, response }: any) => {
      console.log("data p", isSuccess);

      let result = JSON.parse(response);
      if (result.status) {
        // console.log(result?.posts?.data)
        let data = result?.posts?.data.reverse();
        setPosts(result?.posts?.data.reverse());
        setNextUrl(result?.posts?.next_page_url);
        setTimeout(() => {
          setLoading(false);
        }, 500);

        //!---->
        result?.posts?.data.map((p: any) => {
          if (!p?.read_at) {
            ReadPost(
              p?.id,
              token,
              async ({ isSuccess, response }: any) => {
                console.log(response);
              }
            );
          }
        });

        //adding Views
        result?.posts?.data.map(async (p: any, index: any) => {
          let user = await StorageServices.getItem(AUTH);
          let data = { user_id: user.id, post_id: p.id };

          AddRemoveViews(data, token, async ({ isSuccess, response }: any) => {
            let result = JSON.parse(response);
            if (result.status) {
              // setCounter1(counter1 + 1);
            } else {
              console.log(result);
              setLoading(false);
              // Alert.alert("Alert!", "Something went wrong",);
              console.log("Something went wrong");
            }
          });
          
        });
      } else {
        console.log(result);
        // setLoading(false)
        // Alert.alert("Alert!", "Something went wrong",);
        console.log("Something went wrong");
      }
    });
  };
  const refreshOtherData = async (setRefreshing: any) => {
    // console.log(nextUrl)
    if (nextUrl) {
      setRefreshing(true);
      LoadMoreStatus(nextUrl, token, async ({ isSuccess, response }: any) => {
        console.log("data p", isSuccess);

        let result = JSON.parse(response);
        if (result.status) {
          // console.log(result?.posts?.data)
          let data = result?.posts?.data.reverse();
          setPosts([...posts, ...data]);
          setNextUrl(result?.posts?.next_page_url);

          setRefreshing(false);
        } else {
          setRefreshing(false);
          console.log(result);
          // Alert.alert("Alert!", "Something went wrong",);
          console.log("Something went wrong");
        }
      });
    }
  };

  // const getUserComment = async () => {
  //   let data = {
  //     userId: id,
  //   };
  //   GetUserComment(data, token, async ({ isSuccess, response }: any) => {
  //     console.log("data g", isSuccess);

  //     let result = JSON.parse(response);
  //     if (result.status) {
  //       // console.log(result.comments.data)
  //       setComments(result?.comments?.data);
  //       // setLoading(false);
  //     } else {
  //       console.log(result);
  //       // Alert.alert("Alert!", "Something went wrong",);
  //       console.log("Something went wrong");
  //     }
  //   });
  // };

  const onFollow = () => {
    setIsFollow(!isFollow);
    if (!isFollow) {
      let name = `You followed ${data?.name}`;
      setShowMessage(true);
      setMessage(name);
      setToastColor(colors.green);

      setTimeout(() => {
        setShowMessage(false);
        setToastColor(colors.red);
      }, 4000);
    }

    let params = {
      followee: id,
    };

    Follow(params, token, async ({ isSuccess, response }: any) => {
      if (isSuccess) {
        let result = JSON.parse(response);
        console.log("FollowUser", result);

        if (result.status) {
        } else {
          Alert.alert("Alert!", "Something went wrong");
        }
      } else {
        // setLoading(false);

        Alert.alert("Alert!", "Network Error.");
      }
    });
  };

  const getDetail = () => {
    // setLoading(true);
    let params = {
      id: id,
    };
    getUserDetail(params, token, async ({ isSuccess, response }: any) => {
      console.log("knckdnc", isSuccess);

      let result = JSON.parse(response);
      if (result.status) {
        console.log("user", result);
        setData(result?.user);
        if (result?.user?.followers.length > 0) {
          setIsFollow(true);
        }
        if (result?.user?.favoritee.length > 0) {
          setIsFavorite(true);
        }
        // setLoading(false);

        //   if (result?.) {
        //     setIsFollow(true)
        //   }
        //   else {
        //     setIsFollow(false)
        //   }
        // } else {
        //   // Alert.alert("Alert!", "Something went wrong");
      } else {
        Alert.alert("Alert!", "Something went wrong");
      }
    });
  };

  // let name="umair abbas 719 @ gmail .com"
  // console.log("namelibv", name?.length)
  const shortenedText =
    data.name?.length > 30 ? data.name?.substring(0, 29) + "..." : data.name;

  return (
    <>
      <SafeAreaView style={appStyles.main}>
        <StatusBar backgroundColor="#1D2029" barStyle="light-content" />

        {loading ? (
          <Loader />
        ) : (
          <>
            <View style={styles.header}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  // paddingVertical: verticalScale(5),
                }}
              >
                <TouchableOpacity
                  activeOpacity={0.4}
                  style={{
                    width: scale(30),
                    height: scale(25),
                    alignItems: "flex-start",
                    justifyContent: "center",
                  }}
                  onPress={() => navigation.goBack()}
                >
                  <Image
                    style={{ width: scale(18), height: scale(25) }}
                    source={images.back200}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("OthersProfile", {
                      id: data?.id,
                    })
                  }
                >
                  <FastImage
                    style={{
                      width: scale(37),
                      height: scale(37),
                      borderRadius: 999,
                    }}
                    source={{
                      uri: data?.imageUrl,
                      headers: { Authorization: "someAuthToken" },
                      priority: FastImage.priority.high,
                    }}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                                  activeOpacity={0.4}

                  onPress={() =>
                    navigation.navigate("OthersProfile", {
                      id: data?.id,
                    })
                  }
                  style={{
                    marginLeft: scale(7),
                    paddingBottom: verticalScale(5),
                    width: windowWidth / 1.8,
                    // backgroundColor:"red"
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
                    text={`${data?.followers_count} Followers`}
                  />
                </TouchableOpacity>
              </View>

              <View style={{ ...appStyles.row }}>
                {isFollow ? (
                  <></>
                ) : (
                  <TouchableOpacity activeOpacity={0.6} onPress={onFollow}>
                    <NewText
                      color={colors.white}
                      size={16}
                      fontFam="Poppins-SemiBold"
                      fontWeight="700"
                      textDecorationLine={"underline"}
                      // style={{marginTop:verticalScale(5)}}
                      text={"Follow"}
                    />
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  activeOpacity={0.6}
                  style={{
                    width: scale(30),
                    height: scale(40),
                    alignItems: "flex-end",
                    justifyContent: "center",
                  }}
                  onPress={() => setIsBar(!isSideBar)}
                >
                  <Image
                    style={{
                      width: scale(30),
                      height: scale(25),
                      tintColor: colors.white,
                      marginLeft: scale(-3),
                    }}
                    source={images.dot}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
              {/* <View style={{ ...appStyles.row }}>
                <TouchableOpacity
                  activeOpacity={0.6}
                  style={{
                    width: scale(30),
                    height: scale(40),
                    alignItems: "flex-end",
                    justifyContent: "center",
                    // backgroundColor:"red"
                  }}
                  onPress={() => setIsBar(!isSideBar)}
                >
                  <Image
                    style={{
                      width: scale(30),
                      height: scale(25),
                      tintColor: colors.white,
                      marginLeft: scale(-3),
                    }}
                    source={images.dot}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View> */}
            </View>

            <View
              style={{
                flex: 1,
                justifyContent: "space-between",
                //   paddingTop: verticalScale(10),
              }}
            >
              {posts.length == 0 ? (
                <View
                  style={{
                    height: windowHeight / 1.5,
                    alignItems: "center",
                    justifyContent: "center",
                    width: "60%",
                    alignSelf: "center",
                  }}
                >
                  <NewText
                    color={colors.gray500}
                    size={17}
                    fontFam="Inter-Medium"
                    lineHeight={26}
                    style={{ textAlign: "center" }}
                    text={"This user has not posted any updates yet."}
                  />
                </View>
              ) : (
                <Channel
                  posts={posts}
                  disableEditAndDelete={true}
                  hideSendMessage={true}
                  userData={data}
                  mainFlex={1}
                  mainMargin={0}
                  channelId={channelId}
                  counter={counter}
                  setCounter={setCounter}
                  isActiveProfile={isActiveProfile}
                  flatListRefOtherPosts={flatListRefOtherPosts}
                  refreshOtherData={refreshOtherData}
                />
              )}
            </View>
          </>
        )}
      </SafeAreaView>
      <SizeBar
        setIsModalVisible={setIsBar}
        top={verticalScale(-15)}
        right={scale(-8)}
        // paddingHorizontal={5}
        // paddingVertical={5}
        isModalVisible={isSideBar}
      >
        {!isFollow ? (
          <View>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                setIsBar(false);
                setTimeout(() => {
                  setIsBlockModal(true);
                }, 1000);
              }}
            >
              <CustomText
                color={"#F9FFFF"}
                size={15}
                style={{ marginBottom: verticalScale(10) }}
                // fontFam="Inter-Medium"
                // style={{ marginLeft: scale(8) }}
                text={"Block"}
              />
            </TouchableOpacity>

            <TouchableOpacity>
              <CustomText
                color={"#F9FFFF"}
                size={15}
                // fontFam="Inter-Medium"
                style={{ marginBottom: verticalScale(10) }}
                text={"Report"}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                setIsBar(false);
                navigation.navigate("OthersProfile", {
                  id: data?.id,
                });
                // onFollow();
              }}
            >
              <CustomText
                color={"#F9FFFF"}
                size={15}
                style={{ marginBottom: verticalScale(10) }}
                // fontFam="Inter-Medium"
                // style={{ marginLeft: scale(8) }}
                text={"View Profile"}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                setIsBar(false);
                onFollow();
              }}
            >
              <CustomText
                color={"#F9FFFF"}
                size={15}
                style={{ marginBottom: verticalScale(10) }}
                // fontFam="Inter-Medium"
                // style={{ marginLeft: scale(8) }}
                text={"Unfollow"}
              />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                setIsBar(false);
                setTimeout(() => {
                  setIsBlockModal(true);
                }, 1000);
              }}
            >
              <CustomText
                color={"#F9FFFF"}
                size={15}
                style={{ marginBottom: verticalScale(10) }}
                // fontFam="Inter-Medium"
                // style={{ marginLeft: scale(8) }}
                text={"Block"}
              />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                setIsBar(false);
                setTimeout(() => {
                  setIsReportModal(true);
                }, 1000);
              }}
            >
              <CustomText
                color={"#F9FFFF"}
                size={15}
                // fontFam="Inter-Medium"
                // style={{ marginLeft: scale(8) }}
                text={"Report"}
              />
            </TouchableOpacity>
          </View>
        )}
      </SizeBar>

      {showMessage && (
        <CustomToast
          showError={showMessage}
          setShowError={setShowMessage}
          bgColor={toastColor}
          text={message}
        />
      )}

      <BlockModal
        isModalVisible={isBlockModal}
        setModalVisible={setIsBlockModal}
        isBlock={"BLOCK"}
        onBlocked={onBlocked}
        title={`Block ${data?.name}?`}
        des={
          "This user will no longer be able to follow, message, or see your profile."
        }
      />

      <BlockModal
        isModalVisible={isReportModal}
        setModalVisible={setIsReportModal}
        isBlock={"REPORT"}
        title={`Report ${data?.name}?`}
        des={
          "If you feel this user has violated our terms of service select REPORT and we will review your anonymous submission."
        }
      />
    </>
  );
};

export default OtherUserChannel;

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.black300,
    alignItems: "center",
    // paddingTop: Platform.OS == "ios" ? "18%" : "2%",
    // paddingBottom: "1%",
    flexDirection: "row",
    justifyContent: "space-between",
    // paddingHorizontal: scale(15),
    paddingLeft: scale(10),
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
  box: {
    alignItems: "center",
    width: "33%",
    height: 75,
    backgroundColor: colors.black300,
    justifyContent: "center",
  },
  gifhyContainer: {
    width: "48%",
    height: windowHeight / 4.3,
    overflow: "hidden",
    borderRadius: scale(5),
    alignItems: "center",
    justifyContent: "center",
  },
});
