import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { colors } from "../../utils/colors";
import CustomText from "../CustomText";
import PhoneInput from "../PhoneInput";
import { isiPad } from "../../utils/CommonFun";
import { verticalScale } from "react-native-size-matters";

type Props = {
  label?: string;
  placeholder?: string;
  error?: string;
  isPassword?: boolean;
  source?: any;
  keyboard?: any;
  phoneInputValue?: any;
  phoneInputRef?: any;
  props?: any;
  value?: any;
  onChangeText?: any;
  onBlur?: any;
  isCenter?: boolean;
  isPhoneField?: boolean;
  onShowPassword?: any;
  editable?: boolean;
  complusory?: boolean;
  color?: string;
  onChangeCountry?: any;
  countryFlag?: string;
  maxLength?: number;
  onChangeCountryNumber?: any;
  autoCapitalize?: any;
  alignError?: any;
  PhonePlaceholder?: string;
};

const FormInput = ({
  label,
  placeholder,
  keyboard,
  isPassword,
  source,
  props,
  isCenter,
  isPhoneField,
  phoneInputValue,
  phoneInputRef,
  value,
  onChangeText,
  onBlur,
  error,
  onShowPassword,
  editable,
  complusory,
  color,
  onChangeCountry,
  countryFlag,
  maxLength,
  onChangeCountryNumber,
  autoCapitalize,
  alignError,
  PhonePlaceholder,
}: Props) => {

  console.log("placeholder",placeholder)
  return (
    <View style={{ ...props, marginTop: 15,gap:isiPad?verticalScale(10):0 }}>
      <View style={{ flexDirection: "row" }}>
        <CustomText
          fontWeight={"500"}
          fontFam="Montserrat-Medium"
          text={label}
          size={isiPad?15:12}
          color={colors.primary}
        />
        {complusory && <CustomText text={"*"} color={colors.warning} />}
      </View>
      {!isPhoneField ? (
        <View
          style={{
            borderBottomColor: "#092F7435",
            borderBottomWidth: 1.5,
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 10,
          }}
        >
          <View style={{ flex: 1 }}>
            <TextInput
              value={value}
              editable={editable}
              style={{
                fontSize: isiPad?18:14,
                height: 50,
                color: color || colors.black,
                ...(isCenter && { alignSelf: "center" }),
              }}
              placeholder={placeholder}
              placeholderTextColor={colors.lightBlack}
              keyboardType={keyboard}
              maxLength={maxLength}
              secureTextEntry={isPassword || false}
              onChangeText={onChangeText}
              onBlur={onBlur}
              autoCapitalize={autoCapitalize || "none"}
            />
          </View>
          {source && (
            <TouchableOpacity
              onPress={onShowPassword}
              activeOpacity={0.6}
              disabled={!onShowPassword}
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              <Image
                source={source}
                style={{
                  width: 20,
                  height: 20,
                }}
              />
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <PhoneInput
          value={phoneInputValue}
          editable={editable}
          color={color}
          PhonePlaceholder={PhonePlaceholder}
          countryFlag={countryFlag}
          source={source}
          onChangeCountryNumber={onChangeCountryNumber}
          phoneInputRef={phoneInputRef}
        />
      )}
      {error && (
        <View
          style={{
            alignItems: alignError || "flex-end",
            marginTop: 3,
          }}
        >
          <CustomText size={isiPad?14: 11} text={error} color={"red"} />
        </View>
      )}
    </View>
  );
};
export default FormInput;
