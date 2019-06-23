import React from 'react';
import * as actions from 'actions';
import { connect } from 'react-redux';
import cn from 'classnames';
import Chart from 'components/Chart';
import CurrencySelect from 'components/Select/CurrencySelect';
import { getRecentRates, getChartsData } from 'selectors';

class ChartPage extends React.Component {
  static defaultProps = {
    periodRange: [7, 30, 60, 90, 365]
  };

  renderConverter() {
    return (
      <div className="chart">
        <div className="chart__from">
          <CurrencySelect value={this.props.base} onChange={this.props.onBaseChange} options={this.props.options} />
        </div>
        <div className="chart__to">
          <CurrencySelect
            value={this.props.convertible}
            onChange={this.props.onConvertibleChange}
            options={this.props.options}
          />
        </div>
        <div className="chart__options chart-options">
          <ul className="chart-options__list">
            {this.props.periodRange.map(range => {
              const liClass = cn({
                'chart-options__item': true,
                'chart-options__item_active': range === this.props.activePeriod
              });
              return (
                <li key={range} onClick={() => this.props.onPeriodChange(range)} className={liClass}>
                  {range}D
                </li>
              );
            })}
          </ul>
        </div>

        <Chart
          data={this.props.chartsData}
          base={this.props.base}
          convertible={this.props.convertible}
          rates={this.props.rates}
        />
      </div>
    );
  }

  render() {
    return this.props.rates ? this.renderConverter() : <div>Loading...</div>;
  }
}

const mapStateToProps = state => ({
  rates: getRecentRates(state),
  base: state.currency.base,
  activePeriod: state.currency.period.days,
  convertible: state.currency.convertible,
  chartsData: getChartsData(state)
});

const mapDispatchToProps = dispatch => ({
  onBaseChange: currency => dispatch(actions.changeBaseCurrency(currency)),
  onConvertibleChange: currency => dispatch(actions.changeConvertibleCurrency(currency)),
  onPeriodChange: range => dispatch(actions.changePeriod(range))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChartPage);
