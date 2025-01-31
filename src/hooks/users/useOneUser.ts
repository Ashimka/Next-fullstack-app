import { userService } from "@/services/users/user.servece";
import { useQuery } from "@tanstack/react-query";

export const useGetOneUser = () => {
  const { data: oneUser, isLoading } = useQuery({
    queryKey: ["get user profile"],
    queryFn: () => userService.getOneUser(),
  });

  return { oneUser, isLoading };
};
