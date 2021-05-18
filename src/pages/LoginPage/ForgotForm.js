import { Form, Input, Button } from 'antd';
import Password from 'antd/lib/input/Password';
import { forgotService } from '../../Service';
import { useUserUpdate, useIsAdminUpdate } from "../../contexts/UserContext";



const ForgotForm = () => {

    const userUpdate = useUserUpdate();
    const isAdminUpdate = useIsAdminUpdate();

    const onFinish = (values) => {
        console.log('Success:', values);
        forgotService(values).then(res => {
            if (res.data == "ok"){
                userUpdate("Guest");
                isAdminUpdate(false);
            }
            console.log(res);
        });
    };
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <h1>Change Password</h1>
            <Form
                name="forgot"
                initialValues={{remember: true,}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{
                        required: true,
                        message: 'Please input an email!',
                    },]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Old Password"
                    name="old_password"
                    rules={[{
                        required: true,
                        message: 'Please input a password!',
                    },]}
                >
                    <Password />
                </Form.Item>

                <Form.Item
                    label="New Password"
                    name="new_password"
                    rules={[{
                        required: true,
                        message: 'Please input a password!',
                    },]}
                >
                    <Password />
                </Form.Item>

                <Form.Item >
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form.Item>
            </Form>
        </>
    );
}

export default ForgotForm;