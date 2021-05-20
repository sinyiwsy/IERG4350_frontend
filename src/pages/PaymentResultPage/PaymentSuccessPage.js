import { Result, Button } from "antd";
import { useHistory } from "react-router-dom";

const PaymentSuccessPage = () => {
  const history = useHistory();
  const urlParams = new URLSearchParams(window.location.search);
  const sessionId = urlParams.get("session_id");

  return (
    <Result
      status="success"
      title="Successfully Purchased 4350!"
      subTitle={"Order number: " + sessionId.replace(/cs_test_/, "")}
      extra={[
        <Button type="primary" key="console" onClick={() => history.push("/")}>
          Go Home Page
        </Button>,
        <Button key="buy">Buy More</Button>,
      ]}
    />
  );
};

export default PaymentSuccessPage;
