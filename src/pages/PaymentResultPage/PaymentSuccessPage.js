import { Result, Button } from "antd";
import { useHistory } from "react-router-dom";

const PaymentSuccessPage = () => {
  const history = useHistory();
  const urlParams = new URLSearchParams(window.location.search);
  const sessionId = urlParams.get("session_id");

  return (
    <Result
      status="success"
      title="Purchase Success!"
      subTitle={"Order number: " + sessionId.replace(/cs_test_/, "")}
      extra={[
        <Button type="primary" key="console" onClick={() => history.push("/")}>
          Go Home Page
        </Button>,
        <Button key="buy" onClick={() => history.push("/")}>
          Buy More
        </Button>,
      ]}
    />
  );
};

export default PaymentSuccessPage;
