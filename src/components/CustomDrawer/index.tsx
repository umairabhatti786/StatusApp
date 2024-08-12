import { BlurView, VibrancyView } from "@react-native-community/blur";
import React from "react";
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
} from "react-native";
import Modal from "react-native-modal";
import { scale, verticalScale } from "react-native-size-matters";
import { colors } from "../../utils/colors";
import { images } from "../../assets/images";
import CustomLine from "../CustomLine";
import { Spacer } from "../Spacer";
import { appStyles } from "../../utils/AppStyles";
import CustomText from "../CustomText";

interface Props {
  isModalVisible?: boolean;
  setModalVisible?: any;
  children?: React.ReactNode;
  backdropStyle?: any;
  paddingTop?: any;
  justifyContent?: any;
  setActiveChat?:any
}

const CustomDrawer: React.FC<Props> = ({
  isModalVisible,
  setModalVisible,
  children,
  backdropStyle,
  justifyContent,
  paddingTop,
  setActiveChat
}) => {
  const windowWidth = useWindowDimensions().width;

  return (
    <Modal
      style={{
        ...styles.modalContainer,
        justifyContent: justifyContent || "flex-start",
        // paddingTop:paddingTop || "50%"
      }}
      animationIn="slideInLeft"
      animationOut="slideOutLeft"
      deviceWidth={windowWidth}
      isVisible={isModalVisible}
      onBackButtonPress={() => setModalVisible?.(false)}
      onBackdropPress={() => setModalVisible?.(false)}
      backdropColor="transparent"
      customBackdrop={
        <Pressable
          style={{ height: "100%", width: "100%" }}
          onPress={() => setModalVisible?.(false)}
        ></Pressable>
      }
    >
      <View
        style={{
          width: scale(150),
          height: "92%",
          backgroundColor: colors.black300,
          borderBottomRightRadius: scale(20),
          paddingHorizontal: scale(10),
          paddingTop: verticalScale(20),
          borderRightWidth:1,
          borderColor:"#8A8A8A"
        }}
      >
        <Image
          style={{
            tintColor: colors.white,
            width: scale(25),
            height: scale(25),
            alignSelf: "center",
          }}
          source={images.appicon}
        />
        <Spacer height={verticalScale(20)} />
        <CustomLine height={1} backgroundColor={"#8A8A8A"} />
        <Spacer height={verticalScale(20)} />
        <TouchableOpacity
        activeOpacity={0.6}
        onPress={()=>{
            setActiveChat("Inbox")
            setModalVisible(false)

        }}
         style={{ ...appStyles.row, marginLeft: scale(5) }}>
          <View style={styles.imgContainer}>
            <Image
              resizeMode="contain"
              style={{
                tintColor: colors.white,
                width: scale(15.5),
                height: scale(15.5),
              }}
              source={images.messageinbox}
            />
          </View>

          <CustomText
            color={colors.white}
            size={17}
            fontFam="Inter-Medium"
            style={{ marginLeft: scale(8) }}
            text={"Inbox"}
          />
        </TouchableOpacity>

        <Spacer height={verticalScale(15)} />
        <TouchableOpacity
        activeOpacity={0.6}
        onPress={()=>
            {
                setModalVisible(false)
                setActiveChat("Starred")
            }
           }

         style={{ ...appStyles.row, marginLeft: scale(5) }}>
          <View style={styles.imgContainer}>
            <Image
              resizeMode="contain"
              style={{
                tintColor: colors.white,
                width: scale(20),
                height: scale(20),
              }}
              source={images.star}
            />
          </View>

          <CustomText
            color={colors.white}
            size={17}
            fontFam="Inter-Medium"
            style={{ marginLeft: scale(8) }}
            text={"Starred"}
          />
        </TouchableOpacity>

        <Spacer height={verticalScale(15)} />
        <TouchableOpacity
        activeOpacity={0.6}
        onPress={()=>
            {
                setModalVisible(false)
                setActiveChat("Archive")

            }
        }

         style={{ ...appStyles.row, marginLeft: scale(5) }}>
          <View style={styles.imgContainer}>
            <Image
              resizeMode="contain"
              style={{
                tintColor: colors.white,
                width: scale(21),
                height: scale(21),
              }}
              source={images.download}
            />
          </View>

          <CustomText
            color={colors.white}
            size={17}
            fontFam="Inter-Medium"
            style={{ marginLeft: scale(8) }}
            text={"Archive"}
          />
        </TouchableOpacity>

        {/* <Spacer height={verticalScale(15)} />
        <TouchableOpacity
        activeOpacity={0.6}
        onPress={()=>
            {
                setModalVisible(false)
                setActiveChat("Trash")

            }
          }

         style={{ ...appStyles.row, marginLeft: scale(5) }}>
          <View style={styles.imgContainer}>
            <Image
              resizeMode="contain"
              style={{
                tintColor: colors.white,
                width: scale(18),
                height: scale(18),
              }}
              source={images.trash}
            />
          </View>


          <CustomText
            color={colors.white}
            size={17}
            fontFam="Inter-Medium"
            style={{ marginLeft: scale(8) }}
            text={"Trash"}
          />
        </TouchableOpacity> */}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    margin: 0,
  },
  imgContainer: {
    width: scale(25),
    height: scale(30),
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CustomDrawer;
