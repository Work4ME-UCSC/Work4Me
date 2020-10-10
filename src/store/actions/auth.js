import AsyncStorage from "@react-native-community/async-storage";
import { StreamChat } from "stream-chat";

import workApi from "../../api/workApi";
import url from "../../constants/url";

export const AUTHENTICATE = "AUTHENTICATE";
export const TRY_AUTO_LOGIN = "TRY_AUTO_LOGIN";
export const EMAIL_CHECK = "EMAIL_CHECK";
export const LOGOUT = "LOGOUT";
export const DELETE_ACCOUNT = "DELETE_ACCOUNT";
export const SET_PROFILE_PICTURE = "SET_PROFILE_PICTURE";

export const tryAutoLogin = () => {
  return { type: TRY_AUTO_LOGIN };
};

export const authenticate = (
  token,
  userID,
  firstName,
  lastName,
  userType,
  streamToken
) => {
  return async (dispatch) => {
    try {
      const response = await workApi.get("/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const chatClient = new StreamChat(url.apiKey);

      await chatClient.setUser(
        {
          id: userID,
          name: `${firstName} ${lastName}`,
          image: response.data.avatar,
        },
        streamToken
      );

      dispatch({
        type: AUTHENTICATE,
        token,
        userID,
        firstName,
        lastName,
        userType,
        email: response.data.email,
        profilePic: response.data.avatar,
        isEmailVerified: response.data.isVerified,
        rate: response.data.rate,
        streamToken,
        rateCount: response.data.reviewCount,
        jobCompleted: response.data.jobCompleted,
      });
    } catch (e) {
      if (e.response.status === 404) throw new Error("Netwrok problem");
      if (e.response.data.error === "Please authenticate") {
        AsyncStorage.removeItem("UserData");
        dispatch({ type: LOGOUT });
      }
    }
  };
};

export const signup = (data) => {
  return async (dispatch) => {
    try {
      const response = await workApi.post("/users/signup", data);

      dispatch(
        authenticate(
          response.data.token,
          response.data.user._id,
          response.data.user.firstName,
          response.data.user.lastName,
          response.data.user.userType,
          response.data.streamToken
        )
      );
      saveDataStorage(
        response.data.token,
        response.data.user._id,
        response.data.user.firstName,
        response.data.user.lastName,
        response.data.user.userType,
        response.data.streamToken
      );
    } catch (e) {
      console.log(e);
    }
  };
};

export const login = ({ email, password }) => {
  return async (dispatch) => {
    try {
      const response = await workApi.post("/users/login", { email, password });

      dispatch(
        authenticate(
          response.data.token,
          response.data.user._id,
          response.data.user.firstName,
          response.data.user.lastName,
          response.data.user.userType,
          response.data.streamToken
        )
      );
      saveDataStorage(
        response.data.token,
        response.data.user._id,
        response.data.user.firstName,
        response.data.user.lastName,
        response.data.user.userType,
        response.data.streamToken
      );
    } catch (e) {
      if (e.response.status === 400) {
        throw new Error("Incorrect email or password");
      } else {
        throw new Error("Check your connection");
      }
    }
  };
};

export const emailCheck = ({ email }) => {
  return async (dispatch) => {
    try {
      await workApi.post("/users/email", { email });

      dispatch({ type: EMAIL_CHECK });
    } catch (e) {
      if (e.response.status === 400) {
        throw new Error("Email address already exists");
      } else {
        throw new Error("Check your connection");
      }
    }
  };
};

export const logout = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    try {
      await workApi.post(
        "/users/logout",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      AsyncStorage.removeItem("UserData");
      dispatch({ type: LOGOUT });
    } catch (e) {
      console.log(e);
    }
  };
};

export const deleteAccount = (password) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userType = getState().auth.userType;

    try {
      await workApi.post(
        "/users/verifyPassword",
        { password },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (userType === "employee")
        await workApi.delete("/users/employee/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
      else
        await workApi.delete("/users/employer/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

      AsyncStorage.removeItem("UserData");
      dispatch({ type: DELETE_ACCOUNT });
    } catch (e) {
      if (e.response.status === 400) throw new Error("Incorrect Password");
      console.log(e.response.status);
      throw e;
    }
  };
};

export const uploadProfilePicture = (pictureData) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;

    try {
      const response = await workApi.post(`/users/me/avatar`, pictureData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      dispatch({ type: SET_PROFILE_PICTURE, url: response.data.url });
    } catch (e) {
      if (e.response.data.error === "File too large")
        throw new Error("Image size should be less than 5mb");
      console.log(e.response.data.error);
      throw e;
    }
  };
};

export const deleteProfilePicture = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    await workApi.delete("/users/me/avatar", {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch({ type: SET_PROFILE_PICTURE, url: null });
  };
};

export const saveDataStorage = (
  token,
  userID,
  firstName,
  lastName,
  userType,
  streamToken
) => {
  AsyncStorage.setItem(
    "UserData",
    JSON.stringify({
      token,
      userID,
      firstName,
      lastName,
      userType,
      streamToken,
    })
  );
};
