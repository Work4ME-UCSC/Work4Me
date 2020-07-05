import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";

import AuthenticationNavigation from "./AuthenticationNavigation";
import EmployerNavigation from "./EmployerNavigation";
import EmployeeNavigation from "./EmployeeNavigation";

const AppNavigation = () => {
  const isAuth = useSelector((state) => !!state.auth.token);
  const user = useSelector((state) => state.auth.userType);

  return (
    <NavigationContainer>
      {isAuth && user === "employee" && <EmployeeNavigation />}
      {isAuth && user === "employer" && <EmployerNavigation />}
      {!isAuth && <AuthenticationNavigation />}
    </NavigationContainer>
  );
};

export default AppNavigation;
