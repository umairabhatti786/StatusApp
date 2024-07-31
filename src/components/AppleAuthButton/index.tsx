import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { images } from '../../assets'
import { colors } from '../../utils/colors'

import {
  AppleButton,
  appleAuth,
} from "@invertase/react-native-apple-authentication";
import { useEffect } from 'react';
import { Spacer } from '../Spacer';
import CustomText from '../CustomText';
import { isiPad, windowWidth } from '../../utils/CommonFun';
import { scale, verticalScale } from 'react-native-size-matters';
import sizeHelper from '../../utils/helper';
import { appStyles } from '../../utils/AppStyles';
type Props = {
  source?: any
  bgColor?: string
  respanseData?: any
  disable?:boolean
  loginWithApple?:string
}

const AppleAuthButton = ({ bgColor, respanseData,disable,loginWithApple }: Props) => {


  // useEffect(() => {
  //     const configureGoogleSignIn = async () => {
  //         GoogleSignin.configure();
  //         if (await GoogleSignin.isSignedIn()) {
  //             await GoogleSignin.signOut();
  //         }
  //     };

  //     configureGoogleSignIn();
  // }, []);

  const _signIn = async () => {


    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user
    );

    

    if (credentialState === appleAuth.State.AUTHORIZED) {

      respanseData(appleAuthRequestResponse);


      // onSuccessHandle(appleAuthRequestResponse);
      // if (appleAuthRequestResponse && appleAuthRequestResponse.email) {
      //   await AsyncStorage.setItem(
      //     APPLE_USER_DETAIL,
      //     JSON.stringify(appleAuthRequestResponse)
      //   );
      //   onSuccessHandle(appleAuthRequestResponse);
      // } else {
      //   let result = await AsyncStorage.getItem(APPLE_USER_DETAIL);
      //   console.log({ result });
      //   if (result) {
      //     let appleUserInfo = await JSON.parse(result);
      //     onSuccessHandle(appleUserInfo);
      //   } else {
      //     onSuccessHandle(appleAuthRequestResponse);
      //   }
      // }
    }

  }

  return (
    <TouchableOpacity
    activeOpacity={0.6}
    disabled={disable}
      style={{
        backgroundColor: colors.white,
        alignItems: "center",
        flexDirection: "row",
        justifyContent:"center",
        borderWidth:1,
        width:"63%",
        borderColor:colors.primary35,
        height: isiPad ? verticalScale(35) : 55,
        borderRadius:999
      }}
      onPress={() => _signIn()}
    >
      <View
      style={{height:"100%",width:"16%",alignItems:"center",justifyContent:"center",}}
      >
          <Image source={images.apple} 
      resizeMode="contain"
      style={isiPad?styles.ispadImg:styles.img} />

      </View>
    
      <Spacer width={10} />
      <CustomText
            size={ isiPad?18:14}
            // style={{marginRight:-8}}


       text={loginWithApple} />
    </TouchableOpacity>
  )
}

export default AppleAuthButton
const styles=StyleSheet.create({

  img: {
    width: scale(28),
     height: scale(27),
    marginLeft:-8
  },
  ispadImg: {
    width: scale(17),
    height: scale(17),
    marginLeft:-8

  },
})
