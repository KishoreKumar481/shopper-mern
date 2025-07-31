import React, { createContext, useEffect, useState } from 'react'

export const ShopContext = createContext(null);

    const getDefaultCart = () => {
        let cart = {};
        for (let i = 0; i < 300+1; i++) {
            cart[i] = 0;
        }
        return cart
    }

const ShopContextProvider = (props) => {
    const url = 'https://shopper-backend-ug5r.onrender.com'
    
    const [all_product, setAll_product] = useState([])
    const [cartItems, setCartItems] = useState(getDefaultCart)

    useEffect(() => {
        fetch(`${url}/allproducts`)
            .then((res) => res.json())
            .then((data) => setAll_product(data))

            if (localStorage.getItem('auth-token')) {
                fetch(`${url}/getcart`, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/form-data',
                        'auth-token': `${localStorage.getItem('auth-token')}`,
                        'Content-Type': 'application/json'
                    },
                    body: '',
                })
                .then((res) => res.json())
                .then((data) => setCartItems(data));
            }
    }, [])

    function addToCart(itemId) {
        setCartItems((prev) => ({...prev, [itemId] : prev[itemId] + 1}))
        if (localStorage.getItem('auth-token')) {
            fetch(`${url}/addtocart`, {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"itemId": itemId})
            })
            .then((res) => res.json())
            .then((data) => console.log(data))
        }
    }

    function removeFromCart(itemId) {
        setCartItems((prev) => ({...prev, [itemId] : 0}))
        if (localStorage.getItem('auth-token')) {
            fetch(`${url}/removefromcart`, {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"itemId": itemId})
            })
            .then((res) => res.json())
            .then((data) => console.log(data))
        }
    }

    function reduceItemFromCart(itemId) {
        setCartItems((prev) => ({...prev, [itemId] : prev[itemId] - 1}))
        if (localStorage.getItem('auth-token')) {
            fetch(`${url}/reducefromcart`, {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"itemId": itemId})
            })
            .then((res) => res.json())
            .then((data) => console.log(data))
        }
    }

    function getTotalCartAmount() {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_product.find((product) => product.id === Number(item))
                totalAmount += itemInfo.new_price * cartItems[item]
            }
        }
        return totalAmount;
    }

    function getTotalCartItems() {
        let totalItem = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItem += cartItems[item]
            }
        }
        return totalItem;
    }

    const contextValue = {all_product, cartItems, addToCart, reduceItemFromCart, removeFromCart, getTotalCartAmount, getTotalCartItems}

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;
