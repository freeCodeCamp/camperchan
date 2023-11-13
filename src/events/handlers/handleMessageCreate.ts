import { readFile, writeFile } from "fs/promises";
import { join } from "path";

import { AttachmentBuilder, ChannelType, Message } from "discord.js";

import { Camperbot } from "../../interfaces/Camperbot";
import { levelListener } from "../../modules/levelListener";

/**
 * Handles the message create events.
 *
 * @param {Camperbot} Bot The bot's Discord instance.
 * @param {Message} message The message payload from Discord.
 */
export const handleMessageCreate = async (Bot: Camperbot, message: Message) => {
  if (
    message.author.id === "465650873650118659" &&
    message.content === "~contributors" &&
    message.guild
  ) {
    await message.reply("Fetching records.");
    const allRecords = await Bot.db.levels.findMany({});
    const above1000 = allRecords
      .filter((r) => r.points >= 1000)
      .sort((a, b) => b.points - a.points)
      .map((r) => `${r.userTag},${r.points}`);
    await message.reply(`Found ${above1000.length} qualifying records.`);
    const fileContents = `usertag,points\n${above1000.join("\n")}`;
    const file = new AttachmentBuilder(fileContents, {
      name: "contributors.csv",
    });
    await message.reply({
      files: [file],
    });
  }
  await levelListener(Bot, message);

  if (
    message.channel.type !== ChannelType.GuildText ||
    !message.channel.name.startsWith("private-")
  ) {
    return;
  }
  const logId = Bot.private_logs[message.channel.id];
  if (!logId) {
    return;
  }
  const logFile = await readFile(
    join(process.cwd(), "logs", `${logId}.txt`),
    "utf8"
  );

  const parsedString = `[${new Date(
    message.createdTimestamp
  ).toLocaleString()}] - ${message.author.tag}: ${message.content}\n`;

  await writeFile(
    join(process.cwd(), "logs", `${logId}.txt`),
    logFile + parsedString
  );
};
