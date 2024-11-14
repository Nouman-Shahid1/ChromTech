'use client'
import { createContext, useContext, useState,useEffect } from 'react';

const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
    const [showCartBar, setShowCartBar] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const currency="$";
    

    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const openCartBar = () => setShowCartBar(true);
    const closeCartBar = () => setShowCartBar(false);


    useEffect(() => {
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(storedCartItems);
    }, []);
    let shipping_fee ;
 if(cartItems.length==0){
    shipping_fee=0;
 }else{
    shipping_fee=10;
 }
    const addToCart = (product) => {
        setCartItems((prevItems) => {
            const existingProduct = prevItems.find(item => item._id === product._id);
            let updatedItems;
            if (existingProduct) {
                updatedItems = prevItems.map(item =>
                    item._id === product._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                updatedItems = [...prevItems, { ...product, quantity: 1 }];
            }
    
            localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    
            return updatedItems;
        });
    };
    const decrementCart = (productId) => {
        setCartItems((prevItems) => {
            const updatedItems = prevItems.map(item =>
                item._id === productId && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            );
            
            localStorage.setItem('cartItems', JSON.stringify(updatedItems));
            return updatedItems;
        });
    }; 
    const removeFromCart = (productId) => {
        setCartItems((prevItems) => {
            const updatedItems = prevItems.map(item =>
                item._id === productId
                    ? { ...item, quantity: item.quantity = 0 }
                    : item
            ).filter(item => item.quantity > 0);
            localStorage.setItem('cartItems', JSON.stringify(updatedItems));
            return updatedItems;
        });
    };
    
    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('cartItems');
    };
    const getTotalCount = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    return (
        <MyContext.Provider value={{totalPrice, decrementCart ,currency,shipping_fee , showCartBar, closeCartBar, openCartBar, cartItems, addToCart, removeFromCart,clearCart,getTotalCount}}>
            {children}
        </MyContext.Provider>
    );
    
};

export const useMyContext = () => useContext(MyContext);
