import React from 'react';
import PropTypes from 'prop-types';
import Card, { ItemShape } from './Card';

const List = ({items}) => (
  !items || !items.length ? null : (<ul>{
    items.map(i => <Card key={i.id} item={i} />)
  }</ul>)
);

List.propTypes = {
  list: PropTypes.shape(ItemShape)
}

export default List;