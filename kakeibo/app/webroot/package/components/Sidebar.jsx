import React, { PropTypes, Component } from 'react';
import mui, {LeftNav, IconMenu, Styles, MenuItem, Menu, FontIcon, Divider} from 'material-ui';
import MyRawTheme from '../src/material_ui_raw_theme_file';
import { Link } from 'react-router';

class Sidebar extends Component {
  constructor(props){
    super(props);
    this.state = {open:true};

    let currentY = parseInt(startYear, 10);
    let sinceY   = sinceYear;
    let i;
    this.linksTmpl = [];
    for( i = 0; i <= currentY - sinceY; i++ ){
      this.linksTmpl.push(
        <Link key={'sidebar_'+i} to={'/kakeibo/forms/index/year/'+(currentY - i)} onClick={this.reqChange.bind(this)}><MenuItem>{(currentY - i)}年 出費報告</MenuItem></Link>
      )
    }
  }

  static get childContextTypes() {
    return { muiTheme: React.PropTypes.object };
  }

  getChildContext(){
    return {  muiTheme: Styles.ThemeManager.getMuiTheme(MyRawTheme)};
  }

  /**
   * リンククリック時の挙動
   */
  reqChange() {
    //sidebar閉じる
    this.props.actionsDrawMenu.toggleMenu(this.props.drawmenu.isOpen)
  }

  render() {
    return (
      <div>
        <LeftNav
          docked={false}
          width={200}
          open={this.props.drawmenu.isOpen}
          onRequestChange={this.reqChange.bind(this)}
        >
            <Link to={'/kakeibo/forms/index'} onClick={this.reqChange.bind(this)}><MenuItem leftIcon={<FontIcon className="material-icons">home</FontIcon>}>ホーム</MenuItem></Link>
            <Divider />
            <Link to={'/kakeibo/forms/index/add'} onClick={this.reqChange.bind(this)}><MenuItem leftIcon={<FontIcon className="material-icons">note_add</FontIcon>}>入力する</MenuItem></Link>
            <Divider />
            {this.linksTmpl}
        </LeftNav>
      </div>
    );
  }
}

Sidebar.propTypes = {
  drawmenu: PropTypes.shape({
    isOpen: PropTypes.bool.isRequired
  }),
  actionsDrawMenu: PropTypes.shape({
    toggleMenu: PropTypes.func.isRequired
  })
};

export default Sidebar;
