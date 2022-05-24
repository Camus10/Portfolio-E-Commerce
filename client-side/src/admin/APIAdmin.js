import { API } from "../config";


export const createCategory = (userId, token, category) => {
  // data send to the backend
  return fetch(`${API}/category/create/${userId}`, {
    // request
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(category)
  })
  .then(response => {
    return response.json();
  })
  .catch(err => {
    console.log(err); 
  });
}


export const createProduct = (userId, token, product) => {
  // data send to the backend
  return fetch(`${API}/product/create/${userId}`, {
    // request
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: product
  })
  .then(response => {
    return response.json();
  })
  .catch(err => {
    console.log(err);
  });
}


export const getCategories = () => {
  return fetch(`${API}/categories`, {
    method: "GET"
  })
  .then(response => {
    return response.json();
  })
  .catch(err => console.log(err));
}