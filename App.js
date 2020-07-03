import React from "react";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import ScreenSelect from "./src/screens/ScreenSelect";

import AuthenticationNavigation from "./src/navigation/AuthenticationNavigation";
import EmployeeNavigation from "./src/navigation/EmployeeNavigation";
import EmployerNavigation from "./src/navigation/EmployerNavigation";

import signUpDataReducer from "./src/store/reducers/signUpData";

const rootReducer = combineReducers({
  signUp: signUpDataReducer,
});

const store = createStore(rootReducer);

const Main = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Main.Navigator screenOptions={{ headerShown: false }}>
          <Main.Screen name="main" component={ScreenSelect} />
          <Main.Screen name="Sign" component={AuthenticationNavigation} />
          <Main.Screen name="Employee" component={EmployeeNavigation} />
          <Main.Screen name="Employer" component={EmployerNavigation} />
        </Main.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
