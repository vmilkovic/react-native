import { FIREBASE_DATABASE_URL } from '@env';
export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';
import Order from '../../models/order';

export const fetchOrders = () => {
  return async (dispatch, getState) => {
    try {
      const token = getState().auth.token;
      const userId = getState().auth.userId;
      const response = await fetch(
        FIREBASE_DATABASE_URL + `orders/${userId}.json?auth=${token}`
      );

      if (!response.ok) {
        throw new Error('Someting went wrong!');
      }

      const responseData = await response.json();
      const loadedOrders = [];

      for (const key in responseData) {
        const order = responseData[key];

        loadedOrders.push(
          new Order(
            key,
            order.cartItems,
            order.totalAmount,
            new Date(order.date)
          )
        );
      }

      dispatch({ type: SET_ORDERS, orders: loadedOrders });
    } catch (err) {
      throw err;
    }
  };
};

export const addOrder = (cartItems, totalAmount) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const date = new Date();
    const response = await fetch(
      FIREBASE_DATABASE_URL + `orders/${userId}.json?auth=${token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cartItems,
          totalAmount,
          date: date.toISOString(),
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Someting went wrong!');
    }

    const responseData = await response.json();

    dispatch({
      type: ADD_ORDER,
      orderData: {
        id: responseData.name,
        items: cartItems,
        amount: totalAmount,
        date,
      },
    });

    for (const cartItem of cartItems) {
      const pushToken = cartItem.productPushToken;

      fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Accept-Encoding': 'gzip, deflate',
          'Content-Tpye': 'application/json',
        },
        body: JSON.stringify({
          to: pushToken,
          title: 'Order was Placed!',
          body: cartItem.productTitle,
        }),
      });
    }
  };
};
