import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import {appStyles} from '../../../utils/AppStyles';
import {colors} from '../../../utils/colors';
import CustomText from '../../../components/CustomText';
import {font} from '../../../utils/font';
import {images} from '../../../assets';
import InfoHeader from '../../../components/InfoHeader';
import QRCode from 'react-native-qrcode-svg';
import CustomButton from '../../../components/CustomButton';
import {useSelector} from 'react-redux';
import {getLocalizeFile} from '../../../redux/reducers/localizeReducer';
import {getUserData} from '../../../redux/reducers/authReducer';
import {isiPad, windowHeight, windowWidth} from '../../../utils/CommonFun';
import {scale, verticalScale} from 'react-native-size-matters';
type Props = {
  navigation: any;
};

const QrScreen = ({navigation}: Props) => {
  const localize: any = useSelector(getLocalizeFile);
  const userData = useSelector(getUserData);
  console.log('qCoder', userData?.qr_code);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        backgroundColor: colors.white,
      }}
      style={{
        backgroundColor: colors.white,
        flex: 1,
      }}>
      <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
        <StatusBar barStyle={'dark-content'} backgroundColor={'#fff'} />
        <View style={{...appStyles.mainContainer, gap: 20}}>
          <View>
            <InfoHeader />
          </View>
          {/* Starting */}
          <View
            style={{
              alignItems: 'center',
            }}>
            <CustomText
              text={localize?.qr_code_title}
              size={isiPad ? 22 : 18}
              style={{textAlign: 'center'}}
              fontWeight="500"
              color={colors.primary}
            />
          </View>
          {/* Starting QR */}
          <View
            style={{
              alignItems: 'center',
              marginVertical: verticalScale(20),
            }}>
            {!userData?.token ? (
              <CustomButton
                text={'Sign In / Sign Up'}
                size={isiPad ? 20 : 16}
                fontWeight="600"
                height={isiPad ? verticalScale(35) : 55}
                borderRadius={999}
                width="60%"
                onPress={() => navigation.navigate('Login')}
              />
            ) : (
              <>
                <View
                  style={{
                    width: isiPad ? scale(120) : windowWidth / 1.8,
                    height: isiPad ? scale(120) : windowHeight / 4,
                    borderColor: colors.primary,
                    borderWidth: 1.5,
                    backgroundColor: colors.white,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {userData?.qr_code ? (
                    <QRCode
                      value={userData?.qr_code}
                      logoBackgroundColor="transparent"
                      size={isiPad ? scale(110) : 210}
                    />
                  ) : (
                    <CustomText
                      text={'Something went wrong'}
                      size={14}
                      style={{textAlign: 'center'}}
                      fontWeight="500"
                      color={colors.primary}
                    />
                  )}
                </View>
              </>
            )}
          </View>
          {/* Below QR */}
          <View
            style={{
              backgroundColor: colors.grey,
              padding: scale(15),
            }}>
            <CustomText
              text={localize?.qr_code_how_it_works_title}
              size={isiPad ? 20 : 14}
              fontWeight="500"
              fontFam={font.montserratMedium}
              color={colors.primary}
              style={{marginBottom: verticalScale(5)}}
            />
            <CustomText
              text={localize?.qr_code_how_it_works_description}
              size={isiPad ? 15 : 12}
              color={colors.lightBlack}
            />
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};
export default QrScreen;
