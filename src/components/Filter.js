import React from 'react';
import PropTypes from 'prop-types';

const Filter = ({label, items, value, onChange}) => (<div>
  <label>{label}</label>
  <select name="sortby" value={value} onChange={onChange}>
    { items.map(({prop, val}, i) => <option key={i} value={val}>{prop}</option>) }
  </select>
</div>);

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