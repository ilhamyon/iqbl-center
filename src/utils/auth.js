import { message } from "antd";

const isBrowser = typeof window !== "undefined"; // Check if running in the browser

export const getToken = () => {
  return isBrowser ? localStorage.getItem("token") : null;
};

export const clearToken = () => {
  isBrowser && localStorage.removeItem("token");
};

export const deauthUser = () => {
	message.loading("Please wait...", 1).then(async () => {
	try {
        clearToken();
        localStorage.removeItem('iqbalCenterToken');
        localStorage.removeItem('iqbalCenterUser');
        localStorage.removeItem('iqbalCenterData');
        window.location.replace('/');
    } catch (error) {
      console.error('Logout failed:', error.message);
    }
	})
}

export const isAuthenticated = () => {
  if (typeof localStorage !== 'undefined') {
    const token = localStorage.getItem("iqbalCenterToken");
    return !!token;
  } else {
    // Handle the case where localStorage is not available
    return false;
  }  
};