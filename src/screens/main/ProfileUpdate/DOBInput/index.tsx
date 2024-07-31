import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import CustomText from "../../../../components/CustomText";
import { colors } from "../../../../utils/colors";
import { useCallback, useRef, useState } from "react";
import { isiPad } from "../../../../utils/CommonFun";
import { verticalScale } from "react-native-size-matters";

type Props = {
  label?: string;
  datePlaceholder?: string;
  monthPlaceholder?: string;
  yearPlaceholder?: string;
  keyboard?: any;
  props?: any;
  values?: any;
  setValues?: any;
  birth?: any;
  setBirth?: any;
};

const DOBInput = ({
  label,
  datePlaceholder,
  monthPlaceholder,
  yearPlaceholder,
  keyboard,
  props,
  values,
  setValues,
  birth,
  setBirth,
}: Props) => {
  const dayRef = useRef<any>();
  const monthRef = useRef<any>();
  const yearRef = useRef<any>();

  let date = new Date();
  let currentYear = date.getFullYear();
  let minYear = currentYear - 16;

  return (
    <View style={{ ...props, marginTop: 15,gap:isiPad?verticalScale(10):0 }}>
      <View>
        <CustomText 
        size={isiPad?15:12}
        text={label} color={colors.primary} />
      </View>
      <View
        style={{
          flexDirection: "row",
          gap: 15,
        }}
      >
        <View style={{ ...styles.main, flex: 1 }}>
          <TextInput
            ref={dayRef}
            style={{ ...styles.textInput }}
            placeholder={datePlaceholder}
            maxLength={2}
            value={birth.day}
            placeholderTextColor={colors.lightBlack}
            keyboardType={keyboard}
            onChangeText={(value: string) => {
              // if (!numericRegex.test(value)) {
              //   return;
              // }
              if (Number(value) <= 31 && value != "00") {
                setBirth({ ...birth, day: value });
                if (value.length == 2) {
                  monthRef.current.focus();
                }
              }
            }}
          />
        </View>
        <View style={{ ...styles.main, flex: 1 }}>
          <TextInput
            ref={monthRef}
            style={{ ...styles.textInput }}
            placeholder={monthPlaceholder}
            maxLength={2}
            value={birth.month}
            placeholderTextColor={colors.lightBlack}
            keyboardType={keyboard}
            onChangeText={(value: string) => {
              {
                if (Number(value) <= 12 && value != "00") {
                  setBirth({ ...birth, month: value });

                  if (value.length == 2) {
                    yearRef.current.focus();
                  } else if (value.length == 0) {
                    dayRef.current.focus();
                  }
                }
              }
            }}
          />
        </View>
        <View style={{ ...styles.main, flex: 2 }}>
          <TextInput
            ref={yearRef}
            style={{ ...styles.textInput }}
            placeholder={yearPlaceholder}
            value={birth.year}
            maxLength={4}
            // if(expectedYear>=value)

            onChangeText={(value: string) => {
              if (value.length == 0) {
                setBirth({ ...birth, year: "" });
                monthRef.current.focus();
              } else if (value.length == 1) {
              } else if (value.length > 3) {
                if (parseInt(value) > minYear) {
                  return;
                }
              }

              setBirth({ ...birth, year: value });
            }}
            placeholderTextColor={colors.lightBlack}
            keyboardType={keyboard}
          />
        </View>
      </View>
    </View>
  );
};
export default DOBInput;
const styles = StyleSheet.create({
  main: {
    borderColor: "#092F7436",
    borderBottomWidth: 1.5,
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  textInput: {
    fontSize: isiPad?18:  14,
    height: 44,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: "35%",
    color: colors.black,
  },
});
