import { Client, ClientOptions, ClientHelpers } from "./index";
import Chance from "chance";
import jsSHA from "jssha";
import "whatwg-fetch";


describe('get', () => {

  test('get calls fetch with method GET - fail', () => {
      // setup mock for fetch to avoid actual calls
      const fakeFetch = jest.fn().mockResolvedValue({ok: false, json: () => { return {}; }});
      window.fetch = fakeFetch;

      // setup and configure chance
      let chance = new Chance();

      // setup options for client
      let options = new ClientOptions();
      options.apiKey = chance.string();
      options.apiSecretKey = chance.string();

      // arrange
      let rdClient = new Client(options);
      let endpoint = chance.string();

      // act
      let response = rdClient.get(endpoint);

      // assert
      expect(fakeFetch.mock.calls.length).toBe(1);
  });

  test('get calls fetch with method GET - success', () => {
    // setup mock for fetch to avoid actual calls
    const fakeFetch = jest.fn().mockResolvedValue({ok: true, json: () => { return {}; }});
    window.fetch = fakeFetch;

    // setup and configure chance
    let chance = new Chance();

    // setup options for client
    let options = new ClientOptions();
    options.apiKey = chance.string();
    options.apiSecretKey = chance.string();

    // arrange
    let rdClient = new Client(options);
    let endpoint = chance.string();

    // act
    let response = rdClient.get(endpoint);

    // assert
    expect(fakeFetch.mock.calls.length).toBe(1);
  });

});


describe('put', () => {

  test('put calls fetch with method PUT - fail', () => {
      // setup mock for fetch to avoid actual calls
      const fakeFetch = jest.fn().mockResolvedValue({ok: false, json: () => { return {}; }});
      window.fetch = fakeFetch;

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

      // act
      let response = rdClient.put(endpoint, payload);

      // assert
      expect(fakeFetch.mock.calls.length).toBe(1);
  });

  test('put calls fetch with method PUT - success', () => {
    // setup mock for fetch to avoid actual calls
    const fakeFetch = jest.fn().mockResolvedValue({ok: true, json: () => { return {}; }});
    window.fetch = fakeFetch;

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

    // act
    let response = rdClient.put(endpoint, payload);

    // assert
    expect(fakeFetch.mock.calls.length).toBe(1);
  });

});


describe('post', () => {

  test('post calls fetch with method POST - fail', () => {
      // setup mock for fetch to avoid actual calls
      const fakeFetch = jest.fn().mockResolvedValue({ok: false, json: () => { return {}; }});
      window.fetch = fakeFetch;

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

      // act
      let response = rdClient.post(endpoint, payload);

      // assert
      expect(fakeFetch.mock.calls.length).toBe(1);
  });

  test('post calls fetch with method POST - success', () => {
    // setup mock for fetch to avoid actual calls
    const fakeFetch = jest.fn().mockResolvedValue({ok: true, json: () => { return {}; }});
    window.fetch = fakeFetch;

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

    // act
    let response = rdClient.post(endpoint, payload);

    // assert
    expect(fakeFetch.mock.calls.length).toBe(1);
  });

});


describe('delete', () => {

  test('delete calls fetch with method DELETE - fail', () => {
      // setup mock for fetch to avoid actual calls
      const fakeFetch = jest.fn().mockResolvedValue({ok: false, json: () => { return {}; }});
      window.fetch = fakeFetch;

      // setup and configure chance
      let chance = new Chance();

      // setup options for client
      let options = new ClientOptions();
      options.apiKey = chance.string();
      options.apiSecretKey = chance.string();

      // arrange
      let rdClient = new Client(options);
      let endpoint = chance.string();

      // act
      let response = rdClient.delete(endpoint);

      // assert
      expect(fakeFetch.mock.calls.length).toBe(1);
  });

  test('delete calls fetch with method DELETE - success', () => {
    // setup mock for fetch to avoid actual calls
    const fakeFetch = jest.fn().mockResolvedValue({ok: true, json: () => { return {}; }});
    window.fetch = fakeFetch;

    // setup and configure chance
    let chance = new Chance();

    // setup options for client
    let options = new ClientOptions();
    options.apiKey = chance.string();
    options.apiSecretKey = chance.string();

    // arrange
    let rdClient = new Client(options);
    let endpoint = chance.string();

    // act
    let response = rdClient.delete(endpoint);

    // assert
    expect(fakeFetch.mock.calls.length).toBe(1);
  });

});


describe('login', () => {

  test('login calls', () => {
      // setup mock for fetch to avoid actual calls
      const fakeFetch = jest.fn().mockResolvedValue({ok: true, json: () => { return {token: 'asdf'}; }});
      window.fetch = fakeFetch;

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

      // act
      let response = rdClient.login(username, password);

      // assert
      expect(fakeFetch.mock.calls.length).toBe(1);
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
    let payload = { orange: 1, blue: { red: "a  f  g", pink: "b  t  g" } };
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

  test('should handle arrays of primitive values', () => {
    // arrange
    let chance = new Chance();
    let payload = {
      orange: 5,
      blue: [1, 5, 2]
    };
    let options = new ClientOptions();
    options.apiKey = chance.string();
    options.apiSecretKey = chance.string();
    let clientHelpers = new ClientHelpers(options);
    let formattedPayload = JSON.stringify(clientHelpers.formatPayload(payload));
    let timestamp = Date.now();
    let url = '/someUrlolz';
    let nonce = timestamp + url + formattedPayload;
    var shaObj = new jsSHA('SHA-1', 'TEXT');
    shaObj.setHMACKey(options.apiSecretKey, 'TEXT');
    shaObj.update(nonce);
    let hashedNonce = shaObj.getHMAC('HEX');

    // act
    let result = clientHelpers.getNonce(timestamp, url, formattedPayload);

    // assert
    expect(hashedNonce).toEqual(result);
  });

  test('should return hash of timestamp, url, payload and secret key', () => {
    // arrange
    let chance = new Chance();
    let payload = {
      orange: 1,
      blue: {
        red: "a  f  g",
        pink: "b  t  g"
      }
    };
    let options = new ClientOptions();
    options.apiKey = chance.string();
    options.apiSecretKey = chance.string();
    let clientHelpers = new ClientHelpers(options);
    let formattedPayload = JSON.stringify(clientHelpers.formatPayload(payload));
    let timestamp = Date.now();
    let url = '/someUrlolz';
    let nonce = timestamp + url + formattedPayload;
    var shaObj = new jsSHA('SHA-1', 'TEXT');
    shaObj.setHMACKey(options.apiSecretKey, 'TEXT');
    shaObj.update(nonce);
    let hashedNonce = shaObj.getHMAC('HEX');

    // act
    let result = clientHelpers.getNonce(timestamp, url, formattedPayload);

    // assert
    expect(hashedNonce).toEqual(result);
  });

  test('should return hash of timestamp, url and secret key if no payload exists', () => {
    // arrange
    let chance = new Chance();
    let options = new ClientOptions();
    options.apiKey = chance.string();
    options.apiSecretKey = chance.string();
    let clientHelpers = new ClientHelpers(options);
    let timestamp = Date.now();
    let url = '/someUrlolz';
    let nonce = timestamp + url;
    var shaObj = new jsSHA('SHA-1', 'TEXT');
    shaObj.setHMACKey(options.apiSecretKey, 'TEXT');
    shaObj.update(nonce);
    let hashedNonce = shaObj.getHMAC('HEX');

    // act
    let result = clientHelpers.getNonce(timestamp, url);

    // assert
    expect(hashedNonce).toEqual(result);
  });

  test('should return empty string if missing apiSecretKey', () => {
    // arrange
    let payload = {
      orange: 1,
      blue: {
        red: "a  f  g",
        pink: "b  t  g"
      }
    };
    let options = new ClientOptions();
    options.apiSecretKey = undefined;
    let clientHelpers = new ClientHelpers(options);
    let formattedPayload = JSON.stringify(clientHelpers.formatPayload(payload));
    let timestamp = Date.now();
    let url = '/someUrlolz';

    // act
    let result = clientHelpers.getNonce(timestamp, url, formattedPayload);

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
    expect(result.get('Authorization')).toBeDefined();
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
    expect(result.get('Authorization')).toBeNull();
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
    expect(result.get('x-rd-api-key')).toBeDefined();
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
    expect(result.get('x-rd-api-nonce')).toBeDefined();
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
    expect(result.get('x-rd-timestamp')).toBeDefined();
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
    expect(result.get('Content-Type')).toBeDefined();
    expect(result.get('Content-Type')).toEqual('application/json');
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
    console.log(Object.keys(result));

    // assert
    expect(result.get('Authorization')).toEqual(null);
    expect(result.get('x-rd-api-key')).toEqual(null);
    expect(result.get('x-rd-api-nonce')).toEqual(null);
    expect(result.get('x-rd-timestamp')).toEqual(null);
    expect(result.get('Content-Type')).toEqual(null);
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

});
