import React from "react";
import { BrowserRouter } from "react-router-dom";
import Main from "./components/Main";
import MySider from "./components/Sider";
import { Row, Col, Layout } from 'antd';
import 'antd/dist/antd.css';
import { useState, useEffect } from 'react';
import { getCategoryListService, getProductListService } from './Service';
import { UserProvider } from "./contexts/UserContext";
import { ShoppingCartProvider } from "./contexts/ShoppingCartContext";
import { CategoryProvider } from "./contexts/CategoryContext";

const App = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [updateCategory, setUpdateCategory] = useState(true);
  const [updateProduct, setUpdateProduct] = useState(true);

  useEffect(() => {
      if (updateCategory)
        getCategoryListService().then(res => {
          if (res.data.success == 1){
            setCategoryList(res.data.values);
            setUpdateCategory(false);
          }
        });

      if (updateProduct)
        getProductListService().then(res => {
          if (res.data.success == 1){
            setProductList(res.data.values);
            setUpdateProduct(false);
          }
        });
  });

  return (
    <BrowserRouter>
      <UserProvider>
      <ShoppingCartProvider>
      <CategoryProvider>
      <Row>
          <Layout>
            <Col flex={"200px"}>
              <MySider 
                categoryList={categoryList}
              />
            </Col>
            <Col flex={"auto"}>
              <Main 
                productList={productList} 
                categoryList={categoryList}
                categoryHandler={setUpdateCategory}
                productHandler={setUpdateProduct}
              />
            </Col>
          </Layout>
        </Row>
      </CategoryProvider>
      </ShoppingCartProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
