import {
  ApplicationCommandOptionType,
  SlashCommandSubcommandBuilder
} from "discord.js";
import { describe, assert, test } from "vitest";

import { moderation } from "../../src/commands/moderation";

describe("moderation command", () => {
  const subcommands = moderation.data.options.filter(
    (opt) => opt.toJSON().type === ApplicationCommandOptionType.Subcommand
  ) as SlashCommandSubcommandBuilder[];

  test("has correct data", () => {
    assert.strictEqual(moderation.data.name, "moderation");
    assert.strictEqual(moderation.data.description, "Moderation commands.");
    assert.isFalse(moderation.data.dm_permission);
    assert.lengthOf(subcommands, 8);
  });

  test("has correct ban", () => {
    const ban = subcommands.find((sub) => sub.name === "ban");
    assert.exists(ban);
    assert.strictEqual(ban?.description, "Bans a user from the server.");
    assert.lengthOf(ban?.options || "hello", 2);
    assert.strictEqual(ban?.options?.[0].name, "target");
    assert.strictEqual(ban?.options?.[0].description, "The user to ban.");
    assert.isTrue(ban?.options?.[0].required);
    assert.strictEqual(
      ban?.options?.[0].type,
      ApplicationCommandOptionType.User
    );
    assert.strictEqual(ban?.options?.[1].name, "reason");
    assert.strictEqual(
      ban?.options?.[1].description,
      "The reason for banning the user."
    );
    assert.isTrue(ban?.options?.[1].required);
    assert.strictEqual(
      ban?.options?.[1].type,
      ApplicationCommandOptionType.String
    );
  });

  test("has correct history", () => {
    const history = subcommands.find((sub) => sub.name === "history");
    assert.exists(history);
    assert.strictEqual(
      history?.description,
      "Views the moderation history of a user."
    );
    assert.lengthOf(history?.options || "hello", 1);
    assert.strictEqual(history?.options?.[0].name, "target");
    assert.strictEqual(
      history?.options?.[0].description,
      "The user to view the moderation history of."
    );
    assert.isTrue(history?.options?.[0].required);
    assert.strictEqual(
      history?.options?.[0].type,
      ApplicationCommandOptionType.User
    );
  });

  test("has correct kick", () => {
    const kick = subcommands.find((sub) => sub.name === "kick");
    assert.exists(kick);
    assert.strictEqual(kick?.description, "Kicks a user from the server.");
    assert.lengthOf(kick?.options || "hello", 2);
    assert.strictEqual(kick?.options?.[0].name, "target");
    assert.strictEqual(kick?.options?.[0].description, "The user to kick.");
    assert.isTrue(kick?.options?.[0].required);
    assert.strictEqual(
      kick?.options?.[0].type,
      ApplicationCommandOptionType.User
    );
    assert.strictEqual(kick?.options?.[1].name, "reason");
    assert.strictEqual(
      kick?.options?.[1].description,
      "The reason for kicking the user."
    );
    assert.isTrue(kick?.options?.[1].required);
    assert.strictEqual(
      kick?.options?.[1].type,
      ApplicationCommandOptionType.String
    );
  });

  test("has correct mute", () => {
    const mute = subcommands.find((sub) => sub.name === "mute");
    assert.exists(mute);
    assert.strictEqual(mute?.description, "Mutes a user.");
    assert.lengthOf(mute?.options || "hello", 4);
    assert.strictEqual(mute?.options?.[0].name, "target");
    assert.strictEqual(mute?.options?.[0].description, "The user to mute.");
    assert.isTrue(mute?.options?.[0].required);
    assert.strictEqual(
      mute?.options?.[0].type,
      ApplicationCommandOptionType.User
    );
    assert.strictEqual(mute?.options?.[1].name, "duration");
    assert.strictEqual(
      mute?.options?.[1].description,
      "The length of time to mute the user."
    );
    assert.isTrue(mute?.options?.[1].required);
    assert.strictEqual(
      mute?.options?.[1].type,
      ApplicationCommandOptionType.Integer
    );
    assert.strictEqual(mute?.options?.[2].name, "unit");
    assert.strictEqual(
      mute?.options?.[2].description,
      "The unit of time for the duration."
    );
    assert.isTrue(mute?.options?.[2].required);
    assert.strictEqual(
      mute?.options?.[2].type,
      ApplicationCommandOptionType.String
    );
    assert.strictEqual(mute?.options?.[3].name, "reason");
    assert.strictEqual(
      mute?.options?.[3].description,
      "The reason for muting the user."
    );
    assert.isTrue(mute?.options?.[3].required);
    assert.strictEqual(
      mute?.options?.[3].type,
      ApplicationCommandOptionType.String
    );
  });

  test("has correct prune", () => {
    const prune = subcommands.find((sub) => sub.name === "prune");
    assert.exists(prune);
    assert.strictEqual(
      prune?.description,
      "Prunes messages from THIS channel."
    );
    assert.lengthOf(prune?.options || "hello", 1);
    assert.strictEqual(prune?.options?.[0].name, "count");
    assert.strictEqual(
      prune?.options?.[0].description,
      "Number of messages to delete. Maximum of 100."
    );
    assert.isTrue(prune?.options?.[0].required);
    assert.strictEqual(
      prune?.options?.[0].type,
      ApplicationCommandOptionType.Integer
    );
  });

  test("has correct unban", () => {
    const unban = subcommands.find((sub) => sub.name === "unban");
    assert.exists(unban);
    assert.strictEqual(unban?.description, "Removes a user's ban.");
    assert.lengthOf(unban?.options || "hello", 2);
    assert.strictEqual(unban?.options?.[0].name, "target");
    assert.strictEqual(unban?.options?.[0].description, "The user to unban.");
    assert.isTrue(unban?.options?.[0].required);
    assert.strictEqual(
      unban?.options?.[0].type,
      ApplicationCommandOptionType.User
    );
    assert.strictEqual(unban?.options?.[1].name, "reason");
    assert.strictEqual(
      unban?.options?.[1].description,
      "The reason for unbanning the user."
    );
    assert.isTrue(unban?.options?.[1].required);
    assert.strictEqual(
      unban?.options?.[1].type,
      ApplicationCommandOptionType.String
    );
  });

  test("has correct unmute", () => {
    const unmute = subcommands.find((sub) => sub.name === "unmute");
    assert.exists(unmute);
    assert.strictEqual(unmute?.description, "Unmutes a user.");
    assert.lengthOf(unmute?.options || "hello", 2);
    assert.strictEqual(unmute?.options?.[0].name, "target");
    assert.strictEqual(unmute?.options?.[0].description, "The user to unmute.");
    assert.isTrue(unmute?.options?.[0].required);
    assert.strictEqual(
      unmute?.options?.[0].type,
      ApplicationCommandOptionType.User
    );
    assert.strictEqual(unmute?.options?.[1].name, "reason");
    assert.strictEqual(
      unmute?.options?.[1].description,
      "The reason for unmuting the user."
    );
    assert.isTrue(unmute?.options?.[1].required);
    assert.strictEqual(
      unmute?.options?.[1].type,
      ApplicationCommandOptionType.String
    );
  });

  test("has correct warn", () => {
    const warn = subcommands.find((sub) => sub.name === "warn");
    assert.exists(warn);
    assert.strictEqual(warn?.description, "Issues a warning to a user.");
    assert.lengthOf(warn?.options || "hello", 2);
    assert.strictEqual(warn?.options?.[0].name, "target");
    assert.strictEqual(warn?.options?.[0].description, "The user to warn.");
    assert.isTrue(warn?.options?.[0].required);
    assert.strictEqual(
      warn?.options?.[0].type,
      ApplicationCommandOptionType.User
    );
    assert.strictEqual(warn?.options?.[1].name, "reason");
    assert.strictEqual(
      warn?.options?.[1].description,
      "The reason for issuing this warning."
    );
    assert.isTrue(warn?.options?.[1].required);
    assert.strictEqual(
      warn?.options?.[1].type,
      ApplicationCommandOptionType.String
    );
  });
});
