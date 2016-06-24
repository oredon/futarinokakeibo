import React, { PropTypes, Component } from 'react';
import ReactHighcharts from 'react-highcharts';

let pieChartConfigTmpl = {
  chart: {
    type: 'pie',
    options3d: {
        enabled: true,
        alpha: 30,
        beta: 0
    }
  },
  title: {
    text: '旦那・嫁比率'
  },
  tooltip: {
    pointFormat: ' <b>{point.percentage:.1f}%</b> ({point.y}円)'
  },
  subtitle: {
    text: '旦那: '+1 +"円 / 嫁: " + 2 + "円"
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      depth: 35,
      dataLabels: {
        enabled: true,
        format: '{point.name}'
      }
    }
  },
  series: [{
    type: 'pie',
    name: '旦那・嫁出費比率',
    data: [
      ['旦那', 1],
      ['嫁', 2]
    ]
  }]
}

class PieChart extends Component {
  componentDidMount() {

  }

  /**
	 * AJAXデータをコンフィグにセット
	 * @param  {object} res AJAXで取得したグラフデータ
	 */
  mergeByPropMonthlyData(res){
    pieChartConfigTmpl.subtitle = {
      text: '旦那: '+ this.props.monthly.data.danna +"円 / 嫁: " + this.props.monthly.data.yome + "円"
    }
    pieChartConfigTmpl.series[0] = {
      type: 'pie',
      name: '旦那・嫁出費比率',
      data: [
        ['旦那', this.props.monthly.data.danna],
        ['嫁', this.props.monthly.data.yome]
      ]
    }
  }

  render() {
    // 描画の直前にグラフデータの更新
    if(this.props.monthly.data){
      this.mergeByPropMonthlyData(this.props.monthly.data);
    }

    return (
      <div id="pieChartWrap" className={this.props.monthly.isPostSuccess ? "pieChartWrap showDis" : "pieChartWrap hideDis"}>
        <ReactHighcharts config={pieChartConfigTmpl} ref="piechart" />
      </div>
    );
  }
}

PieChart.propTypes = {
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

export default PieChart;
