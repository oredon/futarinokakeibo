import React, { PropTypes, Component } from 'react';
import ReactDOM from "react-dom";
import mui, {AppBar, Styles, AutoComplete, DatePicker, SelectField, MenuItem, TextField, FlatButton, FontIcon} from 'material-ui';
import MyRawTheme from '../src/material_ui_raw_theme_file';

let isEditAjaxFlg = false;
class InputPage extends Component {
  constructor(props) {
    super(props);

    isEditAjaxFlg = false;

    // 非redux管理のローカルstate
    // このページを表示した際に入力フォームをクリアにするためdefault値を挿入
    this.state = this.getDefaultState();

    if(this.props.routerParams && this.props.routerParams.entryid){
      //編集対象となる記事を取得してローカルstateに挿入
      this.props.actionsEdit.getData({id : this.props.routerParams.entryid});
    }else{
      //AJAX不要＝新規入力
      isEditAjaxFlg = true;
    }
  }

  static get childContextTypes() {
    return { muiTheme: React.PropTypes.object };
  }

  getChildContext(){
    return {  muiTheme: Styles.ThemeManager.getMuiTheme(MyRawTheme)};
  }

  /**
   * デフォルトのローカルステートを取得
   * @return {Object} default state
   */
  getDefaultState(){
    let _date = new Date();
    return {
      date: _date.getFullYear() + "-" + this.zeroPadding(_date.getMonth() + 1, 2) + "-" + this.zeroPadding(_date.getDate(), 2),
      title: "",
      category_id: 1,
      price: "",
      pay_danna: "",
      pay_yome: "",
      description: ""
    }
  }

  componentWillReceiveProps(nextProps){
    if( this.props.routerParams.entryid && nextProps.routerParams.entryid === undefined ){
      this.setState({id: 0});
      this.props.actionsEdit.finalizeSend(true);
    }
  }

  componentDidUpdate(){
    //新規入力直後にaction経由でisResetが渡されてきたとき
    if(this.props.edit.isReset === true){
      this.setState(this.getDefaultState());
      this.props.actionsEdit.doneReset();
    }

    //編集時、エントリーデータ取得直後に1度だけstateを更新
    if(this.props.edit.isGetSuccess === true){
      if(isEditAjaxFlg === false){
        isEditAjaxFlg = true;
        this.setState({
          id: this.props.edit.entry.Form.id,
          date: this.props.edit.entry.Form.date,
          title: this.props.edit.entry.Form.title,
          category_id: this.props.edit.entry.Form.category_id,
          price: this.props.edit.entry.Form.price ? this.props.edit.entry.Form.price : "",
          pay_danna: this.props.edit.entry.Form.pay_danna ? this.props.edit.entry.Form.pay_danna : "",
          pay_yome: this.props.edit.entry.Form.pay_yome ? this.props.edit.entry.Form.pay_yome : "",
          description: this.props.edit.entry.Form.description ? this.props.edit.entry.Form.description : ""
        });
      }
    }
  }

  /**
   * 数字から指定桁数で0埋めした文字列を返す
   * @param  {Number} number ターゲットとなる数値
   * @param  {Number} length 桁数
   * @return {String}        0埋めした文字列
   */
  zeroPadding(number, length = 1) {
    return (Array(length).join("0") + number).slice(-length);
  }

  /**
   * 汎用フォーム入力値->state反映処理
   * @param  {Object} event イベントオブジェクト
   */
  handleChangeFormValue(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
   * Auto Completeの入力値が変更されたときにstateへ反映
   * @param  {String} str 入力値
   */
  handleChangeFormValueForTitle(str) {
    this.setState({
      title: str
    });
  }

  /**
   * Date Pickerの入力値が変更されたときにstateへ反映
   * @param  {Event} event  更新イベント
   * @param  {Object} date  Dateオブジェクト
   */
  handleChangeFormValueForDate(event, date) {
    this.setState({
      date: date.getFullYear() + "-" + this.zeroPadding(date.getMonth() + 1, 2) + "-" +  this.zeroPadding(date.getDate(), 2)
    });
  }

  /**
   * ボタン操作handler 全額旦那ボタン
   */
  allDanna() {
    this.setState({pay_danna: this.state.price, pay_yome: ""})
  }

  /**
   * ボタン操作handler 全額嫁ボタン
   */
  allYome() {
    this.setState({pay_yome: this.state.price, pay_danna: ""})
  }

  /**
   * ボタン操作handler 差額計算ボタン
   */
  attachDiff() {
    if(this.state.price){
      let _diff = 0;
      let _all = parseInt(this.state.price, 10);
      let _tgt = 0;
      if(this.state.pay_danna){
        _tgt = parseInt(this.state.pay_danna, 10);
        this.setState({pay_yome: "" + (_all - _tgt)});
      }else if(this.state.pay_yome){
        _tgt = parseInt(this.state.pay_yome, 10);
        this.setState({pay_danna: "" + (_all - _tgt)});
      }
    }
  }

  /**
   * SUBMIT時の処理
   */
  sendAjax() {
    this.props.actionsEdit.sendData(this.state);
  }

  render() {
    let i;
    let idx;
    let arrayOptions = [];
    for(i in categoryOptions){
      for(idx in categoryOptions[i]){
        arrayOptions.push(<option value={idx} key={idx}>{categoryOptions[i][idx]}</option>);
      }
    }
    return (
      <div>
        <table className="editTable">
          <tbody>
            <tr>
              <th>
                購入日
              </th>
              <td>
                <DatePicker ref="myDate" hintText="タップするとカレンダーが開きます" formatDate={(dt) => `${dt.getFullYear()}-${this.zeroPadding(dt.getMonth() + 1, 2)}-${this.zeroPadding(dt.getDate(), 2)}`} autoOk={true}  onChange={this.handleChangeFormValueForDate.bind(this)} value={new Date(this.state.date.split("-")[0],this.state.date.split("-")[1] - 1,this.state.date.split("-")[2])} />
              </td>
            </tr>
            <tr>
              <th>
                商品名
              </th>
              <td>
              <AutoComplete
                ref="myTitle"
                filter={AutoComplete.fuzzyFilter}
                searchText={this.state.title}
                dataSource={product}
                maxSearchResults={5}
                onUpdateInput={this.handleChangeFormValueForTitle.bind(this)}
                onNewRequest={this.handleChangeFormValueForTitle.bind(this)}
              />
              </td>
            </tr>
            <tr>
              <th>
                カテゴリー
              </th>
              <td>
                <select className="editPullDown" name="category_id" onChange={this.handleChangeFormValue.bind(this)} value={this.state.category_id}>
                  {
                    arrayOptions
                  }
                </select>
              </td>
            </tr>
            <tr>
              <th>
                支払い金額
              </th>
              <td>
              <TextField
                hintText="ex.)120000"
                name="price"
                onChange={this.handleChangeFormValue.bind(this)}
                value={this.state.price}
              />
              </td>
            </tr>
            <tr>
              <th className="em_color_1">
                旦那支払金額
              </th>
              <td>
              <TextField
                hintText="ex.)50000"
                name="pay_danna"
                onChange={this.handleChangeFormValue.bind(this)}
                value={this.state.pay_danna}
              />
              </td>
            </tr>
            <tr>
              <th className="em_color_2">
                嫁支払金額
              </th>
              <td>
              <TextField
                hintText="ex.)70000"
                name="pay_yome"
                onChange={this.handleChangeFormValue.bind(this)}
                value={this.state.pay_yome}
              />
              </td>
            </tr>
            <tr>
              <th>
                備考
              </th>
              <td>
              <textarea
                name="description"
                onChange={this.handleChangeFormValue.bind(this)}
                value={this.state.description}
              ></textarea>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="inputAreaBtns">
          <FlatButton
            label="SUBMIT"
            backgroundColor="#00bcd4"
            hoverColor="#4fe1f4"
            style={{color:"white"}}
            onClick={this.sendAjax.bind(this)} />
          <FlatButton
            label="全額旦那"
            secondary={true}
            onClick={this.allDanna.bind(this)} />
          <FlatButton
            label="全額嫁"
            primary={true}
            onClick={this.allYome.bind(this)} />
          <FlatButton
            label="差額反映"
            onClick={this.attachDiff.bind(this)} />
        </div>
      </div>
    );
  }
}


InputPage.propTypes = {
  edit: PropTypes.shape({
    data: PropTypes.any,
    entry: PropTypes.object,
    isGet: PropTypes.bool.isRequired,
    isGetSuccess: PropTypes.bool.isRequired,
    isGetError: PropTypes.bool.isRequired,
    isPosting: PropTypes.bool.isRequired,
    isPostSuccess: PropTypes.bool.isRequired,
    isPostError: PropTypes.bool.isRequired
  }),
  actionsEdit: PropTypes.shape({
    finalizeSend: PropTypes.func.isRequired,
    getData: PropTypes.func.isRequired,
    sendData: PropTypes.func.isRequired
  })
};

export default InputPage;
