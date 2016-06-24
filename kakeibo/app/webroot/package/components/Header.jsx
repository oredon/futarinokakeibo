import React, { PropTypes, Component } from 'react';
import mui, {AppBar, Styles, FontIcon} from 'material-ui';
import MyRawTheme from '../src/material_ui_raw_theme_file';
import { Link } from 'react-router';

class Header extends Component {
  static get childContextTypes() {
    return { muiTheme: React.PropTypes.object };
  }

  getChildContext(){
    return {  muiTheme: Styles.ThemeManager.getMuiTheme(MyRawTheme)};
  }

  clickLeftIcon() {
    this.props.actionsDrawMenu.toggleMenu(this.props.drawmenu.isOpen)
  }

  render() {
    return (
      <header className="header">
          <AppBar
            title="家計簿管理システム"
            onLeftIconButtonTouchTap={this.clickLeftIcon.bind(this)}
            iconElementRight={<Link to={'/kakeibo/forms/index/add'}><FontIcon className="material-icons" color="#FFFFFF" style={{marginTop: "7px", fontSize: "30px"}}>note_add</FontIcon></Link>} />
      </header>
    );
  }
}


Header.propTypes = {
  drawmenu: PropTypes.shape({
    isOpen: PropTypes.bool.isRequired
  }),
  actionsDrawMenu: PropTypes.shape({
    toggleMenu: PropTypes.func.isRequired
  })
};

export default Header;
