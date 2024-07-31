import React, { useEffect, useState } from "react";
import { Alert, SafeAreaView, ScrollView, } from "react-native";
import { colors } from "../../../utils/colors";
import { getToken, } from "../../../redux/reducers/authReducer";
import { useDispatch, useSelector } from "react-redux";
import { getLocalizeFile } from "../../../redux/reducers/localizeReducer";
import HTML from "react-native-render-html";
import ScreenLayout from "../../../components/ScreenLayout";
import { ApiServices } from "../../../api/ApiServices";
import SimpleLoader from "../../../components/SimpleLoader";
import CustomToast from "../../../components/CustomToast";
import { URLS } from "../../../api/urls";
import { sessionCheck } from "../../../utils/CommonFun";

type Props = {
  navigation?: any;
  route?: any;
};
const TermAndCondition = ({ navigation, route }: Props) => {
  const localize: any = useSelector(getLocalizeFile);
  const [htmlContent, setHtmlContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isMessage, setIsMessage] = useState(false);
  const token = useSelector(getToken);
  const dispatch=useDispatch()
  useEffect(() => {
    getContent();
  }, []);
  const getContent = () => {
    setIsLoading(true);
    const params = {
      token: token,
      endPoint: URLS.GET_TERMCONDITION__CONTENT,
    };
    ApiServices.getAppConTent(
      params,

      async ({ isSuccess, response }: any) => {
        setIsLoading(false);
        if (isSuccess) {
          if (response?.success) {
            setIsLoading(false);
            setHtmlContent(response?.data?.term_condition_content);
          } else {
            setIsLoading(false);
            if (response?.app_update_status==1 ||response?.session_expire) {
              sessionCheck(response?.app_update_status,response?.session_expire,dispatch);
              return;
            }
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
        title={localize?.checkout_terms_of_service_title}
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
export default TermAndCondition;
