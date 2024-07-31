import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { ApiServices } from "../../../api/ApiServices";
import { Alert } from "react-native";

export interface fileState {
 localizeFile:{}
}

export const initialState: fileState = {
    localizeFile:{}
  
};


const localizeSlice = createSlice({
  name: "localizeFile",
  initialState,
  reducers: {

    setLocalizeFile: (state, {payload}: PayloadAction<any>) => {
    //  let productExist= state.productDetails.find(find=>find.id==payload.id)
      
      state.localizeFile=payload;

   


    },
   
  },

});

export default localizeSlice.reducer;
export const { setLocalizeFile } = localizeSlice.actions;
export const getLocalizeFile= (state: RootState) =>
  state?.localize.localizeFile;


