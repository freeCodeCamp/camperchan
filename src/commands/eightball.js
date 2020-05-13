module.exports = {
  prefix: '!eightball',
  /**
   * @name eightBall
   * Randomly selects an option, and returns it to chat.
   *
   * @param {Discord.Message} message the message provided
   */
  command: function eightBall(message) {
    console.log('eightBall', message);
    // TODO:
    message.channel.send('magic not ready yet');
  },
};
