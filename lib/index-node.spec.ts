/**
 * @jest-environment node
 */
// The tests in this file use node instead of jsdom.

import { ClientHelpers, ClientOptions } from '.';

describe('ClientHelpers node', () => {
  describe('getNonce', () => {
    const timestamp = 1744825113438;
    const testUrl = '/someUrlolz';
    let clientHelpers!: ClientHelpers;

    beforeEach(async () => {
      const options = new ClientOptions();
      options.apiKey = 'nJYLab]!';
      options.apiSecretKey = 'ka4B#%NYx';
      const nodeEncoder = new (await import('util')).TextEncoder();
      const nodeCryptographer = await import('crypto');
      clientHelpers = new ClientHelpers(options, nodeEncoder, nodeCryptographer.subtle);
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
      const nodeEncoder = new (await import('util')).TextEncoder();
      const nodeCryptographer = await import('crypto');
      const c = new ClientHelpers(o, nodeEncoder, nodeCryptographer.subtle);
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
});
