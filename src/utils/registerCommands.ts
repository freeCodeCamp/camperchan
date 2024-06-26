import {
  REST,
  RESTPostAPIApplicationCommandsJSONBody,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
  Routes
} from "discord.js";

import { ExtendedClient } from "../interfaces/ExtendedClient.js";

import { errorHandler } from "./errorHandler.js";
import { logHandler } from "./logHandler.js";

/**
 * Takes both the commands and contexts, parses the `data` properties as needed,
 * and builds an array of all command data. Then, posts the data to the Discord endpoint
 * for registering commands.
 *
 * @param {ExtendedClient} CamperChan CamperChan's Discord instance.
 * @param {REST} restClass The REST class to use for registering commands.
 * @returns {boolean} True if the commands were registered, false on error.
 */
export const registerCommands = async (
  CamperChan: ExtendedClient,
  restClass = REST
): Promise<REST | null> => {
  try {
    const rest = new restClass({ version: "10" }).setToken(
      CamperChan.config.token
    );

    const commandData: (
      | RESTPostAPIApplicationCommandsJSONBody
      | RESTPostAPIChatInputApplicationCommandsJSONBody
    )[] = [];

    CamperChan.commands.forEach((command) =>
      commandData.push(command.data.toJSON())
    );
    CamperChan.contexts.forEach((context) => commandData.push(context.data));
    logHandler.log("debug", "registering to home guild only");
    await rest.put(
      Routes.applicationGuildCommands(
        CamperChan.config.botId,
        CamperChan.config.homeGuild
      ),
      { body: commandData }
    );
    return rest;
  } catch (err) {
    await errorHandler(CamperChan, "register commands module", err);
    return null;
  }
};
