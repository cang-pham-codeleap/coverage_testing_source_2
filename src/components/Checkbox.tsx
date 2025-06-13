import React, { useState } from "react";

interface CheckboxProps {
  /**
   * Whether the checkbox is checked
   */
  checked?: boolean;

  /**
   * Default checked state (for uncontrolled component)
   */
  defaultChecked?: boolean;

  /**
   * Disabled state of the checkbox
   */
  disabled?: boolean;

  /**
   * Function called when the checkbox state changes
   */
  onChange?: (checked: boolean) => void;

  /**
   * Size of the checkbox: 'sm' (small), 'md' (medium), or 'lg' (large)
   */
  size?: "sm" | "md" | "lg";

  /**
   * Label text to display next to the checkbox
   */
  label?: string;

  /**
   * Additional CSS class names
   */
  className?: string;

  /**
   * ID for the checkbox input
   */
  id?: string;

  /**
   * Name attribute for the checkbox input
   */
  name?: string;

  /**
   * Value attribute for the checkbox input
   */
  value?: string;

  /**
   * Required attribute
   */
  required?: boolean;

  /**
   * Indeterminate state (partially checked)
   */
  indeterminate?: boolean;
}

/**
 * Checkbox component for selecting options
 *
 * @example
 * ```tsx
 * <Checkbox label="Accept terms" onChange={handleChange} />
 * <Checkbox checked={isSelected} onChange={setIsSelected} label="Select option" />
 * <Checkbox indeterminate size="lg" label="Some items selected" />
 * ```
 */
const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  defaultChecked = false,
  disabled = false,
  onChange,
  size = "md",
  label,
  className = "",
  id,
  name,
  value,
  required = false,
  indeterminate = false,
}) => {
  // For uncontrolled component usage
  const [internalChecked, setInternalChecked] =
    useState<boolean>(defaultChecked);

  // Determine if component is controlled or uncontrolled
  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : internalChecked;

  const checkboxId = React.useId();

  // Generate unique ID if not provided
  const uniqueId = React.useMemo(() => id || checkboxId, [id]);

  // Size-based styling
  const sizeClasses = {
    sm: {
      checkbox: "w-3 h-3",
      label: "text-sm",
      checkmark: "w-2 h-2",
    },
    md: {
      checkbox: "w-4 h-4",
      label: "text-base",
      checkmark: "w-3 h-3",
    },
    lg: {
      checkbox: "w-5 h-5",
      label: "text-lg",
      checkmark: "w-4 h-4",
    },
  };

  // Handle change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Update internal state for uncontrolled usage
    if (!isControlled) {
      setInternalChecked(e.target.checked);
    }

    // Call external onChange handler if provided
    if (onChange) {
      onChange(e.target.checked);
    }
  };

  // Set indeterminate property using ref
  const checkboxRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <div className={`flex items-center ${className}`}>
      <div className="relative flex items-center">
        <input
          ref={checkboxRef}
          type="checkbox"
          id={uniqueId}
          name={name}
          value={value}
          checked={isChecked}
          onChange={handleChange}
          disabled={disabled}
          required={required}
          className={`
            ${sizeClasses[size].checkbox}
            appearance-none
            border border-gray-300
            rounded
            bg-white
            transition-colors
            duration-200
            cursor-pointer
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            ${isChecked ? "bg-blue-600 border-blue-600" : ""}
            ${indeterminate ? "bg-blue-600 border-blue-600" : ""}
            ${disabled ? "opacity-50 cursor-not-allowed" : ""}
          `}
          aria-checked={indeterminate ? "mixed" : isChecked}
        />
        {/* Custom checkmark */}
        {isChecked && !indeterminate && (
          <div className="absolute pointer-events-none text-white flex items-center justify-center">
            <svg
              className={sizeClasses[size].checkmark}
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 8.5L6.5 11L12 5" />
            </svg>
          </div>
        )}
        {/* Indeterminate state dash */}
        {indeterminate && (
          <div className="absolute pointer-events-none text-white flex items-center justify-center">
            <svg
              className={sizeClasses[size].checkmark}
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 8L12 8" />
            </svg>
          </div>
        )}
      </div>
      {label && (
        <label
          htmlFor={uniqueId}
          className={`ml-2 ${sizeClasses[size].label} ${
            disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default Checkbox;
