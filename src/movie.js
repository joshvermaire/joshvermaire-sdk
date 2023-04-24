class TheOneApiMovieClient {
  constructor(apiClient) {
    this.api = apiClient;
  }
  
  async getMovies(params) {
    return await this.api.get('movie', params);
  }

  async getMovie(movieId, params) {
    return await this.api.get(`movie/${movieId}`, params);
  }

  async getMovieQuotes(movieId, params) {
    return await this.api.get(`movie/${movieId}/quote`, params);
  }

}

module.exports = TheOneApiMovieClient;