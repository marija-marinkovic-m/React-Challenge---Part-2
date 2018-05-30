import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ItemMetaShape } from '../core/api/normalizers';

const Wrapper = styled.table`
  margin: 12px 0 0;
  font-size: 10px;
`;

const Row = styled.tr`
  line-height: 18px; vertical-align: top;
`;
const Title = styled.th`
  padding: 0 15px 0 0;
  font-size: 10px; color: #818d99; font-weight: normal;
  text-transform: uppercase;
  white-space: nowrap;
`;

const Definition = styled.td`
  font-size: 12px;
`;

const ShowMore = styled.span`
  display: inline-block;
  padding: 0 10px;
  color: #409cd1;
  cursor: pointer;
  &:hover {
    color: #30759d;
  }
`;

class ExpandableList extends React.Component {
  state = {
    expanded: false
  }
  static propTypes = {
    items: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    maxSize: PropTypes.number
  }
  static defaultProps = {
    maxSize: 2
  }
  toggleExpand = (e) => {
    if (e) e.preventDefault();
    this.setState({expanded: !this.state.expanded})
  }

  render() {
    const { items, maxSize } = this.props;
    if (!items) return null;
    if (typeof items === 'string') return items;
    if (!Array.isArray(items)) return null;
    if (items.length <= maxSize || this.state.expanded) return items.join(', ');
    
    return <React.Fragment>
      { items.slice(0,maxSize).join(', ') } <ShowMore onClick={this.toggleExpand}>+ {(items.length-maxSize)} more</ShowMore>
    </React.Fragment>
  }
}


const DataList = ({data}) => (
  data && (<Wrapper>
    {
      Object.keys(data)
        .filter(e => data[e])
        .map(function (prop,i) {
          return (<Row key={i}>
              <Title>{prop}</Title>
              <Definition><ExpandableList items={data[prop]} maxSize={1} /></Definition>
            </Row>
          );
        })
    }
  </Wrapper>)
);

DataList.propTypes = {
  data: ItemMetaShape
}
DataList.defaultProps = {
  data: null
}

export default DataList;