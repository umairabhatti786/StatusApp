import React, { useState } from "react";

import { StyleSheet, View, TouchableOpacity } from "react-native";

import Modal from "react-native-modal";
import { colors } from "../../utils/colors";
import { windowWidth } from "../../utils/Dimensions";
import { scale } from "react-native-size-matters";

const SizeBar = ({
  marginTop,
  isModalVisible,
  top,
  setIsModalVisible,
  marginLeft,
  paddingHorizontal,
  children,
  paddingVertical,
  right
}: any) => {

  return (
    <Modal
      animationIn={"bounceInRight"}
      animationOut={"bounceOutRight"}
      backdropOpacity={0}
      style={{
        backgroundColor: "transparent",
        alignItems: "flex-end",
        justifyContent: "flex-start",
      }}
      onBackdropPress={() => setIsModalVisible(false)}
      isVisible={isModalVisible}>
      <View
        style={{
          //   height: 150,
          width: windowWidth/2.3,
          backgroundColor: "#313C42",
          borderRadius: 10,
          marginTop: marginTop || 50,
          top: top || 100,
          right: right || 0,
          paddingVertical: paddingVertical || scale(10),
          paddingHorizontal: paddingHorizontal ||scale(15),
      
        }}>
        <View
          style={{
            position: "absolute",
            top: -15,
            left: 170,
            height: 30,
          }}>
        </View>
        {children}
      </View>
    </Modal>
  );
};

export default SizeBar;

