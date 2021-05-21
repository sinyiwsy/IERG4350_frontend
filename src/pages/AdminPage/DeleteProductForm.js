import { Form, Button, Select } from 'antd';
import { deleteProductService } from '../../Service';
import "./AdminPage.css";
import { useNonce, useNonceUpdate } from "../../contexts/UserContext"

const { Option } = Select;

const DeleteProductForm = (props) => {

    const nonce = useNonce();
    const updateNonce = useNonceUpdate();


    const onFinish = (values) => {
        console.log('Success:', values);
        deleteProductService(values.pid, nonce).then(res => {
            if (res.data.success == 1){
                updateNonce(res.data.message);
                props.productHandler(true);
            }
        });
    };
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const productElements = props.productList.map((product, index) => 
        <Option key={index} value={product.pid}>{product.name}</Option>
    );

    return (
        <div className="border">
            <h1>Delete Product</h1>
            <Form
                name="product"
                initialValues={{remember: true,}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    name="pid"
                    label="Product"
                    hasFeedback
                    rules={[
                    {
                        required: true,
                        message: 'Please select category!',
                    },
                    ]}
                >
                    <Select placeholder="Please select a category">
                        {productElements}
                    </Select>
                </Form.Item>

                <Form.Item >
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default DeleteProductForm;