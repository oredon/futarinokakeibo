import Axios from 'axios';
import { DEL_DATA, DEL_FAILURE, DEL_SUCCESS, DEL_FINALIZE } from '../constants/ActionTypes';
import { ajaxUrl } from '../src/config';

/**
 * エントリー削除AJAX後のアクション生成
 * @return {Object} 削除ファイナライズアクション
 */
export function finalizeDel(){
  return {
    type: DEL_FINALIZE
  }
}

/**
 * エントリー削除AJAXの通信アクション
 * @return {Object} 削除通信中アクション->通信完了アクション
 */
export function delData(data) {
  let params = new URLSearchParams();
  let i;

  // AJAXパラメータオブジェクトを生成
  for(i in data){
    params.append(i, data[i]);
  }

  return dispatch => {
    // 通信中アクションを実行
    dispatch(delDataRequest(data));

    // AJAX
    Axios.post(
      ajaxUrl.delData,
      params,
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    ).then(
      response => dispatch(delDataResult(response.data))
    ).catch(
      () => dispatch(delDataResult({status: "0", msg: "削除に失敗しました。通信状況を確認してください"}))
    )
  }
}

/**
 * 通信中アクションを返却
 * @param  {Object} requestData AJAXリクエストパラメータ
 * @return {Object} 削除通信中アクション
 */
function delDataRequest(requestData){
  return {
    type: DEL_DATA,
    requestData: requestData
  }
}

/**
 * 成否判定
 * @param  {Object} data AJAXレスポンス
 * @return {Object}      成否に準じたアクション
 */
function delDataResult(data){
  if(data.status === "1"){
    return delDataSuccess(data);
  }else{
    return delDataError(data);
  }
}

/**
 * 通信完了アクションを返却
 * @param  {Object} data AJAXリクエストパラメータ
 * @return {Object}      通信完了アクションを
 */
function delDataSuccess(data){
  return {
    type: DEL_SUCCESS,
    data: data
  }
}

/**
 * 通信完了アクションを返却
 * @param  {Object} requestData AJAXリクエストパラメータ
 * @return {Object} 通信エラーアクションを
 */
function delDataError(data){
  return {
    type: DEL_FAILURE,
    data: data
  }
}
