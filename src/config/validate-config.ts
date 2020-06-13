import { Config } from './get-config';

/**
 * @name validateConfig
 *
 * Verifies if the config has all required
 * parameters for the bot to function. Will throw
 * an error with details about what is missing
 * @param config the config object
 *
 * @returns undefined if everything is good.
 */
export function validateConfig(config: Config): void {
  {
    if (!config) {
      throw new Error('Config is undefined');
    }
    // **note** this is done for future proofing more required configs.
    const missingConfigProps = (['TOKEN'] as Array<keyof Config>).filter(
      (prop) => !config[prop]
    );
    if (missingConfigProps.length) {
      missingConfigProps.forEach((prop) =>
        console.log(`missing config: ${prop}`)
      );
      console.log('read the README for setting up locally');
      throw new Error('Config is missing prop(s)');
    }
    return;
  }
}
