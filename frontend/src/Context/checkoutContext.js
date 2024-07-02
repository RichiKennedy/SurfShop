import { createContext, useContext } from "react";

const CheckoutContext = createContext();

export const CheckoutProvider = ({ children }) => {
    return (
        <CheckoutContext.Provider value={{

        }}>
            {children}
        </CheckoutContext.Provider>
    );
};

export const useCheckoutContext = () => {
    return useContext(CheckoutContext);
};