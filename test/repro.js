'use strict';

const Assert = require('assert');
const Server = require('./foo');

describe.only('Repro', () => {

  it('Without starting server', async () => {

    const server = await Server();
    Assert.ok(server);

    await server.inject({ method: 'GET', url: '/foo' });
  });

  it('With starting server', async () => {

    const server = await Server();
    Assert.ok(server);
    server.start();

    await server.inject({ method: 'GET', url: '/foo' });

    server.stop();
  });
});
