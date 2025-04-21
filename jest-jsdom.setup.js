const util = require('util');
const c = require('crypto');

global.TextEncoder = util.TextEncoder;
global.crypto.subtle = c.webcrypto.subtle;
global.fetch = jest.fn(() => {});
