import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { images } from "../../assets";
import { colors } from "../../utils/colors";
import CustomText from "../CustomText";
import { font } from "../../utils/font";
import { appStyles } from "../../utils/AppStyles";
import FastImage from "react-native-fast-image";
import HTML from "react-native-render-html";
import { isiPad, windowWidth } from "../../utils/CommonFun";
import { verticalScale } from "react-native-size-matters";

export interface cardData1 {
  title?: string;
  description?: string;
  onPress?: any;
  image?: any;
  // blogDescription?:any
}
type Props = {
  data?: cardData1;
  onPress?: () => void;
  blogDescription?:any
};

const DiscoverCard = ({ data, onPress,blogDescription }: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      style={{
        // borderRadius: 15,
        backgroundColor: colors.white,
        borderWidth: 1.5,
        borderColor: colors.primary35,
        width: "99%",
        height: isiPad ? verticalScale(195) : 250,
        // elevation: 3,
        // shadowColor: colors.lightBlack,
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.2,
        // shadowRadius: 2,
        // backgroundColor:colors.white,
      }}
    >
      <FastImage
        source={{ uri: data?.header }}
        resizeMode="cover"
        style={{
          width: "100%",
          height: isiPad ? verticalScale(140) : 160,
        }}
      />
      <View
        style={{
          width: "99%",
          padding: 15,
        }}
      >
        <CustomText
          text={data?.heading}
          size={isiPad ? 20 : 14}
          numberOfLines={1}
          fontFam={font.montserratMedium}
          fontWeight="600"
          color={colors.primary}
        />
        <View
          style={{
            // height: isiPad ? verticalScale(30) : 40,
            marginTop: isiPad ? verticalScale(5) : 5,
          }}
        >
           
        <CustomText
          text={blogDescription}
          numberOfLines={2}
          size={isiPad?20:13}
          color={colors.lightBlack}
          lineHeight={18}
        />


          {/* <HTML contentWidth={windowWidth - 60} source={{ html: data?.blog }} /> */}
        </View>

        {/* <CustomText
          text={data?.sub_heading}
          size={ isiPad?19: 13}
          numberOfLines={1}
          style={{margin:5}}
          color={colors.black}
          
          
          // fontFam={font.montserratMedium}
          fontWeight="500"
          
        

        /> */}
        {/* <HTML 
                                baseStyle={{
                                  maxHeight: 60, // Adjust this value to control the height
                                overflow: 'hidden',
                                // backgroundColor:"red",
                                alignItems:"flex-start",
                                justifyContent:"flex-start"
                              }}
                                source={{ html: data?.blog }} /> */}
       
      </View>
    </TouchableOpacity>
  );
};
export default DiscoverCard;

const styles = StyleSheet.create({
  htmlContent: {
    height: 30, // Set your desired fixed height here
    overflow: "hidden", // Optional: to handle overflow content
  },
});
