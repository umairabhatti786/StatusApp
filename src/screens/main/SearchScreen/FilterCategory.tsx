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
  TouchableOpacity
} from "react-native";

import { scale, verticalScale } from "react-native-size-matters";
import { colors } from "../../../utils/colors";
import CustomText from "../../../components/CustomText";
import NewText from "../../../components/NewText";



const FilterCategory = ({isModalVisible,setModalVisible,isBlock,title,des,onSelectCatrgory,selectedType,item}:any) => {
  return (

    <TouchableOpacity
    activeOpacity={0.6}
    onPress={onSelectCatrgory}
    // onPress={()=>{
    //   setSelectedCategory(item)

    // }} 
     style={{ flexDirection: "row", alignItems: "center",}}>
<TouchableOpacity
activeOpacity={0.6}
onPress={onSelectCatrgory}

  style={styles.radioButton}>
  <View>{selectedType==item && <View style={styles.radioButtonInner} />}</View>
</TouchableOpacity>
<NewText color={colors.white} size={14} text={item} />
</TouchableOpacity>

  


  
  );
};

export default FilterCategory;

const styles = StyleSheet.create({
    radioButton: {
      width: scale(16),
      height: scale(16),
      borderRadius: scale(16),
      borderWidth: 2,
      borderColor: colors.white,
      justifyContent: "center",
      alignItems: "center",
      marginRight: scale(15),
      
    },
    radioButtonInner: {
      width: scale(8),
      height: scale(8),
      borderRadius: scale(12),
      backgroundColor: "white",
    },
  });
