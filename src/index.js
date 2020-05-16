const { Client } = require('discord.js');
const getConfig = require('./config/get-config');
const validateConfig = require('./config/validate-config');
const bootstrap = require('./commands/bootstrap');
const client = new Client();
const addFormatting = require('./commands/add-formatting');

(async () => {
  try {
    // this iife is so we can get "top level await"
    console.log('Initalizing...');
    const config = await getConfig();
    validateConfig(config);
    // rig up client callbacks
    client.on('error', console.error);

    bootstrap(client);

    client.on('message', (message) => {
      console.log('>> ', message.content);
    });

    client.on('messageReactionAdd', async (reaction) => {
      // When we receive a reaction we check if the reaction is partial or not
      if (reaction.partial) {
        // If the message this reaction belongs to was removed the fetching might reject
        try {
          await reaction.fetch();
        } catch (error) {
          reaction.message.channel.send(
            'Something went wrong! Failed to format code :('
          );
          // Return as `reaction.message.author` may be undefined/null
          return;
        }
      }

      if (reaction.emoji.name === '🤖') {
        reaction.message.reactions
          .removeAll()
          .then(() => {
            addFormatting.command(reaction.message);
          })
          .catch((error) => {
            reaction.message.channel.send(
              'Something went wrong! Failed to format code :('
            );
            console.error(error);
          });
      }
    });

    client.once('ready', () => console.log('ready!'));

    client.login(config.TOKEN);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
