import { Client } from 'discord.js';
import { bootstrapCommands } from './commands/bootstrap-commands';
import { getConfig } from './config/get-config';
import { validateConfig } from './config/validate-config';
import Mongoose from 'mongoose';
import { bootstrapReactions } from './reactions/bootstrap-reactions';
import { quoteDef } from './APIs/quote-def';
import fetch from 'node-fetch';

const client = new Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });

(async () => {
  try {
    // this iife is so we can get "top level await"
    console.log('Initalizing...');
    const config = getConfig();
    validateConfig(config);
    // rig up client callbacks
    client.on('error', console.error);

    if (config.MONGO_URI) {
      await Mongoose.connect(
        config.MONGO_URI,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true
        },
        () => console.log('MongoDB ready!')
      );
    }

    const quoteFetch = await fetch(
      'https://raw.githubusercontent.com/freeCodeCamp/freeCodeCamp/master/config/motivational-quotes.json'
    );
    const quoteData: quoteDef = await quoteFetch.json();

    bootstrapCommands({ client, config, quoteData });
    bootstrapReactions({ client, config });
    if (config.VERBOSE) {
      // if we are to print each message as is.
      client.on('message', (message) => {
        console.log('>> ', message.content);
      });
    }

    client.once('ready', () => {
      console.log('Discord ready!');
    });
    client.login(config.TOKEN);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
