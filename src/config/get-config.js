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
    PREFIX: process.env.PREFIX
  };
};
