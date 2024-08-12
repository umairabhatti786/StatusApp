import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import CustomText from "../CustomText";
import { colors } from "../../utils/colors";
import { Spacer } from "../Spacer";
import { verticalScale } from "react-native-size-matters";
import { windowWidth } from "../../utils/Dimensions";
import NewText from "../NewText";

const TopBar = ({ activeBar, setActiveBar, topBarData,setActiveFilter }: any) => {
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {topBarData?.map((item, index) => {
          return (
            <View style={{ alignItems: "center",}}>
              <TouchableOpacity
                activeOpacity={0.6}
                style={{width:windowWidth/2,alignItems:"center"}}

                onPress={() => {
                  setActiveFilter?.(item)
                  setActiveBar(item)

                }}
              >
                <NewText
                  color={ colors.white}
                  text={item}
                  style={{textTransform:"capitalize" }}
                  
                  size={16}
                  fontWeight={"500"}
                  fontFam="Poppins-Regular"
                />
              </TouchableOpacity>
              <Spacer height={verticalScale(5)} />

              <View
                style={{
                  width: windowWidth/2.2,
                  height: verticalScale(2),
                  backgroundColor:
                    activeBar == item ? colors.white : colors.black200,
                }}
              ></View>
            </View>
          );
        })}

      </View>
      {/* <View style={{width:windowWidth/1,height:2,backgroundColor:colors.black200,marginTop:verticalScale(-2)}}></View> */}

    </View>
  );
};
export default TopBar;
