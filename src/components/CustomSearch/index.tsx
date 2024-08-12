import {
  Pressable,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Image,
  TextInput,
} from "react-native";
import { colors } from "../../utils/colors";
import CustomText from "../CustomText";
import { font } from "../../utils/font";
import { appStyles } from "../../utils/AppStyles";
import { images } from "../../assets/images";
import { scale, verticalScale } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";

const CustomSearch = ({
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
  onChangeText,
  value,
  navigation
}: any) => {
  // const navigation = useNavigation();
  return (
    <View style={appStyles.rowjustify}>
      <TouchableOpacity
        activeOpacity={0.6}
        style={{
          width: scale(30),
          height: scale(30),
          alignItems: "center",
          justifyContent: "center",
          marginRight: scale(3),
        }}
        onPress={() => navigation.goBack()}
      >
        <Image
          style={{ width: scale(16), height: scale(16) }}
          source={images.back100}
          resizeMode="contain"
        />
      </TouchableOpacity>

      {/* <View
        style={{
          width: "87%",
          height: verticalScale(40),
          borderWidth: 1,
          borderRadius: scale(8),
          borderColor: colors.grey300,
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 10,
          justifyContent: "space-between",
        }}
      > */}
        <TextInput
          placeholder="Search Members"
          placeholderTextColor={colors.white}
          value={value}
          onChangeText={onChangeText}
          style={{
            fontSize: verticalScale(15),
            fontFamily: "Poppins-Regular",
            fontWeight: "400",
            color: colors.white,
            marginHorizontal: 10,
            paddingVertical:verticalScale(6),
            width: "87%",
            borderWidth: 1,
            borderRadius: scale(8),
            borderColor: colors.grey300,
            alignItems:"center",
            // textAlign:"center"
            paddingHorizontal: scale(15),
          }}
        />
      {/* </View> */}
    </View>
  );
};
export default CustomSearch;
