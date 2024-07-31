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
  Modal,
  Image,
} from "react-native";
import { colors } from "../../../../utils/colors";
import CustomText from "../../../../components/CustomText";
import { font } from "../../../../utils/font";
import CustomButton from "../../../../components/CustomButton";
import { images } from "../../../../assets";
import { appStyles } from "../../../../utils/AppStyles";
import { verticalScale } from "react-native-size-matters";
import { isiPad } from "../../../../utils/CommonFun";

interface Props {
  isModalVisible?: boolean;
  setModalVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  children?: React.ReactNode;
  backdropStyle?: any;
  paddingTop?: any;
  justifyContent?: any;
  onbackDropPress?: any;
  onPress?: any;
  orderConfirmTitle?: string;
  orderConfirmButton?: string;
  pointsGiven?: any;
  orderConfirmationStartDescription?: string;
  orderConfirmationEndDescription?: string;
}

const OrderConfirmedModal: React.FC<Props> = ({
  isModalVisible,
  setModalVisible,
  orderConfirmTitle,
  backdropStyle,
  justifyContent,
  paddingTop,
  onPress,
  orderConfirmButton,
  pointsGiven,
  orderConfirmationEndDescription,
  orderConfirmationStartDescription,
}) => {
  const windowWidth = useWindowDimensions().width;
  console.log("pointsGiven", pointsGiven);
  return (
    <Modal
      style={{
        ...styles.modalContainer,
        justifyContent: justifyContent || "flex-start",
        paddingTop: paddingTop || "40%",
      }}
      visible={isModalVisible}
    >
      <BlurView
        blurAmount={100}
        blurRadius={15}
        blurType="light"
        style={{
          flex: 1,
          opacity: 1,
          // backgroundColor: colors.offWhite,
          ...backdropStyle,
        }}
      >
        <Pressable style={{ height: "100%", width: "100%", paddingTop: "40%" }}>
          <View style={{ alignItems: "center" }}>
            <View
              style={{
                width: "90%",
                backgroundColor: colors.white,
                paddingVertical: 30,
                paddingHorizontal: 20,
                ...appStyles?.modalElevation,
              }}
            >
              <CustomText
                text={orderConfirmTitle}
                size={ isiPad?25: 20}
                // fontWeight='500'
                color={colors.primary}
                style={{ textAlign: "center" }}
              />
              <View
                style={{
                  flexDirection: "row",
                  paddingHorizontal: 20,
                  marginTop: "5%",
                  alignSelf:"center"
                }}
              >
                <CustomText
                  text={`${orderConfirmationStartDescription} ${pointsGiven} ${orderConfirmationEndDescription} `}
                  size={ isiPad?19: 14}
                  fontWeight="600"
                  fontFam={font.montserratMedium}
                  color={colors.primary}
                  style={{ textAlign: "center" }}
                />
              </View>

              <View
                style={{
                  width: "100%",
                  height: 400,
                }}
              >
                <Image
                  source={images.confirmedOrder}
                  style={{
                    width: "100%",
                    resizeMode: "contain",
                    height: "100%",
                  }}
                />
              </View>
              <CustomButton
                text={orderConfirmButton}
                borderRadius={34}
                size={ isiPad?20: 14}
                height={ isiPad?verticalScale(27): 45}
                onPress={onPress}
              />
            </View>
          </View>
        </Pressable>
      </BlurView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    margin: 0,
  },
});

export default OrderConfirmedModal;
