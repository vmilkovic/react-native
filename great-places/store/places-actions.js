import * as FileSystem from 'expo-file-system';

export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACES = 'SET_PLACES';

import { insertPlace, fetchPlaces } from '../helpers/db';
import { GOOGLE_MAPS_API_KEY } from '@env';

export const addPlace = (title, imageUri, location) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${GOOGLE_MAPS_API_KEY}`
    );

    if (!response.ok) {
      throw new Error('Someting went wrong!');
    }

    const responseData = await response.json();

    if (!responseData.results) {
      throw new Error('Someting went wrong!');
    }

    const address = responseData.results[0].formatted_address;
    const fileName = imageUri.split('/').pop();
    const newPath = FileSystem.documentDirectory + fileName;

    try {
      await FileSystem.moveAsync({
        from: imageUri,
        to: newPath,
      });
      const dbResult = await insertPlace(
        title,
        newPath,
        address,
        location.lat,
        location.lng
      );

      dispatch({
        type: ADD_PLACE,
        placeData: {
          id: dbResult.insertId,
          title,
          imageUri: newPath,
          address,
          coords: {
            lat: location.lat,
            lng: location.lng,
          },
        },
      });
    } catch (err) {
      throw err;
    }
  };
};

export const loadPlaces = () => {
  return async (dispatch) => {
    try {
      const dbResult = await fetchPlaces();
      dispatch({ type: SET_PLACES, places: dbResult.rows._array });
    } catch (err) {
      throw err;
    }
  };
};
