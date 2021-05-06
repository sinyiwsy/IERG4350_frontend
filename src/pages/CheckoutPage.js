import ShoppingCart from "../components/ShoppingCart";
import PaymentForm from "./PaymentForm";
import { useUser } from "../contexts/UserContext";
import { Button, Row, Col } from "antd";

const CheckoutPage = (props) => {
  const user = useUser();

  return (
    <>
      <h1>Hello {user} !</h1>
      <h1>This is checkout page!!</h1>
      <Row>
        <ShoppingCart productList={props.productList} />
      </Row>
      <Row>
        <PaymentForm productList={props.productList} />
      </Row>
    </>
  );
};

export default CheckoutPage;
