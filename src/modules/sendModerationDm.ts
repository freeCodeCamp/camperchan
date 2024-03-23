import { EmbedBuilder, User } from "discord.js";

import { Camperbot } from "../interfaces/Camperbot";
import { ModerationActions } from "../interfaces/ModerationActions";
import { customSubstring } from "../utils/customSubstring";
import { errorHandler } from "../utils/errorHandler";

/**
 * Generates a moderation embed notice and sends it to the user.
 *
 * @param {Camperbot} Bot Bot's Discord instance.
 * @param {ModerationActions} action The moderation action taken.
 * @param {User} user The Discord user being moderated.
 * @param {string} guildName The name of the guild the moderation occurred in.
 * @param {string} reason The reason for the moderation action.
 * @returns {boolean} True if the message was sent, false otherwise.
 */
export const sendModerationDm = async (
  Bot: Camperbot,
  action: ModerationActions,
  user: User,
  guildName: string,
  reason: string
): Promise<boolean> => {
  try {
    const embed = new EmbedBuilder();
    embed.setTitle(`${action} Notification!`);
    embed.setDescription(
      `You have received a ${action} in ${guildName} for: \n\n${customSubstring(
        reason,
        2000
      )}`
    );

    if (action === "ban") {
      embed.addFields({
        name: "Appeals",
        value:
          "You can use [this google form](https://docs.google.com/forms/d/e/1FAIpQLSdhJjpK8dPlktQMEatUwmXworqZF9ig14oiwmiZzd0skz5ekQ/viewform) to appeal your ban after you have [read our code of conduct](https://www.freecodecamp.org/news/code-of-conduct)."
      });
    }

    const sent = await user
      .send({ embeds: [embed] })
      .then(() => true)
      .catch(() => false);
    return sent;
  } catch (err) {
    await errorHandler(Bot, "send moderation dm module", err);
    return false;
  }
};
