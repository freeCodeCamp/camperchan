import {
  ApplicationCommandOptionType,
  type SlashCommandSubcommandBuilder,
} from "discord.js";
import { describe, expect, it } from "vitest";
import { community } from "../../src/commands/community.js";

describe("community command", () => {
  const subcommands = community.data.options.filter(
    (opt) => {
      return opt.toJSON().type === ApplicationCommandOptionType.Subcommand;
    },
  ) as Array<SlashCommandSubcommandBuilder>;

  it("has correct data", () => {
    assert.strictEqual(community.data.name, "community");
    assert.strictEqual(
      community.data.description,
      "Commands related to our community.",
    );
    expect(subcommands).toHaveLength(7);
  });

  it("has correct code of conduct", () => {
    const codeOfConduct = subcommands.find(
      (sub) => {
        return sub.name === "code-of-conduct";
      },
    );
    assert.exists(codeOfConduct);
    assert.equal(codeOfConduct?.name, "code-of-conduct");
    assert.equal(
      codeOfConduct?.description,
      "Returns information on freeCodeCamp's Code of Conduct.",
    );
    expect(codeOfConduct?.options || "hi").toHaveLength(0);
  });

  it("has correct contribute", () => {
    const contribute = subcommands.find((sub) => {
      return sub.name === "contribute";
    });
    assert.exists(contribute);
    assert.equal(contribute?.name, "contribute");
    assert.equal(
      contribute?.description,
      "Returns helpful links for folks interested in contributing.",
    );
    expect(contribute?.options || "hi").toHaveLength(0);
  });

  it("has correct forum", () => {
    const forum = subcommands.find((sub) => {
      return sub.name === "forum";
    });
    assert.exists(forum);
    assert.equal(forum?.name, "forum");
    assert.equal(
      forum?.description,
      "Returns the latest activity on the forum.",
    );
    expect(forum?.options || "hi").toHaveLength(0);
  });

  it("has correct leaderboard", () => {
    const leaderboard = subcommands.find((sub) => {
      return sub.name === "leaderboard";
    });
    assert.exists(leaderboard);
    assert.equal(leaderboard?.name, "leaderboard");
    assert.equal(leaderboard?.description, "View the server leaderboard.");
    expect(leaderboard?.options || "hi").toHaveLength(0);
  });

  it("has correct quote", () => {
    const quote = subcommands.find((sub) => {
      return sub.name === "quote";
    });
    assert.exists(quote);
    assert.equal(quote?.name, "quote");
    assert.equal(quote?.description, "Returns a motivational quote.");
    expect(quote?.options || "hi").toHaveLength(0);
  });

  it("has correct profile", () => {
    const rank = subcommands.find((sub) => {
      return sub.name === "profile";
    });
    assert.equal(rank?.name, "profile");
    assert.equal(rank?.description, "See your community profile.");
    expect(rank?.options || "hi").toHaveLength(0);
  });

  it("has correct truism", () => {
    const truism = subcommands.find((sub) => {
      return sub.name === "truism";
    });
    assert.equal(truism?.name, "truism");
    assert.equal(
      truism?.description,
      "Provides a random difficult-to-swallow truth about coding.",
    );
    expect(truism?.options || "hi").toHaveLength(0);
  });
});
