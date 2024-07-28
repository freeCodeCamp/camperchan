import { errorHandler } from "../utils/errorHandler.js";
import type { ExtendedClient } from "../interfaces/extendedClient.js";
import type { ModerationActions } from "../interfaces/moderationActions.js";

/**
 * Saves a count of the user's moderation actions.
 * @param camperChan - CamperChan's Discord instance.
 * @param action - The action taken against the user.
 * @param userId - The ID of the user being moderated.
 */
export const updateHistory = async(
  camperChan: ExtendedClient,
  action: ModerationActions,
  userId: string,
): Promise<void> => {
  try {
    await camperChan.db.histories.upsert({
      create: {
        bans:           0,
        kicks:          0,
        mutes:          0,
        unbans:         0,
        unmutes:        0,
        userId:         userId,
        warns:          0,
        [`${action}s`]: 1,
      },
      update: {
        [`${action}s`]: {
          increment: 1,
        },
      },
      where: {
        userId,
      },
    });
  } catch (error) {
    await errorHandler(camperChan, "update history module", error);
  }
};
