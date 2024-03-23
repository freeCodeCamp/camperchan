import { Languages } from "../config/Languages";
import { ExtendedClient } from "../interfaces/ExtendedClient";
import { errorHandler } from "../utils/errorHandler";

/**
 * Loads the cached roles and validates that all langagues
 * in the config have a role.
 *
 * @param {ExtendedClient} CamperChan The CamperChan's Discord instance.
 */
export const loadRoles = async (CamperChan: ExtendedClient) => {
  try {
    const roles = await CamperChan.homeGuild.roles.fetch(undefined, {
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
      await CamperChan.config.debugHook.send({
        content: `WARNING!!!!!! The following languages do not have a matching role.\n${missingRoles.join(
          ", "
        )}`
      });
      return;
    }
    await CamperChan.config.debugHook.send({
      content: "Language roles loaded~!"
    });
  } catch (err) {
    await errorHandler(CamperChan, "load roles module", err);
  }
};
