import { levels } from "@prisma/client";
import { AttachmentBuilder } from "discord.js";
import nodeHtmlToImage from "node-html-to-image";

import { Camperbot } from "../interfaces/Camperbot";
import { errorHandler } from "../utils/errorHandler";

/**
 * Creates an image from the user's profile settings, converts it into a Discord
 * attachment, and returns it.
 *
 * @param {Camperbot} bot The bot's Discord instance.
 * @param {levels} record The user's record from the database.
 * @returns {AttachmentBuilder} The attachment, or null on error.
 */
export const generateProfileImage = async (
  bot: Camperbot,
  record: levels
): Promise<AttachmentBuilder | null> => {
  try {
    const {
      avatar,
      backgroundColour,
      backgroundImage,
      colour,
      userTag,
      level,
      points
    } = record;

    const html = `
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      @font-face {
        font-family: "Roboto";
        src: url("https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100..700;1,100..700");
      }
      body { 
        background: url(${backgroundImage || "https://cdn.freecodecamp.org/platform/universal/fcc_meta_1920X1080-indigo.png"}) no-repeat center center fixed;
        background-size: cover;
        width: 1920px;
        height: 1080px;
        text-align: center;
        font-family: "Roboto", Courier, monospace;
        font-size: 100px;
        padding: 2.5%;
      }

      h1 {
        font-size: 150px;
      }

      main {
        width: 100%;
        height: 100%;
        background-color: ${backgroundColour || "#0a0a23"}7f;
        color: ${colour || "#d0d0d5"};
      }

      img {
        width: 250px;
        height: 250px;
      }

      h2 {
        font-size: 125px;
      }

      .header {
        width: 100%;
        display: grid;
        grid-template-columns: 250px auto;
      }
    </style>
    <body>
      <main>
        <div class="header">
          <img src=${avatar || "https://cdn.freecodecamp.org/platform/universal/fcc_puck_500.jpg"}></img>
          <div>
            <h1>${userTag}</h1>
            <p>Level ${level} (${points.toLocaleString("en-GB")}xp)</p>
          </div>
        </div>
        <h2>Certifications</h2>
        <p>Coming soon!</p>
        <h2>Badges</h2>
        <p>Coming soon!</p>
      </main>
    </body>
    `;
    const alt = `User ${userTag} is at level ${level} with ${points.toLocaleString("en_GB")} experience points.`;

    const image = await nodeHtmlToImage({
      html,
      selector: "body",
      transparent: true
    });

    if (!(image instanceof Buffer)) {
      return null;
    }

    const attachment = new AttachmentBuilder(image, {
      name: `${userTag}.png`,
      description: alt
    });

    return attachment;
  } catch (err) {
    await errorHandler(bot, err);
    return null;
  }
};
