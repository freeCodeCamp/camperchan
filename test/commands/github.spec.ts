import {
  ApplicationCommandOptionType,
  type SlashCommandSubcommandBuilder,
} from "discord.js";
import { describe, expect, it } from "vitest";
import { github } from "../../src/commands/github.js";

describe("github command", () => {
  const subcommands = github.data.options.filter(
    (opt) => {
      return opt.toJSON().type === ApplicationCommandOptionType.Subcommand;
    },
  ) as Array<SlashCommandSubcommandBuilder>;

  it("has correct data", () => {
    expect(github.data.name).toBe("github");
    expect(github.data.description).toBe("Commands related to managing github");
    expect(subcommands).toHaveLength(4);
  });

  it("has correct close", () => {
    const close = subcommands.find((sub) => {
      return sub.name === "close";
    });
    expect(close).toBeDefined();
    expect(close).not.toBeNull();
    expect(close?.name).toBe("close");
    expect(close?.description).toBe("Close an issue or pull request under the freeCodeCamp organisation.");
    expect(close?.options || "hi").toHaveLength(4);
    expect(close?.options?.[0].name).toBe("repository");
    expect(close?.options?.[0].description).toBe(`The name of the repository, under freeCodeCamp's GitHub org, to comment on`);
    expect(close?.options?.[0].required).toBeTruthy();
    expect(close?.options?.[0].type).toBe(ApplicationCommandOptionType.String);
    expect(close?.options?.[1].name).toBe("number");
    expect(close?.options?.[1].description).toBe("The number of the issue or pull to close.");
    expect(close?.options?.[1].required).toBeTruthy();
    expect(close?.options?.[1].type).toBe(ApplicationCommandOptionType.Integer);
    expect(close?.options?.[2].name).toBe("comment");
    expect(close?.options?.[2].description).toBe(`The comment to leave when closing. Defaults to the standard close message.`);
    expect(close?.options?.[2].required).toBeFalsy();
    expect(close?.options?.[2].type).toBe(ApplicationCommandOptionType.String);
    expect(close?.options?.[3].name).toBe("spam");
    expect(close?.options?.[3].description).toBe("Label the PR as spam for Hacktoberfest?");
    expect(close?.options?.[3].required).toBeFalsy();
    expect(close?.options?.[3].type).toBe(ApplicationCommandOptionType.Boolean);
  });

  it("has correct comment", () => {
    const comment = subcommands.find((sub) => {
      return sub.name === "comment";
    });
    expect(comment).toBeDefined();
    expect(comment).not.toBeNull();
    expect(comment?.name).toBe("comment");
    expect(comment?.description).toBe(`Adds a friendly comment to an issue or pull request. Scoped to the freeCodeCamp organisation.`);
    expect(comment?.options || "hi").toHaveLength(3);
    expect(comment?.options?.[0].name).toBe("repository");
    expect(comment?.options?.[0].description).toBe(`The name of the repository, under freeCodeCamp's GitHub org, to comment on`);
    expect(comment?.options?.[0].required).toBeTruthy();
    expect(comment?.options?.[0].type).toBe(ApplicationCommandOptionType.String);
    expect(comment?.options?.[1].name).toBe("number");
    expect(comment?.options?.[1].description).toBe("The number of the pull request to comment on.");
    expect(comment?.options?.[1].required).toBeTruthy();
    expect(comment?.options?.[1].type).toBe(ApplicationCommandOptionType.Integer);
    expect(comment?.options?.[2].name).toBe("message");
    expect(comment?.options?.[2].description).toBe("The message to post.");
    expect(comment?.options?.[2].required).toBeTruthy();
    expect(comment?.options?.[2].type).toBe(ApplicationCommandOptionType.String);
  });

  it("has correct add labels", () => {
    const command = subcommands.find((sub) => {
      return sub.name === "add-labels";
    });
    expect(command).toBeDefined();
    expect(command).not.toBeNull();
    expect(command?.name).toBe("add-labels");
    expect(command?.description).toBe("Specify a list of labels to add to an issue/PR. Existing labels will not be removed.");
    expect(command?.options || "hi").toHaveLength(3);
    expect(command?.options?.[0].name).toBe("repository");
    expect(command?.options?.[0].description).toBe("The name of the repository, under freeCodeCamp's GitHub org, to label");
    expect(command?.options?.[0].required).toBeTruthy();
    expect(command?.options?.[0].type).toBe(ApplicationCommandOptionType.String);
    expect(command?.options?.[1].name).toBe("number");
    expect(command?.options?.[1].description).toBe("The number of the pull request to label.");
    expect(command?.options?.[1].required).toBeTruthy();
    expect(command?.options?.[1].type).toBe(ApplicationCommandOptionType.Integer);
    expect(command?.options?.[2].name).toBe("labels");
    expect(command?.options?.[2].description).toBe("The comma separated list of labels to add");
    expect(command?.options?.[2].required).toBeTruthy();
    expect(command?.options?.[2].type).toBe(ApplicationCommandOptionType.String);
  });

  it("has correct sync labels", () => {
    const command = subcommands.find((sub) => {
      return sub.name === "sync-labels";
    });
    expect(command).toBeDefined();
    expect(command).not.toBeNull();
    expect(command?.name).toBe("sync-labels");
    expect(command?.description).toBe(`Specify the exact list of labels an issue/PR should have. Labels not on the list will be removed.`);
    expect(command?.options || "hi").toHaveLength(3);
    expect(command?.options?.[0].name).toBe("repository");
    expect(command?.options?.[0].description).toBe("The name of the repository, under freeCodeCamp's GitHub org, to label");
    expect(command?.options?.[0].required).toBeTruthy();
    expect(command?.options?.[0].type).toBe(ApplicationCommandOptionType.String);
    expect(command?.options?.[1].name).toBe("number");
    expect(command?.options?.[1].description).toBe("The number of the pull request to label.");
    expect(command?.options?.[1].required).toBeTruthy();
    expect(command?.options?.[1].type).toBe(ApplicationCommandOptionType.Integer);
    expect(command?.options?.[2].name).toBe("labels");
    expect(command?.options?.[2].description).toBe("The comma separated list of labels to sync");
    expect(command?.options?.[2].required).toBeTruthy();
    expect(command?.options?.[2].type).toBe(ApplicationCommandOptionType.String);
  });
});
