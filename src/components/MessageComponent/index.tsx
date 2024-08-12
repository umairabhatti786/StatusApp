import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import CustomText from "../CustomText";
import { colors } from "../../utils/colors";
import { windowWidth } from "../../utils/Dimensions";
import { appStyles } from "../../utils/AppStyles";
import { scale, verticalScale } from "react-native-size-matters";
import moment from "moment";
import FastImage from "react-native-fast-image";
import { formatChannelDate, formatTimeDifference } from "../../utils/CommonFun";

type Props = {
  name?: string;
  image?: any;
  time?: string;
  message?: string;
  chatDate?: string;
  comments?: boolean;
  profile?: boolean;
  edit?: boolean;
  onEdit?: () => void;
  onDelete: any;
  onPress?: () => void;
};

const MessagesComponent = ({
  name,
  image,
  time,
  message,
  chatDate,
  comments,
  profile,
  edit,
  onEdit,
  onDelete,
  onPress,
}: Props) => {
  let nameData = "umair abbas bhatti 719 @gmail.com";
  const shortenedName = name?.length > 20 ? name?.substring(0, 21) : name;

  return (
    <View>
      {chatDate && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "center",
            marginBottom: verticalScale(10),
          }}
        >
          <View
            style={{
              width: "35%",
              backgroundColor: "#2F3541",
              height: 1,
            }}
          />
          <CustomText
            style={{ marginHorizontal: scale(10) }}
            text={chatDate}
            color={colors.lightgray}
            size={13}
            fontFam="Poppins-Bold"
            fontWeight="700"
          />
          <View
            style={{
              width: "35%",
              height: 1,
              backgroundColor: "#2F3541",
            }}
          />
        </View>
      )}
      <View
        style={{
          flexDirection: "row",
          // paddingVertical: verticalScale(8),
          paddingHorizontal: 10,
          backgroundColor: comments ? colors.black300 : colors.black,
          borderRadius: 12,
          paddingVertical: verticalScale(8),
        }}
      >
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={onPress}
          style={{ width: 62, height: 62 }}
        >
          <FastImage
            style={{ width: "100%", height: "100%", borderRadius: scale(5) }}
            source={{ uri: image }}
          />
        </TouchableOpacity>
        <View style={{ marginLeft: scale(12) }}>
          <View
            style={{
              flexDirection: "row",
              // alignItems: "center",
              justifyContent: "space-between",
              width: scale(190), // backgroundColor:"red"
            }}
          >
            <View
              style={{
                ...appStyles.row,
                marginTop: verticalScale(-10),
                width: "95%",
                gap: 7,
              }}
            >
              {/* const shortenedText =
              item?.author?.name?.length > 30
                ? item?.author?.name?.substring(0, 29)
                : item?.author?.name; */}

              <CustomText
                text={shortenedName}
                color={colors.gray500}
                size={16}
                fontFam="Poppins-SemiBold"
                fontWeight="700"
                numberOfLines={1}
              />
              <View
                style={{
                  width: scale(3.5),
                  height: scale(3.5),
                  backgroundColor: colors.gray500,
                  borderRadius: 999,
                  // marginBottom:2,
                  // marginHorizontal: scale(4),
                  marginTop: verticalScale(4),
                }}
              />

              <CustomText
                text={formatTimeDifference(time)}
                color={colors.gray500}
                size={13}
                style={{ marginTop: verticalScale(7) }}
                fontFam="Poppins-Regular"
              />
            </View>
          </View>
          <CustomText
            text={message}
            color={colors.white}
            size={15}
            lineHeight={17}
            style={{ width: windowWidth / 1.8, marginTop: verticalScale(2) }}
            fontFam="Inter-Medium"
            fontWeight={"600"}
          />
        </View>
        {onDelete ? (
          <TouchableOpacity
            onPress={onDelete}
            style={{
              width: scale(70),
              // height: verticalScale(60),
              paddingTop: 3,
              alignItems: "flex-end",
              justifyContent: "space-between",
              marginRight: scale(5),
              alignSelf: "flex-end",
              position: "absolute",
              // backgroundColor:"red",
              right: scale(10),
              bottom: 0,

              // paddingBottom: 5,
              // backgroundColor:"red"
            }}
          >
            <CustomText
              text={"Delete"}
              color={colors.grey300}
              size={13}
              fontFam="Poppins-Regular"
            />
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </View>
    </View>
  );
};

export default MessagesComponent;

const styles = StyleSheet.create({});
