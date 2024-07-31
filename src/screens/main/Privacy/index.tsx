import React, { useState } from "react";
import {
  View,
  Pressable,
  Linking,
  Platform,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import ScreenLayout from "../../../components/ScreenLayout";
import CustomText from "../../../components/CustomText";
import { font } from "../../../utils/font";
import { colors } from "../../../utils/colors";
import SettingCards from "../../../components/SettingCards";
import PrivacyCard from "../../../components/PrivacyCard";
import { useDispatch, useSelector } from "react-redux";
import {
  getLocationAccess,
  setLocationAccess,
  setUserLocation,
} from "../../../redux/reducers/locationReducer";
import { usePermissions } from "../../../utils/Permissions/usePermissions";
import {
  CURRENT_POSITION,
  LOCATIO_ACCESS,
  StorageServices,
} from "../../../utils/hooks/StorageServices";
import { images } from "../../../assets";
import { ApiServices } from "../../../api/ApiServices";
import { getUserData, setUserData } from "../../../redux/reducers/authReducer";
import CustomToast from "../../../components/CustomToast";
import ScreenLoader from "../../../components/ScreenLoader";
import { getLocalizeFile } from "../../../redux/reducers/localizeReducer";
import { setCartData, setEmptyCard } from "../../../redux/reducers/cartReducer";
import { isiPad } from "../../../utils/CommonFun";
import { scale } from "react-native-size-matters";

type Props = {
  navigation?: any;
};
const Privacy = ({ navigation }: Props) => {
  const locationAccess = useSelector(getLocationAccess);
  const user = useSelector(getUserData);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isMessage, setIsMessage] = useState(false);
  const localize: any = useSelector(getLocalizeFile);

  const dispatch = useDispatch();
  const onChangeLocationAccess = async (x: boolean) => {
    StorageServices.setItem(LOCATIO_ACCESS, JSON.stringify(!locationAccess));
    dispatch(setLocationAccess(!locationAccess));
  };
  const _deleteAccount = (item: any) => {
    const data = {
      token: user.token,
      id: Number(user.id),
    };
    setIsLoading(true);

    ApiServices.deleteUser(data, async ({ isSuccess, response }: any) => {
      if (isSuccess) {
        const result = response;
        if (result.success) {
          dispatch(setUserData(null));
          dispatch(setEmptyCard(null));
          StorageServices.removeItem();

          navigation.navigate("Login", { isLogut: true });

          setIsLoading(false);
        } else {
          setIsLoading(false);
          setMessage(result?.message);
          setIsMessage(true);

          Alert.alert("Alert!", "Something went wrong");
        }
      } else {
        setIsLoading(false);

        Alert.alert("Alert!", "Something went wrong");
      }
      // resolve(result);
    });
  };

  const onDeleteAccount = () => {
    Alert.alert(`${localize?.privacy_security_delete_account_alert_title}`, `${localize?.privacy_security_delete_account_alert_description}`, [
      {
        text: `${localize?.privacy_security_delete_account_alert_cancel_button}`,
        onPress: () => console.log("Cancel Pressed"),
        // style: "cancel",
      },
      { text: `${localize?.privacy_security_delete_account_alert_delete_button}`, onPress: _deleteAccount, style: "destructive" },
    ]);
  };

  return (
    <>
      <ScreenLayout
        navigation={navigation}
        title={localize?.profile_setting_privacy_Security_title}
        style={{
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            backgroundColor: colors.white,
            paddingHorizontal: 20,
            paddingVertical: 10,
            height: "100%",
            marginVertical: "7%",
          }}
        >
          {/* localize?.privacy_security_location_access_title */}
          <PrivacyCard
            title={localize?.privacy_security_location_access_title}
            value={locationAccess}
            onChangeValue={onChangeLocationAccess}
          />

          <SettingCards
            screen={"HelpAndPolicies"}
            navigation={navigation}
            size={isiPad ? 20 : 14}
            title={localize?.privacy_security_help_policies_title}
            fontFam={font.montserratSemiBold}
          />
          <SettingCards
            size={isiPad ? 20 : 14}
            screen={"PrivacyNotes"}
            navigation={navigation}
            title={localize?.privacy_security_privacy_notice_title}
            // title="Privacy Notice"
            fontFam={font.montserratSemiBold}
          />
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={onDeleteAccount}
            // key={index}
          >
            <View style={styles.cardContainer}>
              <CustomText
                text={localize?.privacy_security_delete_account_title}
                fontFam={font.montserratMedium}
                size={isiPad ? 20 : 14}
                color={colors.warning}
                fontWeight={"500"}
              />
              <Image
                source={images.arrow}
                style={{ width: scale(15), height: scale(15) }}
              />
            </View>
            <View
              style={{
                backgroundColor: colors.primary,
                opacity: 0.25,
                height: 2,
              }}
            />
          </TouchableOpacity>
        </View>
      </ScreenLayout>
      <CustomToast
        isVisable={isMessage}
        setIsVisable={setIsMessage}
        message={message}
        color={colors.white}
      />

      {isLoading && <ScreenLoader />}
    </>
  );
};
export default Privacy;

const styles = StyleSheet.create({
  cardContainer: {
    paddingVertical: 21,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
