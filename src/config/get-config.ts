import { getBotOnlineAt } from '../utilities/bot-online-time';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export interface Config {
  /**
   * The discord token.
   * This is required otherwise the validate-config function will fail.
   */
  TOKEN: string;
  /*
   * The connection URI for the MongoDB database.
   * TODO: Make this required in the validate-config!
   */
  MONGO_URI: string;
  /**
   * The bots prefix which should be placed in-front of
   * every command. Defaults to '!FCC' if nothing was given
   *  **note** this is not used yet, all command still follow the :
   * `!myCommand` format.
   */
  PREFIX: string;
  /**
   * The name of the manual role to be assigned to the bot - this
   * is different from the automatic role Discord creates.
   */
  BOT_ROLE: string;
  /**
   * If the bot should log all message to the console.
   * By default this feature is OFF to suppress the amount of
   * logs being printed.
   */
  VERBOSE: boolean;
  /**
   * If the bot should send the FCC code of conduct via a DM
   * to any new user who joins the server.
   * By default this feature is OFF
   */
  WELCOME_DM: boolean;
  /**
   * The name of channel to post "leave" messages to.
   * If not given, or if the channel is not found
   * the message will not be provided.
   */
  LEAVE_MSG_CHANNEL: string;
  /**
   * The name of the channel to log deleted messages to.
   * If not given, or if the channel is not found
   * the log will not be generated.
   */
  LOG_MSG_CHANNEL: string;
  /**
   * The name of the role to suspend a user with.
   * If not given, or if the role is not found
   * the command will not function
   */
  SUSPEND_ROLE: string;
  /**
   * The name of the category to create new
   * suspended user channels in.
   * If not given, channel will not be created.
   */
  SUSPEND_CATEGORY: string;
  /**
   * Get the bot Start Time/ Online Time in a
   * [HH:MM:SS PM/AM TZ] format
   */
  ONLINE_AT: string;
  /**
   * The name of the moderator role. Ensure all moderators
   * have this role to be able to access the suspended channels.
   */
  MOD_ROLE: string;
  /**
   * Limits the number of issue/PR auto linking feature to agiven number
   */
  AUTO_LINK_LIMIT: number;
  /**
   * Limits the auto linking feature of issue/PRs to the specified channel. If it
   * is set to `false`, then the feature will be available in all channels
   */
  AUTO_LINK_CHANNEL: string | false;
  /**
   * The role to assign to users who wish to be notified of new live streams.
   */
  STREAM_NOTIFY_ROLE: string;
  /**
   * The message ID for the livestream role assignment - users react to this
   * message to be assigned the role. This ID is obtained by right clicking
   * on the message you want to use for reactions and selecting "Copy ID".
   */
  STREAM_MSG_ID: string;
  /**
   * Option to enable/disable the thanks feature.
   */
  THANK_OPTION: boolean;
}
/**
 * @name getConfig
 * Utility function that returns the configuration for the application.
 *
 * @returns the config object with defaults applied.
 */
export function getConfig(): Config {
  return {
    TOKEN: process.env.TOKEN || '',
    MONGO_URI: process.env.MONGO_URI || '',
    PREFIX: process.env.PREFIX || '!FCC',
    VERBOSE: process.env.VERBOSE === 'true',
    BOT_ROLE: process.env.BOT_ROLE || '',
    WELCOME_DM: process.env.WELCOME_DM === 'true',
    LEAVE_MSG_CHANNEL: process.env.LEAVE_MSG_CHANNEL || '',
    LOG_MSG_CHANNEL: process.env.LOG_MSG_CHANNEL || 'moderation-activity',
    SUSPEND_ROLE: process.env.SUSPEND_ROLE || '',
    SUSPEND_CATEGORY: process.env.SUSPEND_CATEGORY || '',
    ONLINE_AT: getBotOnlineAt() || '',
    MOD_ROLE: process.env.MOD_ROLE || '',
    AUTO_LINK_LIMIT: Number(process.env.AUTO_LINK_LIMIT) || 5,
    AUTO_LINK_CHANNEL: process.env.AUTO_LINK_CHANNEL || false,
    STREAM_NOTIFY_ROLE: process.env.STREAM_NOTIFY_ROLE || '',
    STREAM_MSG_ID: process.env.STREAM_MSG_ID || '',
    THANK_OPTION: !!process.env.THANK_OPTION || false
  };
}
