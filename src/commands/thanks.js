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
    return getSelfThankMessage(message);
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
  returns[('thanks', 'thank you')].find((thankStr) =>
    message.content.toLowerCase().includes(thankStr)
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
  // TODO:
  return false;
}

/**
 * Returns the message to show if the user thanks **only** themselves
 * @param {Discord.message} message
 * @returns {string}
 */
function getSelfThankMessage(message) {
  // TODO:
  return '';
}
/**
 * Returns the final thank message to send in chat. Should include all
 * user's mentioned in the post, but not include the author
 * @param {Discord.message} message
 * @returns {string}
 */
function getThankMessage(message) {
  // TODO:
  return '';
}

module.exports = {
  // **note** all of these are exported primarily for testing,
  // but thanks is the main api to use
  thanks,
  shouldThank,
  isSelfThanking,
  getSelfThankMessage
};
