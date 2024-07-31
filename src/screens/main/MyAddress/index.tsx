import React, { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
  Alert,
  Pressable,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { colors } from "../../../utils/colors";
import Header from "../../../components/Header";
import { images } from "../../../assets";
import MapView, { PROVIDER_GOOGLE, Marker, Animated } from "react-native-maps";

import { useDispatch, useSelector } from "react-redux";
import {
  getCartData,
  setDecrementCartItem,
  setIncrementCartItem,
} from "../../../redux/reducers/cartReducer";
import { Spacer } from "../../../components/Spacer";
import CustomSearch from "../../../components/CustomSearch";
import { getUserLocation } from "../../../redux/reducers/locationReducer";
import CustomButton from "../../../components/CustomButton";
import Geocoder from "react-native-geocoding";
import { URLS } from "../../../api/urls";
import { ApiServices } from "../../../api/ApiServices";
import {
  getToken,
  setIsAddressModal,
} from "../../../redux/reducers/authReducer";
import PredictionList from "../../../components/PredictionList";
import AbsoluteView from "../../../components/AbsoluteView";
import { useIsFocused } from "@react-navigation/native";
import { font } from "../../../utils/font";
import CustomText from "../../../components/CustomText";
import { getLocalizeFile } from "../../../redux/reducers/localizeReducer";
import { isiPad, sessionCheck } from "../../../utils/CommonFun";
import { verticalScale } from "react-native-size-matters";

type Props = {
  navigation?: any;
};

const windowHeight = Dimensions.get("window").height;
const MyAddress = ({ navigation }: Props) => {
  const userLocation = useSelector(getUserLocation);
  const [lodaing, setLoading] = useState(false);
  const [isPredictionList, setIsPredictionList] = useState(false);
  const token = useSelector(getToken);
  const [search, setSearch] = useState("");
  const [predictionData, setPredictionData] = useState([]);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const LATITUDE_DALDA = 0.009;
  const LONGITUDE_DALDA = 0.009;
  const localize:any=useSelector(getLocalizeFile)

  const [locationData, setLocationData] = useState({
    name: "",
    address: "",
    lat: 0,
    long: 0,
  });

  const mapREf = useRef<any>(null);
  const GOOGLE_PACES_API_BASE_URL =
    "https://maps.googleapis.com/maps/api/place";
  useEffect(() => {
    currentPosition(userLocation.latitude, userLocation.longitude);
  }, [isFocused]);

  const currentPosition = (lan: any, long: any) => {
    Geocoder.init(URLS.GOOGLE_MAP_KEY, { language: "en" });
    Geocoder.from(lan, long)
      .then(async (json) => {
        // console.log(
        //   "json?.results[0].formatted_address",
        //   json?.results[0].address_components[1]?.short_name
        // );
        // console.log("JsonData",json)
        setLocationData({
          lat:lan,
          long:long,
          name: json?.results[0].address_components[1]?.short_name,
          address: json?.results[0].formatted_address,
        });
      })
      .catch(async (error) => {
        console.warn(error);
        // setLoadingLocation(false);
        // await removeItem()
      });
  };
// console.log("locationData",locationData)
  const onAddAddress = () => {
    if (!locationData?.name) {
      Alert.alert("",localize?.checkout_address_location_address_name_field_validation);

      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("name", locationData?.name);
    formData.append("address", locationData.address);
    formData.append("latitude", locationData?.lat);
    formData.append("longitude", locationData.long);
    let data = {
      data: formData,
      token: token,
    };
    ApiServices.addUserAddress(data, async ({ isSuccess, response }: any) => {
      if (isSuccess) {
        if (response?.success) {
          setLoading(false);
          dispatch(setIsAddressModal(true));

          navigation.goBack();
        } else {
          setLoading(false);

          if (response?.app_update_status==1 ||response?.session_expire) {
            sessionCheck(response?.app_update_status,response?.session_expire,dispatch);
            return;
          }
          
          // Alert.alert("Alert!", "Network Error.");
        }
      } else {
        setLoading(false);
        Alert.alert("Alert!", "Something went wrong");
      }
    });
  };

  const onReCenter = () => {
    const targetCoordinate = {
      latitude: userLocation?.latitude,
      longitude: userLocation?.longitude,
    };

    // Animate the map to the target coordinate
    mapREf.current?.animateCamera({
      center: targetCoordinate,
      latitudeDelta: LATITUDE_DALDA,
      longitudeDelta: LONGITUDE_DALDA,
      duration: 1000, // Animation duration in milliseconds
    });
  };

  const onSearch = async (txt: any) => {
    setSearch(txt);
    if (txt.length == 0) {
      setIsPredictionList(false);

      return;
    }
    setIsPredictionList(true);
    const apiUrl = `${GOOGLE_PACES_API_BASE_URL}/autocomplete/json?key=${"AIzaSyC3ZsD7NPYT5dL3mapSdPtHMwiTYpejlSQ"}&input=${txt}`;
    try {
      let result = await fetch(apiUrl);
      let data = await result.text();
      let d = JSON.parse(data);
      if (d.status == "OK") {
        let { predictions } = d;
        setPredictionData(predictions);

        // this.setState({ predictions: predictions });
      }
    } catch (e) {
      Alert.alert("Alert!", "Something went wrong");

  
    }
  };

  const onPressLocationAddress = async (i:any) => {
    const apiUrl = `${GOOGLE_PACES_API_BASE_URL}/details/json?key=${URLS.GOOGLE_MAP_KEY}&place_id=${i.place_id}`;
    let call = await fetch(apiUrl);
    let res = await call.text();
    let result = await JSON.parse(res);
    if (result.result) {
      const {
        geometry: { location },
        formatted_address,
        name,
      } = result.result;
      setIsPredictionList(false);

      setSearch("");

      setLocationData({
        ...locationData,
        name: name,
        address: formatted_address,
        lat: location.lat,
        long: location.lng,
      });
      const targetCoordinate = {
        latitude: location?.lat,
        longitude: location?.lng,
      };

      // Animate the map to the target coordinate
      mapREf.current?.animateCamera({
        center: targetCoordinate,
        zoom: 0, // Adjust the zoom level as needed
        duration: 1000, // Animation duration in milliseconds
      });
    }
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
        <Pressable onPress={() => Keyboard.dismiss()} style={{ flex: 1 }}>
          <View style={styles.top}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButtonContainer}
            >
              <Image source={images.backArrow} style={styles.backArrowIcon} />
            </TouchableOpacity>

            <CustomSearch
              width={"78%"}
              height={isiPad?verticalScale(30):45}
              placeholder={localize?.checkout_address_location_field_place_holder}
              backgroundColor={colors.grey}
              value={search}
              textColor={colors.primary}
              isCross
              onPressClose={() => {
                setIsPredictionList(false);
                setSearch("");
              }}
              onChangeText={(txt:any) => onSearch(txt)}
            />
            <TouchableOpacity
              onPress={() => onReCenter()}
              style={{ ...styles.backButtonContainer, alignItems: "center" }}
            >
              <Image
                source={images.targetlocation}
                style={{
                  width: isiPad?40:  27,
                  height:isiPad?40: 27,
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={{ height: "70%" }}>
            <MapView.Animated
              ref={mapREf}
              zoomControlEnabled={false}
              showsBuildings={true}
              showsCompass={false}
              toolbarEnabled={false}
              onRegionChangeComplete={(data) => {
                setLocationData({
                  ...locationData,
                  lat: data.latitude,
                  long: data.longitude,
                });
                currentPosition(data.latitude, data.longitude);
              }}
              initialRegion={{
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
                latitudeDelta: LATITUDE_DALDA,
                longitudeDelta: LONGITUDE_DALDA,
              }}
              // provider={PROVIDER_GOOGLE}
              style={{
                height: "100%",
                width: "100%",
              }}
            ></MapView.Animated>
            <View
              style={{
                alignSelf: "center",
                position: "absolute",
                top: "40%",
              }}
            >
              <Image
                style={{ width: isiPad?70:  50, height:isiPad?70:  50, tintColor: colors.primary }}
                source={images.addlocation}
              />
            </View>
          </View>
          {
            Platform.OS=="ios"?(
              <KeyboardAvoidingView
              behavior="position"
              style={{ flex: 1 }}
              contentContainerStyle={{ flex: 1 }}
              keyboardVerticalOffset={30}
            >
              <View style={styles.absoluteView}>
                <View style={{ alignSelf: "center" }}>
                  <CustomSearch
                    placeholder={localize?.checkout_address_location_address_name_field_place_holder}
                    backgroundColor={colors.grey}
                    width={"90%"}
                    height={isiPad?verticalScale(30):45}

                    value={locationData?.name}
                    textColor={colors.primary}
                    onChangeText={(txt) =>
                      setLocationData({ ...locationData, name: txt })
                    }
                  />
                </View>
  
                <Spacer height={20} />
                <CustomText
                  text={locationData?.address}
                  style={{ marginHorizontal: 20,marginLeft: isiPad? 50:20}}
              
                  size={isiPad?16:13}

                  fontWeight="500"
                  fontFam={font.montserratMedium}
                  color={colors.primary}
                />
                <Spacer height={20} />
  
                <CustomButton
                  text={localize?.checkout_address_location_save_button}
                  onPress={onAddAddress}
                  disable={lodaing}
                  isLoading={lodaing}
                  height={isiPad ? verticalScale(33) : 50}
                  shadowOpacity={0.3}
                  size={isiPad ? 22 : 18}
                  style={{ alignSelf: "center" }}
                  borderRadius={32}
                  width="50%"
                />
              </View>
            </KeyboardAvoidingView>

            ):(
        
              <View style={styles.absoluteView}>
                <View style={{ alignSelf: "center" }}>
                  <CustomSearch
                    placeholder={localize?.checkout_address_location_address_name_field_place_holder}
                    backgroundColor={colors.grey}
                    width={"90%"}
                    value={locationData?.name}
                    textColor={colors.primary}
                    onChangeText={(txt:any) =>
                      setLocationData({ ...locationData, name: txt })
                    }
                  />
                </View>
  
                <Spacer height={20} />
                <CustomText
                  text={locationData?.address}
                  style={{ marginHorizontal: 20 }}
                  size={13}
                  fontWeight="500"
                  fontFam={font.montserratMedium}
                  color={colors.primary}
                />
                <Spacer height={20} />
  
                <CustomButton
                  text={localize?.checkout_address_location_save_button}
                  onPress={onAddAddress}
                  disable={lodaing}
                  isLoading={lodaing}
                  height={50}
                  style={{ alignSelf: "center" }}
                  borderRadius={32}
                  width="50%"
                />
              </View>
            )
          }
        
        </Pressable>
      </SafeAreaView>
      {isPredictionList && (
        <PredictionList
          onAddressPress={(i) => onPressLocationAddress(i)}
          Addresses={predictionData}
        />
      )}

      {lodaing && <AbsoluteView />}
    </>
  );
};
export default MyAddress;

const styles = StyleSheet.create({
  backButtonContainer: {
    width: 45,
    height: 30,
    justifyContent: "center",
  },
  backArrowIcon: {
    width: isiPad?50:  32,
    height: isiPad?50:  32,
    marginTop: 5,
  },
  top: {
    flexDirection: "row",
    paddingHorizontal: 10,
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 2,
    justifyContent: "space-between",
    backgroundColor: colors.white,
  },
  absoluteView: {
    height: isiPad?300: 200,
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: "absolute",
    bottom: 20,
    paddingVertical: 35,
    backgroundColor: colors.white,
  },
});
