import React from "react";

/**
 * Props for the Text component
 * @property {React.ReactNode} children - The content to be displayed
 * @property {React.ElementType} [as='p'] - The HTML element to render as
 * @property {'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl'} [size='base'] - Text size
 * @property {'normal' | 'medium' | 'semibold' | 'bold'} [weight='normal'] - Font weight
 * @property {'default' | 'muted' | 'error' | 'success'} [variant='default'] - Text color variant
 * @property {string} [className] - Additional CSS classes
 * @property {boolean} [truncate=false] - Whether to truncate text with ellipsis
 */
export interface TextProps {
  children: React.ReactNode;
  as?: React.ElementType;
  size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl";
  weight?: "normal" | "medium" | "semibold" | "bold";
  variant?: "default" | "muted" | "error" | "success";
  className?: string;
  truncate?: boolean;
  [key: string]: any; // For additional HTML attributes
}

/**
 * Text component for displaying content with various styles
 *
 * @example
 * ```tsx
 * <Text>Default paragraph text</Text>
 * <Text as="h1" size="2xl" weight="bold">Heading</Text>
 * <Text variant="muted" size="sm">Small muted text</Text>
 * <Text variant="error">Error message</Text>
 * <Text truncate>This is a very long text that will be truncated...</Text>
 * ```
 */
export const Text: React.FC<TextProps> = ({
  children,
  as: Component = "p",
  size = "base",
  weight = "normal",
  variant = "default",
  className = "",
  truncate = false,
  ...props
}) => {
  // Size classes
  const sizeClasses = {
    xs: "text-xs",
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
  };

  // Weight classes
  const weightClasses = {
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
  };

  // Variant (color) classes
  const variantClasses = {
    default: "text-gray-900",
    muted: "text-gray-500",
    error: "text-red-600",
    success: "text-green-600",
  };

  // Create CSS classes based on props
  const classes = [
    sizeClasses[size],
    weightClasses[weight],
    variantClasses[variant],
    truncate ? "truncate" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
};

export default Text;
