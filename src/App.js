import React from 'react';
import List from './components/List';
import Api from './core/api/service';
import { normalizeSearchResult } from './core/api/normalizers';

class App extends React.Component {
  _promise = null;
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      data: null,
      error: null,
      loadedData: []
    }
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
          data,
          loadedData: data && data.length ? data.slice(0,1).map(normalizeSearchResult) : [],
          isLoading: false
        }))
        .catch(error => this.setState({error, isLoading: false}));
    });
  }

  componentWillUnmount() {
    this._promise && this._promise.cancel();
  }

  render() {
    const { error, isLoading, loadedData } = this.state;
    if (error) return <p>{error.message}</p>;
    if (isLoading) return 'Loading...';
    return (
      <div className="App">
        <List items={loadedData} />

        <pre>{JSON.stringify(loadedData)}</pre>
      </div>
    );
  }
}

export default App;
