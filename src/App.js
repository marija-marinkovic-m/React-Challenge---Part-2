import React from 'react';
import List from './components/List';
import Api from './core/api/service';
import Filter from './components/FilterDropdown';
import Loader from './components/Loader';
import sortBy from './util/sortBy';
import throttle from './util/throttle';
import styled from 'styled-components';


const DEFAULT_PER_PAGE = 4;

const Placeholder = styled.div`
  max-width: 860px;
  margin: 20px auto 60px; padding: 12px;
`;

const FiltersWrap = styled.div`
  text-align: right;
  display: ${({canFilter}) => canFilter ? 'block' : 'none'};
`;

const sortByOptions = [
  {prop: 'Lowest price first', val: 'price'},
  {prop: 'Highest price first', val: 'price.reverse'},
  {prop: 'Longest tour first', val: 'length.reverse'},
  {prop: 'Shortest tour first', val: 'length'}
];

const lazyLoaderListener = ['resize', 'scroll'];

class App extends React.Component {
  _promise = null;
  _throttleScroll;

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      data: null,
      error: null,
      loadedData: [],
      sortParam: 'price',
      loadMore: false
    }
    this._throttleScroll = throttle(this.handleOnScroll, 300, this);
  }
  componentDidMount() {
    this._promise = Api.fetchResults('18x6yt');
    this.setState({
      isLoading: true
    }, () => {
      this._promise.promise
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Something went wrong...');
          }
        })
        .then(data => this.setState({
          ...this.handleSortData(data),
          isLoading: false
        }))
        .catch(error => this.setState({error, isLoading: false}));
    });

    lazyLoaderListener
      .map(ev => window.addEventListener(ev, this._throttleScroll));

  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.sortParam !== this.state.sortParam) {
      this.setState({...this.handleSortData(this.state.data)});
    }
    if (
      prevState.loadMore !== this.state.loadMore
      && this.state.loadMore
      && this.state.data
      && this.state.data.length !== this.state.loadedData.length
    ) {
      const totalLoadedCount = this.state.loadedData.length + DEFAULT_PER_PAGE;

      this.setState({
        isLoading: true
      }, () => {
        // set small timeout to mimic waiting for API response
        setTimeout(() => {
          this.setState({
            loadedData: this.state.data.slice(0, totalLoadedCount),
            isLoading: false
          });
        }, 700);
      });
      
    }
  }

  componentWillUnmount() {
    this._promise && this._promise.cancel();
    lazyLoaderListener
      .map(ev => window.removeEventListener(ev, this._throttleScroll));
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

  handleOnScroll = () => {
    const docEl = document.documentElement;
    const offset = docEl.scrollTop + window.innerHeight;
    const height = docEl.offsetHeight;

    this.setState({loadMore: offset === height});
  }

  render() {
    const { error, isLoading, loadedData, sortParam } = this.state;
    if (error) return <p>{error.message}</p>;
    return (
      <Placeholder>
        <FiltersWrap
          canFilter={Boolean(loadedData.length)}>
          <Filter
            label="Sort by"
            items={sortByOptions}
            value={sortParam}
            onChange={this.handleFilterSort}
          />
        </FiltersWrap>
        <List items={loadedData} />

        { isLoading && <Loader /> }
      </Placeholder>
    );
  }
}

export default App;
