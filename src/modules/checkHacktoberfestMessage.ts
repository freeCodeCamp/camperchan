import { errorHandler } from "../utils/errorHandler.js";
import type { ExtendedClient } from "../interfaces/extendedClient.js";
import type { Message } from "discord.js";

const discordMarkdown = "(?:[\\-\\_\\~*]*)";
const boundaryStart = "(?:^|[ \t\n<(])?";
const boundaryEnd = "\\/?(?:$|[ \t\n>),.])";
const protocol = "(?:https?:\\/\\/)?";
const www = "(?:www\\.)?";
// Credit: https://github.com/shinnn/github-username-regex
const githubUsername
  = "(?!orgs)[a-z\\d](?:[a-z\\d]|-(?=[a-z\\d])){0,38}";
const gitlabUsername = "[a-z\\d](?:[a-z\\d]|-(?=[a-z\\d])){1,254}";
const repo = "[a-z\\d\\-\\._]{1,}";
const githubPath = `${githubUsername}\\/${repo}`;
const gitlabPath = `${gitlabUsername}\\/${repo}`;

const projectRegexString = `${boundaryStart}${discordMarkdown}${protocol}${www}(?:github\\.com/${githubPath}|gitlab\\.com/${gitlabPath})${discordMarkdown}${boundaryEnd}`;

/**
 * Validates that a message has exactly one link, and that the
 * link points to a Github or Gitlab repository.
 * @param bot -- The bot's Discord instance.
 * @param message -- The message payload from Discord.
 */
export const checkHacktoberfestMessage = async(
  bot: ExtendedClient,
  message: Message<true>,
): Promise<void> => {
  try {
    // Instantiate it on every message to avoid global state issues.
    const projectRegex = new RegExp(projectRegexString, "mgi");

    const matches = message.content.match(projectRegex);
    const links = message.content.match(/https?:\/\/\S+/g) ?? [];

    if (!matches) {
      await message.delete();
      await bot.config.modHook.send(`<@465650873650118659>, ${message.author.displayName} has sent a message that does not contain a valid Hacktoberfest project link. The message has been deleted.`);
      return;
    }

    if (matches.length > 1) {
      await message.delete();
      await bot.config.modHook.send(`<@465650873650118659>, ${message.author.displayName} has sent a message that contains more than one Hacktoberfest project link. The message has been deleted.`);
      return;
    }

    if (links.length > 1) {
      await message.delete();
      await bot.config.modHook.send(`<@465650873650118659>, ${message.author.displayName} has sent a message that contains a link that does not point to a project. The message has been deleted.`);
    }
  } catch (error) {
    await errorHandler(bot, "check hacktoberfest message", error);
  }
};
