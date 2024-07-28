import { EmbedBuilder, type User } from "discord.js";
import { customSubstring } from "../utils/customSubstring.js";
import { errorHandler } from "../utils/errorHandler.js";
import type { ExtendedClient } from "../interfaces/extendedClient.js";
import type { ModerationActions } from "../interfaces/moderationActions.js";

/**
 * Generates a moderation embed notice and sends it to the user.
 * @param camperChan - CamperChan's Discord instance.
 * @param action - The moderation action taken.
 * @param user - The Discord user being moderated.
 * @param guildName - The name of the guild the moderation occurred in.
 * @param reason - The reason for the moderation action.
 * @returns True if the message was sent, false otherwise.
 */
export const sendModerationDm = async(
  camperChan: ExtendedClient,
  action: ModerationActions,
  user: User,
  guildName: string,
  reason: string,
// eslint-disable-next-line @typescript-eslint/max-params
): Promise<boolean> => {
  try {
    const embed = new EmbedBuilder();
    embed.setTitle(`${action} Notification!`);
    embed.setDescription(
      `You have received a ${action} in ${guildName} for: \n\n${customSubstring(
        reason,
        2000,
      )}`,
    );

    if (action === "ban") {
      embed.addFields({
        name: "Appeals",
        value:
          `You can use [this google form](https://docs.google.com/forms/d/e/1FAIpQLSdhJjpK8dPlktQMEatUwmXworqZF9ig14oiwmiZzd0skz5ekQ/viewform) to appeal your ban after you have [read our code of conduct](https://www.freecodecamp.org/news/code-of-conduct).`,
      });
    }

    const sent = await user.
      send({ embeds: [ embed ] }).
      then(() => {
        return true;
      }).
      catch(() => {
        return false;
      });
    return sent;
  } catch (error) {
    await errorHandler(camperChan, "send moderation dm module", error);
    return false;
  }
};
