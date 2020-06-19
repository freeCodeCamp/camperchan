const Discord = require('discord.js');
module.exports = {
  prefix: 'coc',
  description: 'Provides the Code of Conduct.',
  command: function (message) {
    const codeEmbed = new Discord.MessageEmbed()
      .setTitle('FreeCodeCamp Code of Conduct')
      .setDescription(
        'These are the basic rules for interacting with the FreeCodeCamp community on any platform, including this Discord server. You can read the full document on the [FreeCodeCamp article](https://freecodecamp.org/news/code-of-conduct)'
      )
      .addFields(
        {
          name: 'No harassment',
          value:
            'Harassment includes sexual language and imagery, deliberate intimidation, stalking, name-calling, unwelcome attention, libel, and any malicious hacking or social engineering. freeCodeCamp should be a harassment-free experience for everyone, regardless of gender, gender identity and expression, age, sexual orientation, disability, physical appearance, body size, race, national origin, or religion (or lack thereof).'
        },
        {
          name: 'No trolling',
          value:
            'Trolling includes posting inflammatory comments to provoke an emotional response or disrupt discussions.'
        },
        {
          name: 'No spamming',
          value:
            'Spamming includes posting off-topic messages to disrupt discussions, promoting a product, soliciting donations, advertising a job / internship / gig, or flooding discussions with files or text.'
        }
      );

    message.channel.send(codeEmbed).catch((error) => console.log(error));
  }
};
