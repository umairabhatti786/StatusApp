import React, {useRef, useState} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomText from '../../../components/CustomText';
import {colors} from '../../../utils/colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomButton from '../../../components/CustomButton';
import AppIntroSlider from 'react-native-app-intro-slider';
import {
  ON_BOARDING,
  StorageServices,
} from '../../../utils/hooks/StorageServices';
import {useDispatch, useSelector} from 'react-redux';
import {setOnboaring} from '../../../redux/reducers/authReducer';
import {getLocalizeFile} from '../../../redux/reducers/localizeReducer';
import {images} from '../../../assets';
import {isiPad} from '../../../utils/CommonFun';
const OnboardingScreens = ({navigation}: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const dispatch = useDispatch();
  let localize: any = useSelector(getLocalizeFile);
  const sliderRef = useRef<AppIntroSlider>(null);
  const onBoardingData = [
    {
      title: localize?.onboarding_title1,
      description: localize?.onboarding_description1,
      image: images.onBoarding1,
      next: localize?.onboarding_next1,
    },
    {
      title: localize?.onboarding_title2,
      description: localize?.onboarding_description2,
      image: images.onBoarding2,
      next: localize?.onboarding_next2,
    },
    {
      title: localize?.onboarding_title3,
      description: localize?.onboarding_description3,
      image: images.onBoarding3,
      next: localize?.onboarding_next3,
    },
  ];

  const onSlideChange = (index: any) => {
    setCurrentIndex(index);
  };
  const renderItem = ({item, index}: any) => {
    const {title, image, description, next} = item;

    const handleButtonPress = async () => {
      if (onBoardingData.length === index + 1) {
        await StorageServices.setItem(ON_BOARDING, 'old');
        dispatch(setOnboaring(true));

        navigation.navigate('Home');
      } else {
        sliderRef?.current?.goToSlide(index + 1);
        setCurrentIndex(index + 1);
      }
    };

    return (
      <View style={styles.slideContainer}>
        <View style={styles.imageContainer}>
          <Image source={image} style={styles.image} />
        </View>
        <View style={styles.textContainer}>
          <CustomText
            text={title}
            size={isiPad ? 30 : 22}
            numberOfLines={2}
            color={colors.primary}
            style={styles.titleText}
          />
          <CustomText
            text={description}
            size={isiPad ? 25 : 15}
            numberOfLines={3}
            color={colors.black}
            style={styles.descriptionText}
          />
          <CustomButton
            text={next}
            borderRadius={32}
            // size={isiPad?22:18}
            
            width="80%"
            style={styles.button}
            onPress={handleButtonPress}
          />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppIntroSlider
        renderItem={renderItem}
        data={onBoardingData}
        ref={sliderRef}
        showNextButton={false}
        showDoneButton={false}
        dotStyle={styles.dotStyle}
        onSlideChange={onSlideChange}
        activeDotStyle={styles.activeDotStyle}
      />
      <View style={styles.skipContainer}>
        <TouchableOpacity
          style={{
            height: isiPad?50:30,
            alignItems: 'center',
            justifyContent: 'center',
            width:"50%"
          }}
          activeOpacity={0.6}
          onPress={async () => {
            await StorageServices.setItem(ON_BOARDING, 'old');
            dispatch(setOnboaring(true));

            navigation.navigate('Home');
          }}>
          <CustomText
            text={
              currentIndex == 0
                ? localize?.onboarding_skip1
                : currentIndex == 1
                ? localize?.onboarding_skip2
                : currentIndex == 2
                ? localize?.onboarding_skip3
                : ''
            }
            size={isiPad?18: 14}
            style={styles.skipText}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slideContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    paddingTop: '20%',
    marginBottom: 10,
  },
  imageContainer: {
    flex: 1.5,
    justifyContent: 'flex-end',
  },
  image: {
    width: '100%',
    height: '70%',
    resizeMode: 'contain',
  },
  textContainer: {
    justifyContent: 'flex-end',
    alignContent: 'center',
    flex: 1,
    marginBottom: 30,
  },
  titleText: {
    width: '70%',
    textAlign: 'center',
    alignSelf: 'center',
  },
  descriptionText: {
    width: '70%',
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 50,
  },
  button: {
    alignSelf: 'center',
  },
  dotStyle: {
    backgroundColor: colors.primary,
    opacity: 0.35,
    marginTop: 50,
  },
  activeDotStyle: {
    backgroundColor: colors.primary,
    marginTop: 50,
  },
  skipContainer: {
    height: 40,
    alignItems: 'center',
  },
  skipText: {
    textDecorationLine: 'underline',
  },
});

export default OnboardingScreens;
