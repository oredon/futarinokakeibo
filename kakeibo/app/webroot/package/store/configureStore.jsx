import { applyMiddleware, compose, createStore } from 'redux';
import Thunk from 'redux-thunk';
import rootReducer from '../reducers';
import { routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router'

/**
 * Redux Storeの設定
 * @return {Object} ミドルウェア適用済みRedux Store
 */
export default function configureStore() {
  const router_middleware = routerMiddleware(browserHistory);

  //composeで複数ミドルウェアを適用したstore生成関数を構築
  const finalCreateStore = compose(
    applyMiddleware(Thunk),
    applyMiddleware(router_middleware)
  )(createStore);

  //ミドルウェア適用済みRedux Storeを返却
  return finalCreateStore(rootReducer);
}
