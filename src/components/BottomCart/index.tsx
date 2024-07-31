import {
  Image,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { appStyles } from "../../utils/AppStyles";
import { colors } from "../../utils/colors";
import CustomText from "../CustomText";
import { font } from "../../utils/font";
import { images } from "../../assets";
import { Spacer } from "../Spacer";
import { dollarSymbol, isiPad } from "../../utils/CommonFun";
import { scale } from "react-native-size-matters";

const BottomCart = ({
  data,
  onPress,
  amount,
  quantity,
  disabled,
  onDecrement,
  onIncrement,
  onAddCart,
  disableCart,
  backgroundColor,
  mainBackgroundColor,
  addCartTitle,
}: any) => {
  return (
    <View
      style={{
        ...styles.main,
        backgroundColor: mainBackgroundColor || colors.primary,
      }}
    >
      <TouchableOpacity
        onPress={onAddCart}
        // disabled={disableCart}
        style={{
          ...appStyles.row,
          height: "100%",
          width: "65%",
        }}
      >
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={onAddCart}
          disabled={disableCart}
        >
          <CustomText
            fontWeight="500"
      
            size={isiPad? 22:18}

            color={colors.white}
            fontFam={font.montserratMedium}
            text={addCartTitle}
          />
        </TouchableOpacity>
        <Spacer width={5} />

        <CustomText
          text={dollarSymbol + `${amount}`}
          size={isiPad? 22:18}

          fontWeight="500"
          color={colors.white}
          fontFam={font.montserratMedium}
        />
      </TouchableOpacity>

      <View
        style={{
          flexDirection: "row",
          gap: isiPad?20:  10,
          justifyContent: "space-between",
          alignItems: "center",
          height: "100%",
        }}
      >
        <TouchableOpacity
          activeOpacity={0.6}
          disabled={disabled}
          onPress={onDecrement}
          style={styles.btnContainer}
        >
          <TouchableOpacity
            disabled={disabled}
            style={{
              height: isiPad?40:  27,
              width: isiPad?40:  27,
              backgroundColor: backgroundColor || colors.white,
              borderRadius: 9999,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={onDecrement}
          >
            <Image
              source={images.minus}
              resizeMode="contain"
              style={{
                width: 14,
                tintColor: colors.primary,
              }}
            />
          </TouchableOpacity>
        </TouchableOpacity>

        <View style={{ alignItems: "center" }}>
          <CustomText
            text={quantity}
            size={isiPad?20: 16}
            fontWeight="600"
            color={colors.white}
            fontFam={font.montserratMedium}
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={onIncrement}
          style={styles.btnContainer}
        >
          <TouchableOpacity
            style={{
              height: isiPad?40:  27,
              width: isiPad?40:  27,
              backgroundColor: colors.white,
              borderRadius: 9999,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={onIncrement}
          >
            <Image
              source={images.plus}
              style={{
                height:isiPad?18: 13,
                width:isiPad?17: 12,
                tintColor: colors.primary,
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default BottomCart;

const styles = StyleSheet.create({
  main: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: isiPad?140:  80,
    paddingHorizontal: 15,
    paddingBottom:  isiPad?70:15,
    // padding:10
  },
  btnContainer: {
    width: 40,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "blue",
  },
});
