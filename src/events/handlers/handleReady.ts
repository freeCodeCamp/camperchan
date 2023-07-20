import { ChannelType } from "discord.js";
import { Camperbot } from "../../interfaces/Camperbot";
import { errorHandler } from "../../utils/errorHandler";

/**
 * Logs a message to the debug hook when the bot is online.
 *
 * @param {Camperbot} Bot The bot's Discord instance.
 */
export const handleReady = async (Bot: Camperbot) => {
  try {
    await Bot.config.debug_hook.send("Bot Ready!");
    const homeGuild = await Bot.guilds.fetch(Bot.config.home_guild);
    if (!homeGuild) {
      await Bot.config.debug_hook.send("The home guild could not be loaded.");
      return;
    }
    Bot.homeGuild = homeGuild;
    const reportChannel = await homeGuild.channels.fetch(
      Bot.config.report_channel
    );
    if (!reportChannel) {
      await Bot.config.debug_hook.send(
        "The report channel could not be loaded."
      );
      return;
    }
    if (!reportChannel.isTextBased()) {
      await Bot.config.debug_hook.send("The report channel is not text based.");
      return;
    }
    Bot.reportChannel = reportChannel;
    const privateCategory = await homeGuild.channels.fetch(
      Bot.config.private_category
    );
    if (!privateCategory) {
      await Bot.config.debug_hook.send(
        "The private category could not be loaded."
      );
      return;
    }
    if (privateCategory.type !== ChannelType.GuildCategory) {
      await Bot.config.debug_hook.send(
        "The private category is not a category."
      );
      return;
    }
    Bot.privateCategory = privateCategory;
    await Bot.config.debug_hook.send("All channels loaded.");
  } catch (err) {
    await errorHandler(Bot, err);
  }
};
