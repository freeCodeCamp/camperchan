import { MessageEmbed } from 'discord.js';
import { GithubData } from '../APIs/github-def';

export function issueEmbedGenerator(
  issueData: GithubData,
  isFullEmbed: boolean
): MessageEmbed {
  const {
    title,
    user,
    comments,
    state,
    html_url,
    pull_request,
    number
  } = issueData;
  const bannerImageLink =
    'https://camo.githubusercontent.com/60c67cf9ac2db30d478d21755289c423e1f985c6/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f66726565636f646563616d702f776964652d736f6369616c2d62616e6e65722e706e67';

  let embedType = 'Issue';
  if (pull_request) {
    embedType = 'Pull Request';
  }

  let issueEmbed;

  if (isFullEmbed) {
    issueEmbed = new MessageEmbed()
      .setTitle(title)
      .addField('Type', embedType, true)
      .addField('ID', `#${number}`, true)
      .addField('Comments', comments.toString(), true)
      .addField('Status', state.toUpperCase(), true)
      .setAuthor(user.login, user.avatar_url, user.url)
      .setColor(state === 'closed' ? 'RED' : 'GREEN')
      .setURL(html_url)
      .setImage(bannerImageLink)
      .setFooter(
        "Thank you for your helping hand in freeCodeCamp's development!"
      );
  } else {
    issueEmbed = new MessageEmbed()
      .setTitle(`${embedType} #${number}`)
      .setColor(state === 'closed' ? 'RED' : 'GREEN')
      .setURL(html_url);
  }

  return issueEmbed;
}
