import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  LogBox,
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { images } from "../../../assets/images";
import CustomButton from "../../../components/CustomButton";
import CustomText from "../../../components/CustomText";
import Header from "../../../components/Header";
import { appStyles } from "../../../utils/AppStyles";
import { colors } from "../../../utils/colors";
import { windowHeight } from "../../../utils/Dimensions";
import { windowWidth } from "../HomeScreen/FriendList";
import GifContainer from "./GifContainer";
import AbsoluteHeader from "../../../components/AbsoluteHeader";

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { scale, verticalScale } from "react-native-size-matters";
import { URLS } from "../../../api/baseUrl";
import FastImage from "react-native-fast-image";
import axios from "axios";
import Loader from "../../../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  getProfileGifs,
  setProfileGif,
} from "../../../redux/reducers/authReducer";

const EditGifs = ({ navigation }: any) => {
  const yourGifs = [{ gif: images.defimage2 }, { gif: images.defimage4 }];
  const dispatch = useDispatch();
  const profileGifs = useSelector(getProfileGifs);

  const [gifs, setGifs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSelectGif, setSelectGif] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [offset, setOffset] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const limit = 10; // Number of GIFs to fetch per page
  const flatListRef = useRef(null);

  useEffect(() => {
    fetchGifs();
  }, []);

  const onSearchGify = async (txt) => {
    setSearchQuery(txt);

    console.log("kcdnkcd", txt);

    if (txt.length > 0) {
      setLoading(true);

      try {
        const response = await axios.get(
          "https://api.giphy.com/v1/gifs/search",
          {
            params: {
              api_key: URLS.GIFY_API_KEY,
              q: txt,

              limit: 10, // Change the limit as per your requirement
              offset: offset, // Offset for pagination

              
            },
          }
        );
        if (response.data.data && response.data.data.length > 0) {

          console.log("happyllong",response.data.data )
          setGifs((prevData) => [...prevData, ...response.data.data]);
          setLoading(false);
        } else {
          setGifs([]);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching GIFs:", error);
        setLoading(false);
      }
    } else {
      fetchGifs();
    }
  };

  const fetchGifs = async () => {
    try {
      const response = await axios.get(
        "https://api.giphy.com/v1/gifs/trending",
        {
          params: {
            api_key: URLS.GIFY_API_KEY,
            limit: 10, // Change the limit as per your requirement
            offset: offset, // Offset for pagination

          },
        }
      );
      setGifs((prevData) => [...prevData, ...response.data.data]);

      // setGifs(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching GIFs:", error);
      setLoading(false);
    }
  };

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator animating size="large" 
        color={colors.white}
        />
      </View>
    );
  }

  const handleRefresh = () => {
    setIsRefreshing(true);
    setGifs([]);
    setOffset(0); // Reset offset to fetch from the beginning
  };

  const handleLoadMore = () => {
    if (!loading) {
      setOffset(offset + 10); // Increment offset for next page
    }
  };

  return (
    <>
      {/* {loading && <Loader />} */}
      <View style={appStyles.main}>
        <AbsoluteHeader paddingBottom={"2%"} paddingTop={"2%"}>
          <TouchableOpacity
            // style={{ width: "8%" }}
            style={{ width: "8%", height: 40, justifyContent: "center" }}
            onPress={() => navigation.goBack()}
          >
            <Image
              style={{ width: wp(4.5), height: hp(2.3) }}
              resizeMode="contain"
              source={images.back}
            />
          </TouchableOpacity>

          <View
            style={{
              width: "62%",
              borderRadius: 5,
              backgroundColor: colors.black,
              marginVertical: verticalScale(7),

              // marginLeft: 5,
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 10,
            }}
          >
            <Image
              style={{
                width: 22,
                height: 22,
                tintColor: colors.white,
              }}
              source={images.search}
              resizeMode="contain"
            />
            <TextInput
              placeholder="Search GIPHY"
              value={searchQuery}
              style={{
                fontSize: 18,
                fontFamily: "Poppins-Regular",
                color: colors.white,
                width: windowWidth / 2.3,
                paddingLeft: 10,
                paddingVertical: verticalScale(8),
                marginTop: 4,
                alignItems: "center",
                justifyContent: "center",
              }}
              onChangeText={(txt) => onSearchGify(txt)}
              placeholderTextColor={colors.grey400}
            />
          </View>

          <CustomButton
            text="Save"
            width={scale(60)}
            height={35}
            onPress={() => {
              if (isSelectGif.length > 0) {
                console.log("Seletc3dGif",isSelectGif[0]?.images?.original)
                let gifData = {
                  gif1: isSelectGif[0]?.images?.original
                    ? isSelectGif[0]?.images?.original
                    : "",
                  gif2: isSelectGif[1]?.images?.original
                    ? isSelectGif[1]?.images?.original
                    : "",
                };

                // console.log("lncldnclk", gifData);

                dispatch(setProfileGif(gifData));
                navigation.goBack();
              }
            }}
            borderRadius={5}
            bgColor={colors.white}
            textColor={colors.black}
          />
        </AbsoluteHeader>
        {/* <View
       style={{
         backgroundColor: colors.black300,
         alignItems: "center",
         paddingTop: "18%",
         flexDirection: "row",
         justifyContent: "space-between",
         paddingBottom: "5%",
         paddingHorizontal: 15,
       }}>
       <TouchableOpacity onPress={() => navigation.goBack()}>
         <Image
           style={{ width: 20, height: 20, tintColor: colors.white }}
           source={images.back}
           resizeMode="contain"
         />
       </TouchableOpacity>
       <View
         style={{
           width: windowWidth / 1.8,
           height: 53,
           borderRadius: 5,
           backgroundColor: colors.black,
           marginLeft: 5,
           flexDirection: "row",
           alignItems: "center",
           paddingHorizontal: 10,
         }}>
         <Image
           style={{ width: 25, height: 25, tintColor: colors.white }}
           source={images.search}
           resizeMode="contain"
         />
         <TextInput
           placeholder="Search GIPHY"
           style={{
             fontSize: 20,
             fontFamily: "Poppins-Regular",
             paddingLeft: 10,
           }}
           placeholderTextColor={colors.grey400}
         />
       </View>

       <CustomButton
         text="Save"
         width={65}
         height={35}
         borderRadius={5}
         bgColor={colors.white}
         textColor={colors.black}
       />
     </View> */}

        <ScrollView style={{ flex: 1 }}>
          <View style={{ marginHorizontal: scale(10) }}>
            <CustomText
              color={colors.white}
              size={18}
              text={"Active GIFS"}
              style={{ marginTop: verticalScale(20), marginBottom: 5 }}
            />
            <View>
              <FlatList
                scrollEnabled={false}
                data={yourGifs}
                numColumns={2}
                style={{ flexWrap: "nowrap" }}
                renderItem={({ item, index }) => {
                  return (
                    <View
                      style={{
                        width: "47%",
                        height: 180,
                        borderWidth: 1,
                        borderColor: colors.white,
                        marginRight: scale(15),
                        // margin: 10,
                      }}
                    >
                      <FastImage
                        style={{ width: "100%", height: "100%" }}
                        source={{
                          uri: "https://media2.giphy.com/media/JNyjaYrNJoV0nQ1pi0/giphy.gif?cid=d2d02f15xv9bw9aof4w8ji8qeb8fcnaupqo1x4xyf7o8ij1v&ep=v1_gifs_random&rid=giphy.gif&ct=g",
                        }}
                      />
                    </View>
                  );
                }}
              />
            </View>

            <CustomText
              color={colors.white}
              size={18}
              text={"Search Results"}
              style={{ marginTop: verticalScale(30), marginBottom: 5 }}
            />

            <FlatList
              data={gifs}
              numColumns={3}
              scrollEnabled={false}
              style={{ flexWrap: "nowrap" }}
              onEndReached={handleLoadMore}
              onEndReachedThreshold={0.1}
              ListFooterComponent={renderFooter}
              onRefresh={handleRefresh}
              refreshing={isRefreshing}
        
              renderItem={({ item, index }) => {

                return (
                  <GifContainer
                    selectedGif={isSelectGif}
                    onPress={() => {
                      let gifs = [...isSelectGif];
                      let findIndex = gifs.findIndex((it) => it === item); // Replace yourTargetItem with the item you want to find
                      if (findIndex == -1) {
                        gifs.push(item);
                      } else {
                        gifs.splice(findIndex, 1);
                      }

                      setSelectGif(gifs);
                    }}
                    item={item}
                  />
                );
              }}
            />
          </View>
        </ScrollView>
      </View>
    </>
  );
};

const styles=StyleSheet.create({
  footer: {
    paddingVertical: 20,
    borderColor: "#"
  },
})

export default EditGifs;
