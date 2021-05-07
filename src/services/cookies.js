import cookie from "react-cookies";

export const loadAccessToken = () => {
  return cookie.load("accessToken");
};

export const saveAccessToken = (token) => {
  cookie.save("accessToken", token, { path: "/" });
};

export const removeAccessToken = () => {
  cookie.remove("accessToken");
};