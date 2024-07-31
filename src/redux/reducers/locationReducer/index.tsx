import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export interface LocationState {
    latitude:number,
    longitude:number,

}
export interface AuthLocationState {
  locationAccess:boolean,
  userLocation: LocationState;
}
export const initialState: AuthLocationState = {
  locationAccess:false,
  userLocation: {
    latitude:0,
    longitude:0,

  },
};
const authSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setUserLocation: (state, { payload }: PayloadAction<any>) => {
      state.userLocation = payload;
    },

    setLocationAccess: (state, { payload }: PayloadAction<any>) => {
        state.locationAccess = payload;
      },
   
   
  },
});

export const { setUserLocation,setLocationAccess } = authSlice.actions;
export default authSlice.reducer;
export const getUserLocation = (state: RootState) => state?.location.userLocation;
export const getLocationAccess = (state: RootState) => state?.location.locationAccess;



