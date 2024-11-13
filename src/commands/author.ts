import { InteractionContextType, SlashCommandBuilder } from "discord.js";
import { gql, request } from "graphql-request";
import { authorRoleId } from "../config/roles.js";
import { errorHandler } from "../utils/errorHandler.js";
import type { Command } from "../interfaces/command.js";
import type { HashnodeUser } from "../interfaces/hashnode.js";

export const author: Command = {
  data: new SlashCommandBuilder().
    setName("author").
    setDescription("Claim the author role.").
    setContexts(InteractionContextType.Guild).
    addStringOption((option) => {
      return option.
        setName("username").
        setDescription("Your Hashnode username.").
        setRequired(true);
    }),
  run: async(camperChan, interaction) => {
    try {
      await interaction.deferReply({ ephemeral: true });
      const username = interaction.options.getString("username", true);
      const { member, user } = interaction;
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
      const existsByUsername = await camperChan.db.authors.findUnique({
        where: {
          hashnodeUsername: username,
        },
      });
      if (existsByUsername) {
        await interaction.editReply({
          content:
            `An author record already exists on your Hashnode account. If you believe this is an error, please contact Naomi.`,
        });
        return;
      }

      const ourId = "65dc2b7cbb4eb0cd565b4463";
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
      const query = gql`
        query getMember {
          user(username: "Koded001") {
            publications(first: 50) {
              edges {
                node {
                  id
                }
              }
            }
          }
        }
      `;
      const data
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/consistent-type-assertions
      = await request("https://api.hashnode.com", query) as HashnodeUser;

      if (!data.user) {
        await interaction.editReply({
          content: `There does not appear to be a Hashnode account associated with ${username}.`,
        });
        return;
      }
      const publications = data.user.publications.edges;
      const isFreeCodeCamp = publications.some((pub) => {
        return pub.node.id === ourId;
      });
      if (!isFreeCodeCamp) {
        await interaction.editReply({
          content:
            `It appears that you are not a member of the freeCodeCamp publication. Please join the publication and try again.`,
        });
        return;
      }
      await camperChan.db.authors.create({
        data: {
          hashnodeUsername: username,
          userId:           member.id,
        },
      });
      await member.roles.add(authorRoleId).catch(async() => {
        await camperChan.config.debugHook.send(
          `Failed to give author role to ${user.id}. Please grant manually.`,
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
