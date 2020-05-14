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
    const options = ["As I see it, yes." , "Ask again later." , "Better not tell you now.", "Cannot predict now.", "Concentrate and ask again.", "Don't count on it.", "It is certain.", "It is decidedly so.", "Most likely.", "My reply is no.", "My sources say no.", "Outlook not so good.", "Outlook good.", "Reply hazy, try again.",
"Signs point to yes.", "Very doubtful.", "Without a doubt.", "Yes.", "Yes - definitely.", "You may rely on it."]
    const rand = Math.floor(Math.random() * options.length)
    message.channel.send(options[rand]);
  },
};

