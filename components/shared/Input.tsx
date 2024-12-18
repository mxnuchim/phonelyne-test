"use client";

import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";

interface TextInputProps {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
  inputClassName?: string;
  name?: string;
  error?: string;
  editable?: boolean; // New prop for controlling editability
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  required = false,
  className = "",
  inputClassName = "",
  name = "",
  error,
  editable = true, // Default to true
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  // Determine input type
  const inputType = type === "password" && isPasswordVisible ? "text" : type;

  return (
    <div className={`w-full ${className}`}>
      {/* Label with asterisk if required */}
      <label className="block text-gray700 text-sm font-light mb-2">
        {label}
        {required && <span className="text-red-500 ml-1 text-lg">*</span>}
      </label>

      <div className="relative">
        {/* Input field with controlled value and onChange */}
        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={editable ? onChange : undefined} // Conditionally handle onChange
          required={required}
          name={name}
          readOnly={!editable} // Set readOnly based on editable prop
          className={`w-full h-12 px-3 py-2 text-gray700 text-base rounded-xl outline-none transition-colors duration-200 bg-[#d2d2d235] focus:bg-white ${
            error ? "border border-red-500" : ""
          } ${!editable ? "bg-gray-200" : ""} ${inputClassName}`} // Change background color when readOnly
        />

        {/* Eye icon for password visibility toggle */}
        {type === "password" &&
          editable && ( // Only show the button if editable
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {isPasswordVisible ? (
                <div aria-label="Hide password">
                  <Eye size={16} className="text-gray600" />
                </div>
              ) : (
                <div aria-label="Show password">
                  <EyeOff size={16} className="text-gray600" />
                </div>
              )}
            </button>
          )}
      </div>

      {/* Display error message if exists */}
      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </div>
  );
};

export default TextInput;
