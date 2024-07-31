import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export interface CartState {
  cartData: [];
  totalCartAmount: number;
  isViewCart:boolean
  pickupType:string
}

export const initialState: CartState = {
  cartData: [],
  totalCartAmount: 0,
  isViewCart:true,
  pickupType:"1"
};
const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    setCartData: (state, { payload }: PayloadAction<CartState>) => {
      state.cartData.push(payload);
    },
    setEmptyCard: (state, { payload }: PayloadAction<CartState>) => {
      state.cartData=initialState.cartData;
    },
    updateCart: (state, { payload }: PayloadAction<CartState>) => {
     state.cartData = payload;
    },
    setPickupType: (state, { payload }: PayloadAction<CartState>) => {
      state.pickupType = payload;
     },
    setIncrementCartItem: (state, { payload }: PayloadAction<CartState>) => {
      let myCartItem = state.cartData;
      myCartItem[payload.index] = {
        ...myCartItem?.[payload.index],
        quantity: payload?.item.quantity + 1,
      };


      myCartItem[payload.index] = {
        ...myCartItem[payload.index],
        priceByQty: payload?.item.priceByQty + parseFloat(payload.item.price),
      };

      let currentTotal = myCartItem?.reduce(
        (accumulator, current) => accumulator + parseFloat(current?.priceByQty),
        0.0
      );
      state.totalCartAmount = currentTotal;

      // let { item, index } = payload;
      // console.log("PayloadItemCard",payload?.item,payload.index)

      // state.cartData.push(payload);
    },

    setRemoveCartItem: (state, { payload }: PayloadAction<CartState>) => {
      state.cartData = state.cartData.filter((item, index) => item != payload);
    },

    setTotalCartAmount: (state, { payload }: PayloadAction<CartState>) => {
      state.totalCartAmount = payload;
    },

    setDecrementCartItem: (state, { payload }: PayloadAction<CartState>) => {
      let myCartItem = state.cartData;
      if (payload?.item.quantity == 1) {
        state.cartData = state.cartData.filter(
          (item, index) => index != payload.index
        );

        return;
      }
      myCartItem[payload.index] = {
        ...myCartItem?.[payload.index],
        quantity: payload?.item.quantity - 1,
      };

      myCartItem[payload.index] = {
        ...myCartItem[payload.index],
        priceByQty: payload?.item.priceByQty - parseFloat(payload.item.price),
      };
      let currentTotal = myCartItem?.reduce(
        (accumulator, current) => accumulator + parseFloat(current?.priceByQty),
        0.0
      );
      console.log("CgangrToelm", currentTotal);
      state.totalCartAmount = currentTotal;

      // let { item, index } = payload;
      // console.log("PayloadItemCard",payload?.item,payload.index)

      // state.cartData.push(payload);
    },
    setViewCart: (state, { payload }: PayloadAction<CartState>) => {
      state.isViewCart = payload;
    },


  },
});

export const {
  setCartData,
  setIncrementCartItem,
  setDecrementCartItem,
  setTotalCartAmount,
  setViewCart,
  setEmptyCard,
  updateCart,
  setPickupType
} = cartSlice.actions;
export default cartSlice.reducer;
export const getCartData = (state: RootState) => state.cart.cartData;
export const getTotalCartAmount = (state: RootState) =>
  state.cart.totalCartAmount;
  export const getPickupType = (state: RootState) =>
  state.cart.pickupType;

  export const getViewCart = (state: RootState) =>
  state.cart.isViewCart;
