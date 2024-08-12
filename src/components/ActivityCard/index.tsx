import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import CustomText from "../CustomText";
import { colors } from "../../utils/colors";
import { Spacer } from "../Spacer";
import { windowWidth } from "../../utils/Dimensions";
import { images } from "../../assets/images";
import { scale, verticalScale } from "react-native-size-matters";
import { appStyles } from "../../utils/AppStyles";
import CustomButton from "../CustomButton";
import NewText from "../NewText";
import { useNavigation } from "@react-navigation/native";

type Props = {
  name?: string;
  image?: any;
  senderId?: any;
  time?: string;
  comment?: string;
  isShowFollow?: boolean;
};
const ActivityCard = ({ image, name, time, comment, isShowFollow,senderId }: any) => {
  const [isFollow, setIsFollow] = useState(true);
  const navigation: any = useNavigation();
  const shortenedName =
name?.length > 30
  ? name?.substring(0, 29) + "..."
  : name;


  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        // paddingRight: 10,
      }}
    >
      <TouchableOpacity activeOpacity={0.6} onPress={()=>{
        navigation.navigate("OthersProfile",{id:senderId});
      }} style={{ ...appStyles.row, width: windowWidth / 1.5, }}>
        <Image
          style={{
            width: verticalScale(55),
            height: verticalScale(55),
            borderRadius:scale(10)
            // width: 64, height: 64
          }}
          source={image}
        />
        <View style={{ marginLeft: scale(15) }}>
          <View>
            <NewText
              text={shortenedName}
              color={colors.white}
              size={16}
              fontFam="Poppins-SemiBold"
              fontWeight="700"
              numberOfLines={1}
            />
          </View>

          <Spacer height={7} />
          <View style={{ flexDirection: "row",alignItems:"center" }}>
             
        
            <NewText
              lineHeight={21}
            

              size={15}
              color={colors.white}
              text={comment}
            />
             <View
                style={{
                  width: scale(3.5),
                  height: scale(3.5),
                  backgroundColor: colors.white,
                  borderRadius: 999,
                  marginHorizontal: scale(6),
                  marginTop: verticalScale(2),
                }}
              />

<NewText
              lineHeight={21}
              size={15}
              color={colors.white}
              text={time}
            />
          </View>
        </View>
      </TouchableOpacity>
      {/* {isShowFollow&&(
          <CustomButton
          text={isFollow?"Follow":"Following"}
          // width={windowWidth/3.5}
          size={15}
          height={verticalScale(32)}
          // borderRadius={scale()}
          paddingHorizontal={scale(15)}
          onPress={()=>setIsFollow(!isFollow)}
          // fontWeight={"600"}
          fontFam={"Poppins-SemiBold"}
          bgColor={isFollow?"#48B1FF":colors.primary}
          textColor={colors.white}
          />

      )
        
      } */}

      {/* <TouchableOpacity
      activeOpacity={0.6}
      style={{marginBottom:10}}
      >
        <Image 
        resizeMode="contain"
        style={{ height: 18, width:18 }} source={images.crosscircle} />
      </TouchableOpacity> */}
    </View>
  );
};

export default ActivityCard;

const styles = StyleSheet.create({});
