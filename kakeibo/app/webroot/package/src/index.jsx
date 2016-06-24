import React from "react";
import ReactDOM from "react-dom";
import injectTapEventPlugin from "react-tap-event-plugin";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import App from '../containers/App';
import Add from '../containers/Add';
import Year from '../containers/Year';
import configureStore from '../store/configureStore';

//Needed for React Developer Tools
window.React = React;

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

const store = configureStore();

// initial dispatch for index page.
import { fetchMonthlyData } from '../actions/monthly';

// router history
const pageHistory = syncHistoryWithStore(browserHistory, store);
pageHistory.listen(function(location){
  // 月別データ表示
  if(location.pathname.match(/monthly/)){
    store.dispatch(fetchMonthlyData({start: location.pathname.slice(-6)}));
  }
  // インデックスに戻ってきた際、PHP側でtplに吐き出された現在年月から該当月データを取得
  if(location.pathname === '/kakeibo/forms/index'){
    store.dispatch(fetchMonthlyData({start: startYear + startMonth}));
  }

  // yearlyデータはhistory.listenによる監視ではなく
  // routerParamsとlocalstateの差を見て初回AJAX実行の有無を分岐
  // component/BarChart参照
  // monthlyコンポーネント群はyearlyとTOPとmonthlyの3ページで使用されるため
  // コンポーネント内に初回AJAX実行の有無分岐を混ぜると見通しが悪そうだったため
  // listenで対応
});

// render with router.
ReactDOM.render(
  <Provider store={store}>
    <Router history={pageHistory}>
      <Route path="/kakeibo/forms/index" component={App}>
        <Route path="/kakeibo/forms/index/monthly/:yearmonth" component={App} />
      </Route>
      <Route path="/kakeibo/forms/index/add" component={Add}>
        <Route path="/kakeibo/forms/index/add/:entryid" component={Add} />
      </Route>
      <Route path="/kakeibo/forms/index/year/:year" component={Year}>
      </Route>
    </Router>
  </Provider>,
  document.getElementById("root")
);
