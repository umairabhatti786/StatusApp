import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { ApiServices } from "../../../api/ApiServices";
import { Alert } from "react-native";
import { sessionCheck } from "../../../utils/CommonFun";

export interface Provider {
  isLoading: boolean;
  isSearchLoading: boolean;
  refreshing: boolean;
  isFilter:boolean,
  branchesData: [];
  favouriteBranches: [];
  searchBranchesData: [];
  error: any;
  selectedBranch: {};
}

export const initialState: Provider = {
  isLoading: false,
  isFilter:false,
  isSearchLoading: false,
  refreshing: false,
  branchesData: [],
  searchBranchesData: [],
  favouriteBranches: [],
  selectedBranch: {},
  error: undefined,
};
export const fetchBranches = createAsyncThunk(
  "loyalty/branches",
  async (params: any,thunkAPI) => {
    const result:any = await new Promise((resolve) => {
      ApiServices.getBranches(params, (result:any) => {
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

export const refreshBranches = createAsyncThunk(
  "loyalty/refreshbranches",
  async (params: any,thunkAPI) => {
    const result:any = await new Promise((resolve) => {
      ApiServices.getBranches(params, (result:any) => {
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

export const filterBranches = createAsyncThunk(
  "loyalty/filterBranches",
  async (params: any,thunkAPI) => {
    const result:any = await new Promise((resolve) => {
      ApiServices.getBranches(params, (result:any) => {
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

export const getMoreBranches = createAsyncThunk(
  "loyalty/getMoreBranches",
  async (params: any,thunkAPI) => {
    const result:any = await new Promise((resolve) => {
      ApiServices.getBranches(params, (result:any) => {
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

export const fetchSearchBranches = createAsyncThunk(
  "loyalty/searchBranches",
  async (params: any,thunkAPI) => {
    const result:any = await new Promise((resolve) => {
      ApiServices.getBranches(params, (result:any) => {
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

export const fetchSearchMoreBranches = createAsyncThunk(
  "loyalty/searchMoreBranches",
  async (params: any,thunkAPI) => {
    const result:any = await new Promise((resolve) => {
      ApiServices.getBranches(params, (result:any) => {
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
  name: "branches",
  initialState,
  reducers: {
    setBarnches: (state, { payload }: PayloadAction<any[]>) => {
      state.branchesData = payload;
    },
    setLaoding: (state, { payload }: PayloadAction<any[]>) => {
      state.isLoading = payload;
    },
    
    setSearchBarnches: (state, { payload }: PayloadAction<any[]>) => {
      state.searchBranchesData = payload;
    },
    setFavouriteBranches: (state, { payload }: PayloadAction<any>) => {
      state.favouriteBranches = payload;
    },
    setEmptyBarnches: (state, { payload }: PayloadAction<any[]>) => {
      state.searchBranchesData = {};
    },
    setSelectedBranch: (state, { payload }: PayloadAction<any[]>) => {
      state.selectedBranch = payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchBranches.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchBranches.fulfilled, (state, action) => {
        state.isLoading = false;
        state.branchesData = action.payload?.branches;
        // let filterFavouriteBranches=action.payload?.branches?.filter((item)=>item?.is_favourite==1)
        // state.favouriteBranches=filterFavouriteBranches
      })
      .addCase(fetchBranches.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })

      .addCase(filterBranches.pending, (state, action) => {
        state.isFilter = true;
      })
      .addCase(filterBranches.fulfilled, (state, action) => {
        state.isFilter = false;
        state.branchesData = action.payload?.branches;
        // let filterFavouriteBranches=action.payload?.branches?.filter((item)=>item?.is_favourite==1)
        // state.favouriteBranches=filterFavouriteBranches
      })
      .addCase(filterBranches.rejected, (state, action) => {
        state.isFilter = false;
        state.error = action.error;
      })


      .addCase(refreshBranches.pending, (state, action) => {
        state.refreshing = true;
      })
      .addCase(refreshBranches.fulfilled, (state, action) => {
        state.refreshing = false;
        state.branchesData = action.payload?.branches;

      })
      .addCase(refreshBranches.rejected, (state, action) => {
        state.refreshing = false;
        state.error = action.error;
      })

      .addCase(getMoreBranches.pending, (state, action) => {
        // state.refreshing = true;
      })
      .addCase(getMoreBranches.fulfilled, (state, action) => {
        let previousData = state.branchesData;
        let newData = action.payload?.branches || []; // Ensure newData is an array
        if (newData.length > 0) {
          let combinedData = [...previousData, ...newData];
          // Update branchesData with the combined array
          state.branchesData = combinedData;
        } else {
          state.branchesData = state.branchesData;
        }

        // Concatenate previousData and newData arrays
      })
      .addCase(getMoreBranches.rejected, (state, action) => {
        // state.refreshing = false;
        state.error = action.error;
      })

      .addCase(fetchSearchMoreBranches.pending, (state, action) => {
        // state.refreshing = true;
      })
      .addCase(fetchSearchMoreBranches.fulfilled, (state, action) => {
        let previousData = state.searchBranchesData;
        let newData = action.payload?.branches || []; // Ensure newData is an array
        if (newData.length > 0) {
          let combinedData = [...previousData, ...newData];
          // Update branchesData with the combined array
          state.searchBranchesData = combinedData;
        } else {
          state.searchBranchesData = state.searchBranchesData;
        }

        // Concatenate previousData and newData arrays
      })
      .addCase(fetchSearchMoreBranches.rejected, (state, action) => {
        // state.refreshing = false;
        state.error = action.error;
      })
      .addCase(fetchSearchBranches.pending, (state, action) => {
        state.isSearchLoading = true;
      })
      .addCase(fetchSearchBranches.fulfilled, (state, action) => {
        state.isSearchLoading = false;
        state.searchBranchesData = action.payload?.branches
      })
      .addCase(fetchSearchBranches.rejected, (state, action) => {
        state.isSearchLoading = false;
        state.error = action.error;
      });
  },
});

export const {
  setBarnches,
  setSearchBarnches,
  setEmptyBarnches,
  setFavouriteBranches,
  setSelectedBranch,
  setLaoding
} = searchSlice.actions;
export default searchSlice.reducer;
export const getBranchesData = (state: RootState) =>
  state?.branches.branchesData;
export const getSearchBranchesData = (state: RootState) =>
  state?.branches.searchBranchesData;

export const getBranchLoading = (state: RootState) => state?.branches.isLoading;
export const getSearchBranchLoading = (state: RootState) =>
  state?.branches.isSearchLoading;
export const getBranchRefreshing = (state: RootState) =>
  state?.branches.refreshing;

export const getIsFilter = (state: RootState) =>
state?.branches.isFilter;
export const getSelectedBranch = (state: RootState) =>
  state?.branches.selectedBranch;

export const getFavouriteBranches = (state: RootState) =>
  state?.branches.favouriteBranches;
