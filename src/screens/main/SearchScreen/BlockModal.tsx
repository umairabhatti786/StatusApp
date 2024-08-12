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


const BlockModal = ({isModalVisible,setModalVisible,isBlock,title,des,onBlocked}:any) => {
  
  return (

    <CustomModal
    isModalVisible={isModalVisible}
    setModalVisible={setModalVisible}
    
>

<View
          style={{ alignItems: "center" }}>
          <View
              style={{
                  width: "85%",
                  backgroundColor: colors.white,
                  paddingVertical: 20,
                  paddingHorizontal: 20,
                  borderRadius:scale(15)
              }}
          >

<CustomText
                  text={title}
                  size={17}
                  fontWeight='700'
                  fontFam="Poppins-Bold"
                  color={colors.black}
                  style={{ textAlign: "center" }}
              />

<CustomText
                  text={des}
                  size={16}
                  color={colors.black}
                  style={{marginVertical:verticalScale(10) }}
              />
              <View style={{...appStyles.row,alignSelf:"center"}}>

              <CustomButton
    text={"Cancel"}
    // width={windowWidth/3.5}
    size={16}
    height={verticalScale(43)}
    borderRadius={scale(20)}
    paddingHorizontal={scale(25)}
    onPress={()=>setModalVisible(false)}
    // fontWeight={"600"}
    fontFam={"Poppins-Regular"}
    bgColor={"#C4C4C4"}
    textColor={colors.black}
    />
    <Spacer width={scale(20)}/>

    <CustomButton
    text={isBlock}
    // width={windowWidth/3.5}
    size={16}
    height={verticalScale(43)}
    borderRadius={scale(20)}
    paddingHorizontal={scale(25)}
    onPress={onBlocked}
    // fontWeight={"600"}
    fontFam={"Poppins-Regular"}
    bgColor={"#277DD2"}
    textColor={colors.white}
    />


              </View>
              
          </View>
      </View>



</CustomModal>


  
  );
};

export default BlockModal;
