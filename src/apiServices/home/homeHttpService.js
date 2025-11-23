/* eslint-disable no-undef */

import { showGlobalAlert } from "../../commonComponents/useGlobalAlert";
import webHttpService from "../webHttpService";

export async function sendOtpSignup(formData) {
  try {
    const { data } = await webHttpService.post(
      `${import.meta.env.VITE_APIENDPOINT}/auth/sendOtpSignup`,
      formData
    );
    console.log(data);

    return data;
  } catch (error) {
    showGlobalAlert(error.message, "error");
  }
}
export async function userLogin(formData) {
  try {
    const { data } = await webHttpService.post(
      `${import.meta.env.VITE_APIENDPOINT}/auth/login`,
      formData
    );
    console.log(data);

    return data;
  } catch (error) {
    showGlobalAlert(error.message, "error");
  }
}
export async function getMyProfile() {
  try {
    const { data } = await webHttpService.get(
      `${import.meta.env.VITE_APIENDPOINT}/user/getMyProfile`
    );
    console.log(data);

    return data;
  } catch (error) {
    showGlobalAlert(error.message, "error");
  }
}

export async function getCategory(formData) {
  try {
    const { data } = await webHttpService.patch(
      `${import.meta.env.VITE_APIENDPOINT}/products/getCategory`,
      formData
    );
    console.log(data);

    return data;
  } catch (error) {
    showGlobalAlert(error.message, "error");
  }
}
export async function verifyOTP(formData) {
  try {
    const { data } = await webHttpService.post(
      `${import.meta.env.VITE_APIENDPOINT}/auth/verifyOtp`,
      formData
    );
    console.log(data);

    return data;
  } catch (error) {
    showGlobalAlert(error.message, "error");
  }
}
