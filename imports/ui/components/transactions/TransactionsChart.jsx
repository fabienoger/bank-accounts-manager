import React, {PropTypes} from 'react';
import C3Chart            from 'react-c3js';
import 'c3/c3.css';


export default class TransactionsChart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }

  componentWillMount() {
    this.setState({
      data: Modules.client.utils.formatForChart(this.props.transactions, this.props.chartType)
    });
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      data: Modules.client.utils.formatForChart(nextProps.transactions, nextProps.chartType)
    });
  }

  render() {
    let chartOptions = {
      data: {
        columns: this.state.data
      }
    }
    if (this.props.chartType == "donut") {
      chartOptions.data.type = "donut";
    } else if (this.props.chartType == "timeseries") {
      chartOptions.data.x = 'x';
      chartOptions.data.xFormat = '%Y-%m-%d %H:%M:%S';
      chartOptions.data.type = 'spline'
      chartOptions.axis = {
        x: {
          type: 'timeseries',
          tick: {
              format: '%Y-%m-%d %H:%M:%S'
          }
        }
      };
    }
    return (
      <div className="transactions-chart">
        <C3Chart {...chartOptions} />
      </div>
    )
  }
}

TransactionsChart.propTypes = {
  transactions: PropTypes.array.isRequired,
  chartType: PropTypes.string.isRequired
};
