import React, { useState } from 'react';
import { LogBox } from 'react-native';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import ReduxThunk from 'redux-thunk';
import * as Notifications from 'expo-notifications';

import productReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart';
import ordersReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';
import AppNavigator from './navigation/AppNavigator';

LogBox.ignoreLogs([
  /\b\w*react-navigation\w*\b/,
  /\b\w*react-native-reanimated\w*\b/,
]);

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return { shouldShowAlert: true };
  },
});

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  orders: ordersReducer,
  auth: authReducer,
});

const middlewares = applyMiddleware(ReduxThunk);

const store = createStore(rootReducer, composeWithDevTools(middlewares));

const fetchFonts = async () => {
  return await Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
