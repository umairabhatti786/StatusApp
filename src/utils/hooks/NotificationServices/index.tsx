import OneSignal from "react-native-onesignal";
import { useDispatch } from "react-redux";
import { setNotificationAlert } from "../../../redux/reducers/authReducer";

export const NotificationServices = {
  // initilaie: () => {
  //   OneSignal.setAppId("68f695a1-6b12-4fca-8526-a2b7e5bb68b6");
  //   OneSignal.promptForPushNotificationsWithUserResponse();
  //   OneSignal.setNotificationWillShowInForegroundHandler(
  //     (notificationReceivedEvent: any) => {
  //       let notification = notificationReceivedEvent.getNotification();
  //       notificationReceivedEvent.complete(notification);
        

  //     }
  //   );
  //   OneSignal.setNotificationOpenedHandler((notification) => {
  //     console.log("OneSignal: notification opened:", notification);
  //   });
  // },

  getDeviceStatus: async () => {
    let deviceState = await OneSignal.getDeviceState();
    return deviceState;
  },
};
