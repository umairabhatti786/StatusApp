import {
  Alert,
  Image,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import CustomText from "../CustomText";
import { appStyles } from "../../utils/AppStyles";
import { scale, verticalScale } from "react-native-size-matters";
import { images } from "../../assets/images";
import { windowWidth } from "../../utils/Dimensions";
import { colors } from "../../utils/colors";
import { Spacer } from "../Spacer";
import {
  AUTH,
  StorageServices,
  TOKEN,
} from "../../utils/hooks/StorageServices";
import {
  CreatePost,
  SendMessage,
  StartTypingChannel,
  UpdatePost,
} from "../../api/ApiServices";
import { usePermissions } from "../../utils/Permissions";
import ImagePicker from "react-native-image-crop-picker";
import { openSettings } from "react-native-permissions";
import { useNavigation } from "@react-navigation/native";
import ImageUploaderModal from "../ImageUploaderModal";
import EditImageUploaderModal from "../EditImageUploaderModal";
import GifUploaderModal from "../GifUploaderModal";
import EditTextModal from "../EditTextModal";

type Props = {
  name?: string;
  image?: any;
  time?: string;
  message?: string;
  chatDate?: string;
  comments?: boolean;
  profile?: boolean;
  edit?: boolean;
  newChat?: boolean;
  onEdit?: () => void;
  placeholder?: string;
  bottom?: any;
  sendImage?: any;
  channelId?: any;
  token?: any;
  setAuthPosts?: any;
  authPosts?: any;
  setConversation?: any;
  conversation?: any;
  receiverId?: any;
  receiver?: any;
  authId?: any;
  giphy?: any;
  setGiphy?: any;
  notShow?: boolean;
  onGiphyPress?: () => void;
  isEditView?: any;
  setIsEditView?: any;
  imageForEdit?: any;
  setImageForEdit?: any;
  postId?: any;
  counter?: any;
  setCounter?: any;
  flatListRefChat?: any;
  flatListRefPosts?: any;
  editPostData?: any;
  setEditPostData?: any;
  isGifView?: any;
  setIsGifView?: any;
  setIsEditTextView?:any
  isEditTextView?:any
};

const MessageSender = ({
  placeholder,
  bottom,
  sendImage,
  channelId,
  token,
  setAuthPosts,
  authPosts,
  message,
  setConversation,
  conversation,
  receiverId,
  receiver,
  authId,
  notShow,
  newChat,
  onGiphyPress,
  giphy,
  setGiphy,
  isEditView,
  setIsEditView,
  setIsEditTextView,
  isEditTextView,
  imageForEdit,
  setImageForEdit,
  postId,
  counter,
  setCounter,
  flatListRefChat,
  flatListRefPosts,
  editPostData,
  setEditPostData,
  isGifView,
  setIsGifView,
}: Props) => {
  // console.log("ckndkcnd",giphy)
  const navigation: any = useNavigation();
  const [isImageUplaod, setIsImageUplaod] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageData, setImageData] = useState({});

  const [state, setState] = useState({
    description: "",
    imageUrl: "",
    channelId: channelId,
  });
  const [msg, setMsg] = useState({
    message: "",
    senderId: authId,
    receiverId: receiverId,
    attachment: "",
  });
  const { requestGalleryPermission } = usePermissions();

  useEffect(() => {
    if (isEditView) {
      // onOpenGalleryForEdit();
    }
  }, [isEditView]);

  const onOpenGalleryForEdit = async () => {
    // console.log("ISpucvibdv", isPicture);
    // setImageForEdit(true);
    let gallerypermission = await requestGalleryPermission();
    if (gallerypermission == "granted" || gallerypermission == "limited") {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        mediaType: "photo",
        forceJpg: true,
      }).then(async (result) => {
        if (result) {
          const fileName = result?.path?.split("/").pop();
          let data = {
            ...result,
            fileName: fileName,
            name: fileName,
            size: result?.size,
            height: result?.height,
            type: result?.mime,
            uri: result?.path,
            width: result?.width,
          };

          if (isEditView) {
            setImageForEdit(data);
          }

          // setTimeout(() => {
          //   setIsImageUplaod(true);
          // }, 500);
          // console.log(data);
        }
      });
    } else {
      if (gallerypermission == "blocked") {
        if (Platform.OS == "ios") {
          openSettings();
        } else {
          Linking.openSettings();
        }
      }
    }
  };

  const onOpenGallery = async () => {
    // console.log("ISpucvibdv", isPicture);
    setIsImageUplaod(true);
    let gallerypermission = await requestGalleryPermission();
    if (gallerypermission == "granted" || gallerypermission == "limited") {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        mediaType: "photo",
        forceJpg: true,
      }).then(async (result) => {
        if (result) {
          const fileName = result?.path?.split("/").pop();
          let data = {
            ...result,
            fileName: fileName,
            name: fileName,
            size: result?.size,
            height: result?.height,
            type: result?.mime,
            uri: result?.path,
            width: result?.width,
          };
          message
            ? setMsg({ ...msg, attachment: data })
            : setState({ ...state, imageUrl: data });
          setImageData(data);

          if (isEditView) {
            setImageForEdit(data);
          }

          // setTimeout(() => {
          //   setIsImageUplaod(true);
          // }, 500);
          // console.log(data);
        }
      });
    } else {
      if (gallerypermission == "blocked") {
        if (Platform.OS == "ios") {
          openSettings();
        } else {
          Linking.openSettings();
        }
      }
    }
  };

  const EditPost = async () => {
    let form = new FormData();
    form.append("description", editPostData?.description);
    form.append("id", postId);
    if (imageForEdit) {
      form.append("imageUrl", imageForEdit);
    }
    setState({ description: "", imageUrl: "", channelId: channelId });
    setLoading(true);

    console.log(form);
    UpdatePost(form, token, async ({ isSuccess, response }: any) => {

      let result = JSON.parse(response);
      if (result.status) {
        console.log(result);
        setCounter(counter + 1);
        setIsEditView(false);
        setIsEditTextView(false)
        setImageForEdit("");
        setLoading(false);

        // setAuthPosts([...authPosts, result?.post]);
        // setComments([...comments, result.comment]);
        // setLoading2(false);
      } else {
        setLoading(false);
        // Alert.alert("Alert!", "Something went wrong");
        console.log("Something went wrong", result);
      }
    });
  };
  const createPost = async () => {
    if (state.description.length > 0 || isImageUplaod || isGifView) {
      let form = new FormData();
      form.append("description", state.description);
      form.append("channelId", state.channelId);
      if (state.imageUrl) {
        form.append("imageUrl", state.imageUrl);
      }
      // form.append("gif", 'giphy');
      if (giphy) {
        form.append("gif", giphy);
      }
      setState({ description: "", imageUrl: "", channelId: channelId });
      setLoading(true);
      setIsGifView(false);

      console.log(form);
      CreatePost(form, token, async ({ isSuccess, response }: any) => {

        let result = JSON.parse(response);
        if (result.status) {
          console.log(result);
          if (giphy) {
            setGiphy("");
          }
          setIsImageUplaod(false);
          setImageData({});
          let data = [result?.post, ...authPosts];
          setAuthPosts(data);
          setLoading(false);
          setTimeout(() => {
            flatListRefPosts?.current?.scrollToEnd({ animated: true });
          }, 500);
        } else {
          setLoading(false);
          console.log("Something went wrong", result);
        }
      });
    }
  };

  // console.log(state,token);

  const sendMessage = async () => {
    if (msg.message.length > 0 || isImageUplaod || isGifView) {
    
    let token = await StorageServices.getItem(TOKEN);
    let form = new FormData();
    form.append("senderId", msg.senderId);
    form.append("receiverId", msg.receiverId);
    if (msg.message) {
      form.append("message", msg.message);
    }
    if (msg.attachment) {
      form.append("attachment", msg.attachment);
    }
    if (giphy) {
      form.append("gif", giphy);
    }
    setMsg({ ...msg, message: "", attachment: "" });
    setLoading(true);
    if (giphy) {
      setGiphy("");
    }
    if(!newChat){
      setIsGifView(false);
    }
    SendMessage(form, token, async ({ isSuccess, response }: any) => {
      let result = JSON.parse(response);
      if (result.status) {
        console.log(result);
        setIsImageUplaod(false);
        setImageData({});
        setLoading(false);

        // console.log('result?.posts',result?.posts?.data)
        if (newChat) {
          // navigation.navigate('MessageScreen');
          navigation.navigate("MessageScreen", {
            item: receiver,
          });
        }
        if (result?.message?.senderId == msg.senderId) {
          let data = [result?.message, ...conversation];
          // data.unshift(result?.message);
          setConversation(data);

          setTimeout(() => {
            flatListRefChat?.current?.scrollToEnd({ animated: true });
          }, 500);
        }

        // setConversation([...conversation,result?.message]);
      } else {
        setMsg({ ...msg, message: "", attachment: "" });
        setLoading(false);
        console.log(result);
        // Alert.alert("Alert!", "Something went wrong",);
        console.log("Something went wrong");
      }
    });
    // SendMessage()
    }
  };

  const StartTyping = async () => {
    let token = await StorageServices.getItem(TOKEN);
    let body = { user1Id: authId, user2Id: receiverId };
    console.log(body)
    StartTypingChannel(body, token, async ({ isSuccess, response }: any) => {
      console.log(response);
    });
  };
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: "#8A8A8A",
        width: windowWidth,
        backgroundColor: colors.primary,
        paddingVertical: verticalScale(10),
        paddingHorizontal: scale(10),
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderRadius: scale(20),
          backgroundColor: colors.black,
          paddingHorizontal: scale(5),
          paddingVertical: verticalScale(3),
          width: "82%",
          alignSelf: "center",
          maxHeight:130,
        }}
      >
        <TextInput
          value={message ? msg.message : state.description}
          multiline={true}
          onChangeText={(text) => {
            message
              ? setMsg({ ...msg, message: text })
              : setState({ ...state, description: text });

            StartTyping();
          }}
          style={{
            marginLeft: 12,
            color: colors.white,
          
            paddingRight: 5,
            width: notShow ? "90%" : "75%",
            lineHeight:23,
            fontSize: 17,
          }}
          placeholderTextColor={colors.gray200}
          placeholder={placeholder || "Write an update"}
        />
        {notShow ? (
          <></>
        ) : (
          <>
            <TouchableOpacity activeOpacity={0.6} onPress={onGiphyPress}>
              <Image
                source={images.uploadGiphy}
                style={{ width: scale(20), height: scale(20) }}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Spacer width={scale(10)} />
          </>
        )}

        {notShow ? (
          <></>
        ) : (
          <>
            <TouchableOpacity activeOpacity={0.6} onPress={onOpenGallery}>
              <Image
                source={images.attach}
                style={{ width: scale(20), height: scale(20) }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </>
        )}
      </View>

      <TouchableOpacity
        onPress={message ? sendMessage : createPost}
        activeOpacity={0.6}
        style={{
          width: scale(45),
          height: scale(45),
          borderRadius: scale(45),
          backgroundColor: colors.sky,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={images.simplesend}
          style={{ width: scale(25), height: scale(25), marginLeft: 9 }}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <ImageUploaderModal
        isModalVisible={isImageUplaod}
        imageData={imageData}
        sendMessage={sendMessage}
        createPost={createPost}
        setState={setState}
        state={state}
        msg={msg}
        setMsg={setMsg}
        message={message}
        setLoading={setLoading}
        loading={loading}
        // setActiveChat={setActiveChat}
        setModalVisible={setIsImageUplaod}
      />
      <EditImageUploaderModal
        isModalVisible={isEditView}
        setModalVisible={setIsEditView}
        imageData={imageForEdit}
        sendMessage={sendMessage}
        createPost={EditPost}
        setState={setState}
        state={state}
        msg={msg}
        setMsg={setMsg}
        message={message}
        setLoading={setLoading}
        loading={loading}
        editPostData={editPostData}
        setEditPostData={setEditPostData}
        onOpenGalleryForEdit={onOpenGalleryForEdit}
        imageForEdit={imageForEdit}
        setImageForEdit={setImageForEdit}
        // setActiveChat={setActiveChat}
      />

<EditTextModal
        isModalVisible={isEditTextView}
        setModalVisible={setIsEditTextView}
        imageData={imageForEdit}
        sendMessage={sendMessage}
        createPost={EditPost}
        setState={setState}
        state={state}
        msg={msg}
        setMsg={setMsg}
        message={message}
        setLoading={setLoading}
        loading={loading}
        editPostData={editPostData}
        setEditPostData={setEditPostData}
        onOpenGalleryForEdit={onOpenGalleryForEdit}
        imageForEdit={imageForEdit}
        setImageForEdit={setImageForEdit}
        // setActiveChat={setActiveChat}
      />
      <GifUploaderModal
        isModalVisible={isGifView}
        setModalVisible={setIsGifView}
        giphy={giphy}
        setGiphy={setGiphy}
        imageData={imageData}
        sendMessage={sendMessage}
        createPost={createPost}
        setState={setState}
        state={state}
        msg={msg}
        setMsg={setMsg}
        message={message}
        setLoading={setLoading}
        loading={loading}
        // setActiveChat={setActiveChat}
      />
    </View>
  );
};

export default MessageSender;

const styles = StyleSheet.create({});
