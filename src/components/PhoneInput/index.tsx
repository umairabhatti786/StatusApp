import {
  View,
  Text,
  Platform,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { colors } from "../../utils/colors";
import { images } from "../../assets";
import { appStyles } from "../../utils/AppStyles";
import CustomText from "../CustomText";
import { font } from "../../utils/font";
const Index = ({
  value,
  phoneInputRef,
  editable,
  source,
  color,
  onChangeCountryNumber,
  PhonePlaceholder,
  onBlur,
}: any) => {
  return (
    <>
      <View style={style.inputField}>
        <View
          style={{
            flex: 1,
            height: 50,
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <View style={{ ...appStyles.row, gap: 10 }}>
            <Image
              style={{ width: 30, height: 25 }}
              resizeMode="contain"
              source={images.canadaflag}
            />
            <CustomText
              text={"+1"}
              size={16}
              fontWeight="600"
              fontFam={font.montserratMedium}
              color={colors.black}
            />
          </View>
          <TextInput
            value={value}
            editable={editable}
            style={{
              fontSize: 14,
              height: 50,
              flex: 1,
              color: color || colors.black,
              fontFamily: font.montserratMedium,
            }}
            placeholder={PhonePlaceholder}
            placeholderTextColor={colors.lightBlack}
            keyboardType={"number-pad"}
            maxLength={10}
            onChangeText={onChangeCountryNumber}
            onBlur={onBlur}
            autoCapitalize={"none"}
          />

          {/* <PhoneInput
            withDarkTheme
            layout="first"
            defaultCode={countryFlag || "CA"}
            disabled={editable}
            ref={phoneInputRef}
            textInputProps={{
              maxLength: 10,
            }}
            onChangeFormattedText={onChangeFormattedText}
            onChangeCountry={onChangeCountry}
            value={value && value}
            // defaultValue={value}
            isValidNumber={value}
            placeholder={PhonePlaceholder || "XXX XX XXXXXX"}
            containerStyle={{
              borderRadius: 12,
              width: "100%",
              height: 50,
              margin: 0,
              padding: 0,
            }}
            renderFlagButton={() => (
              <TouchableWithoutFeedback
                disabled={true}
                onPress={() => {
                  console.log("kcndkcdkck");
                }}
              ></TouchableWithoutFeedback>
            )}
            textInputStyle={{
              height: 50,
              fontSize: 16,
              fontWeight: "500",
              fontFamily: "Montserrat-Regular",
              fontStyle: "italic",

              color: color,
              textAlign: "justify",
            }}
            codeTextStyle={{
              fontSize: 16,
              fontWeight: "500",
              color: color,
              height: Platform.OS == "ios" ? 20 : 25,
            }}
            textContainerStyle={{
              marginLeft: 0,
              paddingLeft: 0,
              borderRadius: 12,
              height: 50,
              backgroundColor: colors.white,
            }}
            onChangeText={(text) => {
              setValue(text);
            }}
          /> */}
        </View>
        {source && (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginRight: 12,
            }}
          >
            <Image
              source={images.phone}
              style={{
                width: 20,
                height: 20,
              }}
            />
          </View>
        )}
      </View>
    </>
  );
};

export default Index;
const style = StyleSheet.create({
  inputField: {
    borderBottomWidth: 1.5,
    borderBottomColor: colors.primary35,
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
  },
});
