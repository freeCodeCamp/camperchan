const Discord = require('discord.js');
module.exports = {
  prefix: 'help',
  /**
   * @name help
   * Displays currently available commands.
   *
   * @param {Discord.Message} message the message provided
   *Use this format to add new commands:
   *{name: "Command Name", value: "Command Description"},
   */

  command: async function help(message) {
    //console.log("help", message);
    try {
      const helpEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Bot Information')
        .setDescription(
          'Hello! I am a test bot created by bradtaniguchi and members of FreeCodeCamp.org ' +
            'to experiment with the process of building a Discord Bot. You can view my source ' +
            'code at https://github.com/bradtaniguchi/discord-bot-test'
        )
        .addFields(
          { name: '\u200B', value: '\u200B' },
          {
            name: 'Commands',
            value: 'Here are my currently available commands!'
          },
          {
            name: '!eightball <optional string>',
            value: 'Returns a response from a magic pool ball!'
          },
          //new command lines go below here.

          //for spacing, leave this one at bottom.
          { name: '\u200B', value: '\u200B' }
        )
        .setFooter('I am not affiliated with FreeCodeCamp in any way.');

      message.author.send(helpEmbed);
    } catch (error) {
      console.error(error);
    }
  }
};
