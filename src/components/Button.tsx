/**
 * Button component with customizable variants
 * - Simple reusable button with primary/secondary variants
 * - Includes disabled state handling
 * - Uses type-safe props
 */

import React from "react";
import { HTMLAttributeAnchorTarget, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: ButtonVariant;
  className?: string;
  "data-testid"?: string;
}

export function Button({
  children,
  onClick,
  disabled = false,
  variant = "primary",
  className = "",
  "data-testid": testId = "button",
}: ButtonProps) {
  // Base classes for all button variants
  const baseClasses =
    "px-4 py-2 rounded transition-colors focus:outline-none focus:ring-2";

  // Variant-specific classes
  const variantClasses = {
    primary: "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-300",
    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400",
    tertiary: "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400",
    quaternary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400",
    quinary: "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400",
    senary: "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400",
  };

  // Disabled state classes
  const disabledClasses = "opacity-50 cursor-not-allowed";

  // Combine all classes based on props
  const buttonClasses = `
    ${baseClasses} 
    ${variantClasses[variant]} 
    ${disabled ? disabledClasses : ""} 
    ${className}
  `.trim();

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
      data-testid={testId}
    >
      {children}
    </button>
  );
}

export default Button;
