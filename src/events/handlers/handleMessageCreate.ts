import { readFile, writeFile } from "fs/promises";
import { join } from "path";

import { ChannelType, Message } from "discord.js";

import { Camperbot } from "../../interfaces/Camperbot";
import { levelListener } from "../../modules/levelListener";

/**
 * Handles the message create events.
 *
 * @param {Camperbot} Bot The bot's Discord instance.
 * @param {Message} message The message payload from Discord.
 */
export const handleMessageCreate = async (Bot: Camperbot, message: Message) => {
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
