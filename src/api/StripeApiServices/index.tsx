import axios from "axios";
import { client, clientJson, getApiUrl, getStripeApiUrl } from "..";
import { URLS } from "../urls";
import { throwSentryError } from "../../utils/hooks/Errors";
import { Alert } from "react-native";
import { STRIPE_URLS } from "./StripeUrls";

export const StripeApiServices = {
  getStripeCustomer: async (id: any, callback: any) => {
    // const stripeSecretKey = 'sk_test_51OgAdjKiduXUAr380AOs1YRYUb2bpzGe0zP4ZV5Iau2lUPjFMGhc2LIkKOzbsKeWmArs8WESRcUe7ulzYn2jSSo900DHasRBHc';
    // const customerId = 'cus_PcAx01cdcdWCrq3Z31';

    const url = getStripeApiUrl(STRIPE_URLS.CREATE_CUSTOMER + `/${id}`);
    const headers = {
      Authorization: `Bearer ${STRIPE_URLS.SECRET_KEY}`,
    };
    try {
      const response = await fetch(url, {
        method: "GET",
        headers,
      });
      const result = await response.json();

      callback({ isSuccess: true, response: result });
    } catch (error) {
      throwSentryError(error);
      callback({ isSuccess: false, response: error.message });
    }
  },
};
