import AsyncStorage from "@react-native-community/async-storage";

import workApi from "../../api/workApi";

export const AUTHENTICATE = "AUTHENTICATE";
export const TRY_AUTO_LOGIN = "TRY_AUTO_LOGIN";
export const EMAIL_CHECK = "EMAIL_CHECK";
export const LOGOUT = "LOGOUT";
export const DELETE_ACCOUNT = "DELETE_ACCOUNT";

export const tryAutoLogin = () => {
  return { type: TRY_AUTO_LOGIN };
};

export const authenticate = (token, userID, firstName, lastName, userType) => {
  return { type: AUTHENTICATE, token, userID, firstName, lastName, userType };
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
          response.data.user.userType
        )
      );
      saveDataStorage(
        response.data.token,
        response.data.user._id,
        response.data.user.firstName,
        response.data.user.lastName,
        response.data.user.userType
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
      console.log(response.data);
      dispatch(
        authenticate(
          response.data.token,
          response.data.user._id,
          response.data.user.firstName,
          response.data.user.lastName,
          response.data.user.userType
        )
      );
      saveDataStorage(
        response.data.token,
        response.data.user._id,
        response.data.user.firstName,
        response.data.user.lastName,
        response.data.user.userType
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
      const response = await workApi.post("/users/email", { email });
      console.log(response.data);
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
      const response = await workApi.post(
        "/users/logout",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response);
      AsyncStorage.removeItem("UserData");
      dispatch({ type: LOGOUT });
    } catch (e) {
      console.log(e);
    }
  };
};

export const deleteAccount = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    try {
      const response = await workApi.delete("/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response);
      AsyncStorage.removeItem("UserData");
      dispatch({ type: DELETE_ACCOUNT });
    } catch (e) {
      console.log(e);
      throw e;
    }
  };
};

export const saveDataStorage = (
  token,
  userID,
  firstName,
  lastName,
  userType
) => {
  AsyncStorage.setItem(
    "UserData",
    JSON.stringify({
      token,
      userID,
      firstName,
      lastName,
      userType,
    })
  );
};
