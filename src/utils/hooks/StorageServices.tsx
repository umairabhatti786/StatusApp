import {MMKV} from 'react-native-mmkv';
const storage = new MMKV();

export const TOKEN='@token'
export const AUTH='@auth'
export const REMEMBER='@remember'








export const StorageServices ={
    setItem:  async(key:string,value:any)=>{
        storage.set(key, JSON.stringify(value));
    },
    getItem:  async (key:any)=>{
        const value = storage.getString(key);
        return value ? JSON.parse(value) || null : null;
    },
    removeItem: async (key:any)=>{
        storage.delete(key);
    },
    removeItems: async ()=>{
        storage.clearAll();
    }
}