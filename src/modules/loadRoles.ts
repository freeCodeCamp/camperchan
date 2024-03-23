import { Languages } from "../config/Languages";
import { Camperbot } from "../interfaces/Camperbot";
import { errorHandler } from "../utils/errorHandler";

/**
 * Loads the cached roles and validates that all langagues
 * in the config have a role.
 *
 * @param {Camperbot} bot The bot's Discord instance.
 */
export const loadRoles = async (bot: Camperbot) => {
  try {
    const roles = await bot.homeGuild.roles.fetch(undefined, {
      cache: true,
      force: true
    });
    const missingRoles: string[] = [];
    for (const language of Languages) {
      const role = roles.find(
        (r) => r.name.toLowerCase() === language.toLowerCase()
      );
      if (!role) {
        missingRoles.push(language);
      }
    }
    if (missingRoles.length) {
      await bot.config.debugHook.send({
        content: `WARNING!!!!!! The following languages do not have a matching role.\n${missingRoles.join(
          ", "
        )}`
      });
      return;
    }
    await bot.config.debugHook.send({
      content: "Language roles loaded~!"
    });
  } catch (err) {
    await errorHandler(bot, "load roles module", err);
  }
};
