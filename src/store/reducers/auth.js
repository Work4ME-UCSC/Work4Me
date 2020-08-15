import {
  LOGOUT,
  DELETE_ACCOUNT,
  AUTHENTICATE,
  TRY_AUTO_LOGIN,
} from "../actions/auth";

const initialState = {
  token: null,
  userID: null,
  userType: "",
  firstName: "",
  lastName: "",
  tryAutoLogin: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        userID: action.userID,
        userType: action.userType,
        firstName: action.firstName,
        lastName: action.lastName,
      };

    case TRY_AUTO_LOGIN:
      return {
        ...state,
        tryAutoLogin: true,
      };

    case LOGOUT:
    case DELETE_ACCOUNT:
      return {
        ...initialState,
        tryAutoLogin: true,
      };
    default:
      return state;
  }
};
