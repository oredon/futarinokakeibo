import Axios from 'axios';
import { SEND_DATA, SEND_SUCCESS, SEND_FAILURE, SEND_FINALIZE, GET_DATA, GET_SUCCESS, GET_FAILURE, SEND_RESET } from '../constants/ActionTypes';
import { ajaxUrl } from '../src/config';

/**
 * エントリー書き込みAJAX後のアクション生成
 * @return {Object} 削除ファイナライズアクション
 */
export function finalizeSend(isReset){
  return {
    type: SEND_FINALIZE,
    isReset: isReset
  }
}

export function doneReset(){
  return {
    type: SEND_RESET
  }
}

/**
 * エントリー書き込みAJAXの通信アクション
 * @return {Object} 削除通信中アクション->通信完了アクション
 */
export function sendData(data) {
  let params = new URLSearchParams();
  let i;

  // AJAXパラメータオブジェクトを生成
  for(i in data){
    params.append(i, data[i]);
  }

  return dispatch => {
    // 通信中アクションを実行
    dispatch(sendRequest(data));

    // AJAX
    Axios.post(
      ajaxUrl.editData,
      params,
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    ).then(
      response => dispatch(sendResult(response.data))
    ).catch(
      () => dispatch(sendResult({status: "0", msg: "データの書き込みに失敗しました。通信状況を確認してください"}))
    )
  }
}

/**
 * 通信中アクションを返却
 * @param  {Object} requestData AJAXリクエストパラメータ
 * @return {Object} 削除通信中アクション
 */
function sendRequest(requestData){
  return {
    type: SEND_DATA,
    requestData: requestData
  }
}

/**
 * 成否判定
 * @param  {Object} data AJAXレスポンス
 * @return {Object}      成否に準じたアクション
 */
function sendResult(data){
  if(data.status === "1"){
    return sendSuccess(data);
  }else{
    return sendError(data);
  }
}

/**
 * 通信完了アクションを返却
 * @param  {Object} data AJAXリクエストパラメータ
 * @return {Object}      通信完了アクションを
 */
function sendSuccess(data){
  return {
    type: SEND_SUCCESS,
    data: data
  }
}

/**
 * 通信完了アクションを返却
 * @param  {Object} requestData AJAXリクエストパラメータ
 * @return {Object} 通信エラーアクションを
 */
function sendError(data){
  return {
    type: SEND_FAILURE,
    data: data
  }
}

/**
 * 単一エントリー取得AJAX後のアクション生成
 * @return {Object} 削除ファイナライズアクション
 */
export function getData(data) {
  let params = new URLSearchParams();
  let i;
  for(i in data){
    params.append(i, data[i]);
  }
  return dispatch => {
    dispatch(getRequest(data));
    Axios.post(
      ajaxUrl.getData,
      params,
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    ).then(
      response => dispatch(getResult(response.data))
    ).catch(
      () => dispatch(getResult(false))
    )
  }
}

/**
 * 通信中アクションを返却
 * @param  {Object} requestData AJAXリクエストパラメータ
 * @return {Object} 削除通信中アクション
 */
function getRequest(requestData){
  return {
    type: GET_DATA
  }
}

/**
 * 成否判定
 * @param  {Object} data AJAXレスポンス
 * @return {Object}      成否に準じたアクション
 */
function getResult(data){
  if(data.status === "1"){
    return getSuccess(data);
  }else{
    return getError(data);
  }
}

/**
 * 通信完了アクションを返却
 * @param  {Object} data AJAXリクエストパラメータ
 * @return {Object}      通信完了アクションを
 */
function getSuccess(entry){
  return {
    type: GET_SUCCESS,
    entry: entry
  }
}


/**
 * 通信完了アクションを返却
 * @param  {Object} requestData AJAXリクエストパラメータ
 * @return {Object} 通信エラーアクションを
 */
function getError(data){
  return {
    type: GET_FAILURE,
    data: data
  }
}
