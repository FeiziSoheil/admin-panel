import React from "react";

const Button = ({
  children,
  type = "button",
  variant = "primary",
  className = "",
  disabled = false,
  onClick,
  icon,
}) => {
  const baseStyles =
    "flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200";

  const variants = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white disabled:bg-blue-300",
    secondary:
      "bg-gray-100 hover:bg-gray-200 text-gray-700 disabled:bg-gray-50 disabled:text-gray-400",
    outline: "border-2 border-blue-500 text-blue-500 hover:bg-blue-50",
    darkModePrimary: "bg-[#00D7A3] text-white hover:opacity-90",
    darkModeWarning: "bg-[#FFD700] text-[#1E1E2E] hover:opacity-90",
    darkModeError: "bg-[#FF5E5E] text-white hover:opacity-90",
    lightModeInfo: "bg-blue-200 text-blue-600 hover:opacity-90",
    lightModeError: "bg-red-200 text-red-600 hover:opacity-90",
    lightModeWarning: "bg-orange-100 text-orange-400 hover:opacity-90",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {icon && <span className="w-5 h-5">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
