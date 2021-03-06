import React from 'react';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import ReverseButton from 'components/ReverseButton';
import Title from 'components/Title';
import CurrencySelect from 'components/Select/CurrencySelect';
import BaseInput from 'components/Input/BaseInput';
import ConvertibleInput from 'components/Input/BaseInput';
import { getRecentRates } from 'selectors';

class ConverterPage extends React.Component {
  state = {
    amount: 1,
    result: 0,
    symbol: {
      base: null,
      convertible: null
    },
    unit: {
      base: 0,
      convertible: 0
    }
  };

  handleChange = ({ target: { value } }) => {
    this.setState({ amount: +value });
  };

  static getDerivedStateFromProps(props, state) {
    return {
      result: state.amount * props.rates[props.convertible],
      symbol: {
        base: props.symbols[props.base],
        convertible: props.symbols[props.convertible]
      },
      unit: {
        base: 1 * props.rates[props.convertible],
        convertible: 1 / props.rates[props.convertible]
      }
    };
  }

  render() {
    const { base, options, convertible, onBaseChange, onConvertibleChange, onReverseCurrency } = this.props;
    const { amount, symbol, unit, result } = this.state;

    return (
      <React.Fragment>
        <Title>Currency Converter</Title>
        <div className="converter">
          <div className="converter__from">
            <CurrencySelect value={base} options={options} onChange={onBaseChange} />
            <BaseInput value={amount} symbol={symbol.base} handleChange={this.handleChange} />
            <span className="converter__unit">
              1 {base} = {unit.base || 0} {convertible}
            </span>
            <ReverseButton handleClick={onReverseCurrency} />
          </div>
          <div className="converter__to">
            <CurrencySelect value={convertible} label="To" onChange={onConvertibleChange} options={options} />
            <ConvertibleInput value={result} symbol={symbol.convertible} handleChange={this.handleChange} />
            <span className="converter__unit">
              1 {convertible} = {unit.convertible || 0} {base}
            </span>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  rates: getRecentRates(state),
  base: state.currency.base,
  convertible: state.currency.convertible
});

const mapDispatchToProps = dispatch => ({
  onBaseChange: currency => dispatch(actions.changeBaseCurrency(currency)),
  onConvertibleChange: currency => dispatch(actions.changeConvertibleCurrency(currency)),
  onReverseCurrency: () => dispatch(actions.reverseCurrency())
});

ConverterPage.defaultProps = {
  symbols: {
    EUR: '€',
    USD: '&#36',
    JPY: '&#165',
    BGN: '&#1083;&#1074',
    CZK: '&#75;&#269',
    DKK: '&#107;&#114',
    GBP: '&#163',
    HUF: '&#70;&#116',
    PLN: '&#122;&#322',
    RON: '&#108;&#101;&#105',
    SEK: '&#107;&#114',
    CHF: '&#67;&#72;&#70',
    ISK: '&#107;&#114',
    NOK: '&#107;&#114',
    HRK: '&#107;&#110',
    RUB: '&#8381',
    TRY: '₺',
    AUD: '&#36',
    BRL: '&#82;&#36',
    CAD: '&#36',
    CNY: '&#165',
    HKD: '&#36',
    IDR: '&#82;&#112',
    ILS: '&#8362',
    INR: '₹',
    KRW: '&#8361',
    MXN: '&#36',
    MYR: '&#82;&#77',
    NZD: '&#36',
    PHP: '&#8369',
    SGD: '&#36',
    THB: '&#3647',
    ZAR: '&#82'
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConverterPage);
