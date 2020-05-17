const lang = require('language-classifier');
const hljs = require('highlight.js');
const confusedMessageGenerator = require('../utilities/confused-message-generator');
const isSuppotedByPrettier = require('../utilities/is-suppoted-by-prettier');
const formatter = require('../utilities/formatter');
const formatMessageWithCodeblock = require('../utilities/formatCodeblock');
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
    const detectedWithLanguageClassifier = lang(message.content);

    languageGuesses.push(detectedWithHLJS.language);
    if (detectedWithHLJS.second_best) {
      languageGuesses.push(detectedWithHLJS.second_best.language);
    }
    languageGuesses.push(detectedWithLanguageClassifier);

    console.log(languageGuesses);

    console.log(detectedWithLanguageClassifier, detectedWithHLJS);
    if (!detectedWithHLJS.top.aliases) {
      detectedWithHLJS.top.aliases = [];
    }
    if (
      detectedWithLanguageClassifier === detectedWithHLJS.language ||
      detectedWithHLJS.top.aliases.includes(detectedWithLanguageClassifier) // need compare it with hljs's second guess here too
    ) {
      let supportedLanguage = isSuppotedByPrettier(
        detectedWithLanguageClassifier
      );

      if (supportedLanguage) {
        const formattedCode = formatter(content, supportedLanguage);
        message.channel.send(
          formatMessageWithCodeblock(
            detectedWithLanguageClassifier,
            formattedCode
          )
        );
        return;
      }
      message.channel.send(
        formatMessageWithCodeblock(detectedWithLanguageClassifier, content)
      );
    } else {
      const reactionOptionsObj = {
        firstOption: '🙂',
        secondOption: '🙃',
        thirdOption: '😃',
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
        content,
      };

      const refToPromptMsg = message.channel.send(confusedMessage);
      refToPromptMsg.then((ref) => {
        processReply({ ...requiredInfoObj, ref });
      });
    }
  },
};
