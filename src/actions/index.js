import { createAction } from 'redux-actions';
import * as webAPI from '../api';

export const fetchRates = createAction('FETCH_RATES', (currency, period) => webAPI.fetchRates(currency, period));
export const changeBaseCurrency = createAction('CHANGE_BASE_CURRENCY');
export const changeConvertibleCurrency = createAction('CHANGE_CONVERTIBLE_CURRENCY');
export const reverseCurrency = createAction('REVERSE_CURRENCY');
export const addCurrencyToFavourites = createAction('ADD_CURRENCY_TO_FAVOURITES');
export const changePeriod = createAction('CHANGE_PERIOD');
