/**
 * @copyright nhcarrigan
 * @license Naomi's Public License
 * @author Naomi Carrigan
 */

import { readFile } from "node:fs/promises";
// eslint-disable-next-line import/default, import/no-named-as-default, import/no-named-as-default-member
import fastify from "fastify";
import { errorHandler } from "../utils/errorHandler.js";
import type { ExtendedClient } from "../interfaces/extendedClient.js";

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
