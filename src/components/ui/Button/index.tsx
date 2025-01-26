import React from "react";
import styles from "./Button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  loading?: boolean;
}

const buttonVariants = {
  primary: "bg-purple-700 text-white",
  secondary: "bg-secondary text-white",
  danger: "bg-red-600 text-white",
};

const Button = ({
  variant = "primary",
  loading = false,
  children,
  ...props
}: ButtonProps) => {
  const className = `${styles.btn} ${buttonVariants[variant]} ${
    loading ? "loading" : ""
  }`;

  return (
    <button className={className} disabled={loading} {...props}>
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;
