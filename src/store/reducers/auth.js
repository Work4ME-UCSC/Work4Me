import {
  LOGOUT,
  DELETE_ACCOUNT,
  AUTHENTICATE,
  TRY_AUTO_LOGIN,
  SET_PROFILE_PICTURE,
} from "../actions/auth";

const initialState = {
  token: null,
  userID: null,
  userType: "",
  firstName: "",
  lastName: "",
  email: "",
  profilePic: null,
  tryAutoLogin: false,
  isEmailVerified: false,
  rate: 0,
  streamToken: null,
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
        email: action.email,
        profilePic: action.profilePic,
        isEmailVerified: action.isEmailVerified,
        rate: action.rate,
        streamToken: action.streamToken,
      };

    case SET_PROFILE_PICTURE:
      return {
        ...state,
        profilePic: action.url,
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
