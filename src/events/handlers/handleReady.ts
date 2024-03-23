import { ChannelType } from "discord.js";
import { scheduleJob } from "node-schedule";

import { Camperbot } from "../../interfaces/Camperbot";
import { loadRoles } from "../../modules/loadRoles";
import { send100DaysOfCode } from "../../modules/send100DaysOfCode";
import { errorHandler } from "../../utils/errorHandler";

/**
 * Logs a message to the debug hook when the bot is online.
 *
 * @param {Camperbot} Bot The bot's Discord instance.
 */
export const handleReady = async (Bot: Camperbot) => {
  try {
    await Bot.config.debugHook.send("Bot Ready!");
    const homeGuild = await Bot.guilds.fetch(Bot.config.homeGuild);
    if (!homeGuild) {
      await Bot.config.debugHook.send("The home guild could not be loaded.");
      return;
    }
    if (!Bot.homeGuild) {
      Bot.homeGuild = homeGuild;
    }
    const reportChannel = await homeGuild.channels.fetch(
      Bot.config.reportChannel
    );
    if (!reportChannel) {
      await Bot.config.debugHook.send(
        "The report channel could not be loaded."
      );
      return;
    }
    if (!reportChannel.isTextBased()) {
      await Bot.config.debugHook.send("The report channel is not text based.");
      return;
    }
    if (!Bot.reportChannel) {
      Bot.reportChannel = reportChannel;
    }
    const privateCategory = await homeGuild.channels.fetch(
      Bot.config.privateCategory
    );
    if (!privateCategory) {
      await Bot.config.debugHook.send(
        "The private category could not be loaded."
      );
      return;
    }
    if (privateCategory.type !== ChannelType.GuildCategory) {
      await Bot.config.debugHook.send(
        "The private category is not a category."
      );
      return;
    }
    if (!Bot.privateCategory) {
      Bot.privateCategory = privateCategory;
    }
    await Bot.config.debugHook.send("All channels loaded.");

    await loadRoles(Bot);

    scheduleJob("0 9 * * *", async () => {
      await send100DaysOfCode(Bot);
    });
  } catch (err) {
    await errorHandler(Bot, "client ready event", err);
  }
};
