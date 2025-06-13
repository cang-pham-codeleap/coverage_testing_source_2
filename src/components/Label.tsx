import React from "react";

/**
 * Props for the Label component
 * @property {string} htmlFor - The ID of the form element this label is associated with
 * @property {React.ReactNode} children - The content to be displayed within the label
 * @property {string} [className] - Additional CSS classes to apply to the label
 * @property {'default' | 'error' | 'required'} [variant='default'] - The visual style of the label
 * @property {boolean} [srOnly=false] - Whether the label should be visible only to screen readers
 * @property {React.HTMLAttributes<HTMLLabelElement>} [props] - Additional HTML attributes to apply to the label
 */
export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "error" | "required";
  srOnly?: boolean;
}

/**
 * Label component for form elements
 *
 * @example
 * ```tsx
 * <Label htmlFor="email">Email Address</Label>
 * <Label htmlFor="password" variant="required">Password</Label>
 * <Label htmlFor="terms" srOnly>Accept Terms and Conditions</Label>
 * ```
 */
export const Label: React.FC<LabelProps> = ({
  htmlFor,
  children,
  className = "",
  variant = "default",
  srOnly = false,
  ...props
}) => {
  // Determine variant-specific styles
  const variantClasses = {
    default: "text-gray-700",
    error: "text-red-500",
    required:
      'text-gray-700 after:content-["*"] after:ml-0.5 after:text-red-500',
  };

  // Create CSS classes based on props
  const classes = [
    "text-sm font-medium",
    variantClasses[variant],
    srOnly ? "sr-only" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <label htmlFor={htmlFor} className={classes} {...props}>
      {children}
    </label>
  );
};

export default Label;
