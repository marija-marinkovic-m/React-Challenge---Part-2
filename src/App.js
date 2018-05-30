import React from 'react';
import List from './components/List';
import Api from './core/api/service';
import styled from 'styled-components';

const Placeholder = styled.div`
  max-width: 860px;
  margin: 20px auto;
`;

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
        // .then(response => {
        //   if (response.ok) {
        //     return response.json();
        //   } else {
        //     throw new Error('Something went wrong...');
        //   }
        // })
        .then(data => this.setState({
          data,
          loadedData: data && data.length ? data.slice(0,4) : [],
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
      <Placeholder>
        <List items={loadedData} />
      </Placeholder>
    );
  }
}

export default App;
