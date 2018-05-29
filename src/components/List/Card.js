import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const ItemShape = PropTypes.shape({
  id: PropTypes.number,
  tour_name: PropTypes.string,
  length: PropTypes.number,
  description: PropTypes.string,
  price: PropTypes.number,
  saving: PropTypes.number,
  currency: PropTypes.string,
  destinations: PropTypes.arrayOf(PropTypes.string),
  age_from: PropTypes.number,
  age_to: PropTypes.number,
  rating: PropTypes.number,
  tour_operator: PropTypes.string,
  country: PropTypes.string,
  tour_image: PropTypes.string,
  map_image: PropTypes.string
});

const Card = ({component, item: { tour_name, description }}) => {
  const Component = styled(component)`
    margin: 0; padding: 0;
  `;
  return (
    <Component>
      <h1>{tour_name}</h1>
      <p>{description}</p>
    </Component>
  );
};

Card.propTypes = {
  component: PropTypes.string,
  item: ItemShape
}
Card.defaultProps = {
  component: 'li'
}

export default Card;