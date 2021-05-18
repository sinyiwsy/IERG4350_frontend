import { Result, Button } from 'antd';
import { useHistory } from "react-router-dom";


const PaymentSuccessPage = () => {
    const history = useHistory();

    return (
        <Result
            status="success"
            title="Successfully Purchased 4350!"
            subTitle="Order number: 123456"
            extra={[
                <Button type="primary" key="console" onClick={() => history.push('/')}>
                    Go Home Page
                </Button>,
                <Button key="buy">Buy More</Button>,
            ]}
        />
    );
}   

export default PaymentSuccessPage;