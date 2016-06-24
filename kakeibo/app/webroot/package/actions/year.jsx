import Axios from 'axios';
import { YEAR_POSTS, YEAR_FAILURE, YEAR_SUCCESS } from '../constants/ActionTypes';
import { ajaxUrl } from '../src/config';

/**
 * 年別データ取得AJAXの通信アクション
 * @return {Object} 削除通信中アクション->通信完了アクション
 */
export function fetchYearData(data) {
  let params = new URLSearchParams();
  let i;
  for(i in data){
    params.append(i, data[i]);
  }
  return dispatch => {
    dispatch(fetchYearDataRequest(data));
    Axios.post(
      ajaxUrl.getYearData,
      params,
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    ).then(
      response => dispatch(fetchYearDataResult(response.data))
    ).catch(
      () => dispatch(fetchYearDataResult(false))
    )
  }
}

/**
 * 通信中アクションを返却
 * @param  {Object} requestData AJAXリクエストパラメータ
 * @return {Object} 削除通信中アクション
 */
function fetchYearDataRequest(requestData){
  return {
    type: YEAR_POSTS,
    requestData: requestData
  }
}

/**
 * 成否判定
 * @param  {Object} data AJAXレスポンス
 * @return {Object}      成否に準じたアクション
 */
function fetchYearDataResult(data){
  if(data.status === "1"){
    return fetchYearDataSuccess(data);
  }else{
    return fetchYearDataError(data);
  }
}

/**
 * 通信完了アクションを返却
 * @param  {Object} data AJAXリクエストパラメータ
 * @return {Object}      通信完了アクション
 */
function fetchYearDataSuccess(data){
  return {
    type: YEAR_SUCCESS,
    data: data
  }
}

/**
 * 通信完了アクションを返却
 * @param  {Object} data AJAXリクエストパラメータ
 * @return {Object}      通信エラーアクション
 */
function fetchYearDataError(data){
  return {
    type: YEAR_FAILURE,
    data: data
  }
}
