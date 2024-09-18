// eslint-disable-next-line @typescript-eslint/naming-convention
import GhostAdminApi from "@tryghost/admin-api";
import { InteractionContextType, SlashCommandBuilder } from "discord.js";
import { authorRoleId } from "../config/roles.js";
import { errorHandler } from "../utils/errorHandler.js";
import type { Command } from "../interfaces/command.js";

export const author: Command = {
  data: new SlashCommandBuilder().
    setName("author").
    setDescription("Claim the author role.").
    setContexts(InteractionContextType.Guild).
    addStringOption((option) => {
      return option.
        setName("email").
        setDescription("The email tied to your freeCodeCamp NEWS account.").
        setRequired(true);
    }),
  run: async(camperChan, interaction) => {
    try {
      await interaction.deferReply({ ephemeral: true });
      const email = interaction.options.getString("email", true);
      const { member } = interaction;
      if (member.roles.cache.has(authorRoleId)) {
        await interaction.editReply({
          content: "You have already claimed the author role.",
        });
        return;
      }
      const existsByUserId = await camperChan.db.authors.findUnique({
        where: {
          userId: member.id,
        },
      });
      if (existsByUserId) {
        await interaction.editReply({
          content:
            `An author record already exists on your Discord account. If you believe this is an error, please contact Naomi.`,
        });
        return;
      }
      const existsByEmail = await camperChan.db.authors.findUnique({
        where: {
          email,
        },
      });
      if (existsByEmail) {
        await interaction.editReply({
          content:
            `An author record already exists on your email. If you believe this is an error, please contact Naomi.`,
        });
        return;
      }
      const api = new GhostAdminApi({
        key:     camperChan.config.ghostKey,
        url:     "https://freecodecamp.org/news",
        version: "v3",
      });
      const user = await api.users.
        browse({ filter: `email:'${email}'` }).
        catch(() => {
          return null;
        });

      if (!user || user.length !== 1) {
        await interaction.editReply({
          content: `There does not appear to be a news account associated with ${email}. This has been flagged internally for Naomi to investigate.`,
        });
        return;
      }
      await camperChan.db.authors.create({
        data: {
          email:  email,
          userId: member.id,
        },
      });
      await member.roles.add(authorRoleId).catch(async() => {
        await camperChan.config.debugHook.send(
          `Failed to give author role to ${interaction.user.id}. Please grant manually.`,
        );
      });
      await interaction.editReply({
        content:
          `Congrats! You now have the authors role, with access to special channels.`,
      });
    } catch (error) {
      await errorHandler(camperChan, "author command", error);
    }
  },
};
