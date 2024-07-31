import {
  Image,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { images } from "../../assets";
import { colors } from "../../utils/colors";
import CustomText from "../CustomText";
import { font } from "../../utils/font";
import { dollarSymbol, isiPad, windowWidth } from "../../utils/CommonFun";
import FastImage from "react-native-fast-image";
import { useState } from "react";
import { scale, verticalScale } from "react-native-size-matters";
import { appStyles } from "../../utils/AppStyles";
const Card = ({ data, onPress, disabled }: any) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  let carouselDots = data?.slice?.(0, 5);
  const onScroll = (x: any) => {
    const xPos =
      x.nativeEvent?.contentOffset?.x < 0 ? 0 : x.nativeEvent?.contentOffset?.x;
    const current = Math.floor(xPos / 200);
    if (current > 4) {
      setSelectedIndex(4);
      return;
    }
    setSelectedIndex(current);
  };

  const renderCardData = ({ item, index }) => {
    let isDisable =
      item?.data?.product_sold_out !== "available" ||
      (item?.data &&
        item?.data?.stock_control === 1 &&
        item?.data?.stock_quantity === 0);

    return (
      <TouchableOpacity
        onPress={() => onPress(item)}
        disabled={isDisable}
        activeOpacity={0.6}
        style={styles.mainItem}
      >
        <View style={styles.innerContainer}>
          <View>
            <FastImage
              resizeMode="cover"
              source={{ uri: item.image }}
              style={{
                width:  isiPad?scale(60): scale(80),
                height:isiPad?scale(60): scale(80),
                opacity: isDisable ? 0.5 : 1,
            
              }}
            />
          </View>
          <View
            style={{
              // paddingVertical: 5,
              justifyContent: "space-between",
              flex: 1,
              paddingLeft: 5,
            }}
          >
            <View style={{ width: "90%", marginLeft: scale(5), height: "78%" }}>
              <View></View>
              <CustomText
                text={item?.name}
                fontFam={font.montserratMedium}
                fontWeight="500"
                style={{ opacity: isDisable ? 0.5 : 1 }}
                numberOfLines={1}

                size={ isiPad?verticalScale(13): verticalScale(11)}
              />
              <CustomText
                text={item?.description}
                // fontFam={font.montserratMedium}
                fontWeight="400"
                lineHeight={isiPad? 33:15}
                style={{ marginTop: 4, opacity: isDisable ? 0.5 : 1 }}
                numberOfLines={3}
                size={ isiPad?verticalScale(12): verticalScale(9)}

              />
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: isiPad?verticalScale(5): 0,
              }}
            >
              <View>
                {isDisable ? (
                  <CustomText
                    style={{ marginLeft: 5 }}
                    // fontFam={font.montserratSemiBold}
                    color={"red"}
                    size={ isiPad?verticalScale(12): verticalScale(9)}
                    text={"OUT OF STOCK"}
                  />
                ) : (
                  <>
                    <View style={appStyles.row}>
                      {item?.discounted_price > 0 && (
                        <CustomText
                          style={{
                            marginLeft: scale(5),
                            textDecorationLine: "line-through",
                          }}
                          color={colors.grey100}
                          size={verticalScale(isDisable ? 9 : 11)}
                          text={dollarSymbol + `${ Number( item.discounted_price).toFixed(2)}`}
                        />
                      )}

                      <CustomText
                        style={{ marginLeft: 5, opacity: isDisable ? 0.5 : 1 }}
                        // fontFam={font.montserratSemiBold}
                        // color={isDisable&&"red"}

                        size={verticalScale(isDisable ? 9 : 11)}
                        text={dollarSymbol + `${ Number( item.price).toFixed(2)}`}
                      />
                    </View>
                  </>
                )}

                {/* <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 5,
                    marginBottom: 3,
                  }}
                >
                  <Image
                    source={images.clock}
                    style={{ width: 14, height: 14 }}
                  />

                  <CustomText
                    style={{ fontWeigth: 700 }}
                    fontFam={font.montserratSemiBold}
                    text={data.delivery_time}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    //   justifyContent: "space-between",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  <Image
                    source={images.delivery}
                    style={{ width: 14, height: 14 }}
                  />
                  <CustomText
                    style={{ marginTop: 2, fontWeigth: 700 }}
                    numberOfLines={1}
                    fontFam={font.montserratSemiBold}
                    text={
                      typeof data.delivery_cost == "number"
                        ? `${data.delivery_cost} ${dollarSymbol} `
                        : data.delivery_cost
                    }
                  />
                </View> */}
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <FlatList
        onScroll={onScroll}
        data={data}
        horizontal
        contentContainerStyle={{ paddingLeft: 20 }}
        showsHorizontalScrollIndicator={false}
        renderItem={renderCardData}
      />

      <View style={styles.dotMain}>
        {carouselDots?.map((a, index) => {
          return (
            <View
              key={index}
              style={{
                ...styles.dontContainer,
                opacity: selectedIndex == index ? 1 : 0.25,
              }}
            />
          );
        })}
      </View>
    </View>
  );
};
export default Card;

const styles = StyleSheet.create({
  mainItem: { width: windowWidth / 1.3, marginRight: 15, marginVertical: 10 },
  categoriesContainer: {
    justifyContent: "center",
    marginTop: "8%",
    marginBottom: "5%",
  },
  dotMain: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    marginTop: 20,
  },
  dontContainer: {
    width: 10,
    height: 10,
    backgroundColor: colors.primary,
    borderRadius: 9999,
  },

  innerContainer: {
    borderWidth: 1.5,
    borderColor: colors.primary35,
    paddingVertical: scale(7),
    backgroundColor:colors.white,
    flexDirection: "row",
    flex: 1,
    paddingLeft: scale(7),
    // paddingRight: 13,
    // borderRadius:10,
    //   elevation: 3,
    // shadowColor: colors.lightBlack,
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.3,
    // shadowRadius: 2,
  },
});
