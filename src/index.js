const { Client } = require('discord.js');
const getConfig = require('./config/get-config');
const validateConfig = require('./config/validate-config');
const bootstrap = require('./commands/bootstrap');
const client = new Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
const addFormatting = require('./commands/add-formatting');

(async () => {
  try {
    // this iife is so we can get "top level await"
    console.log('Initalizing...');
    const config = getConfig();
    validateConfig(config);
    // rig up client callbacks
    client.on('error', console.error);

    bootstrap({ client, config });

    client.on('message', (message) => {
      console.log('>> ', message.content);
    });

    // The code below listens for reactions to any message in the server and if
    // a reaction is equal to the specified trigger reaction (in this case '🤖'),
    // then is attempts to format the message. To get a detailed explanation of the
    // code below visit: https://discordjs.guide/popular-topics/reactions.html#listening-for-reactions-on-old-messages

    client.on('messageReactionAdd', async (reaction) => {
      if (reaction.partial) {
        try {
          await reaction.fetch();
        } catch (error) {
          reaction.message.channel.send(
            'Something went wrong! Failed to format code :('
          );
          console.error(error);

          return;
        }
      }

      if (reaction.emoji.name === '🤖') {
        try {
          await reaction.message.reactions.removeAll();

          addFormatting.command(reaction.message);
        } catch (error) {
          reaction.message.channel.send(
            'Something went wrong! Failed to format code :('
          );
          console.error(error);
        }
      }
    });

    client.once('ready', () => console.log('ready!'));

    client.login(config.TOKEN);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
