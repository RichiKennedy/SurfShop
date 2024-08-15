import React, { createContext, useState, useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify'

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [openCart, setOpenCart] = useState(false);
    const [isNewProductAdded, setIsNewProductAdded] = useState(false);
    const cartProducts = useSelector((state) => state.cart.products);
    const handleAddToCartMsg = (product) => {
        toast.success(`Added ${product.attributes.smallDesc} to the cart!`);
    }

    useEffect(() => {
      if(isNewProductAdded) {
        setOpenCart(true);
        setIsNewProductAdded(false)
      }
    }, [isNewProductAdded])

  return (
    <CartContext.Provider value={{ 
        openCart, 
        setOpenCart,
        isNewProductAdded,
        setIsNewProductAdded,
        handleAddToCartMsg,
        cartProducts
        }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  return useContext(CartContext);
};
