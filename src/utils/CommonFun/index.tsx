import { Image, Video } from "react-native-compressor";

import {
  Alert,
  Animated,
  Dimensions,
  Platform,
  BackHandler,
  Linking,
} from "react-native";
import { useRef } from "react";
import { parse } from "htmlparser2";
import { checkVersion } from "react-native-check-version";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useDispatch } from "react-redux";
import { setUserData } from "../../redux/reducers/authReducer";
import { setCartData, setEmptyCard } from "../../redux/reducers/cartReducer";
import { DelIVERY_ADDRESS, SELECTED_PAYMENT_METHOD, StorageServices } from "../hooks/StorageServices";
import DeviceInfo from "react-native-device-info";
import { images } from "../../assets";

export const isInteger = (value: number): boolean => {
  return Number.isInteger(value);
};
export const newWidth = Dimensions.get("screen").width;
export const newHeight = Dimensions.get("screen").height;
export const windowHeight = Dimensions.get("window").height;
export const windowWidth = Dimensions.get("window").width;
export const isiPad = DeviceInfo.getModel().includes("iPad");
export const dollarSymbol = "$";
// export const dispatch=useDispatch()
export const splitName = (x: string): string[] => {
  const name = x?.split(" ");
  const firstName = name?.length > 0 ? name[0] : "";
  const restOfName = name?.slice(1).join(" ");
  return [firstName, restOfName];
};

export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
) => {
  let timeoutId: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export const isCloseToBottom = ({
  layoutMeasurement,
  contentOffset,
  contentSize,
}: any) => {
  const paddingToBottom = 20;
  return (
    layoutMeasurement?.height + contentOffset?.y >=
    contentSize?.height - paddingToBottom
  );
};

export const compressImage = async (uri: any) => {
  let result;
  result = await Image.compress(
    uri,
    {
      compressionMethod: "manual",
      quality: 0.3,
    },
    (progress) => {
      if (progress) {
        console.log("CompressStoryImage", progress);
      }
    }
  );

  return result;
};

export const getLastTenDigitsFromNumber = (number: any) => {
  // Convert the number to a string to handle large numbers
  const numberString = Math.abs(number).toString();

  // Use slice to get the last ten digits
  const lastTenDigits = numberString.slice(-10);

  return lastTenDigits;
};
export const convertTo12HourFormat = (time24h: any) => {
  // Parse the time string to extract hours and minutes
  const [hours, minutes] = time24h.split(":");

  // Convert hours to 12-hour format
  let hours12 = parseInt(hours, 10) % 12 || 12;

  // Determine AM/PM
  const modifier = parseInt(hours, 10) < 12 ? "AM" : "PM";

  // Return the time in 12-hour format
  return `${hours12}:${minutes} ${modifier}`;
};


export const getRewardBadge = (points:any,data:any) => {
  console.log("dataponfnfn",data)
  if (points >= data.tier_platinum_points) {
    return images.platinum_reward; // Platinum
  } else if (points >= data.tier_gold_points) {
    return images.gold_reward // Gold
  } else if (points >= data.tier_silver_points) {
    return images.silver_reward; // Silver
  } else if (points >= data.tier_bronze_points) {
    return images.bronze_reward; // Bronze
  } else {
    return false; // Default color (black)
  }
}

// const blinkAnim = useRef(new Animated.Value(0)).current;

export const startBlinking = (blinkAnim: any) => {
  Animated.loop(
    Animated.sequence([
      Animated.timing(blinkAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(blinkAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }),
    ])
  ).start();

  // Stop the blinking after 5 seconds
  setTimeout(() => {
    blinkAnim.stopAnimation();
    blinkAnim.setValue(0); // Reset to initial value
  }, 200); // Duration in milliseconds
};

export const extractTextFromHTML = (html:any) => {
  let text = "";
  const parser = new parse.Parser(
    {
      ontext(data:any) {
        text += data;
      },
    },
    { decodeEntities: true }
  );
  parser.write(html);
  parser.end();
  return text;
};

export const sessionCheck = async (appUpdateStatus: any,session_expire:any,dispatch:any) => {
  if (appUpdateStatus == 1) {
    const version = await checkVersion();
    console.log("version",version)
    {
      Alert.alert(
        "Updates",
        "Please ensure the app is updated to access its latest features.",
        [
          {
            text: "update",
            onPress: () => {
              // BackHandler.exitApp();
              // Linking.openURL(version?.url);
            },
          },
        ],
        { cancelable: false }
      );
    }
    return
  }
  if(session_expire){

        Alert.alert(
      "Session Expired",
      "Your session has expired. Please login again.",
      [
        {
          text: "OK",
          onPress: async () => {
            const isSignedIn = await GoogleSignin.isSignedIn();
            if (isSignedIn) {
              await GoogleSignin.signOut();
            }
            dispatch(setUserData(null));
            dispatch(setEmptyCard([]));
            StorageServices.removeItems("userData");
            StorageServices.removeItems(SELECTED_PAYMENT_METHOD);
            StorageServices.removeItems(DelIVERY_ADDRESS);

          },
        },
      ]
    );

    

  }
};
