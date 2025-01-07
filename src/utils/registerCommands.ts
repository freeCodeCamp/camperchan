import {
  REST,
  type RESTOptions,
  type RESTPostAPIApplicationCommandsJSONBody,
  type RESTPostAPIChatInputApplicationCommandsJSONBody,
  Routes,
} from "discord.js";
import { errorHandler } from "./errorHandler.js";
import { logHandler } from "./logHandler.js";
import type { ExtendedClient } from "../interfaces/extendedClient.js";

/**
 * Takes both the commands and contexts, parses the `data` properties as needed,
 * and builds an array of all command data. Then, posts the data to the Discord endpoint
 * for registering commands.
 * @param camperChan - CamperChan's Discord instance.
 * @param restClass - The REST class to use for registering commands.
 * @returns True if the commands were registered, false on error.
 */
export const registerCommands = async(
  camperChan: ExtendedClient,
  restClass: new (options: Partial<RESTOptions>)=> REST = REST,
): Promise<REST | null> => {
  try {
    // eslint-disable-next-line new-cap -- This is a class constructor.
    const rest = new restClass({ version: "10" }).setToken(
      camperChan.config.token,
    );

    const commandData: Array< | RESTPostAPIApplicationCommandsJSONBody
      | RESTPostAPIChatInputApplicationCommandsJSONBody> = [];

    for (const command of camperChan.commands) {
      commandData.push(command.data.toJSON());
    }
    for (const context of camperChan.contexts) {
      commandData.push(context.data);
    }
    logHandler.log("debug", "registering to home guild only");
    await rest.put(
      Routes.applicationGuildCommands(
        camperChan.config.botId,
        camperChan.config.homeGuild,
      ),
      { body: commandData },
    );
    return rest;
  } catch (error) {
    await errorHandler(camperChan, "register commands module", error);
    return null;
  }
};
