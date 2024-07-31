import axios from "axios";
import { client, clientJson, getApiUrl } from "..";
import { URLS } from "../urls";
import { throwSentryError } from "../../utils/hooks/Errors";
import { Alert, Platform } from "react-native";
import { getVersion } from "react-native-device-info";
// export const installedVersion  = "1.0"
export const installedVersion = getVersion();
console.log("installedVersion", installedVersion);
export const ApiServices = {
  authenticate: async (data: any, callback: any) => {
    let config = {
      method: "post",
      headers: {
        "Entity-Uuid": URLS.ENTITY_UID,
        "Device-Type": Platform.OS,
        "Installed-App": installedVersion,
      },
      body: data,
    };
    console.log("configAuth", config);

    try {
      fetch(getApiUrl(URLS.AUTH), config)
        .then((response) => response.text())
        .then((result) => callback({ isSuccess: true, response: result }))
        .catch((error) => callback({ isSuccess: false, response: error }));
    } catch (error) {
      throwSentryError(error);

      return { isSuccess: false, error: error };
    }
  },
  validatePromoCode: async (data: any, token: any, callback: any) => {
    let config = {
      method: "post",
      headers: {
        "Entity-Uuid": URLS.ENTITY_UID,
        Authorization: "Bearer " + token,
        "Device-Type": Platform.OS,
        "Installed-App": installedVersion,
      },
      body: data,
    };
    try {
      fetch(getApiUrl(URLS.VALIDATE_PROMO_CODE), config)
        .then((response) => response.text())
        .then((result) =>
          callback({ isSuccess: true, response: JSON.parse(result) })
        )
        .catch((error) => callback({ isSuccess: false, response: error }));
    } catch (error) {
      throwSentryError(error);

      return { isSuccess: false, error: error };
    }
  },
  placeOrder: async (params: any, callback: any) => {
    var raw = JSON.stringify(params?.data);

    let config = {
      method: "post",
      headers: {
        "Entity-Uuid": URLS.ENTITY_UID,
        Authorization: "Bearer " + params.token,
        "Device-Type": Platform.OS,
        "Installed-App": installedVersion,
      },
      body: raw,
    };
    try {
      fetch(getApiUrl(URLS.PLACE_ORDER), config)
        .then((response) => response.text())
        .then((result) => callback({ isSuccess: true, response: result }))
        .catch((error) => callback({ isSuccess: false, response: error }));
    } catch (error) {
      throwSentryError(error);

      return { isSuccess: false, error: error };
    }
  },

  branchFavorite: async (params: any, callback: any) => {
    let config = {
      method: "post",
      headers: {
        "Entity-Uuid": URLS.ENTITY_UID,
        Authorization: "Bearer " + params?.token,
        "Device-Type": Platform.OS,
        "Installed-App": installedVersion,
      },
      body: params?.data,
    };
    try {
      fetch(getApiUrl(URLS.BRANCH_FAVORITE), config)
        .then((response) => response.text())
        .then((result) => callback({ isSuccess: true, response: result }))
        .catch((error) => callback({ isSuccess: false, response: error }));
    } catch (error) {
      throwSentryError(error);

      return { isSuccess: false, error: error };
    }
  },

  getHomePage: async (token: any, callback: any) => {
    const config = {
      method: "GET",
      headers: {
        "Entity-Uuid": URLS.ENTITY_UID,
        Authorization: "Bearer " + token,
        "Device-Type": Platform.OS,
        "Installed-App": installedVersion,
      },
    };

    try {
      const response = await fetch(getApiUrl(URLS.GET_HOME_PAGE), config);
      const result = await response.json();
      callback({ isSuccess: true, response: result });
    } catch (error: any) {
      throwSentryError(error);
      callback({ isSuccess: false, response: error.message });
    }
  },

  getCuisinesAndCategory: async (token:any, callback: any) => {
    const config = {
      method: "GET",
      headers: {
        "Entity-Uuid": URLS.ENTITY_UID,
        Authorization: "Bearer " + token,
        "Device-Type": Platform.OS,
        "Installed-App": installedVersion,
      },
    };

    try {
      const response = await fetch(getApiUrl(URLS.GTECUISINES_And_CATEGORY), config);
      const result = await response.json();
      callback({ isSuccess: true, response: result });
    } catch (error: any) {
      throwSentryError(error);
      callback({ isSuccess: false, response: error.message });
    }
  },

  getPaymentMethods: async (token: any, callback: any) => {
    const config = {
      method: "GET",
      headers: {
        "Entity-Uuid": URLS.ENTITY_UID,
        Authorization: "Bearer " + token,
        "Device-Type": Platform.OS,
        "Installed-App": installedVersion,
      },
    };

    try {
      const response = await fetch(getApiUrl(URLS.GET_PAYMENT_METHODS), config);
      const result = await response.json();
      callback({ isSuccess: true, response: result });
    } catch (error: any) {
      throwSentryError(error);
      callback({ isSuccess: false, response: error.message });
    }
  },

  getPopularProducts: async (token: any, callback: any) => {
    const config = {
      method: "GET",
      headers: {
        "Entity-Uuid": URLS.ENTITY_UID,
        Authorization: "Bearer " + token,
        "Device-Type": Platform.OS,
        "Installed-App": installedVersion,
      },
    };

    try {
      const response = await fetch(getApiUrl(URLS.POPULAR_PRODUCTS), config);
      const result = await response.json();
      callback({ isSuccess: true, response: result });
    } catch (error: any) {
      throwSentryError(error);
      callback({ isSuccess: false, response: error.message });
    }
  },

  deleteAddress: async (params: any, callback: any) => {
    const config = {
      method: "DELETE",
      headers: {
        "Entity-Uuid": URLS.ENTITY_UID,
        Authorization: "Bearer " + params.token,
        "Device-Type": Platform.OS,
        "Installed-App": installedVersion,
      },
    };

    try {
      const response = await fetch(
        getApiUrl(URLS.DELETE_ADDRESS + `/${params.id}`),
        config
      );
      const result = await response.json();
      callback({ isSuccess: true, response: result });
    } catch (error: any) {
      throwSentryError(error);
      callback({ isSuccess: false, response: error.message });
    }
  },
  getLoyaltyContent: async (token: any, callback: any) => {
    const config = {
      method: "GET",
      headers: {
        "Entity-Uuid": URLS.ENTITY_UID,
        Authorization: "Bearer " + token,
        "Device-Type": Platform.OS,
        "Installed-App": installedVersion,
      },
    };

    try {
      const response = await fetch(getApiUrl(URLS.GET_LOYALTY_CONTENT), config);
      const result = await response.json();
      callback({ isSuccess: true, response: result });
    } catch (error: any) {
      throwSentryError(error);
      callback({ isSuccess: false, response: error.message });
    }
  },
  getEarnContent: async (token: any, callback: any) => {
    const config = {
      method: "GET",
      headers: {
        "Entity-Uuid": URLS.ENTITY_UID,
        Authorization: "Bearer " + token,
        "Device-Type": Platform.OS,
        "Installed-App": installedVersion,
      },
    };

    try {
      const response = await fetch(getApiUrl(URLS.EARN_CONTENT), config);
      const result = await response.json();
      callback({ isSuccess: true, response: result });
    } catch (error: any) {
      throwSentryError(error);
      callback({ isSuccess: false, response: error.message });
    }
  },
  getRedeemContent: async (token: any, callback: any) => {
    const config = {
      method: "GET",
      headers: {
        "Entity-Uuid": URLS.ENTITY_UID,
        Authorization: "Bearer " + token,
        "Device-Type": Platform.OS,
        "Installed-App": installedVersion,
      },
    };

    try {
      const response = await fetch(getApiUrl(URLS.REDEEM_CONTENT), config);
      const result = await response.json();
      callback({ isSuccess: true, response: result });
    } catch (error: any) {
      throwSentryError(error);
      callback({ isSuccess: false, response: error.message });
    }
  },

  deleteUser: async (params: any, callback: any) => {
    const config = {
      method: "DELETE",
      headers: {
        "Entity-Uuid": URLS.ENTITY_UID,
        Authorization: "Bearer " + params.token,
        "Device-Type": Platform.OS,
        "Installed-App": installedVersion,
      },
    };
    try {
      const response = await fetch(
        getApiUrl(URLS.DELETE_USER + `/${params.id}`),
        config
      );
      const result = await response.json();
      callback({ isSuccess: true, response: result });
    } catch (error: any) {
      throwSentryError(error);
      callback({ isSuccess: false, response: error.message });
    }
  },

  getOrderDetail: async (params: any, callback: any) => {
    const config = {
      method: "GET",
      headers: {
        "Entity-Uuid": URLS.ENTITY_UID,
        Authorization: "Bearer " + params.token,
        "Device-Type": Platform.OS,
        "Installed-App": installedVersion,
      },
    };
    try {
      const response = await fetch(
        getApiUrl(URLS.ORDER_DETAIL + `/${params.id}`),
        config
      );
      const result = await response.json();
      callback({ isSuccess: true, response: result });
    } catch (error: any) {
      throwSentryError(error);
      callback({ isSuccess: false, response: error.message });
    }
  },
  deleteStripePaymentMethod: async (params: any, callback: any) => {
    const config = {
      method: "POST",
      headers: {
        "Entity-Uuid": URLS.ENTITY_UID,
        Authorization: "Bearer " + params.token,
        "Device-Type": Platform.OS,
        "Installed-App": installedVersion,
      },
    };

    try {
      const response = await fetch(
        getApiUrl(
          URLS.DELETE_STRIPE_PAYMENT + `?payment_method_id=${params.id}`
        ),
        config
      );
      const result = await response.json();
      callback({ isSuccess: true, response: result });
    } catch (error: any) {
      throwSentryError(error);
      callback({ isSuccess: false, response: error.message });
    }
  },
  addUserAddress: async (params: any, callback: any) => {
    const config = {
      method: "POST",
      headers: {
        "Entity-Uuid": URLS.ENTITY_UID,
        Authorization: "Bearer " + params.token,
        "Device-Type": Platform.OS,
        "Installed-App": installedVersion,
      },
      body: params.data,
    };

    try {
      const response = await fetch(getApiUrl(URLS.ADD_USER_ADDRESS), config);
      const result = await response.json();
      callback({ isSuccess: true, response: result });
    } catch (error: any) {
      throwSentryError(error);
      callback({ isSuccess: false, response: error.message });
    }
  },

  getEntityLocalize: async (params: any, callback: any) => {
    const config = {
      method: "GET",
      headers: {
        "Entity-Uuid": URLS.ENTITY_UID,
        "Device-Type": Platform.OS,
        "Installed-App": installedVersion,
      },
    };

    try {
      const response = await fetch(
        "https://loyalty.droidor.com/api/v1/getEntityLocale",

        config
      );
      const result = await response.json();
      callback({ isSuccess: true, response: result });
    } catch (error: any) {
      throwSentryError(error);
      callback({ isSuccess: false, response: error.message });
    }
  },
  getProductdetail: async (params: any, callback: any) => {
    const config = {
      method: "GET",
      headers: {
        "Entity-Uuid": URLS.ENTITY_UID,
        Authorization: "Bearer " + params.token,
        "Device-Type": Platform.OS,
        "Installed-App": installedVersion,
      },
    };

    try {
      const response = await fetch(
        getApiUrl(URLS.PRODUCT_DETAIL + `?product_id=${params.id}`),
        config
      );
      const result: any = await response.json();
      callback({ isSuccess: true, response: result });
    } catch (error: any) {
      throwSentryError(error);
      callback({ isSuccess: false, response: error.message });
    }
  },

  getProductCategories: async (token: any, callback: any) => {
    const config = {
      method: "GET",
      headers: {
        "Entity-Uuid": URLS.ENTITY_UID,
        Authorization: "Bearer " + token,
        "Device-Type": Platform.OS,
        "Installed-App": installedVersion,
      },
    };

    try {
      const response = await fetch(getApiUrl(URLS.PRODUCT_CATEGORIES), config);
      const result = await response.json();
      callback({ isSuccess: true, response: result });
    } catch (error: any) {
      throwSentryError(error);
      callback({ isSuccess: false, response: error.message });
    }
  },

  getMemberShips: async (token: any, callback: any) => {
    const config = {
      method: "GET",
      headers: {
        "Entity-Uuid": URLS.ENTITY_UID,
        Authorization: "Bearer " + token,
        "Device-Type": Platform.OS,
        "Installed-App": installedVersion,
      },
    };

    try {
      const response = await fetch(getApiUrl(URLS.MEMBERSHIPS), config);
      const result = await response.json();
      callback({ isSuccess: true, response: result });
    } catch (error: any) {
      throwSentryError(error);
      callback({ isSuccess: false, response: error.message });
    }
  },

  buySubscription: async (data :any,token: any,endPoint:any, callback: any) => {
    const config = {
      method: "POST",
      headers: {
        "Entity-Uuid": URLS.ENTITY_UID,
        Authorization: "Bearer " + token,
        "Device-Type": Platform.OS,
        "Installed-App": installedVersion,
      },
      body: data,

    };

    try {
      const response = await fetch(getApiUrl(endPoint), config);
      const result = await response.json();
      callback({ isSuccess: true, response: result });
    } catch (error: any) {
      throwSentryError(error);
      callback({ isSuccess: false, response: error.message });
    }
  },

  getSubscribedMembership: async (token: any, callback: any) => {
    const config = {
      method: "GET",
      headers: {
        "Entity-Uuid": URLS.ENTITY_UID,
        Authorization: "Bearer " + token,
        "Device-Type": Platform.OS,
        "Installed-App": installedVersion,
      },

    };

    try {
      const response = await fetch(getApiUrl(URLS.SUBSCRIBED_MEMBERSHIP), config);
      const result = await response.json();
      callback({ isSuccess: true, response: result });
    } catch (error: any) {
      throwSentryError(error);
      callback({ isSuccess: false, response: error.message });
    }
  },

  getAddressList: async (params: any, callback: any) => {
    const config = {
      method: "GET",
      headers: {
        "Entity-Uuid": URLS.ENTITY_UID,
        Authorization: "Bearer " + params?.token,
        "Device-Type": Platform.OS,
        "Installed-App": installedVersion,
      },
    };

    try {
      const response = await fetch(
        getApiUrl(URLS.ADDRESS_LIST) + `?entity_branch_id=${params.id}`,
        config
      );

      const result = await response.json();
      callback({ isSuccess: true, response: result });
    } catch (error: any) {
      throwSentryError(error);
      callback({ isSuccess: false, response: error.message });
    }
  },
  getMenu: async (params: any, callback: any) => {
    const config = {
      method: "GET",
      headers: {
        "Entity-Uuid": URLS.ENTITY_UID,
        Authorization: "Bearer " + params?.token,
        "Device-Type": Platform.OS,
        "Installed-App": installedVersion,
      },
    };

    try {
      const response = await fetch(
        getApiUrl(
          URLS.MENU +
            `?page=${params.page}&search_query=${params.search}&is_previous=${params?.isPrevious}&product_category_id=${params?.category_id}`
        ),
        config
      );
      const result = await response.json();
      callback({ isSuccess: true, response: result });
    } catch (error: any) {
      throwSentryError(error);
      callback({ isSuccess: false, response: error.message });
    }
  },

  getManuePage: async (token: any, callback: any) => {
    const config = {
      method: "GET",
      headers: {
        "Entity-Uuid": URLS.ENTITY_UID,
        Authorization: "Bearer " + token,
        "Device-Type": Platform.OS,
        "Installed-App": installedVersion,
      },
    };

    try {
      const response = await fetch(getApiUrl(URLS.GET_MANUE_PAGE), config);
      const result = await response.json();
      callback({ isSuccess: true, response: result });
    } catch (error: any) {
      throwSentryError(error);
      callback({ isSuccess: false, response: error.message });
    }
  },

  getBranches: async (params: any, callback: any) => {
    const config = {
      method: "GET",
      headers: {
        "Entity-Uuid": URLS.ENTITY_UID,
        Authorization: "Bearer " + params?.token,
        "Device-Type": Platform.OS,
        "Installed-App": installedVersion,
      },
    };

    try {
      const response = await fetch(
        getApiUrl(
          URLS.BRANCHES +
            `?latitude=${params?.latitude}&longitude=${params?.longitude}&search_query=${params.search}&is_previous=${params?.isPrevious}&is_favourites=${params.isFavourite}&page=${params?.page}`
        ),
        config
      );
      const result = await response.json();

      callback({ isSuccess: true, response: result });
    } catch (error) {
      throwSentryError(error);
      callback({ isSuccess: false, response: error });
    }
  },
  getOrderHistory: async (params: any, callback: any) => {
    const config = {
      method: "GET",
      headers: {
        "Entity-Uuid": URLS.ENTITY_UID,
        Authorization: "Bearer " + params?.token,
        "Device-Type": Platform.OS,
        "Installed-App": installedVersion,
      },
    };

    try {
      const response = await fetch(
        getApiUrl(URLS.ORDER_HISTORY + `?page=${params.page}`),
        config
      );

      const result = await response.json();
      callback({ isSuccess: true, response: result });
    } catch (error) {
      throwSentryError(error);
      callback({ isSuccess: false, response: error });
    }
  },

  getActiveOrder: async (token: any, callback: any) => {
    const config = {
      method: "GET",
      headers: {
        "Entity-Uuid": URLS.ENTITY_UID,
        Authorization: "Bearer " + token,
        "Device-Type": Platform.OS,
        "Installed-App": installedVersion,
      },
    };
    console.log("Activeonfig",config)

    try {
      const response = await fetch(getApiUrl(URLS.ACTIVE_ORDERS), config);

      const result = await response.json();
      callback({ isSuccess: true, response: result });
    } catch (error) {
      throwSentryError(error);
      callback({ isSuccess: false, response: error });
    }
  },

  getPointsData: async (token: any, callback: any) => {
    const config = {
      method: "GET",
      headers: {
        "Entity-Uuid": URLS.ENTITY_UID,
        Authorization:  "Bearer " + token,
        "Device-Type": Platform.OS,
        "Installed-App": installedVersion,
      },
    };
    console.log("config",config)

    try {
      const response = await fetch(getApiUrl(URLS.POINTS_DATA), config);
      const result = await response.json();
      callback({ isSuccess: true, response: result });
    } catch (error) {
      throwSentryError(error);
      callback({ isSuccess: false, response: error });
    }
  },
  getAppConTent: async (params: any, callback: any) => {
    const config = {
      method: "GET",
      headers: {
        "Entity-Uuid": URLS.ENTITY_UID,
        Authorization: "Bearer " + params?.token,
        "Device-Type": Platform.OS,
        "Installed-App": installedVersion,
      },
    };

    try {
      const response = await fetch(getApiUrl(params?.endPoint), config);
      const result = await response.json();
      callback({ isSuccess: true, response: result });
    } catch (error) {
      throwSentryError(error);
      callback({ isSuccess: false, response: error });
    }
  },

  getNotificationSetting: async (token: any, callback: any) => {
    const config = {
      method: "GET",
      headers: {
        "Entity-Uuid": URLS.ENTITY_UID,
        Authorization: "Bearer " + token,
        "Device-Type": Platform.OS,
        "Installed-App": installedVersion,
      },
    };

    try {
      const response = await fetch(getApiUrl(URLS.GET_NOTIFICATION_SETTING), config);
      const result = await response.json();
      callback({ isSuccess: true, response: result });
    } catch (error) {
      throwSentryError(error);
      callback({ isSuccess: false, response: error });
    }
  },

  updateNotificationSetting: async (data:any,token: any, callback: any) => {
    const config = {
      method: "POST",
      headers: {
        "Entity-Uuid": URLS.ENTITY_UID,
        Authorization: "Bearer " + token,
        "Device-Type": Platform.OS,
        "Installed-App": installedVersion,
      },
      body: data,

    };

    try {
      const response = await fetch(getApiUrl(URLS.UPDATE_NOTIFICATION_SETTING), config);
      const result = await response.json();
      callback({ isSuccess: true, response: result });
    } catch (error) {
      throwSentryError(error);
      callback({ isSuccess: false, response: error });
    }
  },

  getPointsHistory: async (token: any, callback: any) => {
    const config = {
      method: "GET",
      headers: {
        "Entity-Uuid": URLS.ENTITY_UID,
        Authorization: "Bearer " + token,
        "Device-Type": Platform.OS,
        "Installed-App": installedVersion,
      },
    };

    try {
      const response = await fetch(getApiUrl(URLS.POINTS_HISTORY), config);
      const result = await response.json();
      callback({ isSuccess: true, response: result });
    } catch (error) {
      throwSentryError(error);
      callback({ isSuccess: false, response: error });
    }
  },

  getNotifications: async (params: any, callback: any) => {
    const config = {
      method: "GET",
      headers: {
        "Entity-Uuid": URLS.ENTITY_UID,
        Authorization: "Bearer " + params?.token,
        "Device-Type": Platform.OS,
        "Installed-App": installedVersion,
      },
    };

    try {
      const response = await fetch(
        getApiUrl(URLS.GET_NOTIFICATIONS + `?page=${params.page}`),
        config
      );

      const result = await response.json();
      callback({ isSuccess: true, response: result });
    } catch (error) {
      throwSentryError(error);
      callback({ isSuccess: false, response: error });
    }
  },

  updateProfile: async (data: any, callback: any) => {
    let config = {
      method: "post",
      headers: {
        "Entity-Uuid": URLS.ENTITY_UID,
        "Device-Type": Platform.OS,
        "Installed-App": installedVersion,
      },
      body: data,
    };
    try {
      fetch(getApiUrl(URLS.UPDATE_PROFILE), config)
        .then((response) => response.text())
        .then((result) => callback({ isSuccess: true, response: result }))
        .catch((error) => callback({ isSuccess: false, response: error }));
    } catch (error) {
      throwSentryError(error);

      return { isSuccess: false, error: error };
    }
  },
  resendOtp: async (data: any, callback: any) => {
    let config = {
      method: "post",
      headers: {
        "Entity-Uuid": URLS.ENTITY_UID,
        "Device-Type": Platform.OS,
        "Installed-App": installedVersion,
      },
      body: data,
    };
    try {
      fetch(getApiUrl(URLS.RESEND_OTP), config)
        .then((response) => response.text())
        .then((result) => callback({ isSuccess: true, response: result }))
        .catch((error) => callback({ isSuccess: false, response: error }));
    } catch (error) {
      throwSentryError(error);

      return { isSuccess: false, error: error };
    }
  },

  authenticateOtp: async (data: any, callback: any) => {
    let config = {
      method: "post",
      headers: {
        "Entity-Uuid": URLS.ENTITY_UID,
        "Device-Type": Platform.OS,
        "Installed-App": installedVersion,
      },
      body: data,
    };
    try {
      fetch(getApiUrl(URLS.AUTHENTICATE_OTP), config)
        .then((response) => response.text())
        .then((result) => callback({ isSuccess: true, response: result }))
        .catch((error) => callback({ isSuccess: false, response: error }));
    } catch (error) {
      throwSentryError(error);

      return { isSuccess: false, error: error };
    }
  },

  validate: async (data: any, endPoint: any, callback: any) => {
    let config = {
      method: "post",
      headers: {
        "Entity-Uuid": URLS.ENTITY_UID,
        "Device-Type": Platform.OS,
        "Installed-App": installedVersion,
      },
      body: data,
    };
    try {
      fetch(getApiUrl(endPoint), config)
        .then((response) => response.text())
        .then((result) => callback({ isSuccess: true, response: result }))
        .catch((error) => callback({ isSuccess: false, response: error }));
    } catch (error) {
      throwSentryError(error);

      return { isSuccess: false, error: error };
    }
  },

  updateNumber: async (data: any, callback: any) => {
    let config = {
      method: "post",
      headers: {
        "Entity-Uuid": URLS.ENTITY_UID,
        "Device-Type": Platform.OS,
        "Installed-App": installedVersion,
      },
      body: data,
    };
    try {
      fetch(getApiUrl(URLS.UPDATE_NUMBER), config)
        .then((response) => response.text())
        .then((result) => callback({ isSuccess: true, response: result }))
        .catch((error) => callback({ isSuccess: false, response: error }));
    } catch (error) {
      throwSentryError(error);

      return { isSuccess: false, error: error };
    }
  },
  updateProfilePicture: async (data: any, callback: any) => {
    let config = {
      method: "post",
      headers: {
        "Entity-Uuid": URLS.ENTITY_UID,
        "Device-Type": Platform.OS,
        "Installed-App": installedVersion,
      },
      body: data,
    };
    try {
      fetch(getApiUrl(URLS.UPDATE_PROFILE_PICTURE), config)
        .then((response) => response.text())

        .then((result) => callback({ isSuccess: true, response: result }))
        .catch((error) => callback({ isSuccess: false, response: error }));
    } catch (error) {
      throwSentryError(error);

      return { isSuccess: false, error: error };
    }
  },
};
