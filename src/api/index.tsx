import axios from 'axios';
import { URLS } from './urls';
import { STRIPE_URLS } from './StripeApiServices/StripeUrls';
export const client = axios.create({
  baseURL: URLS.BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
export const clientJson = axios.create({
  baseURL: URLS.BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",

},
});

export const getApiUrl= (endpoint:any) => {
    let url = URLS.BASE_URL + endpoint;
    return url;
  };

  export const getStripeApiUrl= (endpoint:any) => {
    let url = URLS.STRIPE_LIVE_URL + endpoint;
    return url;
  };

