import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  View,
  SafeAreaView,
  Pressable,
  Dimensions,
  FlatList,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import CustomText from "../../../components/CustomText";
import { colors } from "../../../utils/colors";
import { images } from "../../../assets";
import ScreenLayout from "../../../components/ScreenLayout";
import { font } from "../../../utils/font";
import NotificationCard from "../../../components/NotificationCard";
import { featureCardData, notificationCardData } from "../../../utils/Data";
import { ApiServices } from "../../../api/ApiServices";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../../../redux/reducers/authReducer";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import ScreenLoader from "../../../components/ScreenLoader";
import { getLocalizeFile } from "../../../redux/reducers/localizeReducer";
import VerifiedScreen from "../../auth/VerifiedScreen";
import { sessionCheck } from "../../../utils/CommonFun";

type Props = {
  navigation?: any;
};
const windowHeight = Dimensions.get("window").height;
const Notifications = ({ navigation }: Props) => {
  const token = useSelector(getToken);
  const [page, setPage] = useState(1);
  const isFocused = useIsFocused();
  const [notificationData, setNotificationData] = useState([]);
  const [loading, setLoading] = useState(true);
  const localize: any = useSelector(getLocalizeFile);
  const dispatch=useDispatch()

  useEffect(() => {
    getAllNotification();
  }, [isFocused]);

  const getAllNotification = async () => {
    const data = {
      token: token,
      page: page,
    };

    const result: any = await new Promise((resolve) => {
      ApiServices.getNotifications(data, (result: any) => {
        resolve(result);
      });
    });
    if (result.isSuccess) {
      if (result?.response?.success) {
        setNotificationData(result?.response?.data);
        setLoading(false);
      } else {
        setLoading(false);
        if (result?.response.app_update_status == 1||result?.response?.session_expire) {
          sessionCheck(result?.response.app_update_status,result?.response?.session_expire,dispatch);
          return;
        }


        Alert.alert("Alert!", "Something went wrong");
      }
    } else {
      Alert.alert("Alert!", "Something went wrong");
    }
  };
  return (
    <ScreenLayout
      navigation={navigation}
      title={localize?.home_notification_title}
      style={styles.container}
    >
      <View
        style={{
          paddingBottom: 100,
        }}
      >
        {loading ? (
          <>
            <View
              style={{
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* <View
                style={{
                  height: VerifiedScreen(500),
                  alignItems: "center",
                  justifyContent: "center",
                }}
              > */}
              <ActivityIndicator size={"large"} color={colors.primary} />
              {/* </View> */}
            </View>
          </>
        ) : (
          <FlatList
            data={notificationData}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              alignItems: "center",
              gap: 20,
              paddingVertical: 10,
              paddingHorizontal: 15,
            }}
            style={{
              flex: 1,
            }}
            renderItem={({ item }) => {
              return <NotificationCard data={item} />;
            }}
          />
        )}
      </View>
    </ScreenLayout>
  );
};
export default Notifications;
const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 20,
    height: "100%",
  },
});
