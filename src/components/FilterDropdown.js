import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Select = styled.select`
  position: relative;
  min-width: 150px;
  padding: 0 30px 0 15px;
  line-height: 41px; font-size: 14px;
  border: 1px solid #c7d0d9; border-radius: 0;
  background-color: #FFFFFF;
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='9.5' height='5' viewBox='0 0 19 10'%3E%3Cpath fill='%23999' d='M17.7.2c.3-.3.8-.3 1.1 0 .3.3.3.8 0 1.1l-8.6 8.5c-.3.3-.8.3-1.1 0L.5 1.3C.2 1 .2.5.5.2c.3-.3.8-.3 1.1 0L9.7 8l8-7.8z'/%3E%3C/svg%3E");
  background-position: 92% center;
  background-repeat: no-repeat;
  outline:none;
  -moz-appearance: none;
  -webkit-appearance: none;
`;

const Label = styled.label`
  margin: 0 20px 0 0; padding: 0;
  color: #818d99;
  font-weight: 700;
`;

const Wrap = styled.div`
  display: inline;
`;

const Filter = ({label, items, value, onChange}) => (<Wrap>
  <Label>{label}</Label>
  <Select name="sortby" value={value} onChange={onChange}>
    { items.map(({prop, val}, i) => <option key={i} value={val}>{prop}</option>) }
  </Select>
</Wrap>);

Filter.propTypes = {
  label: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({prop: PropTypes.string, val: PropTypes.string})),
  value: PropTypes.string,
  onChange: PropTypes.func
};

Filter.defaultProps = {
  label: 'Filter by',
  items: [],
  value: '',
  onChange: () => {}
}

export default Filter;