import {Image, View, FlatList} from 'react-native';
import {images} from '../../assets';
import {colors} from '../../utils/colors';
import CustomText from '../CustomText';
import {font} from '../../utils/font';
import {dollarSymbol, isiPad, windowWidth} from '../../utils/CommonFun';
import {createRef, useState, useRef, useEffect} from 'react';
import FastImage from 'react-native-fast-image';
import {verticalScale} from 'react-native-size-matters';

export interface sliderData {
  sliderData: any;
}
type Props = {
  sliderData: sliderData;
};

const CustomSlider = ({sliderData}: Props) => {
  const slider = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  let carouselDots = sliderData?.slice?.(0, 5);
  const slideChanged = e => {
    const scrollPosition = Math.round(e.nativeEvent.contentOffset.x);
    const index = scrollPosition / windowWidth;
    setActiveIndex(index);
  };
  // useEffect(() => {
  //   let interval = setInterval(() => {
  //     if (activeIndex == sliderData?.length - 1) {
  //       slider.current.scrollToIndex({ animated: true, index: 0 });
  //     } else {
  //       slider.current.scrollToIndex({
  //         animated: true,
  //         index: activeIndex + 1,s
  //       });
  //     }
  //   }, 2000);

  //   return () => clearInterval(interval);
  // });
  const renderer = ({item, index}) => {
    return (
      <View
        style={{
          width: windowWidth - 30,
          height: isiPad ? verticalScale(200) : 200,
          borderRadius: 12,
          marginRight: 10,
          marginLeft: index == 0 ? 10 : 0,
          overflow: 'hidden',
        }}>
        <FastImage
          style={{width: '100%', height: '100%'}}
          resizeMode="cover"
          source={{uri: item.imageName}}
        />
        <View
          style={{
            height: '100%',
            width: '100%',
            position: 'absolute',
            backgroundColor: 'rgba(0,0,0,.1)',
          }}
        />
      </View>
    );
  };

  const renderDotIndicators = () => {
    return carouselDots?.map((a, index) => {
      return (
        <View
          key={index}
          style={{
            width: isiPad ? 20 : 10,
            height: isiPad ? 20 : 10,
            backgroundColor:
              activeIndex == index ? colors.primary : colors.grey1,
            borderRadius: 9999,
            marginHorizontal: 5,
            opacity: activeIndex == index ? 1 : 0.4,
          }}
        />
      );
    });
  };

  return (
    <View>
      <FlatList
        data={sliderData}
        renderItem={renderer}
        horizontal={true}
        pagingEnabled={true}
        ref={slider}
        bounces={false}
        windowSize={3}
        contentContainerStyle={{
          marginLeft: 5,
        }}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        showsHorizontalScrollIndicator={false}
        onScroll={slideChanged}
        ItemSeparatorComponent={() => <View style={{width: 10}} />}
        getItemLayout={(_, index) => ({
          length: windowWidth,
          offset: windowWidth * index,
          index,
        })}
      />

      <View
        style={{
          flexDirection: 'row',
          position: 'absolute',
          bottom: 10,
          alignSelf: 'center',
        }}>
        {renderDotIndicators()}
      </View>
    </View>
  );
};
export default CustomSlider;
