import { Image, TouchableOpacity, View } from "react-native";
import { images } from "../../assets";
import { colors } from "../../utils/colors";
import CustomText from "../CustomText";
import { font } from "../../utils/font";
import { WINDOW_HEIGHT } from "@gorhom/bottom-sheet";
import { dollarSymbol, windowWidth } from "../../utils/CommonFun";
import { useSelector } from "react-redux";
import { getCartData } from "../../redux/reducers/cartReducer";
import { appStyles } from "../../utils/AppStyles";
import { verticalScale } from "react-native-size-matters";
import FastImage from "react-native-fast-image";
export interface cardData1 {
  title: string;
  description?: string;
  price?: number;
  image?: any;
}
type Props = {
  data?: cardData1;
  onPress?: () => void;
};

const PopularOrder = ({ data, onPress }: Props) => {
  const cartData = useSelector(getCartData);
  let isDisable =
    data?.data?.product_sold_out !== "available" ||
    (data?.data &&
      data?.data?.stock_control === 1 &&
      data?.data?.stock_quantity === 0);

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisable}

      style={{ width: windowWidth / 1.5, marginRight: 15, marginVertical: 10 }}
    >
      <TouchableOpacity
      disabled={isDisable}
        onPress={onPress}
        activeOpacity={0.6}
        style={{
          position: "absolute",
          right: -10,
          top: -10,
          zIndex: 9999,
          padding: 2,
          opacity:isDisable?0.5:1
        }}
      >
        <View
          style={{
            height: 30,
            width: 30,
            backgroundColor: colors.primary,
            borderRadius: 9999,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={images.plus}
            style={{ width: 13, height: 13 }}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>
      <View
        style={{
          padding: 10,
          flexDirection: "row",
          backgroundColor: colors.grey,
        }}
      >
        <View>
          <FastImage
            source={{ uri: data?.image }}
            style={{ width: 70, height: 80 ,opacity:isDisable?0.5:1 }}
          />
        </View>
        <View
          style={{
            padding: 3,
            justifyContent: "space-between",
            width: WINDOW_HEIGHT / 6.5,
          }}
        >
          <View style={{ marginLeft: 5 }}>
            <View style={{height:verticalScale(45)}}>
            <CustomText
              text={data?.name}
              fontWeight="500"
              numberOfLines={1}
              fontFam={font.montserratMedium}
              style={{opacity:isDisable?0.5:1}}
              size={verticalScale(11)}
            />
            <CustomText
              text={data?.description}
              fontFam={font.montserratRegular}
              numberOfLines={2}
              size={verticalScale(9)}
              style={{ marginTop: 2,opacity:isDisable?0.5:1 }}
              color={colors.darkBlack}
            />

            </View>
          

            <View style={appStyles.row}>
              {
                isDisable?(
                  <>
                   {isDisable && (
                <CustomText
                  // style={{ marginLeft: 5 }}
                  // fontFam={font.montserratSemiBold}
                  color={"red"}
                  size={verticalScale(8)}
                  text={"OUT OF STOCK"}
                />
              )}
                  </>
                ):(
                  <>
                    {data?.discounted_price > 0 && (
                <CustomText
                  style={{
                    marginLeft: data?.discounted_price > 0 ? 0 : 5,
                    textDecorationLine: "line-through",
                  }}
                  // fontFam={font.montserratSemiBold}
                  color={colors.grey100}
                  size={verticalScale( 8 )}
                  text={dollarSymbol + `${data.discounted_price}`}
                />
              )}

              <CustomText
                style={{
                  marginLeft: data?.discounted_price > 0 ? 5 : 0,
                  opacity: isDisable ? 0.5 : 1,
                }}
                // fontFam={font.montserratSemiBold}
                // color={isDisable&&"red"}

                size={verticalScale(8)}
                text={dollarSymbol + `${data.price}`}
              />
                  </>
                )
              }
            
             
            </View>

            {/* <CustomText
              text={dollarSymbol + `${data?.price}`}
              size={16}
              fontWeight="500"
              fontFam={font.montserratMedium}
              color={colors.primary}
            /> */}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default PopularOrder;
