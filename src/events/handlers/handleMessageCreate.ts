import { readFile, writeFile } from "fs/promises";
import { join } from "path";

import { AttachmentBuilder, ChannelType, Message } from "discord.js";

import { Camperbot } from "../../interfaces/Camperbot";
import { levelListener } from "../../modules/levelListener";
import { loadRoles } from "../../modules/loadRoles";
import { messageCounter } from "../../modules/messageCounter";

/**
 * Handles the message create events.
 *
 * @param {Camperbot} Bot The bot's Discord instance.
 * @param {Message} message The message payload from Discord.
 */
export const handleMessageCreate = async (Bot: Camperbot, message: Message) => {
  if (message.author.id === "465650873650118659") {
    if (message.content === "~roles") {
      await message.reply("Loading language roles.");
      await loadRoles(Bot);
      await message.reply("Done~!");
    }
    if (message.content === "~contributors" && message.guild) {
      await message.reply("Fetching records.");
      const allRecords = await Bot.db.messages.findMany({});
      const above1000 = allRecords
        .filter((r) => r.messages >= 1000)
        .sort((a, b) => b.messages - a.messages)
        .map((r) => `${r.userTag},${r.messages}`);
      await message.reply(`Found ${above1000.length} qualifying records.`);
      const fileContents = `username,messages\n${above1000.join("\n")}`;
      const file = new AttachmentBuilder(Buffer.from(fileContents, "utf-8"), {
        name: "contributors.csv"
      });
      await message.reply({
        files: [file]
      });
    }
  }
  await messageCounter(Bot, message);
  await levelListener(Bot, message);

  if (
    message.channel.type !== ChannelType.GuildText ||
    !message.channel.name.startsWith("private-")
  ) {
    return;
  }
  const logId = Bot.privateLogs[message.channel.id];
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
