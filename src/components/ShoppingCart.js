import "./ShoppingCart.css";
import { useState } from "react";
import { InputNumber, Form, Button, Input } from "antd";
import { shoppingCartService } from "../Service";
import { MinusCircleOutlined } from "@ant-design/icons";
import { useShoppingCartDelete } from "../contexts/ShoppingCartContext";

const getLocalStorageKeys = () => {
  let res = [];
  for (var i = 0; i < localStorage.length; i++) {
    res.push(localStorage.key(i));
  }
  res.sort();
  return res;
};

const ShoppingCart = (props) => {
  const [updateTotalCost, setupdateTotalCost] = useState(true);
  //const [deleteShoppingCart, setDeleteShoppingCart] = useState(true);
  const removeShoppingList = useShoppingCartDelete();

  const onFinish = () => {
    let order = [];
    var keys = getLocalStorageKeys();
    keys.forEach((key) => {
      order.push({ key: key, value: localStorage.getItem(key) });
    });
    shoppingCartService(order).then((res) => {
      console.log("got return");
    });
  };

  const getShoppingCartList =
    props.productList.length === 0
      ? []
      : getLocalStorageKeys().map((key) => {
          return props.productList.filter((product) => {
            return product.pid === key;
          })[0];
        });

  const shoppingCartElements = getShoppingCartList.map((product, index) => (
    <Form.Item label={product.name} key={index}>
      <InputNumber
        min={0}
        defaultValue={localStorage.getItem(product.pid)}
        onChange={(value) => {
          localStorage.setItem(product.pid, value);
          setupdateTotalCost(!updateTotalCost);
        }}
      />
      @${product.price}
      <MinusCircleOutlined
        onClick={() => {
          removeShoppingList(product);
          //localStorage.removeItem(product.pid);
          //setDeleteShoppingCart(!deleteShoppingCart);
        }}
      />
    </Form.Item>
  ));

  const totalCost = getShoppingCartList.reduce(
    (total, product) =>
      total + product.price * localStorage.getItem(product.pid),
    0
  );

  return (
    <div id="foo">
      <p>Shopping List Total: ${totalCost}</p>

      {shoppingCartElements}
      {/* <button onClick={onFinish}>Checkout</button> */}
    </div>
  );
};

export default ShoppingCart;
