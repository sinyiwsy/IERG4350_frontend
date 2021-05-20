import ShoppingCart from "../components/ShoppingCart";
import PaymentForm from "./PaymentForm";
import { useUser } from "../contexts/UserContext";
import { Button, Row, Col } from "antd";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const CheckoutPage = (props) => {
  const history = useHistory();
  const user = useUser();
  useEffect(() => {
    if (user === "Guest") {
      alert("Please Login!");
      history.push("/login");
    }
  });

  return (
    <>
      <div style={{ height: "100vh" }}>
        <h1>Hello {user} !</h1>
        <h1>This is checkout page!!</h1>
        <Row>
          <ShoppingCart productList={props.productList} />
        </Row>
        <Row>
          <PaymentForm productList={props.productList} />
        </Row>
      </div>
    </>
  );
};

export default CheckoutPage;
