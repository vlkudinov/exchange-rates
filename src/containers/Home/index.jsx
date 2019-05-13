import React from 'react';
import * as actions from 'actions';
import Title from 'components/Title';
import RatesTable from 'components/RatesTable';
import CurrencySelect from 'components/Select/CurrencySelect';
import { connect } from 'react-redux';
import { getRecentRatesSortedByFavorites, compareHistoricalRates } from 'selectors';

class HomePage extends React.Component {
  renderRates() {
    return (
      <React.Fragment>
        <Title>{`${this.props.base} exchange rates against currencies published by the European Central Bank`}</Title>
        <div className="rates">
          <CurrencySelect value={this.props.base} onChange={this.props.onBaseChange} options={this.props.options} />
          <RatesTable
            rates={this.props.rates}
            base={this.props.base}
            period={this.props.period}
            dynamic={this.props.dynamic}
            favourites={this.props.favourites}
            onFavouritesAdd={this.props.onFavouritesAdd}
            changePeriod={this.props.onPeriodChange}
            onConvertibleChange={this.props.onConvertibleChange}
          />
        </div>
      </React.Fragment>
    );
  }

  render() {
    return this.props.rates ? this.renderRates() : <div>Loading...</div>;
  }
}

const mapStateToProps = state => ({
  rates: getRecentRatesSortedByFavorites(state),
  base: state.currency.base,
  period: state.currency.period.days,
  convertible: state.currency.convertible,
  favourites: state.currency.favourites,
  dynamic: compareHistoricalRates(state),
});

const mapDispatchToProps = dispatch => ({
  onBaseChange: currency => dispatch(actions.changeBaseCurrency(currency)),
  onConvertibleChange: currency => dispatch(actions.changeConvertibleCurrency(currency)),
  onPeriodChange: range => dispatch(actions.changePeriod(range)),
  onFavouritesAdd: invoices => dispatch(actions.addCurrencyToFavourites(invoices))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
