import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {images} from '../../assets';
import {colors} from '../../utils/colors';
import CustomInput from '../CustomInput';
import {isiPad} from '../../utils/CommonFun';
import {verticalScale} from 'react-native-size-matters';

type Props = {
  placeholder?: string;
  onChangeText?: any;
  navigation?: any;
  textColor?: string;
  filterNotREquired?: boolean;
  value?: any;
};

const SearchBar = ({
  placeholder,
  onChangeText,
  textColor,
  filterNotREquired,
  navigation,
  value,
}: Props) => {
  return (
    <View style={style.main}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          flex: 1,
          backgroundColor: colors.grey1,
          height: isiPad ? verticalScale(30) : 45,
          paddingLeft: 10,
        }}>
        <View style={{flex: 1}}>
          <CustomInput
            value={value}
            placeholder={placeholder}
            textColor={textColor}
            fontSize={isiPad ? 18 : 14}
            height={isiPad ? verticalScale(30) : 47}
            onChangeText={onChangeText}
          />
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.primary,
            height: '100%',
            width: '15%',
          }}>
          <Image
            source={images.search}
            style={{width: isiPad ? 30 : 20, height: isiPad ? 30 : 20}}
          />
        </View>
      </View>
      {!filterNotREquired && (
        <Pressable
          onPress={() => {}}
          style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image source={images.settings} style={style.img} />
        </Pressable>
      )}
    </View>
  );
};
export default SearchBar;

const style = StyleSheet.create({
  main: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginTop: 20,
  },
  img: {width: 23, height: 23},
});
