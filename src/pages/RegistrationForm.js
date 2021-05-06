import { Form, Input, Button } from "antd";
import { registerService } from "../Service";

const layout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 16 },
};

const onFinish = async (values) => {
  console.log("Success:", values);

  registerService(values).then((res) => {
    if (res.data.success == 1) {
      // todo
    } else {
      // todo
    }
  });
};

const onFinishFailed = async (errorInfo) => {
  console.log("Failed:", errorInfo);
};

export default function RegistrationForm(props) {
  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your email!",
            type: "email",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
