import { Camperbot } from "../interfaces/Camperbot";
import { ModerationActions } from "../interfaces/ModerationActions";
import { errorHandler } from "../utils/errorHandler";

/**
 * Saves a count of the user's moderation actions.
 *
 * @param {Camperbot} Bot Bot's Discord instance.
 * @param {ModerationActions} action The action taken against the user.
 * @param {string} userId The ID of the user being moderated.
 */
export const updateHistory = async (
  Bot: Camperbot,
  action: ModerationActions,
  userId: string
) => {
  try {
    await Bot.db.histories.upsert({
      where: {
        userId
      },
      update: {
        [`${action}s`]: {
          increment: 1
        }
      },
      create: {
        userId,
        bans: 0,
        kicks: 0,
        mutes: 0,
        unmutes: 0,
        warns: 0,
        unbans: 0,
        [`${action}s`]: 1
      }
    });
  } catch (err) {
    await errorHandler(Bot, err);
  }
};
