function confusedMessageGenerator(possibleLanguages, reactionEmojies) {
  let questions = [];

  possibleLanguages.forEach((language, index) => {
    questions.push(
      `Is it \`${language}\`? (If it is \`${language}\`, then react to the unformatted message with a ${reactionEmojies[index]} emoji)`
    );
  });

  let confusedMessage = `${questions.join(
    '\n'
  )}\n\n(P.S.: React to this message...)`;

  return confusedMessage;
}

module.exports = confusedMessageGenerator;
