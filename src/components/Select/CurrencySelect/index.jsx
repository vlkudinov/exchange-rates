import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { components } from 'react-select';
import Flag from 'components/Flag';
import currencies from 'common/currencies';

const customStyles = {
  option: (provided) => ({
    ...provided,
    display: 'flex',
    alignItems: 'center',
  }),
  placeholder: (provided) => ({
    ...provided,
    display: 'flex',
    alignItems: 'center',
  }),
};

const Option = props => (
  <components.Option {...props}>
      <Flag currency={props.data.label.toLowerCase()} size={'xs'} />
      <span className="select__label">{props.data.label}</span>
  </components.Option>
);

const Placeholder = props => (
  <components.Placeholder {...props}>
      <Flag currency={props.selectProps.value.toLowerCase()} size={'xs'} />
      <span className="select__label">
        {props.selectProps.value} {currencies[props.selectProps.value]}
      </span>
  </components.Placeholder>
);

const CurrencySelect = props => (
  <Select
    value={props.value}
    options={props.options}
    styles={customStyles}
    components={{ Option, Placeholder }}
    onChange={({ value }) => props.onChange(value)}
  />
);

CurrencySelect.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

CurrencySelect.defaultProps = {
  options: [
    { label: 'AUD Australian dollar', value: 'AUD' },
    { label: 'BGN Bulgarian lev', value: 'BGN' },
    { label: 'BRL Brazilian real', value: 'BRL' },
    { label: 'CAD Canadian dollar', value: 'CAD' },
    { label: 'CHF Swiss franc', value: 'CHF' },
    { label: 'CNY Chinese yuan renminbi', value: 'CNY' },
    { label: 'CZK Czech koruna', value: 'CZK' },
    { label: 'DKK Danish krone', value: 'DKK' },
    { label: 'GBP Pound sterling', value: 'GBP' },
    { label: 'HKD Hong Kong dollar', value: 'HKD' },
    { label: 'HRK Croatian kuna', value: 'HRK' },
    { label: 'HUF Hungarian forint', value: 'HUF' },
    { label: 'IDR Indonesian rupiah', value: 'IDR' },
    { label: 'ILS Israeli shekel', value: 'ILS' },
    { label: 'INR Indian rupee', value: 'INR' },
    { label: 'ISK Icelandic krona', value: 'ISK' },
    { label: 'JPY Japanese yen', value: 'JPY' },
    { label: 'KRW South Korean won', value: 'KRW' },
    { label: 'MXN Mexican peso', value: 'MXN' },
    { label: 'MYR Malaysian ringgit', value: 'MYR' },
    { label: 'NOK Norwegian krone', value: 'NOK' },
    { label: 'NZD New Zealand dollar', value: 'NZD' },
    { label: 'PHP Philippine peso', value: 'PHP' },
    { label: 'PLN Polish zloty', value: 'PLN' },
    { label: 'RON Romanian leu', value: 'RON' },
    { label: 'RUB Russian rouble', value: 'RUB' },
    { label: 'SEK Swedish krona', value: 'SEK' },
    { label: 'SGD Singapore dol lar', value: 'SGD' },
    { label: 'THB Thai baht', value: 'THB' },
    { label: 'TRY Turkish lira', value: 'TRY' },
    { label: 'USD US dollar', value: 'USD' },
    { label: 'ZAR South African rand', value: 'ZAR' }
  ]
};

export default CurrencySelect;
