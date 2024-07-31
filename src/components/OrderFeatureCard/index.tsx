import {
  Image,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {colors} from '../../utils/colors';
import CustomText from '../CustomText';
import {font} from '../../utils/font';
import {appStyles} from '../../utils/AppStyles';
import {useState} from 'react';
import {
  dollarSymbol,
  isiPad,
  windowHeight,
  windowWidth,
} from '../../utils/CommonFun';
import {Spacer} from '../Spacer';
import FastImage from 'react-native-fast-image';
import {verticalScale} from 'react-native-size-matters';
import {isPlain} from '@reduxjs/toolkit';

const OrderFeatureCard = ({data, onPress}: any) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  let carouselDots = data?.slice?.(0, 5);
  const onScroll = (x: any) => {
    const xPos =
      x.nativeEvent?.contentOffset?.x < 0 ? 0 : x.nativeEvent?.contentOffset?.x;
    console.log();
    const current = Math.floor(xPos / 100);
    if (current > 4) {
      setSelectedIndex(4);
      return;
    }
    setSelectedIndex(current);
  };

  const renderFeatureCard = ({item, index}) => {
    let isDisable =
      item?.data?.product_sold_out !== 'available' ||
      (item?.data &&
        data?.data?.stock_control === 1 &&
        item?.data?.stock_quantity === 0);
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        disabled={isDisable}
        onPress={() => onPress(item)}
        style={{
          width: isiPad ? windowWidth / 4.5 : 145,
          // height: 190,
          marginRight: 20,
          marginVertical: 10,
          borderWidth: 1.5,
          borderColor: colors.primary35,
          backgroundColor: colors.white,
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 10,
          }}>
          <FastImage
            source={{uri: item?.image}}
            style={{
              width: isiPad ? windowWidth / 5 : 125,
              height: isiPad ? windowHeight / 8 : 110,
              opacity: isDisable ? 0.5 : 1,
            }}
          />
        </View>
        <View
          style={{
            paddingHorizontal: 13,
            paddingVertical: 10,
          }}>
          <CustomText
            text={item?.name}
            fontFam={font.montserratMedium}
            fontWeight="500"
            style={{opacity: isDisable ? 0.5 : 1}}
            numberOfLines={2}
            size={verticalScale(10)}
          />
          <Spacer height={4} />
          {isDisable ? (
            <CustomText
              // style={{marginLeft:5, }}
              // fontFam={font.montserratSemiBold}
              color={'red'}
              size={verticalScale(9)}
              text={'OUT OF STOCK'}
            />
          ) : (
            <View>
              {item?.discounted_price > 0 && (
                <CustomText
                  style={{
                    textDecorationLine: 'line-through',
                    opacity: isDisable ? 0.5 : 1,
                  }}
                  // fontFam={font.montserratSemiBold}
                  color={colors.grey100}
                  size={isiPad ? 15 : 12}
                  text={
                    dollarSymbol + `${Number(item.discounted_price).toFixed(2)}`
                  }
                />
              )}

              <CustomText
                style={{opacity: isDisable ? 0.5 : 1}}
                // fontFam={font.montserratSemiBold}
                // color={isDisable&&"red"}

                size={isiPad ? 15 : 12}
                text={dollarSymbol + `${Number(item.price).toFixed(2)}`}
              />
            </View>
          )}

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
        contentContainerStyle={{paddingLeft: 20}}
        showsHorizontalScrollIndicator={false}
        renderItem={renderFeatureCard}
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
export default OrderFeatureCard;

const styles = StyleSheet.create({
  mainItem: {width: 300, marginRight: 15, marginVertical: 10},
  categoriesContainer: {
    justifyContent: 'center',
    marginTop: '8%',
    marginBottom: '5%',
  },
  dotMain: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
    paddingVertical: 10,
    flexDirection: 'row',
    flex: 1,
    paddingLeft: 7,
    paddingRight: 13,
  },
});
