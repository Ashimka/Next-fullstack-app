"use client";

import Button from "@/components/ui/Button";
import { useAuthForm } from "@/hooks/useAuth";
import React, { useState } from "react";
import styles from "./Auth.module.css";

const AuthForm = () => {
  const [isReq, setIsReq] = useState(false);
  const { onSubmit, form, isPending, errorAuth } = useAuthForm(isReq);
  const { register, handleSubmit } = form;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.header}>
        <h2>{isReq ? "Регистрация" : "Вход"} </h2>
      </div>
      <div>
        <input
          className="text-black w-full p-1 text-lg"
          type="email"
          id="email"
          placeholder="email"
          {...register("email", { required: "Полуе Email не заполнено" })}
        />
        {form.formState.errors.email && (
          <p>{form.formState.errors.email.message}</p>
        )}
      </div>
      {isReq && (
        <div>
          <input
            className="text-black w-full p-1 text-lg"
            type="text"
            id="text"
            placeholder="name"
            {...register("name", { required: "Полу имя не заполнено" })}
          />
          {form.formState.errors.name && (
            <p>{form.formState.errors.name.message}</p>
          )}
        </div>
      )}

      <div>
        <input
          className="text-black w-full p-1 text-lg"
          type="password"
          id="password"
          placeholder="password"
          {...register("password", { required: "Поле пароль не заполнено" })}
        />
        {form.formState.errors.password && (
          <p>{form.formState.errors.password.message}</p>
        )}
      </div>

      <Button type="submit" variant="primary" loading={isPending}>
        {isPending ? "Loading..." : isReq ? "Зарегистрировать" : "Войти"}
      </Button>

      <div>
        <p>
          {isReq ? "Есть аккаунт " : "Нет аккаунта "}
          <span className={styles.toggle} onClick={() => setIsReq(!isReq)}>
            {isReq ? "вход" : "зарегистрируйтесь"}
          </span>
        </p>
      </div>

      {errorAuth && <p>{errorAuth}</p>}
    </form>
  );
};

export default AuthForm;
