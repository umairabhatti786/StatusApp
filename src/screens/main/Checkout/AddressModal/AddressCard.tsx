import {
  Image,
  Platform,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../../../../utils/colors';
import CustomText from '../../../../components/CustomText';
import {font} from '../../../../utils/font';
import {images} from '../../../../assets';
import CustomButton from '../../../../components/CustomButton';
import CustomModal from '../../../../components/CustomModal';
import LocationCard from '../../../../components/LocationCard';
import CustomLine from '../../../../components/CustomLine';
import {appStyles} from '../../../../utils/AppStyles';
import RadioButton from '../../../../components/RadioButton';
import {Spacer} from '../../../../components/Spacer';
import {isiPad} from '../../../../utils/CommonFun';
import {scale} from 'react-native-size-matters';
interface data {}
type Props = {
  item?: any;
  onPress?: () => void;
  seletctedAddress?: any;
  children?: any;
};

const AddressCard = ({onPress, item, seletctedAddress, children}: Props) => {
  console.log('Develoeonfv', seletctedAddress);
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={!item.delivery_is_available}
      activeOpacity={0.6}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        // backgroundColor:"red"
      }}>
      <View
        style={{
          width: isiPad ? scale(10) : '10%',
          marginBottom: '5%',
          alignItems: 'flex-start',
        }}>
        <RadioButton
          onActivePress={onPress}
          disabled={!item?.delivery_is_available}
          active={seletctedAddress?.id == item?.id ? true : false}
          //   setActive={setActive}
          style={{marginTop: '20%'}}
        />
      </View>
      <View
        style={{
          width: '68%',
        }}>
        <CustomText
          text={item.name}
          size={isiPad ? 18 : 14}
          numberOfLines={2}
          fontWeight="500"
          fontFam={font.montserratMedium}
          color={colors.primary}
        />
        <Spacer height={3} />
        <CustomText
          text={item?.address}
          size={isiPad ? 15 : 12}
          color={colors?.lightBlack}
          numberOfLines={2}
          fontWeight="400"
          style={{width: '100%'}}
        />
        {!item.delivery_is_available && (
          <CustomText
            text={"Beyond restaurant's delivery radius."}
            color={'red'}
            size={isiPad ? 15 : 12}
            numberOfLines={2}
            fontWeight="400"
            style={{width: '100%', marginTop: 3}}
          />
        )}
      </View>

      <View
        style={{
          width: '25%',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
          paddingRight: 10,
        }}>
        {children}
      </View>
    </TouchableOpacity>
  );
};
export default AddressCard;
