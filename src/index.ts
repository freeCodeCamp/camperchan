import { Client } from 'discord.js';
import express from 'express';
import { bootstrap } from './commands/bootstrap';
import { getConfig } from './config/get-config';
import { validateConfig } from './config/validate-config';
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
