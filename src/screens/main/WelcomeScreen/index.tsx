import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  SafeAreaView,
} from 'react-native';
import CustomText from '../../../components/CustomText';
import {colors} from '../../../utils/colors';
import {font} from '../../../utils/font';
import CustomButton from '../../../components/CustomButton';
import {Spacer} from '../../../components/Spacer';
import {images} from '../../../assets';
import {isiPad, windowHeight, windowWidth} from '../../../utils/CommonFun';
import {scale, verticalScale} from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import { getLocalizeFile } from '../../../redux/reducers/localizeReducer';

const WelcomeScreen = ({navigation}: any) => {
  const localize:any=useSelector(getLocalizeFile)
  return (
    <SafeAreaView style={{flex: 1}}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButtonContainer}>
        <Image
          source={images.backArrow}
          resizeMode="contain"
          style={isiPad ? styles.isPadBackArrowIcon : styles.backArrowIcon}
        />
      </TouchableOpacity>

      <View
        style={{
          flex: 1,
          alignItems: 'center',
          paddingTop: isiPad ? '30%' : '40%',
        }}>
        <View style={styles.logoContainer}>
          <Image
            source={images.logo}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        {/* "welcome_title": "Welcome to Loyalty!",
  "welcome_sign_in_sign_up_button": "Sign In / Sign Up", */}

        <View style={{paddingTop: '30%', alignItems: 'center', width: '100%'}}>
          <CustomText
            text={localize?.welcome_title}
            size={isiPad ? 30 : 20}
            fontWeight="700"
            // lineHeight={25}
            fontFam={font.montserratBold}
            color={colors.primary}
          />

          <Spacer height={20} />

          <CustomButton
            text={localize?.welcome_sign_in_sign_up_button}
            size={isiPad ? 20 : 16}
            fontWeight="600"
            height={isiPad ? verticalScale(35) : 55}
            borderRadius={999}
            width="60%"
            onPress={() => navigation.navigate('Login')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  heading: {
    lineHeight: 48,
    marginTop: 24,
  },
  bottomText: {
    lineHeight: 24,
    marginTop: 16,
    textAlign: 'center',
  },

  logoContainer: {
    width: windowWidth / 5,
    height: windowHeight / 11,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  image: {
    width: '60%',
    height: '60%',
  },

  backButtonContainer: {
    width: 50,
    height: 80,
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  backArrowIcon: {
    width: 32,
    height: 32,
  },

  isPadBackArrowIcon: {
    width: 50,
    height: 50,
  },
});
