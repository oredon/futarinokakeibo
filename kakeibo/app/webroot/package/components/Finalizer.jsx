import React, { PropTypes, Component } from 'react';
import mui, {Snackbar, Styles} from 'material-ui';
import MyRawTheme from '../src/material_ui_raw_theme_file';

// AJAXファイナライザー
class Finalizer extends Component {
  static get childContextTypes() {
    return { muiTheme: React.PropTypes.object };
  }

  getChildContext(){
    return {  muiTheme: Styles.ThemeManager.getMuiTheme(MyRawTheme)};
  }

  /**
   * noticeバーを閉じたときに実行
   * @param  {Boolean} isRunFinalize Finalize処理を走らせるか否か
   */
  handleRequestClose(isRunFinalize){
    if( isRunFinalize ){
      //追加・編集AJAX後
      if( this.props.actionsEdit ){
        this.props.actionsEdit.finalizeSend(true);
      }

      //削除AJAX後
      if( this.props.actionsDel ){
        this.props.actionsDel.finalizeDel();
        setTimeout((function(){
          //reload
          this.props.actionsMonthly.fetchMonthlyData({start: this.props.monthly.startYear + this.props.monthly.startMonth})
        }).bind(this),100)
      }
    }
  }

  render() {
    let isShow = false;        // noticeを表示するか否か
    let msg = "";              // メッセテキスト
    let isRunFinalize = false; // finalize有無

    //追加／編集用Finalize設定
    if( this.props.edit ){
      if( this.props.edit.isPostSuccess || this.props.edit.isPostError ){
        isShow = true;
        msg = this.props.edit.data.msg;
      }
      if( this.props.edit.isPostSuccess ){
        if( this.props.edit.data.isNew === "1" ){
          //成功時 かつ 新規投稿のときのみfinalizeを走らせる
          isRunFinalize = true;
        }
      }
    }

    //削除用Finalize設定
    if( this.props.del ){
      if( this.props.del.isDelSuccess || this.props.del.isDelError ){
        isShow = true;
        msg = this.props.del.data.msg;
      }
      if( this.props.del.isDelSuccess ){
        //成功時のみfinalizeを走らせる
        isRunFinalize = true;
      }
    }
    return (
      <Snackbar
        open={isShow}
        message={msg}
        autoHideDuration={1000}
        onRequestClose={this.handleRequestClose.bind(this, isRunFinalize)} />
    );
  }
}


Finalizer.propTypes = {
  edit: PropTypes.shape({
    data: PropTypes.any,
    entry: PropTypes.object,
    isGet: PropTypes.bool,
    isGetSuccess: PropTypes.bool,
    isGetError: PropTypes.bool,
    isPosting: PropTypes.bool,
    isPostSuccess: PropTypes.bool,
    isPostError: PropTypes.bool
  }),
  actionsEdit: PropTypes.shape({
    finalizeSend: PropTypes.func,
    getData: PropTypes.func,
    sendData: PropTypes.func
  }),
  monthly: PropTypes.shape({
    data: PropTypes.object,
    isPosting: PropTypes.bool,
    isPostSuccess: PropTypes.bool,
    isPostError: PropTypes.bool,
    startYear: PropTypes.any,
    startMonth: PropTypes.any,
    startDate: PropTypes.any
  }),
  actionsMonthly: PropTypes.shape({
    fetchMonthlyData: PropTypes.func
  }),
  del: PropTypes.shape({
    isDel: PropTypes.bool,
    isDelSuccess: PropTypes.bool,
    isDelError: PropTypes.bool
  }),
  actionsDel: PropTypes.shape({
    finalizeDel: PropTypes.func,
    delData: PropTypes.func
  })
};

export default Finalizer;
