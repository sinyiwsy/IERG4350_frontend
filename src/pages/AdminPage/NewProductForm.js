import { Form, Input, Button, Select, Upload, InputNumber } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { addProductService } from "../../Service";
import { useState } from "react";
import TextArea from "antd/lib/input/TextArea";
import { useNonce, useNonceUpdate } from "../../contexts/UserContext";
import "./AdminPage.css";

const { Option } = Select;

const NewProductForm = (props) => {
  const nonce = useNonce();
  const updateNonce = useNonceUpdate();
  const [image, setImage] = useState(0);

  const onFinish = (values) => {
    console.log("Success:", values);
    console.log(values.image[0]);
    //const target_copy = Object.assign({}, values.image[0]);
    addProductService(values, image, nonce).then((res) => {
      console.log(res);
      if (res.data.success == 1) {
        updateNonce(res.data.message);
        props.productHandler(true);
      }
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const normFile = (e) => {
    console.log("Upload event:", e);

    if (Array.isArray(e)) {
      return e;
    }

    return e && e.fileList;
  };

  const categoryElements = props.categoryList.map((category, index) => (
    <Option key={index} value={category.id}>
      {category.name}
    </Option>
  ));

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  async function getBase64(file) {
    const result = await toBase64(file).catch((e) => Error(e));
    if (result instanceof Error) {
      console.log("Error: ", result.message);
      return;
    }
    console.log("base64");
    console.log(result);
    // img = result;
    setImage(result);
    return;
    //...
  }

  const uploadProps = {
    name: "file",
    listType: "picture",

    beforeUpload: (file) => {
      console.log("before upload");
      console.log(file);
      //   setImage(file);
      console.log(getBase64(file));
      /*this.setState(state => ({
              fileList: [...state.fileList, file],
            }));*/
      return false;
    },

    onChange(info) {
      console.log("below");
      console.log(info.file.status);
      if (info.file.status !== "uploading") {
        console.log("1");
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        console.log("2");
        console.log(info.file);
        setImage(info.file);
      } else if (info.file.status === "error") {
        console.log("3");
        console.log(info.file);
      }
    },
  };

  return (
    <div className="border">
      <h1>New Product</h1>
      <Form
        name="product"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input a product name!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[
            {
              required: true,
              message: "Please input price!",
            },
          ]}
        >
          <InputNumber min={0} value={100} />
        </Form.Item>

        <Form.Item
          name="catid"
          label="Category"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please select category!",
            },
          ]}
        >
          <Select placeholder="Please select a category">
            {categoryElements}
          </Select>
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Please input description!",
            },
          ]}
        >
          <TextArea />
        </Form.Item>

        <Form.Item
          name="image"
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[
            {
              required: true,
              message: "Please upload an image!",
            },
          ]}
        >
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default NewProductForm;
