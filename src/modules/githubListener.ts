/* eslint-disable @typescript-eslint/naming-convention -- A lot of GitHub params are snake case.*/
import { errorHandler } from "../utils/errorHandler.js";
import type { ExtendedClient } from "../interfaces/extendedClient.js";
import type { Message } from "discord.js";

const getIssueEmoji = (
  state: string,
  reason?: "completed" | "reopened" | "not_planned" | null,
): string => {
  if (state === "open") {
    return "<:open:1360054242865315981>";
  }
  if (reason === "not_planned") {
    return "<:notcomplete:1360054235437465752>";
  }
  return "<:complete:1360054206081269800>";
};

const getPrEmoji = (
  state: "open" | "closed",
  merged: boolean,
  draft?: boolean,
): string => {
  if (draft === true) {
    return "<:draft:1360054219532537938>";
  }
  if (merged) {
    return "<:merged:1360054227975667720>";
  }
  if (state === "closed") {
    return "<:closedpr:1360054194148610048>";
  }
  return "<:openpr:1360054250482172056>";
};

/**
 * Processes auto-embeds for github issues.
 * @param camperChan - The camperChan's Discord instance.
 * @param message - The message payload from Discord.
 */
export const githubListener = async(
  camperChan: ExtendedClient,
  message: Message,
): Promise<void> => {
  try {
    const { author, content } = message;

    if (author.bot) {
      return;
    }

    const numberRegex = /#(?<number>\d+)/g;

    const matches = [ ...content.matchAll(numberRegex) ];

    if (matches.length <= 0) {
      return;
    }

    const issueNumbers = matches.
      map((match) => {
        return match.groups?.number;
      }).
      filter((m) => {
        return m !== undefined;
      });

    await Promise.all(
      issueNumbers.map(async(issueNumber) => {
        const issue = await camperChan.octokit.rest.issues.get({
          issue_number: Number(issueNumber),
          owner:        "freeCodeCamp",
          repo:         "freeCodeCamp",
        }).catch(() => {
          return null;
        });
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- WTF?
        if (issue === null || issue.status !== 200) {
          return;
        }
        const {
          title,
          state,
          pull_request,
          html_url,
          user,
          created_at,
          state_reason,
        } = issue.data;
        const createdSecondsTimestamp = Math.floor(
          new Date(created_at).getTime() / 1000,
        ).toString();

        if (!pull_request) {
          await message.reply({
            allowedMentions: {
              repliedUser: false,
            },
            content: `${getIssueEmoji(state, state_reason)} [**Issue #${issueNumber}**](<${html_url}>): ${title}
-# by ${
  user
    ? `[${user.login}](<${user.html_url}>)`
    : ""
} on <t:${createdSecondsTimestamp}:D> (<t:${createdSecondsTimestamp}:R>)`,
          });
          return;
        }
        const pr = await camperChan.octokit.rest.pulls.get({
          owner:       "freeCodeCamp",
          pull_number: Number(issueNumber),
          repo:        "freeCodeCamp",
        }).catch(() => {
          return null;
        });
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- WTF?
        if (pr === null || pr.status !== 200) {
          return;
        }
        const {
          state: prState,
          merged,
          html_url: pullRequestUrl,
          head,
          draft,
        } = pr.data;
        await message.reply({
          allowedMentions: {
            repliedUser: false,
          },
          content: `${getPrEmoji(prState, merged, draft)} [**Pull #${issueNumber}**](<${pullRequestUrl}>): ${title}
-# by ${
  user
    ? `[${user.login}](<${user.html_url}>)`
    : ""
} from [${head.label}](<${head.repo.html_url}>) on <t:${createdSecondsTimestamp}:D> (<t:${createdSecondsTimestamp}:R>)`,
        });
      }),
    );
  } catch (error) {
    await errorHandler(camperChan, "github listener module", error);
  }
};
