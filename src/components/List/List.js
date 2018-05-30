import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

import { RawItemShape } from '../../core/api/normalizers';
import styled from 'styled-components';

const Wrap = styled.ul`
  margin: 0; padding: 0 12px;
  list-style: none;
`;

const List = ({items}) => (
  !items || !items.length ? null : (<Wrap>{
    items.map(i => <Card key={i.id} item={i} component="li" />)
  }</Wrap>)
);

List.propTypes = {
  list: PropTypes.arrayOf(RawItemShape)
}

export default List;