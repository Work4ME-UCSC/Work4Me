import workApi from "../../api/workApi";

export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";
export const EMAIL_CHECK = "EMAIL_CHECK";
export const LOGOUT = "LOGOUT";
export const DELETE_ACCOUNT = "DELETE_ACCOUNT";

export const signup = (data) => {
  return async (dispatch) => {
    try {
      const response = await workApi.post("/users/signup", data);
      console.log(response.data);
      dispatch({
        type: SIGNUP,
        token: response.data.token,
        userType: response.data.user.userType,
        firstName: response.data.user.firstName,
        lastName: response.data.user.lastName,
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const login = ({ email, password }) => {
  return async (dispatch) => {
    try {
      const response = await workApi.post("/users/login", { email, password });
      //console.log(response.data.user);
      dispatch({
        type: LOGIN,
        token: response.data.token,
        userType: response.data.user.userType,
        firstName: response.data.user.firstName,
        lastName: response.data.user.lastName,
      });
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
      dispatch({ type: DELETE_ACCOUNT });
    } catch (e) {
      console.log(e);
    }
  };
};
