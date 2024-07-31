import {
  Image,
  Platform,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../../utils/colors';
import CustomText from '../CustomText';
import {font} from '../../utils/font';
import {images} from '../../assets';
import FastImage from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';
import {
  getNotificationAlert,
  getToken,
  getUserData,
  setNotificationAlert,
} from '../../redux/reducers/authReducer';
import {scale} from 'react-native-size-matters';
import {useEffect, useState} from 'react';
import {ApiServices} from '../../api/ApiServices';
import {isiPad} from '../../utils/CommonFun';

type HeaderProps = {
  primaryTitle?: string;
  secondaryTitle?: string;
  navigation?: any;
  image?: any;
};

const Header = ({
  primaryTitle,
  secondaryTitle,
  navigation,
  image,
}: HeaderProps) => {
  const notificationAlert = useSelector(getNotificationAlert);
  const token = useSelector(getUserData)?.token;
  const dispatch = useDispatch();
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        // marginTop: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <CustomText
          text={primaryTitle}
          size={isiPad ? 30 : 24}
          fontWeight="500"
          fontFam={font.montserratRegular}
          color={colors.primary}
        />
        <CustomText
          text={secondaryTitle}
          size={isiPad ? 30 : 24}
          fontWeight="400"
          // fontFam={font.montserratMedium}
          color={colors.primary}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: isiPad ? 30 : 10,
        }}>
        <TouchableOpacity
          style={{
            height: 20,
            width: 25,
          }}
          onPress={() => {
            if (!token) {
              navigation.navigate('WelcomeScreen');

              return;
            }
            dispatch(setNotificationAlert(false));
            navigation.navigate('Notifications');
          }}>
            {
             token &&(
              <>

<Image
            source={images.notification}
            style={{height: isiPad ? 30 : 20, width: isiPad ? 30 : 20}}
          />
          {notificationAlert  && (
            <View
              style={{
                width: scale(6),
                height: scale(6),
                backgroundColor: colors.primary,
                borderRadius: scale(10),
                position: 'absolute',
                right: 5,
                top: -2,
              }}
            />
          )}
              </>

             )
            }
         
        </TouchableOpacity>
        <TouchableOpacity
        // disabled={!token}
          onPress={() => {
            navigation && token
              ? navigation.navigate('Profile')
              : navigation.navigate('WelcomeScreen');
          }}
          style={{
            height: isiPad ? 60 : 45,
            width: isiPad ? 60 : 45,
            borderWidth: 2,
            borderColor: colors.primary,
            borderRadius: 9999,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 3,
          }}>
          <FastImage
            source={image ? {uri: image} : images.blankUuser}
            style={{
              height: isiPad ? 55 : 38,
              width: isiPad ? 55 : 38,
              borderRadius: 9999,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Header;
