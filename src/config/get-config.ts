require('dotenv').config();

/**
 * @name getConfig
 * Utility function that returns the configuration for the application.
 *
 * @returns {object} the config object with defaults applied.
 */
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
    PREFIX: process.env.PREFIX || '!FCC',
    /**
     * If the bot should log all message to the console.
     * By default this feature is OFF to suppress the amount of
     * logs being printed.
     */
    VERBOSE: process.env.PREFIX === 'true',
    /**
     * If the bot should send the FCC code of conduct via a DM
     * to any new user who joins the server.
     * By default this feature is OFF
     */
    WELCOME_DM: process.env.WELCOME_DM === 'true',
    /**
     * The name of channel to post "leave" messages to.
     * If not given, or if the channel is not found
     * the message will not be provided.
     */
    LEAVE_MSG_CHANNEL: process.env.LEAVE_MSG_CHANNEL === 'true',
    /**
     * The name of the channel to log deleted messages to.
     * If not given, or if the channel is not found
     * the log will not be generated.
     */
    LOG_MSG_CHANNEL: process.env.LOG_MSG_CHANNEL || 'moderation-activity',
    /**
     * The port to "listen" for liveness checks.
     * Defaults to 8080
     */
    PORT: process.env.PORT || 8080
  };
};
