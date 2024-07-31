import React, {
  useState,
  useEffect,
} from "react";
import { FlatList, View, StyleSheet, Pressable, Alert } from "react-native";
import ScreenLayout from "../../../components/ScreenLayout";
import { colors } from "../../../utils/colors";
import CustomText from "../../../components/CustomText";
import { font } from "../../../utils/font";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../../../redux/reducers/authReducer";
import { getLocalizeFile } from "../../../redux/reducers/localizeReducer";
import PointsHistoryCard from "./PointsHistoryCard";
import { PointsHistoryLayout } from "../../../utils/Layouts/PointsHistoryLayout";
import {  useIsFocused } from "@react-navigation/native";
import { ApiServices } from "../../../api/ApiServices";
import { sessionCheck } from "../../../utils/CommonFun";
import * as Animatable from "react-native-animatable";

type Props = {
  navigation?: any;
};

const PointsHistory = ({ navigation }: Props) => {
  const token = useSelector(getToken);
  const localize: any = useSelector(getLocalizeFile);
  const [loading, setLoading] = useState(true);
  const focused = useIsFocused();
  const [pointsData, setPointsData] = useState([]);


  const dispatch = useDispatch();
  useEffect(() => {
    getUserPointsHistory();
    // getOrder();
  }, [focused]);

  const getUserPointsHistory = () => {
    setLoading(true);
    ApiServices.getPointsHistory(
      token,
      async ({ isSuccess, response }: any) => {
        if (isSuccess) {
          if (response?.success) {
            setPointsData(response?.data);
            setLoading(false);
          } else {
            setLoading(false);
            if (response?.app_update_status == 1 || response?.session_expire) {
              sessionCheck(
                response?.app_update_status,
                response?.session_expire,
                dispatch
              );
              return;
            }
          }
        } else {
          Alert.alert("Alert!", "Something went wrong");
        }
      }
    );
  };

  return (
    <>
      <ScreenLayout
        navigation={navigation}
        title={localize?.profile_setting_loyalty_points_history_title}
        style={styles.container}
      >
        <View
          style={{
            marginBottom: 40,

            height: "100%",
          }}
        >
          {loading ? (
            <>
              <View style={{ marginTop: 20, height: "100%" }}>
                <PointsHistoryLayout />
              </View>
            </>
          ) : (
            <View
              style={{
                backgroundColor:
                  pointsData?.length == 0 ? "transparent" : colors.white,
                marginTop: "5%",
                paddingBottom: 5,
              }}
            >
              {pointsData.length > 0 ? (
                <>
                  <FlatList
                    data={pointsData}
                    nestedScrollEnabled={true}
                    contentContainerStyle={{ gap: 20 }}
                    renderItem={({ item, index }: any) => {
                      return (
                        <Animatable.View
                          duration={1000}
                          animation={"fadeIn"}
                          delay={index * 300}
                        >
                          <PointsHistoryCard data={item} key={index} />
                        </Animatable.View>
                      );
                    }}
                    keyExtractor={(item, index) => index.toString()}
                  />
                </>
              ) : (
                <View
                  style={{
                    height: "90%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CustomText
                    size={17}
                    fontWeight="500"
                    fontFam={font.montserratMedium}
                    color={colors.primary}
                    // style={{ marginLeft: 20, marginTop: 20, marginBottom: 10 }}
                    text={"No Points History Exist"}
                  />
                </View>
              )}
            </View>
          )}
        </View>
      </ScreenLayout>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    height: "100%",
  },
  cardContainer: {
    backgroundColor: "transparent",
    marginTop: "5%",
    paddingBottom: 5,
  },
});

export default PointsHistory;
