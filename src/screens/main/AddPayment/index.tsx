import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Image, Platform, View } from "react-native";
import ScreenLayout from "../../../components/ScreenLayout";
import { colors } from "../../../utils/colors";
import { useSelector } from "react-redux";
import { getToken, getUserData } from "../../../redux/reducers/authReducer";
import { getApiUrl, getStripeApiUrl } from "../../../api";
import { WebView } from "react-native-webview";
import { URLS } from "../../../api/urls";
import { getLocalizeFile } from "../../../redux/reducers/localizeReducer";
import { getVersion } from "react-native-device-info";

type Props = {
  navigation?: any;
};
const AddPayment = ({ navigation }: Props) => {
  const [isWebViewLoading, setIsWebViewLoading] = useState(true);
  const localize:any=useSelector(getLocalizeFile)
   const installedVersion = getVersion();
  //  "Device-Type": Platform.OS,
  //  "Installed-App": installedVersion,
  const token = useSelector(getToken);
  const webViewRef = useRef(null);
  const stripeWebView = `${URLS.STRIPE_LIVE_URL}${URLS.ADD_STRIPE_PAYMENT}?entityUUID=${URLS.ENTITY_UID}&authToken=${token}&deviceType=${Platform.OS}&installedApp=${installedVersion}`;

  console.log("stripeWebView",stripeWebView)
  return (
    <ScreenLayout
      navigation={navigation}
      title="Add Payment"
      style={{
        paddingHorizontal: 20,
      }}
    >
      <View
        style={{
          height: "100%",
        }}
      >
        {isWebViewLoading && (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              width: "100%",
            }}
          >
            <ActivityIndicator size={"large"} color={colors.primary} />
          </View>
        )}
        {stripeWebView && (
          <WebView
            onLoadEnd={() => {
              setIsWebViewLoading(false);
            }}
            onNavigationStateChange={(n) => {
              if (n.url == getStripeApiUrl(URLS.STRIPE_PAYMENT_METHOD_ADDED)) {
                navigation.goBack();
              }
            }}
            ignoreSslError={true}
            ref={webViewRef}
            style={{
              justifyContent: "center",
              paddingVertical: 20,
            }}
            source={{ uri: stripeWebView }}
          />
        )}
      </View>
    </ScreenLayout>
  );
};
export default AddPayment;
