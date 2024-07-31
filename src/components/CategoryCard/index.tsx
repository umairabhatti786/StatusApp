import {
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {images} from '../../assets';
import {colors} from '../../utils/colors';
import CustomText from '../CustomText';
import {font} from '../../utils/font';
import sizeHelper from '../../utils/helper';
import {isiPad} from '../../utils/CommonFun';
export interface cardData1 {
  title: string;
  image: any;
  screen?: string;
}
type Props = {
  data?: cardData1;
  navigation?: any;
  token?: any;
};

const CategoryCard = ({data, navigation, token}: Props) => {
  return (
    <TouchableOpacity
      onPress={() => {
        if (data?.screen == 'OrderHistory') {
          if (!token) {
            navigation.navigate('WelcomeScreen');
          }

          return;
        }
        if (data.screen) {
          navigation.navigate(data?.screen, {isCategory: true});
        }
      }}
      style={style.main}>
      <View style={style.innerContainer}>
        <Image
          source={data?.image}
          style={{
            width: isiPad ? 40 : 33,
            height: isiPad ? 40 : 33,
          }}
        />
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 10,
          width: 75,
          // backgroundColor:"red"
        }}>
        <CustomText
          fontWeight="500"
          size={isiPad ? 15 : 12}
          numberOfLines={2}
          style={{textAlign: 'center'}}
          fontFam={font.montserratMedium}
          text={data?.title}
        />
      </View>
    </TouchableOpacity>
  );
};
export default CategoryCard;

const style = StyleSheet.create({
  main: {
    width: 70,
    height: 86,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  innerContainer: {
    height: isiPad ? 80 : 65,
    width: isiPad ? 80 : 65,
    backgroundColor: colors.white,
    // borderRadius: 12,
    padding: 3,
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: colors.primary35,
    alignItems: 'center',
    // backgroundColor:"red"
  },
});
