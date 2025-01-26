import { axiosPublic } from "@/config/api.config";
import { UserAuthForm } from "@/types/user.type";

class AuthService {
  async loginOrRegister(type: "login" | "register", data: UserAuthForm) {
    const response = await axiosPublic({
      url: `/auth/${type}`,
      method: "POST",
      data,
    });

    return response;
  }
}
export const authService = new AuthService();
