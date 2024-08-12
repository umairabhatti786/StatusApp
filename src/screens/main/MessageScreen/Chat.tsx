import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Keyboard,
  Platform,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { appStyles } from "../../../utils/AppStyles";
import { colors } from "../../../utils/colors";
import CustomText from "../../../components/CustomText";
import { images } from "../../../assets/images";
import MessagesList, { windowWidth } from "./MessagesList";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import ImagePicker from "react-native-image-crop-picker";
import { scale, verticalScale } from "react-native-size-matters";
import { Spacer } from "../../../components/Spacer";
import MessageSender from "../../../components/MessageSender";
import InboxComponent from "../../../components/InboxComponent";
import { useSelector } from "react-redux";
import {
  getNewMessageR,
  getTyper,
  getTypingR,
  getUserData,
} from "../../../redux/reducers/authReducer";
import {
  AUTH,
  StorageServices,
  TOKEN,
} from "../../../utils/hooks/StorageServices";
import {
  CREATE_TRASH_CONVERSATION,
  CreateArchive,
  CreateBlockConversation,
  DELETE_CONVERSATION,
  GetConversation,
  GetRefreshConversation,
  ReadMessage,
} from "../../../api/ApiServices";
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
import moment from "moment";
import {
  Pusher,
  PusherMember,
  PusherChannel,
  PusherEvent,
} from "@pusher/pusher-websocket-react-native";
import DeleteModal from "./DeleteModal";
import NewText from "../../../components/NewText";
import FastImage from "react-native-fast-image";
import { windowHeight } from "../../../utils/Dimensions";
import LottieView from "lottie-react-native";

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

const Chat = () => {
  const pusher = Pusher.getInstance();
  const route: any = useRoute();
  const item = route?.params?.item;
  const receiver = route?.params?.item?.user2 || route?.params?.item?.user2;
  const user = useSelector(getUserData);
  const navigation: any = useNavigation();
  const flatListRefChat: any = useRef(null);
  const [loadings, setLoadings] = useState({
    archive: false,
    trash: false,
    block: false,
  });
  const [nextUrl, setNextUrl]: any = useState({});
  const [conversation, setConversation] = useState<any>([]);
  const [NewMessage, setNewMessage] = useState<any>({});
  const isFocused = useIsFocused();
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [typing, setTyping] = useState();
  const userData = useSelector(getUserData);
  const [giphy, setGiphy] = useState("");
  const [isDeleteVisible, setIsDeleteVisible] = useState(false);
  const [isGifView, setIsGifView] = useState(false);
  const typingChat = useSelector(getTypingR);
  const newMessage = useSelector(getNewMessageR);
  const typer = useSelector(getTyper);
  const [refreshing, setRefreshing] = useState(false);
  const [imageObject, setImageObject] = useState({});

  const [state, setState] = useState({
    archive: false,
    block: false,
    trash: false,
  });

  useEffect(() => {
    console.log("typingChat", typingChat);
    console.log("typer", typer);
  }, [typingChat, typer]);

  useEffect(() => {
    console.log("newMessage", newMessage);
    setConversation([newMessage, ...conversation]);
  }, [newMessage]);

  // console.log("typingDaya",typing)
  // useEffect(() => {
  //   // setTimeout(() => {
  //     if (conversation.length > 0 && flatListRef.current) {
  //       flatListRef.current.scrollToEnd({ animated: true });
  //     }
  //   // }, 1000);
  // }, [conversation]);

  const getConversation = async () => {
    let token = await StorageServices.getItem(TOKEN);

    // console.log(item.id)
    GetConversation(
      { conversationId: item?.id },
      token,
      async ({ isSuccess, response }: any) => {
        console.log("data c", isSuccess);
        // console.log(msg)
        let result = JSON.parse(response);
        if (result.status) {
          console.log(result?.conversation?.data);
          // let data = result?.conversation?.data.reverse();
          let data = result?.conversation?.data.reverse();

          setConversation(result?.conversation?.data.reverse());
          setNextUrl(result?.conversation?.next_page_url);
          // setRefreshing(false);
          // Alert.alert('',item?.user1?.id || item?.user2?.id,user.id)
          // if((item?.user1?.id || item?.user2?.id)==user.id){

          //!
          data.map((c: any) => {
            if (!c?.read_at && c?.receiverId == user.id) {
              ReadMessage(
                c?.id,
                token,
                async ({ isSuccess, response }: any) => {
                  console.log(response);
                }
              );
            }
          });
          //!
          // }
          // flatListRef.current.scrollToEnd({ animated: true });
          // await StorageServices.setItem("chatlist", result?.conversation?.data);
        } else {
          // setMsg({...msg,message:''})
          console.log(result);
          // Alert.alert("Alert!", "Something went wrong",);
          console.log("Something went wrong");
        }
      }
    );
  };
  const refreshData = async () => {
    // console.log('next_page_url',nextUrl)
    if (nextUrl) {
      let token = await StorageServices.getItem(TOKEN);
      // console.log(item.id)
      setRefreshing(true);
      GetRefreshConversation(
        token,
        nextUrl,
        async ({ isSuccess, response }: any) => {
          console.log("data c", isSuccess);
          // console.log(msg)
          let result = JSON.parse(response);
          if (result.status) {
            console.log(result?.conversation?.data);
            let data = result?.conversation?.data.reverse();
            // console.log('result?.posts',result?.posts?.data)
            setConversation([
              ...conversation,
              ...result?.conversation?.data.reverse(),
            ]);
            setNextUrl(result?.conversation?.next_page_url);
            setRefreshing(false);
            // Alert.alert("msg",'check')
          } else {
            // setMsg({...msg,message:''})
            setRefreshing(false);
            console.log(result);
            // Alert.alert("Alert!", "Something went wrong",);
            console.log("Something went wrong");
          }
        }
      );
    }
  };
  // console.log("giph", giphy);
  useEffect(() => {
    const handler: GiphyDialogMediaSelectEventHandler = (e) => {
      setGiphy(e.media.url);
      setIsGifView(true);
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

  // useEffect(() => {
  //   setConversation([...conversation, NewMessage]);
  // }, [NewMessage]);

  // useEffect(() => {
  // pusher.init({
  //     apiKey: "e8f7ca7b8515f9bfcbb0",
  //     cluster: "mt1",
  //     // onConnectionStateChange,
  //   });

  //    pusher.connect();
  //   let channelNumber =item?.userId1+item?.userId2;
  //   console.log("channelNumber", channelNumber);
  //   console.log("chatChannel_" + channelNumber);
  //   let chatChannel =  pusher.subscribe({
  //     channelName: "chatChannel_" + channelNumber,
  //     onEvent: (event: PusherEvent) => {
  //       console.log("chatChannel c", JSON.parse(event.data));
  //       if (!(JSON.parse(event.data).message?.senderId == userData.id)) {
  //         // setConversation([...conversation,JSON.parse(event.data).message])
  //         setNewMessage(JSON.parse(event.data).message);
  //         flatListRefChat.current.scrollToEnd({ animated: true });
  //       }
  //       // setConversation([...conversation, JSON.parse(event.data).message]);
  //       // setComments([...comments,JSON.parse(event.data).comment])
  //     },
  //   });
  //   let TypingChannel =  pusher.subscribe({
  //     channelName: "TypingChannel_" + channelNumber,
  //     onEvent: (event: PusherEvent) => {
  //       if(JSON.parse(event.data).data.user1Id==parseInt(item?.user1?.id || item?.user2?.id)){

  //         setTyping(true);
  //         setTimeout(() => {
  //           setTyping(false);
  //         }, 2000);
  //       }
  //       console.log("TypingChannel c", JSON.parse(event.data).data);
  //     },
  //   });

  //   // Cleanup on unmount
  //   return () => {
  //     // channel.unbind('my-event');

  //     pusher.unsubscribe({channelName:"chatChannel_" + item?.userId1+item?.userId2});
  //     pusher.unsubscribe({channelName:"TypingChannel_" + item?.userId1+item?.userId2});
  //     pusher.disconnect();
  //   };

  // }, []);

  // useEffect(() => {
  //   async () => {
  //     let chatList = await StorageServices.getItem("chatList");
  //     if (chatList) {
  //       setConversation(chatList);
  //     }
  //   };
  // }, [isFocused]);

  useEffect(() => {
    if (isFocused) {
      getConversation();
    }
  }, [isFocused]);

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

  const handleArchive = async () => {
    let user = await StorageServices.getItem(AUTH);
    let conversationId = item.id;
    let token = await StorageServices.getItem(TOKEN);
    let data = { userId: user.id, conversationId: conversationId };
    setLoadings({ ...loadings, archive: true });

    CreateArchive(data, token, async ({ isSuccess, response }: any) => {
      console.log("data c", isSuccess);
      // console.log(msg)
      let result = JSON.parse(response);
      if (result.status) {
        setLoadings({ ...loadings, archive: false });
        //redirect
        navigation.navigate("MessageScreen");
        console.log(result);
      } else {
        setLoadings({ ...loadings, archive: false });
        Alert.alert("Alert!", "Something went wrong");
        console.log(result);
        console.log("Something went wrong");
      }
    });
  };
  const handleBlock = async () => {
    let user = await StorageServices.getItem(AUTH);
    let conversationId = item.id;
    let token = await StorageServices.getItem(TOKEN);
    let data = { userId: user.id, conversationId: conversationId };
    setLoadings({ ...loadings, block: true });

    CreateBlockConversation(
      data,
      token,
      async ({ isSuccess, response }: any) => {
        console.log("data b", isSuccess);
        // console.log(msg)
        let result = JSON.parse(response);
        if (result.status) {
          setLoadings({ ...loadings, block: false });
          //redirect
          console.log(result);
          navigation.navigate("MessageScreen");
        } else {
          setLoadings({ ...loadings, block: false });
          Alert.alert("Alert!", "Something went wrong");
          console.log(result);
          console.log("Something went wrong");
        }
      }
    );
  };
  const handleTrash = async () => {
    // let user = await StorageServices.getItem(AUTH);
    let conversationId = item.id;
    let token = await StorageServices.getItem(TOKEN);
    // let data = { userId: user.id, conversationId: conversationId };
    setLoadings({ ...loadings, trash: true });
    DELETE_CONVERSATION(
      conversationId,
      token,
      async ({ isSuccess, response }: any) => {
        console.log("data t", isSuccess);
        // console.log(msg)
        let result = JSON.parse(response);
        if (result.status) {
          setLoadings({ ...loadings, trash: false });
          //redirect
          navigation.navigate("MessageScreen");
        } else {
          setLoadings({ ...loadings, trash: false });
          Alert.alert("Alert!", "Something went wrong");
          console.log(result);
          console.log("Something went wrong");
        }
      }
    );
  };

  const imagePicker = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      console.log(image);
    });
  };

  const renderChatList = ({ item }: any) => {
    // console.log("renderChatList",item)
    return (
      <InboxComponent
        onImagePress={() => {
          navigation.navigate("OthersProfile", {
            id: item?.sender?.id,
          });
        }}
        name={item?.sender?.name}
        image={item?.sender?.imageUrl}
        message={item?.message}
        time={item?.created_at}
        // time={moment(item?.created_at).format("h:mm a")}
        chatDate={item?.chatDate}
        attachments={item?.attachments}
        gif={item?.gif}
      />
    );
  };

  const renderFooter = () => {
    return (
      <>
        {typingChat && (
          <>
            <View style={{ ...appStyles.row, marginLeft: 10, gap: 10 }}>
              <View style={{ width: 62, height: 62 }}>
                <FastImage
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: scale(5),
                  }}
                  // source={{ uri: item?.user1?.imageUrl || item?.user2?.imageUrl }}

                  source={{
                    uri: item?.user1?.imageUrl || item?.user2?.imageUrl,
                    headers: { Authorization: "someAuthToken" },
                    priority: FastImage.priority.high,
                  }}
                  // source={image}
                />
              </View>
              <View>
                <View
                  style={{
                    ...appStyles.row,
                    marginTop: verticalScale(5),
                    marginBottom: -10,
                    width: "65%",
                  }}
                >
                  <CustomText
                    text={
                      (item?.user1?.name || item?.user2?.name)?.length > 17
                        ? `${(item?.user1?.name || item?.user2?.name).substring(
                            0,
                            16
                          )}...`
                        : item?.user1?.name || item?.user2?.name
                    }
                    color={colors.white}
                    size={15}
                    numberOfLines={1}
                    fontFam="Poppins-SemiBold"
                    fontWeight="700"
                  />
                  <View
                    style={{
                      width: scale(3.5),
                      height: scale(3.5),
                      backgroundColor: colors.white,
                      borderRadius: 999,
                      marginHorizontal: scale(8),
                      marginTop: verticalScale(2),
                    }}
                  />

                  <CustomText
                    text={moment(new Date()).format("h:mm a")}
                    color={colors.lightgray}
                    size={13}
                    style={{ marginTop: verticalScale(4) }}
                    fontFam="Poppins-Regular"
                  />
                </View>
                <LottieView
                  style={{ height: 55, width: 60 }}
                  source={require("../../../assets/json/typing.json")}
                  autoPlay
                  speed={1}
                />
              </View>
            </View>
            {/* <InboxComponent
      name={receiver?.name}
      image={receiver?.imageUrl}
      message={"Typing..."}
      time={moment().format("h:mm a")}
    /> */}
          </>
        )}
      </>
    );
  };

  const HeaderComponents = () => {
    return (
      <View style={styles.header}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            activeOpacity={0.6}
            style={{
              width: scale(27),
              height: scale(30),
              alignItems: "flex-start",
              justifyContent: "center",
              // backgroundColor:"red"
              // backgroundColor:"red"
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
            style={appStyles.row}
            activeOpacity={0.6}
            onPress={() => {
              // console.log("#Knkcndc",item)
              navigation.navigate("OthersProfile", {
                id: item?.user1?.id || item?.user2?.id,
              });
            }}
          >
            <FastImage
              style={{
                width: scale(37),
                height: scale(37),
                borderRadius: 999,
              }}
              source={{ uri: item?.user1?.imageUrl || item?.user2?.imageUrl }}
            />
            <View
              style={{
                marginHorizontal: scale(7),
                // backgroundColor:"red",
                // width:"55%"
                // paddingBottom: verticalScale(5),
              }}
            >
              <NewText
                color={colors.white}
                size={17}
                numberOfLines={1}
                // style={{ marginTop: verticalScale(5) }}
                text={
                  (item?.user1?.name || item?.user2?.name)?.length > 17
                    ? `${(item?.user1?.name || item?.user2?.name).substring(
                        0,
                        16
                      )}...`
                    : item?.user1?.name || item?.user2?.name
                }
              />
              <NewText
                color={colors.white}
                size={14}
                style={{ marginTop: verticalScale(-4) }}
                text={`${
                  !(
                    item?.user1?.followers_count || item?.user2?.followers_count
                  )
                    ? 0
                    : item?.user1?.followers_count ||
                      item?.user2?.followers_count
                } Followers`}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ ...appStyles.row }}>
          <View style={appStyles.row}>
            {loadings.archive ? (
              <View style={styles.icon}>
                <ActivityIndicator size={"small"} color={"#fff"} />
              </View>
            ) : (
              <TouchableOpacity style={styles.icon} onPress={handleArchive}>
                <Image
                  style={{
                    width: scale(22),
                    height: scale(22),
                    tintColor: colors.white,
                  }}
                  source={images.download}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            )}
            {/* {state.archive && (
            )} */}

            <Spacer width={scale(10)} />
            {loadings.block ? (
              <View style={styles.icon}>
                <ActivityIndicator size={"small"} color={"#fff"} />
              </View>
            ) : (
              <TouchableOpacity style={styles.icon} onPress={handleBlock}>
                <Image
                  style={{
                    width: scale(18),
                    height: scale(18),
                    tintColor: colors.white,
                  }}
                  source={images.block}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            )}
            <Spacer width={scale(10)} />
            {loadings.trash ? (
              <View style={styles.icon}>
                <ActivityIndicator size={"small"} color={"#fff"} />
              </View>
            ) : (
              <TouchableOpacity
                style={styles.icon}
                onPress={() => setIsDeleteVisible(true)}
              >
                <Image
                  style={{
                    width: scale(17),
                    height: scale(17),
                    tintColor: colors.white,
                  }}
                  source={images.trash}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            )}
          </View>

          {/* <CustomText color={"transparent"} size={18} text={"sss"} /> */}
        </View>
      </View>
    );
  };

  return (
    <View style={appStyles.main}>
      <StatusBar backgroundColor="#1D2029" barStyle="light-content" />
      <HeaderComponents />

      <View style={{ flex: 1 }}>
        <FlatList
          data={conversation}
          ref={flatListRefChat}
          keyExtractor={(item, index) => item.id}
          style={{
            marginBottom: 5,
          }}
          inverted={true}
          renderItem={renderChatList}
          onEndReached={refreshData}
          ListHeaderComponent={renderFooter}
          refreshControl={
            <RefreshControl
              colors={["#9Bd35A", "#689F38"]}
              refreshing={refreshing}
              onRefresh={() => {}}
            />
          }
        />
      </View>

      <MessageSender
        placeholder="write a message"
        message={"chat"}
        onGiphyPress={() => GiphyDialog.show()}
        giphy={giphy}
        setGiphy={setGiphy}
        setConversation={setConversation}
        conversation={conversation}
        receiverId={item?.user1?.id || item?.user2?.id}
        authId={userData.id}
        isGifView={isGifView}
        setIsGifView={setIsGifView}
      />
      <DeleteModal
        isModalVisible={isDeleteVisible}
        setModalVisible={setIsDeleteVisible}
        onDelete={() => {
          setIsDeleteVisible(false);
          handleTrash();
        }}
      />

      {/* </View> */}
      {/* </View> */}
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.black300,
    alignItems: "center",
    paddingTop: Platform.OS == "ios" ? "18%" : "2%",
    paddingBottom: "1%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: scale(15),
  },
  icon: {
    width: 35,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});
