import { BlurView, VibrancyView } from "@react-native-community/blur";
import React, { useEffect, useRef, useState } from "react";
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
  Animated,
  Dimensions,
} from "react-native";
import Modal from "react-native-modal";
import { scale, verticalScale } from "react-native-size-matters";
import CustomText from "../CustomText";
import { images } from "../../assets/images";
import { colors } from "../../utils/colors";
import { appStyles } from "../../utils/AppStyles";
import CustomLine from "../CustomLine";
import { Spacer } from "../Spacer";
import NewText from "../NewText";
import moment from "moment";

interface Props {
  isModalVisible?: boolean;
  setModalVisible?: any;
  justifyContent?: any;
  imageData?: any;
  createPost?: any;
  sendMessage?: any;
  setState?: any;
  state?: any;
  msg?: any;
  setMsg?: any;
  message?: any;
  loading?: any;
  imageObject?: object;
}
const ImageViewModal: React.FC<Props> = ({
  isModalVisible,
  setModalVisible,
  justifyContent,
  imageData,
  imageObject,
  createPost,
  sendMessage,
  setState,
  state,
  msg,
  setMsg,
  message,
  loading,
}) => {
  console.log("imageData", imageData);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [hideImage, setShowImage] = useState(true);
  const simpleScale = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const windowWidth = useWindowDimensions().width;
  const createdAtDate = moment(imageObject.time);
  const currentDate = moment();

  const { width, height } = Dimensions.get('window');


  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 0,
      useNativeDriver: true,
    }).start();
  }, [isModalVisible]);

  // Check if the created_at date is today
  const isToday = createdAtDate.isSame(currentDate, "day");

  const onPinchEvent = Animated.event(
    [
      {
        nativeEvent: { simpleScale },
      },
    ],
    { useNativeDriver: true }
  );

  const onPanEvent = Animated.event(
    [
      {
        nativeEvent: { translateX: translateX, translateY: translateY },
      },
    ],
    { useNativeDriver: true }
  );

  // Format the date differently based on whether it's today or not
  const formattedDate = createdAtDate.isSame(currentDate, "day")
    ? "Today at " + createdAtDate.format("MMM D [at] h:mm A")
    : createdAtDate.format("dddd h:mm A");
  // const formattedDate = isToday
  //   ? 'Today at ' + createdAtDate.format('hh:mm A')
  //   : createdAtDate.format('MMM D [at] hh:mm A');
  const shortenedName =
    imageObject?.name?.length > 30
      ? imageObject?.name?.substring(0, 29) + "..."
      : imageObject?.name;

  const HandlePress = () => {
    if (hideImage) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }).start();
      setShowImage(false);
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }).start();
      setShowImage(true);
    }
  };
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
            backgroundColor: colors.black300,
          }}
          onPress={() => {
            setModalVisible?.(false);
          }}
        ></Pressable>
      }
    >
      <Pressable
        onPress={() => {
          HandlePress();
        }}
        style={{
          width: "101%",
          height: "100%",
          backgroundColor: "#0B0B0B",
        }}
      >
        <Animated.View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: scale(20),
            paddingVertical: verticalScale(5),
            opacity: fadeAnim,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              setModalVisible?.(false);
            }}
            style={{
              width: scale(40),
              height: scale(40),
              // alignItems:"center",
              justifyContent: "center",
            }}
          >
            <Image
              style={{
                width: 17,
                height: 17,
                borderRadius: 999,
              }}
              source={images.back}
            />
          </TouchableOpacity>

          <View
            style={{
              marginRight: scale(7),
              paddingBottom: verticalScale(5),
              width: "90%",
              // backgroundColor:"red"
            }}
          >
            <NewText
              color={colors.white}
              size={18}
              numberOfLines={1}
              style={{ marginTop: verticalScale(5) }}
              text={shortenedName}
            />
            <NewText
              color={colors.white}
              size={13}
              style={{ marginTop: verticalScale(-3) }}
              text={formattedDate}
            />
          </View>
        </Animated.View>
        <View style={{ height: "75%", flex: 1 }}>
          <Image
        style={[styles.mainImage,]}
        source={{ uri: imageObject?.uri }}
            resizeMode="contain"
            // resizeMethod=""
          />

          <View
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backgroundColor: `rgba(0, 0, 0, 0.4)`, // Apply opacity to the background color
              opacity: 0.5,
            }}
          />
        </View>

        <Animated.View
          style={{
            alignSelf: "center",
            opacity: fadeAnim,

            height: "15%",
            width: "100%",
            justifyContent: "center",
            padding: 15,
          }}
        >
          <NewText
            color={colors.white}
            size={15}
            numberOfLines={3}
            // style={{ textAlign:"center" }}
            text={imageObject.description}
          />
        </Animated.View>

        {/* <View
          style={{
            // flexDirection: "row",
            // alignItems: "center",
            justifyContent: "space-between",
            // height:"25%",
            width:windowWidth,
            paddingTop: "12%",
            paddingHorizontal:15
          }}
        >
             <NewText
                color={colors.white}
                size={15}
                numberOfLines={3}
                // style={{ textAlign:"center" }}
                text={imageObject.description}
              />
         
        </View>  */}
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    margin: 0,
    backgroundColor: colors.black300,
  },
  imgContainer: {
    width: scale(25),
    height: scale(30),
    alignItems: "center",
    justifyContent: "center",
  },
  mainImage:{
    width: '100%',
    height: '100%',

  }
});

export default ImageViewModal;
