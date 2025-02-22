"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { authService } from "@/services/auth/auth.service";

import { UserAuthForm } from "@/types/user.type";

export function useAuthForm(isReq: boolean) {
  const [errorAuth, setErrAuth] = useState("");
  const router = useRouter();

  const form = useForm<UserAuthForm>({
    mode: "onChange",
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["auth user"],
    mutationFn: (data: UserAuthForm) =>
      authService.loginOrRegister(isReq ? "register" : "login", data),
    onSuccess() {
      router.push("/profile");
      form.reset();
    },
    onError(error: Error | AxiosError) {
      if (error instanceof AxiosError) {
        setErrAuth(error.response?.data.error);
      } else {
        setErrAuth(error.message);
      }
    },
  });

  const onSubmit: SubmitHandler<UserAuthForm> = (data) => {
    mutate(data);
  };

  return { onSubmit, form, isPending, errorAuth };
}
