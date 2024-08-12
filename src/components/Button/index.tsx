import { Pressable, Text, TouchableOpacity, View,ActivityIndicator } from "react-native";
import { colors } from "../../utils/colors";
import CustomText from "../CustomText";
import { font } from "../../utils/font";
import { appStyles } from "../../utils/AppStyles";
import { scale, verticalScale } from "react-native-size-matters";
import NewText from "../NewText";

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
  alignItems?:any
};

const Button = ({
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
  borderWidth,
  alignItems
}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disable}
      activeOpacity={0.9}
      style={{
        ...style,
        width: width,
        height:height || 46,
        backgroundColor: bgColor || colors.primary,
        justifyContent: "center",
        alignItems: alignItems|| "center",
        paddingHorizontal:paddingHorizontal,
        borderRadius: scale(borderRadius || 8),
        borderWidth:borderWidth ,
        borderColor: borderColor ,
        // paddingTop:5
      }}
    >
      {isLoading ? (
        <>
              <ActivityIndicator size={"large"} color={colors.white} />

        </>
      ) : (
        <NewText
          text={text}
          color={textColor || colors.white}
          fontWeight={ fontWeight ||"600"}
          size={size || 18}
          fontFam={fontFam ||"Poppins-Medium"}
        />
      )}
    </TouchableOpacity>
  );
};
export default Button;
