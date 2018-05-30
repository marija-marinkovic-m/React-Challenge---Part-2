
// Fetch Polyfill
import 'whatwg-fetch';
import makeCancelable from '../../util/makePromiseCancelable';
import { normalizeSearchResult } from './normalizers';

const API_BASE = 'https://api.myjson.com/bins';

const Api = {
  fetchResults(url) {
    return makeCancelable(fetch(`${API_BASE}/${url}`));
  }
}

export default Api;