import { Text, TouchableOpacity, View, Image } from "react-native";
import { colors } from "../../utils/colors";
import { appStyles } from "../../utils/AppStyles";
import CustomText from "../CustomText";
import { Spacer } from "../Spacer";
import { images } from "../../assets/images";
import sizeHelper from "../../utils/helpers/sizeHelper";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

type Props = {
  title?: string;
  onPressSetting?: any;
  onPressNotification?: any;
  isSearch?: any;
  notificationAlert?:boolean
};

const TopHeader = ({
  title,
  onPressSetting,
  onPressNotification,
  isSearch,
  notificationAlert
}: Props) => {
  return (
    <View style={{ ...appStyles.rowjustify, height: verticalScale(40) }}>
      <View style={appStyles.row}>
        <TouchableOpacity onPress={onPressNotification}>
          <Image
            style={{
              width: sizeHelper.calWp(52),
              height: sizeHelper.calHp(52),
            }}
            source={images.bell}
            // resizeMode="contain"
          />
          {
            notificationAlert&&(
              <View
              style={{
                width: scale(7.5),
                height: scale(7.5),
                borderRadius: 999,
                backgroundColor: colors.sky,
                marginBottom: verticalScale(3),
                right: scale(-3),
                top: 0,
                bottom: verticalScale(9),
                position: "absolute",
  
  
  
  
              }}
            />

            )
          }
        

          
        </TouchableOpacity>
        {/* <Spacer width={15} />

        <Spacer width={15} />

        <TouchableOpacity>
          <Image
            style={{ width: 23, height: 23 }}
            source={images.edit}
            resizeMode="contain"
          />
        </TouchableOpacity> */}
      </View>

      {/* <CustomText
        text={title || "Chats"}
        color={colors.white}
        size={27}
        fontWeight="700"
        fontFam="SF-Pro-Display-Bold"
      /> */}

      <TouchableOpacity>
        <Image
          style={{ width: sizeHelper.calWp(50), height: sizeHelper.calHp(50) }}
          source={images.appicon}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={onPressSetting}>
        <Image
          style={{ width: sizeHelper.calWp(42), height: sizeHelper.calHp(42) }}
          source={isSearch ? images.search100 : images.setting}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};
export default TopHeader;
