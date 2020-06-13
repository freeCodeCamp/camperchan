const { Client } = require('discord.js');
const express = require('express');
const getConfig = require('./config/get-config');
const validateConfig = require('./config/validate-config');
const bootstrap = require('./commands/bootstrap');
const expressApp = express();
const client = new Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });

(async () => {
  try {
    // this iife is so we can get "top level await"
    console.log('Initalizing...');
    const config = getConfig();
    validateConfig(config);
    // rig up client callbacks
    client.on('error', console.error);

    bootstrap({ client, config });
    if (config.VERBOSE) {
      // if we are to print each message as is.
      client.on('message', (message) => {
        console.log('>> ', message.content);
      });
    }

    client.once('ready', () => console.log('Discord ready!'));
    client.login(config.TOKEN);

    expressApp.get('/status', (_, res) =>
      res.send({
        code: 200,
        message: 'Available',
        time: new Date()
      })
    );
    expressApp.listen(config.PORT, () => console.log('Express ready!'));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
