import { userService } from "@/services/users/user.servece";
import { useQuery } from "@tanstack/react-query";

export const useGetOneUser = () => {
  const { data: oneUser, isLoading } = useQuery({
    queryKey: ["get one user"],
    queryFn: () => userService.getOneUser(),
  });

  return { oneUser, isLoading };
};
