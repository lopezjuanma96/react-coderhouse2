import {createContext, useState} from 'react'

export const CartContext = createContext();

export const CartContextProvider = ({children}) => {

    const [cart, setCart] = useState([]);

    //ADD AN ITEM TO A CART, IF IT ALREADY EXISTS IN THE CART, UPDATE IT
    const addToCart = (item) => {
        if (isInCart(item.id)){
            if (item.counter === 0) deleteFromCart(item.id)
            else changeCartAmount(item.id, item.counter)
        } else {
            if (item.counter === 0) return; //don't add a new item with counter 0
            setCart([
                ...cart, //spread of previous cart
                item //new item to add
            ])
        }
    }

    //IF ITEM IN CART RETURNS TRUE, ELSE RETURN FALSE
    const isInCart = (id) => {
        return cart.some((prod) => prod.id === id); //some is similar to find but returns true if it exists in the list and false if it doesn't
    }

    //RETURNS HOW MANY OF THAT PRODUCT IS ALREADY IN THE CART
    const howMany = (id) => {
        return isInCart(id)? cart.find((prod) => prod.id === id).counter : 0;
    }

    //RETURN TOTAL PRODUCT COUNT ON CART
    const cartTotalCounter = () => {
        let sum = 0;
        cart.map((prod) => sum += prod.counter);
        return sum;
    }

    //UPDATES A PRODUCT IN THE CART, USED MAINLY IN addToCart
    const changeCartAmount = (id, amt) => {
        setCart(cart.map( (prod) => {
                if (prod.id === id) {
                    prod.counter = amt;
                }
                return prod;
            }))
    }

    //DELETES AN ITEM FROM CART
    const deleteFromCart = (id) => {
        setCart(cart.filter((prod) => prod.id !== id));
    }

    //DELETES ALL ITEMS FROM CART
    const clearCart = () => {
        setCart([]);
    }


    return (
        <CartContext.Provider value = {{cart, addToCart, isInCart, howMany, cartTotalCounter, changeCartAmount, deleteFromCart, clearCart}}>
            {children}
        </CartContext.Provider>
    )

}