import { Image, View } from "react-native";
import { colors } from "../../utils/colors";
import CustomText from "../CustomText";
import { font } from "../../utils/font";
export interface cardData1 {
  title: string;
  description: string;
  image: any;
  message?: string;
}
type Props = {
  data?: cardData1;
};
const NotificationCard = ({ data }: Props) => {
  return (
    <View
      style={{
        // height: windowHeight / 6.6,
        borderWidth: 1.5,
        width: "100%",
        borderColor: colors.primary35,
        backgroundColor: colors.white,
        flexDirection: "row",
      }}
    >
      <View
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 12,
          padding: 15,
          gap: 5,
        }}
      >
        <CustomText
          text={data?.title}
          fontWeight="500"
          size={14}
          color={colors.black}
          fontFam={font.montserratMedium}
        />
        <CustomText
          text={data?.message}
          fontFam={font.montserratMedium}
          numberOfLines={4}
          color={colors.lightBlack}
        />
      </View>
      
    </View>
  );
};
export default NotificationCard;
