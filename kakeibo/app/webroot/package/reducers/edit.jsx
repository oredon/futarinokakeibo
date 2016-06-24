import { SEND_DATA, SEND_FAILURE, SEND_SUCCESS, SEND_FINALIZE, GET_DATA, GET_FAILURE, GET_SUCCESS, SEND_RESET } from '../constants/ActionTypes';

const initialState = {
  isPosting: false,
  isPostSuccess: false,
  isPostError: false,
  isReset: false,
  data: {
    status: 1,
    msg: "default msg."
  },
  isGet: false,
  isGetSuccess: false,
  isGetError: false,
  entry: {}
}

export default function edit(state = initialState, action){
  switch (action.type){
    case SEND_DATA:
      return Object.assign({}, state, {
        isPosting: true,
        isPostSuccess: false,
        isPostError: false
      });
    case SEND_SUCCESS:
      return Object.assign({}, state, {
        isPosting: false,
        isPostSuccess: true,
        isPostError: false,
        data: action.data
      });
    case SEND_FAILURE:
      return Object.assign({}, state, {
        isPosting: false,
        isPostSuccess: false,
        isPostError: true,
        data: action.data
      });
    case SEND_FINALIZE:
      return Object.assign({}, state, {
        isPosting: false,
        isPostSuccess: false,
        isPostError: false,
        isGet: false,
        isGetSuccess: false,
        isGetError: false,
        isReset: action.isReset
      });
    case SEND_RESET:
      return Object.assign({}, state, {
        isReset: false
      });
    case GET_DATA:
      return Object.assign({}, state, {
        isGet: true,
        isGetSuccess: false,
        isGetError: false
      });
    case GET_SUCCESS:
      return Object.assign({}, state, {
        isGet: false,
        isGetSuccess: true,
        isGetError: false,
        entry: action.entry
      });
    case GET_FAILURE:
      return Object.assign({}, state, {
        isGet: false,
        isGetSuccess: false,
        isGetError: true,
        data: action.data
      });
    default:
      return state;
  }
}
