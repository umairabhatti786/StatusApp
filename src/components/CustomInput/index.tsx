import { Pressable, Text, View, TextInput } from "react-native";
import { colors } from "../../utils/colors";
import CustomText from "../CustomText";
import { font } from "../../utils/font";
import { isiPad } from "../../utils/CommonFun";
import { verticalScale } from "react-native-size-matters";

type Props = {
  placeholder?: string;
  onChangeText?: any;
  height?: any;
  bgColor?: any;
  textColor?: string;
  borderRadius?: number;
  style?: any;
  value?:any,
  fontSize?:any
  isEditable?:any
};

const CustomInput = ({
  onChangeText,
  placeholder,
  textColor,
  height,
  bgColor,
  borderRadius,
  style,
  value,
  fontSize,
  isEditable
}: Props) => {
  return (
    <TextInput
  
      style={{
        fontSize:fontSize || 14,
        fontWeight: "500",
        fontFamily: font.montserratRegular,
        flex: 1,
        color: textColor,
        height:  height|| 47,
        backgroundColor: bgColor,
        borderRadius: borderRadius,
        ...style,
      }}
      value={value}
      placeholder={placeholder}
      placeholderTextColor={textColor}
      autoCapitalize="none"
      autoCorrect={false}
      onChangeText={onChangeText}
    />
  );
};
export default CustomInput;
