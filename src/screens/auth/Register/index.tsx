import React from 'react';
import { Dimensions, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { appStyles } from '../../../utils/AppStyles';
import LogoContainer from '../../../components/LogoContainer';
import CustomText from '../../../components/CustomText';
import RegisterForm from './RegisterForm';
import SocialButton from '../../../components/SocialButton';
import { images } from '../../../assets';
import { useNavigation } from '@react-navigation/native';
import SsoAuth from '../../../components/SsoAuth';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../../utils/colors';
import { font } from '../../../utils/font';
import { windowHeight } from '../../../utils/CommonFun';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';



const Register = () => {
  const navigation = useNavigation();

  return (
    <KeyboardAwareScrollView
    showsVerticalScrollIndicator={false}
    style={{backgroundColor:colors.white}}
     extraScrollHeight={-100}>
  
      <SafeAreaView style={styles.safeAreaConatiner}>
        <View style={styles.container}>
          <LogoContainer />
        </View>
        <View>
            <CustomText
              color={colors.primary}
              text="Hello!"
              size={32}
              fontFam={font.montserratExtraBold}
            />
            <CustomText
              text="Please sign up to create an account"
              fontFam={font.montserratSemiBold}
              // style={styles.header}
            />
          </View>
          <View style={styles.form}>
            <RegisterForm navigation={navigation} />
          </View>
        <SsoAuth
          onPress={() => {
            navigation?.replace('Login');
          }}
          primaryText="Already have an account?"
          secondaryText=" Login"
        />
      </SafeAreaView>
      </KeyboardAwareScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    // paddingTop: 20,
    paddingBottom: 10,
    marginTop: Platform.OS=="ios"? 30:40,

    alignItems: 'center',
  },
  heading: {
    alignItems: 'flex-start',
  },
  header: {
    marginLeft: 5,
  },
  form: {
    marginVertical: 10,
  },
  safeAreaConatiner:{
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal:30,
    minHeight: windowHeight - 20,
    justifyContent: "space-between",

}
});

export default Register;
