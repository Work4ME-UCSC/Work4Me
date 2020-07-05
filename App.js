import React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import ScreenSelect from "./src/screens/ScreenSelect";

import AuthenticationNavigation from "./src/navigation/AuthenticationNavigation";
import EmployeeNavigation from "./src/navigation/EmployeeNavigation";
import EmployerNavigation from "./src/navigation/EmployerNavigation";
import AppNavigation from "./src/navigation/AppNavigation";

import signUpDataReducer from "./src/store/reducers/signUpData";
import authReducer from "./src/store/reducers/auth";

const rootReducer = combineReducers({
  signUp: signUpDataReducer,
  auth: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const Main = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigation />
      {/* <NavigationContainer>
        <Main.Navigator screenOptions={{ headerShown: false }}>
          <Main.Screen name="main" component={ScreenSelect} />
          <Main.Screen name="Sign" component={AuthenticationNavigation} />
          <Main.Screen name="Employee" component={EmployeeNavigation} />
          <Main.Screen name="Employer" component={EmployerNavigation} />
        </Main.Navigator>
      </NavigationContainer> */}
    </Provider>
  );
};

export default App;
