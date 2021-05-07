import { Form, Input, Button, Select } from 'antd';
import { updateCategoryService } from '../../Service';
import "./AdminPage.css";
import { useNonce, useNonceUpdate } from "../../contexts/UserContext"

const { Option } = Select;



const UpdateCategoryForm = (props) => {
    const nonce = useNonce();
    const updateNonce = useNonceUpdate();


    const onFinish = (values) => {
        console.log('Success:', values.name , values.catid);
        updateCategoryService(values, nonce).then(res => {
            console.log(res);
            if (res.data.success == 1){
                updateNonce(res.data.message);
                props.categoryHandler(true);
            }
        });
    };
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const categoryElements = props.categoryList.map((category, index) => 
        <Option key={index} value={category.id}>{category.name}</Option>
    );

    return (
        <div className="border">
            <h1>Update Category</h1>
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

                <Form.Item
                    label="New Name"
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

export default UpdateCategoryForm;