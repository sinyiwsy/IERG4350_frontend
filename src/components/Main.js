import { Switch, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ProductPage from "../pages/ProductPage";
import AdminPage from "../pages/AdminPage/AdminPage";
import "./Main.css";
import { Layout } from "antd";
import LoginPage from "../pages/LoginPage";
import { useIsAdmin } from "../contexts/UserContext";
import CheckoutPage from "../pages/CheckoutPage";

const { Content } = Layout;

const Main = (props) => {
  const isAdmin = useIsAdmin();

  return (
    <Content className="content">
      <Switch>
        <Route exact path="/">
          <HomePage productList={props.productList} />
        </Route>
        <Route path="/product/:id">
          <ProductPage
            productList={props.productList}
            categoryList={props.categoryList}
          />
        </Route>
        <Route exact path="/checkout">
          <CheckoutPage productList={props.productList} />
        </Route>
        {isAdmin && (
          <Route path="/admin">
            <AdminPage
              categoryList={props.categoryList}
              productList={props.productList}
              categoryHandler={props.categoryHandler}
              productHandler={props.productHandler}
            />
          </Route>
        )}
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="*">
          <h1>Page Not Found</h1>
        </Route>
      </Switch>
    </Content>
  );
};

export default Main;
