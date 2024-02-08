import React, { createContext, useState, useContext } from 'react';
import { toast } from 'react-toastify'

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [openCart, setOpenCart] = useState(false);
    const [isNewProductAdded, setIsNewProductAdded] = useState(false);

    const handleAddToCartMsg = (product) => {
        toast.success(`Added ${product.attributes.smallDesc} to the cart!`)
    }

  return (
    <CartContext.Provider value={{ 
        openCart, 
        setOpenCart,
        isNewProductAdded,
        setIsNewProductAdded,
        handleAddToCartMsg
        }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  return useContext(CartContext);
};
