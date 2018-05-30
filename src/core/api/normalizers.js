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
  tour_image_placeholder: PropTypes.string,
  map_image: PropTypes.string,
  map_image_placeholder: PropTypes.string
});

export const normalizeSearchResult = ({ destinations, age_from, age_to, tour_operator, country, tour_image, map_image, ...otherRawData }) => {

  // @TEMP: create placeholder images (this should be served in API response)
  const tour_image_placeholder = tour_image && tour_image.replace('928x680', '12x9');
  const map_image_placeholder = map_image && map_image.replace('928x400', '12x5');

  return Object.assign({}, otherRawData, {
    tour_image, map_image,
    tour_image_placeholder, map_image_placeholder,
    meta: {
      destinations,
      'starts/ends in': country + ' / ' + country,
      'age range': age_to && age_from && `${age_from} to ${age_to} years old`,
      country,
      'tour operator': tour_operator
    }
  });
}