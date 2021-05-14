import { Result, Button } from 'antd';
import { useHistory } from "react-router-dom";



const PaymentFailPage = () => {
    const history = useHistory();

    return (
        <Result
            status="error"
            title="Purchase Fail"
            subTitle="Fail message: 4350 sucks"
            extra={[
                <Button type="primary" key="console" onClick={() => history.push('/')}>
                    Go Home Page
                </Button>,
                <Button key="buy">Buy Again</Button>,
            ]}
        />
    );
}   

export default PaymentFailPage;