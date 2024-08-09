/**
 * @copyright nhcarrigan
 * @license Naomi's Public License
 * @author Naomi Carrigan
 */

import { errorHandler } from "../../utils/errorHandler.js";
import type { ExtendedClient } from "../../interfaces/extendedClient.js";

const approvedInviteIds = new Set([ "692816967895220344" ]);

/**
 * Module to detect discord invites in messages. Configured for an
 * allow-list of permitted invites.
 * @param bot - The bot's Discord instance.
 * @param content - The message content payload from Discord.
 * @returns Whether or not the message contains an unauthorised invite.
 */
export const hasNonApprovedInvite = async(
  bot: ExtendedClient,
  content: string,
): Promise<boolean> => {
  try {
    const inviteRegex
      // eslint-disable-next-line stylistic/max-len
      = /(?:https?:\/\/)?discord(?:(?:app)?\.com\/invite|\.gg)\/?(?<slug>[\dA-Za-z]+)(?:\?event=\d*)?\/?/g;

    const invitesInMessage = content.
      replaceAll(/\s/g, "").
      matchAll(inviteRegex);

    for (const invite of invitesInMessage) {
      const slug = invite.groups?.slug;
      if (slug === undefined) {
        continue;
      }
      // eslint-disable-next-line no-await-in-loop
      const request = await fetch(
        `https://discord.com/api/v10/invites/${slug}`,
        {
          headers: {
            accept: "application/json",
          },
          method: "GET",
        },
      ).catch(() => {
        return null;
      });
      const { guild_id: guildId }
        // eslint-disable-next-line no-await-in-loop, @typescript-eslint/consistent-type-assertions, @typescript-eslint/naming-convention
        = (await request?.json()) as { guild_id: string | undefined };
      if (guildId === undefined) {
        continue;
      }
      const isApproved = approvedInviteIds.has(guildId);
      if (!isApproved) {
        return true;
      }
    }

    return false;
  } catch (error) {
    await errorHandler(bot, "invite listener", error);
    return false;
  }
};
