import React, {useContext, useState} from 'react';

const ShoppingCartContext = React.createContext();
const ShoppingCartUpdateContext = React.createContext();

export function useShoppingCart(){
    return useContext(ShoppingCartContext);
}

export function useShoppingCartUpdate() {
    return useContext(ShoppingCartUpdateContext);
}

export function ShoppingCartProvider({children}) {
    const [shoppingCart, setShoppingCart] = useState(false);

    const addShoppingList = (newProduct) => {
        if (localStorage.getItem(newProduct.pid) == null){
            localStorage.setItem(newProduct.pid, 1);
            setShoppingCart(updateShoppingCart => !updateShoppingCart);
        }      
    }

    return (
        <ShoppingCartContext.Provider value={shoppingCart}>
            <ShoppingCartUpdateContext.Provider value={addShoppingList}>
                {children}
            </ShoppingCartUpdateContext.Provider>
        </ShoppingCartContext.Provider>
    );
}