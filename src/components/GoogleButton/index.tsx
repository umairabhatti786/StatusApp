import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {images} from '../../assets';
import {colors} from '../../utils/colors';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {useEffect} from 'react';
import CustomText from '../CustomText';
import {Spacer} from '../Spacer';
import {font} from '../../utils/font';
import {isiPad, windowWidth} from '../../utils/CommonFun';
import {scale, verticalScale} from 'react-native-size-matters';
import sizeHelper from '../../utils/helper';
import {appStyles} from '../../utils/AppStyles';
type Props = {
  source?: any;
  bgColor?: string;
  respanseData?: any;
  disable?: boolean;
  loginWithGoogle?: string;
};

const GoogleButton = ({
  bgColor,
  respanseData,
  disable,
  loginWithGoogle,
}: Props) => {
  useEffect(() => {
    const configureGoogleSignIn = async () => {
      GoogleSignin.configure({
        webClientId:
          '1012381532710-h5bc5l2v8j3od4h2gea5gg25qctorqin.apps.googleusercontent.com',
        offlineAccess: true, // if you want to access Google API on behalf of the user from your server
      });
      // if (await GoogleSignin.signIn()) {
      //   await GoogleSignin.signOut();
      // }
    };
    configureGoogleSignIn();
  }, []);

  const _signIn = async () => {
    // GoogleSignin.configure();
    // (await GoogleSignin.signIn()) && (await GoogleSignin.signOut());
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();
      if (userInfo) {
        respanseData(userInfo);
      }
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('user cancelled the login flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('operation (e.g. sign in) is in progress already');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('play services not available or outdated');
      } else {
        console.log('some other error happened', error);
      }
      respanseData(null);
    }
  };
  return (
    <TouchableOpacity
      disabled={disable}
      activeOpacity={0.6}
      style={{
        backgroundColor: colors.white,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        borderWidth: 1,
        width: '63%',
        borderColor: colors.primary35,
        height: isiPad ? verticalScale(35) : 55,
        borderRadius: 999,
      }}
      onPress={() => _signIn()}>
      <View
        style={{
          height: '100%',
          width: '16%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={images.google}
          resizeMode="contain"
          style={isiPad ? styles.ispadImg : styles.img}
        />
      </View>

      <Spacer width={10} />
      <CustomText size={ isiPad?18: 14} text={loginWithGoogle} />
    </TouchableOpacity>
  );
};
export default GoogleButton;

const styles = StyleSheet.create({
  img: {
    width: scale(25),
    height: scale(25),
  },
  ispadImg: {
    width: scale(17),
    height: scale(17),
  },
});
