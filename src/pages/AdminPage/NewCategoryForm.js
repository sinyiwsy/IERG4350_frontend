import { Form, Input, Button } from 'antd';
import { addCategoryService } from '../../Service';
import "./AdminPage.css";
import { useNonce, useNonceUpdate } from "../../contexts/UserContext"


const NewCategoryForm = (props) => {

    const nonce = useNonce();
    const updateNonce = useNonceUpdate();

    const onFinish = (values) => {
        console.log('Success:', values);
        addCategoryService(values, nonce).then(res => {
            if (res.data.success == 1){
                updateNonce(res.data.message);
                props.categoryHandler(true);
            }
        });
    };
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="border">
            <h1>New Category</h1>
            <Form
                name="category"
                initialValues={{remember: true,}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Category Name"
                    name="name"
                    rules={[{
                        required: true,
                        message: 'Please input a category name!',
                    },]}
                >
                    <Input />
                </Form.Item>

                <Form.Item >
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default NewCategoryForm;