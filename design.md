# SDK Design

The One API SDK is a JavaScript library that provides a simple interface for interacting with The One API. The SDK is currently composed of three files: `index.js`, `api.js`, and `movie.js`.

## `index.js`

The `index.js` file is the entry point for the SDK. In it is a class called `TheOneApiSDK` that accepts an API key as its only argument. It then creates an instance of `TheOneApiClient` with the provided API key, and instantiates helpers for each endpoint of the API (currently only supports the `/movie` endpoints.

## `api.js`

The `api.js` file provides the implementation for the `TheOneApiClient` class, which handles communication with the The One API. The class includes a `get()` method for making GET requests to the API, with support for advanced filtering and sorting. Additional HTTP methods will be supported in the future.

## `movie.js`

The `movie.js` file provides the implementation for the `TheOneApiMovieClient` class, which provides methods for interacting with the `/movie` endpoints of the API. It includes methods for getting a list of movies, getting movie details, and getting movie quotes.