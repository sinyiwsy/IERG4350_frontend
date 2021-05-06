import axios from "axios";

const URI = "https://secure.s70.ierg4210.ie.cuhk.edu.hk/backend/index.php";
//const URI = "http://localhost:8080/backend/index.php";

export const getCategoryListService = () => {
  return axios.get(URI + "?action=category");
};

export const getProductListService = () => {
  return axios.get(URI + "?action=product");
};

export const addProductService = (product, image, nonce) => {
  const formData = new FormData();
  formData.append("catid", product.catid);
  formData.append("name", product.name);
  formData.append("price", product.price);
  formData.append("description", product.description);
  formData.append("image", image);
  formData.append("nonce", nonce);

  return axios.post(URI + "?action=add_product", formData);
};

export const addCategoryService = (category, nonce) => {
  const formData = new FormData();
  formData.append("name", category.name);
  formData.append("nonce", nonce);

  return axios.post(URI + "?action=add_category", formData);
};

export const deleteCategoryService = (catid, nonce) => {
  const formData = new FormData();
  formData.append("nonce", nonce);

  return axios.post(URI + "?action=delete_category&&catid=" + catid, formData);
};

export const deleteProductService = (pid, nonce) => {
  const formData = new FormData();
  formData.append("nonce", nonce);

  return axios.post(URI + "?action=delete_product&&pid=" + pid, formData);
};

export const updateCategoryService = (category, nonce) => {
  const formData = new FormData();
  formData.append("name", category.name);
  formData.append("nonce", nonce);

  return axios.post(
    URI + "?action=update_category&&catid=" + category.catid,
    formData
  );
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

  return axios.post(
    URI + "?action=update_product&&pid=" + product.pid,
    formData
  );
};

export const loginService = (credential) => {
  const formData = new FormData();
  formData.append("email", credential.email);
  formData.append("password", credential.password);

  return axios.post(URI + "?action=login", formData);
};

export const registerService = (credential) => {
  const formData = new FormData();
  formData.append("email", credential.email);
  formData.append("username", credential.username);
  formData.append("password", credential.password);

  return axios.post(URI + "?action=register", formData);
};

export const forgotService = (credential) => {
  const formData = new FormData();
  formData.append("email", credential.email);
  formData.append("old_password", credential.old_password);
  formData.append("new_password", credential.new_password);
  return axios.post(URI + "?action=forgot", formData);
};

export const logoutService = () => {
  return axios.get(URI + "?action=logout");
};

export const authAdminService = () => {
  return axios.get(URI + "?action=auth_admin");
};

export const authService = () => {
  return axios.get(URI + "?action=auth");
};

export const shoppingCartService = (order) => {
  const formData = new FormData();
  formData.append("order", JSON.stringify(order));

  return axios.post(URI + "?action=cart", formData);
};
