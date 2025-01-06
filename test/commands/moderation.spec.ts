import {
  ApplicationCommandOptionType,
  type SlashCommandSubcommandBuilder,
} from "discord.js";
import { describe, expect, it } from "vitest";
import { moderation } from "../../src/commands/moderation.js";

describe("moderation command", () => {
  const subcommands = moderation.data.options.filter(
    (opt) => {
      return opt.toJSON().type === ApplicationCommandOptionType.Subcommand;
    },
  ) as Array<SlashCommandSubcommandBuilder>;

  it("has correct data", () => {
    expect(moderation.data.name).toBe("moderation");
    expect(moderation.data.description).toBe("Moderation commands.");
    expect(subcommands).toHaveLength(8);
  });

  it("has correct ban", () => {
    const ban = subcommands.find((sub) => {
      return sub.name === "ban";
    });

    expect(ban).toBeDefined();
    expect(ban).not.toBeNull();
    expect(ban?.description).toBe("Bans a user from the server.");
    expect(ban?.options || "hello").toHaveLength(2);
    expect(ban?.options?.[0].name).toBe("target");
    expect(ban?.options?.[0].description).toBe("The user to ban.");
    expect(ban?.options?.[0].required).toBeTruthy();
    expect(ban?.options?.[0].type).toBe(ApplicationCommandOptionType.User);
    expect(ban?.options?.[1].name).toBe("reason");
    expect(ban?.options?.[1].description).toBe("The reason for banning the user.");
    expect(ban?.options?.[1].required).toBeTruthy();
    expect(ban?.options?.[1].type).toBe(ApplicationCommandOptionType.String);
  });

  it("has correct history", () => {
    const history = subcommands.find((sub) => {
      return sub.name === "history";
    });
    expect(history).toBeDefined();
    expect(history).not.toBeNull();
    expect(history?.description).toBe("Views the moderation history of a user.");
    expect(history?.options || "hello").toHaveLength(1);
    expect(history?.options?.[0].name).toBe("target");
    expect(history?.options?.[0].description).toBe("The user to view the moderation history of.");
    expect(history?.options?.[0].required).toBeTruthy();
    expect(history?.options?.[0].type).toBe(ApplicationCommandOptionType.User);
  });

  it("has correct kick", () => {
    const kick = subcommands.find((sub) => {
      return sub.name === "kick";
    });
    expect(kick).toBeDefined();
    expect(kick).not.toBeNull();
    expect(kick?.description).toBe("Kicks a user from the server.");
    expect(kick?.options || "hello").toHaveLength(2);
    expect(kick?.options?.[0].name).toBe("target");
    expect(kick?.options?.[0].description).toBe("The user to kick.");
    expect(kick?.options?.[0].required).toBeTruthy();
    expect(kick?.options?.[0].type).toBe(ApplicationCommandOptionType.User);
    expect(kick?.options?.[1].name).toBe("reason");
    expect(kick?.options?.[1].description).toBe("The reason for kicking the user.");
    expect(kick?.options?.[1].required).toBeTruthy();
    expect(kick?.options?.[1].type).toBe(ApplicationCommandOptionType.String);
  });

  it("has correct mute", () => {
    const mute = subcommands.find((sub) => {
      return sub.name === "mute";
    });
    expect(mute).toBeDefined();
    expect(mute).not.toBeNull();
    expect(mute?.description).toBe("Mutes a user.");
    expect(mute?.options || "hello").toHaveLength(4);
    expect(mute?.options?.[0].name).toBe("target");
    expect(mute?.options?.[0].description).toBe("The user to mute.");
    expect(mute?.options?.[0].required).toBeTruthy();
    expect(mute?.options?.[0].type).toBe(ApplicationCommandOptionType.User);
    expect(mute?.options?.[1].name).toBe("duration");
    expect(mute?.options?.[1].description).toBe("The length of time to mute the user.");
    expect(mute?.options?.[1].required).toBeTruthy();
    expect(mute?.options?.[1].type).toBe(ApplicationCommandOptionType.Integer);
    expect(mute?.options?.[2].name).toBe("unit");
    expect(mute?.options?.[2].description).toBe("The unit of time for the duration.");
    expect(mute?.options?.[2].required).toBeTruthy();
    expect(mute?.options?.[2].type).toBe(ApplicationCommandOptionType.String);
    expect(mute?.options?.[3].name).toBe("reason");
    expect(mute?.options?.[3].description).toBe("The reason for muting the user.");
    expect(mute?.options?.[3].required).toBeTruthy();
    expect(mute?.options?.[3].type).toBe(ApplicationCommandOptionType.String);
  });

  it("has correct prune", () => {
    const prune = subcommands.find((sub) => {
      return sub.name === "prune";
    });
    expect(prune).toBeDefined();
    expect(prune).not.toBeNull();
    expect(prune?.description).toBe("Prunes messages from THIS channel.");
    expect(prune?.options || "hello").toHaveLength(1);
    expect(prune?.options?.[0].name).toBe("count");
    expect(prune?.options?.[0].description).toBe("Number of messages to delete. Maximum of 100.");
    expect(prune?.options?.[0].required).toBeTruthy();
    expect(prune?.options?.[0].type).toBe(ApplicationCommandOptionType.Integer);
  });

  it("has correct unban", () => {
    const unban = subcommands.find((sub) => {
      return sub.name === "unban";
    });
    expect(unban).toBeDefined();
    expect(unban).not.toBeNull();
    expect(unban?.description).toBe("Removes a user's ban.");
    expect(unban?.options || "hello").toHaveLength(2);
    expect(unban?.options?.[0].name).toBe("target");
    expect(unban?.options?.[0].description).toBe("The user to unban.");
    expect(unban?.options?.[0].required).toBeTruthy();
    expect(unban?.options?.[0].type).toBe(ApplicationCommandOptionType.User);
    expect(unban?.options?.[1].name).toBe("reason");
    expect(unban?.options?.[1].description).toBe("The reason for unbanning the user.");
    expect(unban?.options?.[1].required).toBeTruthy();
    expect(unban?.options?.[1].type).toBe(ApplicationCommandOptionType.String);
  });

  it("has correct unmute", () => {
    const unmute = subcommands.find((sub) => {
      return sub.name === "unmute";
    });
    expect(unmute).toBeDefined();
    expect(unmute).not.toBeNull();
    expect(unmute?.description).toBe("Unmutes a user.");
    expect(unmute?.options || "hello").toHaveLength(2);
    expect(unmute?.options?.[0].name).toBe("target");
    expect(unmute?.options?.[0].description).toBe("The user to unmute.");
    expect(unmute?.options?.[0].required).toBeTruthy();
    expect(unmute?.options?.[0].type).toBe(ApplicationCommandOptionType.User);
    expect(unmute?.options?.[1].name).toBe("reason");
    expect(unmute?.options?.[1].description).toBe("The reason for unmuting the user.");
    expect(unmute?.options?.[1].required).toBeTruthy();
    expect(unmute?.options?.[1].type).toBe(ApplicationCommandOptionType.String);
  });

  it("has correct warn", () => {
    const warn = subcommands.find((sub) => {
      return sub.name === "warn";
    });
    expect(warn).toBeDefined();
    expect(warn).not.toBeNull();
    expect(warn?.description).toBe("Issues a warning to a user.");
    expect(warn?.options || "hello").toHaveLength(2);
    expect(warn?.options?.[0].name).toBe("target");
    expect(warn?.options?.[0].description).toBe("The user to warn.");
    expect(warn?.options?.[0].required).toBeTruthy();
    expect(warn?.options?.[0].type).toBe(ApplicationCommandOptionType.User);
    expect(warn?.options?.[1].name).toBe("reason");
    expect(warn?.options?.[1].description).toBe("The reason for issuing this warning.");
    expect(warn?.options?.[1].required).toBeTruthy();
    expect(warn?.options?.[1].type).toBe(ApplicationCommandOptionType.String);
  });
});
