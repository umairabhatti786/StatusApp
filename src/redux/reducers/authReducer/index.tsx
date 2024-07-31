import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export interface SignupState {
  name: string;
  phoneNumber: string;
  countryFlag: string;
  isRemember: boolean;
  otpCode: string;
  onboadring: boolean;
  isAddressModal: boolean;
}
export interface AuthState {
  user: any;
  signupSetup: SignupState;
  notificationAlert: boolean;
  referralLinkId: string;
  LoyaltyPoints:number

}
export const initialState: AuthState = {
  user: null,
  notificationAlert: false,
  referralLinkId: "",
  LoyaltyPoints:0,


  signupSetup: {
    name: "",
    phoneNumber: "",
    countryFlag: "",
    isRemember: true,
    otpCode: "",
    onboadring: false,
    isAddressModal: false,
  },
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSignUpValue: (state, { payload }: PayloadAction<SignupState>) => {
      state.signupSetup = payload;
    },
    setUserData: (state, { payload }: PayloadAction<any>) => {
      state.user = payload;
    },
    setLoyaltyPoints: (state, { payload }: PayloadAction<any>) => {
      state.LoyaltyPoints = payload;
    },
    setNotificationAlert: (state, { payload }: PayloadAction<boolean>) => {
      state.notificationAlert = payload;
    },
    setReferralLinkId: (state, { payload }: PayloadAction<string>) => {
      state.referralLinkId = payload;
    },
    setEmptyReferralLinkId: (state, { payload }: PayloadAction<any>) => {
      state.referralLinkId = initialState.referralLinkId;
    },

    setEmptyUserData: (state, { payload }: PayloadAction<SignupState>) => {
      state.user = initialState.user;
    },

    setCountryFlag: (state, { payload }: PayloadAction<string>) => {
      state.signupSetup.countryFlag = payload;
    },
    setIsRemember: (state, { payload }: PayloadAction<boolean>) => {
      state.signupSetup.isRemember = payload;
    },
    setPhoneNumber: (state, { payload }: PayloadAction<string>) => {
      state.signupSetup.phoneNumber = payload;
    },
    setOpt: (state, { payload }: PayloadAction<string>) => {
      state.signupSetup.otpCode = payload;
    },
    setOnboaring: (state, { payload }: PayloadAction<boolean>) => {
      state.signupSetup.onboadring = payload;
    },
    setIsAddressModal: (state, { payload }: PayloadAction<boolean>) => {
      state.signupSetup.isAddressModal = payload;
    },
  },
});

export const {
  setSignUpValue,
  setUserData,
  setCountryFlag,
  setIsRemember,
  setPhoneNumber,
  setOpt,
  setOnboaring,
  setEmptyUserData,
  setIsAddressModal,
  setNotificationAlert,
  setReferralLinkId,
  setEmptyReferralLinkId,
  setLoyaltyPoints,
} = authSlice.actions;
export default authSlice.reducer;

export const getSignupValue = (state: RootState) => state?.auth.signupSetup;
export const getReferralLinkId = (state: RootState) => state?.auth.referralLinkId;
export const getUserData = (state: RootState) => state?.auth.user;
export const getLoyaltyPoints = (state: RootState) => state?.auth.LoyaltyPoints;

export const getNotificationAlert = (state: RootState) =>
  state?.auth.notificationAlert;
export const getToken = (state: RootState) => state?.auth.user?.token;
export const getAddressModal = (state: RootState) =>
  state?.auth.signupSetup.isAddressModal;
export const getCountryFlag = (state: RootState) =>
  state?.auth?.signupSetup.countryFlag;
