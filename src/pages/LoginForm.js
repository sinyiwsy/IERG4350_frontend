import { Form, Input, Button } from 'antd';
import Password from 'antd/lib/input/Password';
import { loginService } from '../Service';
import { useHistory } from "react-router-dom";
import { useUserUpdate, useIsAdminUpdate, useNonceUpdate } from "../contexts/UserContext";
import { useState } from 'react';


const LoginForm = () => {
    const history = useHistory();

    const updateNonce = useNonceUpdate();
    const updateUser = useUserUpdate();
    const updateIsAdmin = useIsAdminUpdate();
    const [errorMessage, setErrorMessage] = useState("");

    const onFinish = (values) => {
        setErrorMessage("");
        console.log('Success:', values);
        loginService(values).then(res => {
            if (res.data.success === 1){
                console.log(res.data);
                updateUser(res.data.values.email);
                updateIsAdmin(res.data.values.isAdmin);
                updateNonce(res.data.nonce);
                if (res.data.values.isAdmin){
                    history.push('/admin');
                }
                else{
                    history.push('/');
                }
            }else{
                setErrorMessage("Wrong Email or Password");
            }
        });
    };

    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <h1>Login</h1>
            <Form
                name="login"
                initialValues={{remember: true,}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input an email!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{
                        required: true,
                        message: 'Please input a password!',
                    },]}
                >
                    <Password />
                </Form.Item>

                <h4>{errorMessage}</h4>

                <Form.Item >
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form.Item>
            </Form>
        </>
    );
}

export default LoginForm;