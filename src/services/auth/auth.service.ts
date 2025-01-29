import { saveTokenStorage } from "@/services/auth/auth-token.service";
import { axiosPublic } from "@/config/api.config";
import { UserAuthForm, UserAuthResponse } from "@/types/user.type";

class AuthService {
  async loginOrRegister(type: "login" | "register", data: UserAuthForm) {
    const response = await axiosPublic<UserAuthResponse>({
      url: `/auth/${type}`,
      method: "POST",
      data,
    });

    if (response.data.token) {
      saveTokenStorage(response.data.token);
    }

    return response;
  }

  async getNewToken() {
    const response = await axiosPublic<UserAuthResponse>({
      url: `/auth/refresh`,
      method: "GET",
    });

    if (response.data.token) {
      saveTokenStorage(response.data.token);
    }

    return response;
  }
}
export const authService = new AuthService();
