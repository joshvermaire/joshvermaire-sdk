let TheOneApiClient = require('../src/api.js');

const API_KEY = 'TEST_API_KEY';
const BASE_URL = 'https://the-one-api.dev/v2/';

describe('TheOneApiClient', () => {
  describe('constructor', () => {
    it('should initialize a client with the base URL and headers', () => {
      
      const client = new TheOneApiClient(API_KEY);

      expect(client.baseUrl).toBe(BASE_URL);
      expect(client.headers).toEqual({'Authorization': `Bearer ${API_KEY}`});
    });
  });

  describe('get', () => {
    let originalFetch;

    beforeAll(() => originalFetch = global.fetch);
    afterEach(() => global.fetch = originalFetch);

    it('should send a GET request to the specified endpoint with the provided parameters', async () => {
      const endpoint = 'test-endpoint';
      const params = { limit: 1, page: 2 };

      const expectedUrl = new URL(`${BASE_URL}test-endpoint?limit=1&page=2`);
      const expectedOptions = { headers: { 'Authorization': "Bearer TEST_API_KEY" }
      };

      const expectedData = { data: 'test-data' };

      global.fetch = jest.fn(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve(expectedData)
      }));

      const client = new TheOneApiClient(API_KEY);
      const responseData = await client.get(endpoint, params);
      
      expect(global.fetch).toHaveBeenCalledWith(expectedUrl, expect.objectContaining(expectedOptions));
      expect(responseData).toEqual(expectedData);
    });

    it('should throw an error if the fetch method returns a non-OK status', async () => {
      global.fetch = jest.fn(() => Promise.resolve({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error'
      }));

      const client = new TheOneApiClient(API_KEY);
      const requestPromise = client.get('test-endpoint');

      await expect(requestPromise).rejects.toThrowError(
        `Failed to fetch ${BASE_URL}test-endpoint. 500: Internal Server Error`
      );
    });

    describe('should send a GET request with the correct sort parameters', () => {

      const endpoint = 'test-endpoint';
      const expectedOptions = { headers: { 'Authorization': "Bearer TEST_API_KEY" } };

      it('by string', async () => {
        const expectedUrl = new URL(`${BASE_URL}test-endpoint?sort=name:asc`);
        const params = { sort: 'name:asc' };

        global.fetch = jest.fn(() => Promise.resolve({
          ok: true,
          json: () => Promise.resolve({})
        }));

        const client = new TheOneApiClient(API_KEY);
        await client.get(endpoint, params);
        
        expect(global.fetch).toHaveBeenCalledWith(expectedUrl, expect.objectContaining(expectedOptions));
      });

      it('by object', async () => {
        const expectedUrl = new URL(`${BASE_URL}test-endpoint?sort=name:asc`);
        const params = { sort: { value: 'name', direction: 'asc' }};

        global.fetch = jest.fn(() => Promise.resolve({
          ok: true,
          json: () => Promise.resolve({})
        }));

        const client = new TheOneApiClient(API_KEY);
        const responseData = await client.get(endpoint, params);
        
        expect(global.fetch).toHaveBeenCalledWith(expectedUrl, expect.objectContaining(expectedOptions));
      });

      it('by object defaults to desc', async () => {
        const expectedUrl = new URL(`${BASE_URL}test-endpoint?sort=name:desc`);
        const params = { sort: { value: 'name' }};

        global.fetch = jest.fn(() => Promise.resolve({
          ok: true,
          json: () => Promise.resolve({})
        }));

        const client = new TheOneApiClient(API_KEY);
        const responseData = await client.get(endpoint, params);
        
        expect(global.fetch).toHaveBeenCalledWith(expectedUrl, expect.objectContaining(expectedOptions));
      });
    });


    describe('should send a filtered GET request', () => {
      const endpoint = 'test-endpoint';
      const expectedUrl = new URL(`${BASE_URL}test-endpoint?budgetInMillions<100`);
      const expectedOptions = { headers: { 'Authorization': "Bearer TEST_API_KEY" } };

      it('with the correct filter parameters', async () => {
        const params = { filter: { key: 'budgetInMillions', operator: '<', value: 100 } };

        global.fetch = jest.fn(() => Promise.resolve({
          ok: true,
          json: () => Promise.resolve({})
        }));

        const client = new TheOneApiClient(API_KEY);
        await client.get(endpoint, params);
        
        expect(global.fetch).toHaveBeenCalledWith(expectedUrl, expect.objectContaining(expectedOptions));
      });

      it('and with the incorrect filter parameters should error', async () => {
        const params = { filter: { key: 'budgetInMillions', operator: '<' } };

        global.fetch = jest.fn(() => Promise.resolve({
          ok: true,
          json: () => Promise.resolve({})
        }));

        const client = new TheOneApiClient(API_KEY);
        const requestPromise = client.get(endpoint, params);
        
        await expect(requestPromise).rejects.toThrowError(
          'Filter parameter requires: `key`, `operator`, and `value`'
        );
      });
    });
  });
});
