const lang = require('language-classifier');
const hljs = require('highlight.js');
const confusedMessageGenerator = require('../utilities/confusedMessageGenerator');
const isSuppotedByPrettier = require('../utilities/isSuppotedByPrettier');
const formatter = require('../utilities/formatter');

module.exports = {
  prefix: '',
  /**
   * @name add-formatting
   * Inserts any unformated code to a code block, enables syntax highlighting and formats it when a
   * message gets a specific reaction
   *
   * @param {Discord.Message} message the message provided
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
          `\`\`\`${detectedWithLanguageClassifier}\n${formattedCode}\`\`\``
        );
      } else {
        message.channel.send(
          `\`\`\`${detectedWithLanguageClassifier}\n${content}\`\`\``
        );
      }
    } else {
      const reactionEmojies = ['🙂', '🙃', '😃'];

      const confusedMessage = confusedMessageGenerator(
        languageGuesses,
        reactionEmojies
      );

      const refToPromptMsg = message.channel.send(confusedMessage);
      refToPromptMsg.then((ref) => {
        const filter = (reaction) => {
          return reactionEmojies.includes(reaction.emoji.name);
        };

        ref
          .awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
          .then((collected) => {
            const collectedEmojis = [...collected.values()];
            const reactionEmoji = collectedEmojis[0]._emoji.name; // might want to change this line to enable multiple format

            switch (reactionEmoji) {
              case reactionEmojies[0]: {
                const supportedLanguage = isSuppotedByPrettier(
                  languageGuesses[0]
                );
                if (supportedLanguage) {
                  const formattedCode = formatter(content, supportedLanguage);
                  ref.channel.send(
                    `\`\`\`${languageGuesses[0]}\n${formattedCode}\`\`\``
                  );
                } else {
                  ref.channel.send(
                    `\`\`\`${languageGuesses[0]}\n${content}\`\`\``
                  );
                }
                break;
              }
              case reactionEmojies[1]: {
                const supportedLanguage = isSuppotedByPrettier(
                  languageGuesses[1]
                );
                if (supportedLanguage) {
                  const formattedCode = formatter(content, supportedLanguage);

                  ref.channel.send(
                    `\`\`\`${languageGuesses[1]}\n${formattedCode}\`\`\``
                  );
                } else {
                  ref.channel.send(
                    `\`\`\`${languageGuesses[1]}\n${content}\`\`\``
                  );
                }
                break;
              }
              case reactionEmojies[2]: {
                const supportedLanguage = isSuppotedByPrettier(
                  languageGuesses[2]
                );

                if (supportedLanguage) {
                  const formattedCode = formatter(content, supportedLanguage);
                  ref.channel.send(
                    `\`\`\`${languageGuesses[2]}\n${formattedCode}\`\`\``
                  );
                } else {
                  ref.channel.send(
                    `\`\`\`${languageGuesses[2]}\n${content}\`\`\``
                  );
                }
                break;
              }
            }
          })
          .catch((collected) => {
            console.log(`Reacted: ${collected}`);
          });
      });
    }
  },
};