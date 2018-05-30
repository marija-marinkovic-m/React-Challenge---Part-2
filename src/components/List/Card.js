import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { normalizeSearchResult, RawItemShape } from '../../core/api/normalizers';
import DataList from '../DataList';
import PricingGrid from '../PricingGrid';
import ImagePreload from '../ImgPreload';
import Rating from '../Rating';

const MainArticle = styled.article`
  width: 72%;
  display: flex; justify-content: space-between;
  & > :first-child {
    width: 38%;
  }
  & > :last-child {
    width: 62%;
  }
`;
const PricingMeta = styled.div`
  width: 28%;
  text-align: center;
`;

const Figure = styled.figure`
  margin: 0;
  a {
    display: block;
    img {
      display: block;
      max-width: 100%; height: auto;
    }
    &:last-child {
      margin-top: 4px;
    }
  }
`;
const Description = styled.div`
  margin: 0;
  padding: 16px 20px 0;
  p {
    margin: 0 0 7px;
  }
`;

const TourName = styled.h4`
  margin: 0 0 3px; padding: 0;
  font-size: 18px; font-weight: 700; line-height: 23px;
  max-height: 46px; overflow: hidden;
  a {
    color: inherit;
    text-decoration: none;
    &:hover {text-decoration: underline;}
  }
`;

const Card = ({component, item}) => {
  const formated = normalizeSearchResult(item);
  const Component = styled(component)`
    display: flex; justify-content: space-between;
    min-height: 246px;
    position: relative;
    display: flex; justify-content: space-around;
    margin: 0 0 45px; padding: 1px;
    background: #fff;
  `;
  return (
    <Component>

      <MainArticle>

        <Figure>
          <ImagePreload src={formated.tour_image} render={src => <a href="#offer"><img src={src} alt={formated.tour_name} /></a>} />
          <ImagePreload src={formated.map_image} render={src => <a href="#offer"><img src={src} alt={formated.tour_name + ' map'} /></a>} />
        </Figure>

        <Description>
          <TourName><a href="#offer">{formated.tour_name}</a></TourName>
          <p><Rating value={formated.rating} /></p>
          <p>{formated.description}</p>

          <DataList data={formated.meta} />

        </Description>


      </MainArticle>

      <PricingMeta>
        <PricingGrid data={formated} />
      </PricingMeta>
    </Component>
  );
};

Card.propTypes = {
  component: PropTypes.string,
  item: RawItemShape
}
Card.defaultProps = {
  component: 'li'
}

export default Card;