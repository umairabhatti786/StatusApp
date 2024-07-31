import {
  Platform,
  Pressable,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Alert,
  Linking,
} from "react-native";
import { colors } from "../../utils/colors";
import CustomText from "../CustomText";
import { font } from "../../utils/font";
import { images } from "../../assets";
import FastImage from "react-native-fast-image";
import { appStyles } from "../../utils/AppStyles";
import { useDispatch, useSelector } from "react-redux";
import { getUserData, setUserData } from "../../redux/reducers/authReducer";
import { ApiServices } from "../../api/ApiServices";
import { useState } from "react";
import ImagePicker from "react-native-image-crop-picker";
import { StorageServices } from "../../utils/hooks/StorageServices";
import CustomToast from "../CustomToast";
import { usePermissions } from "../../utils/Permissions/usePermissions";
import { compressImage, isiPad, splitName } from "../../utils/CommonFun";
import { openSettings } from "react-native-permissions";
import { Spacer } from "../Spacer";
import { scale, verticalScale } from "react-native-size-matters";

type Props = {
  onPress?: any;
  isEditable?: boolean;
  setShowError?: any;
  setErrorMessage?: any;
  isEdit?: any;
  editTitle?: string;
  tierLevel?: string;
  isShowBadge?:boolean
  badgeImage?:any
};

const InfoHeader = ({
  onPress,
  isEditable,
  setShowError,
  setErrorMessage,
  isEdit,
  editTitle,
  tierLevel,
  isShowBadge,
  badgeImage
}: Props) => {
  const userData = useSelector(getUserData);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  let name = splitName(userData?.name);

  const { hasGalleryPermission, requestGalleryPermission } = usePermissions();
console.log("badgeImage",badgeImage)
  const uplaodPicture = (data: any) => {
    ApiServices.updateProfilePicture(data, async (res: any) => {
      if (!res?.isSuccess) {
        retryPicture(data);

        return;
      }

      let result = JSON.parse(res.response);
      if (result?.success) {
        setIsLoading(false);
        setErrorMessage(result?.message);
        setShowError(true);
        dispatch(
          setUserData({
            ...userData,
            profile_picture: result?.data?.profile_picture,
          })
        );
        StorageServices.setItem("userData", {
          ...userData,
          profile_picture: result?.data?.profile_picture,
        });
        setTimeout(() => {
          setShowError(false);
        }, 1000);
      } else {
        setErrorMessage(result?.message);
        setShowError(true);
        console.log("Error", result?.message);
        setIsLoading(false);
        setTimeout(() => {
          setShowError(false);
        }, 1000);
      }
    });
  };

  const retryPicture = (data: any) => {
    ApiServices.updateProfilePicture(data, async (res: any) => {
      if (!res?.success) {
      }

      let result = JSON.parse(res.response);
      if (result?.success) {
        setIsLoading(false);
        setErrorMessage(result?.message);
        setShowError(true);
        dispatch(
          setUserData({
            ...userData,
            profile_picture: result?.data?.profile_picture,
          })
        );
        StorageServices.setItem("userData", {
          ...userData,
          profile_picture: result?.data?.profile_picture,
        });
        setTimeout(() => {
          setShowError(false);
        }, 1000);
      } else {
        setErrorMessage(result?.message);
        setShowError(true);
        console.log("Error", result?.message);
        setIsLoading(false);
        setTimeout(() => {
          setShowError(false);
        }, 1000);
      }
    });
  };
  const onUpdate = async () => {
    let gallerypermission = await requestGalleryPermission();
    console.log("gallerypermission", gallerypermission);
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
          const compressable = await compressImage(data?.uri);
          data["uri"] = compressable;

          const formData = new FormData();
          setIsLoading(true);
          formData.append("user_id", userData?.id);
          formData.append("profile_picture", data);

          uplaodPicture(formData);
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

  return (
    <View
      style={{
        height: isiPad ? verticalScale(80) : 146,
        backgroundColor: colors.primary,
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 20,
        marginTop: Platform.OS === "ios" ? 20 : 40,
      }}
    >
      <View
        style={{
          gap: 3,
          justifyContent: "center",
          alignItems: "flex-start",
          flex: 2.5,
          paddingLeft: 20,
        }}
      >
        {userData?.token && (
          <>
            <View style={{ flexDirection: "row" }}>
              <CustomText
                text={`${name[1] ? name[0] : ""}`}
                size={isiPad ? 30 : 22}
                fontFam={font.montserratMedium}
                color={colors.white}
                numberOfLines={1}
              />
              <CustomText
                text={name[1] ? ` ${name[1]}` : `${name[0]}`}
                fontFam={font.montserratBold}
                fontWeight={"600"}
                size={isiPad ? 30 : 22}
                numberOfLines={1}
                color={colors.white}
                style={{
                  flex: 1,
                }}
              />
            </View>
            <CustomText
              text={userData?.email}
              color={colors.white}
              size={isiPad ? 15 : 12}
              fontFam={font.montserratRegular}
            />

            <CustomText
              text={`${userData?.phone}`}
              color={colors.white}
              size={isiPad ? 15 : 12}
              fontFam={font.montserratRegular}
            />
          </>
        )}

        {isEdit && (
          <>
            <Spacer height={5} />
            <TouchableOpacity
              onPress={isEdit}
              style={{
                paddingRight: 20,
                paddingVertical: 5,
                alignItems: "flex-start",
              }}
            >
              <CustomText
                text={editTitle}
                color={colors.white}
                textDecorationLine="underline"
                size={isiPad ? 19 : 15}
                fontWeight="700"
                fontFam={font.montserratRegular}
              />
            </TouchableOpacity>
          </>
        )}
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "flex-end",
          flex: 1,
          marginRight: 15,
        }}
      >
        <Pressable
          onPress={isEdit && onUpdate}
          style={{
            borderRadius: 9999,
            borderWidth: 3,
            borderColor: colors.white,
            width: isiPad ? 100 : 88,
            height: isiPad ? 100 : 88,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {!isLoading ? (
            <View>
              <FastImage
                source={
                  userData?.token
                    ? { uri: userData?.profile_picture }
                    : images.blankUuser
                }
                style={{
                  width: isiPad ? 90 : 80,
                  height: isiPad ? 90 : 80,
                  borderRadius: 9999,
                }}
              />
            
            
            
            </View>
          ) : (
            <ActivityIndicator size={"small"} color={colors.white} />
          )}
          {isEdit && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={isEdit && onUpdate}
              style={{
                position: "absolute",
                width: isiPad ? 40 : 29,
                height: isiPad ? 40 : 29,
                backgroundColor: colors.white,
                borderRadius: 9999,
                justifyContent: "center",
                alignItems: "center",
                right: scale(-7),
                bottom: verticalScale(8),
              }}
            >
              <Image
                source={images.edit}
                style={{
                  width: isiPad ? 35 : 25,
                  height: isiPad ? 35 : 25,
                  borderRadius: 9999,
                }}
              />
            </TouchableOpacity>
          )}
        </Pressable>
      </View>

      {
                isShowBadge&&(
                  <View
                  style={{
                    position: "absolute",
                  
                    justifyContent: "center",
                    alignItems: "center",
                    right: scale(27),
                    bottom: verticalScale(-23),
                  }}
                  >
                      <Image
                    style={{
                      width: scale(50),
                      height: scale(50),
                    }}
                    source={badgeImage}
                    resizeMode="contain"
                  />
    
                  </View>

                )
              }
    </View>
  );
};
export default InfoHeader;
