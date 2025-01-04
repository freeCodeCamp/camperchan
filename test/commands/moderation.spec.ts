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
    assert.strictEqual(moderation.data.name, "moderation");
    assert.strictEqual(moderation.data.description, "Moderation commands.");
    expect(subcommands).toHaveLength(8);
  });

  it("has correct ban", () => {
    const ban = subcommands.find((sub) => {
      return sub.name === "ban";
    });
    assert.exists(ban);
    assert.strictEqual(ban?.description, "Bans a user from the server.");
    expect(ban?.options || "hello").toHaveLength(2);
    assert.strictEqual(ban?.options?.[0].name, "target");
    assert.strictEqual(ban?.options?.[0].description, "The user to ban.");
    expect(ban?.options?.[0].required).toBeTruthy();
    assert.strictEqual(
      ban?.options?.[0].type,
      ApplicationCommandOptionType.User,
    );
    assert.strictEqual(ban?.options?.[1].name, "reason");
    assert.strictEqual(
      ban?.options?.[1].description,
      "The reason for banning the user.",
    );
    expect(ban?.options?.[1].required).toBeTruthy();
    assert.strictEqual(
      ban?.options?.[1].type,
      ApplicationCommandOptionType.String,
    );
  });

  it("has correct history", () => {
    const history = subcommands.find((sub) => {
      return sub.name === "history";
    });
    assert.exists(history);
    assert.strictEqual(
      history?.description,
      "Views the moderation history of a user.",
    );
    expect(history?.options || "hello").toHaveLength(1);
    assert.strictEqual(history?.options?.[0].name, "target");
    assert.strictEqual(
      history?.options?.[0].description,
      "The user to view the moderation history of.",
    );
    expect(history?.options?.[0].required).toBeTruthy();
    assert.strictEqual(
      history?.options?.[0].type,
      ApplicationCommandOptionType.User,
    );
  });

  it("has correct kick", () => {
    const kick = subcommands.find((sub) => {
      return sub.name === "kick";
    });
    assert.exists(kick);
    assert.strictEqual(kick?.description, "Kicks a user from the server.");
    expect(kick?.options || "hello").toHaveLength(2);
    assert.strictEqual(kick?.options?.[0].name, "target");
    assert.strictEqual(kick?.options?.[0].description, "The user to kick.");
    expect(kick?.options?.[0].required).toBeTruthy();
    assert.strictEqual(
      kick?.options?.[0].type,
      ApplicationCommandOptionType.User,
    );
    assert.strictEqual(kick?.options?.[1].name, "reason");
    assert.strictEqual(
      kick?.options?.[1].description,
      "The reason for kicking the user.",
    );
    expect(kick?.options?.[1].required).toBeTruthy();
    assert.strictEqual(
      kick?.options?.[1].type,
      ApplicationCommandOptionType.String,
    );
  });

  it("has correct mute", () => {
    const mute = subcommands.find((sub) => {
      return sub.name === "mute";
    });
    assert.exists(mute);
    assert.strictEqual(mute?.description, "Mutes a user.");
    expect(mute?.options || "hello").toHaveLength(4);
    assert.strictEqual(mute?.options?.[0].name, "target");
    assert.strictEqual(mute?.options?.[0].description, "The user to mute.");
    expect(mute?.options?.[0].required).toBeTruthy();
    assert.strictEqual(
      mute?.options?.[0].type,
      ApplicationCommandOptionType.User,
    );
    assert.strictEqual(mute?.options?.[1].name, "duration");
    assert.strictEqual(
      mute?.options?.[1].description,
      "The length of time to mute the user.",
    );
    expect(mute?.options?.[1].required).toBeTruthy();
    assert.strictEqual(
      mute?.options?.[1].type,
      ApplicationCommandOptionType.Integer,
    );
    assert.strictEqual(mute?.options?.[2].name, "unit");
    assert.strictEqual(
      mute?.options?.[2].description,
      "The unit of time for the duration.",
    );
    expect(mute?.options?.[2].required).toBeTruthy();
    assert.strictEqual(
      mute?.options?.[2].type,
      ApplicationCommandOptionType.String,
    );
    assert.strictEqual(mute?.options?.[3].name, "reason");
    assert.strictEqual(
      mute?.options?.[3].description,
      "The reason for muting the user.",
    );
    expect(mute?.options?.[3].required).toBeTruthy();
    assert.strictEqual(
      mute?.options?.[3].type,
      ApplicationCommandOptionType.String,
    );
  });

  it("has correct prune", () => {
    const prune = subcommands.find((sub) => {
      return sub.name === "prune";
    });
    assert.exists(prune);
    assert.strictEqual(
      prune?.description,
      "Prunes messages from THIS channel.",
    );
    expect(prune?.options || "hello").toHaveLength(1);
    assert.strictEqual(prune?.options?.[0].name, "count");
    assert.strictEqual(
      prune?.options?.[0].description,
      "Number of messages to delete. Maximum of 100.",
    );
    expect(prune?.options?.[0].required).toBeTruthy();
    assert.strictEqual(
      prune?.options?.[0].type,
      ApplicationCommandOptionType.Integer,
    );
  });

  it("has correct unban", () => {
    const unban = subcommands.find((sub) => {
      return sub.name === "unban";
    });
    assert.exists(unban);
    assert.strictEqual(unban?.description, "Removes a user's ban.");
    expect(unban?.options || "hello").toHaveLength(2);
    assert.strictEqual(unban?.options?.[0].name, "target");
    assert.strictEqual(unban?.options?.[0].description, "The user to unban.");
    expect(unban?.options?.[0].required).toBeTruthy();
    assert.strictEqual(
      unban?.options?.[0].type,
      ApplicationCommandOptionType.User,
    );
    assert.strictEqual(unban?.options?.[1].name, "reason");
    assert.strictEqual(
      unban?.options?.[1].description,
      "The reason for unbanning the user.",
    );
    expect(unban?.options?.[1].required).toBeTruthy();
    assert.strictEqual(
      unban?.options?.[1].type,
      ApplicationCommandOptionType.String,
    );
  });

  it("has correct unmute", () => {
    const unmute = subcommands.find((sub) => {
      return sub.name === "unmute";
    });
    assert.exists(unmute);
    assert.strictEqual(unmute?.description, "Unmutes a user.");
    expect(unmute?.options || "hello").toHaveLength(2);
    assert.strictEqual(unmute?.options?.[0].name, "target");
    assert.strictEqual(unmute?.options?.[0].description, "The user to unmute.");
    expect(unmute?.options?.[0].required).toBeTruthy();
    assert.strictEqual(
      unmute?.options?.[0].type,
      ApplicationCommandOptionType.User,
    );
    assert.strictEqual(unmute?.options?.[1].name, "reason");
    assert.strictEqual(
      unmute?.options?.[1].description,
      "The reason for unmuting the user.",
    );
    expect(unmute?.options?.[1].required).toBeTruthy();
    assert.strictEqual(
      unmute?.options?.[1].type,
      ApplicationCommandOptionType.String,
    );
  });

  it("has correct warn", () => {
    const warn = subcommands.find((sub) => {
      return sub.name === "warn";
    });
    assert.exists(warn);
    assert.strictEqual(warn?.description, "Issues a warning to a user.");
    expect(warn?.options || "hello").toHaveLength(2);
    assert.strictEqual(warn?.options?.[0].name, "target");
    assert.strictEqual(warn?.options?.[0].description, "The user to warn.");
    expect(warn?.options?.[0].required).toBeTruthy();
    assert.strictEqual(
      warn?.options?.[0].type,
      ApplicationCommandOptionType.User,
    );
    assert.strictEqual(warn?.options?.[1].name, "reason");
    assert.strictEqual(
      warn?.options?.[1].description,
      "The reason for issuing this warning.",
    );
    expect(warn?.options?.[1].required).toBeTruthy();
    assert.strictEqual(
      warn?.options?.[1].type,
      ApplicationCommandOptionType.String,
    );
  });
});
