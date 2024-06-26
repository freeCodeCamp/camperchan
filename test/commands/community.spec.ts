import {
  ApplicationCommandOptionType,
  SlashCommandSubcommandBuilder
} from "discord.js";
import { describe, assert, test } from "vitest";

import { community } from "../../src/commands/community";

describe("community command", () => {
  const subcommands = community.data.options.filter(
    (opt) => opt.toJSON().type === ApplicationCommandOptionType.Subcommand
  ) as SlashCommandSubcommandBuilder[];

  test("has correct data", () => {
    assert.strictEqual(community.data.name, "community");
    assert.strictEqual(
      community.data.description,
      "Commands related to our community."
    );
    assert.isFalse(community.data.dm_permission);
    assert.lengthOf(subcommands, 7);
  });

  test("has correct code of conduct", () => {
    const codeOfConduct = subcommands.find(
      (sub) => sub.name === "code-of-conduct"
    );
    assert.exists(codeOfConduct);
    assert.equal(codeOfConduct?.name, "code-of-conduct");
    assert.equal(
      codeOfConduct?.description,
      "Returns information on freeCodeCamp's Code of Conduct."
    );
    assert.lengthOf(codeOfConduct?.options || "hi", 0);
  });

  test("has correct contribute", () => {
    const contribute = subcommands.find((sub) => sub.name === "contribute");
    assert.exists(contribute);
    assert.equal(contribute?.name, "contribute");
    assert.equal(
      contribute?.description,
      "Returns helpful links for folks interested in contributing."
    );
    assert.lengthOf(contribute?.options || "hi", 0);
  });

  test("has correct forum", () => {
    const forum = subcommands.find((sub) => sub.name === "forum");
    assert.exists(forum);
    assert.equal(forum?.name, "forum");
    assert.equal(
      forum?.description,
      "Returns the latest activity on the forum."
    );
    assert.lengthOf(forum?.options || "hi", 0);
  });

  test("has correct leaderboard", () => {
    const leaderboard = subcommands.find((sub) => sub.name === "leaderboard");
    assert.exists(leaderboard);
    assert.equal(leaderboard?.name, "leaderboard");
    assert.equal(leaderboard?.description, "View the server leaderboard.");
    assert.lengthOf(leaderboard?.options || "hi", 0);
  });

  test("has correct quote", () => {
    const quote = subcommands.find((sub) => sub.name === "quote");
    assert.exists(quote);
    assert.equal(quote?.name, "quote");
    assert.equal(quote?.description, "Returns a motivational quote.");
    assert.lengthOf(quote?.options || "hi", 0);
  });

  test("has correct profile", () => {
    const rank = subcommands.find((sub) => sub.name === "profile");
    assert.equal(rank?.name, "profile");
    assert.equal(rank?.description, "See your community profile.");
    assert.lengthOf(rank?.options || "hi", 0);
  });

  test("has correct truism", () => {
    const truism = subcommands.find((sub) => sub.name === "truism");
    assert.equal(truism?.name, "truism");
    assert.equal(
      truism?.description,
      "Provides a random difficult-to-swallow truth about coding."
    );
    assert.lengthOf(truism?.options || "hi", 0);
  });
});
