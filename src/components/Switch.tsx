import React, { useState } from 'react';

interface SwitchProps {
  /**
   * Whether the switch is checked
   */
  checked?: boolean;
  
  /**
   * Default checked state (uncontrolled component)
   */
  defaultChecked?: boolean;
  
  /**
   * Disabled state of the switch
   */
  disabled?: boolean;
  
  /**
   * Function called when the switch state changes
   */
  onChange?: (checked: boolean) => void;
  
  /**
   * Size of the switch: 'sm' (small), 'md' (medium), or 'lg' (large)
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * Additional CSS class names
   */
  className?: string;
  
  /**
   * Label for accessibility
   */
  ariaLabel?: string;
}

/**
 * Switch component for toggling between two states
 * 
 * @example
 * ```tsx
 * <Switch checked={isActive} onChange={setIsActive} />
 * <Switch defaultChecked size="lg" />
 * ```
 */
const Switch: React.FC<SwitchProps> = ({
  checked,
  defaultChecked = false,
  disabled = false,
  onChange,
  size = 'md',
  className = '',
  ariaLabel,
}) => {
  // For uncontrolled component usage
  const [internalChecked, setInternalChecked] = useState<boolean>(defaultChecked);
  
  // Determine if component is controlled or uncontrolled
  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : internalChecked;
  
  // Size-based styling
  const sizeClasses = {
    sm: {
      wrapper: 'w-8 h-4',
      thumb: 'w-3 h-3',
      thumbTranslate: 'translate-x-4',
    },
    md: {
      wrapper: 'w-10 h-5',
      thumb: 'w-4 h-4',
      thumbTranslate: 'translate-x-5',
    },
    lg: {
      wrapper: 'w-12 h-6',
      thumb: 'w-5 h-5',
      thumbTranslate: 'translate-x-6',
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
  
  return (
    <label 
      className={`relative inline-flex items-center cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      <input
        type="checkbox"
        className="sr-only"
        checked={isChecked}
        onChange={handleChange}
        disabled={disabled}
        aria-label={ariaLabel}
      />
      <div
        className={`
          ${sizeClasses[size].wrapper}
          ${isChecked ? 'bg-blue-600' : 'bg-gray-200'}
          rounded-full transition-colors duration-200 ease-in-out
        `}
      >
        <div
          className={`
            ${sizeClasses[size].thumb}
            ${isChecked ? sizeClasses[size].thumbTranslate : 'translate-x-0'}
            bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out
          `}
        />
      </div>
    </label>
  );
};

export default Switch;
