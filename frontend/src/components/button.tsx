import React from "react";
import { FiMail, FiBookmark, FiShare2 } from "react-icons/fi"; // Importing icons from react-icons

interface ButtonProps {
  text?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "icon";
}

const Button: React.FC<ButtonProps> = ({
  text,
  icon,
  onClick,
  variant = "primary",
}) => {
  const baseStyles =
    "flex items-center justify-center px-4 py-2 rounded-lg focus:outline-none transition";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary:
      "bg-white text-gray-800 border border-gray-300 hover:bg-gray-100",
    icon: "bg-white text-gray-800 border border-gray-300 hover:bg-gray-100 w-10 h-10",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]}`} onClick={onClick}>
      {icon && <span className={text ? "mr-2" : ""}>{icon}</span>}
      {text && <span>{text}</span>}
    </button>
  );
};

export default Button;
