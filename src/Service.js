import api from "./services/api";
import { loadAccessToken } from "./services/cookies";

export const getCategoryListService = () => {
  return api.get("/categories");
};

export const getProductListService = () => {
  return api.get("/products");
};

export const addProductService = (product, image, nonce) => {
  // const formData = new FormData();
  // formData.append("catid", product.catid);
  // formData.append("name", product.name);
  // formData.append("price", product.price);
  // formData.append("description", product.description);
  // formData.append("image", image);
  // formData.append("nonce", nonce);

  // return api.post("?action=add_product", formData);
  console.log(image);
  const body = {
    categoryId: product.catid,
    name: product.name,
    price: product.price,
    description: product.description,
    imageContent: image,
  };

  return api.post("/products", body);
};

export const addCategoryService = (category, nonce) => {
  // const formData = new FormData();
  // formData.append("name", category.name);
  // formData.append("nonce", nonce);

  const body = {
    name: category.name,
  };
  return api.post("/categories", body);
};

export const deleteCategoryService = (catid, nonce) => {
  // const formData = new FormData();
  // formData.append("nonce", nonce);

  return api.delete("/categories/" + catid);
};

export const deleteProductService = (pid, nonce) => {
  const formData = new FormData();
  formData.append("nonce", nonce);

  return api.post("?action=delete_product&&pid=" + pid, formData);
};

export const updateCategoryService = (category, nonce) => {
  // const formData = new FormData();
  // formData.append("name", category.name);
  // formData.append("nonce", nonce);

  const body = {
    name: category.name,
  };
  return api.put("/categories/" + category.catid, body);
};

export const updateProductService = (product, image, nonce) => {
  const formData = new FormData();
  formData.append("catid", product.catid);
  formData.append("name", product.name);
  formData.append("price", product.price);
  formData.append("description", product.description);
  formData.append("image", image);
  formData.append("nonce", nonce);
  console.log("bye");

  return api.post("?action=update_product&&pid=" + product.pid, formData);
};

export const loginService = (credential) => {
  const body = {
    email: credential.email,
    password: credential.password,
  };
  return api.post("/user/login", body);
};

export const registerService = (credential) => {
  const body = {
    email: credential.email,
    username: credential.username,
    password: credential.password,
  };

  return api.post("/user", body);
};

export const forgotService = (credential) => {
  const formData = new FormData();
  formData.append("email", credential.email);
  formData.append("old_password", credential.old_password);
  formData.append("new_password", credential.new_password);
  return api.post("?action=forgot", formData);
};

export const logoutService = () => {
  return api.get("?action=logout");
};

export const authAdminService = () => {
  return api.get("?action=auth_admin");
};

export const authService = () => {
  return api.get("?action=auth");
};

export const shoppingCartService = (order) => {
  const formData = new FormData();
  formData.append("order", JSON.stringify(order));

  return api.post("?action=cart", formData);
};

export const checkoutService = (shoppingCart) => {
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer ".concat(loadAccessToken()),
    },
  };
  const body = {
    shoppingCart: shoppingCart,
  };
  return api.post("/create-checkout-session", body, axiosConfig);
};
