import React from "react";
import styles from "./Button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  loading?: boolean;
}

const buttonVariants = {
  primary:
    "bg-purple-700 text-white hover:bg-purple-600 disabled:bg-purple-300",
  secondary: "bg-green-600 text-white hover:bg-green-500 disabled:bg-green-300",
  danger: "bg-red-600 text-white hover:bg-red-500 disabled:bg-red-300",
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
