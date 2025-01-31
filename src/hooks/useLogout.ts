import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { authService } from "@/services/auth/auth.service";

export const useLogoutUser = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate: logout } = useMutation({
    mutationKey: ["logout"],
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get user profile"] });
      queryClient.setQueryData(["get user profile"], null);
      router.push("/");
    },
  });

  return { logout };
};
