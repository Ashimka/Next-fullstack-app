"use client";

import { useState } from "react";
import { useAuthForm } from "@/hooks/useAuth";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

import styles from "./Auth.module.css";
import Social from "./Social";

const AuthForm = () => {
  const [isReq, setIsReq] = useState(false);
  const { onSubmit, form, isPending, errorAuth } = useAuthForm(isReq);
  const { register, watch, handleSubmit } = form;

  const watchFields = watch(["email", "name", "password"]);
  const isDisabled = !watchFields[0] || !watchFields[2];
  const isDisabledReg = !watchFields[0] || !watchFields[1] || !watchFields[2];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.header}>
        <h2>{isReq ? "Регистрация" : "Вход"} </h2>
      </div>
      <>
        <Input
          className="text-black w-full p-1 text-lg"
          type="email"
          id="email"
          placeholder="email"
          {...register("email", { required: "Поле Email не заполнено" })}
        />
        {form.formState.errors.email && (
          <p>{form.formState.errors.email.message}</p>
        )}
      </>
      {isReq && (
        <>
          <Input
            className="text-black w-full p-1 text-lg"
            type="text"
            id="text"
            placeholder="name"
            {...register("name", { required: "Полу имя не заполнено" })}
          />
          {form.formState.errors.name && (
            <p>{form.formState.errors.name.message}</p>
          )}
        </>
      )}

      <>
        <Input
          className="text-black w-full p-1 text-lg"
          type="password"
          id="password"
          placeholder="password"
          {...register("password", { required: "Поле пароль не заполнено" })}
        />
        {form.formState.errors.password && (
          <p>{form.formState.errors.password.message}</p>
        )}
      </>

      <Button
        type="submit"
        variant="primary"
        loading={isPending}
        disabled={isReq ? isDisabledReg : isDisabled}
      >
        {isPending ? "Loading..." : isReq ? "Регистрация" : "Войти"}
      </Button>

      <>
        <div className={styles.social_auth}>
          <div className={styles.social_header}>
            {isReq ? "Регистрация через" : "Вход через"}
          </div>
          <Social />
        </div>
      </>

      <>
        <p className={styles.footer}>
          {isReq ? "Есть аккаунт " : "Нет аккаунта "}
          <span
            className={styles.toggle}
            onClick={() => {
              setIsReq(!isReq);
              form.reset();
            }}
          >
            {isReq ? "Вход" : "Регистрация"}
          </span>
        </p>
      </>

      {errorAuth && <p className={styles.error}>{errorAuth}</p>}
    </form>
  );
};

export default AuthForm;
