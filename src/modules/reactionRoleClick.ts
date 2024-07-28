import { errorHandler } from "../utils/errorHandler.js";
import type { ExtendedClient } from "../interfaces/extendedClient.js";
import type { ButtonInteraction } from "discord.js";

/**
 * Handles the logic when a button created by the `role` command is clicked.
 * @param camperChan - ExtendedClient's discord instance.
 * @param interaction - The interaction payload from Discord.
 */
export const reactionRoleClick = async(
  camperChan: ExtendedClient,
  interaction: ButtonInteraction,
): Promise<void> => {
  try {
    // Ephemeral response so this can be used in announcement channels.
    await interaction.deferReply({ ephemeral: true });
    const { guild, customId, member } = interaction;

    /*
     * The third condition is a type-guard, essentially. Our camperChan receives interactions
     * over the gateway, but bots can alternatively receive interactions via HTTP requests.
     * The type-defs are different for these, so we're excluding the HTTP request types.
     */
    if (!guild || !member || Array.isArray(member.roles)) {
      await interaction.editReply(
        "Did not receive the required values from the API.",
      );
      return;
    }

    const roleId = customId.split("-").at(1);
    if (roleId === undefined) {
      await interaction.editReply({ content: "Error loading that role data." });
      return;
    }
    const role = await guild.roles.fetch(roleId).catch(() => {
      return null;
    });

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
  } catch (error) {
    await errorHandler(camperChan, "reaction role click module", error);
    await interaction.editReply("Something went wrong.");
  }
};
