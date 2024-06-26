import GhostAdminApi from "@tryghost/admin-api";
import { SlashCommandBuilder } from "discord.js";

import { AuthorRoleId } from "../config/Roles.js";
import { Command } from "../interfaces/Command.js";
import { errorHandler } from "../utils/errorHandler.js";

export const author: Command = {
  data: new SlashCommandBuilder()
    .setName("author")
    .setDescription("Claim the author role.")
    .setDMPermission(false)
    .addStringOption((option) =>
      option
        .setName("email")
        .setDescription("The email tied to your freeCodeCamp NEWS account.")
        .setRequired(true)
    ),
  run: async (CamperChan, interaction) => {
    try {
      await interaction.deferReply({ ephemeral: true });
      const email = interaction.options.getString("email", true);
      const { member } = interaction;
      if (member.roles.cache.has(AuthorRoleId)) {
        await interaction.editReply({
          content: "You have already claimed the author role."
        });
        return;
      }
      const existsByUserId = await CamperChan.db.authors.findUnique({
        where: {
          userId: member.id
        }
      });
      if (existsByUserId) {
        await interaction.editReply({
          content:
            "An author record already exists on your Discord account. If you believe this is an error, please contact Naomi."
        });
        return;
      }
      const existsByEmail = await CamperChan.db.authors.findUnique({
        where: {
          email
        }
      });
      if (existsByEmail) {
        await interaction.editReply({
          content:
            "An author record already exists on your email. If you believe this is an error, please contact Naomi."
        });
        return;
      }
      const api = new GhostAdminApi({
        url: "https://freecodecamp.org/news",
        key: CamperChan.config.ghostKey,
        version: "v3"
      });
      const user = await api.users
        .browse({ filter: `email:'${email}'` })
        .catch(() => null);
      if (!user || user.length !== 1) {
        await interaction.editReply({
          content: `There does not appear to be a news account associated with ${email}. This has been flagged internally for Naomi to investigate.`
        });
        return;
      }
      await CamperChan.db.authors.create({
        data: {
          userId: member.id,
          email
        }
      });
      await member.roles.add(AuthorRoleId).catch(async () => {
        await CamperChan.config.debugHook.send(
          `Failed to give author role to ${interaction.user.id}. Please grant manually.`
        );
      });
      await interaction.editReply({
        content:
          "Congrats! You now have the authors role, with access to special channels."
      });
    } catch (err) {
      await errorHandler(CamperChan, "author command", err);
    }
  }
};
