import {MMKV} from 'react-native-mmkv';
const storage = new MMKV();

export const TOKEN='@token'
export const SETTING='@setting'
export const LOCATIO_ACCESS='@location-access'
export const CURRENT_POSITION="@current-position"
export const FACE_ID="@face-id"
export const DelIVERY_ADDRESS="@delivery-address"
export const SELECTED_PAYMENT_METHOD="@selected-payment-method"
export const STRIPE_USER="@stripe-user"
export const ON_BOARDING = "on_boarding";






export const StorageServices ={
    setItem:  async(key:string,value:any)=>{
        storage.set(key, JSON.stringify(value));
    },
    getItem:  async (key:any)=>{
        const value = storage.getString(key);
        return value ? JSON.parse(value) || null : null;
    },
    removeItem: async ()=>{
        storage.clearAll();
    },
    removeItems: async (key:any)=>{
        storage.delete(key);
    }}