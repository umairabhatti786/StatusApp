import {Image, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import FastImage from 'react-native-fast-image';
import {scale, verticalScale} from 'react-native-size-matters';
import {images} from '../../../assets';
import {colors} from '../../../utils/colors';
import CustomText from '../../../components/CustomText';
import {font} from '../../../utils/font';
import {appStyles} from '../../../utils/AppStyles';
import {dollarSymbol, isiPad} from '../../../utils/CommonFun';
import {setProductsDetails} from '../../../redux/reducers/productDetailReducer';
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
  onOrderPress?: () => void;
  setIsModalVisible?: React.Dispatch<React.SetStateAction<boolean>>;
};

const OrderHistoryCard = ({
  data,
  lastIndex,
  setIsModalVisible,
  navigation,
  cartData,
  onOrderPress,
}: Props) => {
  const dispatch = useDispatch();
  const cartExist = cartData?.map(it => it?.id).includes(data?.id);
  const products = data?.products?.slice(0, 3);


  const onCLick = () => {
    console.log('CLIKED');
    setIsModalVisible && setIsModalVisible(true);
  };
  let isDisable =
    data?.data?.product_sold_out !== 'available' ||
    (data?.data &&
      data?.data?.stock_control === 1 &&
      data?.data?.stock_quantity === 0);
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onOrderPress}

      //   onPress={() => {
      //     if (isDisable) {
      //       return;
      //     }
      //     dispatch(setProductsDetails(data));
      //     navigation && navigation.navigate("OrderDetailCard");
      //   }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: '3%',
          alignItems: 'center',
          paddingHorizontal: 20,
          backgroundColor: colors.white,
        }}>
        <View style={{width: '65%'}}>
          <View>
            <CustomText
              text={data?.branch?.name}
              fontWeight={'500'}
              color={colors.primary}
              numberOfLines={2}
              
              fontFam={font.montserratMedium}
              size={verticalScale(11)}
            />
            <View style={{flexWrap: 'nowrap'}}>
              <View
                style={{
                  ...appStyles.row,
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  width: '100%',
                  height: 40,
                }}>
                {products.slice(0, 2).map((item, index) => (
                  <View style={{...appStyles.row}} key={index}>
                    <CustomText
                      text={`${item?.name}`}
                      numberOfLines={2}
                      fontWeight="00"
                      size={verticalScale(8)}
                      color={'#343a40'}
                    />
                    {index < 1 && (
                      <CustomText
                        text={','}
                        numberOfLines={2}
                        fontWeight="00"
                        size={verticalScale(8)}
                        color={'#343a40'}
                      />
                    )}
                  </View>
                ))}
                {products.length > 2 && (
                  <CustomText
                    text={'...'}
                    numberOfLines={2}
                    fontWeight="500"
                    size={verticalScale(8)}
                    color={'#343a40'}
                  />
                )}
              </View>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              // marginTop: 5,
            }}>
            <View>
              <CustomText
                style={
                  {
                    // marginLeft: data?.discounted_price > 0 ? 5 : 0,
                    // opacity: isDisable ? 0.5 : 1,
                  }
                }
                size={verticalScale(11)}
                text={dollarSymbol + `${data.total}`}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.white,
          }}>
          <FastImage
            source={{uri: data?.branch?.icon}}
            style={{
              width: isiPad ? 150 : 110,
              height: isiPad ? 120 : 75,
              //   opacity: isDisable ? 0.5 : 1,
            }}
          />
          <TouchableOpacity
            activeOpacity={0.6}
            disabled={isDisable}
            onPress={() => {
              dispatch(setProductsDetails(data));
              navigation && navigation.navigate('OrderDetailCard');
            }}
            style={{
              width: isiPad ? 35 : 25,
              height: isiPad ? 35 : 25,
              backgroundColor: cartExist ? colors.primary : colors.white,
              position: 'absolute',
              bottom: -8,
              right: -10,
              borderRadius: 9999,
              justifyContent: 'center',
              alignItems: 'center',
              //   opacity: isDisable ? 0.8 : 1,
              ...appStyles?.elevation,
            }}>
            {cartExist ? (
              <>
                <CustomText
                  text={'1'}
                  size={isiPad ? 19 : 15}
                  color={colors.white}
                  fontWeight={'800'}
                  fontFam={font.montserratMedium}
                />
              </>
            ) : (
              <Image
                source={images.plusBlue}
                style={{
                  resizeMode: 'contain',
                  width: isiPad ? 17 : 12,
                  height: isiPad ? 17 : 12,
                }}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
      {/* {!lastIndex && ( */}
      <View
        style={{
          height: 2,
          backgroundColor: colors.primary,
          opacity: 0.25,
          marginVertical: 2,
        }}
      />
      {/* )} */}
    </TouchableOpacity>
  );
};
export default OrderHistoryCard;
