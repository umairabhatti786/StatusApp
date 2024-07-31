import {
  Pressable,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import {colors} from '../../utils/colors';
import CustomText from '../CustomText';
import {font} from '../../utils/font';
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
  borderWidth?: number;
  shadowOpacity?: number;
  fontWeight?: string;
  paddingHorizontal?: number;
};

const CustomButton = ({
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
  borderWidth,
  shadowOpacity,
  fontWeight,
  paddingHorizontal,
}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disable}
      activeOpacity={0.3}
      style={{
        ...style,
        width: width || '100%',
        height: height ||  50,
        backgroundColor: bgColor || colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: borderRadius || 12,
        borderWidth: borderWidth || 2,
        borderColor: borderColor || colors.primary,
        // elevation: elevation,
        paddingHorizontal: paddingHorizontal,
        // shadowColor:colors.lightBlack,
        // shadowOffset: { width: 3, height: 5 },
        // shadowOpacity:  shadowOpacity,
        // shadowRadius: 5,
      }}>
      {isLoading ? (
        <>
          <ActivityIndicator size={'large'} color={colors.white} />
        </>
      ) : (
        <CustomText
          text={text}
          color={textColor || colors.white}
          fontWeight={fontWeight || '600'}
          size={size ||  18}
          fontFam={fontFam || font.montserratRegular}
        />
      )}
    </TouchableOpacity>
  );
};
export default CustomButton;
