const hljs = require('highlight.js');
const confusedMessageGenerator = require('../utilities/confused-message-generator');
const processReply = require('../utilities/process-reply');

module.exports = {
  prefix: '',
  /**
   * @name add-formatting
   * Inserts any unformated code to a code block, enables syntax highlighting and formats it when a
   * message gets a specific reaction
   *
   * @param {Discord.Message} message The message provided
   */
  command: function addFormatting(message) {
    const { content } = message;

    const languageGuesses = [];

    const detectedWithHLJS = hljs.highlightAuto(message.content);

    languageGuesses.push(detectedWithHLJS.language);
    if (detectedWithHLJS.second_best) {
      languageGuesses.push(detectedWithHLJS.second_best.language);
    }

    console.log(languageGuesses);

    if (!detectedWithHLJS.top.aliases) {
      detectedWithHLJS.top.aliases = [];
    }

    const reactionOptionsObj = {
      firstOption: '🙂',
      secondOption: '🙃'
    };

    const reactionEmojies = [];

    const objectKeys = Object.keys(reactionOptionsObj);

    objectKeys.map((key) => {
      reactionEmojies.push(reactionOptionsObj[key]);
    });

    const confusedMessage = confusedMessageGenerator(
      languageGuesses,
      reactionEmojies
    );

    const requiredInfoObj = {
      reactionEmojies,
      reactionOptionsObj,
      languageGuesses,
      content
    };

    const refToPromptMsg = message.channel.send(confusedMessage);
    refToPromptMsg.then((ref) => {
      processReply({ ...requiredInfoObj, ref });
    });
  }
};
