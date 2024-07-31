import {
  Image,
  Platform,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../../../../utils/colors";
import CustomText from "../../../../components/CustomText";
import { font } from "../../../../utils/font";
import { images } from "../../../../assets";
import { scale } from "react-native-size-matters";
import { isiPad } from "../../../../utils/CommonFun";
interface data {}
type Props = {
  title?: string;
  description?: string;
  OnChange?: any;
  changeTextTitle?: string;
};

const CheckoutCard = ({
  title,
  description,
  OnChange,
  changeTextTitle,
}: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={OnChange}
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 10,
      }}
    >
      <View
        style={{
          gap: 5,
          marginRight: scale(5),
          width: "80%",
        }}
      >
        {title && (
          <CustomText
            text={title}
            size={isiPad?15:12}
            fontWeight="600"
            fontFam={font.montserratMedium}
          />
        )}

        <CustomText
          text={description}
          size={isiPad?15:12}

          fontWeight="500"
          color={colors.primary}
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={OnChange}
        style={{
          justifyContent: "center",
          alignItems: "flex-end",
        }}
      >
        <CustomText
          text={changeTextTitle || "Change"}
          size={isiPad?15:12}

          style={{
            textDecorationLine: "underline",
          }}
          fontWeight="500"
          fontFam={font.montserratMedium}
          color={colors.primary}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};
export default CheckoutCard;
