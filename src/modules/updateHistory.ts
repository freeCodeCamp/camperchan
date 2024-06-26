import { ExtendedClient } from "../interfaces/ExtendedClient.js";
import { ModerationActions } from "../interfaces/ModerationActions.js";
import { errorHandler } from "../utils/errorHandler.js";

/**
 * Saves a count of the user's moderation actions.
 *
 * @param {ExtendedClient} CamperChan CamperChan's Discord instance.
 * @param {ModerationActions} action The action taken against the user.
 * @param {string} userId The ID of the user being moderated.
 */
export const updateHistory = async (
  CamperChan: ExtendedClient,
  action: ModerationActions,
  userId: string
) => {
  try {
    await CamperChan.db.histories.upsert({
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
    await errorHandler(CamperChan, "update history module", err);
  }
};
