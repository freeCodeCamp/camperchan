/**
 * Thanks handler that will show a nice message
 * for "brownie points" when thanking other users.
 *
 * TODO: maybe rename to be more clear what this does?
 * @param {Discord.message} message the message we are to check against.
 */
function thanks(message) {
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
 * @param {Discord.message} message the message we want to check
 * @returns {boolean}
 */
function shouldThank(message) {
  return (
    !!['thanks', 'thank you'].find((thankStr) =>
      message.content.toLowerCase().includes(thankStr)
    ) && !!message.mentions.users.size
  );
}

/**
 * Returns if the message is only thanking themselves. This will
 * return false if there are other users thanked, but the author
 * will be skipped.
 *
 * **note** should only include users
 * @param {Discord.message} message
 * @returns {boolean}
 */
function isSelfThanking(message) {
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
 * @param {string} str the string we are to check
 */
function isStrMention(str) {
  str = str.trim();
  return str.startsWith('<@') && str.endsWith('>');
}
/**
 * Returns the userId from the strMention. Will return an empty string
 * if the mention string isn't given. This also should be only
 * ONE WORD
 * @param {string} str the string that should be a mention
 *
 * **note** uses logic from https://discordjs.guide/miscellaneous/parsing-mention-arguments.html#implementation
 */
function getUserIdFromStrMention(str) {
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
 * @param {Discord.message} message
 * @returns {string}
 */
function getSelfThankMessage(message) {
  return `Sorry ${message.author.toString()}, you can't send brownie points to yourself!`;
}
/**
 * Returns the final thank message to send in chat. Should include all
 * user's mentioned in the post, but not include the author
 * @param {Discord.message} message
 * @returns {string}
 */
function getThankMessage(message) {
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

module.exports = {
  // **note** all of these are exported primarily for testing,
  // but thanks is the main api to use
  thanks,
  shouldThank,
  isStrMention,
  getUserIdFromStrMention,
  isSelfThanking,
  getThankMessage,
  getSelfThankMessage
};
