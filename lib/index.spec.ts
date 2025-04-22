import { Client, ClientOptions, ClientHelpers } from './index';
import Chance from 'chance';

beforeAll(async () => {
  const util = await import('util');
  const c = await import('crypto');
  global.TextEncoder = util.TextEncoder;
  // @ts-expect-error mocking jsdom must assign to read only
  global.crypto.subtle = c.webcrypto.subtle;
  // @ts-expect-error mocking jsdom and not matching interface purposely
  global.fetch = jest.fn(() => {});
});

const createFetchMock = (overrides: Record<string, unknown> = {}) => {
  const opts = {
    ok: true,
    json: {},
    text: '{}',
    ...overrides
  };
  return Promise.resolve({
    ok: opts.ok,
    json: () => Promise.resolve(opts.json),
    text: () => Promise.resolve(opts.text)
  } as Response);
};

const chance = new Chance();
const testUrl = '/someUrlolz';

const createRandomOptions = () => {
  const options = new ClientOptions();
  options.apiKey = chance.string();
  options.apiSecretKey = chance.string();
  return options;
};

const createRandomHelpers = () => {
  const options = createRandomOptions();
  return new ClientHelpers(options);
};

const createRandomClient = () => {
  const options = createRandomOptions();
  return new Client(options);
};

describe('get', () => {
  test.each([true, false])('calls fetch with ok response of %p', async v => {
    // arrange
    const endpoint = chance.string();
    const spy = jest.spyOn(global, 'fetch').mockResolvedValue(createFetchMock({ ok: v }));

    // act
    const response = await createRandomClient().get(endpoint);

    // assert
    expect(spy.mock.calls.length).toBe(1);
    expect(spy.mock.calls[0][0]).toEqual(`https://api.rentdynamics.dev${endpoint}`);
    expect(response.ok).toBe(v);
  });
});

describe('put', () => {
  test.each([true, false])('calls fetch with ok response of %p', async v => {
    // arrange
    const payload = {};
    const endpoint = chance.string();
    const spy = jest.spyOn(global, 'fetch').mockResolvedValue(createFetchMock({ ok: v }));

    // act
    const response = await createRandomClient().put(endpoint, payload);

    // assert
    expect(spy.mock.calls.length).toBe(1);
    expect(spy.mock.calls[0][0]).toEqual(`https://api.rentdynamics.dev${endpoint}`);
    expect(response.ok).toBe(v);
  });
});

describe('post', () => {
  test.each([true, false])('calls fetch with ok response of %p', async v => {
    // arrange
    const payload = {};
    const endpoint = chance.string();
    const spy = jest.spyOn(global, 'fetch').mockResolvedValue(createFetchMock({ ok: v }));

    // act
    const response = await createRandomClient().post(endpoint, payload);

    // assert
    expect(spy.mock.calls.length).toBe(1);
    expect(spy.mock.calls[0][0]).toEqual(`https://api.rentdynamics.dev${endpoint}`);
    expect(response.ok).toBe(v);
  });
});

describe('delete', () => {
  test.each([true, false])('calls fetch with ok response of %p', async v => {
    // arrange
    const endpoint = chance.string();
    const spy = jest.spyOn(global, 'fetch').mockResolvedValue(createFetchMock({ ok: v }));

    // act
    const response = await createRandomClient().delete(endpoint);

    // assert
    expect(spy.mock.calls.length).toBe(1);
    expect(spy.mock.calls[0][0]).toEqual(`https://api.rentdynamics.dev${endpoint}`);
    expect(response.ok).toBe(v);
  });
});

describe('login', () => {
  test('on failure does not set auth token', async () => {
    // arrange
    const username = chance.string();
    const password = chance.string();
    const spy = jest.spyOn(global, 'fetch').mockResolvedValue(createFetchMock({ ok: false }));
    const client = createRandomClient();

    // act
    const response = await client.login(username, password);

    // assert
    expect(spy.mock.calls.length).toBe(1);
    expect(client.helpers.authToken).toBeUndefined();
    expect(response.ok).toBe(false);
  });

  test('on success sets auth token', async () => {
    // arrange
    const client = createRandomClient();
    const expectedToken = chance.apple_token();
    const username = chance.string();
    const password = chance.string();
    const spyPost = jest.spyOn(global, 'fetch').mockReturnValue(
      createFetchMock({
        json: { token: expectedToken }
      })
    );
    expect(client.helpers.authToken).toBeUndefined();

    // act
    const response = await client.login(username, password);

    // assert
    expect(spyPost).toHaveBeenCalledTimes(1);
    expect(response.ok).toBe(true);
    expect(client.helpers.authToken).toEqual(expectedToken);
  });

  test('sends username and encrypted password', async () => {
    // arrange
    const username = chance.string();
    const password = chance.string();
    const spyPost = jest.spyOn(global, 'fetch').mockReturnValue(
      createFetchMock({
        json: { token: chance.apple_token() }
      })
    );

    // act
    await createRandomClient().login(username, password);

    // assert
    expect(spyPost).toHaveBeenCalledTimes(1);
    const sentBody = JSON.parse(spyPost.mock.calls[0][1]?.body as string);
    expect(sentBody.username).toBe(username);
    expect(sentBody.password).not.toBe(password);
  });
});

describe('logout', () => {
  test('on success clears auth token', async () => {
    // arrange
    const options = createRandomOptions();
    options.authToken = chance.apple_token();
    const rdClient = new Client(options);
    const spyPost = jest.spyOn(global, 'fetch').mockReturnValue(createFetchMock());
    expect(options.authToken).toBeDefined();

    // act
    const response = await rdClient.logout();

    // assert
    expect(spyPost).toHaveBeenCalledTimes(1);
    expect(response.ok).toBe(true);
    expect(options.authToken).toBeUndefined();
  });

  test('on failure does not clear auth token', async () => {
    // arrange
    const options = createRandomOptions();
    const token = chance.apple_token();
    options.authToken = token;
    const rdClient = new Client(options);
    const spyPost = jest.spyOn(global, 'fetch').mockReturnValue(createFetchMock({ ok: false }));
    expect(options.authToken).toBeDefined();

    // act
    const response = await rdClient.logout();

    // assert
    expect(spyPost).toHaveBeenCalledTimes(1);
    expect(response.ok).toBe(false);
    expect(options.authToken).toEqual(token);
  });

  test('sends auth token', async () => {
    // arrange
    const options = createRandomOptions();
    const token = chance.apple_token();
    options.authToken = token;
    const rdClient = new Client(options);
    const spyPost = jest.spyOn(global, 'fetch').mockReturnValue(createFetchMock());

    // act
    await rdClient.logout();

    // assert
    expect(spyPost).toHaveBeenCalledTimes(1);
    const sentBody = JSON.parse(spyPost.mock.calls[0][1]?.body as string);
    expect(sentBody.authToken).toBe(token);
  });
});

describe('formatPayload', () => {
  test('should alphabetize items in object', () => {
    // arrange
    const payload = { orange: 1, blue: 2 };

    // act
    const result = createRandomHelpers().formatPayload(payload);

    // assert
    expect(Object.keys(result)[0]).toEqual('blue');
  });

  test('should alphabetize nested items', () => {
    // arrange
    const payload = { orange: 1, blue: { red: 21, pink: 22 } };

    // act
    const result = createRandomHelpers().formatPayload(payload);

    // assert
    expect(Object.keys(result.blue)[0]).toEqual('pink');
  });

  test('should alphabetize keys when their values are null', () => {
    // arrange
    const payload = { orange: null, blue: null };

    // act
    const result = createRandomHelpers().formatPayload(payload);

    // assert
    expect(Object.keys(result)[0]).toEqual('blue');
  });

  test('should remove spaces from formatted items', () => {
    // arrange
    const payload = { orange: 1, blue: { red: 'a  f  g', pink: 'b  t  g' } };

    // act
    const result = createRandomHelpers().formatPayload(payload);

    // assert
    expect(result.blue.pink).toEqual('btg');
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

    // act
    const result = createRandomHelpers().formatPayload(payload);

    // assert
    expect(Object.keys(result.blue[0])[0]).toEqual('pink');
  });

  test('should pass with Array of primitive values', () => {
    // arrange
    const payload = {
      orange: 5,
      blue: [1, 5, 2]
    };

    // act
    const result = createRandomHelpers().formatPayload(payload);

    // assert
    expect(result.orange).toEqual(5);
    expect(result.blue[0]).toEqual(1);
    expect(result.blue[1]).toEqual(5);
    expect(result.blue[2]).toEqual(2);
  });
});

describe('getNonce', () => {
  const timestamp = 1744825113438;
  let clientHelpers!: ClientHelpers;

  beforeEach(() => {
    const options = new ClientOptions();
    options.apiKey = 'nJYLab]!';
    options.apiSecretKey = 'ka4B#%NYx';
    clientHelpers = new ClientHelpers(options);
  });

  const getFormattedPayloadFor = (payload: Record<string, unknown>) =>
    JSON.stringify(clientHelpers.formatPayload(payload));

  test.each([
    [
      'with array of primitive values',
      { orange: 5, blue: [1, 5, 2] },
      '0da0f05839bef83df7382f9d936c236418f7bb3c'
    ],
    [
      'should return hash of timestamp, url, payload and secret key',
      {
        orange: 1,
        blue: {
          red: 'a  f  g',
          pink: 'b  t  g'
        }
      },
      '608e3b1b7fc9f68b226275d8125554adf1f44086'
    ]
  ])('%s', async (_, unformattedPayload, expectedNonce) => {
    // arrange
    const formattedPayload = getFormattedPayloadFor(unformattedPayload);

    // act
    const result = await clientHelpers.getNonce(timestamp, testUrl, formattedPayload);

    // assert
    expect(result).toEqual(expectedNonce);
  });

  test('returns empty string if missing apiSecretKey', async () => {
    // arrange
    const o = new ClientOptions();
    o.apiKey = 'nJYLab]!';
    const c = new ClientHelpers(o);
    const formattedPayload = getFormattedPayloadFor({
      orange: 1,
      blue: {
        red: 'a  f  g',
        pink: 'b  t  g'
      }
    });

    // act
    const result = await c.getNonce(timestamp, testUrl, formattedPayload);

    // assert
    expect(result).toEqual('');
  });

  test('when no payload is passed', async () => {
    // arrange / act
    const result = await clientHelpers.getNonce(timestamp, testUrl);

    // assert
    expect(result).toEqual('a724eb47b4fc644b2fe1fd5a0b778fc6cff1930c');
  });
});

describe('encryptPassword', () => {
  test('encrypts', async () => {
    // arrange act
    const result = await createRandomHelpers().encryptPassword('#iL0v3Kitties');

    // assert
    expect(result).toBe('5edd56f2a05a89617f12550ef524370a229f93de');
  });
});

describe('getHeaders', () => {
  test('should return authorization header if there is an authToken', async () => {
    // arrange
    const options = createRandomOptions();
    options.authToken = 'akK9KL2';
    const clientHelpers = new ClientHelpers(options);

    // act
    const result = await clientHelpers.getHeaders(testUrl);

    // assert
    expect(result.Authorization).toBeDefined();
  });

  test(`should not return authorization header if there isn't an authToken`, async () => {
    // arrange
    const options = createRandomOptions();
    options.authToken = '';
    const clientHelpers = new ClientHelpers(options);

    // act
    const result = await clientHelpers.getHeaders(testUrl);

    // assert
    expect(result.Authorization).toBeUndefined();
  });

  test('should return x-rd-api-key header', async () => {
    // arrange / act
    const result = await createRandomHelpers().getHeaders(testUrl);

    // assert
    expect(result['x-rd-api-key']).toBeDefined();
  });

  test('should return x-rd-api-nonce header', async () => {
    // arrange
    const payload = { orange: 1, blue: 2 };

    // act
    const result = await createRandomHelpers().getHeaders(testUrl, payload);

    // assert
    expect(result['x-rd-api-nonce']).toBeDefined();
  });

  test('should return x-rd-timestamp header', async () => {
    // arrange / act
    const result = await createRandomHelpers().getHeaders(testUrl);

    // assert
    expect(result['x-rd-timestamp']).toBeDefined();
  });

  test('should return Content-Type header', async () => {
    // arrange / act
    const result = await createRandomHelpers().getHeaders(testUrl);

    // assert
    expect(result['Content-Type']).toBeDefined();
    expect(result['Content-Type']).toEqual('application/json');
  });

  test('should return empty headers if missing apiKey and apiSecretKey', async () => {
    // arrange
    const options = new ClientOptions();
    options.apiKey = undefined;
    options.apiSecretKey = undefined;
    const clientHelpers = new ClientHelpers(options);

    // act
    const result = await clientHelpers.getHeaders(testUrl);

    // assert
    expect(result.Authorization).toEqual(undefined);
    expect(result['x-rd-api-key']).toEqual(undefined);
    expect(result['x-rd-api-nonce']).toEqual(undefined);
    expect(result['x-rd-timestamp']).toEqual(undefined);
    expect(result['Content-Type']).toEqual(undefined);
  });
});
