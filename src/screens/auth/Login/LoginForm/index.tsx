import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import FormInput from '../../../../components/FormInput';
import {images} from '../../../../assets';
import {colors} from '../../../../utils/colors';
import Checkbox from '../../../../components/Checkbox';
import CustomText from '../../../../components/CustomText';
import CustomButton from '../../../../components/CustomButton';
import {
  canadianPhoneNumberRegex,
  numericRegex,
  passwordRegex,
} from '../../../../utils/Regex';
import {useDispatch} from 'react-redux';
import {
  setCountryFlag,
  setSignUpValue,
} from '../../../../redux/reducers/authReducer';
import {isiPad} from '../../../../utils/CommonFun';
import {verticalScale} from 'react-native-size-matters';

type Props = {
  navigation?: any;
  values?: any;
  setValues?: any;
  error?: any;
  setError?: any;
  handlePhoneAuth?: any;
  setIsRemember?: any;
  isRemember?: boolean;
  isLoading?: boolean;
  onPress?: any;
  setFormattedNumber?: any;
  localize?: any;
};
const LoginForm = ({
  navigation,
  values,
  setValues,
  error,
  setError,
  handlePhoneAuth,
  isRemember,
  setIsRemember,
  isLoading,
  onPress,
  setFormattedNumber,
  localize,
}: Props) => {
  const phoneInputRef = useRef(null);
  const dispatch = useDispatch();
  const handlePhoneChange = (value: any) => {
    if (value.length == 0) {
      setError({...error, phoneError: ''});
      setValues({...values, phone: ''});
    }
    if (value.length > 0) {
      if (!numericRegex.test(value)) {
        return;
      }
      setValues({...values, phone: value});
      let isValid = canadianPhoneNumberRegex.test(value);
      if (isValid) {
        setError({...error, phoneError: ''});
        setValues({...values, phone: value});
      } else {
        setError({...error, phoneError: `${localize?.login_phone_number_field_invalid_validation}`});
      }

      // const isValid = phoneInputRef.current?.isValidNumber?.(value);
    }
  };

  return (
    <View>
      <View>
        <FormInput
          label={localize?.login_phone_number_field_label}
          PhonePlaceholder={localize?.login_phone_number_field_place_holder}
          countryFlag={values.countryFlag}
          keyboard="numeric"
          source
          isPhoneField
          onChangeCountryNumber={handlePhoneChange}
          phoneInputValue={values.phone}
          phoneInputRef={phoneInputRef}
          error={values?.phone && error?.phoneError ? error?.phoneError : ''}
        />
      </View>
      <View style={styles.checkboxContainer}>
        <TouchableOpacity
          onPress={() => setIsRemember(!isRemember)}
          style={{...styles.checkboxTextContainer}}>
          <Checkbox
            onPress={() => setIsRemember(!isRemember)}
            isChecked={isRemember}
          />
          <CustomText
            text={localize?.remember_me_title}
            style={{marginLeft: '6%', marginRight: 30}}
            numberOfLines={1}
            size={isiPad ? 15 : 12}
            color={colors.primary}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          text={localize?.get_otp}
          height={isiPad ? verticalScale(33) : 50}
          shadowOpacity={0.3}
          size={isiPad ? 22 : 18}
          elevation={5}
          disable={error.phoneError ? true : false}
          borderRadius={32}
          width="100%"
          onPress={onPress}
        />
      </View>
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 5,
    marginVertical: verticalScale(10),
  },
  checkboxTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: '14%',
  },
});
