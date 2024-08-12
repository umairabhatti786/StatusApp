import React, { useEffect, useState, version } from "react";
import {
  Alert,
  LogBox,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  FlatList,
  Platform,
  StatusBar,
} from "react-native";
import { colors } from "../../../utils/colors";
import { appStyles } from "../../../utils/AppStyles";
import { Spacer } from "../../../components/Spacer";
import TopHeader from "../../../components/TopHeader";
import TopBar from "../../../components/TopBar";
import FriendList from "./FriendList";
import { images } from "../../../assets/images";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { scale, verticalScale } from "react-native-size-matters";
import {
  getToken,
  getUserData,
  setCommentsNotificationAlert,
  setNotificationAlert,
} from "../../../redux/reducers/authReducer";
import {
  GetFavoriteChannel,
  GetFollowingChannel,
} from "../../../api/ApiServices";
import { StorageServices, TOKEN } from "../../../utils/hooks/StorageServices";

const HomeScreen = () => {
  const navigation: any = useNavigation();
  const [activeBar, setActiveBar] = useState("Following");
  const isFocused = useIsFocused();
  const [followingChannels, setFollowingChannels] = useState<any>([]);
  const [favoritesChannels, setFavoritesChannels] = useState<any>([]);
  const [counter, setCounter] = useState(0)
  const commentNotificationAlert = useSelector(
    (state) => state.auth
  )?.commentNotificationAlert;

  // const token = StorageServices.getItem(TOKEN);
  const dispatch = useDispatch();
  const isSroll = useSelector(getUserData);

  // console.log("isSroll", isSroll);

  const topBarData = ["Following", "Favorites"];


  useEffect(() => {
    
    GetFollowingChannels();
  }, [isFocused,counter]);

  useEffect(() => {
    GetFavoriteChannels();
  }, [isFocused,counter]);

 
 
  // useEffect(() => {
    
  //   let new1 = followingChannels?.sort(
  //     (a: any, b: any) => b?.channel?.post?.id - a?.channel?.post?.id
  //   );
  //   let new2 =favoritesChannels?.sort(
  //     (a: any, b: any) => b?.channel?.post?.id - a?.channel?.post?.id
  //     );
      
  //   setFollowingChannels(new1);
  //   setFavoritesChannels(new2);
  //   // console.log('counter',counter)
  //   // return () => {
  //   //   setTimeout(() => {
  //   //     setCounter(counter+1)
  //   //   }, 1000);
  //   // }
  // }, [counter]);

  const GetFollowingChannels = async () => {
    let token = await StorageServices.getItem(TOKEN);
    GetFollowingChannel(token, async ({ isSuccess, response }: any) => {
      console.log("data", isSuccess);

      let result = JSON.parse(response);
      if (result.status) {
        // console.log('result.channel.following',result.channel.following)
        let newestUp = result?.channel?.following?.sort(
          (a: any, b: any) => b?.channel?.lastPostId - a?.channel?.lastPostId
        );
        setFollowingChannels(newestUp);
        // setComments([...comments, result.comment]);
        // setLoading2(false);
      } else {
        // Alert.alert("Alert!", "Something went wrong");
        console.log("Something went wrong", result, token);
      }
    });
  };
  const GetFavoriteChannels = async () => {
    let token = await StorageServices.getItem(TOKEN);
    GetFavoriteChannel(token, async ({ isSuccess, response }: any) => {
      console.log("data", isSuccess);

      let result = JSON.parse(response);
      if (result.status) {
        let newestUp = result?.channel?.favorites?.sort(
          (a: any, b: any) => b?.channel?.lastPostId - a?.channel?.lastPostId
        );

        setFavoritesChannels(newestUp);
        // setComments([...comments, result.comment]);
        // setLoading2(false);
      } else {
        // Alert.alert("Alert!", "Something went wrong");
        console.log("Something went wrong");
      }
    });
  };
  // const GetFavoriteChannels = async () => {
  //   GetFollowingChannel(token, async ({ isSuccess, response }: any) => {
  //     console.log("data", isSuccess);

  //     let result = JSON.parse(response);
  //     if (result.status) {
  //       setFollowingChannels(result.channel);
  //       // setComments([...comments, result.comment]);
  //       // setLoading2(false);
  //     } else {
  //       // Alert.alert("Alert!", "Something went wrong");
  //       console.log("Something went wrong");
  //     }
  //   });
  // };

  const renderChatList = ({ item, index }: any) => {
    return item?.channel?.lastPostId ? (
      <>
      <FriendList
        disabled={false}
        channelId={item?.channel?.id}
        setCounter={setCounter}
        counter={counter}
        onPress={() =>
          navigation.navigate("OtherUserChannel", {
            item: item,
            id: item?.id,
            channelId: item?.channel?.id,
            isChannel: true,
          })
        }
        item={item}
        // id={item.id}
      />
      <Spacer height={5}/>
      </>
    ) : (
      <></>
    );
  };
  // const onScroll = async  (x: any) => {
  //   const xPos =
  //     x.nativeEvent?.contentOffset?.y < 0 ? 0 : x.nativeEvent?.contentOffset?.y;
  //   const current = Math.floor(xPos / 60);
  //   console.log("cdlncldc",current)

  //   dispatch(setIsScroll(current))

  // };

  return (
    <SafeAreaView style={appStyles.main}>
      <StatusBar barStyle={"light-content"} backgroundColor={colors.black} />

      <Spacer height={7} />

      <View>
        <View style={{ paddingHorizontal: scale(15) }}>
          <TopHeader
            notificationAlert={commentNotificationAlert}
            onPressNotification={() => {
              dispatch(setCommentsNotificationAlert(false));

              navigation.navigate("Notifications");
            }}
            onPressSetting={() => navigation.navigate("Settings")}
          />
        </View>

        <Spacer height={verticalScale(15)} />

        <TopBar
          topBarData={topBarData}
          activeBar={activeBar}
          setActiveBar={setActiveBar}
        />
      </View>

      <Spacer height={10} />
      {/* <View > */}
      <FlatList
        // style={{paddingHorizontal:10}}
        // onScroll={onScroll}
        showsVerticalScrollIndicator={false}
        data={activeBar == "Favorites" ? favoritesChannels : followingChannels}
        contentContainerStyle={{
          paddingHorizontal:scale(7),
          gap: 4,
        }}
        renderItem={renderChatList}
      />
      {/* </View> */}
    </SafeAreaView>
  );
};

export default HomeScreen;
