import { useState } from "react";

export default () => {
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const checkPassword = (password) => {
    let length = password.length;
    if (length == 0) return setPasswordError("Please enter a password");
    if (length < 6)
      return setPasswordError(
        "Please enter a password with at least 6 characters"
      );
    return setPasswordError("");
  };

  const checkEmail = (email) => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.length == 0)
      return setEmailError("Please enter your email address");
    if (reg.test(email) === false)
      return setEmailError("Email adress is not valid");

    return setEmailError("");
  };
  return [checkEmail, checkPassword, emailError, passwordError];
};
