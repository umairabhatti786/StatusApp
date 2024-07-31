import React, { useEffect, useRef, useState } from "react";
import { View, Dimensions, Image, Pressable } from "react-native";
import ScreenLayout from "../../../components/ScreenLayout";
import { colors } from "../../../utils/colors";
import CustomButton from "../../../components/CustomButton";
import { appStyles } from "../../../utils/AppStyles";
import CompleteForm from "./CompleteForm";
import { useDispatch, useSelector } from "react-redux";
import { ApiServices } from "../../../api/ApiServices";
import { setUserData, getUserData } from "../../../redux/reducers/authReducer";
import ScreenLoader from "../../../components/ScreenLoader";
import { StorageServices } from "../../../utils/hooks/StorageServices";
import CustomToast from "../../../components/CustomToast";
import { verticalScale } from "react-native-size-matters";
import { getLocalizeFile } from "../../../redux/reducers/localizeReducer";
import SimpleLoader from "../../../components/SimpleLoader";

type Props = {
  navigation?: any;
};
const windowHeight = Dimensions.get("window").height;
const ProfileUpdate = ({ navigation }: Props) => {
  const dispatch = useDispatch();
  const userData = useSelector(getUserData);
  const [date, month, year] = userData?.data?.DOB?.split("-");
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<any>("");
  const localize: any = useSelector(getLocalizeFile);

  const [values, setValues] = useState({
    name: userData?.name ? userData?.name : "",
    phoneNumber: userData?.phone ? userData?.phone : "",
    email: userData?.email ? userData?.email : "",
  });

  const [birth, setBirth] = useState({
    day: date ? date : "",
    month: month ? month : "",
    year: year ? year : "",
  });
  const [error, setError] = useState({
    name: "",
    phoneNumber: "",
    email: "",
  });

  console.log("error", error);

  const onUpdate = () => {
    if (!values.name) {
      setError({ ...error, name: "Name is required" });
      return;
    }
    if (!values.email) {
      setError({ ...error, email: "Email is required" });
      return;
    }
    const formData = new FormData();
    setIsLoading(true);
    const data = {
      DOB: `${birth.day}-${birth.month}-${birth.year}`,
    };

    formData.append("phone", values.phoneNumber);
    formData.append("user_id", userData?.id);
    formData.append("email", values?.email);
    formData.append("name", values?.name);
    formData.append("data", JSON.stringify(data));

    ApiServices.updateProfile(formData, async (res: any) => {
      let result = JSON.parse(res.response);
      if (result?.success) {
        setIsLoading(false);
        setShowError(true);
        dispatch(setUserData(result?.data));
        StorageServices.setItem("userData", result?.data);
        setErrorMessage(result?.message);
        setTimeout(() => {
          setShowError(false);
          navigation.goBack();
        }, 1000);
      } else {
        setIsLoading(false);
        setErrorMessage(result?.message);
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
        }, 1000);
      }
    });
  };
  return (
    <ScreenLayout
      navigation={navigation}
      title={localize?.personal_info_title}
      style={{
        paddingHorizontal: 20,
      }}
    >
      <View
        style={{
          height: "100%",
          backgroundColor: colors.white,
          paddingHorizontal: 20,
          paddingBottom: 15,
          borderRadius:10,
          marginTop: "8%",
          paddingTop: "5%",
        }}
      >
        <View style={{ flex: 1 }}>
          <CompleteForm
            values={values}
            localize={localize}
            setValues={setValues}
            birth={birth}
            setBirth={setBirth}
            error={error}
            setError={setError}
          />
        </View>
        <CustomButton
          text={localize?.edit_profile__confirm_button}
          disable={error.phoneNumber ? true : false}
          elevation={
            !values.email ||
            !values.phoneNumber ||
            error.phoneNumber ||
            error.email
              ? 0
              : 10
          }
          onPress={() => {
            if (!values.name) {
              setError({ ...error, name: "Name is required" });
              return;
            }
            if (values.name.length < 2) {
              setError({
                ...error,
                name: "Please ensure the name field contains between 2 to 30 characters",
              });
              return;
            }

            onUpdate();
          }}
          notRequiredShadow={
            !values.email ||
            !values.phoneNumber ||
            error.phoneNumber ||
            error.email
              ? true
              : false
          }
          style={{ marginBottom: verticalScale(30) }}
        />
        <CustomToast
          isVisable={showError}
          setIsVisable={setShowError}
          message={errorMessage}
          color={colors.white}
        />
        {isLoading && <SimpleLoader />}
      </View>
    </ScreenLayout>
  );
};
export default ProfileUpdate;
