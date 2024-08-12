import {
  Alert,
  FlatList,
  Image,
  ImageBackground,
  Linking,
  RefreshControl,
  SafeAreaView,
  ScrollView,
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
import AutoLink from "react-native-autolink";

import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { windowHeight, windowWidth } from "../../../utils/Dimensions";
import CustomButton from "../../../components/CustomButton";
import { scale, verticalScale } from "react-native-size-matters";
import { Spacer } from "../../../components/Spacer";
import MessageSender from "../../../components/MessageSender";
import moment, { now } from "moment";
import {
  AUTH,
  StorageServices,
  TOKEN,
} from "../../../utils/hooks/StorageServices";
import FastImage from "react-native-fast-image";
import NewText from "../../../components/NewText";
import ImageViewModal from "../../../components/ImageViewModal";
import { AddRemoveLikes, DeletePost } from "../../../api/ApiServices";
import LikeButton from "../../../components/LikeButton/LikeButton";
import { formatChannelDate } from "../../../utils/CommonFun";

const Channel = ({
  hideSendMessage,
  userData,
  posts,
  channelId,
  token,
  authPosts,
  setAuthPosts,
  counter,
  setCounter,
  isEditView,
  setIsEditView,
  setIsEditTextView,
  isEditTextView,
  imageForEdit,
  setImageForEdit,
  setPostId,
  isActiveProfile,
  flatListRefPosts,
  flatListRefOtherPosts,
  isKeyboardVisible,
  editPostData,
  setEditPostData,
  mainFlex,
  mainMargin,
  refreshOtherData,
  refreshAuthData,
  disableEditAndDelete,
}: any) => {
  const route: any = useRoute();
  // const item = route?.params?.item;
  const navigation: any = useNavigation();
  const [isViewImage, setIsViewImage] = useState(false);

  const [scroll, setScroll] = useState(false);
  const isFocused = useIsFocused();
  const [imageObject, setImageObject] = useState({});
  const [isSideBar, setIsBar] = useState(false);
  const [isFollow, setIsFollow] = useState(false);
  const [isBlockModal, setIsBlockModal] = useState(false);
  const [isReportModal, setIsReportModal] = useState(false);
  const [isUnfollowModal, setIsUnfollowModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  console.log("userData", userData?.wallpaperUrl);
  // const handleLike=async()=>{
  //   let data = {user_id:userData.id,post_id:item.id}
  //   console.log(item.id)
  //   // AddRemoveLikes()
  // }
  // useEffect(() => {
  //   let data = hideSendMessage ? posts : authPosts
  //   if (data.length > 0 && flatListRef.current) {
  //     flatListRef.current.scrollToEnd({ animated: true });
  //   }
  // }, [hideSendMessage ? posts : authPosts,]);

  // useEffect(() => {
  //   let data = hideSendMessage ? posts : authPosts
  //   if (data.length > 0 && flatListRef.current) {
  //     flatListRef.current.scrollToEnd({ animated: true });
  //   }
  // }, [isActiveProfile]);

  return (
    <>
      <View style={{ backgroundColor: colors.black, flex: 1 }}>
        <FastImage
          style={{ width: "100%", height: windowHeight, position: "absolute" }}
          source={{
            uri: userData?.wallpaperUrl ? userData?.wallpaperUrl : null,
            headers: { Authorization: "someAuthToken" },
            priority: FastImage.priority.high,
          }}
          // source={userData?.wallpaperUrl ? { uri: userData?.wallpaperUrl } : ""}
        />

        <FlatList
          data={hideSendMessage ? posts : authPosts}
          nestedScrollEnabled={true}
          ref={hideSendMessage ? flatListRefOtherPosts : flatListRefPosts}
          keyExtractor={(item) => item}
          style={{ marginBottom: 5 }}
          inverted={true}
          onEndReached={() => {
            // setRefreshing(true)
            // console.log('nextUrl',nextUrl)

            if (hideSendMessage) {
              refreshOtherData(setRefreshing);
            } else {
              refreshAuthData(setRefreshing);
            }
          }}
          refreshControl={
            <RefreshControl
              colors={["#9Bd35A", "#689F38"]}
              refreshing={refreshing}
              onRefresh={() => {}}
            />
          }
          //  contentContainerStyle={{
          //    flex:5
          //  }}
          // ListEmptyComponent={() => {
          //   return (
          //     <View
          //       style={{
          //         height: windowHeight / 1.5,
          //         alignItems: "center",
          //         justifyContent: "center",
          //         width: "60%",
          //         alignSelf: "center",
          //       }}
          //     >
          //       <NewText
          //         color={colors.gray500}
          //         size={17}
          //         fontFam="Inter-Medium"
          //         lineHeight={26}
          //         style={{ textAlign: "center" }}
          //         text={"This user has not posted any updates yet."}
          //       />
          //     </View>
          //   );
          // }}
          renderItem={({ item, index }) => {
            const currentDate = moment();
            const createdAtDate = moment(item?.created_at);
            const shortenedText =
              item?.author?.name?.length > 30
                ? item?.author?.name?.substring(0, 29)
                : item?.author?.name;

            return (
              <View style={{ paddingBottom: verticalScale(10) }}>
                <Spacer height={verticalScale(30)} />
                <View style={styles.timeContainer}>
                  <CustomText
                    color={colors.grey300}
                    size={15}
                    text={formatChannelDate(createdAtDate)}
                    // fontFam="Inter-SemiBold"
                    //  style={{ marginLeft: scale(8),backgroundColor:colors.primary }}
                    // text={moment(item?.created_at).format("dddd hh:mm A")}
                  />
                </View>
                <View
                  style={{
                    // marginHorizontal: scale(15),
                    marginVertical: verticalScale(10),
                    // height:windowHeight/1.5,
                    // height:"50%",
                    backgroundColor: colors.black300,
                    borderRadius: scale(10),
                    width: "90%",
                    alignSelf: "center",
                    overflow: "hidden",
                    // paddingVertical: verticalScale(8),
                    // paddingHorizontal: scale(5),
                  }}
                >
                  <View
                    style={{
                      paddingHorizontal: 10,
                      paddingVertical: 2,
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <NewText
                      color={colors.gray500}
                      size={16}
                      fontFam="Inter-Medium"
                      // style={{ marginBottom: verticalScale(8) }}
                      text={shortenedText}
                      numberOfLines={1}
                    />
                    {!disableEditAndDelete && (
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        {/* {!item?.gif && ( */}
                        <TouchableOpacity
                          onPress={() => {
                            setEditPostData({
                              ...item,
                              description: item?.description,
                              imageUrl: item?.imageUrl,
                              gif: item?.gif,
                              text:item?.description,
                            });
                            setPostId(item.id);

                            if (item?.imageUrl || item?.gif) {
                              setIsEditView(true);
                            } else {
                              setIsEditTextView(true);
                            }

                            // console.log("Gibdbd",item?.gif.le)
                            // if(!item?.imageUrl ){
                            //   setIsEditTextView(true)

                            // }
                            // else if(!item?.gif){
                            //   setIsEditTextView(true)

                            // }
                            // else {

                            // }
                          }}
                        >
                          <NewText
                            color={colors.gray500}
                            size={16}
                            fontFam="Inter-Medium"
                            text={"Edit"}
                          />
                        </TouchableOpacity>
                        {/* )} */}
                        <Spacer width={10} />
                        <TouchableOpacity
                          onPress={() => {
                            Alert.alert(
                              "Delete Post",
                              "Are you sure!", // <- this part is optional, you can pass an empty string
                              [
                                {
                                  text: "Cancel",
                                  onPress: () => console.log("Cancel Pressed"),
                                  style: "cancel",
                                },
                                {
                                  text: "Delete",
                                  onPress: async () => {
                                    let token = await StorageServices.getItem(
                                      TOKEN
                                    );
                                    DeletePost(
                                      item.id,
                                      token,
                                      async ({ isSuccess, response }: any) => {
                                        let result = JSON.parse(response);
                                        if (result.status) {
                                          setCounter(counter + 1);
                                        } else {
                                          console.log(result);
                                          // Alert.alert("Alert!", "Something went wrong",);
                                          console.log("Something went wrong");
                                        }
                                      }
                                    );
                                  },
                                },
                              ],
                              { cancelable: false }
                            );
                          }}
                        >
                          <NewText
                            color={colors.gray500}
                            size={16}
                            fontFam="Inter-Medium"
                            // style={{ marginBottom: verticalScale(8) }}
                            text={"Delete"}
                          />
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>

                  {item?.imageUrl ? (
                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={() => {
                        setImageObject({
                          uri: item?.imageUrl,
                          name: item?.title,
                          description: item?.description,
                          time: item?.created_at,
                        });
                        setIsViewImage(true);
                      }}
                      style={{
                        width: "100%",
                        height: verticalScale(340),
                        borderRadius: scale(10),
                      }}
                    >
                      <FastImage
                        style={{
                          width: "100%",
                          height: verticalScale(340),
                          borderRadius: scale(10),
                        }}
                        // source={{ uri: item?.imageUrl }}
                        source={{
                          uri: item?.imageUrl,
                          headers: { Authorization: "AuthToken" },
                          priority: FastImage.priority.high,
                        }}
                      />
                    </TouchableOpacity>
                  ) : (
                    <></>
                  )}
                  {item?.gif ? (
                    <View>
                      <Image
                        style={{ width: "100%", height: verticalScale(300) }}
                        source={{ uri: item?.gif }}
                      />

                      <View
                        style={{ position: "absolute", right: 8, bottom: 0 }}
                      >
                        <Image
                          style={{
                            width: 110,
                            height: 35,
                            alignSelf: "flex-end",
                          }}
                          source={images.giphy}
                          resizeMode="contain"
                        />
                      </View>
                    </View>
                  ) : (
                    <></>
                  )}
                  {item?.description && (
                    <AutoLink
                      text={item?.description}
                      onPress={(url) => Linking.openURL(url)}
                      style={styles.descripationText}
                      linkStyle={styles.descripationLinkText}
                    />
                  )}

                  <View
                    style={{
                  flexDirection:"row",
                      alignSelf: "flex-end",
                      marginRight: 10,
                      marginBottom: 1,
                      height: 20,
                      // backgroundColor:"red"
                    }}
                  >
                    {/* {item?.imageUrl && (
                        )} */}
                    <View style={{flexDirection:"row"}}>
                      <Image
                        style={{
                          width: 17,
                          height: 17,
                          tintColor: colors.grey300,
                          marginTop:3
                        }}
                        source={images.eye}
                        resizeMode="contain"
                      />
                      <Spacer width={4} />
                      <NewText
                        color={colors.grey300}
                        size={13}
                        fontFam="Inter-Medium"
                        style={{
                          marginRight: scale(5),
                          // textAlign: "right",
                          alignSelf:"flex-end"

                          // marginTop:2

                        }}
                        text={item?.views_count}
                      />
                      <Spacer width={5} />
                      <NewText
                        color={colors.grey300}
                        size={13}
                        // fontFam="Inter-Medium"
                        style={{
                          // textAlign: "right",
                          alignSelf:"flex-end",

                          marginTop: 2,
                        }}
                        text={moment(item?.created_at).format("h:mm A")}
                      />
                    </View>
                  </View>
                </View>
                <LikeButton
                  isLiked={item?.likes?.length ? true : false}
                  likes_count={item?.likes_count}
                  onPress={async () => {
                    let user = await StorageServices.getItem(AUTH);
                    let token = await StorageServices.getItem(TOKEN);
                    let data = { user_id: user.id, post_id: item.id };
                    console.log(data, token);
                    AddRemoveLikes(
                      data,
                      token,
                      async ({ isSuccess, response }: any) => {
                        console.log("data l", isSuccess);

                        let result = JSON.parse(response);
                        if (result.status) {
                          setCounter(counter + 1);
                        } else {
                          console.log(result);
                          // Alert.alert("Alert!", "Something went wrong",);
                          console.log("Something went wrong");
                        }
                      }
                    );
                  }}
                />
              </View>
            );
          }}
        />
        {/* </ImageBackground> */}
      </View>

      <ImageViewModal
        isModalVisible={isViewImage}
        imageObject={imageObject}
        // imageData={imageData}

        // sendMessage={sendMessage}
        // createPost={createPost}
        // setState={setState}
        // state={state}
        // msg={msg}
        // setMsg={setMsg}
        // message={message}
        // setLoading={setLoading}
        // loading={loading}
        // // setActiveChat={setActiveChat}
        setModalVisible={setIsViewImage}
      />
    </>
  );
};

export default Channel;

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
  timeContainer: {
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: scale(13),
    paddingVertical: verticalScale(2),
    alignSelf: "center",
    borderRadius: scale(20),
    flexDirection: "row",
    gap: 5,
  },
  descripationText: {
    fontSize: 17,
    marginTop: verticalScale(8),
    marginHorizontal: scale(10),
    fontFamily: "Inter-Regular",
    color: colors.white,
    lineHeight: 24,

  },
  descripationLinkText: {
    fontSize: 17,
    marginTop: verticalScale(8),
    marginHorizontal: scale(10),
    fontFamily: "Inter-Regular",
    color: colors.sky,
    textDecorationLine: "underline",
    lineHeight: 24,
  },
});
