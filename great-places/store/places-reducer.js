import { ADD_PLACE, SET_PLACES } from './places-actions';
import Place from '../modules/place';

const initialState = {
  places: [],
};

export default (state = initialState, actions) => {
  switch (actions.type) {
    case SET_PLACES:
      return {
        places: actions.places.map(
          (place) =>
            new Place(
              place.id.toString(),
              place.title,
              place.imageUri,
              place.address,
              place.lat,
              place.lng
            )
        ),
      };
    case ADD_PLACE:
      const newPlace = new Place(
        actions.placeData.id.toString(),
        actions.placeData.title,
        actions.placeData.imageUri,
        actions.placeData.address,
        actions.placeData.coords.lat,
        actions.placeData.coords.lng
      );

      return {
        places: state.places.concat(newPlace),
      };
    default:
      return state;
  }
};
