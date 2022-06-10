import React, { useContext, useState } from "react";

const AppContext = React.createContext();

export function useAppContext() {
    return useContext(AppContext);
}

export const AppContextProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <AppContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn
            }}>
            {children}
        </AppContext.Provider>
    );
}