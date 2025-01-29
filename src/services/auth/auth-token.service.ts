import Cookies from "js-cookie";

export const saveTokenStorage = (accessToken: string) => {
  const expires = new Date(Date.now() + 20 * 60 * 1000);

  Cookies.set("Token", accessToken, {
    path: "/",
    sameSite: "strict",
    expires,
    secure: process.env.NODE_ENV === "production",
  });
};

export const removeTokenFromStorage = () => {
  Cookies.remove("Token");
};
