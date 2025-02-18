import React from "react";
import styles from "./Button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "notactive" | "danger";
  size?: "sm" | "lg";
  loading?: boolean;
}

const buttonVariants = {
  primary:
    "bg-purple-700 text-white hover:bg-purple-600 disabled:bg-purple-300",
  secondary: "bg-blue-600 text-white hover:bg-blue-500 disabled:bg-blue-300",
  notactive: "bg-blue-400 hover:bg-blue-500",
  danger: "bg-red-600 text-white hover:bg-red-500 disabled:bg-red-300",
};

const buttonSize = {
  sm: "font-semibold py-1 px-3 text-xs",
  lg: "px-5 py-2.5 text-lg",
};

const Button = ({
  variant = "primary",
  size = "lg",
  loading = false,
  children,
  ...props
}: ButtonProps) => {
  const className = `${styles.btn} ${buttonVariants[variant]} ${
    buttonSize[size]
  } ${loading ? "loading" : ""}`;

  return (
    <button className={className} disabled={loading} {...props}>
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;
