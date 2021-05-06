import ShoppingCart from "../components/ShoppingCart";
import PaymentForm from "./PaymentForm";
import { shoppingCartService } from "../Service";
import { useUser } from "../contexts/UserContext";
import { Button, Row, Col } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { PaymentInputsWrapper, usePaymentInputs } from "react-payment-inputs";
import images from "react-payment-inputs/images";

const getLocalStorageKeys = () => {
  let res = [];
  for (var i = 0; i < localStorage.length; i++) {
    res.push(localStorage.key(i));
  }
  res.sort();
  return res;
};

const CheckoutPage = (props) => {
  const user = useUser();

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

  const {
    wrapperProps,
    getCardImageProps,
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,
  } = usePaymentInputs();

  return (
    <>
      <h1>Hello {user} !</h1>
      <h1>This is checkout page!!</h1>
      <Row>
        <ShoppingCart productList={props.productList} />
      </Row>
      {/*
      <Row style={{ marginBottom: 12 }}>
        <PaymentInputsWrapper {...wrapperProps}>
          <svg {...getCardImageProps({ images })} />
          <input {...getCardNumberProps()} />
          <input {...getExpiryDateProps()} />
          <input {...getCVCProps()} />
        </PaymentInputsWrapper>
      </Row>
      <Row>
        <Button
          type="default"
          icon={<ShoppingCartOutlined />}
          onClick={onFinish}
        >
          Checkout
        </Button>
      </Row>
      */}
      <Row>
        <PaymentForm productList={props.productList} />
      </Row>
    </>
  );
};

export default CheckoutPage;
