import React from 'react';
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

  @media (max-width: 768px) {
    width: 100%; flex-direction: column;
    & > * {width: 100% !important;}
  }
`;
const PricingMeta = styled.div`
  width: 28%;
  text-align: center;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Figure = styled.figure`
  margin: 0;
  a {
    display: block;
    overflow: hidden;
    &:last-child {
      margin-top: 4px;
    }
  }
`;

const Img = styled.img`
  display: block;
  width: 100%; height: auto;
  filter: ${({blur}) => blur ? 'blur(5px)' : 'blur(0)'};
  transition: filter 500ms ease-in;
`;


const Description = styled.div`
  margin: 0;
  padding: 16px 20px 0;
  p {
    margin: 0 0 7px;
  }
`;
const RatingWrap = styled.div`
  margin: 0 0 7px;
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

const Card = ({item}) => {
  const formated = normalizeSearchResult(item);

  // @TEMP: create placeholder images (this should be served in API response)
  const tourImagePlacehoder = item.tour_image && item.tour_image.replace('928x680', '12x9');
  const mapImagePlaceholder = item.map_image && item.map_image.replace('928x400', '12x5');

  return (
    <React.Fragment>

      <MainArticle>

        <Figure>
          <ImagePreload
            src={formated.tour_image}
            placeholderSrc={tourImagePlacehoder}
            render={(src, isPlaceholder) => <a href="#offer">
              <Img
                blur={isPlaceholder}
                src={src}
                alt={formated.tour_name}
              />
            </a>} />
          <ImagePreload
            src={formated.map_image}
            placeholderSrc={mapImagePlaceholder}
            render={(src, isPlaceholder) => <a href="#offer">
              <Img
                blur={isPlaceholder}
                src={src}
                alt={formated.tour_name + ' map'}
              />
            </a>} />
        </Figure>

        <Description>
          <TourName><a href="#offer">{formated.tour_name}</a></TourName>
          <RatingWrap><Rating value={formated.rating} /></RatingWrap>
          <p>{formated.description}</p>

          <DataList data={formated.meta} />

        </Description>


      </MainArticle>

      <PricingMeta>
        <PricingGrid data={formated} />
      </PricingMeta>
    </React.Fragment>
  );
};

Card.propTypes = {
  item: RawItemShape
}

export default Card;