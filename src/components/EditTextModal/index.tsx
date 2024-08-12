import { BlurView, VibrancyView } from "@react-native-community/blur";
import React, { useEffect, useRef } from "react";
import {
  ScrollView,
  Text,
  useWindowDimensions,
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Image,
  TextInput,
  ActivityIndicator,
  Keyboard,
  Linking,
} from "react-native";
import Modal from "react-native-modal";
import { scale, verticalScale } from "react-native-size-matters";
import CustomText from "../CustomText";
import { images } from "../../assets/images";
import { colors } from "../../utils/colors";
import { appStyles } from "../../utils/AppStyles";
import CustomLine from "../CustomLine";
import { Spacer } from "../Spacer";
import { windowHeight } from "../../utils/Dimensions";
import NewText from "../NewText";
import moment from "moment";
import Autolink from "react-native-autolink";

interface Props {
  isModalVisible?: boolean;
  setModalVisible?: any;
  children?: React.ReactNode;
  backdropStyle?: any;
  paddingTop?: any;
  justifyContent?: any;
  setActiveChat?: any;
  imageData?: any;
  createPost?: any;
  sendMessage?: any;
  setState?: any;
  state?: any;
  msg?: any;
  setMsg?: any;
  message?: any;
  setLoading?: any;
  loading?: any;
  editPostData?: any;
  setEditPostData?: any;
  onOpenGalleryForEdit?: any;
  imageForEdit?: any;
  setImageForEdit?: any;
}
const EditTextModal: React.FC<Props> = ({
  isModalVisible,
  setModalVisible,
  children,
  backdropStyle,
  justifyContent,
  paddingTop,
  setActiveChat,
  imageData,
  createPost,
  sendMessage,
  setState,
  state,
  msg,
  setMsg,
  message,
  setLoading,
  loading,
  editPostData,
  setEditPostData,
  onOpenGalleryForEdit,
  imageForEdit,
  setImageForEdit,
}) => {
  // console.log("imageData", imageData);
  const windowWidth = useWindowDimensions().width;
  const textInputRef = useRef(null);

  console.log("EditRechv");

  useEffect(() => {
    if (isModalVisible) {
      const timer = setTimeout(() => {
        if (textInputRef.current) {
          textInputRef.current.focus();
        }
      }, 300); // Adjust delay if necessary
      return () => clearTimeout(timer);
    }
  }, [isModalVisible]);

  const shortenedText =
    editPostData?.author?.name?.length > 30
      ? editPostData?.author?.name?.substring(0, 29)
      : editPostData?.author?.name;

  return (
    <Modal
      style={{
        ...styles.modalContainer,
        justifyContent: justifyContent || "flex-start",
      }}
      deviceWidth={windowWidth}
      isVisible={isModalVisible}
      onBackButtonPress={() => setModalVisible?.(false)}
      onBackdropPress={() => setModalVisible?.(false)}
      backdropColor="transparent"
      customBackdrop={
        <Pressable
          style={{
            height: "100%",
            width: "100%",
            backgroundColor: "transparent",
          }}
          onPress={() => {
            setModalVisible?.(false);
          }}
        ></Pressable>
      }
    >
      <View
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: `rgba(0, 0, 0, 0.6)`, // Apply opacity to the background color
          opacity: 0.9,
        }}
      />
      <Pressable
        onPress={() => {
          Keyboard.dismiss();
        }}
        style={{
          width: "101%",
          height: "100%",
          backgroundColor: "transparent",
          borderTopLeftRadius: scale(20),
          borderTopRightRadius: scale(20),
          overflow: "hidden",
          justifyContent: "flex-end",

          borderRightWidth: 1,
          borderColor: "#8A8A8A",
        }}
      >
          <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => {
            setImageForEdit("");
            setModalVisible(false);
          }}
          style={{
            width: 35,
            height: 35,
            backgroundColor: colors.gray200,
            position: "absolute",
            top: 0,
            left: 0,
            margin: 20,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 999,
            padding: 5,
          }}
        >
          <Image style={{ width: 13, height: 13 }} source={images.crossicon} />
        </TouchableOpacity>
        <View
          style={{
            // marginHorizontal: scale(15),
            marginVertical: verticalScale(50),
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
          </View>

          {editPostData?.text && (
            <NewText
              fontFam="Inter-Medium"
              style={styles.descripationText}
              text={editPostData?.text}
            />
            // <Autolink
            //   text={editPostData?.description}
            //   onPress={(url) => Linking.openURL(url)}
            //   style={styles.descripationText}
            //   linkStyle={styles.descripationLinkText}
            // />
          )}

          <View
            style={{
              ...appStyles.row,
              alignSelf: "flex-end",
              marginRight: 10,
              marginBottom: 5,
              height: 20,
            }}
          >
            {/* {item?.imageUrl && (
                        )} */}
            <View style={appStyles.row}>
              <Image
                style={{
                  width: 17,
                  height: 17,
                  tintColor: colors.grey300,
                }}
                source={images.eye}
              />
              <Spacer width={4} />
              <NewText
                color={colors.grey300}
                size={13}
                fontFam="Inter-Medium"
                style={{
                  marginRight: scale(5),
                  textAlign: "right",
                }}
                text={editPostData?.views_count}
              />
              <Spacer width={5} />
              <NewText
                color={colors.grey300}
                size={13}
                // fontFam="Inter-Medium"
                style={{
                  textAlign: "right",
                  marginTop: 1,
                }}
                text={moment(editPostData?.created_at).format("h:mm A")}
              />
            </View>
          </View>
        </View>

      

        <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              bottom: verticalScale(40),
              paddingHorizontal: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderRadius: scale(20),
                backgroundColor: colors.black,
                paddingHorizontal: scale(5),
                maxHeight: 130,
                width: "82%",
                alignSelf: "center",
              }}
            >
            <TextInput
              value={editPostData?.description}
              multiline={true}
              autoFocus={false}
              ref={textInputRef}
              onChangeText={(text) =>
                setEditPostData({ ...editPostData, description: text })
              }
              style={{
                marginLeft: 12,
                color: colors.white,
                paddingRight: 5,
                width: "90%",
                fontSize: 19,
              }}
              placeholderTextColor={colors.gray200}
              placeholder={"Write a message"}
            />
          </View>
          {loading ? (
            <ActivityIndicator size={"small"} color={colors.white} />
          ) : (
            <TouchableOpacity
              onPress={() => {
                if (editPostData?.description) {
                  createPost();
                }
              }}
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
                style={{ width: scale(25), height: scale(25), marginLeft: 8 }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    margin: 0,
    backgroundColor: "transparent",
  },
  imgContainer: {
    width: scale(25),
    height: scale(30),
    alignItems: "center",
    justifyContent: "center",
  },

  descripationText: {
    fontSize: 14,
    marginTop: verticalScale(8),
    marginHorizontal: scale(10),
    fontFamily: "Inter-Medium",
    color: colors.white,
  },
  descripationLinkText: {
    fontSize: 14,
    marginTop: verticalScale(8),
    marginHorizontal: scale(10),
    fontFamily: "Inter-Medium",
    color: colors.sky,
    textDecorationLine: "underline",
    lineHeight: 22,
  },
});

export default EditTextModal;
