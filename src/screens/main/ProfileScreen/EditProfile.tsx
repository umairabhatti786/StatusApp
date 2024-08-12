import {
  Alert,
  Image,
  Linking,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { appStyles } from "../../../utils/AppStyles";
import { images } from "../../../assets/images";
import CustomText from "../../../components/CustomText";
import { colors } from "../../../utils/colors";
import CustomButton from "../../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { windowHeight, windowWidth } from "../../../utils/Dimensions";
import CustomTextInput from "../../../components/CustomTextInput";
import { Spacer } from "../../../components/Spacer";
import { scale, verticalScale } from "react-native-size-matters";
import ToggleSwitch from "toggle-switch-react-native";
import DropDown from "../../../components/DropDown";
import {
  LookingForData,
  OrientationData,
  RelationshipStatusData,
  data,
} from "../../../utils/Data";
import NewText from "../../../components/NewText";
import ImagePicker from "react-native-image-crop-picker";
import { usePermissions } from "../../../utils/Permissions";
import { openSettings } from "react-native-permissions";
import Button from "../../../components/Button";
import FastImage from "react-native-fast-image";
import Input from "../../../components/Input";
import { URLS } from "../../../api/baseUrl";
import PredictionList from "../../auth/ProfileSetup/PredictionList";
import CustomToast from "../../../components/CustomToast";
import { isUrlValid } from "../../../utils/Regex";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-native-date-picker";

import {
  GiphyContentType,
  GiphyDialog,
  GiphyDialogEvent,
  GiphyDialogMediaSelectEventHandler,
  GiphyMedia,
  GiphySDK,
  GiphyTheme,
  GiphyThemePreset,
} from "@giphy/react-native-sdk";
import {
  getProfileGifs,
  getToken,
  setProfileGif,
  setUserData,
} from "../../../redux/reducers/authReducer";
import { UserProfileSetup } from "../../../api/ApiServices";
import Loader from "../../../components/Loader";
import ImageCropPicker, {
  Image as ImagePickerType,
} from "react-native-image-crop-picker";
import CustomBottomSheet from "../../../components/CustomBottomSheet";
import LookingFor from "../../../components/LookingFor";

GiphySDK.configure({ apiKey: "C9JfKgGLTfcnLfvQ8O189iehEyTOq0tm" });
GiphyDialog.configure({
  mediaTypeConfig: [
    GiphyContentType.Emoji,
    GiphyContentType.Gif,
    GiphyContentType.Sticker,
    GiphyContentType.Text,
  ],
  showConfirmationScreen: true,
});
const theme: GiphyTheme = {
  preset: GiphyThemePreset.Light,
  backgroundColor: colors.black300,
  cellCornerRadius: 12,
  defaultTextColor: colors.white,
};
GiphyDialog.configure({ theme });

const EditProfile = ({ route }: any) => {
  const navigation: any = useNavigation();
  const [male, setMale] = useState(false);
  const [doesApply, setDoesApply] = useState(false);
  const [selectedGender, setSelectedGender] = useState(0);
  const [isUplaodWallpaper, setIsUplaodWallpaper] = useState(false);
  const [isUplaodPicture, setIsUplaodPicture] = useState(false);
  const [isPredictionList, setIsPredictionList] = useState(false);
  const [predictionData, setPredictionData] = useState([]);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isGiphyOne, setIsGiphyOne] = useState(false);
  const [isGiphyTwo, setIsGiphyTwo] = useState(false);

  const [toastColor, setToastColor] = useState(colors.red);
  const token = useSelector(getToken);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [selectedGifs, setSelectedGifs] = useState<any>([]);

  const [gif1, setGif1] = useState("");
  const [gif2, setGif2] = useState("");

  const [selectedMedia, setSelectedMedia] = useState<
    null | Partial<ImagePickerType> | Partial<GiphyMedia>
  >(null);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const bottomSheetModalRef = useRef(null);

  const profileGifs = useSelector(getProfileGifs);

  const dispatch = useDispatch();
  console.log("selectedGifs", selectedGifs);
  const userData = route?.params?.data;

  // const [profileType, setProfileType] = useState(
  //   userData?.profileType ? userData?.profileType : ""
  // );
  const [orientation, setOrientation] = useState(
    userData?.orientation ? userData?.orientation : "Undisclosed"
  );
  const [relationshipStatus, setRelationshipStatus] = useState(
    userData?.relationshipStatus ? userData?.relationshipStatus : "Undisclosed"
  );

  console.log("orientationccccc", orientation);
  const [birthday, setIsBirthday] = useState("");

  const [values, setValues] = useState({
    wallComments: userData?.wallComments,
    showAge: userData?.showAge,
    bio: userData?.bio ? userData?.bio : "",
    imageUrl: userData?.imageUrl ? userData?.imageUrl : "",
    wallpaperUrl: userData?.wallpaperUrl ? userData?.wallpaperUrl : "",
    // gif1: userData?.gif1 ? userData?.gif1 : "",
    name: userData?.name ? userData?.name : "",
    gender: userData?.gender ? userData.gender : "",
    birthday: userData?.birthday ? userData.birthday : "",
    occupation: "",
    link: userData?.link ? userData?.link : "",
    // profileType: userData?.profileType ? userData?.profileType : "",
    // gif2: userData?.gif2 ? userData?.gif2 : "",
    location: userData?.location ? userData?.location : "",
    lat: userData?.lat ? userData?.lat : "",
    lng: userData?.lng ? userData?.lng : "",
    interestTags: userData?.interestTags
      ? JSON?.parse(userData?.interestTags)
      : [],
  });

  const [deleteWallImage, setDeleteWallImage] = useState(0);
  const [deleteUserImage, setDeleteUserImage] = useState(0);
  const [deleteGif1, setDeleteGif1] = useState(0);
  const [deleteGif2, setDeleteGif2] = useState(0);

  const nonEmptySelectedGifs = selectedGifs.filter((gif) => gif !== "");
  console.log("profileGifs", values?.imageUrl);

  useEffect(() => {
    setSelectedGifs((prevSelectedGifs) => [userData.gif1, userData.gif2]);

    // if (userData.gif1 && userData.gif2) {
    // } else if (!userData.gif1) {
    //   setSelectedGifs((prevSelectedGifs) => [userData.gif2]);
    // } else if (!userData.gif2) {
    //   setSelectedGifs((prevSelectedGifs) => [userData.gif1]);
    // }
  }, []);

  const { requestGalleryPermission } = usePermissions();

  const profileTypeData = [
    {
      id: 1,
      label: "All",
      value: "All",
    },
    {
      id: 2,
      label: "Actor",
      value: "Actor",
    },

    {
      id: 3,
      label: "Athlete",
      value: "Athlete",
    },
    {
      id: 4,
      label: "Bodybuilder",
      value: "Bodybuilder",
    },
    {
      id: 5,
      label: "Comedian",
      value: "Comedian",
    },
    {
      id: 6,
      label: "Fighter",
      value: "Fighter",
    },

    {
      id: 7,
      label: "Filmmaker",
      value: "Filmmaker",
    },
    {
      id: 8,
      label: "Founder",
      value: "Founder",
    },

    {
      id: 9,
      label: "Influencer",
      value: "Influencer",
    },
    {
      id: 10,
      label: "Model",
      value: "Model",
    },
    {
      id: 11,
      label: "Musician",
      value: "Musician",
    },
    {
      id: 12,
      label: "Podcaster",
      value: "Podcaster",
    },
    {
      id: 13,
      label: "Rapper",
      value: "Rapper",
    },
    {
      id: 14,
      label: "Reality Star",
      value: "Reality Star",
    },

    {
      id: 15,
      label: "Streamer",
      value: "Streamer",
    },
    {
      id: 16,
      label: "YouTuber",
      value: "YouTuber ",
    },
    {
      id: 16,
      label: "Other",
      value: "Other ",
    },
  ];

  useEffect(() => {
    const handler: GiphyDialogMediaSelectEventHandler = (e) => {
      setSelectedGifs((prevSelectedGifs) => [...prevSelectedGifs, e.media.url]);

      GiphyDialog.hide();
    };
    const listener = GiphyDialog.addListener(
      GiphyDialogEvent.MediaSelected,
      handler
    );
    return () => {
      listener.remove();
    };
  }, []);
  const onSearch = async (txt: any) => {
    setValues({ ...values, location: txt });

    // setSearch(txt);
    if (txt.length == 0) {
      setIsPredictionList(false);
      setValues({ ...values, lat: null, lng: null, location: "" });

      return;
    }
    setIsPredictionList(true);
    const apiUrl = `${
      URLS.GOOGLE_PLACES_API_BASE_URL
    }/autocomplete/json?key=${"AIzaSyAPdcIXBWUTbWk8uZJhTbhXrixAeIdwz_0"}&input=${txt}`;
    try {
      let result = await fetch(apiUrl);
      let data = await result.text();
      let d = JSON.parse(data);
      if (d.status == "OK") {
        let { predictions } = d;
        console.log("cibdicbduc", predictions);
        setPredictionData(predictions);

        // this.setState({ predictions: predictions });
      }
    } catch (e) {
      Alert.alert(e);
    }
  };

  const onPressLocationAddress = async (i) => {
    console.log("knvkdnkvd");
    const apiUrl = `${URLS.GOOGLE_PLACES_API_BASE_URL}/details/json?key=${URLS.GOOGLE_MAP_KEY}&place_id=${i.place_id}`;
    let call = await fetch(apiUrl);
    let res = await call.text();
    let result = await JSON.parse(res);
    console.log("isPredictionList", result);

    if (result.result) {
      const {
        geometry: { location },
        formatted_address,
        name,
      } = result.result;

      setIsPredictionList(false);
      setValues({
        ...values,
        lat: location.lat,
        lng: location.lng,
        location: formatted_address,
      });
    }
  };
  const onOpenGallery = async (isPicture: any) => {
    console.log("ISpucvibdv", isPicture);
    let gallerypermission = await requestGalleryPermission();
    if (gallerypermission == "granted" || gallerypermission == "limited") {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        mediaType: "photo",
        forceJpg: true,
      }).then(async (result) => {
        if (result) {
          const fileName = result?.path?.split("/").pop();
          let data = {
            ...result,
            fileName: fileName,
            name: fileName,
            size: result?.size,
            height: result?.height,
            type: result?.mime,
            uri: result?.path,
            width: result?.width,
          };
          if (isPicture) {
            setIsUplaodPicture(true);
            setValues({ ...values, imageUrl: data });
          } else {
            setIsUplaodWallpaper(true);
            setValues({ ...values, wallpaperUrl: data });
          }
        }
      });
    } else {
      if (gallerypermission == "blocked") {
        if (Platform.OS == "ios") {
          openSettings();
        } else {
          Linking.openSettings();
        }
      }
    }
  };

  const onSave = () => {
    if (!values?.name) {
      setError("Name is Required");
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 4000);

      return;
    }
    if (!values?.lat || !values.lng) {
      setError("Location is Required");
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 4000);

      return;
    }
    // if (!values.imageUrl) {
    //   setError("Image is Required");
    //   setShowError(true);
    //   setTimeout(() => {
    //     setShowError(false);
    //   }, 4000);

    //   return;
    // }

    // if (!values.imageUrl) {
    //   setError("Image is Required");
    //   setShowError(true);
    //   setTimeout(() => {
    //     setShowError(false);
    //   }, 4000);

    //   return;
    // }
    if (!values.gender) {
      setError("Gender is required");
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 4000);

      return;
    }

    if (values.interestTags.length == 0) {
      setError("Please Select at least one Looking For");
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 4000);

      return;
    }
    // if (!values.bio) {
    //   setError("Bio required");
    //   setShowError(true);
    //   setTimeout(() => {
    //     setShowError(false);
    //   }, 4000);

    //   return;
    // }
    // if (!values.link) {
    //   setError("Link required");
    //   setShowError(true);
    //   setTimeout(() => {
    //     setShowError(false);
    //   }, 4000);

    //   return;
    // }
    if (values.link) {
      let validLink = isUrlValid(values.link);
      if (!validLink) {
        setError("inValid link");
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
        }, 4000);

        return;
      }
    }
    const nonEmptySelectedGifs = selectedGifs.filter((gif) => gif !== "");

    console.log("nonEmptySelectedGifs[0]", nonEmptySelectedGifs[0]);

    const form = new FormData();
    form.append("wallComments", values.wallComments ? 1 : 0);
    form.append("birthday", values.birthday);
    form.append("gender", values.gender);
    form.append("occupation", "");
    form.append("link", values.link);
    form.append("bio", values?.bio);
    form.append("isModel", 1);
    form.append("profileType", "Other");
    form.append("wallpaperUrl", values.wallpaperUrl);
    form.append("interestTags", JSON.stringify(values.interestTags));
    form.append("showAge", values.showAge ? 1 : 0);
    form.append("orientation", orientation);
    form.append("relationshipStatus", relationshipStatus);
    console.log(
      "relationshipStatus",
      orientation,
      relationshipStatus,
      values.showAge
    );

    form.append("deleteWallImage", deleteWallImage);
    
    form.append(
      "gif1",
      nonEmptySelectedGifs[0] == undefined ? "" : nonEmptySelectedGifs[0]
    );
    form.append(
      "gif2",
      nonEmptySelectedGifs[1] == undefined ? "" : nonEmptySelectedGifs[1]
    );
    form.append("deleteGif1", deleteGif1);
    form.append("deleteGif2", deleteGif2);
    form.append("name", values.name);
    form.append("imageUrl", values.imageUrl);
    form.append("deleteUserImage", deleteUserImage);
    form.append("location", values?.location);
    form.append("lat", values?.lat);
    form.append("lng", values?.lng);

    setLoading(true);

    UserProfileSetup(form, token, async ({ isSuccess, response }: any) => {
      // console.log("responseData", response);

      if (isSuccess) {
        let result = JSON.parse(response);
        if (result.status) {
          setLoading(false);
          setToastColor(colors.green);
          setError("Profile Updated Successfully");
          dispatch(setUserData(result?.user));
          console.log("UplcdjbcdjYsr", result?.user);

          console.log("formData", form);

          setShowError(true);
          setTimeout(() => {
            setShowError(false);
            navigation.goBack();
          }, 2000);
        } else {
          setLoading(false);
          setToastColor(colors.red);
          setError(result?.msg);
          setShowError(true);
          setTimeout(() => {
            setShowError(false);
          }, 4000);
        }
      } else {
        setLoading(false);

        Alert.alert("Alert!", "Network Error.");
      }
    });
  };

  const toggleSwitch = () => {
    console.log("Vlaurdvjdbfv", values.to);
    //
    setValues({ ...values, wallComments: !values.wallComments });
    // setIsToggle(previousState => !previousState);
  };
  const toggleAgeSwitch = () => {
    // console.log("Vlaurdvjdbfv", values.to);
    //
    setValues({ ...values, showAge: !values.showAge });
    // setIsToggle(previousState => !previousState);
  };
  return (
    <>
      {loading && <Loader />}

      <SafeAreaView style={appStyles.main}>
        <StatusBar backgroundColor="#000" barStyle="light-content" />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingLeft: scale(20),
            paddingRight: scale(10),
            paddingTop: verticalScale(10),
            // padding:10
          }}
        >
          <TouchableOpacity
            style={{ width: "10%" }}
            onPress={() => navigation.goBack()}
          >
            <Image source={images.back} />
          </TouchableOpacity>
          <NewText
            fontWeight="700"
            color={colors.white}
            size={18}
            text={"Edit Your Profile"}
          />
          <CustomButton
            textColor={colors.black}
            bgColor={colors.white}
            onPress={onSave}
            width={75}
            height={35}
            text="Save"
            borderRadius={6}
          />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              paddingHorizontal: scale(20),
              marginTop: "10%",
            }}
          >
            <View style={appStyles.rowjustify}>
              <NewText
                size={17}
                fontWeight="600"
                fontFam="Poppins-Medium"
                color={colors.white}
                text={"Enable Wall Comments?"}
              />
              <ToggleSwitch
                isOn={values?.wallComments}
                onColor={colors.sky}
                offColor={colors.grey300}
                size="small"
                onToggle={toggleSwitch}
                // onToggle={(isOn: boolean)=>setIsToggle}
                thumbOnStyle={{ width: 17, height: 17, borderRadius: 9999 }}
                thumbOffStyle={{ width: 17, height: 17, borderRadius: 9999 }}
                trackOffStyle={{ width: 46, height: 25 }}
                trackOnStyle={{ width: 46, height: 25 }}
              />
            </View>

            <View
              style={{
                ...appStyles.rowjustify,
                marginTop: "9%",
                marginBottom: verticalScale(10),
              }}
            >
              <NewText
                fontWeight="600"
                color={colors.white}
                size={19}
                fontFam="Poppins-Medium"
                text={"Channel Wallpaper"}
              />
              <Button
                text={values?.wallpaperUrl ? "Edit" : "Add"}
                onPress={() => onOpenGallery(false)}
                bgColor={"transparent"}
              />
            </View>
            {values?.wallpaperUrl ? (
              <View style={{ height: windowHeight / 4 }}>
                <FastImage
                  style={styles.wallpaperContainer}
                  resizeMode="cover"
                  source={{
                    uri: isUplaodWallpaper
                      ? values?.wallpaperUrl?.path
                      : values?.wallpaperUrl,
                    headers: { Authorization: "someAuthToken" },
                    priority: FastImage.priority.high,
                  }}
                />

                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => {
                    setValues({ ...values, wallpaperUrl: "" });
                    setDeleteWallImage(1);
                    // console.log('wallpaperUrl',wallImg)
                    // setSelectedGifs((prevSelectedGifs) =>
                    //   prevSelectedGifs.filter((gi, ind) => gi !== gip)
                    // );
                  }}
                  style={styles.crossContainer}
                >
                  <Image
                    style={{ width: "100%", height: "100%" }}
                    source={images.crosswhite}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => onOpenGallery(false)}
                style={styles.wallpaperContainer}
              >
                <Image style={{ width: 16, height: 16 }} source={images.add} />
              </TouchableOpacity>
            )}

            <View
              style={{
                ...appStyles.rowjustify,
                marginTop: "10%",
              }}
            >
              <CustomText
                fontWeight="700"
                color={colors.white}
                size={19}
                text={"Profile Pic"}
              />
              <Button
                text={values?.imageUrl?.includes?.("placeholder") || !values?.imageUrl? "Add" : "Edit"}
                onPress={() => {
                  setDeleteWallImage(1);

                  onOpenGallery(true);
                }}
                bgColor={"transparent"}
              />
            </View>
            {values.imageUrl ? (
              <View style={{ height: scale(99), width: scale(99) }}>
                <FastImage
                  style={styles.picContainer}
                  resizeMode="cover"
                  source={{
                    uri: isUplaodPicture
                      ? values?.imageUrl?.path
                      : values?.imageUrl,
                    headers: { Authorization: "someAuthToken" },
                    priority: FastImage.priority.high,
                  }}
                />
                {
                 !values?.imageUrl?.includes?.("placeholder")&&(
                  <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => {
                    setValues({ ...values, imageUrl: "" });
                    setDeleteUserImage(1)
                  }}
                  style={styles.crossContainer}
                >
                  <Image
                    style={{ width: "100%", height: "100%" }}
                    source={images.crosswhite}
                    resizeMode="contain"
                  />
                </TouchableOpacity>

                 )
                }

              
              </View>
            ) : (

              <View style={{ height: scale(99), width: scale(99) }}>
                <FastImage
                  style={styles.picContainer}
                  resizeMode="cover"
                  source={images.blank_image}
                />
               

              
              </View>


              // <TouchableOpacity
              //   activeOpacity={0.6}
              //   onPress={() => onOpenGallery(true)}
              //   style={styles.picContainer}
              // >
              //   <Image style={{ width: 14, height: 14 }} source={images.add} />
              // </TouchableOpacity>
            )}

            <View
              style={{
                ...appStyles.rowjustify,
                marginTop: "7%",
                marginBottom: verticalScale(15),
              }}
            >
              <NewText
                fontWeight="700"
                color={colors.white}
                size={19}
                text={"Your GIFS"}
              />
              {/* <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => {
                  GiphyDialog.show();
                }}
              >
                {selectedGifs.filter((gif) => gif !== "").length < 2 && (
                  <CustomText color={colors.white} size={17} text={"Add"} />
                )}
              </TouchableOpacity> */}
            </View>

            <View style={appStyles.rowjustify}>
              {nonEmptySelectedGifs[0] == undefined && (
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => {
                    GiphyDialog.show();
                  }}
                  style={styles.gifhyContainer}
                >
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => {
                      GiphyDialog.show();
                    }}
                  >
                    <Image
                      style={{ width: 14, height: 14 }}
                      source={images.add}
                    />
                  </TouchableOpacity>
                </TouchableOpacity>
              )}

              {selectedGifs
                .filter((gif) => gif !== "")
                .map((gip, index) => {
                  console.log("IndexGif", gip, index);
                  return (
                    <View style={styles.gifhyContainer} key={index}>
                      <Image
                        style={{ width: "100%", height: "100%" }}
                        source={{ uri: gip }}
                      />
                      <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() => {
                          if(index==0){
                            setDeleteGif1(1)
                          }
                          else {
                            setDeleteGif2(1)
                          }
                          // Remove the selected GIF from the selectedGifs array
                          // const updatedSelectedGifs = [...selectedGifs];

                          setSelectedGifs((prevSelectedGifs) =>
                            prevSelectedGifs.filter((gi, ind) => gi !== gip)
                          );
                        }}
                        style={{
                          position: "absolute",
                          top: 15,
                          right: 15,
                          width: 25,
                          height: 25,
                        }}
                      >
                        <Image
                          style={{ width: "100%", height: "100%" }}
                          source={images.crosswhite}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                    </View>
                  );
                })}

              {nonEmptySelectedGifs[1] == undefined && (
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => {
                    GiphyDialog.show();
                  }}
                  style={styles.gifhyContainer}
                >
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => {
                      GiphyDialog.show();
                    }}
                  >
                    <Image
                      style={{ width: 14, height: 14 }}
                      source={images.add}
                    />
                  </TouchableOpacity>
                </TouchableOpacity>
              )}

              {/* {gif2 ? (
                <View style={styles.gifhyContainer}>
                  <Image
                    style={{ width: "100%", height: "100%" }}
                    source={{ uri: gif2 }}
                  />
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => {
                      setGif2("");
                    }}
                    style={{
                      position: "absolute",
                      top: 15,
                      right: 15,
                      width: 25,
                      height: 25,
                    }}
                  >
                    <Image
                      style={{ width: "100%", height: "100%" }}
                      source={images.crosswhite}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => {
                    setIsGiphyTwo(!isGiphyTwo);

                    GiphyDialog.show();
                  }}
                  style={styles.gifhyContainer}
                >
                  <Image
                    style={{ width: 14, height: 14 }}
                    source={images.add}
                  />
                </TouchableOpacity>
              )} */}
            </View>
            {/* {selectedGifs.filter((gif) => gif !== "").length > 0 && ( */}
            <Image
              style={{ width: 130, height: 45, alignSelf: "flex-end" }}
              source={images.giphy}
              resizeMode="contain"
            />
            {/* )} */}
          </View>

          <View
            style={{
              borderBottomWidth: 1,
              borderColor: colors.white,
              marginBottom: "8%",
            }}
          />
          <View style={{ paddingHorizontal: scale(20) }}>
            <NewText
              fontWeight="700"
              color={colors.white}
              size={19}
              text={"Your Profile Info "}
            />
            <Spacer height={verticalScale(20)} />

            {/* <CustomText
              fontWeight={"500"}
              fontFam="Poppins-Medium"
              size={13}
              style={{ marginBottom: verticalScale(5) }}
              text={"Profile Type"}
              color={colors.white}
            />
            <DropDown
              placeholder={"Make a Selection"}
              dropWidth={"100%"}
              setValue={setProfileType}
              value={profileType}
              //   data={data}
              data={profileTypeData.map((item, _index) => {
                return {
                  id: item?.id,
                  label: item?.value,
                  value: item?.value,
                };
              })}
            /> */}
            {/* <Spacer height={verticalScale(10)}/> */}
            <Input
              label="Display Name"
              value={values.name}
              placeholder="Name"
              maxLength={50}
              color={colors.white}
              fontWeight="600"
              onChangeText={(txt: string) => {
                setValues({ ...values, name: txt });
              }}
            />
            <NewText
              style={{ marginTop: "7%" }}
              color={colors.white}
              size={15}
              text={"Gender"}
            />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: "5%",
                marginTop: "3%",
              }}
            >
              {["Female", "Male", "Trans"].map((item, index) => {
                return (
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => {
                      setValues({ ...values, gender: item });
                    }}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginRight: "5%",
                    }}
                  >
                    <TouchableOpacity
                      activeOpacity={0.6}
                      onPress={() => setSelectedGender(index)}
                      style={styles.radioButton}
                    >
                      <View>
                        {values.gender == item && (
                          <View style={styles.radioButtonInner} />
                        )}
                      </View>
                    </TouchableOpacity>
                    <CustomText color={colors.white} size={13} text={item} />
                  </TouchableOpacity>
                );
              })}
            </View>
            <View>
              <NewText
                fontWeight={"500"}
                fontFam="Poppins-Medium"
                size={15}
                style={{ marginBottom: verticalScale(5), marginTop: "7%" }}
                text={"Birthday"}
                color={colors.white}
              />
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => bottomSheetModalRef.current.present()}
                style={{
                  width: "40%",
                  height: 50,
                  backgroundColor: colors.primary,
                  borderRadius: 10,
                  justifyContent: "center",
                  // alignItems: "center",
                  padding: 10,
                }}
              >
                <NewText
                  fontWeight={"500"}
                  fontFam="Poppins-Medium"
                  size={15}
                  text={values.birthday}
                  color={colors.white}
                />
              </TouchableOpacity>

              <View
                style={{
                  ...appStyles.rowjustify,
                  marginTop: verticalScale(25),
                }}
              >
                <NewText
                  size={17}
                  fontWeight="600"
                  fontFam="Poppins-Medium"
                  color={colors.white}
                  text={"Show Age"}
                />
                <ToggleSwitch
                  isOn={values?.showAge}
                  onColor={colors.sky}
                  offColor={colors.grey300}
                  size="small"
                  onToggle={toggleAgeSwitch}
                  // onToggle={(isOn: boolean)=>setIsToggle}
                  thumbOnStyle={{ width: 17, height: 17, borderRadius: 9999 }}
                  thumbOffStyle={{ width: 17, height: 17, borderRadius: 9999 }}
                  trackOffStyle={{ width: 46, height: 25 }}
                  trackOnStyle={{ width: 46, height: 25 }}
                />
              </View>
            </View>
            <View>
              {isPredictionList && (
                <PredictionList
                  onAddressPress={(i) => onPressLocationAddress(i)}
                  Addresses={predictionData}
                />
              )}
              <Input
                label="Your Location"
                // labelSize={15}
                value={values.location}
                onChangeText={onSearch}
                placeholder=""
                color={colors.white}
                fontWeight="600"
                marginTop={"7%"}
              />
            </View>

            <CustomText
              fontWeight={"500"}
              fontFam="Poppins-Medium"
              size={13}
              style={{
                marginBottom: verticalScale(5),
                marginTop: verticalScale(20),
              }}
              text={"Orientation"}
              color={colors.white}
            />
            <DropDown
              placeholder={"Make a Selection"}
              mainWidth={"60%"}
              innerWidth={"53%"}
              setValue={setOrientation}
              value={orientation}
              //   data={data}
              data={OrientationData.map((item, _index) => {
                return {
                  id: item?.id,
                  label: item?.value,
                  value: item?.value,
                };
              })}
            />

            <CustomText
              fontWeight={"500"}
              fontFam="Poppins-Medium"
              size={13}
              style={{
                marginBottom: verticalScale(5),
                marginTop: verticalScale(20),
              }}
              text={"Relationship Status"}
              color={colors.white}
            />
            <DropDown
              placeholder={"Make a Selection"}
              mainWidth={"60%"}
              innerWidth={"53%"}
              setValue={setRelationshipStatus}
              value={relationshipStatus}
              //   data={data}
              data={RelationshipStatusData.map((item, _index) => {
                return {
                  id: item?.id,
                  label: item?.value,
                  value: item?.value,
                };
              })}
            />

            <View
              style={{
                marginVertical: verticalScale(30),
              }}
            >
              <NewText
                fontWeight={"500"}
                fontFam="Poppins-Medium"
                size={16}
                text={"Looking For"}
                color={colors.white}
              />
              <View
                style={{
                  ...appStyles.row,
                  flexWrap: "wrap",
                  marginTop: verticalScale(10),
                }}
              >
                {LookingForData.map((item, index) => {
                  return (
                    <View
                      style={{ marginBottom: verticalScale(8) }}
                      key={index}
                    >
                      <LookingFor
                        lookingFor={values?.interestTags}
                        onPress={() => {
                          let findIndex = values?.interestTags?.findIndex(
                            (i: string) => i === item
                          );
                          // console.log("kncdkncd", findIndex)

                          if (findIndex === -1) {
                            // If item is not in the array, add it
                            setValues((prevValues) => ({
                              ...prevValues,
                              interestTags: [...prevValues.interestTags, item],
                            }));
                          } else {
                            // If item is in the array, remove it (if needed)
                            setValues((prevValues) => ({
                              ...prevValues,
                              interestTags: prevValues.interestTags.filter(
                                (i: string) => i !== item
                              ),
                            }));
                          }
                        }}
                        label={item}
                      />
                    </View>
                  );
                })}
              </View>
            </View>

            {/* <Input
              // labelSize={15}

              label="Occupation"
              value={values.occupation}
              placeholder="Occupation"
              onChangeText={(txt: string) => {
                setValues({ ...values, occupation: txt });
              }}
              color={colors.white}
              fontWeight="600"
              marginTop={"7%"}
            /> */}
            <View>
              <View style={appStyles.rowjustify}>
                <NewText
                  fontWeight={"500"}
                  fontFam="Poppins-Medium"
                  size={15}
                  style={{ marginBottom: verticalScale(5) }}
                  text={"About Me"}
                  color={colors.white}
                />
                <NewText
                  fontWeight={"500"}
                  fontFam="Poppins-Medium"
                  size={15}
                  style={{ marginBottom: verticalScale(5) }}
                  text={`${values.bio.length}/500`}
                  color={colors.white}
                />
              </View>
              <View
                style={{
                  width: "100%",
                  height: 150,
                  backgroundColor: colors.primary,
                  borderRadius: 10,
                  alignItems: "flex-start",
                  padding: 10,
                }}
              >
                <TextInput
                  value={values.bio}
                  style={{
                    fontSize: 16,
                    alignItems: "center",
                    width: "100%",
                    // paddingTop:20,
                    fontFamily: "Poppins-Regular",
                    fontWeight: "500",
                    color: colors.grey400,
                  }}
                  placeholder={""}
                  multiline={true}
                  placeholderTextColor={colors.grey400}
                  maxLength={500}
                  onChangeText={(txt: string) => {
                    setValues({ ...values, bio: txt });
                  }}
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* <Input
              // labelSize={15}

              label="Bio"
              value={values.bio}
              placeholder="Bio"
              color={colors.white}
              onChangeText={(txt: string) => {
                setValues({ ...values, bio: txt });
              }}
              fontWeight="600"
              multiline={true}
              height={85}
              marginTop={"7%"}
            /> */}
            <Input
              label="Your Link"
              value={values.link}
              placeholder=""
              onChangeText={(txt: string) => {
                setValues({ ...values, link: txt });
              }}
              color={colors.white}
              fontWeight="600"
              marginTop={"7%"}
            />

            <Spacer height={20} />
          </View>
        </ScrollView>
      </SafeAreaView>
      {showError && (
        <CustomToast
          showError={showError}
          setShowError={setShowError}
          bgColor={toastColor}
          text={error}
        />
      )}

      <CustomBottomSheet bottomSheetModalRef={bottomSheetModalRef}>
        <View style={{ paddingHorizontal: scale(20) }}>
          <View style={{ ...appStyles.rowjustify, width: "100%" }}>
            {/* <Button
            text="Save"
            width={"30%"}
            alignItems={"start"}
            onPress={() => {
              bottomSheetModalRef.current.dismiss();
            }}
            fontWeight={"500"}
            size={18}
            textColor={colors.white}
            bgColor={"transparent"}
          /> */}

            <TouchableOpacity
              style={{ width: "10%", alignItems: "flex-start", height: 40 }}
              onPress={() => bottomSheetModalRef.current.dismiss()}
            >
              <Image
                style={{ width: 20, height: 20 }}
                resizeMode="contain"
                source={images.cross3x}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={{ width: "20%", alignItems: "flex-end", height: 40 }}
              onPress={() => {
                setValues({ ...values, birthday: birthday });

                // setBirth({
                //   ...birth,
                //   month: month,
                //   year: year,
                //   day: day,
                //   birthday: values.birthday,
                // });

                bottomSheetModalRef.current.dismiss();
              }}
            >
              <NewText
                text={"Save"}
                color={colors.white}
                size={20}
                style={{ textAlign: "center", marginTop: -4 }}
                fontFam="Poppins-Medium"
                fontWeight="500"
              />
            </TouchableOpacity>
          </View>

          <NewText
            fontWeight={"600"}
            fontFam="Poppins-Medium"
            size={20}
            style={{ marginTop: verticalScale(10) }}
            text={"Date of Birth"}
            color={colors.white}
          />

          <DatePicker
            modal={false}
            mode="date"
            locale="en_US"
            title="lcmndlm"
            theme="dark"
            dividerColor={colors.white}
            style={{
              width: 300, // Adjust the width as per your requirement
              height: 300,
              alignSelf: "center",
            }}
            open={open}
            date={date}
            onDateChange={(date) => {
              const day = date.getDate();
              const month = date.getMonth() + 1;
              const year = date.getFullYear().toString(); // Extract last two digits of the year
              let birth = `${month.toString().padStart(2, "0")}/${day
                .toString()
                .padStart(2, "0")}/${year}`;
              console.log("birth", birth);
              setIsBirthday(birth);
              setOpen(false);
              setDate(date);
            }}
            // onCancel={() => {
            //   setOpen(false)
            // }}
          />
        </View>
      </CustomBottomSheet>
    </>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  radioButton: {
    width: scale(18),
    height: scale(18),
    borderRadius: scale(18),
    borderWidth: 2,
    borderColor: colors.sky,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  radioButtonInner: {
    width: scale(10),
    height: scale(10),
    borderRadius: scale(12),
    backgroundColor: colors.sky,
  },
  wallpaperContainer: {
    borderWidth: 1,
    borderRadius: scale(7),
    borderColor: colors.white,
    alignItems: "center",
    borderStyle: "dashed",
    height: windowHeight / 4,
    justifyContent: "center",
  },
  picContainer: {
    borderWidth: 1,
    borderRadius: scale(5),
    borderColor: colors.white,
    alignItems: "center",
    borderStyle: "dashed",
    height: scale(99),
    width: scale(99),
    justifyContent: "center",
    marginTop: verticalScale(10),
  },
  gifhyContainer: {
    width: "48%",
    height: windowHeight / 4.7,
    overflow: "hidden",
    borderWidth: 1,
    borderRadius: scale(5),
    borderColor: colors.white,
    alignItems: "center",
    borderStyle: "dashed",
    justifyContent: "center",
    marginBottom: verticalScale(10),
  },
  crossContainer: {
    position: "absolute",
    top: 15,
    right: 15,
    width: 25,
    height: 25,
  },
});
