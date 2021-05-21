import { Row, Col  } from 'antd';
import NewProductForm from "./NewProductForm";
import NewCategoryForm from "./NewCategoryForm";
import DeleteCategoryForm from "./DeleteCategoryForm";
import DeleteProductForm from "./DeleteProductForm";
import UpdateProductForm from './UpdateProductForm';
import UpdateCategoryForm from './UpdateCategoryForm';


const AdminPage = (props) => {
    return (
        <>
            <h1><u>Admin</u></h1>
            <Row gutter={24}>
                <Col span="12">
                    <NewCategoryForm 
                        categoryHandler={props.categoryHandler}
                    />
                </Col>
                <Col span="12">
                    <NewProductForm
                        categoryList={props.categoryList} 
                        productHandler={props.productHandler}
                    />
                </Col>
            </Row>
            <br></br>
            <Row gutter={24}>
                <Col span="12">
                    <DeleteCategoryForm 
                        categoryHandler={props.categoryHandler}
                        categoryList={props.categoryList} 
                        productHandler={props.productHandler}
                    />
                </Col>
                <Col span="12">
                    <DeleteProductForm
                        productList={props.productList} 
                        productHandler={props.productHandler}
                    />
                </Col>
            </Row>
            <br></br>
            <Row gutter={24}>
                <Col span="12">
                    <UpdateCategoryForm 
                        categoryHandler={props.categoryHandler}
                        categoryList={props.categoryList} 
                    />
                </Col>
                <Col span="12">
                    <UpdateProductForm
                        productList={props.productList} 
                        categoryList={props.categoryList} 
                        productHandler={props.productHandler}
                    />
                </Col>
            </Row>
            
        </>
    );
}

export default AdminPage;