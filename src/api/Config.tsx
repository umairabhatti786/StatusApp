import axios from 'axios';
import { URLS } from './baseUrl';
// export const client = axios.create({
//   baseURL: URLS.BASE_URL,
//   headers: {
//     'Content-Type': 'multipart/form-data',
//   },
// });
// export const clientJson = axios.create({
//   baseURL: URLS.BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//     Accept: "application/json",

// },
// });
export const requestHeader = {
    Accept: "application/json",
 
  
  
  };
  export const client = axios.create({
  
    headers: requestHeader,
  })

export const getApiUrl= (endpoint:any) => {
    let url = URLS.BASE_URL + endpoint;
    return url;
  };



