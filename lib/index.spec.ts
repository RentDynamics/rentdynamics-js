import { Client, ClientOptions, ClientHelpers, BASE_URL } from './index';
import Chance from 'chance';

const createFetchMock = (overrides: Record<string, any> = {}) => {
  const opts = {
    ok: true,
    json: '',
    text: '',
    ...overrides
  };
  const m = {
    ok: opts.ok,
    json: () => Promise.resolve(opts.json),
    text: () => Promise.resolve(opts.text)
  };
  return Promise.resolve(m);
};

describe('get', () => {
  test('get calls fetch with method GET - fail', async () => {
    // setup and configure chance
    const chance = new Chance();

    // setup options for client
    const options = new ClientOptions();
    options.apiKey = chance.string();
    options.apiSecretKey = chance.string();

    // arrange
    const rdClient = new Client(options);
    const endpoint = chance.string();
    const spy = jest.spyOn(global, 'fetch').mockResolvedValue(createFetchMock({ ok: false }));

    // act
    const response = await rdClient.get(endpoint);

    // assert
    expect(spy.mock.calls.length).toBe(1);
  });

  test('get calls fetch with method GET - success', async () => {
    // setup and configure chance
    const chance = new Chance();

    // setup options for client
    const options = new ClientOptions();
    options.apiKey = chance.string();
    options.apiSecretKey = chance.string();

    // arrange
    const rdClient = new Client(options);
    const endpoint = chance.string();
    const spy = jest.spyOn(global, 'fetch').mockResolvedValue(createFetchMock());

    // act
    await rdClient.get(endpoint);

    // assert
    expect(spy.mock.calls.length).toBe(1);
  });

  test('get with parameters calls fetch with method GET - success', async () => {
    // setup and configure chance
    const chance = new Chance();

    // setup options for client
    const options = new ClientOptions();
    options.apiKey = chance.string();
    options.apiSecretKey = chance.string();

    // arrange
    const rdClient = new Client(options);
    const endpoint = chance.string();
    const spy = jest.spyOn(global, 'fetch').mockResolvedValue(createFetchMock());

    // act
    await rdClient.get(endpoint);

    // assert
    expect(spy.mock.calls.length).toBe(1);
    expect(spy.mock.calls[0][0]).toEqual(`https://api.rentdynamics.dev${endpoint}`);
  });
});

describe('put', () => {
  test('put calls fetch with method PUT - fail', async () => {
    // setup and configure chance
    const chance = new Chance();

    // setup options for client
    const options = new ClientOptions();
    options.apiKey = chance.string();
    options.apiSecretKey = chance.string();

    // arrange
    const rdClient = new Client(options);
    const payload = {};
    const endpoint = chance.string();
    const spy = jest.spyOn(global, 'fetch').mockResolvedValue(createFetchMock({ ok: false }));

    // act
    const response = await rdClient.put(endpoint, payload);

    // assert
    expect(spy.mock.calls.length).toBe(1);
  });

  test('put calls fetch with method PUT - success', async () => {
    // setup and configure chance
    const chance = new Chance();

    // setup options for client
    const options = new ClientOptions();
    options.apiKey = chance.string();
    options.apiSecretKey = chance.string();

    // arrange
    const rdClient = new Client(options);
    const payload = {};
    const endpoint = chance.string();
    const spy = jest.spyOn(global, 'fetch').mockResolvedValue(createFetchMock({ ok: false }));

    // act
    const response = await rdClient.put(endpoint, payload);

    // assert
    expect(spy.mock.calls.length).toBe(1);
  });
});

describe('post', () => {
  test('post calls fetch with method POST - fail', async () => {
    // setup and configure chance
    const chance = new Chance();

    // setup options for client
    const options = new ClientOptions();
    options.apiKey = chance.string();
    options.apiSecretKey = chance.string();

    // arrange
    const rdClient = new Client(options);
    const payload = {};
    const endpoint = chance.string();
    const spy = jest.spyOn(global, 'fetch').mockResolvedValue(createFetchMock({ ok: false }));

    // act
    const response = await rdClient.post(endpoint, payload);

    // assert
    expect(spy.mock.calls.length).toBe(1);
  });

  test('post calls fetch with method POST - success', async () => {
    // setup and configure chance
    const chance = new Chance();

    // setup options for client
    const options = new ClientOptions();
    options.apiKey = chance.string();
    options.apiSecretKey = chance.string();

    // arrange
    const rdClient = new Client(options);
    const payload = {};
    const endpoint = chance.string();
    const spy = jest.spyOn(global, 'fetch').mockResolvedValue(createFetchMock());

    // act
    const response = await rdClient.post(endpoint, payload);

    // assert
    expect(spy.mock.calls.length).toBe(1);
  });
});

describe('delete', () => {
  test('delete calls fetch with method DELETE - fail', async () => {
    // setup and configure chance
    const chance = new Chance();

    // setup options for client
    const options = new ClientOptions();
    options.apiKey = chance.string();
    options.apiSecretKey = chance.string();

    // arrange
    const rdClient = new Client(options);
    const endpoint = chance.string();
    const spy = jest.spyOn(global, 'fetch').mockResolvedValue(createFetchMock({ ok: false }));

    // act
    const response = await rdClient.delete(endpoint);

    // assert
    expect(spy.mock.calls.length).toBe(1);
  });

  test('delete calls fetch with method DELETE - success', async () => {
    // setup and configure chance
    const chance = new Chance();

    // setup options for client
    const options = new ClientOptions();
    options.apiKey = chance.string();
    options.apiSecretKey = chance.string();

    // arrange
    const rdClient = new Client(options);
    const endpoint = chance.string();
    const spy = jest.spyOn(global, 'fetch').mockResolvedValue(createFetchMock());

    // act
    const response = await rdClient.delete(endpoint);

    // assert
    expect(spy.mock.calls.length).toBe(1);
  });
});

describe('login', () => {
  test('login calls', async () => {
    // setup and configure chance
    const chance = new Chance();

    // setup options for client
    const options = new ClientOptions();
    options.apiKey = chance.string();
    options.apiSecretKey = chance.string();

    // arrange
    const rdClient = new Client(options);
    const username = chance.string();
    const password = chance.string();
    const spy = jest.spyOn(global, 'fetch').mockResolvedValue(createFetchMock({ ok: false }));

    // act
    const response = await rdClient.login(username, password);

    // assert
    expect(spy.mock.calls.length).toBe(1);
    expect(response.ok).toBe(false);
  });

  test('when login calls post authToken should be set to returned token', async () => {
    // setup and configure chance
    const chance = new Chance();
    const expectedToken = chance.apple_token();

    // setup options for client
    const options = new ClientOptions();
    options.apiKey = chance.string();
    options.apiSecretKey = chance.string();

    // arrange
    const rdClient = new Client(options);
    const username = chance.string();
    const password = chance.string();
    const spyPost = jest.spyOn(global, 'fetch').mockReturnValue(
      createFetchMock({
        text: expectedToken
      })
    );

    // act
    const response = await rdClient.login(username, password);

    // assert
    expect(spyPost).toHaveBeenCalledTimes(1);
    expect(options.authToken).toEqual(expectedToken);
    expect(response.ok).toBe(true);
  });
});

describe('logout', () => {
  test('logout calls', async () => {
    // setup and configure chance
    const chance = new Chance();

    // setup options for client
    const options = new ClientOptions();
    options.apiKey = chance.string();
    options.apiSecretKey = chance.string();
    options.authToken = chance.string();

    // arrange
    const rdClient = new Client(options);
    const spy = jest.spyOn(global, 'fetch').mockResolvedValue(createFetchMock());

    // act
    const response = await rdClient.logout();

    // assert
    expect(spy).toHaveBeenCalled();
    expect(spy.mock.calls.length).toBe(1);
  });

  test('when logout calls post authToken should be set to undefined', async () => {
    // setup and configure chance
    const chance = new Chance();
    const expectedToken = undefined;

    // setup options for client
    const options = new ClientOptions();
    options.apiKey = chance.string();
    options.apiSecretKey = chance.string();
    options.authToken = chance.apple_token();

    // arrange
    const rdClient = new Client(options);
    const spyPost = jest.spyOn(global, 'fetch').mockReturnValue(createFetchMock());

    // act
    const response = await rdClient.logout();

    // assert
    expect(spyPost).toHaveBeenCalledTimes(1);
    expect(options.authToken).toEqual(expectedToken);
  });
});

describe('client options', () => {
  it('takes baseUrl by enum', () => {
    const opts = new ClientOptions(BASE_URL.DEV_RP);
    expect(opts.baseUrl).toBe('https://api-dev.rentplus.com');
  });

  it('takes custom baseUrl', () => {
    const opts = new ClientOptions('foo');
    expect(opts.baseUrl).toBe('foo');
  });
});

describe('formatPayload', () => {
  test('should alphabetize items in dictionary', () => {
    // arrange
    const payload = { orange: 1, blue: 2 };
    const options = new ClientOptions();
    const clientHelpers = new ClientHelpers(options);

    // act
    const result = clientHelpers.formatPayload(payload);

    // assert
    expect(Object.keys(result)[0]).toEqual('blue');
  });

  test('should alphabetize nested items', () => {
    // arrange
    const payload = { orange: 1, blue: { red: 21, pink: 22 } };
    const options = new ClientOptions();
    const clientHelpers = new ClientHelpers(options);

    // act
    const result = clientHelpers.formatPayload(payload);

    // assert
    expect(Object.keys(result['blue'])[0]).toEqual('pink');
  });

  test('should alphabetize keys even when their values are null', () => {
    // arrange
    const payload = { orange: null, blue: null };
    const options = new ClientOptions();
    const clientHelpers = new ClientHelpers(options);

    // act
    const result = clientHelpers.formatPayload(payload);

    // assert
    expect(Object.keys(result)[0]).toEqual('blue');
  });

  test('should remove spaces from formatted items', () => {
    // arrange
    const payload = { orange: 1, blue: { red: 'a  f  g', pink: 'b  t  g' } };
    const options = new ClientOptions();
    const clientHelpers = new ClientHelpers(options);

    // act
    const result = clientHelpers.formatPayload(payload);

    // assert
    expect(result['blue']['pink']).toEqual('btg');
  });

  test('should pass with Array inside of object', () => {
    // arrange
    const payload = {
      orange: 5,
      blue: [
        { red: 6, pink: 7 },
        { green: 3, blue: 4 }
      ]
    };
    const options = new ClientOptions();
    const clientHelpers = new ClientHelpers(options);

    // act
    const result = clientHelpers.formatPayload(payload);

    // assert
    expect(Object.keys(result['blue'][0])[0]).toEqual('pink');
  });

  test('should pass with Array of primitive values', () => {
    // arrange
    const payload = {
      orange: 5,
      blue: [1, 5, 2]
    };
    const options = new ClientOptions();
    const clientHelpers = new ClientHelpers(options);

    // act
    const result = clientHelpers.formatPayload(payload);

    // assert
    expect(result['orange']).toEqual(5);
    expect(result['blue'][0]).toEqual(1);
    expect(result['blue'][1]).toEqual(5);
    expect(result['blue'][2]).toEqual(2);
  });
});

describe('getNonce', () => {
  const timestamp = 1744825113438;
  const url = '/someUrlolz';
  let clientHelpers!: ClientHelpers;

  beforeEach(() => {
    const options = new ClientOptions();
    options.apiKey = 'nJYLab]!';
    options.apiSecretKey = 'ka4B#%NYx';
    clientHelpers = new ClientHelpers(options);
  });

  const getFormattedPayloadFor = (payload: Record<string, any>) =>
    JSON.stringify(clientHelpers.formatPayload(payload));

  test('should handle arrays of primitive values', async () => {
    // arrange
    const formattedPayload = getFormattedPayloadFor({
      orange: 5,
      blue: [1, 5, 2]
    });

    // act
    const result = await clientHelpers.getNonce(timestamp, url, formattedPayload);

    // assert
    expect(result).toEqual('0da0f05839bef83df7382f9d936c236418f7bb3c');
  });

  test('should return hash of timestamp, url, payload and secret key', async () => {
    // arrange
    const formattedPayload = getFormattedPayloadFor({
      orange: 1,
      blue: {
        red: 'a  f  g',
        pink: 'b  t  g'
      }
    });

    // act
    const result = await clientHelpers.getNonce(timestamp, url, formattedPayload);

    // assert
    expect(result).toEqual('608e3b1b7fc9f68b226275d8125554adf1f44086');
  });

  test('should return hash of timestamp, url and secret key if no payload exists', async () => {
    // arrange / act
    const result = await clientHelpers.getNonce(timestamp, url);

    // assert
    expect(result).toEqual('a724eb47b4fc644b2fe1fd5a0b778fc6cff1930c');
  });

  test('should return empty string if missing apiSecretKey', async () => {
    // arrange
    const o = new ClientOptions();
    o.apiKey = 'nJYLab]!';
    const c = new ClientHelpers(o);
    const formattedPayload = c.formatPayload(
      JSON.stringify({
        orange: 1,
        blue: {
          red: 'a  f  g',
          pink: 'b  t  g'
        }
      })
    );

    // act
    const result = await c.getNonce(timestamp, url, formattedPayload);

    // assert
    expect(result).toEqual('');
  });
});

describe('getHeaders', () => {
  test('should return authorization header if there is an authToken', () => {
    // arrange
    const chance = new Chance();
    const url = '/someUrlolz';
    const options = new ClientOptions();
    options.apiKey = chance.string();
    options.apiSecretKey = chance.string();
    options.authToken = 'akK9KL2';
    const clientHelpers = new ClientHelpers(options);

    // act
    const result = clientHelpers.getHeaders(url);

    // assert
    expect(result['Authorization']).toBeDefined();
  });

  test('should not return authorization header if there isnt an authToken', () => {
    // arrange
    const chance = new Chance();
    const url = '/someUrlolz';
    const options = new ClientOptions();
    options.authToken = '';
    options.apiKey = chance.string();
    options.apiSecretKey = chance.string();
    const clientHelpers = new ClientHelpers(options);

    // act
    const result = clientHelpers.getHeaders(url);
    // assert
    expect(result['Authorization']).toBeUndefined();
  });

  test('should return x-rd-api-key header', () => {
    // arrange
    const chance = new Chance();
    const url = '/someUrlolz';
    const options = new ClientOptions();
    options.apiKey = chance.string();
    options.apiSecretKey = chance.string();
    const clientHelpers = new ClientHelpers(options);

    // act
    const result = clientHelpers.getHeaders(url);

    // assert
    expect(result['x-rd-api-key']).toBeDefined();
  });

  test('should return x-rd-api-nonce header', () => {
    // arrange
    const chance = new Chance();
    const url = '/someUrlolz';
    const payload = { orange: 1, blue: 2 };
    const options = new ClientOptions();
    options.apiKey = chance.string();
    options.apiSecretKey = chance.string();
    const clientHelpers = new ClientHelpers(options);

    // act
    const result = clientHelpers.getHeaders(url, payload);

    // assert
    expect(result['x-rd-api-nonce']).toBeDefined();
  });

  test('should return x-rd-timestamp header', () => {
    // arrange
    const chance = new Chance();
    const url = '/someUrlolz';
    const options = new ClientOptions();
    options.apiKey = chance.string();
    options.apiSecretKey = chance.string();
    const clientHelpers = new ClientHelpers(options);

    // act
    const result = clientHelpers.getHeaders(url);

    // assert
    expect(result['x-rd-timestamp']).toBeDefined();
  });

  test('should return Content-Type header', () => {
    // arrange
    const chance = new Chance();
    const url = '/someUrlolz';
    const options = new ClientOptions();
    options.apiKey = chance.string();
    options.apiSecretKey = chance.string();
    const clientHelpers = new ClientHelpers(options);

    // act
    const result = clientHelpers.getHeaders(url);

    // assert
    expect(result['Content-Type']).toBeDefined();
    expect(result['Content-Type']).toEqual('application/json');
  });

  test('should return empty headers if missing apiKey and apiSecretKey', () => {
    // arrange
    const url = '/someUrlolz';
    const options = new ClientOptions();
    options.apiKey = undefined;
    options.apiSecretKey = undefined;
    const clientHelpers = new ClientHelpers(options);

    // act
    const result = clientHelpers.getHeaders(url);

    // assert
    expect(result['Authorization']).toEqual(undefined);
    expect(result['x-rd-api-key']).toEqual(undefined);
    expect(result['x-rd-api-nonce']).toEqual(undefined);
    expect(result['x-rd-timestamp']).toEqual(undefined);
    expect(result['Content-Type']).toEqual(undefined);
  });
});
