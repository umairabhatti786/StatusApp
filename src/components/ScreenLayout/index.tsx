import React, {useRef} from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  View,
  SafeAreaView,
  Pressable,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {colors} from '../../utils/colors';
import {images} from '../../assets';
import CustomText from '../CustomText';
import {useSelector} from 'react-redux';
import {getUserData} from '../../redux/reducers/authReducer';
import FastImage from 'react-native-fast-image';
import {appStyles} from '../../utils/AppStyles';
import CustomButton from '../CustomButton';
import {font} from '../../utils/font';
import {isiPad, startBlinking} from '../../utils/CommonFun';

type Props = {
  navigation?: any;
  children?: any;
  title?: string;
  style?: any;
  height?: any;
  isProfileVisible?: boolean;
  isLineVisible?: boolean;
  linePosition?: any;
  bgColor?: any;
  ScrollRef?: any;
  headerChild?: any;
  isScrollEnabled?: boolean;
  refreshControl?: any;
  onScroll?: any;
  onBackPress?: () => void;
  onPressHelp?: () => void;
  helpButton?: any;
  scrollEventThrottle?: any;
};

const windowHeight = Dimensions.get('window').height;

const ScreenLayout = ({
  navigation,
  children,
  title,
  style,
  isProfileVisible,
  isLineVisible,
  bgColor,
  ScrollRef,
  isScrollEnabled,
  refreshControl,
  onScroll,
  onBackPress,
  onPressHelp,
  helpButton,
  scrollEventThrottle,
}: Props) => {
  const userData = useSelector(getUserData);
  const blinkAnim = useRef(new Animated.Value(0)).current;
  const backgroundColor = blinkAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['white', '#092F74'],
  });

  const renderBackButton = () => (
    <TouchableOpacity
      // onPressIn={startBlinking}
      // onPressOut={stopBlinking}
      activeOpacity={1}
      onPress={() => {
        if (onBackPress) {
          onBackPress();

          return;
        }
        startBlinking(blinkAnim);
        setTimeout(() => {
          navigation.goBack();
        }, 200);
      }}
      style={styles.backButtonContainer}>
      <Animated.View style={[styles.backArrowContainer, {backgroundColor}]}>
        <Image
          source={images.backArrow}
          style={isiPad ? styles.isPadBackArrowIcon : styles.backArrowIcon}
        />
      </Animated.View>
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={appStyles.row}>
        {renderBackButton()}
        <View style={{marginLeft: isiPad ? 10 : 0}}>
          <CustomText
            text={title}
            fontWeight="500"
            color={colors.primary}
            size={isiPad ? 30 : 24}
          />
        </View>
      </View>
      {helpButton && (
        <CustomButton
          text={helpButton}
          onPress={onPressHelp}
          bgColor={colors.white}
          fontWeight="600"
          fontFam={font.montserratMedium}
          textColor={colors.primary}
          borderColor={colors.white}
          width={60}
        />
      )}
    </View>
  );

  const renderProfileSection = () => (
    <View style={styles.profileSection}>
      <TouchableOpacity
        activeOpacity={0.4}
        disabled={!userData?.token}
        style={styles.notificationIcon}
        onPress={() => {
          if (!userData?.token) {
            navigation.navigate('WelcomeScreen');

            return;
          }
          navigation.navigate('Notifications');
        }}>
          {
            userData?.token&&(
              <Image source={images.notification} style={styles.notificationImage} />

            )
          }

          
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.4}
        onPress={() => {
          userData?.token
            ? navigation.navigate('Profile')
            : navigation.navigate('WelcomeScreen');
        }}
        style={styles.profileImageContainer}>
        <FastImage
          source={
            userData?.userData?.profile_picture
              ? {uri: userData?.profile_picture}
              : images.blankUuser
          }
          style={styles.profileImage}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <SafeAreaView
        style={[
          styles.safeAreaView,
          {backgroundColor: bgColor || colors.white},
        ]}>
        <StatusBar barStyle={'dark-content'} backgroundColor={'#fff'} />
        <View>
          <View style={styles.headerContainer}>
            {renderHeader()}
            {isProfileVisible && renderProfileSection()}
          </View>
        </View>
        {isLineVisible && (
          <View style={styles.lineContainer}>
            <View style={styles.line} />
          </View>
        )}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContent}
          style={[
            styles.scrollView,
            {backgroundColor: bgColor || colors.offWhite},
          ]}
          scrollEnabled={isScrollEnabled === false ? false : true}
          ref={ScrollRef}
          onScroll={onScroll}
          scrollEventThrottle={scrollEventThrottle}
          refreshControl={refreshControl}>
          <View style={[styles.contentView, {...style}]}>{children}</View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};
export default ScreenLayout;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeAreaView: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
    // paddingVertical: 20,
    justifyContent: 'space-between',
    // backgroundColor:"green",
    height: 80,
  },
  backButtonContainer: {
    width: 50,
    height: 80,
    justifyContent: 'center',
  },
  backArrowIcon: {
    width: 32,
    height: 32,
    // marginTop: 5,
  },

  isPadBackArrowIcon: {
    width: 50,
    height: 50,
    // marginTop: 5,
  },

  backArrowContainer: {
    width: 40,
    height: 40,
    borderRadius: 999,
    justifyContent: 'center',
    // marginTop: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: isiPad ? 20 : 10,
    marginTop: 5,
  },

  notificationIcon: {
    height: 45,
    width: 30,

    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationImage: {
    height: isiPad ? 30 : 20,
    width: isiPad ? 30 : 20,
  },
  profileImageContainer: {
    height: isiPad ? 60 : 45,
    width: isiPad ? 60 : 45,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 3,
  },
  profileImage: {
    height: isiPad ? 55 : 38,
    width: isiPad ? 55 : 38,
    borderRadius: 9999,
  },
  lineContainer: {
    height: 4,
    backgroundColor: colors.primary20,
    alignItems: 'flex-start',
  },
  line: {
    width: '33.3%',
    backgroundColor: colors.primary,
    height: 4,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  contentView: {
    flex: 1,
    backgroundColor: colors.offWhite,
  },
});
