let TheOneApiMovieClient = require('../src/movie.js');
let TheOneApiSDK = require('../src/index.js');

const MOVIE_ARRAY = [
  {
    "_id": "5cd95395de30eff6ebccde56",
    "name": "The Lord of the Rings Series",
    "runtimeInMinutes": 558,
    "budgetInMillions": 281,
    "boxOfficeRevenueInMillions": 2917,
    "academyAwardNominations": 30,
    "academyAwardWins": 17,
    "rottenTomatoesScore": 94
  }, 
  {
    "_id": "5cd95395de30eff6ebccde57",
    "name": "The Hobbit Series",
    "runtimeInMinutes": 462,
    "budgetInMillions": 675,
    "boxOfficeRevenueInMillions": 2932,
    "academyAwardNominations": 7,
    "academyAwardWins": 1,
    "rottenTomatoesScore": 66.33333333
  }
];

const QUOTE_ARRAY = [
  {
      "_id": "5cd96e05de30eff6ebcce7e9",
      "dialog": "Deagol!",
      "movie": "5cd95395de30eff6ebccde5d",
      "character": "5cd99d4bde30eff6ebccfe9e",
      "id": "5cd96e05de30eff6ebcce7e9"
    }
];

describe('TheOneApiMovieClient', () => {
  describe('getMovies', () => {
    it('returns an array of movies', async () => {
      const apiClient = {
        get: jest.fn().mockResolvedValue(MOVIE_ARRAY)
      };
      const params = {};
      
      const movieClient = new TheOneApiMovieClient(apiClient);
      const movies = await movieClient.getMovies(params);

      expect(apiClient.get).toHaveBeenCalledWith('movie', params);
      expect(movies).toEqual(MOVIE_ARRAY);
    });
  });

  describe('getMovie', () => {
    it('returns a single movie', async () => {
      const apiClient = {
        get: jest.fn().mockResolvedValue(MOVIE_ARRAY[0])
      };
      
      const params = {};
      const movieClient = new TheOneApiMovieClient(apiClient);
      const movies = await movieClient.getMovie(MOVIE_ARRAY[0]._id, params);

      expect(apiClient.get).toHaveBeenCalledWith(`movie/${MOVIE_ARRAY[0]._id}`, params);
      expect(movies).toEqual(MOVIE_ARRAY[0]);
    });
  });

  describe('getMovieQuotes', () => {
    it('returns movie quotes', async () => {
      const apiClient = {
        get: jest.fn().mockResolvedValue(QUOTE_ARRAY)
      };
      
      let mockMovieId = '5cd95395de30eff6ebccde5d';

      const params = { limit: 1 };
      const movieClient = new TheOneApiMovieClient(apiClient);
      const movies = await movieClient.getMovieQuotes(mockMovieId, params);

      expect(apiClient.get).toHaveBeenCalledWith(`movie/${mockMovieId}/quote`, params);
      expect(movies).toEqual(QUOTE_ARRAY);
    });
  });
});
