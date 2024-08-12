import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { colors } from "../../../utils/colors";
import { appStyles } from "../../../utils/AppStyles";
import CustomText from "../../../components/CustomText";
import { images } from "../../../assets/images";
import { windowWidth } from "../../../utils/Dimensions";
import MessagesList from "./MessagesList";
import { messagesList } from "../../../utils/Data";
import CustomSearch from "../../../components/CustomSearch";
import { Spacer } from "../../../components/Spacer";
import AbsoluteHeader from "../../../components/AbsoluteHeader";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { scale, verticalScale } from "react-native-size-matters";
import CustomDrawer from "../../../components/CustomDrawer";
import {
  AUTH,
  StorageServices,
  TOKEN,
} from "../../../utils/hooks/StorageServices";
import {
  CreateFavoriteConversation,
  GetChatList,
  GetUserArchives,
  GetUserFavoriteConversation,
  GetUserTrashConversation,
  SearchMessages,
} from "../../../api/ApiServices";
import { useIsFocused } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import TopBar from "../../../components/TopBar";
import NewText from "../../../components/NewText";

const MessageScreen = ({ navigation }: any) => {
  const [isArchived, setIsArchived] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeChat, setActiveChat] = useState("Messages");
  const [search, setSearch] = useState("");
  const [counter, setCounter] = useState(0);
  const [messagesList, setMessagesList] = useState<any>([]);
  const [chatList, setChatList] = useState<any>([]);
  const [contacts, setContacts] = useState<any>([]);
  const [activeBar, setActiveBar] = useState("Following");

  const topBarData = ["Messages", "Starred", "Archive"];

  const isFocused = useIsFocused();

  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const renderChatList = ({ item }: any) => {
    return <MessagesList item={item} handleFavorite={handleFavorites} />;
  };

  const getUserFavoriteConversation = async () => {
    let token = await StorageServices.getItem(TOKEN);

    let user = await StorageServices.getItem(AUTH);
    // console.log(user.id)
    GetUserFavoriteConversation(
      user.id,
      token,
      async ({ isSuccess, response }: any) => {
        console.log("data favCon", isSuccess);

        let result = JSON.parse(response);
        if (result.status) {
          console.log(result?.data[0]);
          let arcF = result?.data?.map((a: any) => a?.conversations?.[0]);
          setChatList(arcF);
          // setAuthPosts(result?.posts?.data);
        } else {
          console.log(result);
          // Alert.alert("Alert!", "Something went wrong",);
          console.log("Something went wrong");
        }
      }
    );
  };
  const getUserArchives = async () => {
    let token = await StorageServices.getItem(TOKEN);

    let user = await StorageServices.getItem(AUTH);
    // console.log(user.id)
    GetUserArchives(user.id, token, async ({ isSuccess, response }: any) => {
      console.log("data archive", isSuccess);

      let result = JSON.parse(response);
      if (result.status) {
        console.log(result?.data[0]);
        let arcF = result?.data?.map((a: any) => a?.conversations?.[0]);
        // setMessagesList(result?.searchResult);
        // console.log(arcF)
        setChatList(arcF);
        // setAuthPosts(result?.posts?.data);
      } else {
        console.log(result);
        // Alert.alert("Alert!", "Something went wrong",);
        console.log("Something went wrong");
      }
    });
  };
  const getUserTrashConversation = async () => {
    let token = await StorageServices.getItem(TOKEN);

    let user = await StorageServices.getItem(AUTH);
    // console.log(user.id)
    GetUserTrashConversation(
      user.id,
      token,
      async ({ isSuccess, response }: any) => {
        console.log("data trash", isSuccess);

        let result = JSON.parse(response);
        if (result.status) {
          console.log(result?.data[0]);
          let arcF = result?.data?.map((a: any) => a?.conversations?.[0]);
          // setMessagesList(result?.searchResult);
          // console.log(arcF)
          setChatList(arcF);
          // setAuthPosts(result?.posts?.data);
        } else {
          console.log(result);
          // Alert.alert("Alert!", "Something went wrong",);
          console.log("Something went wrong");
        }
      }
    );
  };

  const getChatList = async () => {
    // Alert.alert("msg",'msg')
    let token = await StorageServices.getItem(TOKEN);
    setLoading(true);
    setActiveChat("Messages");
    GetChatList(token, async ({ isSuccess, response }: any) => {
      console.log("data p", isSuccess);

      let result = JSON.parse(response);
      if (result.status) {
        console.log(result);

        let actChat = result?.chatList?.filter(
          (c: any) =>
            !(c.archive_con.length + c.trash_con.length + c.blocked_con.length)
        );
        setContacts(actChat);
        setChatList(result?.chatList);

        // if (activeChat === "Messages") {
        //   let actChat = result?.chatList?.filter(
        //     (c: any) =>
        //       !(
        //         c.archive_con.length +
        //         c.trash_con.length +
        //         c.blocked_con.length
        //       )
        //   );
        //   setContacts(actChat);
        // } else if (activeChat === "Starred") {
        //   let favCon = result?.chatList?.filter(
        //     (c: any) => c.favorite_con.length
        //   );
        //   setContacts(favCon);

        //   // getUserFavoriteConversation();
        // } else if (activeChat === "Archive") {
        //   let arcCon = result?.chatList?.filter(
        //     (c: any) => c.archive_con.length
        //   );
        //   setContacts(arcCon);
        //   // getUserArchives();
        // } else if (activeChat === "Trash") {
        //   let trashCon = result?.chatList?.filter(
        //     (c: any) => c.trash_con.length
        //   );
        //   setContacts(trashCon);
        //   // getUserTrashConversation();
        // }
        setLoading(false);
        // setAuthPosts(result?.posts?.data);
      } else {
        console.log(result);
        setLoading(false);
        // Alert.alert("Alert!", "Something went wrong",);
        console.log("Something went wrong");
      }
    });
  };

  useEffect(() => {
    if (isFocused) getChatList();
  }, [isFocused, counter]);

  useEffect(() => {
    // if (isFocused) {
    console.log(activeChat);
    if (activeChat === "Messages") {
      let actChat = chatList?.filter(
        (c: any) =>
          !(c?.archive_con.length + c?.trash_con.length + c?.blocked_con.length)
      );
      setContacts(actChat);
    } else if (activeChat === "Starred") {
      let favCon = chatList?.filter((c: any) => c?.favorite_con.length);
      setContacts(favCon);
      // getUserFavoriteConversation();
    } else if (activeChat === "Archive") {
      let arcCon = chatList?.filter((c: any) => c?.archive_con.length);
      setContacts(arcCon);
      // getUserArchives();
    } else if (activeChat === "Trash") {
      let trashCon = chatList?.filter((c: any) => c?.trash_con.length);
      setContacts(trashCon);
      // getUserTrashConversation();
    }
    // }
  }, [activeChat]);

  const handleSearch = async (text: any) => {
    setSearch(text);
    if (search.length == 0) {
      setMessagesList([]);
    } else {
      let user = await StorageServices.getItem(AUTH);
      let token = await StorageServices.getItem(TOKEN);
      // console.log(user.id)
      SearchMessages(
        user.id,
        text,
        token,
        async ({ isSuccess, response }: any) => {
          console.log("data p", isSuccess);

          let result = JSON.parse(response);
          if (result.status) {
            console.log(result);
            setMessagesList(result?.searchResult);
            // setChatList(result?.chatList);
            // setAuthPosts(result?.posts?.data);
          } else {
            console.log(result);
            // Alert.alert("Alert!", "Something went wrong",);
            console.log("Something went wrong");
          }
        }
      );
    }
  };

  const handleFavorites = async (conId: any) => {
    let user = await StorageServices.getItem(AUTH);
    let conversationId = conId;
    let token = await StorageServices.getItem(TOKEN);
    let data = { userId: user.id, conversationId: conversationId };

    CreateFavoriteConversation(
      data,
      token,
      async ({ isSuccess, response }: any) => {
        console.log("data c", isSuccess);
        // console.log(msg)
        let result = JSON.parse(response);
        if (result.status) {
          console.log(result);
          setCounter(counter + 1);
        } else {
          Alert.alert("Alert!", "Something went wrong");
          console.log(result);
          console.log("Something went wrong");
        }
      }
    );
  };

  const handleDeleteConvo = () => {
    console.log("empty trash");
  };

  // const filteredList = messagesList.filter((item) =>
  //   item?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  // );

  //   const filteredList = messagesList.filter((item) =>
  //   item?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  // );
  return (
    <>
      <View style={appStyles.main}>
        {/* <View
          style={{ marginHorizontal: scale(15), marginTop: verticalScale(15) }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: scale(15),
              backgroundColor: colors.black300,
              // paddingVertical:verticalScale(5),
              borderRadius: scale(30),
              marginBottom: verticalScale(10),
              paddingVertical: verticalScale(2),
            }}
          >
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => setIsOpenDrawer(!isOpenDrawer)}
              // style={{backgroundColor:'red'}}
            >
              <Image
                style={{
                  tintColor: colors.gray500,
                  width: scale(25),
                  height: scale(25),
                }}
                source={images.drawer}
              />
            </TouchableOpacity>

            <TextInput
              style={{
                color: colors.gray500,
                width: "90%",
                fontSize: verticalScale(16),
                paddingLeft: scale(10),
              }}
              placeholderTextColor={colors.gray500}
              placeholder="Search Messages"
              onChangeText={handleSearch}
              value={search}
            />
          </View>
        </View> */}

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            borderBottomColor: colors.black200,
            borderBottomWidth: 2,
            marginTop: 20,
            marginBottom: 5,

            // justifyContent: "center",
          }}
        >
          {topBarData?.map((item, index) => {
            return (
              <TouchableOpacity
                activeOpacity={0.4}
                onPress={() => {
                  setActiveChat(item);
                }}
                style={{ alignItems: "center", width: "33%" }}
              >
                <TouchableOpacity
                  activeOpacity={0.4}
                  style={{ alignItems: "center" }}
                  onPress={() => {
                    setActiveChat(item);
                  }}
                >
                  <NewText
                    color={colors.white}
                    text={item}
                    style={{ textTransform: "capitalize" }}
                    size={16}
                    fontWeight={"500"}
                    fontFam="Poppins-Regular"
                  />
                </TouchableOpacity>
                <Spacer height={verticalScale(5)} />

                <View
                  style={{
                    width: "100%",
                    height: verticalScale(2),
                    position: "absolute",
                    bottom: -2,
                    backgroundColor:
                      activeChat == item ? colors.white : "transparent",
                  }}
                ></View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* <View style={{ maxHeight: 200 }}>
          <ScrollView>
            {messagesList.map((m: any) => (
              <TouchableOpacity
                style={{
                  paddingHorizontal: scale(20),
                  marginBottom: verticalScale(10),
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <CustomText
                  // fontWeight="600"
                  color={colors.gray500}
                  // fontFam="Poppins-Medium"
                  // textDecorationLine={"underline"}
                  size={15}
                  text={m.message}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View
          style={{
            paddingHorizontal: scale(20),
            marginBottom: verticalScale(10),
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <CustomText
            // fontWeight="600"
            color={colors.gray500}
            // fontFam="Poppins-Medium"
            // textDecorationLine={"underline"}
            size={15}
            text={
              activeChat == "Messages"
                ? "All Messages"
                : activeChat == "Starred"
                ? "Starred Messages"
                : activeChat == "Archive"
                ? "Archived Messages"
                : activeChat == "Trash"
                ? "All Trash"
                : ""
            }
          />
          {loading&&
                    <ActivityIndicator color={"#fff"} size={'small'}/>

         
        }
          {activeChat == "Trash" && (
            <TouchableOpacity activeOpacity={0.6} onPress={handleDeleteConvo}>
              <CustomText
                // fontWeight="600"
                color={colors.white}
                // fontFam="Poppins-Medium"
                // textDecorationLine={"underline"}
                size={15}
                text={"Empty Trash"}
              />
            </TouchableOpacity>
          )}
        </View> */}

        <View style={{ flex: 1 }}>
          <FlatList
            data={contacts}
            showsVerticalScrollIndicator={false}
            // data={ isArchived? messagesList.filter(it=>!it.isOnline):messagesList}
            contentContainerStyle={{
              gap: 5,
            }}
            renderItem={renderChatList}
          />
        </View>
      </View>

      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => navigation.navigate("NewMessage")}
        style={styles.addChat}
      >
        <Image style={{ width: 27, height: 27 }} source={images.addChat} />
      </TouchableOpacity>

      <CustomDrawer
        isModalVisible={isOpenDrawer}
        setActiveChat={setActiveChat}
        setModalVisible={setIsOpenDrawer}
      />
    </>
  );
};

export default MessageScreen;

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.primary,
    alignItems: "center",
    paddingTop: Platform.OS == "ios" ? "18%" : "5%",
    paddingBottom: "5%",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: colors.white,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginTop: 10,
    marginHorizontal: 10,
    marginBottom: 12,
  },
  input: { color: colors.white, width: windowWidth / 3 },
  addChat: {
    width: 55,
    height: 55,
    borderRadius: 999,
    backgroundColor: colors.sky,
    position: "absolute",
    margin: 30,
    bottom: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});
