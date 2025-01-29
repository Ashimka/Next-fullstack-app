import { axiosWithAuth } from "@/config/api.config";
import { UserType } from "@/types/user.type";

class UserService {
  async getOneUser() {
    const { data } = await axiosWithAuth<UserType>({
      url: "/users/profile",
      method: "GET",
    });
    return data;
  }
}
export const userService = new UserService();
