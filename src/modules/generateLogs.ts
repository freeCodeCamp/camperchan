import { readFile, unlink } from "fs/promises";
import { join } from "path";

import { AttachmentBuilder } from "discord.js";

import { ExtendedClient } from "../interfaces/ExtendedClient";
import { errorHandler } from "../utils/errorHandler";

/**
 * To run when a private channel is closed. Finds the channel log file,
 * creates a message attachement with the logs, and deletes the file.
 *
 * @param {ExtendedClient} CamperChan The CamperChan's Discord instance.
 * @param {string} channelId The channel ID of the private channel.
 * @returns {Promise<AttachmentBuilder>} The log file as a Discord attachment.
 */
export const generateLogs = async (
  CamperChan: ExtendedClient,
  channelId: string
): Promise<AttachmentBuilder> => {
  try {
    delete CamperChan.privateLogs[channelId];

    const logs = await readFile(
      join(process.cwd(), "logs", `${channelId}.txt`),
      "utf8"
    ).catch(() => "no logs found...");

    const attachment = new AttachmentBuilder(Buffer.from(logs, "utf-8"), {
      name: "log.txt"
    });

    await unlink(join(process.cwd(), "logs", `${channelId}.txt`));

    return attachment;
  } catch (err) {
    await errorHandler(CamperChan, "generate logs module", err);
    return new AttachmentBuilder(
      Buffer.from("An error occurred fetching these logs.", "utf-8"),
      { name: "log.txt" }
    );
  }
};
