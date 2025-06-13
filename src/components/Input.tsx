import React, { forwardRef } from "react";

/**
 * Props for the Input component
 * @property {string} id - The ID for the input element (required for accessibility)
 * @property {string} [type='text'] - The type of input (text, email, password, etc.)
 * @property {string} [placeholder] - Placeholder text
 * @property {string} [value] - The value of the input
 * @property {string} [defaultValue] - The default value of the input
 * @property {(e: React.ChangeEvent<HTMLInputElement>) => void} [onChange] - Event handler for input changes
 * @property {boolean} [disabled=false] - Whether the input is disabled
 * @property {boolean} [required=false] - Whether the input is required
 * @property {'default' | 'error'} [status='default'] - The visual status of the input
 * @property {string} [errorMessage] - Error message to display when status is 'error'
 * @property {string} [className] - Additional CSS classes
 * @property {React.InputHTMLAttributes<HTMLInputElement>} [props] - Additional HTML attributes
 */
export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  id: string;
  type?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  required?: boolean;
  status?: "default" | "error";
  errorMessage?: string;
  className?: string;
}

/**
 * Input component for form fields
 *
 * @example
 * ```tsx
 * <Input id="email" type="email" placeholder="Enter your email" />
 * <Input
 *   id="password"
 *   type="password"
 *   status="error"
 *   errorMessage="Password must be at least 8 characters"
 * />
 * <Input id="name" defaultValue="John Doe" disabled />
 * ```
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      type = "text",
      placeholder,
      value,
      defaultValue,
      onChange,
      disabled = false,
      required = false,
      status = "default",
      errorMessage,
      className = "",
      ...props
    },
    ref
  ) => {
    // Determine status-specific styles
    const statusClasses = {
      default: "border-gray-300 focus:border-blue-500 focus:ring-blue-500",
      error: "border-red-500 focus:border-red-500 focus:ring-red-500",
    };

    // Create CSS classes based on props
    const inputClasses = [
      "block w-full rounded-md border px-3 py-2 text-sm",
      "shadow-sm placeholder-gray-400",
      "focus:outline-none focus:ring-2",
      disabled ? "bg-gray-100 text-gray-500 cursor-not-allowed" : "bg-white",
      statusClasses[status],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className="w-full">
        <input
          id={id}
          ref={ref}
          type={type}
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          disabled={disabled}
          required={required}
          aria-invalid={status === "error"}
          aria-describedby={status === "error" ? `${id}-error` : undefined}
          className={inputClasses}
          {...props}
        />

        {status === "error" && errorMessage && (
          <p
            id={`${id}-error`}
            className="mt-1 text-sm text-red-500"
            role="alert"
          >
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

// Display name for React DevTools
Input.displayName = "Input";

export default Input;
