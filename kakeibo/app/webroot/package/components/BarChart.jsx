import React, { PropTypes, Component } from 'react';
import ReactHighcharts from 'react-highcharts';

// 年別グラフテンプレート
let barChartConfigTmpl = {
  chart: {
    renderTo: 'report',
    zoomType: 'x'
  },
  animation: {
    easing:"easeOutBounce"
  },
  title: {
    text: '年間月別出費グラフ'
  },
  subtitle: {
      text: '累計額: '+ 10 +"円" + ' / 旦那: ' + 5 +"円 / 嫁: " + 5 + "円"
  },
  xAxis: {
    categories: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
  },
  yAxis: {
    title: {
      text: ''
    },
    plotLines: [{
      value: 300000,
      width: 2,
      color: 'red'
    }]
  },
  series: [{
    name: '累計',
    data: [0,0,0,0,0,0,0,0,0,0,0,10]
  }, {
    name: '旦那支払',
    data: [0,0,0,0,0,0,0,0,0,0,0,5]
  }, {
    name: '嫁支払',
    data: [0,0,0,0,0,0,0,0,0,0,0,5]
  }],
  plotOptions: {
    series: {
      cursor: "pointer",
      point: {
        events: {
          click: function(e){
            //click event
            //console.log(this)
          }
        }
      }
    }
  }
}

// カテゴリー別グラフテンプレート
let barChartCatConfigTmpl = {
  chart: {
    renderTo: 'report',
    zoomType: 'x'
  },
  animation: {
    easing:"easeOutBounce"
  },
  title: {
    text: 'カテゴリー別出費グラフ'
  },
  subtitle: {
      text: '累計額: '+ 10 +"円" + ' / 旦那: ' + 5 +"円 / 嫁: " + 5 + "円"
  },
  xAxis: {
    categories: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
  },
  yAxis: {
    title: {
      text: ''
    },
    plotLines: [{
      value: 100000,
      width: 2,
      color: 'red'
    }]
  },
  series: [{
    name: '累計',
    data: [0,0,0,0,0,0,0,0,0,0,0,10]
  }, {
    name: '旦那支払',
    data: [0,0,0,0,0,0,0,0,0,0,0,5]
  }, {
    name: '嫁支払',
    data: [0,0,0,0,0,0,0,0,0,0,0,5]
  }],
  plotOptions: {
    series: {
      cursor: "pointer",
      point: {
        events: {
          click: function(e){
            //click event
            //console.log(this)
          }
        }
      }
    }
  }
}

class BarChart extends Component {
  constructor(props) {
    super(props);

    //初回に表示されるべき年をローカルstateに保存
    this.state = {
      year: this.props.routerParams.year
    }

    //年データAJAXの実行
    this.props.actionsYear.fetchYearData({year: this.props.routerParams.year});
  }

  /**
   * 前回stateの年とrouterのパラメータに差があればAJAX実行
   */
  checkYearState(){
    if( this.state.year !== this.props.routerParams.year ){
      //ローカルstate保存
      this.setState({year: this.props.routerParams.year});

      //ajax実行
      this.props.actionsYear.fetchYearData({year: this.props.routerParams.year});
    }
  }

  componentDidUpdate(){
    this.checkYearState();
  }

  /**
   * AJAXデータをコンフィグにセット
   * @param  {object} res AJAXで取得したグラフデータ
   */
  mergeByPropYearData(res){
    let _this = this;

    // 年別グラフ
    barChartConfigTmpl.subtitle = {
      text: '累計額: '+ res.total.all +"円" + ' / 旦那: ' + res.total.danna +"円 / 嫁: " + res.total.yome + "円"
    }

    barChartConfigTmpl.series = [{
      name: '累計',
      data: [res.mon1.sum, res.mon2.sum, res.mon3.sum, res.mon4.sum, res.mon5.sum, res.mon6.sum, res.mon7.sum, res.mon8.sum, res.mon9.sum, res.mon10.sum, res.mon11.sum, res.mon12.sum]
    }, {
      name: '旦那支払',
      data: [res.mon1.danna, res.mon2.danna, res.mon3.danna, res.mon4.danna, res.mon5.danna, res.mon6.danna, res.mon7.danna, res.mon8.danna, res.mon9.danna, res.mon10.danna, res.mon11.danna, res.mon12.danna]
    }, {
      name: '嫁支払',
      data: [res.mon1.yome, res.mon2.yome, res.mon3.yome, res.mon4.yome, res.mon5.yome, res.mon6.yome, res.mon7.yome, res.mon8.yome, res.mon9.yome, res.mon10.yome, res.mon11.yome, res.mon12.yome]
    }]

    barChartConfigTmpl.plotOptions = {
      series: {
        cursor: "pointer",
        point: {
          events: {
            click: function(e){
              //click event
              let _month = this.index + 1;
              if(_month < 10){
                _month = "0" + _month;
              }
              _this.props.actionsMonthly.fetchMonthlyData({start: _this.props.routerParams.year + _month })
            }
          }
        }
      }
    }

    // カテゴリー別グラフ
    let dataArr = [];
    let tmpArr = [];
    let catid,i;
    let month = 12;

    barChartCatConfigTmpl.subtitle = {
      text: '累計額: '+ res.total.all +"円" + ' / 旦那: ' + res.total.danna +"円 / 嫁: " + res.total.yome + "円"
    }

    // AJAXデータをchart用に整形
    for(catid in res.category){
      tmpArr = [];

      // 月別にデータを格納
      for(i = 1; i<month+1; i++){
        if(res["mon"+i][catid]){
          tmpArr.push(parseInt(res["mon"+i][catid].sum_price, 10));
        }else{
          tmpArr.push(0)
        }
      }
      dataArr.push({
        name: res.category[catid],
        data: tmpArr
      });
    }
    barChartCatConfigTmpl.series = dataArr;

    barChartCatConfigTmpl.plotOptions = {
      series: {
        cursor: "pointer",
        point: {
          events: {
            click: function(e){
              //click event
              let _month = this.index + 1;
              if(_month < 10){
                _month = "0" + _month;
              }
              _this.props.actionsMonthly.fetchMonthlyData({start: _this.props.routerParams.year + _month })
            }
          }
        }
      }
    }
  }

  render() {
    // 描画の直前にグラフデータの更新
    if(this.props.year.data){
      this.mergeByPropYearData.call(this, this.props.year.data);
    }
    return (
      <div id="barChart">
        <div id="barChartWrap" className={this.props.year.isYearSuccess ? "barChartWrap showDis" : "barChartWrap hideDis"}>
          <ReactHighcharts config={barChartConfigTmpl} ref="barchart" />
        </div>
        <div id="barChartCatWrap" className={this.props.year.isYearSuccess ? "barChartCatWrap showDis" : "barChartCatWrap hideDis"}>
          <ReactHighcharts config={barChartCatConfigTmpl} ref="barchartcat" />
        </div>
      </div>
    );
  }
}

BarChart.propTypes = {
  year: PropTypes.shape({
    data: PropTypes.object,
    isYear: PropTypes.bool.isRequired,
    isYearSuccess: PropTypes.bool.isRequired,
    isYearError: PropTypes.bool.isRequired
  }),
  monthly: PropTypes.shape({
    data: PropTypes.object,
    isPosting: PropTypes.bool.isRequired,
    isPostSuccess: PropTypes.bool.isRequired,
    isPostError: PropTypes.bool.isRequired,
    startYear: PropTypes.any.isRequired,
    startMonth: PropTypes.any.isRequired,
    startDate: PropTypes.any.isRequired
  }),
  actionsYear: PropTypes.shape({
    fetchYearData: PropTypes.func.isRequired
  }),
  actionsMonthly: PropTypes.shape({
    fetchMonthlyData: PropTypes.func.isRequired
  }),
  routerParams: PropTypes.shape({
    year: PropTypes.string.isRequired
  })
};

export default BarChart;
