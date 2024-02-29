import { ButtonInteraction } from "discord.js";

import { Camperbot } from "../interfaces/Camperbot";
import { errorHandler } from "../utils/errorHandler";

/**
 * Handles the logic when a button created by the `role` command is clicked.
 *
 * @param {Camperbot} Bot Camperbot's discord instance.
 * @param {ButtonInteraction} interaction The interaction payload from Discord.
 */
export const reactionRoleClick = async (
  Bot: Camperbot,
  interaction: ButtonInteraction
) => {
  try {
    // Ephemeral response so this can be used in announcement channels.
    await interaction.deferReply({ ephemeral: true });
    const { guild, customId, member } = interaction;

    // The third condition is a type-guard, essentially. Our bot receives interactions
    // over the gateway, but bots can alternatively receive interactions via HTTP requests.
    // The type-defs are different for these, so we're excluding the HTTP request types.
    if (!guild || !member || Array.isArray(member.roles)) {
      await interaction.editReply(
        "Did not receive the required values from the API."
      );
      return;
    }

    const roleId = customId.split("-")[1];
    if (!roleId) {
      await interaction.editReply({ content: "Error loading that role data." });
      return;
    }
    const role = await guild.roles.fetch(roleId).catch(() => null);

    if (!role) {
      await interaction.editReply("Cannot find that role.");
      return;
    }

    if (member.roles.cache.has(role.id)) {
      await member.roles.remove(role);
      await interaction.editReply(`Removed the ${role.name} role.`);
      return;
    }
    await member.roles.add(role);
    await interaction.editReply(`Added the ${role.name} role.`);
  } catch (err) {
    await errorHandler(Bot, err);
    await interaction.editReply("Something went wrong.");
  }
};
