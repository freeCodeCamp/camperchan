import { connect } from "mongoose";

import { Camperbot } from "../interfaces/Camperbot";
import { errorHandler } from "../utils/errorHandler";

/**
 * Handles connecting to the database.
 *
 * @param {Camperbot} Bot The bot's Discord instance.
 */
export const connectDatabase = async (Bot: Camperbot) => {
  try {
    await connect(Bot.config.mongo_uri);
    await Bot.config.debug_hook.send("Database Connected");
  } catch (err) {
    await errorHandler(Bot, err);
  }
};
