/* eslint-disable max-lines */
import { AttachmentBuilder } from "discord.js";
import nodeHtmlToImage from "node-html-to-image";
import { badges } from "../config/badges.js";
import { errorHandler } from "../utils/errorHandler.js";
import { fetchLearnRecord } from "../utils/fetchLearnRecord.js";
import { generatorMap } from "./generateCertSvg.js";
import type { ExtendedClient } from "../interfaces/extendedClient.js";
import type { UserRecord } from "../interfaces/userRecord.js";
import type { levels } from "@prisma/client";

const certTypes = {
  apisMicroservices:    "isApisMicroservicesCert",
  backEnd:              "isBackEndCert",
  collegeAlgebraPyV8:   "isCollegeAlgebraPyCertV8",
  dataAnalysisPyV7:     "isDataAnalysisPyCertV7",
  dataVis:              "isDataVisCert",
  dataVis2018:          "is2018DataVisCert",
  foundationalCSharpV8: "isFoundationalCSharpCertV8",
  frontEnd:             "isFrontEndCert",
  frontEndDevLibs:      "isFrontEndLibsCert",
  fullStack:            "is2018FullStackCert",
  infosecQa:            "isInfosecQaCert",
  infosecV7:            "isInfosecCertV7",
  jsAlgoDataStruct:     "isJsAlgoDataStructCert",
  jsAlgoDataStructV8:   "isJsAlgoDataStructCertV8",
  legacyFullStack:      "isFullStackCert",
  machineLearningPyV7:  "isMachineLearningPyCertV7",
  qaV7:                 "isQaCertV7",
  relationalDatabaseV8: "isRelationalDatabaseCertV8",
  respWebDesign:        "isRespWebDesignCert",
  sciCompPyV7:          "isSciCompPyCertV7",
  upcomingPythonV8:     "isUpcomingPythonCertV8",
} as const;

const certTypeTitleMap: {
  [key in keyof Required<
    Omit<UserRecord, "email" | "isDonating" | "profileUI">
  >]: string;
} = {
  [certTypes.frontEnd]: "Legacy Front End",
  [certTypes.backEnd]:  "Legacy Back End",
  [certTypes.dataVis]:  "Legacy Data Visualization",
  [certTypes.infosecQa]:
    "Legacy Information Security and Quality Assurance",
  [certTypes.fullStack]:       "Full Stack",
  [certTypes.respWebDesign]:   "Responsive Web Design",
  [certTypes.frontEndDevLibs]: "Front End Development Libraries",
  [certTypes.jsAlgoDataStruct]:
    "Legacy JavaScript Algorithms and Data Structures",
  [certTypes.dataVis2018]:          "Data Visualization",
  [certTypes.apisMicroservices]:    "Back End Development and APIs",
  [certTypes.qaV7]:                 "Quality Assurance",
  [certTypes.infosecV7]:            "Information Security",
  [certTypes.sciCompPyV7]:          "Scientific Computing with Python",
  [certTypes.dataAnalysisPyV7]:     "Data Analysis with Python",
  [certTypes.machineLearningPyV7]:  "Machine Learning with Python",
  [certTypes.relationalDatabaseV8]: "Relational Database",
  [certTypes.collegeAlgebraPyV8]:   "College Algebra with Python",
  [certTypes.foundationalCSharpV8]: "Foundational C# with Microsoft",
  // [certTypes.upcomingPythonV8]: "Upcoming Python",
  [certTypes.jsAlgoDataStructV8]:
    "JavaScript Algorithms and Data Structures (Beta)",
  [certTypes.legacyFullStack]: "Legacy Full Stack",
};

const getCertificationSection = (
  levelRecord: levels,
  learnRecord: UserRecord | null,
): { html: string; alt: string } => {
  if (levelRecord.learnEmail === "") {
    return {
      alt:  `freeCodeCamp.org account has not been linked.`,
      html: `<p>freeCodeCamp.org account has not been linked.</p>`,
    };
  }
  if (!learnRecord) {
    return {
      alt:  `Error loading freeCodeCamp.org account.`,
      html: `<p>Error loading freeCodeCamp.org account.</p>`,
    };
  }
  const { profileUI } = learnRecord;
  if (
    !profileUI
    || profileUI.isLocked
    || !profileUI.showCerts
    || !profileUI.showTimeLine
  ) {
    return {
      alt:  `Certifications are set to private.`,
      html: `<p>Certifications are set to private.</p>`,
    };
  }

  // eslint-disable-next-line unicorn/no-array-reduce
  const shouldMakeSVG = Object.entries(learnRecord).reduce(
    (accumulator: Array<keyof typeof generatorMap>, [ key, value ]) => {
      if (key in generatorMap && value === true) {
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        accumulator.push(key as keyof typeof generatorMap);
      }
      return accumulator;
    },
    [],
  );
  if (shouldMakeSVG.length === 0) {
    return {
      alt:  `No certifications earned yet.`,
      html: `<p>No certifications earned yet.</p>`,
    };
  }
  const generatedSVGs = shouldMakeSVG.
    map((key) => {
      return generatorMap[key](levelRecord.colour);
    }).
    join("");
  return {
    alt: shouldMakeSVG.map((k) => {
      return certTypeTitleMap[k];
    }).join(", "),
    html: generatedSVGs,
  };
};

const getbadgesSection = (record: levels): { html: string; alt: string } => {
  if (record.badges.length === 0) {
    return {
      alt:  "No badges earned yet.",
      html: "<p>No badges earned yet.</p>",
    };
  }
  // eslint-disable-next-line unicorn/no-array-reduce
  const processed = record.badges.reduce(
    (accumulator: { html: Array<string>; alt: Array<string> }, element) => {
      const isValid = badges.find((badge) => {
        return element === badge.name;
      });
      if (isValid) {
        accumulator.html.push(`<img class="badge" src=${isValid.image}></src>`);
        accumulator.alt.push(isValid.name);
      }
      return accumulator;
    },
    { alt: [], html: [] },
  );
  const { html, alt } = processed;
  return {
    alt:  alt.join(", "),
    html: html.join(""),
  };
};

/**
 * Creates an image from the user's profile settings, converts it into a Discord
 * attachment, and returns it.
 * @param camperChan - The camperChan's Discord instance.
 * @param record - The user's record from the database.
 * @returns The attachment, or null on error.
 */
const generateProfileImage = async(
  camperChan: ExtendedClient,
  record: levels,
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
      learnEmail,
    } = record;

    const learn
       = await fetchLearnRecord(camperChan, learnEmail, userId);

    const certs = getCertificationSection(record, learn);
    const badgeIcons = getbadgesSection(record);

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
        background: url(${backgroundImage === ""
          ? `https://cdn.freecodecamp.org/platform/universal/fcc_meta_1920X1080-indigo.png"`
          : backgroundImage}) no-repeat center center fixed;
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
        background-color: #${backgroundColour === ""
          ? "0a0a23"
          : backgroundColour}bf;
        color: #${colour === ""
          ? "d0d0d5"
          : colour};
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
          <img class="avatar" src=${avatar === ""
            ? "https://cdn.freecodecamp.org/platform/universal/fcc_puck_500.jpg"
            : avatar}></img>
          <div>
            <h1>${userTag}</h1>
            <p>Level ${String(level)} (${points.toLocaleString("en-GB")}xp)</p>
          </div>
        </div>
        <h2>Certifications</h2>
        <div class="certs">
          ${certs.html}
        </div>
        <h2>badges</h2>
        <div class="badges">
          ${badgeIcons.html}
        </div>
      </main>
    </body>
    `;
    const alt = `${userTag} is at level ${String(level)} with ${points.toLocaleString("en-GB")} experience points. Certifications: ${certs.alt} - badges: ${badgeIcons.alt}`;

    const image = await nodeHtmlToImage({
      html:        html,
      selector:    "body",
      transparent: true,
    });

    if (!(image instanceof Buffer)) {
      return null;
    }

    const attachment = new AttachmentBuilder(image, {
      description: alt,
      name:        `${userTag}.png`,
    });

    return attachment;
  } catch (error) {
    await errorHandler(camperChan, "generate profile image module", error);
    return null;
  }
};

/**
 * Generates the image for the leaderboard.
 * @param camperChan - The camperChan's Discord instance.
 * @param levels - The user's record from the database.
 * @returns The attachment, or null on error.
 */
const generateLeaderboardImage = async(
  camperChan: ExtendedClient,
  levels: Array<levels & { index: number }>,
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
        height: 4300px;
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
        (l) => {
          return `<div class="row" style="background-color: #${l.backgroundColour === ""
            ? "0a0a23"
            : l.backgroundColour}bf;color: #${l.colour === ""
            ? "d0d0d5"
            : l.colour};padding: 2.5%;border-radius: 100px;">
            <img style="border-radius: 50%;" src=${l.avatar === ""
              // eslint-disable-next-line stylistic/max-len
              ? "https://cdn.freecodecamp.org/platform/universal/fcc_puck_500.jpg"
              : l.avatar}></img>
            <div style="text-align: left;padding-left:100px;">
              <h1>#${String(l.index)}. ${l.userTag}</h1>
              <p>Level ${String(l.level)} (${String(l.points)}xp)</p>
            </div>
          </div>`;
        },
      ).join(", ")}
    </body>
    `;
    const alt = levels.
      map(
        (l) => {
          return `${l.userTag} is rank ${String(l.index)} at ${String(l.level)} with ${l.points.toLocaleString("en-GB")} experience points.`;
        },
      ).
      join(", ");

    const image = await nodeHtmlToImage({
      html:        html,
      selector:    "body",
      transparent: true,
    });

    if (!(image instanceof Buffer)) {
      return null;
    }

    const attachment = new AttachmentBuilder(image, {
      description: alt,
      name:        `leaderboard-${String(levels.at(0)?.index)}.png`,
    });

    return attachment;
  } catch (error) {
    await errorHandler(camperChan, "generate leaderboard image module", error);
    return null;
  }
};

export { generateProfileImage, generateLeaderboardImage };
