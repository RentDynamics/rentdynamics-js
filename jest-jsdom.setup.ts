import util from 'util';
import crypto from 'crypto';

// Patch missing members in jsdom with a close node implementation.
global.TextEncoder = util.TextEncoder;
// @ts-expect-error node crypto is not a exact match to browser crypto
global.crypto = crypto;
global.fetch = jest.fn(() => {});
