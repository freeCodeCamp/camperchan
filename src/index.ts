import { Client } from 'discord.js';
import Mongoose from 'mongoose';
import fetch from 'node-fetch';
import { QuoteDef } from './APIs/quote-def';
import { bootstrapCommands } from './commands/bootstrap-commands';
import { getConfig } from './config/get-config';
import { validateConfig } from './config/validate-config';
import { bootstrapReactions } from './reactions/bootstrap-reactions';
import { logger } from './utilities/logger';

const client = new Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });

(async () => {
  try {
    // this iife is so we can get "top level await"
    logger.info('Initalizing...');
    const config = getConfig();
    validateConfig(config);
    // rig up client callbacks
    client.on('error', logger.error);

    if (config.MONGO_URI) {
      await Mongoose.connect(
        config.MONGO_URI,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true
        },
        () => logger.info('MongoDB ready!')
      );
    }

    const quoteFetch = await fetch(
      'https://raw.githubusercontent.com/freeCodeCamp/freeCodeCamp/master/config/motivational-quotes.json'
    );
    const quoteData: QuoteDef = await quoteFetch.json();

    bootstrapCommands({ client, config, quoteData });
    bootstrapReactions({ client, config });
    if (config.VERBOSE) {
      // if we are to print each message as is.
      client.on('message', (message) => {
        logger.silly('>> ', message.content);
      });
    }

    client.once('ready', () => {
      // Set up activity
      client.user?.setActivity(`${getConfig().PREFIX} help`, {
        type: 'LISTENING'
      });
      logger.info('Discord ready!');
    });

    client.login(config.TOKEN);
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
})();
