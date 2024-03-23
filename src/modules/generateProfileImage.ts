import { levels } from "@prisma/client";
import { AttachmentBuilder } from "discord.js";
import nodeHtmlToImage from "node-html-to-image";

import { Badges } from "../config/Badges";
import { Camperbot } from "../interfaces/Camperbot";
import { UserRecord } from "../interfaces/UserRecord";
import { errorHandler } from "../utils/errorHandler";
import { fetchLearnRecord } from "../utils/fetchLearnRecord";

import { generatorMap } from "./generateCertSvg";

const certTypes = {
  frontEnd: "isFrontEndCert",
  backEnd: "isBackEndCert",
  dataVis: "isDataVisCert",
  respWebDesign: "isRespWebDesignCert",
  frontEndDevLibs: "isFrontEndLibsCert",
  dataVis2018: "is2018DataVisCert",
  jsAlgoDataStruct: "isJsAlgoDataStructCert",
  apisMicroservices: "isApisMicroservicesCert",
  infosecQa: "isInfosecQaCert",
  qaV7: "isQaCertV7",
  infosecV7: "isInfosecCertV7",
  sciCompPyV7: "isSciCompPyCertV7",
  dataAnalysisPyV7: "isDataAnalysisPyCertV7",
  machineLearningPyV7: "isMachineLearningPyCertV7",
  fullStack: "is2018FullStackCert",
  legacyFullStack: "isFullStackCert",
  relationalDatabaseV8: "isRelationalDatabaseCertV8",
  collegeAlgebraPyV8: "isCollegeAlgebraPyCertV8",
  foundationalCSharpV8: "isFoundationalCSharpCertV8",
  upcomingPythonV8: "isUpcomingPythonCertV8",
  jsAlgoDataStructV8: "isJsAlgoDataStructCertV8"
} as const;

const certTypeTitleMap: {
  [key in keyof Required<
    Omit<UserRecord, "email" | "isDonating" | "profileUI">
  >]: string;
} = {
  [certTypes.frontEnd]: "Legacy Front End",
  [certTypes.backEnd]: "Legacy Back End",
  [certTypes.dataVis]: "Legacy Data Visualization",
  [certTypes.infosecQa]: "Legacy Information Security and Quality Assurance",
  [certTypes.fullStack]: "Full Stack",
  [certTypes.respWebDesign]: "Responsive Web Design",
  [certTypes.frontEndDevLibs]: "Front End Development Libraries",
  [certTypes.jsAlgoDataStruct]:
    "Legacy JavaScript Algorithms and Data Structures",
  [certTypes.dataVis2018]: "Data Visualization",
  [certTypes.apisMicroservices]: "Back End Development and APIs",
  [certTypes.qaV7]: "Quality Assurance",
  [certTypes.infosecV7]: "Information Security",
  [certTypes.sciCompPyV7]: "Scientific Computing with Python",
  [certTypes.dataAnalysisPyV7]: "Data Analysis with Python",
  [certTypes.machineLearningPyV7]: "Machine Learning with Python",
  [certTypes.relationalDatabaseV8]: "Relational Database",
  [certTypes.collegeAlgebraPyV8]: "College Algebra with Python",
  [certTypes.foundationalCSharpV8]: "Foundational C# with Microsoft",
  // [certTypes.upcomingPythonV8]: "Upcoming Python",
  [certTypes.jsAlgoDataStructV8]:
    "JavaScript Algorithms and Data Structures (Beta)",
  [certTypes.legacyFullStack]: "Legacy Full Stack"
};

const getCertificationSection = (
  levelRecord: levels,
  learnRecord: UserRecord | null
): { html: string; alt: string } => {
  if (!levelRecord.learnEmail) {
    return {
      html: `<p>freeCodeCamp.org account has not been linked.</p>`,
      alt: `freeCodeCamp.org account has not been linked.`
    };
  }
  if (!learnRecord) {
    return {
      html: `<p>Error loading freeCodeCamp.org account.</p>`,
      alt: `Error loading freeCodeCamp.org account.`
    };
  }
  const { profileUI } = learnRecord;
  if (
    !profileUI ||
    profileUI.isLocked ||
    !profileUI.showCerts ||
    !profileUI.showTimeLine
  ) {
    return {
      html: `<p>Certifications are set to private.</p>`,
      alt: `Certifications are set to private.`
    };
  }

  const shouldMakeSVG = Object.entries(learnRecord).reduce(
    (acc: (keyof typeof generatorMap)[], [key, val]) => {
      if (key in generatorMap && val) {
        acc.push(key as never);
      }
      return acc;
    },
    []
  );
  if (!shouldMakeSVG.length) {
    return {
      html: `<p>No certifications earned yet.</p>`,
      alt: `No certifications earned yet.`
    };
  }
  const generatedSVGs = shouldMakeSVG
    .map((key) => generatorMap[key](levelRecord.colour || "d0d0d5"))
    .join("");
  return {
    html: generatedSVGs,
    alt: shouldMakeSVG.map((k) => certTypeTitleMap[k]).join(", ")
  };
};

const getBadgesSection = (record: levels): { html: string; alt: string } => {
  if (!record.badges.length) {
    return {
      html: "<p>No badges earned yet.</p>",
      alt: "No badges earned yet."
    };
  }
  const processed = record.badges.reduce(
    (acc: { html: string[]; alt: string[] }, el) => {
      const isValid = Badges.find((badge) => el === badge.name);
      if (isValid) {
        acc.html.push(`<img class="badge" src=${isValid.image}></src>`);
        acc.alt.push(isValid.name);
      }
      return acc;
    },
    { html: [], alt: [] }
  );
  const { html, alt } = processed;
  return {
    html: html.join(""),
    alt: alt.join(", ")
  };
};

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
      userId,
      userTag,
      level,
      points,
      learnEmail
    } = record;

    const learn = learnEmail
      ? await fetchLearnRecord(bot, learnEmail, userId)
      : null;

    const certs = getCertificationSection(record, learn);
    const badges = getBadgesSection(record);

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
        font-size: 75px;
        padding: 2.5%;
      }

      h1 {
        font-size: 150px;
      }

      main {
        width: 100%;
        height: 100%;
        background-color: #${backgroundColour || "0a0a23"}bf;
        color: #${colour || "d0d0d5"};
        padding: 2.5%;
        border-radius: 100px;
      }

      .avatar {
        width: 250px;
        height: 250px;
        border-radius: 50%;
      }

      h2 {
        font-size: 125px;
      }

      .header {
        width: 100%;
        display: grid;
        grid-template-columns: 250px auto;
        justify-items: center;
        align-items: center;
      }

      .certs {
        width: 100%;
        height: 150px;
        max-height: 200px;
      }

      .badges {
        width: 100%;
        height: 150px;
        max-height: 200px;
      }

      svg {
        display: inline;
        height: 100px;
      }

      .badge {
        height: 100px;
        width: 100px;
        display: inline;
      }
    </style>
    <body>
      <main>
        <div class="header">
          <img class="avatar" src=${avatar || "https://cdn.freecodecamp.org/platform/universal/fcc_puck_500.jpg"}></img>
          <div>
            <h1>${userTag}</h1>
            <p>Level ${level} (${points.toLocaleString("en-GB")}xp)</p>
          </div>
        </div>
        <h2>Certifications</h2>
        <div class="certs">
          ${certs.html}
        </div>
        <h2>Badges</h2>
        <div class="badges">
          ${badges.html}
        </div>
      </main>
    </body>
    `;
    const alt = `${userTag} is at level ${level} with ${points.toLocaleString("en-GB")} experience points. Certifications: ${certs.alt} - Badges: ${badges.alt}`;

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
    await errorHandler(bot, "generate profile image module", err);
    return null;
  }
};

/**
 * Generates the image for the leaderboard.
 *
 * @param {Camperbot} bot The bot's Discord instance.
 * @param {levels} levels The user's record from the database.
 * @returns {AttachmentBuilder} The attachment, or null on error.
 */
export const generateLeaderboardImage = async (
  bot: Camperbot,
  levels: (levels & { index: number })[]
): Promise<AttachmentBuilder | null> => {
  try {
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
        background: transparent;
        height: 4100px;
        width: 2510px;
      }

      img {
        width: 250px;
        height: 250px;
      }

      h1 {
        font-size: 150px;
      }

      p {
        font-size: 100px;
        font-weight: bold;
      }

      .row {
        width: 2500px;
        display: grid;
        grid-template-columns: 250px 2250px;
        height: 400px;
        margin: 5px 10px;
        justify-items: left;
        align-items: center;
      }
    </style>
    <body>
      ${levels.map(
        (l) =>
          `<div class="row" style="background-color: #${l.backgroundColour || "0a0a23"}bf;color: #${l.colour || "d0d0d5"};padding: 2.5%;border-radius: 100px;">
            <img style="border-radius: 50%;" src=${l.avatar || "https://cdn.freecodecamp.org/platform/universal/fcc_puck_500.jpg"}></img>
            <div style="text-align: left;padding-left:100px;">
              <h1>#${l.index}. ${l.userTag}</h1>
              <p>Level ${l.level} (${l.points}xp)</p>
            </div>
          </div>`
      )}
    </body>
    `;
    const alt = levels
      .map(
        (l) =>
          `${l.userTag} is rank ${l.index} at ${l.level} with ${l.points.toLocaleString("en-GB")} experience points.`
      )
      .join(", ");

    const image = await nodeHtmlToImage({
      html,
      selector: "body",
      transparent: true
    });

    if (!(image instanceof Buffer)) {
      return null;
    }

    const attachment = new AttachmentBuilder(image, {
      name: `leaderboard-${levels[0]?.index}.png`,
      description: alt
    });

    return attachment;
  } catch (err) {
    await errorHandler(bot, "generate leaderboard image module", err);
    return null;
  }
};
