/**
 * @copyright nhcarrigan
 * @license Naomi's Public License
 * @author Naomi Carrigan
 */

import { createHmac, timingSafeEqual } from "node:crypto";
import { readFile } from "node:fs/promises";
import { WebhookClient } from "discord.js";
import fastify from "fastify";
import { errorHandler } from "../utils/errorHandler.js";
import type { ExtendedClient } from "../interfaces/extendedClient.js";

const contributorHook = new WebhookClient({
  url: process.env.CONTRIBUTOR_HOOK ?? "",
});

/**
 * Mounts a fastify server to allow for data analytics.
 * @param camperChan - The bot's Discord instance.
 */
export const instantiateServer = async(
  camperChan: ExtendedClient,
): Promise<void> => {
  try {
    const options: { logger: false; https?: { key: string; cert: string } } = {
      logger: false,
    };
    options.https = {
      cert: await readFile(
        "/etc/letsencrypt/live/camperchan.nhcarrigan.com/cert.pem",
        "utf-8",
      ),
      key: await readFile(
        "/etc/letsencrypt/live/camperchan.nhcarrigan.com/privkey.pem",
        "utf-8",
      ),
    };
    const server = fastify(options);

    server.get("/", (_request, response) => {
      response.status(200).send("Health Check!");
    });

    server.post("/github", async(request, response) => {
      const githubSecret = process.env.GITHUB_WEBHOOK_SECRET;
      if (githubSecret === undefined) {
        await response.status(500).send("No secret provided.");
        return;
      }
      const event = request.headers["x-github-event"];
      const signature = request.headers["x-hub-signature-256"];
      if (typeof event !== "string") {
        await response.
          status(400).
          send(`Invalid value ${String(event)} for X-GitHub-Event`);
        return;
      }
      if (typeof signature !== "string") {
        await response.
          status(400).
          send(`Invalid value ${String(signature)} for X-Hub-Signature-256`);
        return;
      }
      const sig = createHmac("sha256", githubSecret).
        update(JSON.stringify(request.body)).
        digest("hex");
      const trusted = Buffer.from(`sha256=${sig}`, "ascii");
      const sent = Buffer.from(signature, "ascii");
      const safe = timingSafeEqual(trusted, sent);
      if (!safe) {
        await response.
          status(401).
          send("Failed to verify webhook secret hash.");
        return;
      }
      // It's valid, so send an ok response immediately
      await response.status(200).send("OK~!");

      if (event === "issues") {
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        const { action, issue, label } = request.body as {
          action: string;
          // eslint-disable-next-line @typescript-eslint/naming-convention
          issue:  { title: string; html_url: string; number: number };
          label:  { name: string };
        };
        if (action === "labeled") {
          if (label.name === "help wanted") {
            await contributorHook.send({
              content: `[#${issue.number.toString()} ${issue.title}](${issue.html_url}) is open for contribution!`,
            });
          }
          if (label.name === "first timers only") {
            await contributorHook.send({
              content: `[#${issue.number.toString()} ${issue.title}](${issue.html_url}) is available for first-time contributors!`,
            });
          }
        }
      }
    });

    server.listen({ port: 1443 }, (error) => {
      if (error) {
        void errorHandler(camperChan, "mount server instance", error);
        return;
      }
      void camperChan.config.debugHook.send({
        avatarURL:
          camperChan.user?.displayAvatarURL()
          ?? "https://cdn.nhcarrigan.com/profile.png",
        content:  "Fastify server live on port 1443~!",
        username: camperChan.user?.username ?? "Camperchan",
      });
    });
  } catch (error) {
    await errorHandler(camperChan, "instantiate server", error);
  }
};
