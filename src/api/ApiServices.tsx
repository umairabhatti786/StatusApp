import axios from "axios";
import { client, getApiUrl } from "./Config";
import { URLS } from "./baseUrl";

export const AddRemoveLikes = async (data: any, token: any, callback: any) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(data),
  };
  try {
    fetch(URLS.BASE_URL + URLS.ADD_REMOVE_LIKES, requestOptions)
      .then((response) => response.text())
      .then((result) => callback({ isSuccess: true, response: result }))
      .catch((error) => callback({ isSuccess: false, response: error }));
  } catch (error) {
    return { isSuccess: false, error: error };
  }
};
export const AddRemoveViews = async (data: any, token: any, callback: any) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(data),
  };
  try {
    fetch(URLS.BASE_URL + URLS.ADD_REMOVE_VIEWS, requestOptions)
      .then((response) => response.text())
      .then((result) => callback({ isSuccess: true, response: result }))
      .catch((error) => callback({ isSuccess: false, response: error }));
  } catch (error) {
    return { isSuccess: false, error: error };
  }
};
export const CreateBlockConversation = async (data: any, token: any, callback: any) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(data),
  };
  try {
    fetch(URLS.BASE_URL + URLS.CREATE_BLOCK_CONVERSATION, requestOptions)
      .then((response) => response.text())
      .then((result) => callback({ isSuccess: true, response: result }))
      .catch((error) => callback({ isSuccess: false, response: error }));
  } catch (error) {
    return { isSuccess: false, error: error };
  }
};
export const CreateArchive = async (data: any, token: any, callback: any) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(data),
  };
  try {
    fetch(URLS.BASE_URL + URLS.CREATE_ARCHIVE, requestOptions)
      .then((response) => response.text())
      .then((result) => callback({ isSuccess: true, response: result }))
      .catch((error) => callback({ isSuccess: false, response: error }));
  } catch (error) {
    return { isSuccess: false, error: error };
  }
};
export const StartTypingChannel = async (data: any, token: any, callback: any) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(data),
  };
  try {
    fetch(URLS.BASE_URL + URLS.START_TYPING_CHANNEL, requestOptions)
      .then((response) => response.text())
      .then((result) => callback({ isSuccess: true, response: result }))
      .catch((error) => callback({ isSuccess: false, response: error }));
  } catch (error) {
    return { isSuccess: false, error: error };
  }
};

export const ReadMessage = async (msgId:any, token: any, callback: any) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  try {
    fetch(URLS.BASE_URL + URLS.READ_MESSAGE+msgId, requestOptions)
      .then((response) => response.text())
      .then((result) => callback({ isSuccess: true, response: result }))
      .catch((error) => callback({ isSuccess: false, response: error }));
  } catch (error) {
    return { isSuccess: false, error: error };
  }
};
export const isPostViewed = async (postId:any, token: any, callback: any) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({post_id:postId}),
  };
  try {
    fetch(URLS.BASE_URL + URLS.IS_POST_VIEWED, requestOptions)
      .then((response) => response.text())
      .then((result) => callback({ isSuccess: true, response: result }))
      .catch((error) => callback({ isSuccess: false, response: error }));
  } catch (error) {
    return { isSuccess: false, error: error };
  }
};
export const ReadPost = async (postId:any, token: any, callback: any) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  try {
    fetch(URLS.BASE_URL + URLS.READ_POST+postId, requestOptions)
      .then((response) => response.text())
      .then((result) => callback({ isSuccess: true, response: result }))
      .catch((error) => callback({ isSuccess: false, response: error }));
  } catch (error) {
    return { isSuccess: false, error: error };
  }
};
export const DeletePost = async (postId:any, token: any, callback: any) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  try {
    fetch(URLS.BASE_URL + URLS.DELETE_POST+postId, requestOptions)
      .then((response) => response.text())
      .then((result) => callback({ isSuccess: true, response: result }))
      .catch((error) => callback({ isSuccess: false, response: error }));
  } catch (error) {
    return { isSuccess: false, error: error };
  }
};
export const DELETE_CONVERSATION = async (conId:any, token: any, callback: any) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  try {
    fetch(URLS.BASE_URL + URLS.DELETE_CONVERSATION+conId, requestOptions)
      .then((response) => response.text())
      .then((result) => callback({ isSuccess: true, response: result }))
      .catch((error) => callback({ isSuccess: false, response: error }));
  } catch (error) {
    return { isSuccess: false, error: error };
  }
};
export const GetUserTrashConversation = async (userId:any, token: any, callback: any) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  try {
    fetch(URLS.BASE_URL + URLS.GET_USER_TRASH_CONVERSATION+userId, requestOptions)
      .then((response) => response.text())
      .then((result) => callback({ isSuccess: true, response: result }))
      .catch((error) => callback({ isSuccess: false, response: error }));
  } catch (error) {
    return { isSuccess: false, error: error };
  }
};
export const CREATE_TRASH_CONVERSATION = async (data: any, token: any, callback: any) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(data),
  };
  try {
    fetch(URLS.BASE_URL + URLS.CREATE_TRASH_CONVERSATION, requestOptions)
      .then((response) => response.text())
      .then((result) => callback({ isSuccess: true, response: result }))
      .catch((error) => callback({ isSuccess: false, response: error }));
  } catch (error) {
    return { isSuccess: false, error: error };
  }
};
export const CreateFavoriteConversation = async (data: any, token: any, callback: any) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(data),
  };
  try {
    fetch(URLS.BASE_URL + URLS.CREATE_FAVORITE_CONVERSATION, requestOptions)
      .then((response) => response.text())
      .then((result) => callback({ isSuccess: true, response: result }))
      .catch((error) => callback({ isSuccess: false, response: error }));
  } catch (error) {
    return { isSuccess: false, error: error };
  }
};
export const DeleteConversation = async (conversationId:any, token: any, callback: any) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  try {
    fetch(URLS.BASE_URL + URLS.DELETE_CONVERSATION+conversationId, requestOptions)
      .then((response) => response.text())
      .then((result) => callback({ isSuccess: true, response: result }))
      .catch((error) => callback({ isSuccess: false, response: error }));
  } catch (error) {
    return { isSuccess: false, error: error };
  }
};
export const GetUserFavoriteConversation = async (userId:any, token: any, callback: any) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  try {
    fetch(URLS.BASE_URL + URLS.GET_USER_FAVORITE_CONVERSATION+userId, requestOptions)
      .then((response) => response.text())
      .then((result) => callback({ isSuccess: true, response: result }))
      .catch((error) => callback({ isSuccess: false, response: error }));
  } catch (error) {
    return { isSuccess: false, error: error };
  }
};
export const GetUserArchives = async (userId:any, token: any, callback: any) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  try {
    fetch(URLS.BASE_URL + URLS.GET_USER_ARCHIVES+userId, requestOptions)
      .then((response) => response.text())
      .then((result) => callback({ isSuccess: true, response: result }))
      .catch((error) => callback({ isSuccess: false, response: error }));
  } catch (error) {
    return { isSuccess: false, error: error };
  }
};
export const SearchMessages = async (userId:any,search:any, token: any, callback: any) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  try {
    fetch(URLS.BASE_URL + URLS.SEARCH_MESSAGES+userId+"/"+search, requestOptions)
      .then((response) => response.text())
      .then((result) => callback({ isSuccess: true, response: result }))
      .catch((error) => callback({ isSuccess: false, response: error }));
  } catch (error) {
    return { isSuccess: false, error: error };
  }
};
export const SendMessage = async (data: any, token: any, callback: any) => {
  const myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Authorization", "Bearer " + token);
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: data,
    redirect: "follow",
  };

  try {
    fetch(URLS.BASE_URL + URLS.SEND_MESSAGE, requestOptions)
      .then((response) => response.text())
      .then((result) => callback({ isSuccess: true, response: result }))
      .catch((error) => callback({ isSuccess: false, response: error }));
  } catch (error) {
    return { isSuccess: false, error: error };
  }
};
export const GetConversationIfExist = async (data: any,token: any, callback: any) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(data),
  };
  try {
    fetch(URLS.BASE_URL + URLS.GET_CONVERSATION_IF_EXIST, requestOptions)
      .then((response) => response.text())
      .then((result) => callback({ isSuccess: true, response: result }))
      .catch((error) => callback({ isSuccess: false, response: error }));
  } catch (error) {
    return { isSuccess: false, error: error };
  }
};
export const GetConversation = async (data: any,token: any, callback: any) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(data),
  };
  try {
    fetch(URLS.BASE_URL + URLS.GET_CONVERSATION, requestOptions)
      .then((response) => response.text())
      .then((result) => callback({ isSuccess: true, response: result }))
      .catch((error) => callback({ isSuccess: false, response: error }));
  } catch (error) {
    return { isSuccess: false, error: error };
  }
};
export const GetRefreshConversation = async (token: any,nextUrl:any, callback: any) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    // body: JSON.stringify(data),
  };
  try {
    fetch(nextUrl, requestOptions)
      .then((response) => response.text())
      .then((result) => callback({ isSuccess: true, response: result }))
      .catch((error) => callback({ isSuccess: false, response: error }));
  } catch (error) {
    return { isSuccess: false, error: error };
  }
};
export const GetInNotifications = async (token: any, callback: any) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    // body: JSON.stringify(data),
  };
  try {
    fetch(URLS.BASE_URL + URLS.GET_IN_NOTIFICATION, requestOptions)
      .then((response) => response.text())
      .then((result) => callback({ isSuccess: true, response: result }))
      .catch((error) => callback({ isSuccess: false, response: error }));
  } catch (error) {
    return { isSuccess: false, error: error };
  }
};
export const GetChatList = async (token: any, callback: any) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    // body: JSON.stringify(data),
  };
  try {
    fetch(URLS.BASE_URL + URLS.Get_CHAT_LIST, requestOptions)
      .then((response) => response.text())
      .then((result) => callback({ isSuccess: true, response: result }))
      .catch((error) => callback({ isSuccess: false, response: error }));
  } catch (error) {
    return { isSuccess: false, error: error };
  }
};

export const UpdatePost = async (data: any, token: any, callback: any) => {
  const myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Authorization", "Bearer " + token);
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: data,
    redirect: "follow",
  };

  try {
    fetch(URLS.BASE_URL + URLS.UPDATE_POST, requestOptions)
      .then((response) => response.text())
      .then((result) => callback({ isSuccess: true, response: result }))
      .catch((error) => callback({ isSuccess: false, response: error }));
  } catch (error) {
    return { isSuccess: false, error: error };
  }
};
export const CreatePost = async (data: any, token: any, callback: any) => {
  const myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Authorization", "Bearer " + token);
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: data,
    redirect: "follow",
  };

  try {
    fetch(URLS.BASE_URL + URLS.CREATE_POST, requestOptions)
      .then((response) => response.text())
      .then((result) => callback({ isSuccess: true, response: result }))
      .catch((error) => callback({ isSuccess: false, response: error }));
  } catch (error) {
    return { isSuccess: false, error: error };
  }
};
export const GetStatus = async (id: any, token: any, callback: any) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    // body: JSON.stringify(data),
  };
  try {
    fetch(URLS.BASE_URL + URLS.GET_STATUS + id, requestOptions)
      .then((response) => response.text())
      .then((result) => callback({ isSuccess: true, response: result }))
      .catch((error) => callback({ isSuccess: false, response: error }));
  } catch (error) {
    return { isSuccess: false, error: error };
  }
};
export const LoadMoreStatus = async (nextUrl: any, token: any, callback: any) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    // body: JSON.stringify(data),
  };
  try {
    fetch(nextUrl, requestOptions)
      .then((response) => response.text())
      .then((result) => callback({ isSuccess: true, response: result }))
      .catch((error) => callback({ isSuccess: false, response: error }));
  } catch (error) {
    return { isSuccess: false, error: error };
  }
};
export const GetFavoriteChannel = async (token: any, callback: any) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    // body: JSON.stringify(data),
  };
  try {
    fetch(URLS.BASE_URL + URLS.GET_FAVORITES_CHANNEL, requestOptions)
      .then((response) => response.text())
      .then((result) => callback({ isSuccess: true, response: result }))
      .catch((error) => callback({ isSuccess: false, response: error }));
  } catch (error) {
    return { isSuccess: false, error: error };
  }
};
export const GetFollowingChannel = async (token: any, callback: any) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    // body: JSON.stringify(data),
  };
  try {
    fetch(URLS.BASE_URL + URLS.GET_FOLLOWING_CHANNEL, requestOptions)
      .then((response) => response.text())
      .then((result) => callback({ isSuccess: true, response: result }))
      .catch((error) => callback({ isSuccess: false, response: error }));
  } catch (error) {
    return { isSuccess: false, error: error };
  }
};
export const DeleteComment = async (data: any, token: any, callback: any) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(data),
  };
  try {
    fetch(URLS.BASE_URL + URLS.DELETE_COMMENT, requestOptions)
      .then((response) => response.text())
      .then((result) => callback({ isSuccess: true, response: result }))
      .catch((error) => callback({ isSuccess: false, response: error }));
  } catch (error) {
    return { isSuccess: false, error: error };
  }
};
export const CreateComment = async (data: any, token: any, callback: any) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(data),
  };
  try {
    fetch(URLS.BASE_URL + URLS.CREATE_COMMENT, requestOptions)
      .then((response) => response.text())
      .then((result) => callback({ isSuccess: true, response: result }))
      .catch((error) => callback({ isSuccess: false, response: error }));
  } catch (error) {
    return { isSuccess: false, error: error };
  }
};
export const GetUserComment = async (data: any, token: any, callback: any) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(data),
  };
  try {
    fetch(URLS.BASE_URL + URLS.GET_USER_COMMENT, requestOptions)
      .then((response) => response.text())
      .then((result) => callback({ isSuccess: true, response: result }))
      .catch((error) => callback({ isSuccess: false, response: error }));
  } catch (error) {
    return { isSuccess: false, error: error };
  }
};

export const UserSignup = async (data: any, callback: any) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  try {
    fetch(getApiUrl(URLS.signup), requestOptions)
      .then((response) => response.text())
      .then((result) => callback({ isSuccess: true, response: result }))
      .catch((error) => callback({ isSuccess: false, response: error }));
  } catch (error) {
    return { isSuccess: false, error: error };
  }

  // fetch(getApiUrl(URLS.signup), requestOptions)
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log("created",data);
  //   })
  //   .catch((error) => {
  //     console.error("createdError",error);
  //   });
};

export const UserLogin = async (data: any, callback: any) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  try {
    fetch(getApiUrl(URLS.LOGIN), requestOptions)
      .then((response) => response.text())
      .then((result) => callback({ isSuccess: true, response: result }))
      .catch((error) => callback({ isSuccess: false, response: error }));
  } catch (error) {
    return { isSuccess: false, error: error };
  }

  // fetch(getApiUrl(URLS.signup), requestOptions)
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log("created",data);
  //   })
  //   .catch((error) => {
  //     console.error("createdError",error);
  //   });
};

export const UserProfileSetup = async (
  data: any,
  token: any,
  callback: any
) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: data,
    redirect: "follow",
  };

  // console.log("FoemDataLocfgin",data)
  // const requestOptions = {
  //   method: 'POST',
  //   headers: {
  //     Accept: 'application/json',
  //     'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001',
  //     Authorization: 'Bearer ' +token,
  //   },
  //   body: data,
  // };

  // console.log("request",requestOptions)
  try {
    fetch(getApiUrl(URLS.PROFILE_SETUP), requestOptions)
      .then((response) => response.text())
      .then((result) => callback({ isSuccess: true, response: result }))
      .catch((error) => callback({ isSuccess: false, response: error }));
  } catch (error) {
    return { isSuccess: false, error: error };
  }

  // fetch(getApiUrl(URLS.signup), requestOptions)
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log("created",data);
  //   })
  //   .catch((error) => {
  //     console.error("createdError",error);
  //   });
};

export const VerifyOtp = async (data: any, callback: any) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  try {
    fetch(getApiUrl(URLS.verifyOtp), requestOptions)
      .then((response) => response.text())
      .then((result) => callback({ isSuccess: true, response: result }))
      .catch((error) => callback({ isSuccess: false, response: error }));
  } catch (error) {
    return { isSuccess: false, error: error };
  }

  // fetch(getApiUrl(URLS.signup), requestOptions)
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log("created",data);
  //   })
  //   .catch((error) => {
  //     console.error("createdError",error);
  //   });
};

export const VerifyResetOtp = async (data: any, callback: any) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  try {
    fetch(getApiUrl(URLS.VERIFY_RESET_OTP), requestOptions)
      .then((response) => response.text())
      .then((result) => callback({ isSuccess: true, response: result }))
      .catch((error) => callback({ isSuccess: false, response: error }));
  } catch (error) {
    return { isSuccess: false, error: error };
  }

  // fetch(getApiUrl(URLS.signup), requestOptions)
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log("created",data);
  //   })
  //   .catch((error) => {
  //     console.error("createdError",error);
  //   });
};

export const ResetPasswordRequest = async (data: any, callback: any) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  try {
    fetch(getApiUrl(URLS.RESET_PASSWORD), requestOptions)
      .then((response) => response.text())
      .then((result) => callback({ isSuccess: true, response: result }))
      .catch((error) => callback({ isSuccess: false, response: error }));
  } catch (error) {
    return { isSuccess: false, error: error };
  }

  // fetch(getApiUrl(URLS.signup), requestOptions)
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log("created",data);
  //   })
  //   .catch((error) => {
  //     console.error("createdError",error);
  //   });
};
export const ForgotPasswordRequest = async (data: any, callback: any) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  try {
    fetch(getApiUrl(URLS.FORGET_PASSWORD), requestOptions)
      .then((response) => response.text())
      .then((result) => callback({ isSuccess: true, response: result }))
      .catch((error) => callback({ isSuccess: false, response: error }));
  } catch (error) {
    return { isSuccess: false, error: error };
  }

  // fetch(getApiUrl(URLS.signup), requestOptions)
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log("created",data);
  //   })
  //   .catch((error) => {
  //     console.error("createdError",error);
  //   });
};

export const ChangeUserPassword = async (
  data: any,
  token: any,
  callback: any
) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  myHeaders.append("Accept", "application/json");
  const requestOptions = {
    method: "POST",
    headers: myHeaders,

    body: data,
  };
  console.log("requestOptions", requestOptions);
  try {
    fetch(getApiUrl(URLS.CHANGE_USER_PASSWORD), requestOptions)
      .then((response) => response.text())
      .then((result) => callback({ isSuccess: true, response: result }))
      .catch((error) => callback({ isSuccess: false, response: error }));
  } catch (error) {
    return { isSuccess: false, error: error };
  }
};

export const ChangeUserEmail = async (data: any, token: any, callback: any) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  myHeaders.append("Accept", "application/json");
  const requestOptions = {
    method: "POST",
    headers: myHeaders,

    body: data,
  };
  console.log("requestOptions", requestOptions);
  try {
    fetch(getApiUrl(URLS.CHANGE_USER_EMAIL), requestOptions)
      .then((response) => response.text())
      .then((result) => callback({ isSuccess: true, response: result }))
      .catch((error) => callback({ isSuccess: false, response: error }));
  } catch (error) {
    return { isSuccess: false, error: error };
  }
};

export const DeleteAccount = async (data: any,token: any, callback: any) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(data),
  };
  console.log("requestOptions", requestOptions);
  try {
    fetch(getApiUrl(URLS.DELETE_ACCOOUNT), requestOptions)
      .then((response) => response.text())
      .then((result) => callback({ isSuccess: true, response: result }))
      .catch((error) => callback({ isSuccess: false, response: error }));
  } catch (error) {
    return { isSuccess: false, error: error };
  }

};

export const GetBlockedUser = async (token: any, callback: any) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
  };
  console.log("requestOptions", requestOptions);
  try {
    fetch(getApiUrl(URLS.GET_BLOCKED_USER), requestOptions)
      .then((response) => response.text())
      .then((result) => callback({ isSuccess: true, response: result }))
      .catch((error) => callback({ isSuccess: false, response: error }));
  } catch (error) {
    return { isSuccess: false, error: error };
  }

  // fetch(getApiUrl(URLS.signup), requestOptions)
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log("created",data);
  //   })
  //   .catch((error) => {
  //     console.error("createdError",error);
  //   });
};
export const GetAuthUser = async (token: any, callback: any) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
  };
  console.log("requestOptions", requestOptions);
  try {
    fetch(getApiUrl(URLS.GET_AUTH), requestOptions)
      .then((response) => response.text())
      .then((result) => callback({ isSuccess: true, response: result }))
      .catch((error) => callback({ isSuccess: false, response: error }));
  } catch (error) {
    return { isSuccess: false, error: error };
  }

  // fetch(getApiUrl(URLS.signup), requestOptions)
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log("created",data);
  //   })
  //   .catch((error) => {
  //     console.error("createdError",error);
  //   });
};
export const Follow = async (data: any, token: any, callback: any) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(data),
  };

  try {
    fetch(getApiUrl(URLS.FOLLOW), requestOptions)
      .then((response) => response.text())
      .then((result) => callback({ isSuccess: true, response: result }))
      .catch((error) => callback({ isSuccess: false, response: error }));
  } catch (error) {
    return { isSuccess: false, error: error };
  }

  // fetch(getApiUrl(URLS.signup), requestOptions)
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log("created",data);
  //   })
  //   .catch((error) => {
  //     console.error("createdError",error);
  //   });
};
export const Favorite = async (data: any, token: any, callback: any) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(data),
  };

  try {
    fetch(getApiUrl(URLS.FAVORITE), requestOptions)
      .then((response) => response.text())
      .then((result) => callback({ isSuccess: true, response: result }))
      .catch((error) => callback({ isSuccess: false, response: error }));
  } catch (error) {
    return { isSuccess: false, error: error };
  }

  // fetch(getApiUrl(URLS.signup), requestOptions)
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log("created",data);
  //   })
  //   .catch((error) => {
  //     console.error("createdError",error);
  //   });
};

export const Blocked = async (data: any, token: any, callback: any) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(data),
  };

  try {
    fetch(getApiUrl(URLS.BLOCKED), requestOptions)
      .then((response) => response.text())
      .then((result) => callback({ isSuccess: true, response: result }))
      .catch((error) => callback({ isSuccess: false, response: error }));
  } catch (error) {
    return { isSuccess: false, error: error };
  }

  // fetch(getApiUrl(URLS.signup), requestOptions)
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log("created",data);
  //   })
  //   .catch((error) => {
  //     console.error("createdError",error);
  //   });
};
export const isFollowing = async (data: any, token: any, callback: any) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(data),
  };

  try {
    fetch(getApiUrl(URLS.ISFOLLOWING), requestOptions)
      .then((response) => response.text())
      .then((result) => callback({ isSuccess: true, response: result }))
      .catch((error) => callback({ isSuccess: false, response: error }));
  } catch (error) {
    return { isSuccess: false, error: error };
  }

  // fetch(getApiUrl(URLS.signup), requestOptions)
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log("created",data);
  //   })
  //   .catch((error) => {
  //     console.error("createdError",error);
  //   });
};

export const getUserDetail = async (data: any, token: any, callback: any) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(data),
  };

  try {
    fetch(getApiUrl(URLS.GET_USER_DETAIL), requestOptions)
      .then((response) => response.text())
      .then((result) => callback({ isSuccess: true, response: result }))
      .catch((error) => callback({ isSuccess: false, response: error }));
  } catch (error) {
    return { isSuccess: false, error: error };
  }

  // fetch(getApiUrl(URLS.signup), requestOptions)
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log("created",data);
  //   })
  //   .catch((error) => {
  //     console.error("createdError",error);
  //   });
};

export const getUserDistance = async (data: any, token: any, callback: any) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(data),
  };

  try {
    fetch(getApiUrl(URLS.GET_USER_DISTANCE), requestOptions)
      .then((response) => response.text())
      .then((result) => callback({ isSuccess: true, response: result }))
      .catch((error) => callback({ isSuccess: false, response: error }));
  } catch (error) {
    return { isSuccess: false, error: error };
  }

  // fetch(getApiUrl(URLS.signup), requestOptions)
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log("created",data);
  //   })
  //   .catch((error) => {
  //     console.error("createdError",error);
  //   });
};
export const GetAllUsers = async (data, token: any, callback: any) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      Accept: "application/json",
    },
    data: data,
  };
  try {
    fetch(getApiUrl(URLS.GET_ALL_USER), requestOptions)
      .then((response) => response.json())
      .then((result) => callback({ isSuccess: true, response: result }))

      .catch((error) => console.log(error));
  } catch (error) {
    return { isSuccess: false, error: error };
  }
};
export const SearchUserName = async (data:any, token: any, callback: any) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  };
  try {
    fetch(getApiUrl(URLS.SEARCH_USER_BY_NAME), requestOptions)
      .then((response) => response.json())
      .then((result) => callback({ isSuccess: true, response: result }))

      .catch((error) => console.log(error));
  } catch (error) {
    return { isSuccess: false, error: error };
  }
};

export const ResendOtp = async (data: any, callback: any) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  try {
    fetch(getApiUrl(URLS.RESEND_OTP), requestOptions)
      .then((response) => response.text())
      .then((result) => callback({ isSuccess: true, response: result }))
      .catch((error) => callback({ isSuccess: false, response: error }));
  } catch (error) {
    return { isSuccess: false, error: error };
  }

  // fetch(getApiUrl(URLS.signup), requestOptions)
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log("created",data);
  //   })
  //   .catch((error) => {
  //     console.error("createdError",error);
  //   });
};
