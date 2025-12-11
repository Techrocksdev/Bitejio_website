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

export async function getProduct(formData) {
  try {
    const { data } = await webHttpService.post(
      `${import.meta.env.VITE_APIENDPOINT}/products/getProduct`,
      formData
    );
    console.log(data);

    return data;
  } catch (error) {
    showGlobalAlert(error.message, "error");
  }
}
export async function viewProduct(id) {
  try {
    const { data } = await webHttpService.get(
      `${import.meta.env.VITE_APIENDPOINT}/products/viewProduct/${id}`
    );
    console.log(data);

    return data;
  } catch (error) {
    showGlobalAlert(error.message, "error");
  }
}

export async function addToCart(formData) {
  try {
    const { data } = await webHttpService.post(
      `${import.meta.env.VITE_APIENDPOINT}/products/addToCart`,
      formData
    );
    console.log(data);

    return data;
  } catch (error) {
    showGlobalAlert(error.message, "error");
  }
}

export async function getMyCart() {
  try {
    const { data } = await webHttpService.get(
      `${import.meta.env.VITE_APIENDPOINT}/products/getMyCart`
    );
    console.log(data);

    return data;
  } catch (error) {
    showGlobalAlert(error.message, "error");
  }
}
export async function removeFromCart(formData) {
  try {
    const { data } = await webHttpService.put(
      `${import.meta.env.VITE_APIENDPOINT}/products/removeFromCart`,
      formData
    );
    console.log(data);

    return data;
  } catch (error) {
    showGlobalAlert(error.message, "error");
  }
}
export async function updateCartQuantity(formData) {
  try {
    const { data } = await webHttpService.put(
      `${import.meta.env.VITE_APIENDPOINT}/products/updateCartQuantity`,
      formData
    );
    console.log(data);

    return data;
  } catch (error) {
    showGlobalAlert(error.message, "error");
  }
}
export async function editProfile(formData) {
  try {
    const { data } = await webHttpService.post(
      `${import.meta.env.VITE_APIENDPOINT}/user/editProfile`,
      formData
    );
    console.log(data);

    return data;
  } catch (error) {
    showGlobalAlert(error.message, "error");
  }
}
export async function getMyAddresses(formData) {
  try {
    const { data } = await webHttpService.patch(
      `${import.meta.env.VITE_APIENDPOINT}/user/getMyAddresses`,
      formData
    );
    console.log(data);

    return data;
  } catch (error) {
    showGlobalAlert(error.message, "error");
  }
}

export async function addAddress(formData) {
  try {
    const { data } = await webHttpService.post(
      `${import.meta.env.VITE_APIENDPOINT}/user/addAddress`,
      formData
    );
    console.log(data);

    return data;
  } catch (error) {
    showGlobalAlert(error.message, "error");
  }
}

export async function getMySearchHistory(formData) {
  try {
    const { data } = await webHttpService.patch(
      `${import.meta.env.VITE_APIENDPOINT}/user/getMySearchHistory`,
      formData
    );
    console.log(data);

    return data;
  } catch (error) {
    showGlobalAlert(error.message, "error");
  }
}
export async function searchLocation(formData) {
  try {
    const { data } = await webHttpService.post(
      `${import.meta.env.VITE_APIENDPOINT}/user/searchLocation`,
      formData
    );
    console.log(data);

    return data;
  } catch (error) {
    showGlobalAlert(error.message, "error");
  }
}

export async function updateAddress(formData) {
  try {
    const { data } = await webHttpService.put(
      `${import.meta.env.VITE_APIENDPOINT}/user/updateAddress`,
      formData
    );
    console.log(data);

    return data;
  } catch (error) {
    showGlobalAlert(error.message, "error");
  }
}
export async function deleteAddress(id) {
  try {
    const { data } = await webHttpService.delete(
      `${import.meta.env.VITE_APIENDPOINT}/user/deleteAddress/${id}`
    );
    console.log(data);

    return data;
  } catch (error) {
    showGlobalAlert(error.message, "error");
  }
}
export async function changeDefaultAddress(id) {
  try {
    const { data } = await webHttpService.get(
      `${import.meta.env.VITE_APIENDPOINT}/user/changeDefaultAddress/${id}`
    );
    console.log(data);

    return data;
  } catch (error) {
    showGlobalAlert(error.message, "error");
  }
}

export async function createOrder(formData) {
  try {
    const { data } = await webHttpService.post(
      `${import.meta.env.VITE_APIENDPOINT}/products/createOrder`,
      formData
    );
    console.log(data);

    return data;
  } catch (error) {
    showGlobalAlert(error.message, "error");
  }
}
