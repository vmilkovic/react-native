import React from 'react';
import { LogBox } from 'react-native';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import PlacesNavigator from './navigation/PlacesNavigator';
import placesReducer from './store/places-reducer';
import { init } from './helpers/db';

init()
  .then(() => {
    console.log('Intialize database.');
  })
  .catch((err) => {
    console.log('Initializing db failed.');
    console.log(err);
  });

LogBox.ignoreLogs([
  /\b\w*react-navigation\w*\b/,
  /\b\w*react-native-reanimated\w*\b/,
  /\b\w*expo-permissions\w*\b/,
]);

const rootReducer = combineReducers({
  places: placesReducer,
});

const middlewares = applyMiddleware(ReduxThunk);

const store = createStore(rootReducer, composeWithDevTools(middlewares));

export default function App() {
  return (
    <Provider store={store}>
      <PlacesNavigator />
    </Provider>
  );
}
