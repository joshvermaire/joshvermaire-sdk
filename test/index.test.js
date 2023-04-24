let TheOneApiSDK = require('../src/index.js');

describe('TheOneApiSDK', () => {
  test('throws an error if no API key is specified', () => {
    expect(() => {
      const client = new TheOneApiSDK();
    }).toThrow('You must specify an API key in order to use the SDK');
  });

  test('can be instantiated with an API key', () => {
    const client = new TheOneApiSDK('API_KEY');
    expect(client.apiClient.headers.Authorization).toEqual('Bearer API_KEY');
  });
});