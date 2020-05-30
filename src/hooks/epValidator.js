import { useState } from "react";

export default () => {
  const [emailError, setEmailError] = useState("initial");
  const [passwordError, setPasswordError] = useState("initial");

  const checkPassword = (password) => {
    let length = password.length;
    if (length == 0) {
      setPasswordError("Please enter a password");
      return passwordError;
    }
    if (length < 8) {
      setPasswordError("Please enter a password with at least 8 characters");
      return passwordError;
    }
    return setPasswordError("");
  };

  const checkEmail = (email) => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.length == 0)
      return setEmailError("Please enter your email address");
    if (!reg.test(email)) return setEmailError("Email adress is not valid");

    return setEmailError("");
  };
  return { checkEmail, checkPassword, emailError, passwordError };
};
