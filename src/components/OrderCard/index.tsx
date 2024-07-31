import { Image, TouchableOpacity, View } from "react-native";
import { images } from "../../assets";
import { colors } from "../../utils/colors";
import CustomText from "../CustomText";
import { font } from "../../utils/font";
import { appStyles } from "../../utils/AppStyles";
import { dollarSymbol, isiPad } from "../../utils/CommonFun";
import { useDispatch, useSelector } from "react-redux";
import { setProductsDetails } from "../../redux/reducers/productDetailReducer";
import { getCartData } from "../../redux/reducers/cartReducer";
import FastImage from "react-native-fast-image";
import { verticalScale } from "react-native-size-matters";
import * as Animatable from "react-native-animatable";

interface data {
  image?: any;
  title?: string;
  subTitle?: string;
  price?: number;
}
type Props = {
  data?: data;
  navigation?: any;
  lastIndex?: boolean;
  cartData?: any;
  setIsModalVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  index?:any,
  sections?:[]
};

const OrderCard = ({
  data,
  lastIndex,
  setIsModalVisible,
  navigation,
  cartData,
  index,
  sections
}: Props) => {
  const dispatch = useDispatch();
  // const cardData=useSelector(getCartData)
  const cartExist = cartData?.map((it) => it?.id).includes(data?.id);

console.log("lastIndex",lastIndex)
  const onCLick = () => {
    console.log("CLIKED");
    setIsModalVisible && setIsModalVisible(true);
  };
  let isDisable =
    data?.data?.product_sold_out !== "available" ||
    (data?.data &&
      data?.data?.stock_control === 1 &&
      data?.data?.stock_quantity === 0);
  return (
    <Animatable.View
    duration={1000}
    animation={"fadeIn"}
    delay={index * 300}
  >
       <TouchableOpacity
      activeOpacity={isDisable ? 1 : 0.6}
      onPress={() => {
        if (isDisable) {
          return;
        }
        dispatch(setProductsDetails(data));
        navigation && navigation.navigate("OrderDetailCard");
      }}
      style={{}}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: "3%",
          alignItems: "center",
          paddingHorizontal: 20,
          backgroundColor: colors.white,
        }}
      >
        <View style={{ width: "65%" }}>
          <View style={{ height: verticalScale(45) }}>
            <CustomText
              text={data?.name}
              fontWeight={"500"}
              numberOfLines={2}
              fontFam={font.montserratMedium}
              size={verticalScale(11)}
            />
            <CustomText
              text={data?.description}
              numberOfLines={2}
              style={{ marginTop: 2, opacity: isDisable ? 0.5 : 1 }}
              size={verticalScale(9)}
              color={colors.lightBlack}
            />
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              // marginTop: 5,
            }}
          >
            <View>
              <View style={appStyles.row}>
                {data?.discounted_price > 0 && (
                  <CustomText
                    style={{ textDecorationLine: "line-through" }}
                    color={colors.grey100}
                    size={verticalScale(isDisable ? 9 : 11)}
                    text={dollarSymbol + `${ Number(data.discounted_price).toFixed(2)}`}
                  />
                )}

                <CustomText
                  style={{
                    marginLeft: data?.discounted_price > 0 ? 5 : 0,
                    opacity: isDisable ? 0.5 : 1,
                  }}
                  size={verticalScale(isDisable ? 9 : 11)}
                  text={dollarSymbol + `${Number(data.price).toFixed(2)}`}
                />
                {isDisable && (
                  <CustomText
                    style={{ marginLeft: 5 }}
                    color={"red"}
                    size={verticalScale(9)}
                    text={"OUT OF STOCK"}
                  />
                )}
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: colors.white,
          }}
        >
          <FastImage
            source={{ uri: data?.image }}
            style={{
              width: isiPad?150:  110,
              height: isiPad?120: 75,
              opacity: isDisable ? 0.5 : 1,
            }}
          />
          <TouchableOpacity
            activeOpacity={0.6}
            disabled={isDisable}
            onPress={() => {
              dispatch(setProductsDetails(data));
              navigation && navigation.navigate("OrderDetailCard");
            }}
            style={{
              width: isiPad?35:  25,
              height:isiPad?35:  25,
              backgroundColor: cartExist ? colors.primary : colors.white,
              position: "absolute",
              bottom: -8,
              right: -10,
              borderRadius: 9999,
              justifyContent: "center",
              alignItems: "center",
              opacity: isDisable ? 0.8 : 1,
              ...appStyles?.elevation,
            }}
          >
            {cartExist ? (
              <>
                <CustomText
                  text={"1"}
                  size={ isiPad?19: 15}
                  color={colors.white}
                  fontWeight={"800"}
                  fontFam={font.montserratMedium}
                />
              </>
            ) : (
              <Image
                source={images.plusBlue}
                style={{
                  resizeMode: "contain",
                  width: isiPad?18:  12,
                  height:isiPad?18:  12,
                }}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
      {/* {!lastIndex && ( */}
      {/* {index === sections.data.length - 1 ?
        <View
        style={{
          height: 7,
          backgroundColor: colors.primary35,
          opacity: 0.25,
          marginVertical: 2,
          marginTop:15
        }}
      />
      :( */}
      {
        !lastIndex?(
          <View
          style={{
            height: 0.8,
            backgroundColor: colors.primary,
            opacity: 0.25,
            marginHorizontal: 20,
            marginVertical:5
            }}
        />

        ):(
          <View
          style={{
            height: 12,
            backgroundColor: colors.grey100,
            opacity: 0.25,
            marginVertical:5
            }}
        />
        )
      }

      

      {/* )} */}

     
      {/* )} */}
    </TouchableOpacity>
    </Animatable.View>
    
 
  );
};
export default OrderCard;
