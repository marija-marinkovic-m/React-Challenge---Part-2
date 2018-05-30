import React from 'react';
import List from './components/List';
import Api from './core/api/service';
import Filter from './components/FilterDropdown';
import sortBy from './util/sortBy';
import styled from 'styled-components';

const DEFAULT_PER_PAGE = 4;

const Placeholder = styled.div`
  max-width: 860px;
  margin: 20px auto 60px; padding: 12px;
`;

const FiltersWrap = styled.div`
  text-align: right;
`;

const sortByOptions = [
  {prop: 'Lowest price first', val: 'price'},
  {prop: 'Highest price first', val: 'price.reverse'},
  {prop: 'Longest tour first', val: 'length.reverse'},
  {prop: 'Shortest tour first', val: 'length'}
];

class App extends React.Component {
  _promise = null;
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      data: null,
      error: null,
      loadedData: [],
      sortParam: 'price'
    }
  }
  componentDidMount() {
    this._promise = Api.fetchResults('18x6yt');
    this.setState({
      isLoading: true
    }, () => {
      this._promise.promise
        // .then(response => {
        //   if (response.ok) {
        //     return response.json();
        //   } else {
        //     throw new Error('Something went wrong...');
        //   }
        // })
        .then(data => this.setState({
          ...this.handleSortData(data),
          isLoading: false
        }))
        .catch(error => this.setState({error, isLoading: false}));
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.sortParam !== this.state.sortParam) {
      this.setState({...this.handleSortData(this.state.data)});
    }
  }

  componentWillUnmount() {
    this._promise && this._promise.cancel();
  }

  handleFilterSort = (e) => {
    this.setState({sortParam: e.target.value});
  }

  handleSortData = (theData) => {
    const { loadedData, sortParam } = this.state;
    if (!theData || !theData.length) return {};

    const totalLoaded = loadedData.length || DEFAULT_PER_PAGE;
    const config = sortParam.split('.');
    const data = theData.sort(sortBy(config[0], config.length > 1, parseInt));
    return {
      data,
      loadedData: data.slice(0, totalLoaded)
    };
  }

  render() {
    const { error, isLoading, loadedData, sortParam } = this.state;
    if (error) return <p>{error.message}</p>;
    if (isLoading) return 'Loading...';
    return (
      <Placeholder>
        <FiltersWrap>
          <Filter
            label="Sort by"
            items={sortByOptions}
            value={sortParam}
            onChange={this.handleFilterSort}
          />
        </FiltersWrap>
        <List items={loadedData} />
      </Placeholder>
    );
  }
}

export default App;
