/*
データ書き込み
 */
import React, { Component, PropTypes } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Loading from '../components/Loading';
import InputPage from '../components/InputPage';
import Finalizer from '../components/Finalizer';
import * as Monthly from '../actions/monthly';
import * as DrawMenu from '../actions/drawMenu';
import * as Edit from '../actions/edit';

class Add extends Component {
  render() {
    const { routerParams, drawmenu, actionsDrawMenu, edit, actionsEdit} = this.props;

    return (
      <div>
        <Header drawmenu={drawmenu} actionsDrawMenu={actionsDrawMenu} />
        <Sidebar drawmenu={drawmenu} actionsDrawMenu={actionsDrawMenu} />
        <InputPage edit={edit} actionsEdit={actionsEdit} routerParams={routerParams} />
        <Loading edit={edit} />
        <Finalizer edit={edit} actionsEdit={actionsEdit} />
      </div>
    );
  }
}


function mapStateToProps(state, ownProps) {
  return {
    drawmenu: state.drawmenu,
    edit: state.edit,
    routerParams: ownProps.params
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actionsDrawMenu: bindActionCreators(DrawMenu, dispatch),
    actionsEdit: bindActionCreators(Edit, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Add);
