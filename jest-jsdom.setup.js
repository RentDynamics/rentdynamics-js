const util = require('util');
const crypto = require('crypto');

// Patch missing members in jsdom with a close node implementation.
global.TextEncoder = util.TextEncoder;
global.crypto = crypto;
global.fetch = jest.fn(() => {});
