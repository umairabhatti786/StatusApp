import {
  View,
  StyleSheet,
  Animated,
  FlatList,
  Image,
  Text,
  Pressable,
  Platform,
  TouchableOpacity
} from "react-native";
import React, { useEffect, useState } from "react";
import LinearGradient from "react-native-linear-gradient";
import { colors } from "../../../../utils/colors";
import OrderFeatureCard from "../../../../components/OrderFeatureCard";
import { OrderCards, featureCardData } from "../../../../utils/Data";
import { images } from "../../../../assets";
import { font } from "../../../../utils/font";
import CustomText from "../../../../components/CustomText";
import Card from "../../../../components/Card";
import OrderCard from "../../../../components/OrderCard";
import RadioButton from "../../../../components/RadioButton";
import { dollarSymbol, isiPad } from "../../../../utils/CommonFun";
import Checkbox from "../../../../components/Checkbox";
import VerifiedScreen from "../../../auth/VerifiedScreen";
import { scale, verticalScale } from "react-native-size-matters";
type Props = {
  onPressAddons?: () => void;
  item?: any;
  addons?: any;
  boxColor?:any
};
const OrdersAddon = ({ item, addons, onPressAddons,boxColor }: Props) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 999,

      }}
    >
      <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPressAddons}

        style={{
          flexDirection: "row",
          zIndex: 999,
          paddingVertical: 15,
          // backgroundColor:"red"

        }}
      >
        {addons.type == 2 ? (
          <>
            <Checkbox
              isChecked={item?.selected}
              onPress={onPressAddons}
              backgroundColor={boxColor}
              disabled={item?.addon_sold_out !== "available"}
            />
          </>
        ) : (
          <>
            <TouchableOpacity activeOpacity={0.6} onPress={onPressAddons}>
              <RadioButton
                width={ isiPad?30: 22}
                height={isiPad?30: 22}
                boxColor={boxColor}
                // backgroundColor={BoxColor}

                disabled={item?.addon_sold_out !== "available"}
                active={item?.selected}
                onActivePress={onPressAddons}
              />
            </TouchableOpacity>
          </>
        )}
        <TouchableOpacity
          activeOpacity={0.6}
          disabled={item?.addon_sold_out !== "available"}
          onPress={onPressAddons}
          style={{ flexDirection: "row" }}
        >
          <CustomText
          fontWeight={"500"}
            text={item?.name}
            // fontFam={font.montserratMedium}
            color={
              item?.addon_sold_out !== "available"
                ? colors.grey100
                : colors.lightBlack
            }
            size={isiPad? 18:14}

            style={{
              marginLeft: scale(10),
              textDecorationLine:
                item?.addon_sold_out !== "available" ? "line-through" : null,
            }}
          />
        </TouchableOpacity>
      </TouchableOpacity>
      <View>
        <CustomText
                  fontWeight={"500"}

          text={"+ " + dollarSymbol + `${Number( item?.price).toFixed(2)}`}
          // fontFam={font.montserratMedium}
          color={
            item?.addon_sold_out !== "available"
              ? colors.grey100
              : colors.lightBlack
          }
 
          size={isiPad? 18:14}

          style={{
            marginLeft: 10,
            textDecorationLine:
              item?.addon_sold_out !== "available" ? "line-through" : null,
          }}
        />
      </View>
    </View>
  );
};

export { OrdersAddon };
