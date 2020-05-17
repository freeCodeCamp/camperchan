/**
 * @name confusedMessageGenerator
 * Generates a message when the bot can't detect any language for sure and
 * asks user for help by reacting with specific emojis
 *
 * @param {string[]} possibleLanguages The guessed possible languages
 * @param {string[]} reactionEmojies The reaction options
 *
 * @returns {string} The message asking users help
 */

module.exports = function confusedMessageGenerator(
  possibleLanguages,
  reactionEmojies
) {
  let questions = [];

  possibleLanguages.map((language, index) => {
    questions.push(
      `Is it \`${language}\`? (If it is \`${language}\`, then react to the unformatted message with a ${reactionEmojies[index]} emoji)`
    );
  });

  let confusedMessage = `${questions.join(
    '\n'
  )}\n\n(P.S.: React to this message...)`;

  return confusedMessage;
};
