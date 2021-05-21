import React, { useContext, useState } from "react";

const ShoppingCartContext = React.createContext();
const ShoppingCartUpdateContext = React.createContext();
const ShoppingCartDeleteContext = React.createContext();
const ShoppingCartDeleteContext2 = React.createContext();

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function useShoppingCartUpdate() {
  return useContext(ShoppingCartUpdateContext);
}

export function useShoppingCartDelete() {
  return useContext(ShoppingCartDeleteContext);
}

export function useShoppingCartDelete2() {
  return useContext(ShoppingCartDeleteContext2);
}

export function ShoppingCartProvider({ children }) {
  const [shoppingCart, setShoppingCart] = useState(false);
  const [deleteShoppingCart, setDeleteShoppingCart] = useState(false);
  const [deleteShoppingCart2, setDeleteShoppingCart2] = useState(false);

  const addShoppingList = (newProduct) => {
    if (localStorage.getItem(newProduct.id) == null) {
      localStorage.setItem(newProduct.id, 1);
      setShoppingCart((updateShoppingCart) => !updateShoppingCart);
    }
  };

  const removeShoppingList = (oldProduct, mode) => {
    if (mode == 1) {
      localStorage.removeItem(oldProduct.id);
    } else if (mode == 2) {
      localStorage.removeItem(oldProduct);
    }
    // localStorage.removeItem(oldProduct.id);
    // localStorage.removeItem(oldProduct);
    setDeleteShoppingCart((deleteShoppingCart) => !deleteShoppingCart);
  };

  const removeShoppingList2 = (oldProduct) => {
    // localStorage.removeItem(oldProduct.id);
    localStorage.removeItem(oldProduct);
    setDeleteShoppingCart2((deleteShoppingCart2) => !deleteShoppingCart2);
  };

  return (
    <ShoppingCartContext.Provider value={shoppingCart}>
      <ShoppingCartUpdateContext.Provider value={addShoppingList}>
        <ShoppingCartDeleteContext.Provider value={removeShoppingList}>{children}</ShoppingCartDeleteContext.Provider>
      </ShoppingCartUpdateContext.Provider>
    </ShoppingCartContext.Provider>
  );
}
