import { useEffect, useState } from "react";
import { Platform, PermissionsAndroid, Linking, Alert } from "react-native";
import { PERMISSIONS, request, check } from "react-native-permissions";
import { useDispatch, useSelector } from "react-redux";

import Geolocation from "@react-native-community/geolocation";
import { StorageServices } from "../hooks/StorageServices";
import { UserProfileSetup } from "../../api/ApiServices";
import { getToken, setUserData } from "../../redux/reducers/authReducer";

const usePermissions = () => {
  const [hasGalleryPermission, setHasGalleryPermission] = useState(false);
  const [isLocationPermission, setIsLocationPermission] = useState(true);
  const dispatch=useDispatch()

  const token=useSelector(getToken)

  // useEffect(() => {
  //   requestGalleryPermission();
  // }, []);

  const requestGalleryPermission = async () => {
    console.log("permissionStatus")
    try {
      let permissionStatus;
      if (Platform.OS === "ios") {
        permissionStatus = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
      } else {
        let READ_MEDIA_IMAGES = await request(
          PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
        );
        if (READ_MEDIA_IMAGES === "unavailable") {
          permissionStatus = await request(
            PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
          );
        } else {
          permissionStatus = READ_MEDIA_IMAGES;
        }
      }
      console.log("permissionStatus",permissionStatus)

      return permissionStatus
    } catch (error) {
      console.error("Error checking gallery permission:", error);
    }
  };
  const hasPermissionIOS = async () => {
    return new Promise((resolve) => {
      Geolocation.getCurrentPosition(
        (position) => {
          resolve(true);
        },
        async (error) => {
          console.log(error.message);

          resolve(false);
        },
        { enableHighAccuracy: false, timeout: 30000, maximumAge: 1000 }
      );
    });
  };

  const hasLocationPermission = async () => {
    if (Platform.OS === "ios") {
      const hasPermission = await hasPermissionIOS();
      return hasPermission;
    }

  

    const status = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    ]);
    if (
      status[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] ===
        PermissionsAndroid.RESULTS.GRANTED ||
      status[PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION] ===
        PermissionsAndroid.RESULTS.GRANTED
    ) {
      return true;
    }
    if (
      status[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] ===
        PermissionsAndroid.RESULTS.DENIED ||
      status[PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION] ===
        PermissionsAndroid.RESULTS.DENIED ||
      status[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] ===
        PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN ||
      status[PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION] ===
        PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN
    ) {
      // StorageServices.setItem(LOCATIO_ACCESS, JSON.stringify(false));
      // dispatch(setLocationAccess(false))
    }

    return false;
  };
  // User denied access to location services.
  const getLocation = async () => {
    const hasPermission = await hasLocationPermission();
    setIsLocationPermission(hasPermission)
    if (!hasPermission) {

      return;
    }

    Geolocation.getCurrentPosition(
      (position)   => {
        const latitude = position?.coords?.latitude;
        const longitude = position?.coords?.longitude;
        const data = {
          latitude: latitude,
          longitude: longitude,
        };

    let form = new FormData();
    form.append("lat", latitude);
    form.append("lng", longitude);

    UserProfileSetup(form, token, async ({ isSuccess, response }: any) => {
      // console.log("responseData", response);

      if (isSuccess) {
        let result = JSON.parse(response);
        if (result.status) {
      
          dispatch(setUserData(result?.user));
          console.log("UplcdjbcdjYsr", result?.user);
          console.log("formData", form);

        
        } else {
         
        }
      } else {

        Alert.alert("Alert!", "Network Error.");
      }
    });


    // UserProfileSetup(form, token, async ({ isSuccess, response }: any) => {});
        // dispatch(setUserLocation(data))

        // StorageServices.setItem(LOCATIO_ACCESS, JSON.stringify(true));

        // await AsyncStorage.setItem(USER, aJSON.stringify(userData));

        // StorageServices.setItem(CURRENT_POSITION, JSON.stringify(data));
      },
      async (error) => {
        // StorageServices.setItem(LOCATIO_ACCESS, JSON.stringify(false));
        // dispatch(setLocationAccess(false))
        console.log(error);
      }
    );
  };



  return {
    hasGalleryPermission,
    requestGalleryPermission,
    getLocation,
    hasLocationPermission
  };
};

export { usePermissions };
