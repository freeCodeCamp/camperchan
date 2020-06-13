/**
 * @name validateConfig
 *
 * Verifies if the config has all required
 * parameters for the bot to function. Will throw
 * an error with details about what is missing
 * @param {} config the config object
 *
 * @returns undefined if everything is good.
 * @see get-config
 */
module.exports = function validateConfig(config) {
  {
    if (!config) {
      throw new Error('Config is undefined');
    }
    // **note** this is done for future proofing more required configs.
    const missingConfigProps = ['TOKEN'].filter((prop) => !config[prop]);
    if (missingConfigProps.length) {
      missingConfigProps.forEach((prop) =>
        console.log(`missing config: ${prop}`)
      );
      console.log('read the README for setting up locally');
      throw new Error('Config is missing prop(s)');
    }
    return;
  }
};
