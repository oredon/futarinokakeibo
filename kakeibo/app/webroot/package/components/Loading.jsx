import React, { PropTypes, Component } from 'react';
import mui, {CircularProgress, Styles} from 'material-ui';
import MyRawTheme from '../src/material_ui_raw_theme_file';

class Loading extends Component {
  static get childContextTypes() {
    return { muiTheme: React.PropTypes.object };
  }

  getChildContext(){
    return {  muiTheme: Styles.ThemeManager.getMuiTheme(MyRawTheme)};
  }

  render() {
    let isPostingFlg = false;
    if(this.props.monthly){
      isPostingFlg = this.props.monthly.isPosting;
    }else if(this.props.edit){
      if( this.props.edit.isPosting || this.props.edit.isGet ){
        isPostingFlg = true;
      }
    }
    if(this.props.del && this.props.del.isDel === true){
      isPostingFlg = true;
    }
    if(this.props.year && this.props.year.isYear === true){
      isPostingFlg = true;
    }
    return (
      <div id="loading" className={isPostingFlg ? "loading showDis" : "loading hideDis"}>
        <div id="loadingBg" className="loadingBg"></div>
        <div id="loadingImg" className="loadingImg">
          <CircularProgress title="家計簿管理システム" />
        </div>
      </div>
    );
  }
}

/*
Loading.propTypes = {

};
*/

export default Loading;
