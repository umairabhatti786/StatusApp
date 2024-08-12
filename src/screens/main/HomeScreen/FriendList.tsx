import React, { useEffect, useState } from "react";
import {
  Alert,
  LogBox,
  StyleSheet,
  View,
  Text,
  Platform,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { colors } from "../../../utils/colors";
import CustomText from "../../../components/CustomText";
import { Spacer } from "../../../components/Spacer";
import { scale, verticalScale } from "react-native-size-matters";
import { appStyles } from "../../../utils/AppStyles";
import moment from "moment";
import NewText from "../../../components/NewText";
import {
  StatusUpdatesFormatTimeDifference,
  capitalizeFirstLetter,
  dateFormat,
  formatTimeDifference,
} from "../../../utils/CommonFun";
import FastImage from "react-native-fast-image";
export const windowWidth = Dimensions.get("window").width;
import { Pusher, PusherEvent } from "@pusher/pusher-websocket-react-native";
import { isPostViewed } from "../../../api/ApiServices";
import { StorageServices, TOKEN } from "../../../utils/hooks/StorageServices";
import constants from "../../../redux/constants";

const FriendList = ({
  item,
  onPress,
  disabled,
  channelId,
  setCounter,
  counter,
}: any) => {
  const [newPost, setNewPost] = useState(item?.channel?.last_post);
  const pusher = Pusher.getInstance();
  const [isViewed, setIsViewed] = useState(false);

  const checkIsViewed = async () => {
    let token = await StorageServices.getItem(TOKEN);
    isPostViewed(newPost?.id, token, async ({ isSuccess, response }: any) => {
      let result = JSON.parse(response);
      if (result.status) {
        setIsViewed(true);
      } else {
        setIsViewed(false);
      }
    });
  };

  useEffect(() => {
    setNewPost(item?.channel?.last_post);
  }, [item?.channel?.last_post]);
  useEffect(() => {
    checkIsViewed();
  }, [newPost]);

  useEffect(() => {
    pusher.init({
      apiKey: constants.PUSHER_APP_KEY,
      cluster: constants.PUSHER_APP_CLUSTER,
      // onConnectionStateChange,
    });

    pusher.connect();

    pusher.subscribe({
      channelName: "channelUpdates_" + channelId,
      onEvent: (event: PusherEvent) => {
        // console.log("channelUpdates_", JSON.parse(event.data).post);
        let post = JSON.parse(event.data).post;
        setNewPost(post);
      },
    });

    // Cleanup on unmount
    return () => {
      pusher.unsubscribe({ channelName: "channelUpdates_" + channelId });
      pusher.disconnect();
    };
  }, []);

  useEffect(() => {
    setCounter(counter + 1);
  }, [newPost]);

  return (
    <>
      <TouchableOpacity
        disabled={disabled ? true : false}
        onPress={onPress}
        style={{
          width: "100%",
          height: 90,
          borderRadius: 5,
          backgroundColor: "#1D2029",
          // padding: scale(6),
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              width: 90,
              height: 90,
              // marginLeft: scale(3),
            }}
          >
            <Image
              style={{
                width: "100%",
                height: "100%",
                overflow: "hidden",
              }}
              source={{ uri: item?.imageUrl }}
              resizeMode="cover"
            />
            {/* {item.update && (
            <View
              style={{
                width: verticalScale(10),
                height: verticalScale(10),
                backgroundColor: "#3AD079",
                position: "absolute",
                bottom: 7,
                right: 7,
                borderRadius: 999,
              }}
            ></View>
          )} */}
          </View>

          <View
            style={{
              paddingLeft: scale(15),
              width:
                newPost?.imageUrl || newPost?.gif ? scale(190) : scale(250),
              // backgroundColor:"red",
              paddingTop: verticalScale(13),
            }}
          >
            {/* size={15}
                fontFam="Poppins-Bold"
                fontWeight="800 */}

            <View style={{ ...appStyles.row, gap: 8, width: scale(160) }}>
              <CustomText
                text={capitalizeFirstLetter(item?.name)}
                color={colors.white}
                size={16}
                numberOfLines={1}
                style={{ marginTop: -5 }}
                fontFam="Inter-Bold"
                fontWeight="700"
              />

              {/* <View
                style={{
                  width: scale(3.5),
                  height: scale(3.5),
                  backgroundColor: colors.gray500,
                  borderRadius: 999,
                  marginBottom:2,
                
                }}
              /> */}

              {newPost ? (
                <View style={{ flexDirection: "row", gap: 2 }}>
                  <NewText
                    text={StatusUpdatesFormatTimeDifference(
                      newPost?.created_at
                    )}
                    color={colors.white}
                    size={12}
                    // style={{ marginTop: 1 }}
                    fontFam="Inter-Medium"
                    fontWeight="500"
                  />

                  <NewText
                    text={"ago"}
                    color={"#8A8A8A"}
                    size={12}
                    // style={{ marginTop: 1 }}
                    fontFam="Inter-Medium"
                    fontWeight="500"
                  />
                </View>
              ) : (
                <></>
              )}
            </View>

            {newPost != "null" ? (
              <CustomText
                text={newPost?.description}
                color={!isViewed ? colors.white : "#8A8A8A"}
                size={15}
                lineHeight={17}
                fontFam="Inter-Medium"
                numberOfLines={2}
                style={{ marginTop: 3 }}
                // fontFam="Poppins-Medium"
                fontWeight="600"
              />
            ) : (
              <></>
            )}
            {/* <View style={{ flexDirection: "row",alignItems:"center" }}>
              <View
                style={{
                  width: scale(7.5),
                  height: scale(7.5),
                  borderRadius: 999,
                  backgroundColor: !isViewed
                    ? colors.sky
                    : "transparent",
                  marginRight: verticalScale(5),
                }}
              />
            </View> */}
          </View>
        </View>

        {newPost?.imageUrl && (
          <View
            style={{
              alignItems: "flex-end",
              justifyContent: "space-between",
              paddingRight: 5,
              // paddingTop: 14,
              paddingBottom: verticalScale(5),
              position: "absolute",
              alignSelf: "center",
              right: scale(5),
              top: 22,

              // backgroundColor:"red"
            }}
          >
            <View style={{ width: 50, height: 50 }}>
              {newPost != "null" ? (
                <FastImage
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: scale(3),
                    overflow: "hidden",
                  }}
                  source={{
                    uri: newPost?.imageUrl,
                    headers: { Authorization: "someAuthToken" },
                    priority: FastImage.priority.high,
                  }}
                  // source={{ uri: item?.channel?.last_post?.imageUrl }}
                />
              ) : (
                <></>
              )}
            </View>
          </View>
        )}
        {newPost?.gif && (
          <View
            style={{
              alignItems: "flex-end",
              justifyContent: "space-between",
              paddingRight: 5,
              // paddingTop: 14,
              paddingBottom: verticalScale(5),
              position: "absolute",
              alignSelf: "center",
              right: scale(5),
              top: 22,

              // backgroundColor:"red"
            }}
          >
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: scale(5),
                overflow: "hidden",
              }}
            >
              {newPost?.gif ? (
                <Image
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: scale(5),
                  }}
                  source={{ uri: newPost.gif }}
                />
              ) : (
                <></>
              )}
            </View>
          </View>
        )}
      </TouchableOpacity>
    </>
  );
};

export default FriendList;
