import { Image, Platform, Pressable, Text, View } from "react-native";
import { colors } from "../../utils/colors";
import CustomText from "../CustomText";
import { font } from "../../utils/font";
import { images } from "../../assets";
// import { ToggleSwitch } from '../Switch'
import ToggleSwitch from "toggle-switch-react-native";
import { scale, verticalScale } from "react-native-size-matters";
import { isiPad, windowWidth } from "../../utils/CommonFun";
import VerifiedScreen from "../../screens/auth/VerifiedScreen";

type Props = {
  title?: string;
  description?: string;
  fontFam?: any;
  size?: number;
  color?: any;
  value?: boolean;
  onChangeValue?: any;
};

const PrivacyCard = ({
  fontFam,
  size,
  color,
  value,
  onChangeValue,
  title,
  description,
}: Props) => {
  return (
    <>
      <View
        style={{
          paddingVertical: verticalScale(10),
        }}
      >
        <View
          style={{
            paddingVertical: verticalScale(8),
            paddingHorizontal: 10,
            flexDirection: "row",
            justifyContent:"space-between",
            alignItems: "center",
          }}
        >
          <View style={{ marginRight: scale(20), width: windowWidth / 1.7 }}>
            <CustomText
              text={title}
              fontFam={fontFam || font.montserratSemiBold}
              size={isiPad?19: 15}
              color={color || colors.primary}
            />
          </View>
          <ToggleSwitch
            isOn={value}
            onColor={colors.primary}
            offColor="#bdc3c7"
            thumbOnStyle={{ width: 24, height: 24, borderRadius: 9999 }}
            thumbOffStyle={{ width: 24, height: 24, borderRadius: 9999 }}
            trackOffStyle={{ width: 53, height: 30 }}
            trackOnStyle={{ width: 53, height: 30 }}
            // labelStyle={{ color: "black", fontWeight: "900" }}
            size="medium"
            onToggle={onChangeValue}
          />
        </View>
        {description && (
          <View
            style={{
              paddingHorizontal: 10,
              width: "83%",
            }}
          >
            <CustomText
              text={description}
              fontFam={fontFam || font.montserratMedium}
              size={isiPad?15: 12}

              color={color || colors.lightBlack}
            />
          </View>
        )}
      </View>
      <View
        style={{ backgroundColor: colors.primary, opacity: 0.25, height: 2 }}
      />
    </>
  );
};
export default PrivacyCard;
