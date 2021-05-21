import { Card, Row, Col } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link, Switch } from 'react-router-dom';
import ShoppingCart from '../components/ShoppingCart';
import { useShoppingCartUpdate } from "../contexts/ShoppingCartContext";
import { useSelectedCategory, useSelectedCategoryUpdate } from "../contexts/CategoryContext";

import "./ProductPage.css";

const ProductPage = (props) => {

    let { id } = useParams();

    const [product, setProduct] = useState(0);
    const [category, setCategory] = useState(0);
    const [needUpdateProduct, setNeedUpdateProduct] = useState(true);
    const [needUpdateCategory, setNeedUpdateCategory] = useState(true);
    const chooseCategory = useSelectedCategoryUpdate();
    const addShoppingList = useShoppingCartUpdate();


    useEffect(() => {
        console.log(props.categoryList);

        if (needUpdateProduct){
            const selectedProduct = props.productList.filter(product => {
                return product.id == id;
            })[0];
            if (selectedProduct != null){
                setNeedUpdateProduct(false);
                setProduct(selectedProduct);
            }
        }
        if (needUpdateCategory  && !needUpdateProduct){
            const selectedCategory = props.categoryList.filter(category => {
                return category.catid == product.catid;
            })[0];

            if (selectedCategory != null){
                setNeedUpdateCategory(false);
                setCategory(selectedCategory);
            }
        }
    });
    

    if (needUpdateProduct || needUpdateCategory)
        return (
            <>
                <h1>Product Page</h1>
                <p>Loading</p>
            </>
        );
    else
        return (
            <>
                <h1>
                    <Link to="/" onClick={() => chooseCategory(0)}>Home</Link> 
                    &nbsp;
                    &gt; 
                    &nbsp;
                    <Link to="/" onClick={() => chooseCategory(category)}>{category.name}</Link>
                    &nbsp;
                    &gt; 
                    &nbsp;
                    <u>
                        Product {product.pid}
                    </u>
                </h1>

                <ShoppingCart productList={props.productList}/>

                <Card id="mycard">
                    <Row>
                        <Col span={12}>
                            <img src={product.image}/>
                        </Col>
                        <Col span={12}>
                            <h1>{product.name}</h1>
                            <h2>${product.price}</h2>
                            <button type="button" onClick={()=> addShoppingList(product)}>Add to Cart</button>
                            <p>{product.description}</p>
                        </Col>
                    </Row>
                </Card>
            </>
        );
}

export default ProductPage;

//