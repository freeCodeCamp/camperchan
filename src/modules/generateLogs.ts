import { readFile, unlink } from "node:fs/promises";
import { join } from "node:path";
import { AttachmentBuilder } from "discord.js";
import { errorHandler } from "../utils/errorHandler.js";
import type { ExtendedClient } from "../interfaces/extendedClient.js";

/**
 * To run when a private channel is closed. Finds the channel log file,
 * creates a message attachement with the logs, and deletes the file.
 * @param camperChan - The camperChan's Discord instance.
 * @param channelId - The channel ID of the private channel.
 * @returns The log file as a Discord attachment.
 */
export const generateLogs = async(
  camperChan: ExtendedClient,
  channelId: string,
): Promise<AttachmentBuilder> => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete -- Dynamic delete is required here.
    delete camperChan.privateLogs[channelId];

    const logs = await readFile(
      join(process.cwd(), "logs", `${channelId}.txt`),
      "utf8",
    ).catch(() => {
      return "no logs found...";
    });

    const attachment = new AttachmentBuilder(Buffer.from(logs, "utf-8"), {
      name: "log.txt",
    });

    await unlink(join(process.cwd(), "logs", `${channelId}.txt`));

    return attachment;
  } catch (error) {
    await errorHandler(camperChan, "generate logs module", error);
    return new AttachmentBuilder(
      Buffer.from("An error occurred fetching these logs.", "utf-8"),
      { name: "log.txt" },
    );
  }
};
