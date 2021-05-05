import React from "react";
import { Card, Avatar, Row, Col } from "antd";
import { Link } from "react-router-dom";
import "./HomePage.css";
import "../components/ShoppingCart";
import ShoppingCart from "../components/ShoppingCart";
import { useUser } from "../contexts/UserContext";
import { useShoppingCartUpdate } from "../contexts/ShoppingCartContext";
import {
  useSelectedCategory,
  useSelectedCategoryUpdate,
} from "../contexts/CategoryContext";
import {
  PlusOutlined,
  EllipsisOutlined,
  SettingOutlined,
  EditOutlined,
} from "@ant-design/icons";

const { Meta } = Card;

const HomePage = (props) => {
  const user = useUser();
  const addShoppingList = useShoppingCartUpdate();
  const selectedCategory = useSelectedCategory();
  const chooseCategory = useSelectedCategoryUpdate();

  const filteredProductList =
    selectedCategory !== 0
      ? props.productList.filter((product) => {
          return product.catid === selectedCategory.catid;
        })
      : props.productList;

  const productElements = filteredProductList.map((product, index) => (
    <Col className="gutter-row" span={6} key={index}>
      <Card
        style={{ width: 240, height: 460 }}
        hoverable
        className="card"
        cover={
          <a href={"/product/" + product.pid}>
            <img
              alt={product.name}
              src={
                "https://secure.s70.ierg4210.ie.cuhk.edu.hk/images/" +
                product.pid +
                "." +
                product.extension
              }
              height={320}
              width={240}
            />
          </a>
        }
        actions={[
          <PlusOutlined onClick={() => addShoppingList(product)} />,
          <EditOutlined />,
          <EllipsisOutlined />,
        ]}
      >
        <Meta
          title={<span>${product.price}</span>}
          description={<span style={{ color: "black" }}>{product.name}</span>}
        />
      </Card>
    </Col>
  ));

  const productRows = arr_chunk(productElements, 4);
  function arr_chunk(arr, size) {
    var result = [];
    for (var i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, size + i));
    }
    return result;
  }
  const productContent = productRows.map((row) => (
    <Row gutter={16} style={{ marginBottom: 12 }}>
      {row.map((col) => col)}
    </Row>
  ));

  return (
    <>
      <h1>Hello {user} !</h1>
      {selectedCategory === 0 ? (
        <h1>
          <u>Home</u>
        </h1>
      ) : (
        <h1>
          <Link to="/" onClick={() => chooseCategory(0)}>
            Home
          </Link>{" "}
          &gt; <u>{selectedCategory.name}</u>
        </h1>
      )}
      <ShoppingCart productList={props.productList} />
      <div className="container-fluid"> {productContent} </div>
    </>
  );
};

export default HomePage;
