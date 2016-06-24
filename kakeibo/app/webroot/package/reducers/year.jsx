import { YEAR_POSTS, YEAR_FAILURE, YEAR_SUCCESS } from '../constants/ActionTypes';

const initialState = {
  isYear: false,
  isYearSuccess: false,
  isYearError: false
}

export default function year(state = initialState, action){
  switch (action.type){
    case YEAR_POSTS:
      return Object.assign({}, state, {
        isYear: true,
        isYearSuccess: false,
        isYearError: false
      });
    case YEAR_SUCCESS:
      return Object.assign({}, state, {
        isYear: false,
        isYearSuccess: true,
        isYearError: false,
        data: action.data
      });
    case YEAR_FAILURE:
      return Object.assign({}, state, {
        isYear: false,
        isYearSuccess: false,
        isYearError: true,
        data: action.data
      });
    default:
      return state;
  }
}
