import React, { useState, useRef } from "react";
import { useContext } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { ThemeContext } from "../../Context/ThemeContext";

const Input = ({ 
  type, 
  value, 
  label, 
  onChange, 
  icon, 
  className, 
  accept, 
  rows = 4,
  maxLen,
  options = [] // برای select گزینه‌ها رو دریافت می‌کنیم
}) => {
  const [isFocus, setIsFocus] = useState(false);
  const [fileName, setFileName] = useState("");
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const fileInputRef = useRef(null);
  const selectRef = useRef(null);
  const {isDark} = useContext(ThemeContext)

  const handleFocus = () => {
    setIsFocus(true);
  };

  const handleBlur = () => {
    setIsFocus(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    }
    onChange(e);
  };

  const handleClick = () => {
    if (type === "file" && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };


  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsSelectOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelectOption = (optionValue) => {
    onChange({ target: { value: optionValue } });
    setIsSelectOpen(false);
  };

  const renderInput = () => {
    if (type === "select") {
      return (
        <div ref={selectRef} className="relative w-full">
          <div
            className="h-full w-full flex items-center justify-between cursor-pointer"
            onClick={() => setIsSelectOpen(!isSelectOpen)}
          >
            <span className={`font-inter px-2  ${isDark?'text-white':'text-gray-700'}`}>
              {value || ""}
            </span>
            <IoIosArrowDown className={`text-gray-400 transition-transform duration-300 
              ${isSelectOpen ? 'rotate-180' : ''}`} 
            />
          </div>
          
          {isSelectOpen && (
            <div className={`${isDark?'bg-[#252436] border-[#3d3d50]':'bg-white '} absolute top-full left-0 right-0 mt-1  border rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto`}>
              {options.map((option, index) => (
                <div
                  key={index}
                  className={`
                    ${isDark 
                      ? value === option.value
                        ? 'bg-[#6A5ACD] text-white'
                        : 'text-white hover:bg-[#6A5ACD] hover:bg-opacity-50'
                      : value === option.value
                        ? 'bg-blue-50 text-blue-600'
                        : 'hover:bg-blue-50'
                    }
                    px-4 py-2  cursor-pointer font-inter`}
                  onClick={() => handleSelectOption(option.value)}
                >
                  {option.label}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    if (type === "file") {
      return (
        <>
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleFileChange}
            className="hidden"
          />
          <div className={`${isDark?'bg-[#252436] text-white':'bg-white'} h-full w-full flex items-center pl-2 font-inter text-gray-500 ${className}`}>
            {fileName || "Upload your image"}
          </div>
        </>
      );
    }

    if (type === "textarea") {
      return (
        <textarea
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={onChange}
          value={value}
          rows={rows}
          maxLength={maxLen}
          className={`${isDark?'bg-[#252436] text-white':'bg-white'} w-full outline-none pl-2 py-2 font-inter resize-none ${className}`}
        />
      );
    }

    return (
      <input
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={onChange}
        value={value}
        type={type}
        maxLength={maxLen}
        className={`${isDark?'bg-[#252436] text-white':'bg-white'} h-full w-full outline-none pl-2 font-inter ${className}`}
      />
    );
  };

  return (
    <div
      className={`${isDark?'bg-[#252436] text-white border-[#2A2A3C ]':'bg-white border'} relative  flex items-center px-5  rounded-lg duration-200 w-full flex-grow ${
        type === "textarea" ? "h-auto col-span-2" : "h-14"
      } ${isFocus || isSelectOpen ? "border-blue-200" : ""}`}
      onClick={handleClick}
    >
      {icon}
      <label
  className={`absolute font-inter transition-all duration-300 ease-in-out pointer-events-none
    ${isFocus || fileName || isSelectOpen || (value && type !== "file")
      ? `${isDark ? "text-sm text-blue-300 bg-transparent" : "text-sm text-blue-500 bg-white"} -top-6 left-1`
      : `${isDark ? "text-base text-gray-300" : "text-base text-gray-500"} top-1/2 left-14 transform -translate-y-1/2`
    }`}
>
  {label}
</label>

      
      {renderInput()}
    </div>
  );
};

export default Input;