import React, { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../../../utils/colors";
import { getToken, getUserData } from "../../../redux/reducers/authReducer";
import { useSelector } from "react-redux";
import { getLocalizeFile } from "../../../redux/reducers/localizeReducer";
import HTML from "react-native-render-html";
import ScreenLayout from "../../../components/ScreenLayout";
import { ApiServices } from "../../../api/ApiServices";
import SimpleLoader from "../../../components/SimpleLoader";
import CustomToast from "../../../components/CustomToast";

type Props = {
  navigation?: any;
  route?: any;
};
const windowHeight = Dimensions.get("window").height;
const Redeem = ({ navigation, route }: Props) => {
  const localize: any = useSelector(getLocalizeFile);

  const [htmlContent, setHtmlContent] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isMessage, setIsMessage] = useState(false);
  const token = useSelector(getToken);

  useEffect(() => {
    getContent();
  }, []);

  const getContent = () => {
    setIsLoading(true);

    ApiServices.getRedeemContent(
      token,
      async ({ isSuccess, response }: any) => {
        setIsLoading(false);

        if (isSuccess) {
          if (response?.success) {
            setIsLoading(false);
            setHtmlContent(response?.data?.redeem_content);
          } else {
            setIsLoading(false);
            setMessage(response?.message);
            setIsMessage(true);
          }
        } else {
          setIsLoading(false);

          Alert.alert("Alert!", "Something went wrong");
        }
      }
    );
  };

  return (
    <>
      <ScreenLayout
        navigation={navigation}
        title={localize?.reward_redeem_title}
        bgColor={colors.white}
        height={"100%"}
        isLineVisible={true}
        linePosition={"flex-start"}
      >
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
          <ScrollView
            contentContainerStyle={{
              flex: 1,
              backgroundColor: colors.white,
            }}
            style={{
              backgroundColor: colors.white,
              paddingHorizontal: 15,
            }}
          >
            {isLoading ? (
              <SimpleLoader />
            ) : (
              <HTML source={{ html: htmlContent }} />
            )}
          </ScrollView>
        </SafeAreaView>
      </ScreenLayout>

      <CustomToast
        isVisable={isMessage}
        setIsVisable={setIsMessage}
        message={message}
        color={colors.white}
      />
    </>
  );
};
export default Redeem;

const styles = StyleSheet.create({
 

});
