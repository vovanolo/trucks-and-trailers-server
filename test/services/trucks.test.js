const assert = require('assert');
const app = require('../../src/app');

describe('\'trucks\' service', () => {
  it('registered the service', () => {
    const service = app.service('trucks');

    assert.ok(service, 'Registered the service');
  });
});
