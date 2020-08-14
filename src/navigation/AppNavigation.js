import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";

import StartUpScreen from "../screens/StartUpScreen";
import AuthenticationNavigation from "./AuthenticationNavigation";
import EmployerNavigation from "./EmployerNavigation";
import EmployeeNavigation from "./Employee/MainNavigation";

const AppNavigation = () => {
  const isAuth = useSelector((state) => !!state.auth.token);
  const user = useSelector((state) => state.auth.userType);
  const tryAutoLogin = useSelector((state) => state.auth.tryAutoLogin);

  return (
    <NavigationContainer>
      {isAuth && user === "employee" && <EmployeeNavigation />}
      {isAuth && user === "employer" && <EmployerNavigation />}
      {!isAuth && tryAutoLogin && <AuthenticationNavigation />}
      {!isAuth && !tryAutoLogin && <StartUpScreen />}
    </NavigationContainer>
  );
};

export default AppNavigation;
