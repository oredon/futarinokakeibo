import React, { PropTypes, Component } from 'react';
import mui, {Styles, Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, FlatButton} from 'material-ui';
import { Link } from 'react-router';
import MyRawTheme from '../src/material_ui_raw_theme_file';

// テーブルセル デフォルトスタイル
const cellStyle = {
  padding: 0,
  overflow: 'visible',
  whiteSpace: 'normal'
}

class DetailTable extends Component {
  static get childContextTypes() {
    return { muiTheme: React.PropTypes.object };
  }

  getChildContext(){
    return {  muiTheme: Styles.ThemeManager.getMuiTheme(MyRawTheme)};
  }

  delClick(entryid) {
    if(window.confirm("エントリーを削除します。よろしいですか？")){
      this.props.actionsDel.delData({id: entryid});
    }
  }

  render() {
    let _tmpl=[];
    // データからtbodyを生成
    if(this.props.monthly.data){
      let idx;
      for(idx in this.props.monthly.data.detail){
        _tmpl.push(
          <TableRow key={this.props.monthly.data.detail[idx].Form.id}>
            <TableRowColumn style={cellStyle}>
              <Link to={'/kakeibo/forms/index/add/' + this.props.monthly.data.detail[idx].Form.id}><FlatButton label="編集" secondary={true} /></Link>
              <br />
              <FlatButton label="削除" primary={true} onClick={this.delClick.bind(this, this.props.monthly.data.detail[idx].Form.id)} />
            </TableRowColumn>
            <TableRowColumn style={cellStyle}>{this.props.monthly.data.detail[idx].Form.date}</TableRowColumn>
            <TableRowColumn style={cellStyle}>{this.props.monthly.data.detail[idx].Form.title}</TableRowColumn>
            <TableRowColumn style={cellStyle}>{this.props.monthly.data.category[this.props.monthly.data.detail[idx].Form.category_id]}</TableRowColumn>
            <TableRowColumn style={cellStyle}>{this.props.monthly.data.detail[idx].Form.price}</TableRowColumn>
            <TableRowColumn style={cellStyle}>{this.props.monthly.data.detail[idx].Form.pay_danna}</TableRowColumn>
            <TableRowColumn style={cellStyle}>{this.props.monthly.data.detail[idx].Form.pay_yome}</TableRowColumn>
            <TableRowColumn style={cellStyle}>{this.props.monthly.data.detail[idx].Form.description}</TableRowColumn>
          </TableRow>
        )
      }
    }
    return (
      <div id="detailTableWrap" className={this.props.monthly.isPostSuccess ? "detailTableWrap showDis" : "detailTableWrap hideDis"}>
        <Table>
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn style={{overflow: 'visible', padding: 0}}> </TableHeaderColumn>
              <TableHeaderColumn style={{overflow: 'visible', padding: 0}}>購入日</TableHeaderColumn>
              <TableHeaderColumn style={{overflow: 'visible', padding: 0}}>タイトル</TableHeaderColumn>
              <TableHeaderColumn style={{overflow: 'visible', padding: 0}}>カテゴリー</TableHeaderColumn>
              <TableHeaderColumn style={{overflow: 'visible', padding: 0}}>支払い金額</TableHeaderColumn>
              <TableHeaderColumn style={{overflow: 'visible', padding: 0}}>旦那支払</TableHeaderColumn>
              <TableHeaderColumn style={{overflow: 'visible', padding: 0}}>嫁支払</TableHeaderColumn>
              <TableHeaderColumn style={{overflow: 'visible', padding: 0}}>備考</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
          {(() => {
            if (_tmpl.length > 0) {
              return _tmpl;
            }
          })()}
          </TableBody>
        </Table>
      </div>
    );
  }
}

DetailTable.propTypes = {
	monthly: PropTypes.shape({
		data: PropTypes.object,
		isPosting: PropTypes.bool.isRequired,
		isPostSuccess: PropTypes.bool.isRequired,
		isPostError: PropTypes.bool.isRequired,
		startYear: PropTypes.any.isRequired,
		startMonth: PropTypes.any.isRequired,
		startDate: PropTypes.any.isRequired
	}),
  del: PropTypes.shape({
    isDel: PropTypes.bool.isRequired,
    isDelSuccess: PropTypes.bool.isRequired,
    isDelError: PropTypes.bool.isRequired
  }),
  actionsDel: PropTypes.shape({
    finalizeDel: PropTypes.func.isRequired,
    delData: PropTypes.func.isRequired
  })
};

export default DetailTable;
