# TheOneApi SDK

TheOneApi SDK is a JavaScript library for interacting with the [TheOneAPI](https://the-one-api.dev/) REST API. It simplifies the process of making requests to the API by providing a higher-level interface.

## Installation

TheOneApi SDK can be installed using npm:

```bash
npm install joshvermaire-sdk
```

## Usage

To use TheOneApi SDK, you must first obtain an API key from the [TheOneAPI website](https://the-one-api.dev/). Once you have an API key, you can create a new instance of the `TheOneApiSDK` class and use its methods to interact with the API.

```javascript
const TheOneApiSDK = require('joshvermaire-sdk');
const client = new TheOneApiSDK('YOUR_API_KEY');

// Example: Get movies
let movies = await client.movie.getMovies()
```

## Methods

### Movie Endpoints

#### movie.getMovies([params])

Retrieves a list of movies.

#### movie.getMovie(movieId, [params])

Retrieves a single movie by ID.

#### movie.getMovieQuotes(movieId, [params])

Retrieves a list of quotes for a specific movie.

### Optional Parameters

Each method accepts an optional `params` object. If you want to pass any additional query parameters to your API request, you can add them as key-value pairs. For example, you could add `{ limit: 1 }`, `{ page: 2 }`, `{ offset: 3 }`, or a combination of these to modify your query.

#### Sorting

You can use the params object to specify sorting and filtering options. To sort your API response, you can pass a sort object with a value property: 

```javascript
{ 
  sort: {
    value: 'name',
    direction: 'asc'
  }
}
```

Alternatively, you can use a string to specify sorting (e.g. `{ sort: 'name:asc' }`).

#### Filtering

To filter your API response, you can pass a filter object with a `key`, `operator`, and `value` properties. For example:

```javascript
{
  filter: {
    key: 'budgetInMillions',
    operator: '<',
    value: 100
  }
}
```

## Testing

To test the SDK, simply run `npm test`.
