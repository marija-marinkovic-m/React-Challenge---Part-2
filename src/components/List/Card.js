import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { NormalizedSearchResultShape } from '../../core/api/normalizers';
import DataList from '../DataList';

const Card = ({component, item: { tour_name, description, rating, meta, ...other }}) => {
  const Component = styled(component)`
    margin: 0; padding: 0;
  `;
  return (
    <Component>

      <h1>{tour_name}</h1>
      <p>Rating: {rating}</p>
      <p>{description}</p>

      <DataList data={meta} />
    </Component>
  );
};

Card.propTypes = {
  component: PropTypes.string,
  item: NormalizedSearchResultShape
}
Card.defaultProps = {
  component: 'li'
}

export default Card;