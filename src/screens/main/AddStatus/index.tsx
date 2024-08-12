import React, { useEffect, useState } from "react";
import {
  Alert,
  LogBox,
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { images } from "../../../assets/images";
import CustomButton from "../../../components/CustomButton";
import CustomText from "../../../components/CustomText";
import Header from "../../../components/Header";
import { appStyles } from "../../../utils/AppStyles";
import { colors } from "../../../utils/colors";
import { windowHeight } from "../../../utils/Dimensions";

const AddStatus = ({ navigation,route }: any) => {
  const isEdit = route.params?.isEdit;
  const data = route.params?.data;
  const [status, setStatus] = useState(data?.status);

  console.log("knkcvdnc", data);

  return (
    <View style={appStyles.main}>
      <Header
        isEdit
        txt={data?.text}
        // isDelete
      />
      <View style={{ ...appStyles.row, padding: 15 }}>
        <Image
          style={{ height: 40, width: 40, borderRadius: 999 }}
          source={images.profiledef}
        />
        <CustomText
          color={colors.white}
          size={16}
          fontFam={"Poppins-SemiBold"}
          fontWeight={"700"}
          style={{ marginLeft: 15 }}
          text={"Lauren Connors"}
        />
      </View>
      <View
        style={{
          height: windowHeight / 3.5,
          width: "100%",
          backgroundColor: colors.primary,
          padding: 10,
        }}>
        <TextInput
          value={status}
          multiline={true}
          style={{
            fontSize: 18,

            fontFamily: "Poppins-Regular",
            fontWeight: "500",
            color: colors.white,
          }}
          placeholder={"What’s your status?"}
          placeholderTextColor={colors.white}
        />
      </View>
      <View style={appStyles.row}>
        <View
          style={{
            width: "100%",
            height: 50,
            backgroundColor: "#4E576990",
            alignItems: "flex-end",
            // flexDirection:"row",
            justifyContent: "center",
            paddingHorizontal: 15,
          }}>
          <View style={appStyles.row}>
            <CustomText
              color={"#D6D8DC"}
              size={17}
              fontWeight={"400"}
              text={"26 / 500"}
            />
            {isEdit && (
              <CustomButton
                text="SAVE"
                width={80}
                onPress={()=>navigation.goBack()}
                height={35}
                style={{ marginLeft: 20 }}

                size={18}
                fontWeight={"500"}
                borderRadius={5}
                bgColor={colors.white}
                textColor={colors.black}
              />
            )}
          </View>
        </View>
      </View>
      {
        data?.isStatus ||!data&&(
          <TouchableOpacity
          activeOpacity={0.6}
          style={{
            width: 90,
            height: 90,
            borderRadius: 5,
            borderColor: colors.white,
            borderStyle: "dotted",
            margin: 15,
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 1,
          }}>
          <TouchableOpacity>
            {data?.bgImage ? (
              <View>
                <Image style={{ width: 90, height: 90 }} source={data.bgImage} />
                <View
                  style={{
                    position: "absolute",
                    width: 15,
                    height: 15,
                    right: 7,
                    top: 7,
                  }}>
                  <Image
                    style={{ width: 15, height: 15 }}
                    source={images.crosswhite}
                  />
                </View>
              </View>
            ) : (
              <Image style={{ width: 16, height: 16 }} source={images.plusgrey} />
            )}
          </TouchableOpacity>
        </TouchableOpacity>

        )
      }

    
    </View>
  );
};

export default AddStatus;
