import { Pressable, Text, TouchableOpacity, View,ActivityIndicator,Image } from "react-native";
import { colors } from "../../utils/colors";
import CustomText from "../CustomText";
import { font } from "../../utils/font";
import { appStyles } from "../../utils/AppStyles";
import { scale, verticalScale } from "react-native-size-matters";
import { images } from "../../assets/images";

type Props = {
  text?: string;
  onPress?: any;
  width?: any;
  height?: number;
  size?: number;
  fontFam?: any;
  elevation?: number;
  borderRadius?: number;
  style?: any;
  bgColor?: any;
  textColor?: any;
  borderColor?: any;
  notRequiredShadow?: boolean;
  disable?: boolean;
  isLoading?: boolean;
  paddingHorizontal?:any
  fontWeight?:any
  borderWidth?:number
};

const ErrorToast = ({
  text,
  onPress,
  width,
  height,
  size,
  fontFam,
  elevation,
  borderRadius,
  style,
  bgColor,
  textColor,
  borderColor,
  notRequiredShadow,
  disable,
  isLoading,
  paddingHorizontal,
  fontWeight,
  borderWidth
}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disable}
      activeOpacity={0.9}
      style={{
        ...style,
        width: width,
        height: verticalScale(height||65),
        backgroundColor: bgColor || colors.red,
        flexDirection:"row",
        alignItems: "center",
        paddingHorizontal:scale(10),
        borderRadius: scale(borderRadius || 8),
      }}
    >
        <Image
        style={{width:scale(30),height:scale(30)}}
        source={images.closeicon}
        resizeMode="contain"
        />
    
        <CustomText
          text={text}
          color={textColor || colors.white}
          fontWeight={ fontWeight ||"600"}
          size={size || 15}
          style={{marginLeft:scale(20)}}
          fontFam={fontFam ||"Poppins-Medium"}
        />
   
    </TouchableOpacity>
  );
};
export default ErrorToast;
