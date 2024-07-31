import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  Image,
  Keyboard,
  Platform,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {images} from '../assets';
import MyPlans from '../screens/main/MyPlans';
import {colors} from '../utils/colors';
import Rewards from '../screens/main/Rewards';
import QrStack from './QrStack';
import HomeStack from './HomeStack';
import CartStack from './CartStack';
import CustomText from '../components/CustomText';
import {useSelector} from 'react-redux';
import {getCartData, getViewCart} from '../redux/reducers/cartReducer';
import {getSelectedBranch} from '../redux/reducers/branchesReducer';
import OrderLocation from '../screens/main/OrderLocation';
import {getSelectedTab} from '../redux/reducers/manuePageReducer';
import {scale, verticalScale} from 'react-native-size-matters';
import {getLocalizeFile} from '../redux/reducers/localizeReducer';
import RewardStack from './RewardStack';
import {useEffect, useState} from 'react';
import {CommonActions} from '@react-navigation/native';
import PlanStack from './PlanStack';
import {isiPad} from '../utils/CommonFun';
import { getToken, getUserData } from '../redux/reducers/authReducer';
import WelcomeScreen from '../screens/main/WelcomeScreen';
const BottomNavigator = ({navigation}: any) => {
  const Bottom = createBottomTabNavigator();
  const cartCount = useSelector(getCartData).length;
  const seletcedBranch = useSelector(getSelectedBranch);
  const selectedTab = useSelector(getSelectedTab);
  const cartLength = useSelector(getCartData).length;
  const cartLengthDaa = useSelector(getCartData);
const token=useSelector(getUserData)?.token

  let localize: any = useSelector(getLocalizeFile);
  // console.log('cartLengthcdcddccdcdcd', token?.length);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
console.log("selectedTab",selectedTab,localize?.localize?.menu_title)
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  useEffect(() => {
    const resetCartStack = () => {
      if (cartLength == 0) {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'Cart'}],
          }),
        );
      }
    };

    resetCartStack();
  }, [cartLength]);

  return (
    <Bottom.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.primary,

        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#FFF',
          justifyContent: 'center',
          display: cartLength > 0 && selectedTab === localize?.menu_title ? 'none' : 'flex',
          alignItems: 'center',
          height: isiPad ? 120 : Platform.OS === 'ios' ? 90 : 80,
          borderTopWidth: 4,
          borderTopColor: colors.primary20,
        },
      }}>
      <Bottom.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          headerShown: false,

          tabBarIcon: ({focused}) => {
            return (
              // <TouchableOpacity
              //   activeOpacity={0.4}
              //   // onPress={() => {
              //   //   navigation.navigate("HomeStack");
              //   //   resetCartStack();
              //   // }}
              // >
              <View
                style={{
                  ...style?.itemStyle,
                  borderTopColor: focused ? colors.primary : colors.white,
                  borderTopWidth: focused ? 0 : 0,
                  paddingTop: Platform.OS == 'ios' ? 10 : 0,
                  width: isiPad ? 150 : 100,
                }}>
                {focused && <View style={style.absoluateView} />}
                <Image
                  source={focused ? images.homeFilled : images.home}
                  style={isiPad ? style.iPadImg : style.img}
                />
                <CustomText
                  text={localize?.home_tab_title}
                  size={isiPad ? 16 : 12}
                  style={style.text}
                />
              </View>
              // </TouchableOpacity>
            );
          },
        }}
      />

      <Bottom.Screen
        name="My Plan"
        component={PlanStack}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              // <TouchableOpacity
              //   activeOpacity={0.6}
              //   onPress={() => {
              //     navigation.navigate("My Plan");
              //     resetCartStack();
              //   }}
              // >
              <View
                style={{
                  ...style?.itemStyle,
                  borderTopColor: focused ? colors.primary : colors.white,
                  borderTopWidth: focused ? 0 : 0,
                  paddingTop: Platform.OS == 'ios' ? 10 : 0,
                  width: isiPad ? 150 : 100,
                }}>
                {focused && <View style={style.absoluateView} />}
                <Image
                  source={focused ? images.planFilled : images.plan}
                  style={isiPad ? style.iPadImg : style.img}
                />
                <CustomText
                  text={localize?.my_plan_tab_title}
                  style={style.text}
                  size={isiPad ? 16 : 12}
                />
              </View>
              // </TouchableOpacity>
            );
          },
        }}
      />

      <Bottom.Screen
        name="Scan"
        component={QrStack}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <>
                {/* <TouchableOpacity
                  activeOpacity={0.6}
                  style={{ alignItems: "center" }}
                  onPress={() => {
                    navigation.navigate("Scan");
                    
                    resetCartStack();
                  }}
                > */}
                {focused ? (
                  <View
                    style={{
                      backgroundColor: colors.white,
                      position: 'absolute',
                      height: isiPad ? 70 : 52,
                      width: isiPad ? 70 : 52,
                      justifyContent: 'center',
                      alignItems: 'center',
                      // borderRadius: 10,
                      borderColor: colors.primary,
                      borderWidth: 4,
                      bottom: isiPad
                        ? verticalScale(30)
                        : Platform.OS == 'ios'
                        ? 23
                        : 40,
                    }}>
                    <View
                      style={{
                        backgroundColor: colors.primary,
                        position: 'absolute',
                        height: isiPad ? 60 : 42,
                        width: isiPad ? 60 : 42,

                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        source={images.qr}
                        style={{height:  isiPad?35:  25, width: isiPad?35:  25}}
                      />
                    </View>
                  </View>
                ) : (
                  <View
                    style={{
                      backgroundColor: colors.primary,
                      position: 'absolute',
                      height: isiPad ? 70 : 52,
                      width: isiPad ? 70 : 52,
                      justifyContent: 'center',
                      alignItems: 'center',
                      opacity: isKeyboardVisible ? 0 : 1,

                      bottom: isiPad
                      ? verticalScale(30)
                      : Platform.OS == 'ios'
                      ? 23
                      : 40,                    }}>
                    <Image source={images.qr} style={{height: 25, width: 25}} />
                  </View>
                )}
                <View
                  style={{
                    marginTop: Platform.OS == 'ios' ? 31 : 22,
                    width: isiPad ? 60 : 42,

                  }}>
                  <CustomText
                    text={localize?.scan_tab_title}
                    style={style.text}
                    size={isiPad ? 16 : 12}

                  />
                </View>
                {/* </TouchableOpacity> */}
              </>
            );
          },
        }}
      />
      <Bottom.Screen
        name="CartStack"
        component={
          cartLength > 0 && Object.keys(seletcedBranch).length == 0
            ? OrderLocation
            : CartStack
        }
        // options={{ tabBarBadge: 3, tabBarBadgeStyle: { backgroundColor: 'blue' } }}

        options={{
          headerShown: false,
          ...(cartCount > 0 && {
            tabBarBadge: cartCount,
            tabBarBadgeStyle: {backgroundColor: colors.primary,},
            
            
          }),

          tabBarIcon: ({focused}) => {
            return (
              <View
                style={{
                  ...style?.itemStyle,
                  borderTopColor: focused ? colors.primary : colors.white,
                  borderTopWidth: focused ? 0 : 0,
                  paddingTop: Platform.OS == 'ios' ? 10 : 0,
                 
                  width: isiPad ? 150 : 110,
                }}>
                {focused && <View style={style.absoluateView} />}
                <Image
                  source={focused ? images.cartFilled : images.cart}
                  style={isiPad ? style.iPadImg : style.img}
                />
                <CustomText
                  text={localize?.cart_tab_title}
                  style={style.text}
                  size={isiPad ? 16 : 12}

                />
              </View>
            );
          },
        }}
      />
      <Bottom.Screen
        name="RewardStack"
        component={  RewardStack}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              // <TouchableOpacity
              //   activeOpacity={0.6}
              //   onPress={() => {
              //     navigation.navigate("RewardStack");
              //     resetCartStack();
              //   }}
              // >
              <View
                style={{
                  ...style?.itemStyle,
                  borderTopColor: focused ? colors.primary : colors.white,
                  borderTopWidth: focused ? 0 : 0,
                  paddingTop: Platform.OS == 'ios' ? 10 : 0,
                  width: isiPad ? 150 : 100,
                }}>
                {focused && <View style={style.absoluateView} />}
                <Image
                  source={focused ? images.rewardFilled : images.rewards}
                  style={isiPad ? style.iPadImg : style.img}
                />
                <CustomText
                  text={localize?.rewards_tab_title}
                  style={style.text}
                  size={isiPad ? 16 : 12}

                />
              </View>
              // </TouchableOpacity>
            );
          },
        }}
      />
    </Bottom.Navigator>
  );
};
export default BottomNavigator;

const style = StyleSheet.create({
  itemStyle: {
    width: '100%',
    height: Platform.OS === 'ios' ? 65 : 85,
    justifyContent: 'center',
    alignItems: 'center',
    // paddingVertical: 20,
    // gap: 7,
  },
  text: {
    color: colors.primary,
    marginTop: verticalScale(5),
    textAlign: 'center',
  },
  img: {
    height: 22,
    width: 22,
    resizeMode: 'contain',
  },
  iPadImg: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
  absoluateView: {
    width: isiPad ? scale(90) : 105,
    height: 5,
    backgroundColor: colors.primary,
    position: 'absolute',
    top: isiPad ? -25 :0,
    left: isiPad ? -58 : 0,
  },
});
