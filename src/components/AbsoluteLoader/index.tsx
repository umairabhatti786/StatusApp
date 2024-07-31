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
  ActivityIndicator,
} from "react-native";
import Modal from "react-native-modal";
import { colors } from "../../utils/colors";

interface Props {
  isModalVisible?: boolean;
  setModalVisible?: React.Dispatch<React.SetStateAction<boolean>>;
}

const AbsoluteLoader: React.FC<Props> = ({
  isModalVisible,
  setModalVisible,
}) => {

  return (
    <Modal
      style={{
        ...styles.modalContainer,
        justifyContent: "center",
        paddingTop: "40%",
      }}
      isVisible={isModalVisible}
      onBackButtonPress={() => setModalVisible?.(false)}
      onBackdropPress={() => setModalVisible?.(false)}
    >
      <View
        style={{
          width: "100%",
          height: "100%",
        top:"35%",
     
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    margin: 0,
  },
});

export default AbsoluteLoader;
