import React, { useState, useRef, useEffect, useContext } from 'react';
import { FaCheck, FaChevronDown } from 'react-icons/fa';
import { ThemeContext } from '../../Context/ThemeContext';

const CustomSelect = ({
  value,
  onChange,
  options = [],
  placeholder = "انتخاب کنید",
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);
  const { isDark } = useContext(ThemeContext);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value);

  const handleSelect = (option) => {
    onChange(option.value);
    setIsOpen(false);
  };

  return (
    <div ref={selectRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full h-12 px-4 py-2 text-right border rounded-lg
          flex items-center justify-between gap-2
          font-inter transition-all duration-200
          ${isDark 
            ? 'bg-[#252436] border-borderDark hover:bg-[#6A5ACD]' 
            : 'bg-white hover:bg-blue-50'
          }
          focus:outline-none focus:ring-1 focus:ring-blue-300
          ${className}
        `}
      >
        <span className={`truncate ${!selectedOption ? 'text-gray-400' : ''}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <FaChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div 
          className={`
            absolute z-50 w-max mt-1 border rounded-lg shadow-lg max-h-60 overflow-auto
            ${isDark ? 'bg-cardDark' : 'bg-white'}
          `}
        >
          <div className="py-1">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelect(option)}
                className={`
                  w-full px-4 py-2 text-right flex items-center justify-between
                  transition-colors duration-150
                  ${isDark 
                    ? `${value === option.value 
                        ? 'bg-[#6A5ACD] text-white' 
                        : 'hover:bg-[#6A5ACD] hover:bg-opacity-50'
                      }`
                    : `${value === option.value 
                        ? 'bg-blue-50 text-blue-600' 
                        : 'hover:bg-blue-50'
                      }`
                  }
                `}
              >
                <span className="font-inter">{option.label}</span>
                {value === option.value && (
                  <FaCheck className="w-4 h-4" />
                )}
              </button>
            ))}
            {options.length === 0 && (
              <div className="px-4 py-2 text-gray-500 text-center">
                گزینه‌ای موجود نیست
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;