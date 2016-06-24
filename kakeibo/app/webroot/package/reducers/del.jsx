import { DEL_DATA, DEL_FAILURE, DEL_SUCCESS, DEL_FINALIZE } from '../constants/ActionTypes';

const initialState = {
  isDel: false,
  isDelSuccess: false,
  isDelError: false
}

export default function del(state = initialState, action){
  switch (action.type){
    case DEL_DATA:
      return Object.assign({}, state, {
        isDel: true,
        isDelSuccess: false,
        isDelError: false
      });
    case DEL_SUCCESS:
      return Object.assign({}, state, {
        isDel: false,
        isDelSuccess: true,
        isDelError: false,
        data: action.data
      });
    case DEL_FAILURE:
      return Object.assign({}, state, {
        isDel: false,
        isDelSuccess: false,
        isDelError: true,
        data: action.data
      });
    case DEL_FINALIZE:
      return Object.assign({}, state, {
        isDel: false,
        isDelSuccess: false,
        isDelError: false
      });
    default:
      return state;
  }
}
