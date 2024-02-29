import {
  REST,
  RESTPostAPIApplicationCommandsJSONBody,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
  Routes
} from "discord.js";

import { Camperbot } from "../interfaces/Camperbot";

import { errorHandler } from "./errorHandler";
import { logHandler } from "./logHandler";

/**
 * Takes both the commands and contexts, parses the `data` properties as needed,
 * and builds an array of all command data. Then, posts the data to the Discord endpoint
 * for registering commands.
 *
 * @param {Camperbot} Bot Bot's Discord instance.
 * @param {REST} restClass The REST class to use for registering commands.
 * @returns {boolean} True if the commands were registered, false on error.
 */
export const registerCommands = async (
  Bot: Camperbot,
  restClass = REST
): Promise<REST | null> => {
  try {
    const rest = new restClass({ version: "10" }).setToken(Bot.config.token);

    const commandData: (
      | RESTPostAPIApplicationCommandsJSONBody
      | RESTPostAPIChatInputApplicationCommandsJSONBody
    )[] = [];

    Bot.commands.forEach((command) => commandData.push(command.data.toJSON()));
    Bot.contexts.forEach((context) => commandData.push(context.data));
    logHandler.log("debug", "registering to home guild only");
    await rest.put(
      Routes.applicationGuildCommands(Bot.config.botId, Bot.config.homeGuild),
      { body: commandData }
    );
    return rest;
  } catch (err) {
    await errorHandler(Bot, err);
    return null;
  }
};
