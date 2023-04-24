const BASE_URL = 'https://the-one-api.dev/v2/';

class TheOneApiClient {
  constructor(apiKey) {
    this.baseUrl = BASE_URL;
    this.headers = { 'Authorization': `Bearer ${apiKey}` };
  }

  // Implementation of GET
  // Additional POST, PATCH, UPDATE, DELETE methods can added in the future

  async get(endpoint, params = {}) {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    this._parseParams(url, params);
    const response = await fetch(url, { headers: this.headers });
    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}. ${response.status}: ${response.statusText}`);
    }
    let json = await response.json();
    if (json.docs) {
      return json.docs;
    } else {
      return json;
    }
  }

  _parseParams(url, params) {
    let { sort, filter} = params;

    if (filter && filter instanceof Object) {
      this._parseFilter(url, params);
    }

    if (sort) {
      this._parseSort(url, params);
    }

    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  }

  _parseFilter(url, params) {
    let { filter } = params;
    let { key, operator, value } = filter;
    if (!key || !operator || value == null) {
      throw new Error('Filter parameter requires: `key`, `operator`, and `value`');
    }
    
    this._updateQueryParams(url, `${key}${operator}${value}`);
    delete params.filter;
  }

  _parseSort(url, params) {
    let { sort } = params;
    if (sort instanceof Object) {
      let { value, direction } = sort;
      if (!value) {
        throw new Error('Sort parameter requires: `value`')
      }
      direction ||= 'desc';
      sort = `${value}:${direction}`;
    }

    this._updateQueryParams(url, `sort=${sort}`);
    delete params.sort;
  }

  _updateQueryParams(url, query) {
    if (url.search) {
      url.search += `&${query}`;
    } else {
      url.search = `?${query}`;
    }
  }
}

module.exports = TheOneApiClient;