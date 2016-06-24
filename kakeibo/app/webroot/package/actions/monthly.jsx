import Axios from 'axios';
import { REQUSET_POSTS, FETCHED_POSTS_FAILURE, FETCHED_POSTS_SUCCESS } from '../constants/ActionTypes';
import { ajaxUrl } from '../src/config';

/**
 * 月別データ取得AJAXの通信アクション
 * @return {Object} 削除通信中アクション->通信完了アクション
 */
export function fetchMonthlyData(data) {
  let params = new URLSearchParams();
  let i;

  // AJAXパラメータオブジェクトを生成
  for(i in data){
    params.append(i, data[i]);
  }

  return dispatch => {
    // 通信中アクションを実行
    dispatch(fetchMonthlyDataRequest(data));

    // AJAX
    Axios.post(
      ajaxUrl.getMonthData,
      params,
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    ).then(
      response => dispatch(fetchMonthlyDataResult(response.data))
    ).catch(
      () => dispatch(fetchMonthlyDataResult({status: "0", msg: "月別データの取得に失敗しました。通信状況を確認してください"}))
    )
  }
}

/**
 * 通信中アクションを返却
 * @param  {Object} requestData AJAXリクエストパラメータ
 * @return {Object} 削除通信中アクション
 */
function fetchMonthlyDataRequest(requestData){
  return {
    type: REQUSET_POSTS,
    requestData: requestData
  }
}

/**
 * 成否判定
 * @param  {Object} data AJAXレスポンス
 * @return {Object}      成否に準じたアクション
 */
function fetchMonthlyDataResult(data){
  if(data.status === "1"){
    return fetchMonthlyDataSuccess(data);
  }else{
    return fetchMonthlyDataError(data);
  }
}

/**
 * 通信完了アクションを返却
 * @param  {Object} data AJAXリクエストパラメータ
 * @return {Object}      通信完了アクション
 */
function fetchMonthlyDataSuccess(data){
  return {
    type: FETCHED_POSTS_SUCCESS,
    data: data
  }
}

/**
 * 通信完了アクションを返却
 * @param  {Object} requestData AJAXリクエストパラメータ
 * @return {Object} 通信エラーアクション
 */
function fetchMonthlyDataError(data){
  return {
    type: FETCHED_POSTS_FAILURE,
    data: data
  }
}
