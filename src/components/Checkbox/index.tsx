import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import { images } from "../../assets";
import { colors } from "../../utils/colors";
import { isiPad } from "../../utils/CommonFun";

type Props = {
  isChecked: any;
  onPress?:any
  disabled?:any
  backgroundColor?:any
};

const Checkbox = ({ isChecked,onPress,disabled,backgroundColor }: Props) => {
  return (
    <TouchableOpacity
    disabled={disabled}
      style={{ height: 20, width: 20, justifyContent: "center" }}
      activeOpacity={0.6}
      onPress={onPress}
    >
      <View
        style={{
          width:  isiPad?25: 21,
          height: isiPad?25: 21,
          borderWidth: 1.5,
          borderColor: colors.primary,
          borderRadius: 4,
          backgroundColor:isChecked ?colors.primary: backgroundColor|| colors.white,
          justifyContent: "center",
          alignItems: "center",
          padding: 3,
        }}
      >
        {
          isChecked&&(
            <Image
            resizeMode="contain"
            style={{ width: 14, height: 14, tintColor: colors.white }}
            source={images.tick}
          />

          )
        }
       
        
        
      </View>
    </TouchableOpacity>
  );
};
export default Checkbox;
