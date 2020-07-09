import { LOGIN, SIGNUP, LOGOUT, DELETE_ACCOUNT } from "../actions/auth";

const initialState = {
  token: null,
  userType: "",
  firstName: "",
  lastName: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
    case SIGNUP:
      console.log(action);
      return {
        token: action.token,
        userType: action.userType,
        firstName: action.firstName,
        lastName: action.lastName,
      };

    case LOGOUT:
    case DELETE_ACCOUNT:
      return initialState;
    default:
      return state;
  }
};
