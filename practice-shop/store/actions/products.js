import { FIREBASE_URL } from '@env';
import Product from '../../models/product';

export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(FIREBASE_URL + 'products.json');

      if (!response.ok) {
        throw new Error('Someting went wrong!');
      }

      const responseData = await response.json();
      const loadedProducts = [];

      for (const key in responseData) {
        const product = responseData[key];

        loadedProducts.push(
          new Product(
            key,
            'u1',
            product.title,
            product.imageUrl,
            product.description,
            product.price
          )
        );
      }

      dispatch({ type: SET_PRODUCTS, products: loadedProducts });
    } catch (err) {
      throw err;
    }
  };
};

export const deleteProduct = (productId) => {
  return async (dispatch) => {
    const response = await fetch(FIREBASE_URL + `products/${productId}.json`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    dispatch({ type: DELETE_PRODUCT, pid: productId });
  };
};

export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch) => {
    const response = await fetch(FIREBASE_URL + 'products.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
        imageUrl,
        price,
      }),
    });

    const responseData = await response.json();

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: responseData.name,
        title,
        description,
        imageUrl,
        price,
      },
    });
  };
};

export const updateProduct = (id, title, description, imageUrl) => {
  return async (dispatch) => {
    const response = await fetch(FIREBASE_URL + `products/${id}.jsson`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
        imageUrl,
      }),
    });

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    dispatch({
      type: UPDATE_PRODUCT,
      pid: id,
      productData: {
        title,
        description,
        imageUrl,
      },
    });
  };
};
