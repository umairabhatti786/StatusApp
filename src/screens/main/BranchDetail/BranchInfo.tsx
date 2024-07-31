import React, { useEffect, useState } from "react";
import {
  View,
  Dimensions,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import CustomText from "../../../components/CustomText";
import { Spacer } from "../../../components/Spacer";
import { appStyles } from "../../../utils/AppStyles";
import { scale, verticalScale } from "react-native-size-matters";
import { windowWidth } from "../../../utils/CommonFun";
import { font } from "../../../utils/font";


let selectedAddon = [];

type Props = {
  img?: string;
  name?: string;
};

const BranchInfo = ({ img, name }: Props) => {
 


 return(
    <View style={{...appStyles.row,marginVertical:verticalScale(10),}}>
    <Image
      source={img}
      style={{ width: scale(16), height:scale(16) }}
    />
    <Spacer width={scale(10)} />

<CustomText
        text={name}
        size={13}
        style={{ width: windowWidth / 1.5, }}

        fontFam={font.montserratMedium}
        fontWeight="500"
      />



    </View>

 )
};
export default BranchInfo;
