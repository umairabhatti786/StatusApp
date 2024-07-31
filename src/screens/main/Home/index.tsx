import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  FlatList,
  ScrollView,
  StatusBar,
  View,
  SafeAreaView,
  StyleSheet,
  Alert,
  RefreshControl,
  ActivityIndicator,
  SectionList,
} from 'react-native';
import {appStyles} from '../../../utils/AppStyles';
import CustomText from '../../../components/CustomText';
import {font} from '../../../utils/font';
import {colors} from '../../../utils/colors';
import Header from '../../../components/Header';
import HomeRewards from '../../../components/HomeRewards';
import Card from '../../../components/Card';
import CategoryCard from '../../../components/CategoryCard';
import {images} from '../../../assets';
import DiscoverCard from '../../../components/DiscoverCard';
import {useDispatch, useSelector} from 'react-redux';
import {
  getToken,
  getUserData,
  setReferralLinkId,
} from '../../../redux/reducers/authReducer';
import {isiPad, splitName} from '../../../utils/CommonFun';
import {ApiServices} from '../../../api/ApiServices';
import dynamicLinks from '@react-native-firebase/dynamic-links';

import {
  fetchHomePageContent,
  getHomePageBlogs,
  getHomePageCarousel,
  getHomePageLoading,
  getHomePageSlider,
  getLoyaltyPoints,
  getPointsBalance,
  getRefreshing,
  refreshHomePageContent,
} from '../../../redux/reducers/homePageReducer';
import {usePermissions} from '../../../utils/Permissions/usePermissions';
import {
  getLocationAccess,
  getUserLocation,
} from '../../../redux/reducers/locationReducer';
import CustomSlider from '../../../components/CustomSlider';
import {Spacer} from '../../../components/Spacer';
import {setProductsDetails} from '../../../redux/reducers/productDetailReducer';
import {getLocalizeFile} from '../../../redux/reducers/localizeReducer';
import BottomSheet from '@gorhom/bottom-sheet';
import FlotingButton from './FlotingButton';
import {checkDynamicLink} from '../../../utils/hooks/FirebaseServices';
import ActiveOrdersModel from './ActiveOrdersModel';
import CustomBottomSheet from '../../../components/CustomBottomSheet';
import {HomeLayout} from '../../../utils/Layouts/HomeLayout';
import {useIsFocused, useFocusEffect} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

type Props = {
  navigation?: any;
};
type LoyaltyPoints = {
  tier_bronze_points: string;
  tier_silver_points: string;
  tier_gold_points: string;
  tier_platinum_points: string;
  points_balance: string;
  tier_level: string;
};

const Home = ({navigation}: Props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const userData = useSelector(getUserData);
  const dispatch = useDispatch();
  const blogs = useSelector(getHomePageBlogs);
  const carousel = useSelector(getHomePageCarousel);
  const slider = useSelector(getHomePageSlider);
  const token = useSelector(getToken);
  
  const [activeOrder, setActiveOrder] = useState([]);
  const bottomSheetModalRef = useRef<BottomSheet>(null);
  const homePageLoading = useSelector(getHomePageLoading);
  const focused = useIsFocused();
  const isRefreshing = useSelector(getRefreshing);
  const {getLocation} = usePermissions();
  const localize: any = useSelector(getLocalizeFile);
  const snapPoints = useMemo(() => ['45%'], []);
  const [pointsData, setPointsData] = useState<LoyaltyPoints>({
    tier_bronze_points: '',
    tier_silver_points: '',
    tier_gold_points: '',
    tier_platinum_points: '',
    points_balance: '',
    tier_level: '',
  });
  console.log("pointsData",pointsData)

  const handleClosePress = () => bottomSheetModalRef?.current?.close();
  const handleOpenress = () => bottomSheetModalRef?.current?.expand();

  const handleSheetChanges = useCallback(index => {
    if (index == 0) {
      handleClosePress();
    }
  }, []);

  const categoryCardData = [
    {
      title: localize?.home_order_title,
      image: images.order,
      screen: 'OrderLocation',
    },
    {
      title: localize?.home_location_title,
      image: images.mapMarker,
      screen: 'OrderLocation',
    },
    {
      title: localize?.home_delivery_title,
      image: images.deliver,
      screen: 'OrderLocation',
    },
    {
      title: localize?.home_reorder_title,
      image: images.donate,
      screen: 'OrderHistory',
    },
  ];

  let name = splitName(userData?.name);
  const onScroll = (x: any) => {
    const xPos =
      x.nativeEvent?.contentOffset?.x < 0 ? 0 : x.nativeEvent?.contentOffset?.x;
    const current = Math.floor(xPos / 260);
    if (current > 4) {
      setSelectedIndex(4);
      return;
    }
    setSelectedIndex(current);
  };
  useEffect(() => {
    getDashboard();
    getLocation();

    // },1000)
  }, []);
  useEffect(() => {
    getUserPointsData(userData?.token);

    if (userData?.token) {
      
      getAllActiveOrders(userData?.token);
    }
  }, [focused]);
  useFocusEffect(
    useCallback(() => {
      const intervalId = setInterval(() => {
        console.log("UreTojebToken", userData?.token);

        if (userData?.token) {
          getUserPointsData(userData?.token);
          getAllActiveOrders(userData?.token);
        }
      }, 3000); // 3000 milliseconds = 3 seconds
  
      // Clean up the interval when the screen loses focus
      return () => clearInterval(intervalId);
    }, [userData?.token]), // Include dependencies in the array
  );
  useEffect(() => {
    dynamicLinks().onLink(handleDynamicLink);
  }, [dynamicLinks]);

  useEffect(() => {
    checkReferralLink();
  }, []);

  const getUserPointsData = (userToken:any) => {
    console.log("PointsOtherDataToken",userToken)

    ApiServices.getPointsData(
      userToken,
      async ({isSuccess, response}: any) => {
        if (isSuccess) {
          if (response?.success) {
            console.log("PointsOtherData",response,userToken)
            setPointsData(response?.data);
          } else {
            console.log('error', response);
          }
        } else {
          // Alert.alert("Alert!", "Something went wrong");
        }
      },
    );
  };
  const handleDynamicLink = (link: any) => {
    if (link?.url) {
      const id: any = link.url?.split('=').pop();
      dispatch(setReferralLinkId(id));
    }
  };

  const checkReferralLink = async () => {
    let link: any = await checkDynamicLink();
    dispatch(setReferralLinkId(link));
  };

  const getAllActiveOrders = (userToken:any) => {
    console.log("ActibvOrderToken",userToken)
    if(userToken){
      ApiServices.getActiveOrder(userToken, async ({isSuccess, response}: any) => {
        if (isSuccess) {
          if (response?.success) {
            console.log("OrderTojebActgibe",response,userToken)

            setActiveOrder(response?.data);
          } else {
            console.log('error', response);
  
            // Alert.alert("Alert!", "Something went wrong");
          }
        } else {
          // Alert.alert("Alert!", "Network Error.");
        }
      });

    }
   
  };
  const getDashboard = async () => {
    // const userInfo = await StorageServices.getItem("userData");

    dispatch(fetchHomePageContent(token));
  };

  const onRefresh = () => {
    getAllActiveOrders(userData?.token);
    dispatch(refreshHomePageContent(token));
    getLocation();
  };

  const renderSectionHeader = ({section}) => (
    <CustomText
      text={section.title}
      size={18}
      fontFam={font.montserratMedium}
      fontWeight="500"
      style={{marginTop: 50, marginBottom: 5}}
    />
  );

  const onCardPress = (item: object) => {
    dispatch(setProductsDetails(item));
    navigation.navigate('OrderDetailCard');
  };
  return (
    <>
      <SafeAreaView style={appStyles.rootContainer}>
        <StatusBar barStyle={'dark-content'} backgroundColor={'#fff'} />
        <View
          style={{
            marginHorizontal: 20,
            backgroundColor: colors.white,
            paddingTop:  isiPad? 20:0,
            paddingBottom: 10,
          }}>
          <Header
            primaryTitle={localize?.home_title + ' '}
            secondaryTitle={name[0]}
            navigation={navigation}
            image={userData?.profile_picture}
          />
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            backgroundColor: colors.white,
          }}
          style={{
            backgroundColor: colors.white,
          }}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }
          >
          <View
            style={{
              flex: 1,
            }}>
            {homePageLoading ? (
              <View style={{marginLeft: 20, marginTop: 30}}>
                <HomeLayout />
              </View>
            ) : (
              <>
                <View style={{marginHorizontal: 20}}>
                  <HomeRewards
                    rewardsTitle={localize?.home_rewards_title}
                    pointsTitle={localize?.home_points_title}
                    totalPoints={300}
                    tierSilverPoints={Number(pointsData?.tier_silver_points)}
                    tierBronzePpoints={Number(pointsData?.tier_bronze_points)}
                    tierGoldPoints={Number(pointsData?.tier_gold_points)}
                    tierPlatinumPoints={Number(
                      pointsData?.tier_platinum_points,
                    )}
                    points={Number(pointsData?.points_balance)}
                  />
                </View>

                {carousel?.length > 0 && (
                  <View
                    style={{
                      flex: 1,
                      marginTop: 20,
                    }}>
                    <FlatList
                      onScroll={onScroll}
                      data={carousel}
                      showsHorizontalScrollIndicator={false}
                      renderItem={({item, index}) => {
                        return (
                          <>
                            <Animatable.View
                              duration={1000}
                              animation={'fadeIn'}
                              delay={index * 300}>
                              <CustomText
                                text={item?.title}
                                size={isiPad ? 22 : 18}
                                fontFam={font.montserratMedium}
                                fontWeight="600"
                                style={{
                                  marginTop: 20,
                                  marginBottom: 5,
                                  marginLeft: 20,
                                }}
                              />

                              <Card
                                onPress={it => onCardPress(it)}
                                data={item?.data}
                                key={index}
                              />
                            </Animatable.View>
                          </>
                        );
                      }}
                    />
                  </View>
                )}
                <View style={styles.categoriesContainer}>
                  <View style={styles.categoriesInner}>
                    {categoryCardData?.map((item, index) => {
                      return (
                        <CategoryCard
                        token={userData?.token}
                          data={item}
                          navigation={navigation}
                          key={index}
                        />
                      );
                    })}
                  </View>
                </View>
                {/* dashboardData?.homepage_data?.slider?.data?.slider_images */}
                {slider?.length > 0 && (
                  <>
                    <Spacer height={20} />

                    <FlatList
                      data={slider}
                      showsHorizontalScrollIndicator={false}
                      renderItem={({item, index}) => {
                        return (
                          <>
                            <CustomSlider sliderData={item.data} />
                            <Spacer height={20} />
                          </>
                        );
                      }}
                    />
                  </>
                )}

                {blogs?.length > 0 && (
                  <View
                    style={{
                      flex: 1,
                      paddingVertical: 5,
                      marginVertical: 20,
                    }}>
                    <CustomText
                      text={localize?.home_blog_title}
                      size={isiPad ? 30 : 18}
                      fontFam={font.montserratMedium}
                      fontWeight="600"
                      style={{marginLeft: 20}}
                    />
                    <FlatList
                      data={blogs}
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={{
                        gap: 20,
                        padding: 20,
                        // backgroundColor:"red"
                      }}
                      style={{
                        flex: 1,
                      }}
                      renderItem={({item, index}) => {
                        const plainText = item?.blog.replace(/<\/?[^>]+(>|$)/g, "");

                        return (
                          <DiscoverCard
                          blogDescription={plainText}
                            onPress={() =>
                              navigation.navigate('BlogDetail', {data: item})
                            }
                            data={item}
                            key={index}
                          />
                        );
                      }}
                    />
                  </View>
                )}
              </>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>

      {activeOrder.length > 0 && (
        <FlotingButton
          count={activeOrder.length}
          title={localize?.home_active_order_button_title}
          onPress={() => {
            if (activeOrder.length == 1) {
              navigation.navigate('ActiveOrders', {id: activeOrder[0]?.id});

              return;
            }
            bottomSheetModalRef?.current?.present();
          }}
        />
      )}

      <CustomBottomSheet
        bottomSheetModalRef={bottomSheetModalRef}>
        <ActiveOrdersModel
          title={localize?.home_active_order_sheet_title}
          preparingOrderTitle={
            localize?.home_active_order_sheet_preparing_your_order_title
          }
          activeOrders={activeOrder}
          bottomSheetModalRef={bottomSheetModalRef}
          navigation={navigation}
        />
      </CustomBottomSheet>
    </>
  );
};
export default Home;

const styles = StyleSheet.create({
  categoriesContainer: {
    justifyContent: 'center',
    marginTop: '8%',
    marginBottom: '5%',
  },
  categoriesInner: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  dotMain: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    marginTop: 20,
  },
  countContainer: {
    width: 30,
    height: 30,
    borderRadius: 999,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
