import React,{ createContext, useContext, useState } from "react";

const ToggleContext = createContext();
export const useTheme = () => useContext(ToggleContext);

export const ToggleProvider = ({children}) => {
    const [currentTheme, setCurrentTheme] = useState("light");

    const Togglefn = () => {
        setCurrentTheme(currentTheme === "light" ? "dark" : "light"); 
    };

    return (
        <ToggleContext.Provider value={{ currentTheme, Togglefn }}>
            {children}
        </ToggleContext.Provider>
    );
} ;

