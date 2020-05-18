const Discord = require("discord.js");
const fs = require("fs");
module.exports = {
  prefix: "!help",
  description: "Get the commands currently available with this bot",
  /**
   * @name help
   * Displays currently available commands.
   *
   * @param {Discord.Message} message the message provided
   * Now automatically adds new commands - make sure the .js file has a prefix and description,
   */

  command: async function help(message) {
    //console.log("help", message);
    try {
      const helpEmbed = {
        color: "#0099FF",
        title: "Bot Information",
        description:
          "Hello! I am a test bot created by bradtaniguchi and members of FreeCodeCamp.org to experiment with the process of building a Discord Bot. You can view my source code at https://github.com/bradtaniguchi/discord-bot-test",
        fields: [],
        footer: { text: "I am not affiliated with FreeCodeCamp in any way." },
      };

      fs.readdir(__dirname, (error, files) => {
        if (error) {
          console.error(error);
        }
        for (let i = 0; i < files.length; i++) {
          let lookup = require(`./${files[i]}`);
          if (lookup.prefix == undefined || lookup.description == undefined) {
            continue;
          } else {
            let fieldObj = {
              name: lookup.prefix.substring(0, 255),
              value: lookup.description.substring(0, 1023),
            };
            helpEmbed.fields.push(fieldObj);
          }
        }
      });

      message.author.send({ embed: helpEmbed });
    } catch (error) {
      console.error(error);
    }
  },
};
