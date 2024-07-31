import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { images } from "../../assets";
import { colors } from "../../utils/colors";
import CustomInput from "../CustomInput";
import { isiPad } from "../../utils/CommonFun";

type Props = {
  placeholder?: string;
  onChangeText?: any;
  navigation?: any;
  textColor?: string;
  filterNotREquired?: boolean;
  value?: any;
  onPressClose?: any;
  backgroundColor?: string;
  width?: any;
  isCross?: any;
  height?: any;
  isFilter?: boolean;
  onPressFilter?: () => void;
};

const CustomSearch = ({
  placeholder,
  onChangeText,
  textColor,
  filterNotREquired,
  navigation,
  value,
  onPressClose,
  backgroundColor,
  width,
  isCross,
  height,
  isFilter,
  onPressFilter,
}: Props) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: width || "100%",
        backgroundColor: backgroundColor || colors.white,
        height: height || 45,
        paddingLeft: 10,
      }}
    >
      <View style={{ flex: 1 }}>
        <CustomInput
          value={value}
          fontSize={isiPad ? 19 : 14}
          placeholder={placeholder}
          textColor={textColor}
          onChangeText={onChangeText}
        />
      </View>
      {isFilter && (
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={onPressFilter}
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "13%",
            backgroundColor: colors.primary,
          }}
        >
          <Image
            source={images.filter}
            resizeMode="contain"
            style={{ width: isiPad ? 20 : 25, height: isiPad ? 20 : 25 }}
          />
        </TouchableOpacity>
      )}
      {isCross && (
        <>
          {value?.length > 0 && (
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={onPressClose}
              style={{
                justifyContent: "center",
                alignItems: "flex-end",
                paddingRight: 10,
                height: "100%",
                width: "15%",
              }}
            >
              <Image
                source={images.close}
                resizeMode="contain"
                style={{
                  width: isiPad ? 20 : 15,
                  height: isiPad ? 20 : 15,
                  tintColor: colors.black,
                }}
              />
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
};
export default CustomSearch;

const style = StyleSheet.create({
  main: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginTop: 20,
  },
  img: { width: 23, height: 23 },
});
