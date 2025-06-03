# Rent Dynamics JS

[![NPM Version][npm-version-image]][npm-version-link]
[![MIT License][npm-license-image]][npm-license-link]

A utility for making requests to the Rent Dynamics API from a JavaScript environment.

## Requirements

Due to usage of the [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API)
a secure context is required for use in a browser environment. Read more about secure contexts
[here](https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts).

Due to usage of [node fetch](https://nodejs.org/docs/latest-v18.x/api/globals.html#fetch), node
v18.20.x or greater is recommended in a node environment.

## CDN

Specify the version you want to target.

```html
<script src="https://cdnjs.rentdynamics.com/rentdynamics.<your-version-here>.js"></script>
<script>
  (async () => {
    const options = new RentDynamics.ClientOptions();
    options.baseUrl = RentDynamics.BASE_URL.DEV_RD;
    options.apiKey = '<insert-key-here>';
    options.apiSecretKey = '<insert-secret-key-here>';
    const rdClient = new RentDynamics.Client(options);
    await rdClient.login('<username', '<password>');
    await rdClient.get('/datas');
  })();
</script>
```

## NPM (Browser)

Install with [npm](https://www.npmjs.com/package/rentdynamics): `npm install rentdynamics`

```js
import { Client, ClientOptions, BASE_URL } from 'rentdynamics';

const options = new ClientOptions();
options.baseUrl = BASE_URL.DEV_RD;
options.apiKey = '<insert-key-here>';
options.apiSecretKey = '<insert-secret-key-here>';
const rdClient = new Client(options);
await rdClient.login('<username>', '<password>');
const result = await rdClient.get('/datas');
```

## NPM (Node)

Install with [npm](https://www.npmjs.com/package/rentdynamics): `npm install rentdynamics`

```js
import { Client, ClientOptions, BASE_URL } from 'rentdynamics';

const options = new ClientOptions();
options.baseUrl = BASE_URL.DEV_RD;
options.apiKey = '<insert-key-here>';
options.apiSecretKey = '<insert-secret-key-here>';
options.getEncoder = async () => new (await import('util')).TextEncoder();
options.getCryptographer = async () => (await import('crypto')).subtle;
const rdClient = new Client(options);
await rdClient.login('<username>', '<password>');
const result = await rdClient.get('/datas');
```

## Details

### `BASE_URL` enum

Contains urls for the development and production services. This enum is meant to be passed to
`ClientOptions` `baseUrl` property.

### `ClientOptions` class

Configuration for the `Client` and `ClientHelpers` class. The `ClientOptions` can be used to control
what service and api keys are used. By default, the class will not specify any api keys or auth
headers, and the `baseUrl` will be for the development Rent Dynamics API.

### `Client` class

`Client` is a wrapper around the browser or node `fetch` API. `Client` is a simple utility for
performing `get`, `put`, `post`, and `delete` methods. `Client` is capable of controlling whether or
not requests are authenticated by calling `login` and `logout`.

### `ClientHelpers` class

`ClientHelpers` is consumed by `Client`. `ClientHelpers` can be used on it's own to make a custom
client for more complex use cases.

## Development

For notes on how this project works internally see the [wiki](https://github.com/RentDynamics/rentdynamics-js/wiki).

[npm-version-image]: https://img.shields.io/npm/v/rentdynamics.svg
[npm-version-link]: https://www.npmjs.com/package/rentdynamics
[npm-license-image]: https://img.shields.io/npm/l/rentdynamics.svg
[npm-license-link]: LICENSE
