/**
 * @name getConfig
 * Utility function that returns the configuration for the application.
 *
 * @returns {Promise<object>} a promise, to support more complex configs
 * in the future potentially, like loading from a file async, or http.
 */
require('dotenv').config();

module.exports = function getConfig() {
  return {
    /**
     * The discord token
     */
    TOKEN: process.env.TOKEN,
    /**
     * The bots prefix which should be placed in-front of
     * every command. Defaults to '!FCC' if nothing was given
     *  **note** this is not used yet, all command still follow the :
     * `!myCommand` format.
     */
    PREFIX: process.env.PREFIX,
    /**
     * If the bot should log all message to the console.
     * By default this feature is OFF to supress the amount of
     * logs being printed.
     */
    VERBOSE: process.env.PREFIX,
    /**
     * If the bot should send the FCC code of conduct via a DM
     * to any new user who joins the server.
     * By default this feature is OFF
     */
    WELCOME_DM: process.env.WELCOME_DM,
    /**
     * The name of channel to post "leave" messages to.
     * If not given, or if the channel is not found
     * the message will not be provided.
     *
     * TODO: not added yet
     */
    LEAVE_MSG_CHANNEL: process.env.LEAVE_MSG_CHANNEL
  };
};
