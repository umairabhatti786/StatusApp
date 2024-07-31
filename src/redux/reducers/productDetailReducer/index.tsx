import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { ApiServices } from "../../../api/ApiServices";
import { Alert } from "react-native";

export interface Product {
  id: string;
  // Define other properties here
}

export interface ProductDetailState {
  loading: boolean;
  refreshing: boolean;
  productDetails: any;
  selectedProducts:[];

  error: any;
}

export const initialState: ProductDetailState = {
  loading: false,
  refreshing: false,
  productDetails: {},
  selectedProducts: [],
  error: undefined,
};

export const fetchProductDetail = createAsyncThunk(
  "loyalty/productDetail",
  async (params: any) => {
    try {
      const result:any = await ApiServices.getProductdetail(params);
      if (result.isSuccess) {
        return result.response?.data;
      } else {
        throw new Error("Network Error");
      }
    } catch (error) {
      Alert.alert("Alert!", "Something went wrong");
      return null;
    }
  }
);

const productDetailSlice = createSlice({
  name: "productDetail",
  initialState,
  reducers: {
    setProductsDetails: (state, action: PayloadAction<Product>) => {
      state.productDetails = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProductDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.productDetails = action.payload;
      })
      .addCase(fetchProductDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export default productDetailSlice.reducer;
export const { setProductsDetails } = productDetailSlice.actions;

export const getProductDetail = (state: RootState) =>
  state?.productDetail.productDetails;

export const getProductDetailLoading = (state: RootState) =>
  state?.productDetail.loading;
