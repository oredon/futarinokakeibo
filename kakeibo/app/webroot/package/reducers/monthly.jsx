import { REQUSET_POSTS, FETCHED_POSTS_FAILURE, FETCHED_POSTS_SUCCESS } from '../constants/ActionTypes';

const initialState = {
  isPosting: false,
  isPostSuccess: false,
  isPostError: false,
  startYear: startYear,
  startMonth: startMonth,
  startDate: startDate
}

export default function monthly(state = initialState, action){
  switch (action.type){
    case REQUSET_POSTS:
      let changedY = action.requestData.start.slice(0,4);
      let changedM = action.requestData.start.slice(-2);
      return Object.assign({}, state, {
        isPosting: true,
        isPostSuccess: false,
        isPostError: false,
        startYear: changedY,
        startMonth: changedM,
        startDate: "01"
      });
    case FETCHED_POSTS_SUCCESS:
      return Object.assign({}, state, {
        isPosting: false,
        isPostSuccess: true,
        isPostError: false,
        data: action.data
      });
    case FETCHED_POSTS_FAILURE:
      return Object.assign({}, state, {
        isPosting: false,
        isPostSuccess: false,
        isPostError: true,
        data: action.data
      });
    default:
      return state;
  }
}
