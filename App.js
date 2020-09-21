import "react-native-gesture-handler";
import React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";


import AppNavigation from "./src/navigation/AppNavigation";

import signUpDataReducer from "./src/store/reducers/signUpData";
import authReducer from "./src/store/reducers/auth";
import employeeReducer from "./src/store/reducers/employee";
import employerReducer from "./src/store/reducers/employer";

const rootReducer = combineReducers({
  signUp: signUpDataReducer,
  auth: authReducer,
  employee: employeeReducer,
  employer: employerReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
};

export default App;
