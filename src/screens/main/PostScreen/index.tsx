import {
  FlatList,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { appStyles } from "../../../utils/AppStyles";
import { images } from "../../../assets/images";
import { useNavigation, useRoute } from "@react-navigation/native";
import CustomText from "../../../components/CustomText";
import { colors } from "../../../utils/colors";
import { Spacer } from "../../../components/Spacer";
import { windowWidth } from "../HomeScreen/FriendList";
import { windowHeight } from "../../../utils/Dimensions";
import { comments, statusComments } from "../../../utils/Data";
import MessagesComponent from "../../../components/MessageComponent";

const Post = () => {
  const route: any = useRoute();
  const data = route?.params?.item;
  const navigation = useNavigation();

  console.log("DataStatus",data)

  const renderChatList = ({ item }: any) => {
    return (
      <MessagesComponent
        comments={true}
        name={item?.name}
        image={item?.img}
        message={item?.message}
        time={item?.time}
        edit={item?.edit}
        chatDate={item?.chatDate}
        onEdit={() => {
          if(data.status==false){
            const params = {
              status:
                "Hey everyone! Statuss is great.Here’s a photo of my view right now.",
              bgImage:images.postBg,
              text:"Edit Reply"
            };
            navigation.navigate("AddStatus", { isEdit: true, data: params })

          }
          else {
            const params = {
              status:
                "Hey everyone! Statuss is great.Here’s a photo of my view right now.",
              bgImage:images.postBg,
              text:"Edit Comment"
            };
            navigation.navigate("AddStatus", { isEdit: true, data: params });

          }
          
        }}
      />
    );
  };
  return (
    <View style={appStyles.main}>
      <View style={styles.header}>
        <TouchableOpacity
          style={{ marginRight: 20 }}
          onPress={() => navigation.goBack()}>
          <Image source={images.back} />
        </TouchableOpacity>
        <CustomText
          color={colors.white}
          fontWeight="700"
          size={20}
          text={"Post"}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          style={{ width: windowWidth, height: windowHeight / 6.5 }}
          source={data?.imgbg}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 15,
              marginHorizontal: 20,
            }}>
            <Image
              source={data?.img}
              style={{ width: windowWidth / 4.5, height: windowHeight / 9.4 }}
            />
            <View style={{ marginLeft: 15 }}>
              <CustomText
                fontWeight="600"
                size={16}
                color={colors.white}
                lineHeight={22}
                text={data?.name}
              />
              <CustomText
                style={{ width: windowWidth / 3 }}
                fontWeight="600"
                size={16}
                lineHeight={22}
                color={colors.white}
                text={data?.address}
              />
            </View>
          </View>
        </ImageBackground>
        <Spacer height={18} />
        <View
          style={{
            paddingHorizontal: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 10,
          }}>
          <CustomText color={colors.white} size={14} text={data?.time} />
          {
            data.status==false?<></>:(
              <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                const data = {
                  status:
                    "Hey everyone! Statuss is great.Here’s a photo of my view right now.",
                  bgImage:images.postBg,
                  text:"Edit Status",
                  isStatus:true
  
                };
                navigation.navigate("AddStatus", { isEdit: true, data: data });
              }}>
              <CustomText
                size={14}
                style={styles.edit}
                color={colors.white}
                text={"Edit"}
              />
            </TouchableOpacity>

            )
          }
        
        </View>
        <CustomText
          style={{ marginHorizontal: 10 }}
          size={17}
          color={colors.white}
          text={data?.message}
        />
        <Spacer height={20} />
        <Image
          style={{ alignSelf: "center", width: windowWidth }}
          source={data?.postimg}
        />
        <View style={{ flex: 1, padding: 5 }}>
          <FlatList
            data={data.status==false?statusComments:  comments}
            contentContainerStyle={{
              gap: 10,
            }}
            renderItem={renderChatList}
          />
        </View>
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 20,
          borderBottomWidth: 0.5,
          borderTopWidth: 0.5,
          borderTopColor: colors.gray200,
          borderBottomColor: colors.gray200,
          paddingVertical: 7,
          marginBottom: 30,
        }}>
        <TextInput
          style={{
            color: colors.gray200,
            width: windowWidth / 1.25,
            fontFamily: "Poppins-Medium",
            fontSize: 16,
          }}
          placeholderTextColor={colors.gray200}
          placeholder="Type a comment"
        />
        <Image style={{ tintColor: colors.gray200 }} source={images.send} />
      </View>
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.black300,
    paddingTop: Platform.OS=="ios"?"18%":"5%",
    paddingBottom: "5%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
  },
  edit: {
    textDecorationLine: "underline",
  },
});
