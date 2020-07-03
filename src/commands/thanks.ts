import { Message } from 'discord.js';

/**
 * Thanks handler that will show a nice message
 * for "brownie points" when thanking other users.
 *
 * TODO: maybe rename to be more clear what this does?
 * @param message the message we are to check against.
 */
export async function thanks(message: Message): Promise<Message | void> {
  if (!shouldThank(message)) {
    return;
  }
  if (isSelfThanking(message)) {
    return message.channel.send(getSelfThankMessage(message));
  }
  return message.channel.send(getThankMessage(message));
}

/**
 * If we should execute any "thank" logic. If anywhere in the message
 * the user has `thanks` or `thank you`, **and** mentions other users
 * @param message the message we want to check
 */
export function shouldThank(message: Message): boolean {
  const thankRegex = /((?:^|\s)(?:(?:th(?:n[qx]|x)|t[xyq]|tn(?:[x]){0,2})|\w*\s*[.,]*\s*than[kx](?:[sxz]){0,2}|than[kx](?:[sxz]){0,2}(?:[uq]|y(?:ou)?)?)|grazie|arigato(?:[u]{0,1})|doumo|gracias?|spasibo|dhanyavaad(?:hamulu)?|o?brigad(?:o|a)|dziekuje|(?:re)?merci|multumesc|shukra?an|danke)\b/gi;
  return (
    !!thankRegex.test(message.content.toLowerCase()) &&
    !!message.mentions.users.size
  );
}

/**
 * Returns if the message is only thanking themselves. This will
 * return false if there are other users thanked, but the author
 * will be skipped.
 *
 * **note** should only include users
 * @param message
 */
export function isSelfThanking(message: Message): boolean {
  return (
    message.mentions.users.size === 1 &&
    message.mentions.users.has(message.author.id)
  );
}
/**
 * If the given string is a mention, should be a single "word"
 * from the discord mentions content.
 *
 * **note** uses logic from https://discordjs.guide/miscellaneous/parsing-mention-arguments.html#implementation
 * @param  str the string we are to check
 */
export function isStrMention(str: string): boolean {
  str = str.trim();
  return str.startsWith('<@') && str.endsWith('>');
}
/**
 * Returns the userId from the strMention. Will return an empty string
 * if the mention string isn't given. This also should be only
 * ONE WORD
 * @param str the string that should be a mention
 *
 * **note** uses logic from https://discordjs.guide/miscellaneous/parsing-mention-arguments.html#implementation
 */
export function getUserIdFromStrMention(str: string): string {
  if (!isStrMention(str)) {
    // extra check if for some reason we don't do this
    return '';
  }
  // should remove '<@' and '>'
  str = str.slice(2, -1);
  if (str.startsWith('!')) {
    // should remove the ! for the nickname I guess?
    return str.slice(1);
  }
  return str;
}

/**
 * Returns the message to show if the user thanks **only** themselves
 * @param message
 */
export function getSelfThankMessage(message: Message): string {
  return `Sorry ${message.author.toString()}, you can't send brownie points to yourself!`;
}
/**
 * Returns the final thank message to send in chat. Should include all
 * user's mentioned in the post, but not include the author
 * @param message
 */
export function getThankMessage(message: Message): string {
  const author = message.author.toString();
  const strMentions = [
    ...new Set(
      message.content
        .split(' ')
        .map((word) => word.trim())
        .filter(
          (word) =>
            isStrMention(word) &&
            getUserIdFromStrMention(word) !== getUserIdFromStrMention(author)
        )
    )
  ];
  const userIds = strMentions;
  return `${author} sends brownie points to ${userIds} ✨👍✨`;
}
