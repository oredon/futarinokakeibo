/*
月別データ
 */
import React, { Component, PropTypes } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Loading from '../components/Loading';
import PieChart from '../components/PieChart';
import CircleChart from '../components/CircleChart';
import DetailTable from '../components/DetailTable';
import MonthChanger from '../components/MonthChanger';
import Finalizer from '../components/Finalizer';
import * as Monthly from '../actions/monthly';
import * as DrawMenu from '../actions/drawMenu';
import * as Del from '../actions/del';


class App extends Component {
  render() {
    const { actionsMonthly, monthly, drawmenu, actionsDrawMenu, del, actionsDel } = this.props;

    return (
      <div>
        <Header drawmenu={drawmenu} actionsDrawMenu={actionsDrawMenu} />
        <Sidebar drawmenu={drawmenu} actionsDrawMenu={actionsDrawMenu} />
        <MonthChanger monthly={monthly} actionsMonthly={actionsMonthly} />
        <h2>{this.props.monthly.isPostError ? this.props.monthly.data.msg : this.props.monthly.startYear + "年" + this.props.monthly.startMonth + "月"}</h2>
        <div className="twoCol">
          <div className="left">
            <PieChart monthly={monthly} />
          </div>
          <div className="right">
            <CircleChart monthly={monthly} />
          </div>
        </div>
        <DetailTable monthly={monthly} del={del} actionsDel={actionsDel} />
        <Finalizer del={del} actionsDel={actionsDel} monthly={monthly} actionsMonthly={actionsMonthly} />
        <Loading monthly={monthly} del={del} />
      </div>
    );
  }
}


function mapStateToProps(state, ownProps) {
  return {
    monthly: state.monthly,
    drawmenu: state.drawmenu,
    del: state.del
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actionsMonthly: bindActionCreators(Monthly, dispatch),
    actionsDrawMenu: bindActionCreators(DrawMenu, dispatch),
    actionsDel: bindActionCreators(Del, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
