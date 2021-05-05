import React, { useContext, useState } from "react";

const ShoppingCartContext = React.createContext();
const ShoppingCartUpdateContext = React.createContext();
const ShoppingCartDeleteContext = React.createContext();

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function useShoppingCartUpdate() {
  return useContext(ShoppingCartUpdateContext);
}

export function useShoppingCartDelete() {
  return useContext(ShoppingCartDeleteContext);
}

export function ShoppingCartProvider({ children }) {
  const [shoppingCart, setShoppingCart] = useState(false);
  const [deleteShoppingCart, setDeleteShoppingCart] = useState(false);

  const addShoppingList = (newProduct) => {
    if (localStorage.getItem(newProduct.pid) == null) {
      localStorage.setItem(newProduct.pid, 1);
      setShoppingCart((updateShoppingCart) => !updateShoppingCart);
    }
  };

  const removeShoppingList = (oldProduct) => {
    localStorage.removeItem(oldProduct.pid);
    setDeleteShoppingCart((deleteShoppingCart) => !deleteShoppingCart);
  };

  return (
    <ShoppingCartContext.Provider value={shoppingCart}>
      <ShoppingCartUpdateContext.Provider value={addShoppingList}>
        <ShoppingCartDeleteContext.Provider value={removeShoppingList}>
          {children}
        </ShoppingCartDeleteContext.Provider>
      </ShoppingCartUpdateContext.Provider>
    </ShoppingCartContext.Provider>
  );
}
