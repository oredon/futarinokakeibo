/*
年データ
 */
import React, { Component, PropTypes } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Loading from '../components/Loading';
import BarChart from '../components/BarChart';
import PieChart from '../components/PieChart';
import CircleChart from '../components/CircleChart';
import DetailTable from '../components/DetailTable';
import Finalizer from '../components/Finalizer';
import * as Monthly from '../actions/monthly';
import * as DrawMenu from '../actions/drawMenu';
import * as aYear from '../actions/year';
import * as Del from '../actions/del';

class Year extends Component {
  render() {
    const { routerParams, drawmenu, actionsDrawMenu, year, actionsYear, monthly, del, actionsDel, actionsMonthly } = this.props;

    return (
      <div>
        <Header drawmenu={drawmenu} actionsDrawMenu={actionsDrawMenu} />
        <Sidebar drawmenu={drawmenu} actionsDrawMenu={actionsDrawMenu} />
        <BarChart year={year} actionsYear={actionsYear} routerParams={routerParams} monthly={monthly} actionsMonthly={actionsMonthly} />

        <h2>{this.props.year.isYearError ? this.props.year.data.msg : this.props.monthly.startYear + "年" + this.props.monthly.startMonth + "月"}</h2>
        <div className="twoCol">
          <div className="left">
            <PieChart monthly={monthly} />
          </div>
          <div className="right">
            <CircleChart monthly={monthly} />
          </div>
        </div>
        <DetailTable monthly={monthly} actionsDel={actionsDel} del={del} />
        <Finalizer del={del} actionsDel={actionsDel} monthly={monthly} actionsMonthly={actionsMonthly} />
        <Loading year={year} monthly={monthly} />
      </div>
    );
  }
}


function mapStateToProps(state, ownProps) {
  return {
    drawmenu: state.drawmenu,
    year: state.year,
    monthly: state.monthly,
    del: state.del,
    routerParams: ownProps.params
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actionsMonthly: bindActionCreators(Monthly, dispatch),
    actionsDrawMenu: bindActionCreators(DrawMenu, dispatch),
    actionsYear: bindActionCreators(aYear, dispatch),
    actionsDel: bindActionCreators(Del, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Year);
