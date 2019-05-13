import { createSelector } from 'reselect/lib/index';

const getRates = state => state.currency.rates;
const getBaseCurrency = state => state.currency.base;
const getConvertibleCurrency = state => state.currency.convertible;
const getFavourites = state => state.currency.favourites;

const getSortedRatesByDate = createSelector(
  [getRates],
  rates =>
    Object.keys(rates)
    .sort((a, b) => new Date(a) - new Date(b))
    .reduce((acc, item) => ({ ...acc, [item]: rates[item] }), {})
);

const getRecentRates = createSelector(
  [getSortedRatesByDate],
  rates => {
      const recent = Object.keys(rates)[Object.keys(rates).length - 1];
      return rates[recent];
  }
);

const getRecentRatesSortedByFavorites = createSelector(
  [getRecentRates, getFavourites],
  (rates, favourites) =>
    Object.keys(rates)
      .sort((a, b) => favourites.includes(b) - favourites.includes(a))
      .reduce((acc, item) => ({ ...acc, [item]: rates[item] }), {})
);

const compareHistoricalRates = createSelector(
  [getSortedRatesByDate],
  rates => {
    const firstDate = Object.keys(rates)[0];
    const lastDate = Object.keys(rates)[Object.keys(rates).length - 1];
    
    return Object.keys(rates[lastDate]).reduce((acc, currency) => {
      const difference = rates[lastDate][currency] - rates[firstDate][currency];
      return { ...acc, [currency]: difference };
    }, {});
  }
);

const getChartsData = createSelector(
  [getSortedRatesByDate, getBaseCurrency, getConvertibleCurrency],
  (rates, baseCurrency, convertibleCurrency) => {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    
    return Object.keys(rates).reduce(
      (acc, date) => [
        ...acc,
        {
          name: new Date(date).toLocaleDateString('en-US', options),
          uv: rates[date][convertibleCurrency]
        }
      ],
      []
    );
  }
);

export { getRecentRates, getRecentRatesSortedByFavorites, compareHistoricalRates, getChartsData };
