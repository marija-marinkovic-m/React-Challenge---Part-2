import React from 'react';
import { NormalizedSearchResultShape } from '../core/api/normalizers';
import styled from 'styled-components';

import getSymbol from 'currency-symbol-map';

const MainWrap = styled.div`
  padding: 16px 20px 0 0;
  @media (max-width: 768px) {
    padding: 16px 20px 20px;
  }
`

const FlexWrap = styled.div`
  margin: 0 0 15px;
  display: flex; justify-content: space-between;
`;

const Price = styled.p`
  margin: 0; padding: 0;
  text-align: ${({alignRight}) => alignRight ? 'right' : 'left'};
  white-space: nowrap;
`;

const Amount = styled.span`
  display: block;
  padding: 4px 0 0;
  font-size: 18px; font-weight: ${({bold}) => bold ? '700' : '400'};
  line-height: 20px;
  white-space: nowrap;
`;

const Length = styled.div`
  padding: 10px 0;
  text-align: center; font-weight: bold; font-size: 18px;
  border-top: 1px solid #c7d0d9; border-bottom: 1px solid #c7d0d9;
`;


const PricingGrid = ({data: {price, saving, currency, length}}) => (
  <MainWrap>
    <FlexWrap>
      <Price>
        Our saving
        <Amount>{getSymbol(currency)}&nbsp;{saving}</Amount>
      </Price>
      <Price alignRight>
        From
        <Amount>{getSymbol(currency)}&nbsp;{price}</Amount>
      </Price>
    </FlexWrap>

    <Length>
      { length } days
    </Length>
  </MainWrap>
);

PricingGrid.propTypes = {
  data: NormalizedSearchResultShape
}

export default PricingGrid;