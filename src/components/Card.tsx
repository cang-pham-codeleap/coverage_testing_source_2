import React from "react";

/**
 * Props for the Card component
 * @property {React.ReactNode} children - The content to be displayed within the card
 * @property {string} [className] - Additional CSS classes
 * @property {string} [title] - Optional card title
 * @property {React.ReactNode} [footer] - Optional footer content
 * @property {'default' | 'bordered' | 'elevated'} [variant='default'] - Visual style of the card
 * @property {'none' | 'sm' | 'md' | 'lg'} [padding='md'] - Padding size inside the card
 * @property {boolean} [noDivider=false] - Whether to hide the divider between title, content, and footer
 */
export interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  footer?: React.ReactNode;
  variant?: "default" | "bordered" | "elevated";
  padding?: "none" | "sm" | "md" | "lg";
  noDivider?: boolean;
  [key: string]: any; // For additional HTML attributes
}

/**
 * Card component for displaying content in a contained box
 *
 * @example
 * ```tsx
 * <Card>Basic card content</Card>
 *
 * <Card
 *   title="Card Title"
 *   variant="elevated"
 *   footer={<Button>Action</Button>}
 * >
 *   Card with title and footer
 * </Card>
 *
 * <Card padding="lg" variant="bordered">
 *   Card with large padding and border
 * </Card>
 * ```
 */
export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  title,
  footer,
  variant = "default",
  padding = "md",
  noDivider = false,
  ...props
}) => {
  // Variant classes
  const variantClasses = {
    default: "bg-white",
    bordered: "bg-white border border-gray-200",
    elevated: "bg-white shadow-md",
  };

  // Padding classes
  const paddingClasses = {
    none: "p-0",
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
  };

  // Title and footer padding - smaller padding on the sides when content has none
  const headerFooterPadding =
    padding === "none"
      ? "px-4 py-3"
      : `py-3 ${paddingClasses[padding].replace("p-", "px-")}`;

  // Create CSS classes based on props
  const cardClasses = [
    "rounded-lg overflow-hidden",
    variantClasses[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // Content classes
  const contentClasses = paddingClasses[padding];

  // Divider class
  const dividerClass = "border-t border-gray-200";

  return (
    <div className={cardClasses} {...props}>
      {title && (
        <div className={`${headerFooterPadding} font-medium`}>{title}</div>
      )}

      {title && !noDivider && <div className={dividerClass} />}

      <div className={contentClasses}>{children}</div>

      {footer && !noDivider && <div className={dividerClass} />}

      {footer && <div className={headerFooterPadding}>{footer}</div>}
    </div>
  );
};

export default Card;
