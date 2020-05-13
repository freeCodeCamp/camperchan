const { Client } = require('discord.js');
const getConfig = require('./config/get-config');
const validateConfig = require('./config/validate-config');
const client = new Client();

(async () => {
  try {
    // this iife is so we can get "top level await"
    console.log('hello world!');
    const config = await getConfig();
    validateConfig(config);

    // rig up client callbacks
    client.on('error', console.error);

    // TODO: bootstrap commands

    await new Promise((resolve) => client.on('ready', resolve));
    console.log('ready!');

    await client.login(config.TOKEN);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
