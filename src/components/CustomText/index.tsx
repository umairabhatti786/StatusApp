import {Text} from 'react-native';
import {colors} from '../../utils/colors';
import { isiPad } from '../../utils/CommonFun';

type Props = {
  color?: string;
  size?: number;
  fontFam?: string;
  text?: any;
  style?: any;
  lineHeight?: number;
  numberOfLines?: number;
  fontWeight?: string;
  label?: any;
  textDecorationLine?: string;
  // textTransform?:any
};

const CustomText = ({
  color,
  size,
  fontFam,
  text,
  style,
  lineHeight,
  numberOfLines,
  fontWeight,
  label,
  textDecorationLine,
}: Props) => {
  return (
    <Text
      numberOfLines={numberOfLines}
      // textTransform={textTransform}

      style={[
        {
          color: color || colors.black,
          fontSize: size ||  12,
          fontWeight: fontWeight || '500',
          fontFamily: fontFam || 'Montserrat-Regular',
          textDecorationLine: textDecorationLine,

          ...(lineHeight && {lineHeight: lineHeight}),
        },
        style,
      ]}>
      {text}{label}
    </Text>
  );
};
export default CustomText;
