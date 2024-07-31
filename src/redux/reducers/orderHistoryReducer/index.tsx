import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { ApiServices } from "../../../api/ApiServices";
import { Alert } from "react-native";
import { ActiveOrder, PastOrder } from "../../../utils/Data";
import { sessionCheck } from "../../../utils/CommonFun";

export interface Provider {
  isLoading: boolean;
  refreshing: boolean;
  orderHistoryData: [];
  activeOrder: [];
  pastOrder: [];
  selectedOrderHistory: [];
  productQuantity: number;
  productPrice: number;
  productAddonsItems: [];

  productAddonsSum: number;
  error: any;
}

export const initialState: Provider = {
  isLoading: true,
  refreshing: false,
  orderHistoryData: [],
  activeOrder: [],
  pastOrder: [],
  selectedOrderHistory: [],
  productQuantity: 0,
  productAddonsItems: [],
  productPrice: 0,
  productAddonsSum: 0,
  error: undefined,
};
export const fetchOrderHistory = createAsyncThunk(
  "loyalty/orderHistory",
  async (params: any,thunkAPI) => {
    const result:any = await new Promise((resolve) => {
      ApiServices.getOrderHistory(params, (result:any) => {
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

export const refreshOrderHistory = createAsyncThunk(
  "loyalty/refreshOrderHistory",
  async (params: any) => {
    const result:any = await new Promise((resolve) => {
      ApiServices.getOrderHistory(params, (result:any) => {
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

export const fetchMoreOrderHistory = createAsyncThunk(
  "loyalty/fetchMoreOrderHistory",
  async (params: any) => {
    const result:any = await new Promise((resolve) => {
      ApiServices.getOrderHistory(params, (result:any) => {
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

const searchSlice = createSlice({
  name: "branches",
  initialState,
  reducers: {
    setOrderHistory: (state, { payload }: PayloadAction<any[]>) => {
      state.orderHistoryData = payload;
    },

    updateSpecialInstructions: (state, { payload }: PayloadAction<any[]>) => {
      let orderHistoryItem = state.selectedOrderHistory;

      orderHistoryItem[payload?.index].data = {
        ...orderHistoryItem?.[payload.index].data,
        notes: payload?.notes,
      };
    },

    setSelectedOrderHistory: (state, { payload }: PayloadAction<any[]>) => {
      state.selectedOrderHistory = payload;
    },
    setProductPrice: (state, { payload }: PayloadAction<any[]>) => {
      state.productPrice = payload;
    },
    setAddonsItems: (state, { payload }: PayloadAction<any[]>) => {
      let orderHistoryItem = state.selectedOrderHistory;
      orderHistoryItem[payload.index] = {
        ...orderHistoryItem?.[payload.index],
        addons: payload?.addons,
      };
    },
    setProductQuantity: (state, { payload }: PayloadAction<any[]>) => {
      let orderHistoryItem = state.selectedOrderHistory;
      if (payload.increment == "increment") {
        orderHistoryItem[payload.index] = {
          ...orderHistoryItem?.[payload.index],
          quantity: payload?.item.quantity + 1,
        };
      } else {
        orderHistoryItem[payload.index] = {
          ...orderHistoryItem?.[payload.index],
          quantity: payload?.item.quantity - 1,
        };
      }
    },
    updateProductAddons: (state, { payload }: PayloadAction<any[]>) => {
      let orderHistoryItem = state.selectedOrderHistory;
      orderHistoryItem[payload.index] = {
        ...orderHistoryItem?.[payload.index],
        addonSum: payload?.addonSum,
      };

      let selectedAddons=payload.addons.filter((item) => item.selected)
      let maximum=orderHistoryItem[payload.index].addons[payload?.addonindex]?.maximum
      let minimum=orderHistoryItem[payload.index].addons[payload?.addonindex]?.minimum
      orderHistoryItem[payload.index].addons[payload?.addonindex] = {
        ...orderHistoryItem[payload.index].addons[payload?.addonindex],
        items: payload.addons,
        disable:selectedAddons.length>parseInt(maximum) ||selectedAddons.length<parseInt(minimum)?true:false
      };
    },
  },

  extraReducers(builder) {
    builder
      .addCase(fetchOrderHistory.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchOrderHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.orderHistoryData = action.payload;
        let order = action.payload;
        let filteredActiveOrders = order.filter((item) => {
          // Check if the status of the item exists in the orderStatus object
          return Object.values(ActiveOrder).includes(item.status);
        });
        let filteredPastOrders = order.filter((item) => {
          // Check if the status of the item exists in the orderStatus object
          return Object.values(PastOrder).includes(item.status);
        });
        state.orderHistoryData = filteredPastOrders;
        state.activeOrder = filteredActiveOrders;
      })
      .addCase(fetchOrderHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })

      .addCase(fetchMoreOrderHistory.pending, (state, action) => {
        state.isLoading = false;
      })
      .addCase(fetchMoreOrderHistory.fulfilled, (state, action) => {
        let previousOrderHistory = state.orderHistoryData;
        let previousActiveOrder = state.activeOrder;

        let order = action?.payload || [];
        let newActiveOrders = order.filter((item) => {
          // Check if the status of the item exists in the orderStatus object
          return Object.values(ActiveOrder).includes(item.status);
        });
        let newPastOrders = order?.filter((item) => {
          // Check if the status of the item exists in the orderStatus object
          return Object.values(PastOrder).includes(item.status);
        });

        if (order.length > 0) {
          let combinedOrderHistoryData = [
            ...previousOrderHistory,
            ...newPastOrders,
          ];
          let combinedActiveOrder = [
            ...previousActiveOrder,
            ...newActiveOrders,
          ];

          // Update branchesData with the combined array
          state.orderHistoryData = combinedOrderHistoryData;
          state.activeOrder = combinedActiveOrder;
        } else {
          state.orderHistoryData = state.orderHistoryData;
          state.activeOrder = state.activeOrder;
        }
      })
      .addCase(fetchMoreOrderHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })

      .addCase(refreshOrderHistory.pending, (state, action) => {
        state.refreshing = true;
      })
      .addCase(refreshOrderHistory.fulfilled, (state, action) => {
        state.refreshing = false;
        // state.orderHistoryData = action.payload;
        let order = action.payload;
        let filteredActiveOrders = order.filter((item) => {
          // Check if the status of the item exists in the orderStatus object
          return Object.values(ActiveOrder).includes(item.status);
        });
        let filteredPastOrders = order.filter((item) => {
          // Check if the status of the item exists in the orderStatus object
          return Object.values(PastOrder).includes(item.status);
        });
        state.orderHistoryData = filteredPastOrders;
        state.activeOrder = filteredActiveOrders;
      })
      .addCase(refreshOrderHistory.rejected, (state, action) => {
        state.refreshing = false;
        state.error = action.error;
      })
  },
});

export const {
  setOrderHistory,
  setSelectedOrderHistory,
  setProductQuantity,
  setProductPrice,
  updateProductAddons,
  setAddonsItems,
  updateSpecialInstructions,
} = searchSlice.actions;
export default searchSlice.reducer;
export const getOrderHistory = (state: RootState) =>
  state?.orderHistory.orderHistoryData;
export const getActiveOrders = (state: RootState) =>
  state?.orderHistory.activeOrder;

export const getOrderLoading = (state: RootState) =>
  state?.orderHistory.isLoading;
  export const getOrderRefreshing = (state: RootState) =>
  state?.orderHistory.refreshing;
export const getSelectedOrderHistory = (state: RootState) =>
  state?.orderHistory.selectedOrderHistory;

export const getProductQuantity = (state: RootState) =>
  state?.orderHistory.productQuantity;
export const getProductPrice = (state: RootState) =>
  state?.orderHistory.productPrice;
export const getProductAddonsSum = (state: RootState) =>
  state?.orderHistory.productAddonsSum;

export const getOrderHistroyefreshing = (state: RootState) =>
  state?.orderHistory.orderHistoryData;
