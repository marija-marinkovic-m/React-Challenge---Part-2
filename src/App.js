import React from 'react';
import makeCancelable from './util/makePromiseCancelable';
import List from './components/List';

import 'whatwg-fetch';

class App extends React.Component {
  _promise = null;
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      data: null,
      error: null
    }
  }
  componentDidMount() {
    this._promise = makeCancelable(
      fetch('https://api.myjson.com/bins/18x6yt')
    );
    this.setState({
      isLoading: true
    }, () => {
      this._promise
        .promise
        .then(response => {
          if (response.ok) {
            return response.json()
          } else {
            throw new Error('Something went wrong...');
          }
        })
        .then(data => this.setState({data, isLoading: false}))
        .catch(error => this.setState({error, isLoading: false}));
    });
  }

  componentWillUnmount() {
    this._promise && this._promise.cancel();
  }

  render() {
    const { error, isLoading, data } = this.state;
    if (error) return <p>{error.message}</p>;
    if (isLoading) return 'Loading...';
    return (
      <div className="App">
        <List items={data} />
      </div>
    );
  }
}

export default App;
