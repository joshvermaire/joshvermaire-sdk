let ApiClient = require('./api.js');
let TheOneApiMovieClient = require('./movie.js');

const ENDPOINTS = {
  movie: TheOneApiMovieClient
}

class TheOneApiSDK {
  constructor(apiKey) {
    if (!apiKey) {
      throw new Error('You must specify an API key in order to use the SDK');
    }
    
    this.apiClient = new ApiClient(apiKey);
    
    Object.keys(ENDPOINTS).forEach(key =>
      this[key] = new ENDPOINTS[key](this.apiClient)
    );
  }
}

module.exports = TheOneApiSDK;