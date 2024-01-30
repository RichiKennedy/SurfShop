import React, { createContext, useState, useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [openCart, setOpenCart] = useState(false);
    const [isNewProductAdded, setIsNewProductAdded] = useState(false);
    const products = useSelector(state => state.cart.products)

    useEffect(() => {
        if (products.length > 0 && isNewProductAdded) {
          setOpenCart(true);
          
          const timer = setTimeout(() => {
            setIsNewProductAdded(false);
          }, 1000);
          
          return () => clearTimeout(timer);
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [products]);

  return (
    <AppContext.Provider value={{ 
        openCart, 
        setOpenCart,
        isNewProductAdded,
        setIsNewProductAdded,
        }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
