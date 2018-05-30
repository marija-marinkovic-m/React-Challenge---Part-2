
// Fetch Polyfill
import 'whatwg-fetch';
import makeCancelable from '../../util/makePromiseCancelable';

import { API_BASE } from '../../constants';

const Api = {
  fetchResults(url) {
    return makeCancelable(fetch(`${API_BASE}/${url}`));
  }
}

export default Api;