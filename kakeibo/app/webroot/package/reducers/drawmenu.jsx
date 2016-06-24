import { TOGGLE_MENU } from '../constants/ActionTypes';

const initialState = {
  isOpen: false
}

export default function monthly(state = initialState, action){
  switch (action.type){
    case TOGGLE_MENU:
      return Object.assign({}, state, {
        isOpen: action.isOpen
      });
    default:
      return state;
  }
}
