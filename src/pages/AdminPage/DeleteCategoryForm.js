import { Form, Button, Select } from 'antd';
import { deleteCategoryService } from '../../Service';
import "./AdminPage.css";
import { useNonce, useNonceUpdate } from "../../contexts/UserContext"

const { Option } = Select;

const DeleteCategoryForm = (props) => {
    
    const nonce = useNonce();
    const updateNonce = useNonceUpdate();

    const onFinish = (values) => {
        console.log('Success:', values);
        deleteCategoryService(values.catid, nonce).then(res => {
            if (res.data.success == 1){
                updateNonce(res.data.message);
                props.categoryHandler(true);
                props.productHandler(true);
            }
        });
    };
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const categoryElements = props.categoryList.map((category, index) => 
        <Option key={index} value={category.catid}>{category.name}</Option>
    );

    return (
        <div className="border">
            <h1>Delete Category</h1>
            <Form
                name="category"
                initialValues={{remember: true,}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    name="catid"
                    label="Category"
                    hasFeedback
                    rules={[
                    {
                        required: true,
                        message: 'Please select category!',
                    },
                    ]}
                >
                    <Select placeholder="Please select a category">
                        {categoryElements}
                    </Select>
                </Form.Item>

                <Form.Item >
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default DeleteCategoryForm;