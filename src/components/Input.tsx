import React from 'react';
import { Eye, EyeOff, User, Lock } from 'lucide-react';

interface InputProps {
  type: 'text' | 'password';
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  icon?: 'user' | 'lock';
  error?: string;
  showPasswordToggle?: boolean;
}

const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  value,
  onChange,
  icon,
  error,
  showPasswordToggle = false
}) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);

  const inputType = type === 'password' && showPassword ? 'text' : type;

  const IconComponent = icon === 'user' ? User : Lock;

  return (
    <div className="mb-4">
      <div className={`relative transition-all duration-200 ${
        error ? 'transform scale-[1.02]' : ''
      }`}>
        <div className={`relative flex items-center border-2 rounded-xl transition-all duration-200 shadow-sm ${
          error 
            ? 'border-red-400 bg-red-50' 
            : isFocused 
              ? 'border-blue-400 bg-white' 
              : 'border-gray-200 bg-white hover:border-gray-300'
        }`}>
          {icon && (
            <IconComponent className={`ml-4 w-5 h-5 transition-colors duration-200 ${
              error 
                ? 'text-red-400' 
                : isFocused 
                  ? 'text-blue-500' 
                  : 'text-gray-400'
            }`} />
          )}
          <input
            type={inputType}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={`w-full py-3 px-4 ${icon ? 'pl-2' : 'pl-4'} pr-12 bg-transparent border-none outline-none text-black placeholder-gray-400`}
          />
          {showPasswordToggle && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={`mr-4 p-1 rounded-md transition-colors duration-200 ${
                isFocused ? 'text-blue-500 hover:bg-blue-100' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
              }`}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          )}
        </div>
        {error && (
          <div className="mt-2 text-sm text-red-500 flex items-center animate-in slide-in-from-left-1 duration-200">
            <div className="w-1 h-1 bg-red-500 rounded-full mr-2"></div>
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;