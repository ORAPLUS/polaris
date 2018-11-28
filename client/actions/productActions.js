import axios from "axios";

import {
  ADD_PRODUCT,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_PRODUCTS,
  GET_PRODUCT,
  PRODUCT_LOADING,
  DELETE_PRODUCT
} from "./types";

// Get Products
export const getProducts = () => dispatch => {
  dispatch(setProductLoading());
  axios({
    url: `https://polar-dusk-71351.herokuapp.com/shopify/api/products.json`,
    method: "GET",
    withCredentials: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    }
  })
    .then(res =>
      dispatch({
        type: GET_PRODUCTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PRODUCTS,
        payload: null
      })
    );
};

// Get Product
export const getProduct = id => dispatch => {
  dispatch(setProductLoading());
  axios
    .get(`/api/products/${id}`)
    .then(res =>
      dispatch({
        type: GET_PRODUCT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PRODUCT,
        payload: null
      })
    );
};

// Add Product
export const addProduct = productData => dispatch => {
  dispatch(clearErrors());
  axios
    .post("/api/products", productData)
    .then(res =>
      dispatch({
        type: ADD_PRODUCT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete Product
export const deleteProduct = id => dispatch => {
  axios
    .delete(`/api/products/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_PRODUCT,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add Like
export const addLike = id => dispatch => {
  axios
    .post(`/api/products/like/${id}`)
    .then(res => dispatch(getProducts()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Remove Like
export const removeLike = id => dispatch => {
  axios
    .post(`/api/products/unlike/${id}`)
    .then(res => dispatch(getProducts()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add Comment
export const addComment = (productId, commentData) => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`/api/products/comment/${productId}`, commentData)
    .then(res =>
      dispatch({
        type: GET_PRODUCT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete Comment
export const deleteComment = (productId, commentId) => dispatch => {
  axios
    .delete(`/api/products/comment/${productId}/${commentId}`)
    .then(res =>
      dispatch({
        type: GET_PRODUCT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set loading state
export const setProductLoading = () => {
  return {
    type: PRODUCT_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
