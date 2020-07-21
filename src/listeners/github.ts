import { MessageEmbed, Message } from 'discord.js';
import fetch from 'node-fetch';
//sample https://github.com/freeCodeCamp/freeCodeCamp/pull/11111
export async function github(message: Message): Promise<void> {
  try {
    if (message.content.includes('https://github.com')) {
      const values = message.content.split(' ');
      const target = values.filter((el) =>
        el.includes('https://github.com')
      )[0];
      const params = target.substring(8).split('/');
      if (params.length < 5) return;
      if (params[3] === 'pull') params[3] = 'pulls';
      const data = await fetch(
        `https://api.github.com/repos/${params[1].toLowerCase()}/${params[2].toLowerCase()}/${params[3].toLowerCase()}/${
          params[4]
        }`
      );
      const parsed = await data.json();
      if (parsed.message === 'Not Found') {
        message.channel.send('Data not found');
        return;
      }
      const ghEmbed = new MessageEmbed()
        .setTitle(`#${parsed.number} - ${parsed.title}`)
        .setDescription(parsed.body.substring(0, 1000))
        .addFields(
          { name: 'Status', value: parsed.state },
          { name: 'Author', value: parsed.user.login },
          { name: 'Link', value: parsed.html_url }
        )
        .setColor(parsed.state === 'open' ? '#00FF00' : '#FF0000');
      message.channel.send(ghEmbed);
    }
  } catch (error) {
    console.log(error);
  }
}
