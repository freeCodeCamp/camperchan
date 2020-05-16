/**
 * @name getConfig
 * Utility function that returns the configuration for the application.
 *
 * @returns {Promise<object>} a promise, to support more complex configs
 * in the future potentially, like loading from a file async, or http.
 */
require('dotenv').config();

module.exports = function getConfig() {
  return Promise.resolve({
    TOKEN: process.env.TOKEN
  });
};
