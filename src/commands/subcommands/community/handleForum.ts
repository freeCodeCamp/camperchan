import { EmbedBuilder } from "discord.js";

import { ForumData } from "../../../interfaces/Forum";
import { Subcommand } from "../../../interfaces/Subcommand";
import { errorHandler } from "../../../utils/errorHandler";

export const handleForum: Subcommand = {
  permissionValidator: () => true,
  execute: async (Bot, interaction) => {
    try {
      await interaction.deferReply();
      const data = await fetch("https://forum.freecodecamp.org/latest.json");
      const parsed = (await data.json()) as ForumData;
      const topics = parsed.topic_list.topics.slice(0, 5);
      const forumEmbed = new EmbedBuilder()
        .setTitle("Latest Forum Activity")
        .setDescription("Here are the five most recent posts.");
      topics.forEach((el) =>
        forumEmbed.addFields({
          name: `${el.title}`,
          value: `[${el.last_poster_username} replied on ${new Date(
            el.last_posted_at
          ).toLocaleString()}](https://forum.freecodecamp.org/t/${el.id})`,
        })
      );
      await interaction.editReply({ embeds: [forumEmbed] });
    } catch (err) {
      await errorHandler(Bot, err);
      await interaction.editReply("Something went wrong.");
    }
  },
};
