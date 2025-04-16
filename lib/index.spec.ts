import { Client, ClientOptions, ClientHelpers } from './index';
import Chance from 'chance';

const createFetchMock = (ok = true) => {
  const m = {
    ok,
    json: () => Promise.resolve(m),
    clone: () => m,
    text: () => Promise.resolve(''),
    catch: () => {}
  };

  return Promise.resolve(m);
};

describe('all', () => {
  // setup and configure chance
  let chance = new Chance();
  // setup options for client
  let options = new ClientOptions();
  options.development = true;
  options.apiKey = chance.string();
  options.apiSecretKey = chance.string();
  let rdClient: Client | any = new Client(options);
  let mockText = '';
  let mockFetchResultObject = {
    ok: true,
    clone: () => {
      return mockFetchResultObject;
    },
    json: () => {
      return mockFetchResultObject;
    },
    text: jest.fn().mockReturnValue(Promise.resolve(mockText)),
    catch: (cb: any) => {
      return cb(mockText);
    }
  };
  let mockFetchPromiseObject = {
    then: (cb: any) => {
      cb(mockFetchResultObject);
    }
  };

  test.each([['get'], ['put'], ['post'], ['delete']])(
    'when %s calls fetch and server returns empty success response it should return successful',
    async methodName => {
      // arrange
      let endpoint = chance.string();
      let spy = jest.spyOn(rdClient, '_fetch').mockResolvedValue(mockFetchPromiseObject);
      let include = chance.string();
      let parameters = { include: [include] };

      // act
      const result = await rdClient[methodName](endpoint, parameters);

      // assert
      expect.assertions(3);
      expect(result).toEqual(mockText);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(mockFetchResultObject.text).toHaveBeenCalledTimes(1);
    }
  );

  test.each([['get'], ['put'], ['post'], ['delete']])(
    'when %s calls fetch and server returns empty error response it should return not successful',
    async methodName => {
      // arrange
      mockFetchResultObject.ok = false;
      let endpoint = chance.string();
      let spy = jest.spyOn(rdClient, '_fetch').mockResolvedValue(mockFetchPromiseObject);
      let include = chance.string();
      let parameters = { include: [include] };

      // act
      const result = await rdClient[methodName](endpoint, parameters);

      // assert
      expect.assertions(3);
      expect(result).toEqual(mockFetchResultObject);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(mockFetchResultObject.text).toHaveBeenCalledTimes(0);
    }
  );
});

describe('get', () => {
  test('get calls fetch with method GET - fail', async () => {
    // setup and configure chance
    let chance = new Chance();

    // setup options for client
    let options = new ClientOptions();
    options.apiKey = chance.string();
    options.apiSecretKey = chance.string();

    // arrange
    let rdClient = new Client(options);
    let endpoint = chance.string();
    let spy = jest.spyOn(rdClient, '_fetch').mockResolvedValue(createFetchMock(false));

    // act
    let response = await rdClient.get(endpoint);

    // assert
    expect(spy.mock.calls.length).toBe(1);
  });

  test('get calls fetch with method GET - success', async () => {
    // setup and configure chance
    let chance = new Chance();

    // setup options for client
    let options = new ClientOptions();
    options.apiKey = chance.string();
    options.apiSecretKey = chance.string();

    // arrange
    let rdClient = new Client(options);
    let endpoint = chance.string();
    let spy = jest.spyOn(rdClient, '_fetch').mockResolvedValue(createFetchMock());

    // act
    let response = await rdClient.get(endpoint);

    // assert
    expect(spy.mock.calls.length).toBe(1);
  });

  test('get with parameters calls fetch with method GET - success', async () => {
    // setup and configure chance
    let chance = new Chance();

    // setup options for client
    let options = new ClientOptions();
    options.development = true;
    options.apiKey = chance.string();
    options.apiSecretKey = chance.string();

    // arrange
    let rdClient = new Client(options);
    let endpoint = chance.string();
    let spy = jest.spyOn(rdClient, '_fetch').mockResolvedValue(createFetchMock());
    let include = chance.string();
    let parameters = { include: [include] };

    // act
    let response = await rdClient.get(endpoint, parameters);

    // assert
    expect(spy.mock.calls.length).toBe(1);
    expect(spy.mock.calls[0][0]).toEqual(
      `https://api-dev.rentdynamics.com${endpoint}?include=${include}`
    );
  });
});

describe('put', () => {
  test('put calls fetch with method PUT - fail', async () => {
    // setup and configure chance
    let chance = new Chance();

    // setup options for client
    let options = new ClientOptions();
    options.apiKey = chance.string();
    options.apiSecretKey = chance.string();

    // arrange
    let rdClient = new Client(options);
    let payload = {};
    let endpoint = chance.string();
    let spy = jest.spyOn(rdClient, '_fetch').mockResolvedValue(createFetchMock(false));

    // act
    let response = await rdClient.put(endpoint, payload);

    // assert
    expect(spy.mock.calls.length).toBe(1);
  });

  test('put calls fetch with method PUT - success', async () => {
    // setup and configure chance
    let chance = new Chance();

    // setup options for client
    let options = new ClientOptions();
    options.apiKey = chance.string();
    options.apiSecretKey = chance.string();

    // arrange
    let rdClient = new Client(options);
    let payload = {};
    let endpoint = chance.string();
    let spy = jest.spyOn(rdClient, '_fetch').mockResolvedValue(createFetchMock(false));

    // act
    let response = await rdClient.put(endpoint, payload);

    // assert
    expect(spy.mock.calls.length).toBe(1);
  });
});

describe('post', () => {
  test('post calls fetch with method POST - fail', async () => {
    // setup and configure chance
    let chance = new Chance();

    // setup options for client
    let options = new ClientOptions();
    options.apiKey = chance.string();
    options.apiSecretKey = chance.string();

    // arrange
    let rdClient = new Client(options);
    let payload = {};
    let endpoint = chance.string();
    let spy = jest.spyOn(rdClient, '_fetch').mockResolvedValue(createFetchMock(false));

    // act
    let response = await rdClient.post(endpoint, payload);

    // assert
    expect(spy.mock.calls.length).toBe(1);
  });

  test('post calls fetch with method POST - success', async () => {
    // setup and configure chance
    let chance = new Chance();

    // setup options for client
    let options = new ClientOptions();
    options.apiKey = chance.string();
    options.apiSecretKey = chance.string();

    // arrange
    let rdClient = new Client(options);
    let payload = {};
    let endpoint = chance.string();
    let spy = jest.spyOn(rdClient, '_fetch').mockResolvedValue(createFetchMock());

    // act
    let response = await rdClient.post(endpoint, payload);

    // assert
    expect(spy.mock.calls.length).toBe(1);
  });
});

describe('delete', () => {
  test('delete calls fetch with method DELETE - fail', async () => {
    // setup and configure chance
    let chance = new Chance();

    // setup options for client
    let options = new ClientOptions();
    options.apiKey = chance.string();
    options.apiSecretKey = chance.string();

    // arrange
    let rdClient = new Client(options);
    let endpoint = chance.string();
    let spy = jest.spyOn(rdClient, '_fetch').mockResolvedValue(createFetchMock(false));

    // act
    let response = await rdClient.delete(endpoint);

    // assert
    expect(spy.mock.calls.length).toBe(1);
  });

  test('delete calls fetch with method DELETE - success', async () => {
    // setup and configure chance
    let chance = new Chance();

    // setup options for client
    let options = new ClientOptions();
    options.apiKey = chance.string();
    options.apiSecretKey = chance.string();

    // arrange
    let rdClient = new Client(options);
    let endpoint = chance.string();
    let spy = jest.spyOn(rdClient, '_fetch').mockResolvedValue(createFetchMock());

    // act
    let response = await rdClient.delete(endpoint);

    // assert
    expect(spy.mock.calls.length).toBe(1);
  });
});

describe('login', () => {
  test('login calls', async () => {
    // setup and configure chance
    let chance = new Chance();

    // setup options for client
    let options = new ClientOptions();
    options.apiKey = chance.string();
    options.apiSecretKey = chance.string();

    // arrange
    let rdClient = new Client(options);
    let username = chance.string();
    let password = chance.string();
    let spy = jest.spyOn(rdClient, '_fetch').mockResolvedValue(createFetchMock(false));

    // act
    let response = await rdClient.login(username, password);

    // assert
    expect(spy.mock.calls.length).toBe(1);
  });

  test('when login calls post authToken should be set to returned token', async () => {
    // setup and configure chance
    let chance = new Chance();
    let expectedToken = chance.apple_token();

    // setup options for client
    let options = new ClientOptions();
    options.apiKey = chance.string();
    options.apiSecretKey = chance.string();

    // arrange
    let rdClient = new Client(options);
    let username = chance.string();
    let password = chance.string();
    let spyPost = jest
      .spyOn(rdClient, 'post')
      .mockReturnValue(Promise.resolve({ token: expectedToken }));

    // act
    let response = await rdClient.login(username, password);

    // assert
    expect(spyPost).toHaveBeenCalledTimes(1);
    expect(options.authToken).toEqual(expectedToken);
  });
});

describe('logout', () => {
  test('logout calls', async () => {
    // setup and configure chance
    let chance = new Chance();

    // setup options for client
    let options = new ClientOptions();
    options.apiKey = chance.string();
    options.apiSecretKey = chance.string();
    options.authToken = chance.string();

    // arrange
    let rdClient = new Client(options);
    let spy = jest.spyOn(rdClient, '_fetch').mockResolvedValue(createFetchMock());

    // act
    let response = await rdClient.logout();

    // assert
    expect(spy).toHaveBeenCalled();
    expect(spy.mock.calls.length).toBe(1);
  });

  test('when logout calls post authToken should be set to undefined', async () => {
    // setup and configure chance
    let chance = new Chance();
    let expectedToken = undefined;

    // setup options for client
    let options = new ClientOptions();
    options.apiKey = chance.string();
    options.apiSecretKey = chance.string();
    options.authToken = chance.apple_token();

    // arrange
    let rdClient = new Client(options);
    let spyPost = jest.spyOn(rdClient, 'post').mockReturnValue(Promise.resolve({}));

    // act
    let response = await rdClient.logout();

    // assert
    expect(spyPost).toHaveBeenCalledTimes(1);
    expect(options.authToken).toEqual(expectedToken);
  });
});

describe('formatPayload', () => {
  test('should alphabetize items in dictionary', () => {
    // arrange
    let payload = { orange: 1, blue: 2 };
    let options = new ClientOptions();
    let clientHelpers = new ClientHelpers(options);

    // act
    let result = clientHelpers.formatPayload(payload);

    // assert
    expect(Object.keys(result)[0]).toEqual('blue');
  });

  test('should alphabetize nested items', () => {
    // arrange
    let payload = { orange: 1, blue: { red: 21, pink: 22 } };
    let options = new ClientOptions();
    let clientHelpers = new ClientHelpers(options);

    // act
    let result = clientHelpers.formatPayload(payload);

    // assert
    expect(Object.keys(result['blue'])[0]).toEqual('pink');
  });

  test('should alphabetize keys even when their values are null', () => {
    // arrange
    let payload = { orange: null, blue: null };
    let options = new ClientOptions();
    let clientHelpers = new ClientHelpers(options);

    // act
    let result = clientHelpers.formatPayload(payload);

    // assert
    expect(Object.keys(result)[0]).toEqual('blue');
  });

  test('should remove spaces from formatted items', () => {
    // arrange
    let payload = { orange: 1, blue: { red: 'a  f  g', pink: 'b  t  g' } };
    let options = new ClientOptions();
    let clientHelpers = new ClientHelpers(options);

    // act
    let result = clientHelpers.formatPayload(payload);

    // assert
    expect(result['blue']['pink']).toEqual('btg');
  });

  test('should pass with Array inside of object', () => {
    // arrange
    let payload = {
      orange: 5,
      blue: [
        { red: 6, pink: 7 },
        { green: 3, blue: 4 }
      ]
    };
    let options = new ClientOptions();
    let clientHelpers = new ClientHelpers(options);

    // act
    let result = clientHelpers.formatPayload(payload);

    // assert
    expect(Object.keys(result['blue'][0])[0]).toEqual('pink');
  });

  test('should pass with Array of primitive values', () => {
    // arrange
    let payload = {
      orange: 5,
      blue: [1, 5, 2]
    };
    let options = new ClientOptions();
    let clientHelpers = new ClientHelpers(options);

    // act
    let result = clientHelpers.formatPayload(payload);

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
    let chance = new Chance();
    let url = '/someUrlolz';
    let options = new ClientOptions();
    options.apiKey = chance.string();
    options.apiSecretKey = chance.string();
    options.authToken = 'akK9KL2';
    let clientHelpers = new ClientHelpers(options);

    // act
    let result = clientHelpers.getHeaders(url);

    // assert
    expect(result['Authorization']).toBeDefined();
  });

  test('should not return authorization header if there isnt an authToken', () => {
    // arrange
    let chance = new Chance();
    let url = '/someUrlolz';
    let options = new ClientOptions();
    options.authToken = '';
    options.apiKey = chance.string();
    options.apiSecretKey = chance.string();
    let clientHelpers = new ClientHelpers(options);

    // act
    let result = clientHelpers.getHeaders(url);
    // assert
    expect(result['Authorization']).toBeUndefined();
  });

  test('should return x-rd-api-key header', () => {
    // arrange
    let chance = new Chance();
    let url = '/someUrlolz';
    let options = new ClientOptions();
    options.apiKey = chance.string();
    options.apiSecretKey = chance.string();
    let clientHelpers = new ClientHelpers(options);

    // act
    let result = clientHelpers.getHeaders(url);

    // assert
    expect(result['x-rd-api-key']).toBeDefined();
  });

  test('should return x-rd-api-nonce header', () => {
    // arrange
    let chance = new Chance();
    let url = '/someUrlolz';
    let payload = { orange: 1, blue: 2 };
    let options = new ClientOptions();
    options.apiKey = chance.string();
    options.apiSecretKey = chance.string();
    let clientHelpers = new ClientHelpers(options);

    // act
    let result = clientHelpers.getHeaders(url, payload);

    // assert
    expect(result['x-rd-api-nonce']).toBeDefined();
  });

  test('should return x-rd-timestamp header', () => {
    // arrange
    let chance = new Chance();
    let url = '/someUrlolz';
    let options = new ClientOptions();
    options.apiKey = chance.string();
    options.apiSecretKey = chance.string();
    let clientHelpers = new ClientHelpers(options);

    // act
    let result = clientHelpers.getHeaders(url);

    // assert
    expect(result['x-rd-timestamp']).toBeDefined();
  });

  test('should return Content-Type header', () => {
    // arrange
    let chance = new Chance();
    let url = '/someUrlolz';
    let options = new ClientOptions();
    options.apiKey = chance.string();
    options.apiSecretKey = chance.string();
    let clientHelpers = new ClientHelpers(options);

    // act
    let result = clientHelpers.getHeaders(url);

    // assert
    expect(result['Content-Type']).toBeDefined();
    expect(result['Content-Type']).toEqual('application/json');
  });

  test('should return empty headers if missing apiKey and apiSecretKey', () => {
    // arrange
    let url = '/someUrlolz';
    let options = new ClientOptions();
    options.apiKey = undefined;
    options.apiSecretKey = undefined;
    let clientHelpers = new ClientHelpers(options);

    // act
    let result = clientHelpers.getHeaders(url);

    // assert
    expect(result['Authorization']).toEqual(undefined);
    expect(result['x-rd-api-key']).toEqual(undefined);
    expect(result['x-rd-api-nonce']).toEqual(undefined);
    expect(result['x-rd-timestamp']).toEqual(undefined);
    expect(result['Content-Type']).toEqual(undefined);
  });
});

describe('getBaseUrl', () => {
  test('should return correct url in development', () => {
    // arrange
    let options = new ClientOptions();
    options.development = true;
    let clientHelpers = new ClientHelpers(options);

    // act
    let result = clientHelpers.getBaseUrl();

    // assert
    expect(result).toEqual('https://api-dev.rentdynamics.com');
  });

  test('should return custom url in development with developmentUrl', () => {
    // arrange
    let options = new ClientOptions();
    options.development = true;
    options.developmentUrl = 'https://my-new.site.com';
    let clientHelpers = new ClientHelpers(options);

    // act
    let result = clientHelpers.getBaseUrl();

    // assert
    expect(result).toEqual(options.developmentUrl);
  });

  test('should return production url even when developmentUrl is passed in', () => {
    // arrange
    let options = new ClientOptions();
    options.development = false;
    options.developmentUrl = 'https://my-new.site.com';
    let clientHelpers = new ClientHelpers(options);

    // act
    let result = clientHelpers.getBaseUrl();

    // assert
    expect(result).toEqual('https://api.rentdynamics.com');
  });

  test('should return correct url in production', () => {
    // arrange
    let options = new ClientOptions();
    options.development = false;
    let clientHelpers = new ClientHelpers(options);

    // act
    let result = clientHelpers.getBaseUrl();

    // assert
    expect(result).toEqual('https://api.rentdynamics.com');
  });

  test('should return correct url when passing base url in options in production', () => {
    // arrange
    let options = new ClientOptions();
    options.development = false;
    options.baseUrl = 'https://api.rentplus.com';
    let clientHelpers = new ClientHelpers(options);

    // act
    let result = clientHelpers.getBaseUrl();

    //assert
    expect(result).toEqual('https://api.rentplus.com');
  });
});

describe('stringifyParameters', () => {
  test('should stringify basic parameters', () => {
    // arrange
    let options = new ClientOptions();
    options.development = true;
    let clientHelpers = new ClientHelpers(options);
    let parameters = {
      filters: { id: 10 },
      include: ['hobby'],
      exclude: ['age'],
      fields: ['id', 'name'],
      orderBy: 'name',
      page: 1,
      pageSize: 20,
      distinct: true
    };

    // act
    let result = clientHelpers.stringifyParameters(parameters);

    // assert
    expect(result).toContain('filters=id=10');
    expect(result).toContain('include=hobby');
    expect(result).toContain('exclude=age');
    expect(result).toContain('fields=id,name');
    expect(result).toContain('orderBy=name');
    expect(result).toContain('page=1');
    expect(result).toContain('pageSize=20');
    expect(result).toContain('distinct=true');
  });

  test('should stringify more complex filters', () => {
    // arrange
    let options = new ClientOptions();
    options.development = true;
    let clientHelpers = new ClientHelpers(options);
    let parameters = {
      filters: {
        id: 10,
        age: [20, 21, 22, 23, 24],
        hobby: { id: 10 },
        nullValue: null,
        emptyArray: [],
        emptySubObj: { id: null }
      }
    };

    // act
    let result = clientHelpers.stringifyParameters(parameters);

    // assert
    expect(result).toContain('id=10');
    expect(result).toContain('age__in=20,21,22,23,24');
    expect(result).toContain('hobby__id=10');
    expect(result).not.toContain('nullValue');
    expect(result).not.toContain('emptyArray');
    expect(result).not.toContain('emptySubObj');
  });
});
