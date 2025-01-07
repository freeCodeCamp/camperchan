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
      // eslint-disable-next-line stylistic/max-len -- This regex is too long to be split.
      = /(?:https?:\/\/)?discord(?:(?:app)?\.com\/invite|\.gg)\/?(?<slug>[\dA-Za-z]+)(?:\?event=\d*)?\/?/g;

    const invitesInMessage = content.
      replaceAll(/\s/g, "").
      matchAll(inviteRegex);

    const invites = await Promise.all(
      [ ...invitesInMessage ].map(async(invite) => {
        const slug = invite.groups?.slug;
        if (slug === undefined) {
          return false;
        }
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
          // eslint-disable-next-line @typescript-eslint/consistent-type-assertions, @typescript-eslint/naming-convention -- .json() doesn't accept a generic.
          = (await request?.json()) as { guild_id: string | undefined };
        if (guildId === undefined) {
          return false;
        }
        const isApproved = approvedInviteIds.has(guildId);
        if (!isApproved) {
          return true;
        }
        return false;
      }),
    );
    return invites.some(Boolean);
  } catch (error) {
    await errorHandler(bot, "invite listener", error);
    return false;
  }
};
