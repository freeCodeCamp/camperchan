const lang = require('language-classifier');
const hljs = require('highlight.js');
const confusedMessageGenerator = require('../utilities/confusedMessageGenerator');
const isSuppotedByPrettier = require('../utilities/isSuppotedByPrettier');
const formatter = require('../utilities/formatter');
const formatMessageWithCodeblock = require('../utilities/formatCodeblock');

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
      }; //['🙂', '🙃', '😃']

      const reactionEmojies = [];

      const objectKeys = Object.keys(reactionOptionsObj);

      objectKeys.map((key) => {
        reactionEmojies.push(reactionOptionsObj[key]);
      });

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
              case reactionOptionsObj.firstOption: {
                const supportedLanguage = isSuppotedByPrettier(
                  languageGuesses[0]
                );
                if (supportedLanguage) {
                  const formattedCode = formatter(content, supportedLanguage);
                  ref.channel.send(
                    formatMessageWithCodeblock(
                      languageGuesses[0],
                      formattedCode
                    )
                  );
                } else {
                  ref.channel.send(
                    formatMessageWithCodeblock(languageGuesses[0], content)
                  );
                }
                break;
              }
              case reactionOptionsObj.secondOption: {
                const supportedLanguage = isSuppotedByPrettier(
                  languageGuesses[1]
                );
                if (supportedLanguage) {
                  const formattedCode = formatter(content, supportedLanguage);

                  ref.channel.send(
                    formatMessageWithCodeblock(
                      languageGuesses[1],
                      formattedCode
                    )
                  );
                } else {
                  ref.channel.send(
                    formatMessageWithCodeblock(languageGuesses[1], content)
                  );
                }
                break;
              }
              case reactionOptionsObj.thirdOption: {
                const supportedLanguage = isSuppotedByPrettier(
                  languageGuesses[2]
                );

                if (supportedLanguage) {
                  const formattedCode = formatter(content, supportedLanguage);
                  ref.channel.send(
                    formatMessageWithCodeblock(
                      languageGuesses[2],
                      formattedCode
                    )`\`\`\`${languageGuesses[2]}\n${formattedCode}\`\`\``
                  );
                } else {
                  ref.channel.send(
                    formatMessageWithCodeblock(languageGuesses[2], content)
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
