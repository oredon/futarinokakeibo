import React, { PropTypes, Component } from 'react';
import ReactHighcharts from 'react-highcharts';

let circleChartConfigTmpl = {
	chart: {
    type: 'pie'
	},
	title: {
    text: 'カテゴリー別出費比率'
	},
	tooltip: {
    pointFormat: ' <b>{point.percentage:.1f}%</b> ({point.y}円)'
  },
	subtitle: {
    text: '累計額: '+ 1 +"円"
	},
	plotOptions: {
    pie: {
      innerSize: 100,
      depth: 45
    }
	},
	series: [{
    name: '出費率',
    data: []
	}]
}

class CircleChart extends Component {
	/**
	 * AJAXデータをコンフィグにセット
	 * @param  {object} res AJAXで取得したグラフデータ
	 */
  mergeByPropMonthlyData(res){
    let detailArr = [];
    let idx;
    for(idx in res.list ){
      detailArr.push([res.list[idx].category_name, parseInt(res.list[idx].sum_price, 10)])
    }
    circleChartConfigTmpl.subtitle = {
      text: '累計額: '+ this.props.monthly.data.sum +"円"
  	}
    circleChartConfigTmpl.series[0] = {
      name: '出費率',
      data: detailArr
    }
  }

  render() {
		// 描画の直前にグラフデータの更新
    if(this.props.monthly.data){
      this.mergeByPropMonthlyData(this.props.monthly.data);
    }
    return (
      <div id="circleChartWrap" className={this.props.monthly.isPostSuccess ? "circleChartWrap showDis" : "circleChartWrap hideDis"}>
        <ReactHighcharts config={circleChartConfigTmpl} ref="circlechart" />
      </div>
    );
  }
}

CircleChart.propTypes = {
	monthly: PropTypes.shape({
		data: PropTypes.object,
		isPosting: PropTypes.bool.isRequired,
		isPostSuccess: PropTypes.bool.isRequired,
		isPostError: PropTypes.bool.isRequired,
		startYear: PropTypes.any.isRequired,
		startMonth: PropTypes.any.isRequired,
		startDate: PropTypes.any.isRequired
	})
};

export default CircleChart;
