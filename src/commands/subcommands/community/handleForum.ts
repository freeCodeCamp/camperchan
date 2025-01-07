import { EmbedBuilder } from "discord.js";
import { errorHandler } from "../../../utils/errorHandler.js";
import type { ForumData } from "../../../interfaces/forum.js";
import type { Subcommand } from "../../../interfaces/subcommand.js";

export const handleForum: Subcommand = {
  execute: async(camperChan, interaction) => {
    try {
      await interaction.deferReply();
      const data = await fetch("https://forum.freecodecamp.org/latest.json");
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- It kills me that .json() doesn't take a generic.
      const parsed = (await data.json()) as ForumData;
      const topics = parsed.topic_list.topics.slice(0, 5);
      const forumEmbed = new EmbedBuilder().
        setTitle("Latest Forum Activity").
        setDescription("Here are the five most recent posts.");
      for (const element of topics) {
        forumEmbed.addFields({
          name:  element.title,
          value: `[${element.last_poster_username} replied on ${new Date(
            element.last_posted_at,
          ).toLocaleString()}](https://forum.freecodecamp.org/t/${String(element.id)})`,
        });
      }
      await interaction.editReply({ embeds: [ forumEmbed ] });
    } catch (error) {
      await errorHandler(camperChan, "forum subcommand", error);
      await interaction.editReply("Something went wrong.");
    }
  },
  permissionValidator: () => {
    return true;
  },
};
