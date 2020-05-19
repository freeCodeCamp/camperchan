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
  const questions = possibleLanguages.map(
    (language, index) =>
      `Is it \`${language}\`? (If it is \`${language}\`, then react to **this** message with a ${reactionEmojies[index]} emoji)`
  );

  const joinedQuestions = questions.join('\n');

  const confusedMessage = `${joinedQuestions}\n\n`;

  return confusedMessage;
};
