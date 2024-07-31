import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { ApiServices } from "../../../api/ApiServices";
import { Alert } from "react-native";
import { sessionCheck } from "../../../utils/CommonFun";

export interface Provider {
  manuePageLoading: boolean;
  categoriesLoading: boolean;
  refreshing: boolean;
  refreshMenu: boolean;
  menuLoading: boolean;
  filterMenuLoading: boolean;
  previousMenuLoading: boolean;

  menuData: [];
  previousMenuData: [];

  menuDataLength: number;
  previousMenuDataLength: number;

  filterMenuData: [];

  ProductCategories: [];
  manuePageCarousel: [];
  manuePageSlider: [];
  selectedTab: string;
  error: any;
}
export const initialState: Provider = {
  manuePageLoading: false,
  previousMenuLoading: false,
  categoriesLoading: true,
  menuLoading: true,
  filterMenuLoading: false,
  selectedTab: "Featured",
  menuDataLength: 0,
  previousMenuDataLength: 0,
  ProductCategories: [],
  menuData: [],
  previousMenuData: [],

  filterMenuData: [],
  refreshing: false,
  refreshMenu: false,
  manuePageCarousel: [],
  manuePageSlider: [],
  error: undefined,
};
export const fetchManuePageContent = createAsyncThunk(
  "loyalty/manuePageContent",
  async (token: any,thunkAPI) => {
    const result:any = await new Promise((resolve) => {
      ApiServices.getManuePage(token, (result:any) => {
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
export const refreshManuePageContent = createAsyncThunk(
  "loyalty/refreshManuePageContact",
  async (token: any,thunkAPI) => {
    const result:any = await new Promise((resolve) => {
      ApiServices.getManuePage(token, (result:any) => {
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

export const fetchProductCategories = createAsyncThunk(
  "loyalty/ProductCategories",
  async (token: any) => {
    const result = await new Promise((resolve) => {
      ApiServices.getProductCategories(token, (result) => {
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
export const fetchMenu = createAsyncThunk(
  "loyalty/Menu",
  async (params: any,thunkAPI) => {
    const result:any = await new Promise((resolve) => {
      ApiServices.getMenu(params, (result:any) => {
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

export const fetchPreviousMenu = createAsyncThunk(
  "loyalty/prevoiusMenu",
  async (params: any,thunkAPI) => {
    const result:any = await new Promise((resolve) => {
      ApiServices.getMenu(params, (result:any) => {
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
export const fetchMorePreviousMenu = createAsyncThunk(
  "loyalty/fetchMorePreviousMenu",
  async (params: any) => {
    const result:any = await new Promise((resolve) => {
      ApiServices.getMenu(params, (result:any) => {
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

export const refreshMenu = createAsyncThunk(
  "loyalty/refreshMenu",
  async (params: any,thunkAPI) => {
    const result:any = await new Promise((resolve) => {
      ApiServices.getMenu(params, (result:any) => {
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

export const fetchMoreMenu = createAsyncThunk(
  "loyalty/fetchMoreMenu",
  async (params: any) => {
    const result = await new Promise((resolve) => {
      ApiServices.getMenu(params, (result) => {
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
const menuSlice = createSlice({
  name: "manuePage",
  initialState,
  reducers: {
    setMenu: (state, { payload }: any) => {
      state.menuData = payload;
    },
    setSelectedTab: (state, { payload }: any) => {
      state.selectedTab = payload;
    },
  },

  extraReducers(builder) {
    builder
      .addCase(fetchManuePageContent.pending, (state, action) => {
        state.manuePageLoading = true;
      })
      .addCase(fetchManuePageContent.fulfilled, (state, action) => {
        state.manuePageLoading = false;
        state.manuePageCarousel = action.payload?.carousels;
        state.manuePageSlider = action.payload?.sliders;
      })
      .addCase(fetchManuePageContent.rejected, (state, action) => {
        state.manuePageLoading = false;
        state.error = action.error;
      })
      .addCase(fetchProductCategories.pending, (state, action) => {
        state.categoriesLoading = true;
      })
      .addCase(fetchProductCategories.fulfilled, (state, action) => {
        state.categoriesLoading = false;
        state.ProductCategories = action.payload?.product_categories;
      })
      .addCase(fetchMenu.rejected, (state, action) => {
        state.menuLoading = false;
        state.filterMenuLoading = false;
        state.error = action.error;
      })
      .addCase(fetchMenu.pending, (state, action) => {
        state.menuLoading = true;
        state.filterMenuLoading = true;
      })
      .addCase(fetchMenu.fulfilled, (state, action) => {
        state.menuLoading = false;
        state.filterMenuLoading = false;
        state.ProductCategories = action.payload.map(
          ({ category_id, category_name }: any) => ({
            category_id,
            category_name,
          })
        );

        state.menuDataLength = action.payload.length;
        state.menuData = action.payload.map((item) => ({
          title: item.category_name,
          id: item.category_id,
          data: item.products,
        }));

        state.filterMenuData = action.payload.map((item) => ({
          title: item.category_name,
          id: item.category_id,
          data: item.products,
        }));
      })

      .addCase(fetchMoreMenu.rejected, (state, action) => {
        state.menuLoading = false;
        state.error = action.error;
      })
      .addCase(fetchMoreMenu.pending, (state, action) => {
        state.menuLoading = false;
      })
      .addCase(fetchMoreMenu.fulfilled, (state, action) => {
        let previousMenuData = state.menuData || [];
        let previousFilterMenuData = state.filterMenuData || [];
        let previousMenuDataLength = state.menuDataLength || 0;

        // Map the payload to the expected format
        let newMenuData =
          action.payload.map((item) => ({
            title: item.category_name,
            id: item.category_id,
            data: item.products,
          })) || [];
        let newMenuDataLength = newMenuData.length;

        // If there is new data, combine it with the existing data
        if (newMenuDataLength > 0) {
          // Combine the new data with the existing data
          let combineMenuData = [...previousMenuData, ...newMenuData];
          let combineFilterMenuData = [
            ...previousFilterMenuData,
            ...newMenuData,
          ];
          let combineMenuDataLength =
            previousMenuDataLength + newMenuDataLength;

          // Update the state with the combined data
          state.menuData = combineMenuData;
          state.menuDataLength = combineMenuDataLength;
          state.filterMenuData = combineFilterMenuData;
        } else {
          // If there is no new data, retain the previous state
          state.menuData = previousMenuData;
          state.menuDataLength = previousMenuDataLength;
          state.filterMenuData = previousFilterMenuData;
        }
      })

      .addCase(fetchPreviousMenu.rejected, (state, action) => {
        state.previousMenuLoading = false;
        state.error = action.error;
      })
      .addCase(fetchPreviousMenu.pending, (state, action) => {
        state.previousMenuLoading = true;
      })
      .addCase(fetchPreviousMenu.fulfilled, (state, action) => {
        state.previousMenuLoading = false;
        console.log("previousMenuData",action.payload)
        state.previousMenuData = action.payload;
        state.previousMenuDataLength = action.payload.length;

        


      })

      .addCase(refreshMenu.rejected, (state, action) => {
        state.refreshMenu = false;
        state.error = action.error;
      })
      .addCase(refreshMenu.pending, (state, action) => {
        state.refreshMenu = true;
      })
      .addCase(refreshMenu.fulfilled, (state, action) => {
        state.refreshMenu = false;
        state.menuData = action.payload?.products;
        state.menuDataLength = action.payload?.products.length;
        state.filterMenuData = action.payload?.products;
      })

      .addCase(fetchMorePreviousMenu.rejected, (state, action) => {
        state.refreshMenu = false;
        state.error = action.error;
      })
      .addCase(fetchMorePreviousMenu.pending, (state, action) => {
        state.refreshMenu = false;
      })
      .addCase(fetchMorePreviousMenu.fulfilled, (state, action) => {
        let previousData = state.previousMenuData;
        let previousMenuDataLength = state.previousMenuDataLength || 0;

        // state.previousMenuData = action.payload;
        // state.previousMenuDataLength = action.payload.length;
        let newData = action.payload || []; // Ensure newData is an array
        let newPreviousDataLength = newData.length;

        if (newData.length > 0) {
          let combinedData = [...previousData, ...newData];
          let combinePreviousDataLength =
          previousMenuDataLength + newPreviousDataLength;
          // Update branchesData with the combined array
          state.previousMenuData = combinedData;
          state.previousMenuDataLength = combinePreviousDataLength;

        } else {
          state.previousMenuData = state.previousMenuData;
          state.previousMenuDataLength = state.previousMenuDataLength;

        }
      })
      .addCase(fetchProductCategories.rejected, (state, action) => {
        state.categoriesLoading = false;
        state.error = action.error;
      })

      .addCase(refreshManuePageContent.pending, (state, action) => {
        state.refreshing = true;
      })
      .addCase(refreshManuePageContent.fulfilled, (state, action) => {
        state.refreshing = false;

        state.manuePageCarousel = action.payload?.carousels;
        state.manuePageSlider = action.payload?.sliders;
      })
      .addCase(refreshManuePageContent.rejected, (state, action) => {
        state.refreshing = false;
        state.error = action.error;
      });
  },
});
export const { setMenu, setSelectedTab } = menuSlice.actions;

export default menuSlice.reducer;
export const getManuePageCarousel = (state: RootState) =>
  state?.manuePage.manuePageCarousel;
export const getManuePageSlider = (state: RootState) =>
  state?.manuePage.manuePageSlider;

export const getManuePageLoadingg = (state: RootState) =>
  state?.manuePage.manuePageLoading;
export const getRefreshing = (state: RootState) => state?.manuePage.refreshing;
export const getRefreshMenu = (state: RootState) =>
  state?.manuePage.refreshMenu;
export const getProductCategories = (state: RootState) =>
  state?.manuePage.ProductCategories;
export const getMenuData = (state: RootState) => state?.manuePage.menuData;
export const getPreviousMenuData = (state: RootState) =>
  state?.manuePage.previousMenuData;
export const previousMenuLoading = (state: RootState) =>
  state?.manuePage.previousMenuLoading;
export const getFilterMenu = (state: RootState) =>
  state?.manuePage.filterMenuData;
export const getCategoriesLoading = (state: RootState) =>
  state?.manuePage.categoriesLoading;
export const getMenuLoading = (state: RootState) =>
  state?.manuePage.menuLoading;
export const getFilterMenuLoading = (state: RootState) =>
  state?.manuePage.filterMenuLoading;
export const getSelectedTab = (state: RootState) =>
  state?.manuePage.selectedTab;
export const getMenuDateLength = (state: RootState) =>
  state?.manuePage.menuDataLength;
export const getPreviousMenuLength = (state: RootState) =>
  state?.manuePage.previousMenuDataLength;
