import { Form, Input, Button, Select, Upload, InputNumber } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { updateProductService } from '../../Service';
import { useState } from 'react';
import TextArea from 'antd/lib/input/TextArea';
import "./AdminPage.css";
import { useNonce, useNonceUpdate } from "../../contexts/UserContext"

const { Option } = Select;

const UpdateProductForm = (props) => {
    const [image, setImage] = useState(0);
    const nonce = useNonce();
    const updateNonce = useNonceUpdate();

    const onFinish = (values) => {
        console.log('Success:', values);
        //const target_copy = Object.assign({}, values.image[0]);
        updateProductService(values, image, nonce).then(res => {
            console.log(res);
            if (res.data.success == 1){
                updateNonce(res.data.message);
                props.productHandler(true);
            }
        });
    };
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const normFile = (e) => {
        console.log('Upload event:', e);
      
        if (Array.isArray(e)) {
          return e;
        }
      
        return e && e.fileList;
    };

    const productElements = props.productList.map((product, index) => 
        <Option key={index} value={product.pid}>{product.pid} &nbsp;{product.name}</Option>
    );

    const categoryElements = props.categoryList.map((category, index) => 
        <Option key={index} value={category.catid}>{category.catid} &nbsp;{category.name}</Option>
    );

    const uploadProps = {
        name: 'file',
        listType:"picture",

        beforeUpload: file => {
            console.log("before upload");
            console.log(file);
            setImage(file)
            /*this.setState(state => ({
              fileList: [...state.fileList, file],
            }));*/
            return false;
        },

        onChange(info) {
            console.log("below");
            console.log(info.file.status); 
            if (info.file.status !== 'uploading') {
                console.log("1");  
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                console.log("2");
                console.log(info.file);
                setImage(info.file);
            } else if (info.file.status === 'error') {
                console.log("3");
                console.log(info.file);
            }
        },
      };

    return (
        <div className="border">
            <h1>Update Product</h1>
            <Form
                name="product"
                initialValues={{remember: true,}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    name="pid"
                    label="Existing Product"
                    hasFeedback
                    rules={[
                    {
                        required: true,
                        message: 'Please select a product!',
                    },
                    ]}
                >
                    <Select placeholder="Please select a product">
                        {productElements}
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                    {
                        required: true,
                        message: 'Please input a product name!',
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
                        message: 'Please input price!',
                    },
                    ]}
                >
                    <InputNumber 
                        min={0} 
                        value={100}
                    />
                </Form.Item>

                <Form.Item
                    name="catid"
                    label="Category"
                    hasFeedback
                    rules={[{required: true, message: 'Please select category!',},]}
                >
                    <Select placeholder="Please select a category">
                        {categoryElements}
                    </Select>
                </Form.Item>

                <Form.Item 
                    label="Description"
                    name="description"
                    rules={[{
                        required: true,
                        message: 'Please input description!',
                    },]}
                >
                    <TextArea />
                </Form.Item>

                <Form.Item
                    name="image"
                    label="Upload"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    rules={[{
                        required: true,
                        message: 'Please upload an image!',
                    },]}
                >
                    <Upload {...uploadProps}>
                        <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload>
                </Form.Item>

                <Form.Item >
                    <Button type="primary" htmlType="submit">
                    Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default UpdateProductForm;