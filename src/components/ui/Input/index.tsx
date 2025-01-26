import React from "react";
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = ({ label, error, ...props }: InputProps) => {
  return (
    <>
      <label>
        {label}
        <input {...props} />
      </label>
      {error && <p className="error-message">{error}</p>}
    </>
  );
};

export default Input;
