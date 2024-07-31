import React, {useState, useEffect} from 'react';
import {Alert, View} from 'react-native';
import ScreenLayout from '../../../components/ScreenLayout';
import {colors} from '../../../utils/colors';
import PrivacyCard from '../../../components/PrivacyCard';
import {useDispatch, useSelector} from 'react-redux';
import {getLocalizeFile} from '../../../redux/reducers/localizeReducer';
import {ApiServices} from '../../../api/ApiServices';
import {getToken} from '../../../redux/reducers/authReducer';
import CustomToast from '../../../components/CustomToast';
import {sessionCheck} from '../../../utils/CommonFun';
import SimpleLoader from '../../../components/SimpleLoader';
type Props = {
  navigation?: any;
};
const NotificationSettings = ({navigation}: Props) => {
  const [pushNotification, onPushNotification] = useState(true);
  const [smsNotification, onSmsNotification] = useState(true);
  const [emailNotification, onEmailNotification] = useState(true);
  const localize: any = useSelector(getLocalizeFile);
  const token = useSelector(getToken);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isMessage, setIsMessage] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    getNotifications();
  }, []);

  console.log('Locak', localize?.profile_setting_email_description);
  const getNotifications = () => {
    setIsLoading(true);
    ApiServices.getNotificationSetting(
      token,
      async ({isSuccess, response}: any) => {
        setIsLoading(false);
        if (isSuccess) {
          if (response?.success) {
            setIsLoading(false);
            console.log('Motires', response);
            let data = response?.data?.userNotificationSettings;
            onPushNotification(data?.push_notification);
            onSmsNotification(data?.sms_notification);
            onEmailNotification(data?.email_notification);
          } else {
            if (response?.app_update_status == 1 || response?.session_expire) {
              sessionCheck(
                response?.app_update_status,
                response?.session_expire,
                dispatch,
              );
              return;
            }

            setIsLoading(false);
            setMessage(response?.message);
            setIsMessage(true);
          }
        } else {
          setIsLoading(false);
          Alert.alert("Alert!", "Something went wrong");
        }
      },
    );
  };

  const onUpdateNotificationSetting = (data: any) => {
    console.log('formDataNoti', data);
    ApiServices.updateNotificationSetting(
      data,
      token,
      async ({isSuccess, response}: any) => {
        if (isSuccess) {
          if (response?.success) {
            console.log('formDataNotiresponse', response);
          } else {
            if (response?.app_update_status == 1 || response?.session_expire) {
              sessionCheck(
                response?.app_update_status,
                response?.session_expire,
                dispatch,
              );
              return;
            }
            setMessage(response?.message);
            setIsMessage(true);
          }
        } else {
          setIsLoading(false);
          Alert.alert("Alert!", "Something went wrong");
        }
      },
    );
  };

  return (
    <>
      <ScreenLayout
        navigation={navigation}
        title={localize?.profile_setting_privacy_notifications_title}
        style={{
          paddingHorizontal: 20,
        }}>
        <View
          style={{
            height: '100%',
            marginTop: '10%',
          }}>
          {isLoading ? (
            <SimpleLoader />
          ) : (
            <View
              style={{
                backgroundColor: colors.white,
                paddingHorizontal: 20,
                height: '100%',
              }}>
              <PrivacyCard
                title={localize?.profile_setting_notifications_title}
                description={
                  localize?.profile_setting_notifications_description
                }
                value={pushNotification}
                onChangeValue={() => {
                  let formData = new FormData();
                  onPushNotification(!pushNotification);
                  formData.append(
                    'push_notification',
                    pushNotification == true ? 0 : 1,
                  );
                  onUpdateNotificationSetting(formData);
                }}
              />
              <PrivacyCard
                title={localize?.profile_setting_email_notifications_title}
                value={emailNotification}
                description={
                  localize?.profile_setting_email_notifications_description
                }
                onChangeValue={() => {
                  let formData = new FormData();
                  onEmailNotification(!emailNotification);
                  formData.append(
                    'email_notification',
                    emailNotification == true ? 0 : 1,
                  );
                  onUpdateNotificationSetting(formData);
                }}
              />
            </View>
          )}
        </View>
      </ScreenLayout>

      <CustomToast
        isVisable={isMessage}
        setIsVisable={setIsMessage}
        message={message}
        color={colors.white}
      />
    </>
  );
};
export default NotificationSettings;
