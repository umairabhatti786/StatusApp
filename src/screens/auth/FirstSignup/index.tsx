import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { appStyles } from "../../../utils/AppStyles";
import { useNavigation } from "@react-navigation/native";
import { images } from "../../../assets/images";
import { Spacer } from "../../../components/Spacer";
import { colors } from "../../../utils/colors";
import { scale, verticalScale } from "react-native-size-matters";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { windowHeight, windowWidth } from "../../../utils/Dimensions";
import NewText from "../../../components/NewText";
import Input from "../../../components/Input";
import CustomToast from "../../../components/CustomToast";
import Button from "../../../components/Button";
// import { SignupForm } from "./SignupForm";
import Loader from "../../../components/Loader";
import { UserSignup } from "../../../api/ApiServices";
import OneSignal from "react-native-onesignal";
import { SignupForm } from "../Signup/SignupForm";
import DatePicker from "react-native-date-picker";
import CustomBottomSheet from "../../../components/CustomBottomSheet";

const FirstSignup = () => {
  const navigation: any = useNavigation();
  const [showPassword, setShowPAssword] = useState(true);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [toastColor, setToastColor] = useState(colors.red);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState<any>("MM");
  const [day, setDay] = useState<any>("DD");
  const [year, setYear] = useState<any>("YYYY");

  const [birth, setBirth] = useState({
    month: "MM",
    day: "DD",
    year: "YYYY",
    birthday: "",
  });

  const bottomSheetModalRef = useRef<any>(null);

  const [values, setValues] = useState({
    birthday: "",
  });

  const OnSignup = async () => {
    const viladResponse = SignupForm(values, setShowError, setError);
    let deviceState = await OneSignal.getDeviceState();

    if (viladResponse) {
      const data = {
        email: values.email,
        password: values.password,
        deviceId: deviceState?.userId,
      };
      setLoading(true);

      UserSignup(data, async ({ isSuccess, response }: any) => {
        if (isSuccess) {
          let result = JSON.parse(response);
          console.log("ckdnckdnc", result);

          if (result.status) {
            setLoading(false);
            if (result?.errors) {
              setError(result?.message);
              setToastColor(colors.red);

              setShowError(true);
              setTimeout(() => {
                setShowError(false);
              }, 4000);
            } else {
              setToastColor(colors.green);
              setError(result?.msg);
              setShowError(true);
              setTimeout(() => {
                setShowError(false);
                navigation.navigate("ConfirmationCode", {
                  data: { email: values.email },
                });
              }, 2000);
            }
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

      // console.log("ckbdckdbc",response)
    }
  };

  return (
    <>
      {loading && <Loader />}
      <Image
        source={images.lightBackground}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: windowWidth,
          height: windowHeight,
        }}
      />

      <SafeAreaView style={{ height: "100%" }}>
        <View
          style={{
            padding: scale(20),
            paddingBottom: verticalScale(40),
            flex: 1,
          }}
        >
          <View style={appStyles.row}>
            <TouchableOpacity
              style={{ width: "15%", height: 40, justifyContent: "center" }}
              onPress={() => navigation.goBack()}
            >
              <Image source={images.back} />
            </TouchableOpacity>

            <NewText
              text={"Create Account (1 of 2)"}
              color={colors.white}
              size={20}
              style={{ textAlign: "center" }}
              fontFam="Poppins-Medium"
              fontWeight="500"
            />
          </View>

          <View style={{ marginTop: "50%", flex: 1 }}>
            <NewText
              text={"Your Birthday"}
              color={colors.white}
              size={20}
              fontFam="Poppins-Medium"
              fontWeight="500"
            />

            <NewText
              text={"Only your age will be visible to others."}
              color={"#8A8A8A"}
              size={14}
              style={{ marginBottom: verticalScale(17) }}
              fontFam="Poppins-Medium"
              fontWeight="500"
            />

            <View
              style={{ ...appStyles.row, gap: scale(20), marginLeft: scale(8) }}
            >
              <TouchableOpacity
                onPress={() => bottomSheetModalRef.current.present()}
                style={styles.birthContainer}
              >
                <NewText text={birth.month} color={colors.white} size={17} />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => bottomSheetModalRef.current.present()}
                style={styles.birthContainer}
              >
                <NewText text={birth.day} color={colors.white} size={17} />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => bottomSheetModalRef.current.present()}
                style={styles.birthContainer}
              >
                <NewText text={birth.year} color={colors.white} size={17} />
              </TouchableOpacity>
            </View>

            <View
              style={{
                ...appStyles.row,
                gap: scale(8),
                marginVertical: verticalScale(17),
                marginLeft: scale(8),
              }}
            >
              <Image
                style={{ width: scale(15), height: scale(15) }}
                source={images.info}
                resizeMode="contain"
              />
              <NewText
                text={"You must be 18 or older to use Status."}
                color={"#8A8A8A"}
                size={14}
                style={{ marginTop: 3 }}
                fontFam="Poppins-Medium"
                fontWeight="500"
              />
            </View>
          </View>

          <Button
            text="NEXT"
            width={"100%"}
            onPress={() => {
              if (birth.birthday.length==0) {
                setError("Please Select Your Birthday");
                setToastColor(colors.red);

                setShowError(true);
                setTimeout(() => {
                  setShowError(false);
                }, 4000);

                return;
              }

              navigation.navigate("Signup", { birthday: values.birthday });
            }}
        
            fontWeight={"500"}
            textColor={colors.black}
            bgColor={colors.white}
          />
          <Spacer height={25} />

          <View style={{ height: 1, backgroundColor: colors.white }} />
          <Spacer height={20} />
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => navigation.navigate("Login")}

            style={{
              ...appStyles.row,
              justifyContent: "center",
              paddingVertical: verticalScale(5),
              width: "65%",
              alignSelf: "center",
            }}
          >
            <NewText
              text={"Already a member?"}
              color={colors.white}
              // size={11}
              style={{ textAlign: "center" }}
              fontFam="Poppins-Medium"
              fontWeight="500"
            />
            <Spacer width={5} />
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => navigation.navigate("Login")}
            >
              <NewText
                text={"Log In here"}
                color={colors.white}
                // size={11}
                textDecorationLine={"underline"}
                style={{ textAlign: "center" }}
                fontFam="Poppins-Medium"
                fontWeight="500"
              />
            </TouchableOpacity>
          </TouchableOpacity>
          {/* <ErrorToast
          text="Invalid email address"
          /> */}
        </View>
      </SafeAreaView>

      {showError && (
        <CustomToast
          showError={showError}
          setShowError={setShowError}
          text={error}
          bgColor={toastColor}
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
                setBirth({
                  ...birth,
                  month: month,
                  year: year,
                  day: day,
                  birthday: values.birthday,
                });

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
              const day = date.getDate().toString().padStart(2, "0");
              console.log("day", day);
              const month = date.getMonth() + 1;
              const year = date.getFullYear().toString();

              let birth = `${month.toString().padStart(2, "0")}/${day
                .toString()
                .padStart(2, "0")}/${year}`;
              console.log("birth", birth);
              // let birth = `${year}-${month.toString().padStart(2, "0")}-${day
              //   .toString()
              //   .padStart(2, "0")}`;
              // console.log("birth", birth);

        
              setMonth(month.toString().padStart(2, "0"));
              setDay(day);
              setYear(year);
              setValues({ ...values, birthday: birth });
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

export default FirstSignup;

const styles = StyleSheet.create({
  birthContainer: {
    justifyContent: "center",
    width: "25%",
    height: verticalScale(45),
    alignItems: "center",
    borderRadius: scale(7),
    backgroundColor: colors.black200,
  },
});
