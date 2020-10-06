import workApi from "../api/workApi";

export const sendOtp = async (email) => {
  try {
    const response = await workApi.post("users/otpRequest", { email });
    console.log(response.status);
  } catch (e) {
    console.log(e.response.data.error);
    throw e.response.data.error;
  }
};

export const confirmOtp = async (email, otp) => {
  try {
    const response = await workApi.post("users/otpConfirm", { email, otp });
    console.log(response.status);
  } catch (e) {
    console.log(e.response.data.error);
    throw e.response.data.error;
  }
};

export const resetPassword = async (email, password) => {
  try {
    const response = await workApi.post("users/resetPassword", {
      email,
      password,
    });
    console.log(response.status);
  } catch (e) {
    console.log(e.response.data.error);
    throw e.response.data.error;
  }
};
