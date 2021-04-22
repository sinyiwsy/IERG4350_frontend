import React from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';
import "./HomePage.css";
import "../components/ShoppingCart";
import ShoppingCart from '../components/ShoppingCart';
import { useUser } from '../contexts/UserContext';
import { useShoppingCartUpdate } from "../contexts/ShoppingCartContext";
import { useSelectedCategory, useSelectedCategoryUpdate } from "../contexts/CategoryContext";

const { Meta } = Card;

const HomePage = (props) => {

    const user = useUser();
    const addShoppingList = useShoppingCartUpdate();
    const selectedCategory = useSelectedCategory();
    const chooseCategory = useSelectedCategoryUpdate();
 
    const filteredProductList = selectedCategory !== 0 
        ? props.productList.filter((product) => {
            return product.catid === selectedCategory.catid;
        })
        : props.productList;
    
    const productElements = filteredProductList.map((product, index) => 
        <li key={index}>
            <Link to={"/product/"+ product.pid}>
                <Card
                    hoverable
                    className="card"
                    cover={<img alt="example" src={"https://secure.s70.ierg4210.ie.cuhk.edu.hk/images/" + product.pid + "." + product.extension} />}
                >
                    <Meta title={product.name}/>
                </Card>
            </Link>
            <p>${product.price}</p>
            <button type="button" onClick={()=> addShoppingList(product)}>Add</button>
        </li>
    );

    return (
        <>
            <h1>Hello {user} !</h1>
            {selectedCategory === 0 
                ? <h1><u>Home</u></h1>
                : <h1>
                    <Link to="/" onClick={()=> chooseCategory(0)}>Home</Link> &gt; <u>{selectedCategory.name}</u>
                </h1>
            }
            <ShoppingCart productList={props.productList}/>
            <ul className="table">
                {productElements}
            </ul>
        </>
    );
}

export default HomePage;