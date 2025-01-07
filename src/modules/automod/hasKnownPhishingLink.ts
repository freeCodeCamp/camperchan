/**
 * @copyright nhcarrigan
 * @license Naomi's Public License
 * @author Naomi Carrigan
 */

import { errorHandler } from "../../utils/errorHandler.js";
import type { ExtendedClient } from "../../interfaces/extendedClient.js";

/**
 * Module to check if links in messages are phishing sites.
 * Uses, in order:
 *
 * - An API developed by Walshy.
 * - The SinkingYachts API.
 * @param bot - The bot's Discord instance.
 * @param content - The message content payload from Discord.
 * @returns Whether a phishing link was found.
 */
export const hasKnownPhishingLink = async(
  bot: ExtendedClient,
  content: string,
): Promise<boolean> => {
  try {
    const linkRegex
      = /https?:\/\/(?<domain>(?:(?:[\da-z-]+\.)+[a-z]{2,}))(?::\d{1,5})?\S*/gi;

    const linksInMessage = content.matchAll(linkRegex);

    const linkResults = await Promise.all(
      [ ...linksInMessage ].map(async(link) => {
        const rawDomain = link.groups?.domain;
        if (rawDomain === undefined) {
          return false;
        }
        const domain = encodeURI(rawDomain);
        const walshyRequest

      = await fetch("https://bad-domains.walshy.dev/check", {
        body:    JSON.stringify({ domain }),
        headers: {
          // eslint-disable-next-line @typescript-eslint/naming-convention -- Header name requires dash.
          "X-Identity": "Rythm Moderation - built by naomi_lgbt",
          "accept":     "application/json",
        },
        method: "POST",
      });
        const walshyResponse
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- .json() doesn't accept a generic.
      = (await walshyRequest.json()) as { badDomain: boolean };
        if (walshyResponse.badDomain) {
          return true;
        }

        const yachtsRequest = await fetch(
          `https://phish.sinking.yachts/v2/check/${domain}`,
          {
            headers: {
              // eslint-disable-next-line @typescript-eslint/naming-convention -- Header name requires dash.
              "X-Identity": "Rythm Moderation - built by naomi_lgbt",
              "accept":     "application/json",
            },
          },
        );
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- .json() doesn't accept a generic.
        const yachtsResult = (await yachtsRequest.json()) as boolean;
        if (yachtsResult) {
          return true;
        }
        return false;
      }),
    );
    return linkResults.includes(true);
  } catch (error) {
    await errorHandler(bot, "phishing listener", error);
    return false;
  }
};
