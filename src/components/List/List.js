import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

import { NormalizedSearchResultShape } from '../../core/api/normalizers';

const List = ({items}) => (
  !items || !items.length ? null : (<ul>{
    items.map(i => <Card key={i.id} item={i} />)
  }</ul>)
);

List.propTypes = {
  list: PropTypes.arrayOf(NormalizedSearchResultShape)
}

export default List;