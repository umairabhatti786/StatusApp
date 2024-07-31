import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { ApiServices } from "../../../api/ApiServices";
import { Alert } from "react-native";
import { sessionCheck } from "../../../utils/CommonFun";

export interface Provider {
  homePageLoading: boolean;
  refreshing: boolean;
  selectedPlain:any,
  homePageCarousel: [];
  loyaltyPoints: {
    tier_bronze_points: number;
    tier_silver_points: number;
    tier_gold_points: number;
    tier_platinum_points: number;
  };
  pointsBalance: string;
  homePageBlogs: [];
  homePageslider: [];
  error: any;
}

export const initialState: Provider = {
  homePageLoading: false,
  selectedPlain:{},
  refreshing: false,
  pointsBalance: "",
  homePageCarousel: [],
  homePageBlogs: [],
  homePageslider: [],
  loyaltyPoints: {
    tier_bronze_points: 0,
    tier_silver_points: 0,
    tier_gold_points: 0,
    tier_platinum_points: 0,
  },
  error: undefined,
};
export const fetchHomePageContent = createAsyncThunk(
  "loyalty/homePageContent",
  async (token: any, thunkAPI) => {
    const result: any = await new Promise((resolve) => {
      ApiServices.getHomePage(token, (result: any) => {
        resolve(result);
      });
    });
    if (result.isSuccess) {
      console.log("result?.response", result?.response);

      if (
        result?.response?.app_update_status == 1 ||
        result?.response?.session_expire
      ) {
        sessionCheck(
          result?.response?.app_update_status,
          result?.response?.session_expire,
          thunkAPI.dispatch
        );

        return;
      }

      return result?.response?.data; // Assuming "data" has a "data" property
    } else {
      Alert.alert("Alert!", "Something went wrong");
    }
  }
);

export const refreshHomePageContent = createAsyncThunk(
  "loyalty/refreshHomePageContact",
  async (token: any, thunkAPI) => {
    const result: any = await new Promise((resolve) => {
      ApiServices.getHomePage(token, (result: any) => {
        resolve(result);
      });
    });
    if (result.isSuccess) {
      if (
        result?.response?.app_update_status == 1 ||
        result?.response?.session_expire
      ) {
        sessionCheck(
          result?.response?.app_update_status,
          result?.response?.session_expire,
          thunkAPI.dispatch
        );

        return;
      }

      return result?.response?.data; // Assuming "data" has a "data" property
    } else {
      Alert.alert("Alert!", "Something went wrong");
    }
  }
);
const searchSlice = createSlice({
  name: "homePage",
  initialState,
  reducers: {
    setSelectedPlain: (state, { payload }: PayloadAction<any[]>) => {
      state.selectedPlain = payload;
    },
  },

  extraReducers(builder) {
    builder
      .addCase(fetchHomePageContent.pending, (state, action) => {
        state.homePageLoading = true;
      })
      .addCase(fetchHomePageContent.fulfilled, (state, action) => {
        state.homePageLoading = false;
        state.loyaltyPoints.tier_bronze_points = Number(
          action.payload?.loyalty_points?.tier_bronze_points
        );
        state.loyaltyPoints.tier_silver_points = Number(
          action.payload?.loyalty_points?.tier_silver_points
        );
        state.loyaltyPoints.tier_gold_points = Number(
          action.payload?.loyalty_points?.tier_gold_points
        );
        state.loyaltyPoints.tier_platinum_points = Number(
          action.payload?.loyalty_points?.tier_platinum_points
        );
        state.pointsBalance = action.payload?.points_balance;
        state.homePageCarousel = action.payload?.carousels;
        state.homePageslider = action.payload?.sliders;
        state.homePageBlogs = action.payload?.blogs;
      })
      .addCase(fetchHomePageContent.rejected, (state, action) => {
        state.homePageLoading = false;
        console.log("action.error", action.error);
        state.error = action.error;
      })

      .addCase(refreshHomePageContent.pending, (state, action) => {
        state.refreshing = true;
      })
      .addCase(refreshHomePageContent.fulfilled, (state, action) => {
        state.homePageLoading = false;
        state.refreshing = false;
        state.loyaltyPoints.tier_bronze_points = Number(
          action.payload?.loyalty_points?.tier_bronze_points
        );
        state.loyaltyPoints.tier_silver_points = Number(
          action.payload?.loyalty_points?.tier_silver_points
        );
        state.loyaltyPoints.tier_gold_points = Number(
          action.payload?.loyalty_points?.tier_gold_points
        );
        state.loyaltyPoints.tier_platinum_points = Number(
          action.payload?.loyalty_points?.tier_platinum_points
        );
        state.pointsBalance = action.payload?.points_balance;
        state.homePageCarousel = action.payload?.carousels;
        state.homePageslider = action.payload?.sliders;
        state.homePageBlogs = action.payload?.blogs;
      })
      .addCase(refreshHomePageContent.rejected, (state, action) => {
        state.refreshing = false;
        state.error = action.error;
      });
  },
});
export const { setSelectedPlain } = searchSlice.actions;

// export const { setDashboard } = searchSlice.actions;
export default searchSlice.reducer;
export const getHomePageCarousel = (state: RootState) =>
  state?.homePage.homePageCarousel;
export const getHomePageSlider = (state: RootState) =>
  state?.homePage.homePageslider;
export const getHomePageBlogs = (state: RootState) =>
  state?.homePage.homePageBlogs;

export const getHomePageLoading = (state: RootState) =>
  state?.homePage.homePageLoading;
export const getLoyaltyPoints = (state: RootState) =>
  state?.homePage.loyaltyPoints;
export const getPointsBalance = (state: RootState) =>
  state?.homePage.pointsBalance;
  export const getSelectedPlain = (state: RootState) =>
  state?.homePage.selectedPlain
export const getRefreshing = (state: RootState) => state?.homePage.refreshing;
