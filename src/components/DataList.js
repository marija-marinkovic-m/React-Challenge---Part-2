import React from 'react';
import styled from 'styled-components';
import { ItemMetaShape } from '../core/api/normalizers';

const Title = styled.dt`
  text-transform: uppercase;
`;

const Definition = styled.dd`
  font-size: 12px;
`;

const DataList = (data) => (
  data && (<dl>
    { Object.keys(data)
      .filter(e => data[e])
      .map((prop,i) => (<React.Fragment key={i}>
        <Title>{prop}</Title>
        <Definition>{JSON.stringify(data[prop])}</Definition>
      </React.Fragment>
    )) }
  </dl>)
);

// const DataList = (data) => (
//   <pre>{JSON.stringify(data)}</pre>
// );

DataList.propTypes = {
  data: ItemMetaShape
}
DataList.defaultProps = {
  data: null
}

export default DataList;