import {
  Pressable,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Image,
} from "react-native";
import { colors } from "../../utils/colors";
import CustomText from "../CustomText";
import { font } from "../../utils/font";
import { appStyles } from "../../utils/AppStyles";
import { scale, verticalScale } from "react-native-size-matters";
import * as Animatable from "react-native-animatable";

import { images } from "../../assets/images";
import NewText from "../NewText";
import CustomModal from "../CustomModal";
import { windowHeight } from "../../utils/Dimensions";

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
  paddingHorizontal?: any;
  fontWeight?: any;
  borderWidth?: number;
  setShowError?: any;
  showError?:boolean
};

const CustomToast = ({
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
  setShowError,
  showError
}: Props) => {
  return (
    <CustomModal
    isModalVisible={showError}
    setModalVisible={setShowError}
    paddingTop={windowHeight/1.3}
    
>

<View
      style={{
        ...style,
        width: width || "90%",
        height: verticalScale(height || 65),
        backgroundColor: bgColor || colors.red,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: scale(10),
        borderRadius: scale(borderRadius || 8),
        alignSelf: "center",
      }}
    >
      <TouchableOpacity activeOpacity={0.6} onPress={() => setShowError(false)}>
        <Image
          style={{ width: scale(30), height: scale(30) }}
          source={ bgColor==colors.red? images.closeicon:images.successcheck}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <View style={{width:"90%"}}>
      <NewText
        text={text}
        color={textColor || colors.white}
        fontWeight={fontWeight || "600"}
        size={size || 17}
      
        style={{ marginLeft: scale(20),textTransform:"capitalize" }}
        fontFam={fontFam || "Poppins-Medium"}
      />

      </View>

   
    </View>



</CustomModal>

  );
};
export default CustomToast;
