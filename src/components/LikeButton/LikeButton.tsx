import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { scale, verticalScale } from "react-native-size-matters";
import { colors } from "../../utils/colors";
import CustomText from "../CustomText";
import { appStyles } from "../../utils/AppStyles";

const LikeButton = ({ likes_count, onPress, isLiked }: any) => {
  const [likes, setLikes] = useState(likes_count);
  const [liked, setLiked] = useState(isLiked);
  console.log("likes",likes)
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        if (liked) {
          setLiked(false);
          setLikes(likes - 1);
        } else {
          setLiked(true);
          setLikes(likes + 1);
        }
        onPress();
      }}
      style={{
        // paddingHorizontal: scale(10),
        // paddingVertical: verticalScale(2),
        position: "absolute",
        bottom: verticalScale(-5),
        left: scale(25),
        backgroundColor: colors.black300,
        alignItems: "center",
        width: 70,
        height: 32,
        justifyContent: "center",
        borderRadius: scale(20),
        borderWidth: 1,
        borderColor: colors.black,
      }}
    >
      <View style={{...appStyles.row,}}>
        <View style={{width:25,}}>
        <CustomText
        // color={liked?"#00AFF0":colors.grey300}
        size={13}
        fontFam="Inter-Medium"
        // style={{ width:30}}
        text={liked?"💙" :"🩶"}
      />
        </View>
     
         <CustomText
        color={colors.grey300}
        size={13}
        fontFam="Inter-Medium"
        // style={{ letterSpacing: 3 }}
        text={likes}
      />

      </View>
    
    </TouchableOpacity>
  );
};

export default LikeButton;

const styles = StyleSheet.create({});
