import "react-native-gesture-handler";
import React, { useState } from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { AppLoading } from "expo";

import AppNavigation from "./src/navigation/AppNavigation";

import signUpDataReducer from "./src/store/reducers/signUpData";
import authReducer from "./src/store/reducers/auth";
import employeeReducer from "./src/store/reducers/employee";
import employerReducer from "./src/store/reducers/employer";
import reviewReducer from "./src/store/reducers/reviews";

const fetchFonts = () => {
  return Font.loadAsync({
    Roboto: require("native-base/Fonts/Roboto.ttf"),
    Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
    ...Ionicons.font,
  });
};

const rootReducer = combineReducers({
  signUp: signUpDataReducer,
  auth: authReducer,
  employee: employeeReducer,
  employer: employerReducer,
  review: reviewReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const App = () => {
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
};

export default App;
