import {
  SET_USER_NAME,
  SET_USER_EMAIL,
  SET_USER_PASSWORD,
  SET_USER_TYPE,
} from "../actions/signUpData";

const initialState = {};

const signUpDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_TYPE:
      return {
        ...state,
        userType: action.userType,
      };

    case SET_USER_NAME:
      return {
        ...state,
        firstName: action.firstName,
        lastName: action.lastName,
      };

    case SET_USER_EMAIL:
      return {
        ...state,
        email: action.email,
      };

    case SET_USER_PASSWORD:
      return {
        ...state,
        password: action.password,
      };

    default:
      return state;
  }
};

export default signUpDataReducer;
