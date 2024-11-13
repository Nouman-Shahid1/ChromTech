'use client'
import { createContext, useContext, useState } from 'react';
const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
    const [showCartBar, setShowCartBar] = useState(false);

    const openCartBar = () => setShowCartBar(true);
    const closeCartBar = () => setShowCartBar(false);

    return (
        <MyContext.Provider value={{ showCartBar, closeCartBar, openCartBar }}>
            {children}
        </MyContext.Provider>
    );
};

export const useMyContext = () => useContext(MyContext);
