const { promises } = require('fs');
const { readdir } = promises;

module.exports = {
  prefix: 'help',
  description: 'Get the commands currently available with this bot',
  /**
   * @name help
   * Displays currently available commands.
   *
   * @param {Discord.Message} message the message provided
   * Now automatically adds new commands - make sure the .js file has a prefix and description,
   */
  command: async function help(message) {
    const helpEmbed = {
      color: '#0099FF',
      title: 'Bot Information',
      description:
        'Hello! I am a test bot created by bradtaniguchi and members of ' +
        'FreeCodeCamp.org to experiment with the process of building a ' +
        'Discord Bot. You can view my source code at ' +
        ' https://github.com/bradtaniguchi/discord-bot-test',
      fields: [],
      footer: { text: 'I am not affiliated with FreeCodeCamp in any way.' }
    };

    const results = await readdir(__dirname);
    results.forEach((file) => {
      const filename = file;
      const lookup = require(`./${filename}`);
      if (lookup.prefix && lookup.description) {
        const fieldObj = {
          name: lookup.prefix.substring(0, 255),
          value: lookup.description.substring(0, 1023)
        };
        helpEmbed.fields.push(fieldObj);
      }
    });
    await message.author.send({ embed: helpEmbed });
    message.channel.send('Help message sent!');
  }
};
