import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router'
import mui, { FontIcon, FlatButton } from 'material-ui';
import { fetchMonthlyData } from '../actions/monthly'

// 前後年月文字列
let prevYM;
let nextYM;

class MonthChanger extends Component {
  componentDidMount() {

  }

  zeroPadding(number, length = 1) {
    return (Array(length).join("0") + number).slice(-length);
  }

  /**
   * 前後月移動
   */
  goTo(){
    if(this.to){
      let url = this.to.slice(-6)
      store.dispatch(fetchMonthlyData({start: url}))
    }
  }

  render() {
    //console.log(this,this.props)
    let currentYear, nextYear, prevYear, currentMonth, nextMonth, prevMonth, currentMonthNum;
    currentYear = nextYear = prevYear = this.props.monthly.startYear;
    currentMonth = nextMonth = prevMonth = this.props.monthly.startMonth;
    currentMonthNum = parseInt(currentMonth, 10);

    if(currentMonthNum === 1){
      //1月なら前月は12月
      prevYear--;
      prevMonth = "12";
      nextMonth = "02";
    }else if(currentMonthNum === 12){
      //12月なら来月は1月
      prevMonth = "11";
      nextMonth = "01";
      nextYear++;
    }else{
      //1月または12月ではない
      prevMonth = this.zeroPadding(currentMonthNum - 1, 2);
      nextMonth = this.zeroPadding(currentMonthNum + 1, 2);
    }

    //前後年月を確定させる
    prevYM = prevYear + prevMonth;
    nextYM = nextYear + nextMonth;

    return (
      <div className="monthChanger">
        <div className="prev">
          <Link to={'/kakeibo/forms/index/monthly/' + prevYM}>
            <FlatButton
              label="前月"
              linkButton={false}
              secondary={true}
              icon={<FontIcon className="material-icons">keyboard_arrow_left</FontIcon>}
            />
          </Link>
        </div>
        <div className="next">
          <Link to={'/kakeibo/forms/index/monthly/' + nextYM}>
            <FlatButton
              label="次月"
              linkButton={false}
              labelPosition="before"
              secondary={true}
              icon={<FontIcon className="material-icons">keyboard_arrow_right</FontIcon>}
            />
          </Link>
        </div>
      </div>
    )
  }
}

MonthChanger.propTypes = {
  monthly: PropTypes.shape({
    data: PropTypes.object,
    isPosting: PropTypes.bool.isRequired,
    isPostSuccess: PropTypes.bool.isRequired,
    isPostError: PropTypes.bool.isRequired,
    startYear: PropTypes.any.isRequired,
    startMonth: PropTypes.any.isRequired,
    startDate: PropTypes.any.isRequired
  }),
  actionsMonthly: PropTypes.shape({
    fetchMonthlyData: PropTypes.func.isRequired
  })
};

export default MonthChanger;
