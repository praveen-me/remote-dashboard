import Link from "next/link";
import React from "react";

// Define the props for the Button component, using conditional types
interface BaseButtonProps {
  text?: string;
  startIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "tertiary" | "icon";
  raw?: boolean;
}

interface LinkButtonProps extends BaseButtonProps {
  asLink: true;
  href: string;
}

interface NonLinkButtonProps extends BaseButtonProps {
  asLink?: false;
  href?: never;
}

type ButtonProps = LinkButtonProps | NonLinkButtonProps;

const Button: React.FC<ButtonProps> = ({
  text,
  startIcon,
  onClick,
  variant = "primary",
  asLink,
  href,
  rightIcon,
  raw,
}) => {
  const baseStyles =
    "flex items-center justify-center px-4 py-2 rounded-lg focus:outline-none transition";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary:
      "bg-white text-gray-800 border border-gray-300 hover:bg-gray-100",
    tertiary:
      "bg-gray-50 text-gray-800 border border-gray-300 hover:bg-gray-100 font-bold",
    icon: "bg-white text-gray-800 border border-gray-300 hover:bg-gray-100 w-10 h-10",
  };

  const rawStyles = raw ? `bg-transparent border-0` : "";

  const rawTextStyles = raw ? `text-black font-bold` : "";

  const Wrapper = ({ children }: { children: React.ReactNode }) =>
    asLink ? (
      <Link
        href={href!}
        className={`${baseStyles} ${variants[variant]} ${rawStyles}`}
      >
        {children}
      </Link>
    ) : (
      <button
        className={`${baseStyles} ${variants[variant]} ${rawStyles}`}
        onClick={onClick}
      >
        {children}
      </button>
    );

  return (
    <Wrapper>
      {startIcon && <span className={text ? "mr-2" : ""}>{startIcon}</span>}
      {text && <span className={`${rawTextStyles}`}>{text}</span>}
      {rightIcon && <span className={text ? "ml-2" : ""}>{rightIcon}</span>}
    </Wrapper>
  );
};

export default Button;
