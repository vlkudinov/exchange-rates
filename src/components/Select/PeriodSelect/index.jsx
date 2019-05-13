import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

const customStyles = {
  singleValue: provided => ({
    ...provided,
    color: '#8aa1bc'
  }),
  control: provided => ({
    ...provided,
    width: 140,
    border: 'none',
  }),
  placeholder: provided => ({
    ...provided,
    color: '#8aa1bc'
  }),
  indicatorSeparator: provided => ({
    ...provided,
    display: 'none'
  })
};

const PeriodSelect = props => (
  <Select
    defaultValue={props.value}
    options={props.options}
    styles={customStyles}
    placeholder={`Last ${props.value} days`}
    onChange={({ value }) => props.onChange(value)}
  />
);

PeriodSelect.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired
};

PeriodSelect.defaultProps = {
  options: [
    { label: 'Last 7 days', value: 7 },
    { label: 'Last 30 days', value: 30 },
    { label: 'Last 60 days', value: 60 },
    { label: 'Last 90 days', value: 90 },
    { label: 'Last 365 days', value: 365 }
  ]
};

export default PeriodSelect;
