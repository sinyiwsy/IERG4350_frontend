import ShoppingCart from "../components/ShoppingCart";
import PaymentForm from "./PaymentForm";
import { useUser } from "../contexts/UserContext";
import { Button, Row, Col, Table, Card, InputNumber, Form, Input } from "antd";
import { useEffect, useState, setState } from "react";
import { useHistory } from "react-router-dom";
import { useShoppingCartDelete } from "../contexts/ShoppingCartContext";
import { MinusCircleOutlined } from "@ant-design/icons";

const { Column, ColumnGroup } = Table;

const getLocalStorageKeys = () => {
  let res = [];
  for (var i = 0; i < localStorage.length; i++) {
    res.push(localStorage.key(i));
  }
  res.sort();
  return res;
};

const CheckoutPage = (props) => {
  const history = useHistory();
  const user = useUser();
  const [checkoutPageShoppingCart, setCheckOutPageShoppingCart] = useState([]);
  const [updateCheckoutPageShoppingCart, setUpdateCheckoutPageShoppingCart] = useState(true);
  const removeShoppingList = useShoppingCartDelete();
  const [updateSubCost, setUpdateSubCost] = useState(true);

  useEffect(() => {
    if (user === "Guest") {
      alert("Please Login!");
      history.push("/login");
    }

    if (updateCheckoutPageShoppingCart) {
      if (getShoppingCartList) {
        console.log("testests");
        console.log(getShoppingCartList);
        setCheckOutPageShoppingCart(getShoppingCartList);
        setUpdateCheckoutPageShoppingCart(false);
      }
    }
  });

  const getShoppingCartList =
    props.productList.length === 0
      ? []
      : getLocalStorageKeys().map((key) => {
          return props.productList.filter((product) => {
            return product.id === key;
          })[0];
        });

  const onDelete = (key, e) => {
    e.preventDefault();
    const data = checkoutPageShoppingCart.filter((item) => item.key !== key);
    setState({ data, isPageTween: false });
  };

  return (
    <>
      <div style={{ height: "100vh" }}>
        <h1>Hello {user} !</h1>
        <h1>This is checkout page!!</h1>
        <Row>
          <ShoppingCart productList={props.productList} />
        </Row>
        <Row>
          <PaymentForm productList={checkoutPageShoppingCart} />
        </Row>

        {!updateCheckoutPageShoppingCart && (
          <Table dataSource={checkoutPageShoppingCart}>
            <Column title="Cover" dataIndex="image" key="image" render={(text, record) => <img alt={record.name} src={text} height="100px" />} />
            <Column title="Name" dataIndex="name" key="name" />
            <Column title="Price" dataIndex="price" key="price" />
            <Column
              title="Quantity"
              dataIndex="id"
              key="id"
              render={(id) => (
                <InputNumber
                  min={0}
                  defaultValue={localStorage.getItem(id)}
                  onChange={(value) => {
                    localStorage.setItem(id, value);
                    setUpdateSubCost(!updateSubCost);
                  }}
                />
              )}
            />
            <Column
              title="Operation"
              dataIndex="id"
              key="id"
              render={(text, record) => (
                <Button
                  type="danger"
                  icon={<MinusCircleOutlined />}
                  onClick={(e) => {
                    removeShoppingList(text);
                    onDelete(record.key, e);
                  }}
                />
              )}
            />
            <Column title="Sub Total" dataIndex="id" key="id" render={(text, record) => record.price * localStorage.getItem(text)} />
          </Table>
        )}
        <Row>
          <PaymentForm productList={checkoutPageShoppingCart} />
        </Row>
      </div>
    </>
  );
};

export default CheckoutPage;
