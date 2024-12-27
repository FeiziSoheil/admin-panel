import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {

    const [isDark, setIsDark] = useState(() => {
        const savedTheme = localStorage.getItem("appTheme");
        return savedTheme === "dark";
      });
      useEffect(() => {
        localStorage.setItem("appTheme", isDark ? "dark" : "light");
      }, [isDark]);
    

    return (
        <ThemeContext.Provider value={{ isDark, setIsDark, }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;