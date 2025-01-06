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
    expect(community.data.name).toBe("community");
    expect(community.data.description).toBe("Commands related to our community.");
    expect(subcommands).toHaveLength(7);
  });

  it("has correct code of conduct", () => {
    const codeOfConduct = subcommands.find(
      (sub) => {
        return sub.name === "code-of-conduct";
      },
    );
    expect(codeOfConduct).toBeDefined();
    expect(codeOfConduct).not.toBeNull();
    expect(codeOfConduct?.name).toBe("code-of-conduct");
    expect(codeOfConduct?.description).toBe("Returns information on freeCodeCamp's Code of Conduct.");
    expect(codeOfConduct?.options || "hi").toHaveLength(0);
  });

  it("has correct contribute", () => {
    const contribute = subcommands.find((sub) => {
      return sub.name === "contribute";
    });
    expect(contribute).toBeDefined();
    expect(contribute).not.toBeNull();
    expect(contribute?.name).toBe("contribute");
    expect(contribute?.description).toBe("Returns helpful links for folks interested in contributing.");
    expect(contribute?.options || "hi").toHaveLength(0);
  });

  it("has correct forum", () => {
    const forum = subcommands.find((sub) => {
      return sub.name === "forum";
    });
    expect(forum).toBeDefined();
    expect(forum).not.toBeNull();
    expect(forum?.name).toBe("forum");
    expect(forum?.description).toBe("Returns the latest activity on the forum.");
    expect(forum?.options || "hi").toHaveLength(0);
  });

  it("has correct leaderboard", () => {
    const leaderboard = subcommands.find((sub) => {
      return sub.name === "leaderboard";
    });
    expect(leaderboard).toBeDefined();
    expect(leaderboard).not.toBeNull();
    expect(leaderboard?.name).toBe("leaderboard");
    expect(leaderboard?.description).toBe("View the server leaderboard.");
    expect(leaderboard?.options || "hi").toHaveLength(0);
  });

  it("has correct quote", () => {
    const quote = subcommands.find((sub) => {
      return sub.name === "quote";
    });
    expect(quote).toBeDefined();
    expect(quote).not.toBeNull();
    expect(quote?.name).toBe("quote");
    expect(quote?.description).toBe("Returns a motivational quote.");
    expect(quote?.options || "hi").toHaveLength(0);
  });

  it("has correct profile", () => {
    const rank = subcommands.find((sub) => {
      return sub.name === "profile";
    });
    expect(rank?.name).toBe("profile");
    expect(rank?.description).toBe("See your community profile.");
    expect(rank?.options || "hi").toHaveLength(0);
  });

  it("has correct truism", () => {
    const truism = subcommands.find((sub) => {
      return sub.name === "truism";
    });
    expect(truism?.name).toBe("truism");
    expect(truism?.description).toBe("Provides a random difficult-to-swallow truth about coding.");
    expect(truism?.options || "hi").toHaveLength(0);
  });
});
