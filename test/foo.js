'use strict';

const Hapi = require('hapi');
const AppInsights = require('applicationinsights');
const Wreck = require('wreck');

// Configure the HAPI server
module.exports = async () => {

  AppInsights.setup('42ee94e1-d6c9-4cf0-a4ec-171c79a6aa2f');
  AppInsights.start();

  const hapiServer = new Hapi.Server({
    host: '0.0.0.0',
    port: '3006'
  });

  hapiServer.events.on('start', () => {

    console.log('Server started');
  });

  hapiServer.events.on('stop', () => {

    AppInsights.defaultClient.flush();
    AppInsights.dispose();
    console.log('Server stopped');
  });

  await hapiServer.route([
    {
      method: 'GET',
      path: '/foo',
      config: {
        handler: async (request, h) => {

          const { payload } = await Wreck.get('https://github.com/hapijs');

          return h.response({ foo : 'bar' })
            .code(200)
            .header('content-type', 'application/json; charset=utf-8');
        }
      }
    }
  ]);

  return hapiServer;
};
