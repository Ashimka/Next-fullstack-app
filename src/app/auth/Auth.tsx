import React from "react";
import AuthForm from "./AuthForm";

import styles from "./Auth.module.css";

const Auth = () => {
  return (
    <>
      <div className={styles.wrapper}>
        <AuthForm />
      </div>
    </>
  );
};

export default Auth;
