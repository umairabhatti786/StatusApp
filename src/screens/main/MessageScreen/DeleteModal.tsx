import React, { useEffect, useState } from "react";
import {
  Alert,
  LogBox,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  FlatList,
  StatusBar,
} from "react-native";

import { scale, verticalScale } from "react-native-size-matters";
import CustomModal from "../../../components/CustomModal";
import { colors } from "../../../utils/colors";
import CustomText from "../../../components/CustomText";
import { Spacer } from "../../../components/Spacer";
import { appStyles } from "../../../utils/AppStyles";
import CustomButton from "../../../components/CustomButton";
import NewText from "../../../components/NewText";
import Button from "../../../components/Button";

const DeleteModal = ({ isModalVisible, setModalVisible, onDelete }: any) => {
  return (
    <CustomModal
      isModalVisible={isModalVisible}
      setModalVisible={setModalVisible}
      modalBackgroundColor={'rgba(0, 0, 0, 0.6)'}
    >
      <View style={{ alignItems: "center",top:"15%"}}>
        <View
          style={{
            width: "85%",
            backgroundColor: colors.white,
            paddingVertical: 20,
            paddingHorizontal: 20,
            borderRadius: scale(15),
            alignItems:"center",
            gap:15
          }}
        >
          <NewText
            text={"Delete Message?"}
            size={18}
            fontWeight="700"
            fontFam="Poppins-Bold"
            color={colors.black}
            style={{ textAlign: "center" }}
          />

          <NewText
            text={"This action can not be undone!"}
            size={15}
            color={colors.black}
            // style={{ marginVertical: verticalScale(10) }}
          />
          <View style={{ ...appStyles.row, alignSelf: "center" }}>
            <Button
              text={"Cancel"}
              // width={windowWidth/3.5}
              size={16}
              height={verticalScale(43)}
              borderRadius={scale(20)}
              paddingHorizontal={scale(25)}
              onPress={() => setModalVisible(false)}
              // fontWeight={"600"}
              fontFam={"Poppins-Regular"}
              bgColor={"#C4C4C4"}
              textColor={colors.black}
            />
            <Spacer width={scale(20)} />

            <Button
              text={"DELETE"}
              // width={windowWidth/3.5}
              size={16}
              height={verticalScale(43)}
              borderRadius={scale(20)}
              paddingHorizontal={scale(25)}
              onPress={onDelete}
              // fontWeight={"600"}
              fontFam={"Poppins-Regular"}
              bgColor={"#F02222"}
              textColor={colors.white}
            />
          </View>
        </View>
      </View>
    </CustomModal>
  );
};

export default DeleteModal;
