
// Fetch Polyfill
import 'whatwg-fetch';
import makeCancelable from '../../util/makePromiseCancelable';

const API_BASE = 'https://api.myjson.com/bins';

const Api = {
  fetchResults(url) {
    return makeCancelable(new Promise(function(resolve, reject) {
      const { default: data } = require('../../response-mock');
      console.log(data);
      resolve(data);
    }));
    // return makeCancelable(fetch(`${API_BASE}/${url}`));
  }
}

export default Api;