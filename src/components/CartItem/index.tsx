import {
  Image,
  Pressable,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { images } from "../../assets";
import { colors } from "../../utils/colors";
import CustomText from "../CustomText";
import { font } from "../../utils/font";
import { useState } from "react";
import { dollarSymbol, isiPad, windowHeight } from "../../utils/CommonFun";
import FastImage from "react-native-fast-image";

interface cartData {
  images?: any;
  title?: string;
  price?: number;
  addon?: string[];
}
type Props = {
  item?: cartData;
  index?: number;
  onDelete?: any;
  onIncrementCart?: any;
  onDecrementCart?: () => void;
  disableIncrement?: boolean;
  Qty?: string;
};

const CartItem = ({
  item,
  onDelete,
  onIncrementCart,
  onDecrementCart,
  disableIncrement,
  Qty,
}: Props) => {
  const [count, setCount] = useState(1);

  return (
    <View
      style={{
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <View>
        <FastImage
          source={{ uri: item.image }}
          style={{
            width: isiPad ? 90 : 76,
            height: isiPad ? 90 : 76,
            borderRadius: 12,
          }}
        />
      </View>
      <View
        style={{
          // flexDirection: "column",
          // justifyContent: "center",
          paddingLeft: 10,
          paddingRight: 20,

          width: isiPad ? "75%" : "55%",
          gap: 5,        }}
      >
        <CustomText
          text={item.name}
          size={isiPad ? 19 : 14}
          fontWeight="500"
          fontFam={font.montserratMedium}
        />
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {item?.addons?.length > 0 && item?.addons !== undefined ? (
            <View>
              <>
                <ScrollView scrollEnabled={false}>
                  {item?.addons?.map((addon, index) => {
                    return (
                      <View key={index}>
                        {addon?.items?.map((item, ind) => {
                          return (
                            <CustomText
                              text={item?.name}
                              size={isiPad ? 15 : 12}
                              fontFam={font.montserratMediumItalic}
                            />
                          );
                        })}
                      </View>
                    );
                  })}
                </ScrollView>
              </>
            </View>
          ) : (
            <>
              <View style={{ height: 40 }}></View>
            </>
          )}
        </View>
      </View>
      {!disableIncrement ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 5,
          }}
        >
          <CustomText
            text={
              dollarSymbol +
              `${item?.priceByQty ? Number(item?.priceByQty).toFixed(2) : "0"}`
            }
            size={isiPad ? 20 : 16}
            color={colors.primary}
            fontWeight="500"
            fontFam={font.montserratMedium}
          />
          <View
            style={{
              flexDirection: "row",

              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={onIncrementCart}
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: isiPad ? 45 : 35,
                width: isiPad ? 45 : 35,
              }}
            >
              <TouchableOpacity
                style={{
                  height: isiPad ? 35 : 25,
                  width: isiPad ? 35 : 25,
                  backgroundColor: colors.primary,
                  borderRadius: 9999,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={onDecrementCart}
              >
                <Image
                  source={item?.quantity > 1 ? images.minus : images.delete}
                  resizeMode="contain"
                  style={{
                    width: isiPad ? 20 : 14,
                    height: isiPad ? 20 : 14,
                  }}
                />
              </TouchableOpacity>
            </TouchableOpacity>
            <View style={{ width: 30, alignItems: "center" }}>
              <CustomText
                text={item?.quantity}
                size={isiPad ? 20 : 16}
                fontWeight="500"
                fontFam={font.montserratMedium}
              />
            </View>

            <TouchableOpacity
              activeOpacity={0.6}
              onPress={onIncrementCart}
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: isiPad ? 45 : 35,
                width: isiPad ? 45 : 35,
              }}
            >
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={onIncrementCart}
                style={{
                  height: isiPad ? 35 : 25,
                  width: isiPad ? 35 : 25,
                  backgroundColor: colors.primary,
                  borderRadius: 9999,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={images.plus}
                  style={{
                    height: isiPad ? 20 : 13,
                    width: isiPad ? 15 : 12,
                  }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View
          style={{
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 5,

            // backgroundColor:"blue",
            height: windowHeight / 10,
          }}
        >
          <CustomText
            text={
              dollarSymbol +
              `${item?.priceByQty ? Number(item?.priceByQty).toFixed(2) : "0"}`
            }
            size={isiPad ? 20 : 16}
            color={colors.primary}
            fontWeight="500"
            fontFam={font.montserratMedium}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: isiPad ? 50 : 40,
                height: isiPad ? 50 : 40,
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 1,
                borderColor: colors.primary,
              }}
            >
              <CustomText
                text={Qty}
                size={isiPad ? 15 : 8}
                fontWeight="500"
                fontFam={font.montserratMedium}
              />
              <CustomText
                text={item?.quantity}
                size={isiPad ? 20 : 16}
                fontWeight="600"
                fontFam={font.montserratMedium}
              />
            </View>
          </View>
        </View>
      )}
    </View>
  );
};
export default CartItem;
