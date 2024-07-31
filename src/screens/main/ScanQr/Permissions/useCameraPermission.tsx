import { useEffect, useState } from "react";
import { Platform, PermissionsAndroid, Linking } from "react-native";
import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
  openSettings,
} from "react-native-permissions";

const useCameraPermissions = () => {
  const [hasPermission, setHasPermission] = useState(false);
  useEffect(() => {
    checkCamPermission();
  }, []);
  const checkCamPermission = async () => {
    try {
      let permissionResult;
      if (Platform.OS === "ios") {
        permissionResult = await request(PERMISSIONS.IOS.CAMERA);
        setHasPermission(permissionResult == "granted")
      } else {
        permissionResult = await request(PERMISSIONS.ANDROID.CAMERA);
        if (permissionResult == "granted") {
          setHasPermission(true);
        }
        else {
          setHasPermission(false)
        }
      }
    } catch (error) {
      console.error("Error requesting gallery permission:", error);
    }
  };
  const requestcameraPermission = () => {
    if (Platform.OS === "android") {
      request(PERMISSIONS.ANDROID.CAMERA).then((result) => {
        if (result == "blocked") {
          setHasPermission(false);

          Linking.openSettings();
        } else if (result == "granted") {
          setHasPermission(true);
        } else {
          setHasPermission(false);

        }
      });
    } else if (Platform.OS === "ios") {
      request(PERMISSIONS.IOS.CAMERA).then((result) => {

        if (result === "blocked") {
          setHasPermission(false);

          openSettings();
        } else if (result == "granted") {
          setHasPermission(true);
        } else {
          setHasPermission(false);
        }
      });
    }
  };


  return {
    hasPermission,
    requestcameraPermission,
    checkCamPermission,
  };
};

export { useCameraPermissions };
