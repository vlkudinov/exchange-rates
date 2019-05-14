import React from 'react';
import PropTypes from 'prop-types';
import PeriodSelect from 'components/Select/PeriodSelect';
import { Link } from 'react-router-dom';
import Flag from 'components/Flag';
import starGray from './icons/star-gray.png';
import starOrange from './icons/star-orange.png';
import currencies from 'common/currencies';
import cn from 'classnames';
import './style.scss';

const RatesTable = props => (
  <div className="table-container">
    <table className="table">
      <thead>
        <tr>
          <th>Favourites</th>
          <th>Country</th>
          <th>ISO</th>
          <th>Currency</th>
          <th>Value</th>
          <th>
            <PeriodSelect value={props.period} onChange={props.changePeriod} />
          </th>
          <th>Charts</th>
          <th>Convert</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(props.rates).map(key => {
          const dynamicClass = cn({
            'table-dynamic__value': true,
            'table-dynamic__value_positive': props.dynamic[key] > 0,
            'table-dynamic__value_negative': props.dynamic[key] < 0
          });

          return (
            <tr key={key}>
              <td>
                <span onClick={() => props.onFavouritesAdd(key)}>
                  <img src={props.favourites.includes(key) ? starOrange : starGray} alt="" width="20px" />
                </span>
              </td>
              <td>
                <Flag currency={key} circle />
              </td>
              <td>{key}</td>
              <td>{currencies[key]}</td>
              <td>{props.rates[key].toPrecision(5)}</td>
              <td className="table__dynamic table-dynamic">
                <span className={dynamicClass}>{Math.abs(props.dynamic[key].toPrecision(2))}</span>
              </td>
              <td>
                <Link className="table__link" onClick={() => props.onConvertibleChange(key)} to={'/chart'}>
                  Graph
                </Link>
              </td>
              <td>
                <Link className="table__link" onClick={() => props.onConvertibleChange(key)} to={'/converter'}>
                  {props.base} to {key}
                </Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

RatesTable.propTypes = {
  period: PropTypes.number.isRequired,
  rates: PropTypes.object.isRequired,
  favourites: PropTypes.array.isRequired,
  dynamic: PropTypes.object.isRequired,
  changePeriod: PropTypes.func.isRequired
};

export default RatesTable;
