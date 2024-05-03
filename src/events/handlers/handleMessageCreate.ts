import { readFile, writeFile } from "fs/promises";
import { join } from "path";

import {
  AttachmentBuilder,
  ChannelType,
  Message,
  PermissionFlagsBits
} from "discord.js";

import { ExtendedClient } from "../../interfaces/ExtendedClient";
import { levelListener } from "../../modules/levelListener";
import { loadRoles } from "../../modules/loadRoles";
import { messageCounter } from "../../modules/messageCounter";

/**
 * Handles the message create events.
 *
 * @param {ExtendedClient} CamperChan The CamperChan's Discord instance.
 * @param {Message} message The message payload from Discord.
 */
export const handleMessageCreate = async (
  CamperChan: ExtendedClient,
  message: Message
) => {
  if (message.author.id === "465650873650118659") {
    if (message.content.startsWith("~cachebust")) {
      const [, id] = message.content.split(/\s+/g);
      if (id) {
        delete CamperChan.learnAccounts[id];
      }
      await message.reply(`Cache cleared for ${id}`);
    }
    if (message.content === "~roles") {
      await message.reply("Loading language roles.");
      await loadRoles(CamperChan);
      await message.reply("Done~!");
    }
    if (message.content === "~contributors" && message.guild) {
      await message.reply("Fetching records.");
      const allRecords = await CamperChan.db.messages.findMany({});
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

  if (
    // Safe to make optional here, as member should only be null for a DM.
    !message.member?.permissions.has(PermissionFlagsBits.ManageMessages) &&
    message.attachments.size &&
    message.attachments.some(
      (file) =>
        // If the file doesn't have a type, lets ignore it
        // we don't want false positives
        file.contentType &&
        !file.contentType.startsWith("image/") &&
        !file.contentType.startsWith("video/")
    )
  ) {
    await message.delete();
    await message.channel.send({
      content: `Hey <@!${message.author.id}>, it looks like you tried uploading something that wasn't an image or video. Please do not upload other files, to ensure the safety of our users.`
    });
    return;
  }

  await messageCounter(CamperChan, message);
  await levelListener(CamperChan, message);

  if (
    message.channel.type !== ChannelType.GuildText ||
    !message.channel.name.startsWith("private-")
  ) {
    return;
  }
  const logId = CamperChan.privateLogs[message.channel.id];
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
