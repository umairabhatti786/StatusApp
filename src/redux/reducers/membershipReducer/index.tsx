import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { ApiServices } from "../../../api/ApiServices";
import { Alert } from "react-native";

export interface OrderDetail {
  isLoading: boolean;
  membershipsData:[],
  subscribedMembership:{}
  error: any;
}

export const initialState: OrderDetail = {
  isLoading: false,
  membershipsData: [],
  subscribedMembership:{},
  error: undefined,
};
export const fetchMemberShip = createAsyncThunk(
  "loyalty/membership",
  async (params: any) => {
    const result:any = await new Promise((resolve) => {
      ApiServices.getMemberShips(params, (result:any) => {
        resolve(result);
      });
    });
    if (result?.isSuccess) {
      return result?.response?.data; // Assuming "data" has a "data" property
    } else {
      Alert.alert("Alert!", "Something went wrong");
    }
  }
);

const membershipSlice = createSlice({
  name: "memberships",
  initialState,
  reducers: {
    setMemberShipDetails: (state, action: PayloadAction<Product>) => {
      state.membershipsData = action.payload;
    },

  
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMemberShip.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMemberShip.fulfilled, (state, action) => {
        state.isLoading = false;
        state.membershipsData = action.payload.memberships;
        // state.subscribedMembership = action.payload.subscribed_membership
      })
      .addCase(fetchMemberShip.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default membershipSlice.reducer;
export const { setMemberShipDetails } = membershipSlice.actions;

export const getMemberShips = (state: RootState) => state?.memberships.membershipsData;
export const getSubscribedMembership = (state: RootState) => state?.memberships.subscribedMembership;
export const membershipLoading = (state: RootState) =>
  state?.memberships.isLoading;
