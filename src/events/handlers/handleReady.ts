import { ChannelType } from "discord.js";
import { scheduleJob } from "node-schedule";

import { ExtendedClient } from "../../interfaces/ExtendedClient";
import { loadRoles } from "../../modules/loadRoles";
import { send100DaysOfCode } from "../../modules/send100DaysOfCode";
import { errorHandler } from "../../utils/errorHandler";

/**
 * Logs a message to the debug hook when the CamperChan is online.
 *
 * @param {ExtendedClient} CamperChan The CamperChan's Discord instance.
 */
export const handleReady = async (CamperChan: ExtendedClient) => {
  try {
    await CamperChan.config.debugHook.send("CamperChan Ready!");
    const homeGuild = await CamperChan.guilds
      .fetch(CamperChan.config.homeGuild)
      .catch(() => null);
    if (!homeGuild) {
      await CamperChan.config.debugHook.send(
        "The home guild could not be loaded."
      );
      return;
    }
    if (!CamperChan.homeGuild) {
      CamperChan.homeGuild = homeGuild;
    }
    const reportChannel = await homeGuild.channels
      .fetch(CamperChan.config.reportChannel)
      .catch(() => null);
    if (!reportChannel) {
      await CamperChan.config.debugHook.send(
        "The report channel could not be loaded."
      );
      return;
    }
    if (!reportChannel.isTextBased()) {
      await CamperChan.config.debugHook.send(
        "The report channel is not text based."
      );
      return;
    }
    if (!CamperChan.reportChannel) {
      CamperChan.reportChannel = reportChannel;
    }
    const privateCategory = await homeGuild.channels
      .fetch(CamperChan.config.privateCategory)
      .catch(() => null);
    if (!privateCategory) {
      await CamperChan.config.debugHook.send(
        "The private category could not be loaded."
      );
      return;
    }
    if (privateCategory.type !== ChannelType.GuildCategory) {
      await CamperChan.config.debugHook.send(
        "The private category is not a category."
      );
      return;
    }
    if (!CamperChan.privateCategory) {
      CamperChan.privateCategory = privateCategory;
    }
    await CamperChan.config.debugHook.send("All channels loaded.");

    await loadRoles(CamperChan);

    scheduleJob("0 9 * * *", async () => {
      await send100DaysOfCode(CamperChan);
    });
  } catch (err) {
    await errorHandler(CamperChan, "client ready event", err);
  }
};
