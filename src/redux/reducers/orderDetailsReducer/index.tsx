import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { ApiServices } from "../../../api/ApiServices";
import { Alert } from "react-native";

export interface OrderDetail {
  isLoading: boolean;
  data: {};
  error: any;
}

export const initialState: OrderDetail = {
  isLoading: false,
  data: [],
  error: undefined,
};
export const fetchOrderDetail = createAsyncThunk(
  "loyalty/orderDetail",
  async (params: any) => {
    const result:any = await new Promise((resolve) => {
      ApiServices.getOrderDetail(params, (result:any) => {
        resolve(result);
      });
    });
    if (result.isSuccess) {
      return result?.response?.data; // Assuming "data" has a "data" property
    } else {
      Alert.alert("Alert!", "Something went wrong");
    }
  }
);

const searchSlice = createSlice({
  name: "orderDetail",
  initialState,
  reducers: {
    setOrderDetail: (state, { payload }: PayloadAction<OrderDetail>) => {
      state.data = payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOrderDetail.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchOrderDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchOrderDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  },
});

export const { setOrderDetail } = searchSlice.actions;
export default searchSlice.reducer;
export const getOrderDetail = (state: RootState) => state?.orderDetail.data;

export const getOrderLoading = (state: RootState) =>
  state?.orderDetail.isLoading;
