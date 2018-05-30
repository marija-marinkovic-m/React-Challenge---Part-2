import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

import { RawItemShape } from '../../core/api/normalizers';
import styled from 'styled-components';

const Wrap = styled.ul`
  display: flex; flex-direction: column;
  margin: 0; padding: 0 12px;
  list-style: none;

  @media (max-width: 768px) {
    flex-direction: row; flex-wrap: wrap; justify-content: space-around;
  }
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;
const Item = styled.li`
  display: flex; justify-content: space-between;
  min-height: 246px;
  position: relative;
  display: flex; justify-content: space-around;
  margin: 0 0 45px; padding: 1px;
  background: #fff;
  @media (max-width: 768px) {
    width: 48%;
    flex-direction: column; flex-shrink: 0;
    align-self: flex-start;
  }
  @media (max-width: 480px) {
    width: 100%;
  }
`;

const List = ({items}) => (
  !items || !items.length ? null : (<Wrap>{
    items.map(i => <Item key={i.id}><Card item={i} /></Item>)
  }</Wrap>)
);

List.propTypes = {
  list: PropTypes.arrayOf(RawItemShape)
}

export default List;