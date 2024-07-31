import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { ApiServices } from "../../../api/ApiServices";
import { Alert } from "react-native";
import { sessionCheck } from "../../../utils/CommonFun";

export interface productDetailState {
  loading: boolean;
  refreshing: boolean;
  paymentMethods: [];
  selectedProducts: [];

  error: any;
}

export const initialState: productDetailState = {
  loading: false,
  refreshing: false,
  paymentMethods: [],
  selectedProducts: [],
  error: undefined,
};
export const fetchPaymentMethods = createAsyncThunk(
  "loyalty/paymentMetthod",
  async (params: any,thunkAPI) => {
    const result: any = await new Promise((resolve) => {
      ApiServices.getPaymentMethods(params, (result: any) => {
        resolve(result);
      });
    });
    if (result.isSuccess) {
      if(result?.response?.app_update_status==1 ||result?.response?.session_expire ){
        sessionCheck(result?.response?.app_update_status,result?.response?.session_expire,thunkAPI.dispatch )

        return
      }
      return result?.response?.data; // Assuming "data" has a "data" property
    } else {
      Alert.alert("Alert!", "Something went wrong");
    }
  }
);

const paymentMethodSlice = createSlice({
  name: "paymentMethod",
  initialState,
  reducers: {
    setPaymentMethods: (state, { payload }: PayloadAction<any>) => {
      //  let productExist= state.productDetails.find(find=>find.id==payload.id)

      state.paymentMethods = payload;
    },
  },

  extraReducers(builder) {
    builder
      .addCase(fetchPaymentMethods.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchPaymentMethods.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentMethods = action.payload;
      })
      .addCase(fetchPaymentMethods.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export default paymentMethodSlice.reducer;
export const { setPaymentMethods } = paymentMethodSlice.actions;
export const getPaymentMethods = (state: RootState) =>
  state?.paymentMethod.paymentMethods;

export const getPaymentLoading = (state: RootState) =>
  state?.paymentMethod.loading;
