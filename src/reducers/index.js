import {combineReducers} from "redux";
import { connectRouter } from 'connected-react-router';
import {handleActions} from "redux-actions";
import * as actions from "../actions";

const currency = handleActions({
  [actions.fetchRates](state, {payload: {base, rates}}) {
    return {...state, base, rates };
  },
  [actions.changeBaseCurrency](state, {payload}) {
    return {...state, base : payload};
  },
  [actions.changeConvertibleCurrency](state, {payload}) {
    return {...state, convertible : payload};
  },
  [actions.reverseCurrency](state) {
    const base = state.base;
    const convertible = state.convertible;
    return {...state, base: convertible, convertible : base};
  },
  [actions.addCurrencyToFavourites](state, {payload}) {
    return state.favourites.includes(payload)
      ? {...state, favourites : [...state.favourites.filter(key => key!== payload)]}
      : {...state, favourites : [...state.favourites, payload]};
  },
  [actions.changePeriod](state, {payload}) {
    return {...state, period : {days: payload}};
  }
},
  {
    base: 'EUR',
    convertible: 'USD',
    favourites : [],
    period:  {days: 7}
  });

export default (history) => combineReducers({
  router: connectRouter(history),
  currency,
});