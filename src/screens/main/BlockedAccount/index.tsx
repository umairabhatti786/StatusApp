import {
  Alert,
  FlatList,
  Image,
  PixelRatio,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { appStyles } from "../../../utils/AppStyles";
import { images } from "../../../assets/images";
import CustomText from "../../../components/CustomText";
import { colors } from "../../../utils/colors";
import { useNavigation } from "@react-navigation/native";

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import AbsoluteHeader from "../../../components/AbsoluteHeader";
import { scale, verticalScale } from "react-native-size-matters";
import sizeHelper from "../../../utils/helpers/sizeHelper";
import UserCard from "./UserCard";
import { windowWidth } from "../HomeScreen/FriendList";
import { useSelector } from "react-redux";
import { getToken } from "../../../redux/reducers/authReducer";
import { Blocked, GetBlockedUser } from "../../../api/ApiServices";
import Loader from "../../../components/Loader";


const BlockedAccount = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false)
  const [blockedUser, setBlockedUser] = useState([])
  const token = useSelector(getToken)

  useEffect(() => {

    getBlockUser()

  }, [])


  const getBlockUser = () => {
    setLoading(true)
    GetBlockedUser(token, async ({ isSuccess, response }: any) => {
      if (isSuccess) {
        let result = JSON.parse(response);
        console.log("ckdnckdnc", result);

        if (result.status) {
          setLoading(false);
          setBlockedUser(result?.users?.data)
          // setNextPageUrl(!result?.users?.next_page_url?true:false)


        } else {
          setLoading(false);

          // Alert.alert("Alert!", "Something wrong");


        }
      } else {
        setLoading(false);

        Alert.alert("Alert!", "Network Error.");
      }
    });
  }

  const onBlockedUser = (id: any) => {

    let params = {
      blocked: id.toString()
    }

    Blocked(params, token, async ({ isSuccess, response }: any) => {
      if (isSuccess) {
        let result = JSON.parse(response);
        console.log("BlokcedResult", result);

        if (result.status) {

          let users = [...blockedUser]
          users = users.filter(it => it.id != id)
          setBlockedUser(users)
          // setIsBlockModal(false)
          // navigation.goBack()
          // setLoading(false);
          // setAllUsers(result?.users?.data)
          // setNextPageUrl(!result?.users?.next_page_url?true:false)


        } else {
          Alert.alert("Alert!", "Something went wrong");


        }
      } else {
        setLoading(false);

      }
    });


  }




  const renderUserList = ({ item, index }: any) => {
    return (
      <UserCard item={item}
        onBlocked={() => {
          onBlockedUser(item.id)
        }}

      />
    );
  };



  return (
    <>
      {loading && <Loader />}
      <View style={appStyles.main}>
        <AbsoluteHeader>
          <TouchableOpacity
            style={{ width: "11%",height:40,justifyContent:"center", }}

            onPress={() => navigation.goBack()}>
            <Image
              style={{ width: wp(4.5), height: hp(2.3) }}
              resizeMode="contain"
              source={images.back}
            />
          </TouchableOpacity>
          <CustomText
            fontWeight="600"
            color={colors.white}
            fontFam="Poppins-Medium"
            size={18}
            text={"Blocked Accounts"}
          />
          <CustomText color={"transparent"} size={18} text={"sss"} />
        </AbsoluteHeader>
        <View
          style={{ paddingHorizontal: scale(15), paddingTop: verticalScale(30) }}
        >
          <FlatList
            // style={{paddingHorizontal:10}}
            // onScroll={onScroll}
            showsVerticalScrollIndicator={false}
            data={blockedUser}
            contentContainerStyle={{
              gap: verticalScale(15),
            }}
            renderItem={renderUserList}
          />



        </View>



      </View>

    </>

  );
};

export default BlockedAccount;

const styles = StyleSheet.create({
  rowConttainer: {
    height: verticalScale(50),
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
  }

});
