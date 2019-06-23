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

  render() {
    const {
      base,
      rates,
      convertible,
      options,
      periodRange,
      activePeriod,
      chartsData,
      onBaseChange,
      onConvertibleChange,
      onPeriodChange
    } = this.props;

    return (
      <div className="chart">
        <div className="chart__from">
          <CurrencySelect value={base} options={options} onChange={onBaseChange} />
        </div>
        <div className="chart__to">
          <CurrencySelect value={convertible} onChange={onConvertibleChange} options={options} />
        </div>
        <div className="chart__options chart-options">
          <ul className="chart-options__list">
            {periodRange.map(period => {
              const liClass = cn({
                'chart-options__item': true,
                'chart-options__item_active': period === activePeriod
              });
              return (
                <li key={period} onClick={() => onPeriodChange(period)} className={liClass}>
                  {period}D
                </li>
              );
            })}
          </ul>
        </div>

        <Chart data={chartsData} base={base} convertible={convertible} rates={rates} />
      </div>
    );
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
