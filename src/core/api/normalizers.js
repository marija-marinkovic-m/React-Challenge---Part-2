import PropTypes from 'prop-types';

export const RawItemShape = PropTypes.shape({
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

export const ItemMetaShape = PropTypes.shape({
  destinations: PropTypes.arrayOf(PropTypes.string),
  'starts/ends in': PropTypes.string,
  'age range': PropTypes.string,
  'country': PropTypes.string,
  'tour operator': PropTypes.string
});

export const NormalizedSearchResultShape = PropTypes.shape({
  id: PropTypes.number,
  tour_name: PropTypes.string,
  length: PropTypes.number,
  description: PropTypes.string,
  price: PropTypes.number,
  saving: PropTypes.number,
  rating: PropTypes.number,
  currency: PropTypes.string,
  meta: ItemMetaShape,
  tour_image: PropTypes.string,
  map_image: PropTypes.string
});

export const normalizeSearchResult = ({ destinations, age_from, age_to, tour_operator, country, ...otherRawData }) => {
  return Object.assign({}, otherRawData, {
    meta: {
      destinations,
      'starts/ends in': country + ' / ' + country,
      'age range': age_to && age_from && `${age_from} to ${age_to} years old`,
      country,
      'tour operator': tour_operator
    }
  });
}