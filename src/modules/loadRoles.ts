import { languages } from "../config/languages.js";
import { errorHandler } from "../utils/errorHandler.js";
import type { ExtendedClient } from "../interfaces/extendedClient.js";

/**
 * Loads the cached roles and validates that all langagues
 * in the config have a role.
 * @param camperChan - The camperChan's Discord instance.
 */
export const loadRoles = async(camperChan: ExtendedClient): Promise<void> => {
  try {
    const roles = await camperChan.homeGuild.roles.fetch(undefined, {
      cache: true,
      force: true,
    });
    const missingRoles: Array<string> = [];
    for (const language of languages) {
      const role = roles.find(
        (r) => {
          return r.name.toLowerCase() === language.toLowerCase();
        },
      );
      if (!role) {
        missingRoles.push(language);
      }
    }
    if (missingRoles.length > 0) {
      await camperChan.config.debugHook.send({
        content: `WARNING!!!!!! The following languages do not have a matching role.\n${missingRoles.join(
          ", ",
        )}`,
      });
      return;
    }
    await camperChan.config.debugHook.send({
      content: "Language roles loaded~!",
    });
  } catch (error) {
    await errorHandler(camperChan, "load roles module", error);
  }
};
