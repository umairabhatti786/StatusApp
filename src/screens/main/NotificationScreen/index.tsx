import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { appStyles } from "../../../utils/AppStyles";
import { images } from "../../../assets/images";
import { Spacer } from "../../../components/Spacer";
import CustomText from "../../../components/CustomText";
import { colors } from "../../../utils/colors";
import { windowWidth } from "../HomeScreen/FriendList";
import ReceiveRequestCard from "../../../components/ReceiveRequestCard";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import ActivityCard from "../../../components/ActivityCard";
import { activityData } from "../../../utils/Data";
import CustomLine from "../../../components/CustomLine";
import AbsoluteHeader from "../../../components/AbsoluteHeader";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import CustomButton from "../../../components/CustomButton";
import { scale, verticalScale } from "react-native-size-matters";
import { GetInNotifications } from "../../../api/ApiServices";
import { getToken } from "../../../redux/reducers/authReducer";
import { useSelector } from "react-redux";
import moment from "moment";
import { formatTimeDifference } from "../../../utils/CommonFun";
const Notifications = () => {
  const navigation: any = useNavigation();
  const [loading, setLoading] = useState(false);
  const [request, setRequest] = useState(false);
  const isFocused = useIsFocused();
  const [activeFilter, setActiveFilter] = useState(0);
  const [data, setData] = useState<any>([]);
  const [filter, setFilter] = useState<any>([]);
  const token = useSelector(getToken);

  const filterData = ["All", "Comments"];

  useEffect(() => {
    if (isFocused) {
      if (activeFilter == 0) {
        setFilter(data);
      } 
      // else if (activeFilter == 1) {
      //   let f= data.filter((f:any)=>f.forFollow)
      //   setFilter(f)
      // } 
      else if (activeFilter == 1) {
        let f= data.filter((f:any)=>f.forComment)
        setFilter(f)
      }
    }
  }, [activeFilter]);

  const getInNotifications = async () => {
    setLoading(true)
    GetInNotifications(token, async ({ isSuccess, response }: any) => {
      console.log("data n", isSuccess);
      let result = JSON.parse(response);
      if (result.status) {
        console.log(result?.InNotification);
        setData(result?.InNotification);
        setFilter(result?.InNotification);
        setLoading(false)
        // console.log(result?.posts?.data)
      } else {
        console.log(result);
        setLoading(false);
        // Alert.alert("Alert!", "Something went wrong",);
        console.log("Something went wrong");
      }
    });
  };

  useEffect(() => {
    getInNotifications();
  }, [isFocused]);

  const renderItem = ({ item }: any) => {
    return (
      <View style={{ marginBottom: 20 }}>
        <ActivityCard 
          senderId={item.senderId}
          image={{ uri: item?.imageUrl }}
          time={  formatTimeDifference(item?.created_at)}
          name={item?.username}
          isShowFollow={item?.forFollow ? item?.description : ""}
          comment={item?.description}
        />
      </View>
    );
  };

  return (
    <View style={appStyles.main}>
      <AbsoluteHeader>
        <TouchableOpacity
          style={{ width: "10%" }}
          onPress={() => navigation.goBack()}
        >
          <Image
            style={{ width: wp(4.6), height: hp(2.6) }}
            resizeMode="contain"
            source={images.back}
          />
        </TouchableOpacity>
        <CustomText
          fontWeight="600"
          color={colors.white}
          fontFam="Poppins-Medium"
          size={18}
          text={"Notifications"}
        />
        <CustomText color={"transparent"} size={18} text={"sss"} />
      </AbsoluteHeader>

      <View
        style={{
          ...appStyles.row,
          marginVertical: verticalScale(13),
          marginLeft: scale(10),
        }}
      >
        {filterData.map((item, index) => {
          return (
            <View style={{ marginRight: 7 }}>
              <CustomButton
                onPress={() => setActiveFilter(index)}
                height={32}
                fontFam={"Inter-Regular"}
                fontWeight={"400"}
                borderRadius={9}
                paddingHorizontal={18}
                size={17}
                textColor={
                  activeFilter == index ? colors.black100 : colors.white
                }
                bgColor={activeFilter == index ? colors.white : colors.primary}
                text={item}
              />
            </View>
          );
        })}
        {loading&&<ActivityIndicator size={'small'} color={"#fff"}/>}
      </View>

      <View style={{ paddingHorizontal: scale(15) }}>
        {/* <Spacer height={25} /> */}
        <FlatList data={filter}
        style={{marginBottom:50}}
         renderItem={renderItem} />
      </View>
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  tab: {
    width: windowWidth / 2,
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 3,
    borderBottomColor: colors.black200,
  },
  sentRequest: {
    textDecorationLine: "underline",
  },
});
