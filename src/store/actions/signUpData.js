export const SET_USER_TYPE = "SET_USER_TYPE";
export const SET_USER_NAME = "SET_USER_NAME";
export const SET_USER_EMAIL = "SET_USER_EMAIL";
export const SET_USER_PASSWORD = "SET_USER_PASSWORD";

export const setUserType = (userType) => {
  return { type: SET_USER_TYPE, userType };
};

export const setUserName = (firstName, lastName) => {
  return { type: SET_USER_NAME, firstName, lastName };
};

export const setUserEmail = (email) => {
  return { type: SET_USER_EMAIL, email };
};

export const setUserPassword = (password) => {
  return { type: SET_USER_PASSWORD, password };
};
