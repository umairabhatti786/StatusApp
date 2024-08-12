import { Text } from "react-native";
import { colors } from "../../utils/colors";
import { verticalScale } from "react-native-size-matters";

type Props = {
  color?: string;
  size?: number;
  fontFam?: string;
  text?: any;
  style?: any;
  lineHeight?: number;
  numberOfLines?: number;
  fontWeight?: string;
  textDecorationLine?: string;
  label?: string;
};

const NewText = ({
  color,
  size,
  fontFam,
  text,
  style,
  lineHeight,
  numberOfLines,
  fontWeight,
  textDecorationLine,
  label,
}: Props) => {
  return (
    <Text
      numberOfLines={numberOfLines}
      style={[
        {
          color: color || colors.black,
          fontSize: size||  12,
          fontWeight: fontWeight || "500",
          fontFamily: fontFam || "Poppins-Regular",
          textDecorationLine: textDecorationLine,

          ...(lineHeight && { lineHeight: lineHeight }),
        },
        style,
      ]}
    >
      {text}
      {label}
    </Text>
  );
};
export default NewText;
