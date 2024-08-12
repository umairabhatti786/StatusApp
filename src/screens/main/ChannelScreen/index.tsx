import {
  ActivityIndicator,
  Alert,
  BackHandler,
  FlatList,
  Image,
  ImageBackground,
  Keyboard,
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
  setDisableBottomTab,
} from "../../../redux/reducers/authReducer";
import {
  CreateComment,
  DeleteComment,
  GetAuthUser,
  GetStatus,
  GetUserComment,
  LoadMoreStatus,
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

const ChannelScreen = () => {
  const navigation: any = useNavigation();
  const [isSideBar, setIsBar] = useState(false);
  const [isFollow, setIsFollow] = useState(false);
  const focused = useIsFocused();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [userData, setUserData] = useState<any>();
  const token = useSelector(getToken);
  const [authPosts, setAuthPosts]:any = useState([]);
  const [nextUrl, setNextUrl] = useState('');
  const [giphy, setGiphy] = useState("");
  const activeBar = useSelector((state) => state.auth)?.profileActiveBar;
  const [isActiveProfile, setIsActiveProfile] = useState("");
  const [counter, setCounter] = useState(0);
  const [isGifView, setIsGifView] = useState(false);
  const [isEditView, setIsEditView] = useState(false);
  const [isEditTextView, setIsEditTextView] = useState(false);

  const [imageForEdit, setImageForEdit] = useState("");
  const [postId, setPostId] = useState("");
  const flatListRefPosts: any = useRef(null);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [editPostData, setEditPostData] = useState({
    description: "",
    imageUrl: "",
    gif: "",
    text:""
  });

  const dispatch = useDispatch();

  const [channelId, setIsChannelId] = useState("");
  const getChannelId = async () => {
    const userInfo = await StorageServices.getItem(AUTH);
    setIsChannelId(userInfo?.channel?.id);
  };
  useEffect(() => {
    setImageForEdit(imageForEdit);
  }, [isEditView]);
  useEffect(() => {
    getChannelId();
  }, []);

  useEffect(() => {
    getAuth();
    setIsActiveProfile(activeBar);
  }, [focused]);

  useEffect(() => {
    getUserComment();
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

      setIsGifView(true);
      GiphyDialog.hide();
      // SendMessage()
      console.log(isGifView);
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

  useEffect(() => {
    const KeyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setIsKeyboardVisible(true);
      }
    );
    const KeyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsKeyboardVisible(false);
      }
    );
    return () => {
      KeyboardDidHideListener.remove();
      KeyboardDidShowListener.remove();
    };
  }, []);

  const refreshAuthData = async (setRefreshing:any) => {
    if(nextUrl){

      // let userInfo = await StorageServices.getItem(AUTH);
      setRefreshing(true)
      let token = await StorageServices.getItem(TOKEN);
      LoadMoreStatus(nextUrl, token, async ({ isSuccess, response }: any) => {
        console.log("data p", isSuccess);
  
        let result = JSON.parse(response);
        if (result.status) {
          // console.log('result?.posts',result?.posts?.data)
          let data = result?.posts?.data.reverse();
          // setPosts(data);
          setAuthPosts([...authPosts,...result?.posts?.data.reverse()]);
          setNextUrl(result?.posts?.next_page_url);
          setRefreshing(false)
        } else {
          setRefreshing(false)
          console.log(result);
          // Alert.alert("Alert!", "Something went wrong",);
          console.log("Something went wrong");
        }
      });
    }
  };
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
        setAuthPosts(result?.posts?.data.reverse());
        setNextUrl(result?.posts?.next_page_url);
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
        setComments(result?.comments?.data);
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
      userId: userData?.id,
    };
    // console.log(data)
    setLoading2(true);
    CreateComment(data, token, async ({ isSuccess, response }: any) => {
      console.log("data", isSuccess);

      let result = JSON.parse(response);
      if (result.status) {
        setComment("");

        setComments([...comments, result.comment]);
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
    GetAuthUser(token, async ({ isSuccess, response }: any) => {
      if (isSuccess) {
        let result = JSON.parse(response);
        // console.log("ckdnckdnc", result?.user);

        if (result.status) {
          setLoading(false);
          setUserData(result?.user);
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
        name={item?.username}
        image={item?.imageUrl}
        message={item?.description}
        time={item?.created_at}
        chatDate={item?.chatDate}
      />
    );
  };
  const shortenedText =
    userData?.name?.length > 30
      ? userData?.name?.substring(0, 29) + "..."
      : userData?.name;

  return (
    <>
      {loading ? (
        <View style={appStyles.main}>
          <Loader />
        </View>
      ) : (
        <SafeAreaView style={appStyles.main}>
          <StatusBar backgroundColor="#1D2029" barStyle="light-content" />

          <View style={styles.header}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                // paddingVertical: verticalScale(5),
              }}
            >
              <TouchableOpacity
                activeOpacity={0.6}
                style={{
                  width: scale(27),
                  height: scale(25),
                  alignItems: "flex-start",
                  justifyContent: "center",
                  // backgroundColor:"red"
                  // backgroundColor:"red"
                }}
                onPress={() => {
                  dispatch(setDisableBottomTab(false));
                  navigation.goBack();
                }}
              >
                <Image
                  style={{ width: scale(18), height: scale(25) }}
                  source={images.back200}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <Spacer width={5} />
              <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                setIsBar(false);
                dispatch(setDisableBottomTab(false));
  
                setTimeout(() => {
                  navigation.navigate("ProfileStack", {
                    id: userData?.id,
                  });
                }, 200);
              }}
              // onPress={()=>navigation.navigate("ProfileStack")}
              >

              <FastImage
                style={{
                  width: scale(37),
                  height: scale(37),
                  borderRadius: 999,
                }}
                source={{
                  uri: userData?.imageUrl,
                  headers: { Authorization: "someAuthToken" },
                  priority: FastImage.priority.high,
                }}
              />

              </TouchableOpacity>

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
                  color={colors.white}
                  size={14}
                  style={{ marginTop: verticalScale(-3) }}
                  text={`${userData?.followers_count} Followers`}
                />
              </View>
            </View>
            {/* <TouchableOpacity
              activeOpacity={0.6}
              onPress={() =>{
                setIsBar(true)


              } }
            >
              <Image
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 999,
                }}
                source={images.dot}
              />
            </TouchableOpacity> */}
            {/* <CustomText color={"transparent"} size={18} text={"sss"} /> */}
          </View>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            enabled={false}
            // keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 300} // Adjust this value as needed
          >
            <View
              style={{
                flex: 1,
                justifyContent: "space-between",
                //   paddingTop: verticalScale(10),
              }}
            >
              <Channel
                userData={userData}
                channelId={channelId}
                token={token}
                isKeyboardVisible={isKeyboardVisible}
                authPosts={authPosts}
                setAuthPosts={setAuthPosts}
                counter={counter}
                setCounter={setCounter}
                isActiveProfile={isActiveProfile}
                isEditView={isEditView}
                setIsEditTextView={setIsEditTextView}
                isEditTextView={isEditTextView}
                setIsEditView={setIsEditView}
                imageForEdit={imageForEdit}
                setImageForEdit={setImageForEdit}
                setPostId={setPostId}
                flatListRefPosts={flatListRefPosts}
                editPostData={editPostData}
                setEditPostData={setEditPostData}
                refreshAuthData={refreshAuthData}
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
                  setIsEditTextView={setIsEditTextView}
                  isEditTextView={isEditTextView}
                  imageForEdit={imageForEdit}
                  setImageForEdit={setImageForEdit}
                  postId={postId}
                  setCounter={setCounter}
                  counter={counter}
                  editPostData={editPostData}
                  setEditPostData={setEditPostData}
                  isGifView={isGifView}
                  setIsGifView={setIsGifView}
                />
              </View>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      )}

      {/* <SizeBar
        setIsModalVisible={setIsBar}
        top={verticalScale(-15)}
        right={scale(-8)}
        // paddingHorizontal={5}
        // paddingVertical={5}
        isModalVisible={isSideBar}
      >
        <View>
          <TouchableOpacity
            activeOpacity={0.6}
            style={{
              height: 30,
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => {
              setIsBar(false);
              dispatch(setDisableBottomTab(false));

              setTimeout(() => {
                navigation.navigate("ProfileStack", {
                  id: userData?.id,
                });
              }, 200);
            }}
          >
            <CustomText
              color={"#F9FFFF"}
              size={15}
              style={{ marginBottom: verticalScale(10) }}
              // fontFam="Inter-Medium"
              // style={{ marginLeft: scale(8) }}
              text={"ViewProfile"}
            />
          </TouchableOpacity>
        </View>
      </SizeBar> */}
    </>
  );
};

export default ChannelScreen;

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.black300,
    alignItems: "center",
    // paddingTop: Platform.OS == "ios" ? "18%" : "2%",
    // paddingBottom: "1%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: scale(15),
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
});
