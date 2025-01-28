import Cookies from "js-cookie";

export const saveTokenStorage = (accessToken: string) => {
  Cookies.set("Token", accessToken, {
    path: "/",
    sameSite: "strict",
    expires: 1 / 24,
    secure: process.env.NODE_ENV === "production",
  });
};

export const removeTokenFromStorage = () => {
  Cookies.remove("Token");
};
