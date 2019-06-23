import React from 'react';
import * as actions from 'actions';
import Title from 'components/Title';
import RatesTable from 'components/RatesTable';
import CurrencySelect from 'components/Select/CurrencySelect';
import { connect } from 'react-redux';
import { getRecentRatesSortedByFavorites, compareHistoricalRates } from 'selectors';

const HomePage = ({
  base,
  rates,
  period,
  dynamic,
  favourites,
  options,
  onBaseChange,
  onFavouritesAdd,
  onPeriodChange,
  onConvertibleChange
}) => (
  <React.Fragment>
    <Title>{`${base} exchange rates against currencies published by the European Central Bank`}</Title>
    <div className="rates">
      <CurrencySelect value={base} onChange={onBaseChange} options={options} />
      <RatesTable
        rates={rates}
        base={base}
        period={period}
        dynamic={dynamic}
        favourites={favourites}
        options={options}
        onFavouritesAdd={onFavouritesAdd}
        changePeriod={onPeriodChange}
        onConvertibleChange={onConvertibleChange}
      />
    </div>
  </React.Fragment>
);

const mapStateToProps = state => ({
  rates: getRecentRatesSortedByFavorites(state),
  base: state.currency.base,
  period: state.currency.period.days,
  convertible: state.currency.convertible,
  favourites: state.currency.favourites,
  dynamic: compareHistoricalRates(state)
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
