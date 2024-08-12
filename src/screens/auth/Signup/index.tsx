import React, { useEffect, useState } from "react";
import {
  Alert,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
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
import { SignupForm } from "./SignupForm";
import Loader from "../../../components/Loader";
import { UserSignup } from "../../../api/ApiServices";
import OneSignal from "react-native-onesignal";
import moment from "moment";
import LookingFor from "../../../components/LookingFor";

const Signup = ({ route }: any) => {
  const navigation: any = useNavigation();
  const [showPassword, setShowPAssword] = useState(false);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [toastColor, setToastColor] = useState(colors.red);
  const [deveiceId, setDeviceId] = useState();

  const LookingForData = [
    "Chat",
    "Dates",
    "Friends",
    "Networking",
    "Hookups",
    "Relationship",
  ];


  const getDeviceId = async () => {
    let deviceState = await OneSignal.getDeviceState();
    console.log("devchc", deviceState?.userId);
    // setDeviceId(deviceState?.userId);
  };
  const [values, setValues] = useState<any>({
    email: "",
    name: "",
    password: "",
    lookingFor: [],
    birthday: route?.params?.birthday,
  });

  console.log("valueslookingFor",values)

  const formattedBirthday = moment("1995-12-28").format("MMM D, YYYY");

  console.log("DatsValeu", route?.params?.birthday);

  const OnSignup = async () => {
    const viladResponse = SignupForm(values, setShowError, setError);
    let deviceState = await OneSignal.getDeviceState();

    if (viladResponse) {
      const data = {
        email: values.email,
        password: values.password,
        deviceId: deviceState?.userId,
        name: values.name,
        birthday: values.birthday,
        interestTags:JSON.stringify(values.lookingFor)
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
            console.log("Erorr",result?.msg)

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

      console.log("ckbdckdbc",response)
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
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flex: 1, padding: scale(20) }}>
            <View style={appStyles.row}>
              <TouchableOpacity
                style={{ width: "15%", height: 40, justifyContent: "center" }}
                onPress={() => navigation.goBack()}
              >
                <Image source={images.back} />
              </TouchableOpacity>

              <NewText
                text={"Create Account (2 of 2)"}
                color={colors.white}
                size={20}
                style={{ textAlign: "center" }}
                fontFam="Poppins-Medium"
                fontWeight="500"
              />
            </View>

            <Spacer height={verticalScale(10)} />

            <Input
              label="Name"
              value={values.name}
              onChangeText={(txt: string) => {
                setValues({ ...values, name: txt });
              }}
              placeholder="Choose a display name"
            />
            <Spacer height={5} />

            <Input
              label="Email"
              value={values.email}
              onChangeText={(txt: string) => {
                setValues({ ...values, email: txt });
              }}
              placeholder="Enter your email"
            />
            <Spacer height={5} />

            <Spacer height={5} />
            <Input
              label="Password"
              isPassword={showPassword}
              value={values.password}
              onChangeText={(txt: string) => {
                setValues({ ...values, password: txt });
              }}
              onShowPassword={() => setShowPAssword(!showPassword)}
              placeholder="8-20 character password"
              source={showPassword ? images.eyeclose : images.eye}
            />
            <Spacer height={15} />
            <View
              style={{
                marginVertical: verticalScale(10),
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
                  marginVertical: verticalScale(10),
                }}
              >
                {LookingForData.map((item, index) => {
                  return (
                    <View
                      style={{ marginBottom: verticalScale(8) }}
                      key={index}
                    >
                      <LookingFor
                    
                      lookingFor={values?.lookingFor}
                        onPress={() => {
                          let findIndex = values.lookingFor.findIndex(
                            (i: string) => i === item
                          );

                          if (findIndex === -1) {
                            // If item is not in the array, add it
                            setValues((prevValues) => ({
                              ...prevValues,
                              lookingFor: [...prevValues.lookingFor, item],
                            }));
                          } else {
                            // If item is in the array, remove it (if needed)
                            setValues((prevValues) => ({
                              ...prevValues,
                              lookingFor: prevValues.lookingFor.filter(
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

              <NewText
                fontWeight={"500"}
                fontFam="Poppins-Medium"
                size={16}
                text={"Date of Birth"}
                color={colors.white}
              />
              <NewText
                fontWeight={"500"}
                fontFam="Poppins-Medium"
                size={14}
                text={moment(values.birthday, 'MM/DD/YYYY').format('MMM D, YYYY')}
                color={"#CCCCCC"}
              />
            </View>

            <View>
              <View style={{ ...appStyles.row }}>
                <NewText
                  text={"By tapping Continue, you agree to Status’s"}
                  color={colors.white}
                  size={11}
                  style={{ textAlign: "center" }}
                  fontFam="Poppins-Medium"
                  fontWeight="500"
                />
                <Spacer width={3} />
                <TouchableOpacity>
                  <NewText
                    text={"Terms of"}
                    textDecorationLine={"underline"}
                    color={colors.white}
                    size={11}
                    style={{ textAlign: "center", marginRight: 10 }}
                    fontFam="Poppins-Medium"
                    fontWeight="500"
                  />
                </TouchableOpacity>
              </View>
              <View style={appStyles.row}>
                <TouchableOpacity>
                  <NewText
                    text={"Use"}
                    textDecorationLine={"underline"}
                    color={colors.white}
                    size={11}
                    //   style={{textAlign:"center",marginRight:10}}
                    fontFam="Poppins-Medium"
                    fontWeight="500"
                  />
                </TouchableOpacity>
                <Spacer width={3} />
                <NewText
                  text={"and"}
                  color={colors.white}
                  size={11}
                  fontFam="Poppins-Medium"
                  fontWeight="500"
                />
                <Spacer width={3} />

                <TouchableOpacity>
                  <NewText
                    text={"Privacy Policy."}
                    textDecorationLine={"underline"}
                    color={colors.white}
                    size={11}
                    style={{ marginLeft: 3 }}
                    fontFam="Poppins-Medium"
                    fontWeight="500"
                  />
                </TouchableOpacity>
              </View>
            </View>
            <Spacer height={10} />

            <Button
              text="CONTINUE"
              width={"100%"}
              onPress={OnSignup}
              fontWeight={"500"}
              textColor={colors.black}
              bgColor={colors.white}
            />
            <Spacer height={25} />

            {/* <ErrorToast
          text="Invalid email address"
          /> */}
          </View>
        </SafeAreaView>
      </KeyboardAwareScrollView>

      {showError && (
        <CustomToast
          showError={showError}
          setShowError={setShowError}
          text={error}
          bgColor={toastColor}
        />
      )}
    </>
  );
};

export default Signup;
